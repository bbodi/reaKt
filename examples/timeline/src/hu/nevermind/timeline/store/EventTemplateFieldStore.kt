package hu.nevermind.timeline.store

import hu.nevermind.timeline.Actions
import hu.nevermind.flux.Dispatcher
import hu.nevermind.timeline.entities.EventInstance
import hu.nevermind.flux.RegisteredActionHandler
import hu.nevermind.flux.Store
import hu.nevermind.timeline.entities.EventTemplateField
import hu.nevermind.timeline.DataFromServer
import hu.nevermind.timeline.entities.Id
import hu.nevermind.timeline.entities.EventTemplate

object EventTemplateFieldStore : Store() {

    private var fields: MutableMap<Id<EventTemplateField>, EventTemplateField> = hashMapOf()

    init {
        register(Actions.dataFromServer) { appState ->
            fields.clear()
            appState.templateFields.sortBy{it.id.id}.forEach {
                fields.put(it.id, it)
            }
        }
    }

    fun getFields(): Map<Id<EventTemplateField>, EventTemplateField> {
        return fields
    }

	fun get(id: Id<EventTemplateField>): EventTemplateField {
		return fields.getOrElse(id, {error("EventTemplateFieldStore: $id not found")})
	}
}