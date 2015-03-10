package hu.nevermind.timeline.store

import hu.nevermind.timeline.Actions
import hu.nevermind.flux.Dispatcher
import hu.nevermind.timeline.entities.EventInstance
import hu.nevermind.flux.RegisteredActionHandler
import hu.nevermind.flux.Store
import hu.nevermind.timeline.entities.EventField
import hu.nevermind.timeline.DataFromServer
import hu.nevermind.timeline.entities.Id

object EventFieldStore : Store (){

    {
        register(Actions.dataFromServer) { appState ->
            fields.clear()
            appState.eventFields.forEach {
                fields.put(it.id, it)
            }
        }
        register(Actions.editEvent) { data ->
            emitChange()
        }
    }

	private var fields: MutableMap<Id<EventField>, EventField> = hashMapOf();

	fun get(id: Id<EventField>): EventField {
		return fields.getOrElse(id, {error("EventFieldStore: $id not found")})
	}

    fun getFields(): Map<Id<EventField>, EventField> {
        return fields
    }
}