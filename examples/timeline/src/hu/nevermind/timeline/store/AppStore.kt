package hu.nevermind.timeline.store

import hu.nevermind.timeline.Actions
import hu.nevermind.flux.Dispatcher
import hu.nevermind.flux.Store
import hu.nevermind.timeline.entities.Id
import hu.nevermind.timeline.entities.EventTemplate
import hu.nevermind.timeline.AjaxCommandSender

object AppStore : Store() {

	public var filteringTemplateIds: MutableList<Id<EventTemplate>> = arrayListOf();
		private set

	init {
		register(Actions.filteringTemplateIdsChanged) { payload ->
			filteringTemplateIds.clear()
			filteringTemplateIds.addAll(payload.filteringTemplateIds)
			emitChange()
		}
	}
}