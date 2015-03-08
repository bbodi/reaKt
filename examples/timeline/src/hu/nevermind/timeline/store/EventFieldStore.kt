package hu.nevermind.timeline.store

import hu.nevermind.timeline.Actions
import hu.nevermind.flux.Dispatcher
import hu.nevermind.timeline.entities.EventInstance
import hu.nevermind.flux.RegisteredActionHandler
import hu.nevermind.flux.Store
import hu.nevermind.timeline.entities.EventField
import hu.nevermind.timeline.DataFromServer

object EventFieldStore : Store (){

	public val dataFromServerToken: RegisteredActionHandler<DataFromServer> = register(Actions.dataFromServer) { appState ->
		fields.clear()
		appState.eventFields.forEach {
			fields.put(it.id, it)
		}
	}

	private var fields: MutableMap<Int, EventField> = hashMapOf();

	fun get(id: Int): EventField {
		return fields.getOrElse(id, {error("EventFieldStore: $id not found")})
	}
}