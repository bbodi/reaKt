package hu.nevermind.timeline.store

import hu.nevermind.timeline.Actions
import hu.nevermind.timeline.entities.EventInstance
import hu.nevermind.flux.Dispatcher
import hu.nevermind.flux.Store
import hu.nevermind.timeline.client.sendCommand

object EventStore : Store() {

	{
		register(Actions.dataFromServer) { data ->
			waitFor(EventFieldStore, TemplateStore, TemplateFieldStore)
			events.clear()
			events.addAll(data.events)
			emitChange()
		}

        register(Actions.editEvent) { data ->
			waitFor(EventFieldStore)
			sendCommand("updateEvent", data.event) {(result: dynamic) ->
				emitChange()
			}
        }
	}
	var events: MutableList<EventInstance> = arrayListOf();

	public fun getEvents(): List<EventInstance> {
		return events;
	}
}