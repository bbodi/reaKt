package hu.nevermind.timeline.store

import hu.nevermind.timeline.Actions
import hu.nevermind.flux.Dispatcher
import hu.nevermind.timeline.entities.EventInstance
import hu.nevermind.flux.RegisteredActionHandler
import hu.nevermind.flux.Store
import hu.nevermind.timeline.entities.EventField
import hu.nevermind.timeline.DataFromServer
import hu.nevermind.timeline.entities.EventTemplate
import hu.nevermind.timeline.entities.Id

object EventTemplateStore : Store (){

	init {
		register(Actions.dataFromServer) { appState ->
			templates.clear()
			appState.templates.forEach {
				templates.put(it.id, it)
			}
		}
	}

	private var templates: MutableMap<Id<EventTemplate>, EventTemplate> = hashMapOf();

	fun get(templateId: Id<EventTemplate>): EventTemplate {
		return templates.getOrElse(templateId, {error("TemplateStore: $templateId")})
	}

    fun getTemplates(): Map<Id<EventTemplate>, EventTemplate> {
        return templates
    }
}