package hu.nevermind.timeline.store

import hu.nevermind.timeline.Actions
import hu.nevermind.timeline.entities.EventInstance
import hu.nevermind.flux.Dispatcher
import hu.nevermind.flux.Store
import hu.nevermind.timeline.entities.Id
import hu.nevermind.timeline.Sendable
import hu.nevermind.timeline.entities.EventField

object EventStore : Store() {

    private var events: MutableMap<Id<EventInstance>, EventInstance> = hashMapOf();
    private var fields: MutableMap<Id<EventField>, EventField> = hashMapOf();

	{
		register(Actions.dataFromServer) { payload ->
			waitFor(EventTemplateStore, EventTemplateFieldStore)
            fields.clear()
            payload.eventFields.forEach {
                fields.put(it.id, it)
            }

			events.clear()
            payload.events.filter {
                !array(248, 249, 567).contains(it.id.id)
            } forEach {
                events.put(it.id, it)
            }
            emitChange()
		}

        register(Actions.eventEdited) { eventChange ->
            val newFields = eventChange.fieldChanges.map { fieldChange ->
                val changedField = fields[fieldChange.id]!!
                changedField.copy(fieldValue = fieldChange.newValue)
            }

            val changedEvent = events[eventChange.id]!!

            val sendingPayload = object : Sendable{
                override fun toServerSideObj(): dynamic {
                    return object {
                        val fieldChanges = eventChange.fieldChanges map {
                            object {
                                val id = it.id.id
                                val newValue = it.newValue?.toString()
                            }
                        }
                        val eventChange = object {
                            val id = eventChange.id.id
                            val millisecondsSinceUnixEpoch = eventChange.newDate.millisecondsSinceUnixEpoch
                        }
                    }
                }
            }
			sendCommand("updateEvent", sendingPayload) {(result: dynamic) ->
                val newEvent = changedEvent.copy(date = eventChange.newDate)
                events[newEvent.id] = newEvent
				emitChange()
			}
        }

        register(Actions.eventCreated) { payload ->
            val sendingPayload = object : Sendable{
                override fun toServerSideObj(): dynamic {
                    return object {
                        val fields = payload.fieldCreations map {
                            object {
                                val value = it.value?.toString()
                                val templateFieldId = it.templateFieldId.id
                            }
                        }
                        val event = object {
                            val templateId = payload.templateId.id
                            val millisecondsSinceUnixEpoch = payload.date.millisecondsSinceUnixEpoch
                            val comment = payload.comment
                        }
                    }
                }
            }
            sendCommand("insertEvent", sendingPayload) {(responsePayload: dynamic) ->
                val insertedEvent = EventInstance.fromJson(responsePayload)
                events[insertedEvent.id] = insertedEvent
                (responsePayload.fields as Array<dynamic>).map {(field: dynamic) ->
                    EventField.fromJson(field)
                }
                emitChange()
            }
        }
	}

    fun getField(id: Id<EventField>): EventField {
        return fields.getOrElse(id, {error("EventFieldStore: $id not found")})
    }

    fun getFields(): Map<Id<EventField>, EventField> {
        return fields
    }

	public fun getEvents(): Map<Id<EventInstance>, EventInstance> {
		return events;
	}
}