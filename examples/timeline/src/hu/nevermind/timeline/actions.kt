package hu.nevermind.timeline

import hu.nevermind.flux.ActionDef
import hu.nevermind.reakt.example.TimelineAppState
import hu.nevermind.timeline.entities.EventInstance
import hu.nevermind.timeline.entities.EventField
import hu.nevermind.timeline.entities.EventTemplate
import hu.nevermind.timeline.entities.EventTemplateField

public data class DataFromServer(val events: MutableList<EventInstance>, val eventFields: MutableList<EventField>, val templates: MutableList<EventTemplate>, val templateFields: MutableList<EventTemplateField>)
public data class EditEvent(val event: EventInstance, val fields: Iterable<EventField>)

object Actions {
	val dataFromServer = ActionDef<DataFromServer>()
    val editEvent = ActionDef<EditEvent>()
}