package hu.nevermind.timeline.store

import hu.nevermind.timeline.Actions
import hu.nevermind.flux.Dispatcher
import hu.nevermind.timeline.entities.EventInstance
import hu.nevermind.flux.RegisteredActionHandler
import hu.nevermind.flux.Store
import hu.nevermind.timeline.entities.EventTemplateField
import hu.nevermind.timeline.DataFromServer

object TemplateFieldStore : Store (){

	public val dataFromServerToken: RegisteredActionHandler<DataFromServer> = register(Actions.dataFromServer) { appState ->
		fields.clear()
		appState.templateFields.forEach {
			fields.put(it.id, it)
		}
	}

	private var fields: MutableMap<Int, EventTemplateField> = hashMapOf();

	fun get(id: Int): EventTemplateField {
		return fields.getOrElse(id, {error("EventFieldStore: $id not found")})
	}
}