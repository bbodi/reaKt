package hu.nevermind.timeline.entities

import hu.nevermind.timeline.LocalizationEntry
import hu.nevermind.timeline.Local
import net.yested.utils.Moment
import hu.nevermind.timeline.Sendable

enum class EventFieldType(val localizationKey: LocalizationEntry,
                              val readValue: (String)->Any?) {
    INT: EventFieldType(Local.eventFieldInt, readValue = {safeParseInt(it)})
    FLOAT: EventFieldType(Local.eventFieldFloat, readValue = {safeParseDouble(it)?.toFloat()})
    STRING: EventFieldType(Local.eventFieldString, readValue = {it})
    TEXTAREA: EventFieldType(Local.eventFieldTextArea, readValue = {it})
    SELECT: EventFieldType(Local.eventFieldSelect, readValue = {it})
}

public data class EventTemplate(var id: Id<EventTemplate>, public var name: String, var useDateTime: Boolean, val fieldIds: MutableList<Id<EventTemplateField>>) {

    class object {
        public fun fromJson(template: dynamic): EventTemplate {
            val fields = (template.fields as Array<dynamic>).map {(field: dynamic) ->
                EventTemplateField.fromJson(field)
            }
			val fieldIds = fields.map { it.id }
            return EventTemplate(Id<EventTemplate>(template.id), template.name, template.useDateTime, fieldIds.toArrayList())
        }
    }
}

data class EventTemplateField(var id: Id<EventTemplateField>, var name: String, var type: EventFieldType, var hint: String?) {
    fun toServerSideObj(): dynamic = object {
        val id = this@EventTemplateField.id.id
        val name = this@EventTemplateField.name
        val type = this@EventTemplateField.type.name()
        val hint = this@EventTemplateField.hint
    }

    class object {
        public fun fromJson(field: dynamic): EventTemplateField {
            return EventTemplateField(Id<EventTemplateField>(field.id), field.name, EventFieldType.valueOf(field.type), field.hint)
        }
    }
}

public data class ReportDescription(val id: Id<ReportDescription>, var name: String, val connectedTemplates: List<EventTemplate>): Sendable {

    override fun toServerSideObj(): dynamic = object {
        val id = this@ReportDescription.id.id
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
			return ReportDescription(Id<ReportDescription>(report.id), name, connectedTemplates)
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
public data class EventInstance(val id: Id<EventInstance>,
                                val fieldIds: List<Id<EventField>>,
                                val date: Moment,
                                val comment: String?,
                                val templateId: Id<EventTemplate>,
                                val tags: String?
) {

    class object {
        public fun fromJson(event: dynamic): EventInstance {
            val templateId = Id<EventTemplate>(event.templateId)
            val fields = (event.fields as Array<dynamic>).map {(field: dynamic) ->
                EventField.fromJson(field)
            }
			val fieldIds = fields.map { it.id  }
			val date = Moment.parseMillisecondsSinceUnixEpoch(event.millisecsFrom1970)
			return EventInstance(Id<EventInstance>(event.id), fieldIds, date, event.comment, templateId, null)
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

public data class Id<T>(val id: Int)

public data class EventField (val id: Id<EventField>, val fieldValue: Any?, val templateFieldId: Id<EventTemplateField>) {
    fun toServerSideObj(): dynamic = object {
        val id = this@EventField.id.id
        val value = this@EventField.fieldValue
        val templateFieldId = this@EventField.templateFieldId.id
    }
    class object {

        public fun fromJson(field: EventFieldFromServer): EventField {
            return when (EventFieldType.valueOf(field.type)) {
                EventFieldType.INT -> EventField(Id<EventField>(field.id), field.intValue, Id<EventTemplateField>(field.templateFieldId))
                EventFieldType.FLOAT -> EventField(Id<EventField>(field.id), field.floatValue, Id<EventTemplateField>(field.templateFieldId))
                EventFieldType.STRING -> EventField(Id<EventField>(field.id), field.stringValue,Id<EventTemplateField>(field.templateFieldId))
                EventFieldType.SELECT -> EventField(Id<EventField>(field.id), field.stringValue, Id<EventTemplateField>(field.templateFieldId))
                EventFieldType.TEXTAREA -> EventField(Id<EventField>(field.id), field.stringValue, Id<EventTemplateField>(field.templateFieldId))
            }
        }

        public fun createFieldFromTemplate(eventTemplateField: EventTemplateField): EventField {
            return when (eventTemplateField.type) {
                EventFieldType.INT -> EventField(Id<EventField>(0), 0, eventTemplateField.id)
                EventFieldType.FLOAT -> EventField(Id<EventField>(0), 0f, eventTemplateField.id)
                EventFieldType.STRING -> EventField(Id<EventField>(0), "", eventTemplateField.id)
                EventFieldType.SELECT -> EventField(Id<EventField>(0), "", eventTemplateField.id)
                EventFieldType.TEXTAREA -> EventField(Id<EventField>(0), "", eventTemplateField.id)
            }
        }
    }
}
