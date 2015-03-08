package hu.nevermind.timeline.entities

import hu.nevermind.timeline.LocalizationEntry
import hu.nevermind.timeline.Local
import net.yested.utils.Moment
import hu.nevermind.timeline.client.Sendable
import hu.nevermind.timeline.store.EventFieldStore
import hu.nevermind.timeline.store.TemplateFieldStore

enum class EventFieldType(val localizationKey: LocalizationEntry) {
    INT: EventFieldType(Local.eventFieldInt)
    FLOAT: EventFieldType(Local.eventFieldFloat)
    STRING: EventFieldType(Local.eventFieldString)
    TEXTAREA: EventFieldType(Local.eventFieldTextArea)
    SELECT: EventFieldType(Local.eventFieldSelect)
}

public data class EventTemplate(var id: Int, public var name: String, var useDateTime: Boolean, val fieldIds: MutableList<Int>) : Sendable {

	override fun toServerSideObj(): dynamic = object {
        val id = this@EventTemplate.id
        val name = this@EventTemplate.name
        val fields = this@EventTemplate.fieldIds.map { id ->
			val field = TemplateFieldStore.get(id)
			field.toServerSideObj()
		}
		val useDateTime = this@EventTemplate.useDateTime
    }

    class object {
        public fun fromJson(template: dynamic): EventTemplate {
            val fields = (template.fields as Array<dynamic>).map {(field: dynamic) ->
                EventTemplateField.fromJson(field)
            }
			val fieldIds = fields.map { it.id }
            return EventTemplate(template.id, template.name, template.useDateTime, fieldIds.toArrayList())
        }
    }
}

data class EventTemplateField(var id: Int, var name: String, var type: EventFieldType, var hint: String?) {
    fun toServerSideObj(): dynamic = object {
        val id = this@EventTemplateField.id
        val name = this@EventTemplateField.name
        val type = this@EventTemplateField.type.name()
        val hint = this@EventTemplateField.hint
    }

    class object {
        public fun fromJson(field: dynamic): EventTemplateField {
            return EventTemplateField(field.id, field.name, EventFieldType.valueOf(field.type), field.hint)
        }
    }
}

public data class ReportDescription(val id: Int, var name: String, val connectedTemplates: List<EventTemplate>): Sendable {

    override fun toServerSideObj(): dynamic = object {
        val id = this@ReportDescription.id
        val name = this@ReportDescription.name
        val templateIds = this@ReportDescription.connectedTemplates.map { it.id }
    }

	class object {
		public fun fromJson(templates: List<EventTemplate>, report: dynamic): ReportDescription {
			val name = report.name
			val connectedTemplates = (report.entries as Array<dynamic>).map {(reportDescrEntry: dynamic) ->
				val templateId = reportDescrEntry.templateId
				templates.filter { it.id == templateId }.first()
			}
			return ReportDescription(report.id, name, connectedTemplates)
		}
	}
}

// TODO: Ez a logika eddig a toServerSideObj-ban volt
// legyen a mentés helyén
//val millisecsFrom1970 = if (template?.useDateTime == false) {
//	this@EventInstance.date.hour = 12
//	this@EventInstance.date.millisecondsSinceUnixEpoch
//} else {
//	this@EventInstance.date.millisecondsSinceUnixEpoch
//}
public data class EventInstance(var id: Int,
                                var name: String,
                                var fieldIds: List<Int>,
                                var date: Moment,
                                var comment: String?,
                                var templateId: Int?,
                                val tags: String?
) : Sendable {
    override fun toServerSideObj(): dynamic = object {
        val id = this@EventInstance.id
        val name = this@EventInstance.name
		val millisecsFrom1970 = this@EventInstance.date.millisecondsSinceUnixEpoch
        val comment = this@EventInstance.comment
        val fields = this@EventInstance.fieldIds.map { id ->
			val field = EventFieldStore.get(id)
			field.toServerSideObj()
		}
        val tags = this@EventInstance.tags
        val templateId = this@EventInstance.templateId
    }

    class object {
        public fun fromJson(event: dynamic): EventInstance {
            val templateId = event.templateId
            val fields = (event.fields as Array<dynamic>).map {(field: dynamic) ->
                EventField.fromJson(field)
            }
			val fieldIds = fields.map { it.id }
			val date = Moment.parseMillisecondsSinceUnixEpoch(event.millisecsFrom1970)
			return EventInstance(event.id, event.name, fieldIds, date, event.comment, templateId, null)
        }
    }
}

public data class EventFieldFromServer(val id: Int,
                                       val type: String,
                                       val name: String,
                                       val templateFieldId: Int,
                                       val floatValue: Float,
                                       val intValue: Int,
                                       val boolValue: Boolean,
                                       val stringValue: String)

public data class EventField private (var id: Int, val name: String, var fieldValue: Any?, val type: EventFieldType, var templateFieldId: Int?) {
    fun toServerSideObj(): dynamic = object {
        val id = this@EventField.id
        val name = this@EventField.name
        val value = this@EventField.fieldValue
        val type = this@EventField.type.name()
        val templateFieldId = this@EventField.templateFieldId
    }
    class object {

        public fun fromJson(field: EventFieldFromServer): EventField {
            return when (EventFieldType.valueOf(field.type)) {
                EventFieldType.INT -> EventField(field.id, field.name, field.intValue, EventFieldType.INT, field.templateFieldId)
                EventFieldType.FLOAT -> EventField(field.id, field.name, field.floatValue, EventFieldType.FLOAT, field.templateFieldId)
                EventFieldType.STRING -> EventField(field.id, field.name, field.stringValue, EventFieldType.STRING, field.templateFieldId)
                EventFieldType.SELECT -> EventField(field.id, field.name, field.stringValue, EventFieldType.SELECT, field.templateFieldId)
                EventFieldType.TEXTAREA -> EventField(field.id, field.name, field.stringValue, EventFieldType.TEXTAREA, field.templateFieldId)
            }
        }

        public fun createFieldFromTemplate(eventTemplateField: EventTemplateField): EventField {
            return when (eventTemplateField.type) {
                EventFieldType.INT -> EventField(0, eventTemplateField.name, 0, EventFieldType.INT, eventTemplateField.id)
                EventFieldType.FLOAT -> EventField(0, eventTemplateField.name, 0f, EventFieldType.FLOAT, eventTemplateField.id)
                EventFieldType.STRING -> EventField(0, eventTemplateField.name, "", EventFieldType.STRING, eventTemplateField.id)
                EventFieldType.SELECT -> EventField(0, eventTemplateField.name, "", EventFieldType.SELECT, eventTemplateField.id)
                EventFieldType.TEXTAREA -> EventField(0, eventTemplateField.name, "", EventFieldType.TEXTAREA, eventTemplateField.id)
            }
        }
    }
}
