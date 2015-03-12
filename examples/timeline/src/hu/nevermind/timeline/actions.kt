package hu.nevermind.timeline

import hu.nevermind.flux.ActionDef
import hu.nevermind.reakt.example.TimelineAppState
import hu.nevermind.timeline.entities.EventInstance
import hu.nevermind.timeline.entities.EventField
import hu.nevermind.timeline.entities.EventTemplate
import hu.nevermind.timeline.entities.EventTemplateField
import hu.nevermind.timeline.entities.Id
import net.yested.utils.Moment
import hu.nevermind.reakt.example.EventEditorModalState

public data class DataFromServer(val events: MutableList<EventInstance>, val eventFields: MutableList<EventField>, val templates: MutableList<EventTemplate>, val templateFields: MutableList<EventTemplateField>)

public data class EventFieldChangePayload(val id: Id<EventField>, val newValue: Any?)

public data class EventChangePayload(val id: Id<EventInstance>, val newDate: Moment, val fieldChanges: Iterable<EventFieldChangePayload>)

public data class EventFieldCreationPayload(val templateFieldId: Id<EventTemplateField>, val value: Any?)
public data class EventFieldCreated(val date: Moment)
public data class EventCreationPayload(val templateId: Id<EventTemplate>, val date: Moment, val comment: String?, val fieldCreations: Iterable<EventFieldCreationPayload>)

public object Actions {
	val dataFromServer = ActionDef<DataFromServer>()

    val eventEdited = ActionDef<EventChangePayload>()
    val eventCreated = ActionDef<EventCreationPayload>()

}