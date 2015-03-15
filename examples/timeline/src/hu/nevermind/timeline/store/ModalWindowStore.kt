package hu.nevermind.timeline.store

import hu.nevermind.flux.Store
import hu.nevermind.timeline.entities.Id
import hu.nevermind.timeline.Actions
import hu.nevermind.timeline.EventEditorModalState

object ModalWindowStore : Store() {

	public var eventEditorModalState: EventEditorModalState? = null;
		private set

	{
		register(Actions.eventEditorModalStateChanged) { newEventEditorModalState ->
			eventEditorModalState = newEventEditorModalState
			emitChange()
		}
	}
}