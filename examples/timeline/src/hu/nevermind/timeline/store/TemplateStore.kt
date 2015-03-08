package hu.nevermind.timeline.store

import hu.nevermind.timeline.Actions
import hu.nevermind.flux.Dispatcher
import hu.nevermind.timeline.entities.EventInstance
import hu.nevermind.flux.RegisteredActionHandler
import hu.nevermind.flux.Store
import hu.nevermind.timeline.entities.EventField
import hu.nevermind.timeline.DataFromServer
import hu.nevermind.timeline.entities.EventTemplate

object TemplateStore : Store (){

	{
		register(Actions.dataFromServer) { appState ->
			templates.clear()
			appState.templates.forEach {
				templates.put(it.id, it)
			}
		}
	}

	private var templates: MutableMap<Int, EventTemplate> = hashMapOf();

	fun getTemplate(templateId: Int): EventTemplate {
		return templates.getOrElse(templateId, {error("TemplateStore: $templateId")})
	}
}