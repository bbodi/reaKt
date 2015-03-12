package hu.nevermind.flux

import kotlin.properties.Delegates
import hu.nevermind.timeline.CommandSender
import hu.nevermind.timeline.AjaxCommandSender
import hu.nevermind.timeline.Sendable
import hu.nevermind.reakt.example.EventEditorModal

public abstract class Store {

	private val changeListeners: MutableMap<Any, () -> Unit> = hashMapOf()
    // public for tests...
    public var commandSender: CommandSender = AjaxCommandSender()

	protected fun <PAYLOAD> register(actionDef: ActionDef<PAYLOAD>, callback: DispatchCallbackBody<PAYLOAD>.(PAYLOAD) -> Unit): RegisteredActionHandler<PAYLOAD> {
		return Dispatcher.register(this, actionDef, callback)
	}

    public fun sendCommand<RESULT>(command: String, msg: Sendable, resultHandler: (RESULT) -> Unit) {
        commandSender.sendCommand(command, msg, resultHandler)
    }

	public fun addChangeListener(self: Any, callback: () -> Unit) {
		changeListeners.put(self, callback)
	}

	protected fun emitChange() {
		changeListeners.values().forEach { it() }
	}

    fun removeListener(self: Any) {
        changeListeners.remove(self)
    }
}

public class ActionDef<PAYLOAD> {

	public fun dispatch(payload: PAYLOAD) {
		Dispatcher.dispatch(this, payload)
	}
}


private class ActionHandlers<PAYLOAD>(val action: ActionDef<PAYLOAD>, val handlers: MutableList<RegisteredActionHandler<PAYLOAD>> = arrayListOf()) {

}

public class RegisteredActionHandler<PAYLOAD>(val store: Store, val actionDef: ActionDef<PAYLOAD>, val callback: DispatchCallbackBody<PAYLOAD>.(PAYLOAD) -> Unit) {
	var pending = false
	var handled = false
}

public class DispatchCallbackBody<PAYLOAD>(val store: Store, val actionDef: ActionDef<PAYLOAD>) {
	fun waitFor(vararg registeredActionHandlers: Store) {
		Dispatcher.waitFor<PAYLOAD>(registeredActionHandlers)
	}
}

object Dispatcher {
	private var pendingPayload: Any? = null
	private var pendingActionDef: ActionDef<*>? = null
	private var lastId = 0
	private val actionHandlersList: MutableMap<ActionDef<*>, ActionHandlers<*>> = hashMapOf()
	private var dispatching = false

	fun register<PAYLOAD>(store: Store, action: ActionDef<PAYLOAD>, callback: DispatchCallbackBody<PAYLOAD>.(PAYLOAD) -> Unit): RegisteredActionHandler<PAYLOAD> {
		val actionHandlers = actionHandlersList.getOrPut(action, { ActionHandlers(action) })
		val registeredActionHandler = RegisteredActionHandler<PAYLOAD>(store, action, callback)
		actionHandlers.handlers.add(registeredActionHandler)
		return registeredActionHandler
	}

	fun unRegister<PAYLOAD>(registeredActionHandler: RegisteredActionHandler<PAYLOAD>) {
		actionHandlersList.get(registeredActionHandler.actionDef)?.handlers?.remove(registeredActionHandler)
	}

	fun waitFor<PAYLOAD>(stores: Array<out Store>) {
		require(dispatching, "Dispatcher.waitFor(...): Must be invoked while dispatching.")
		val handlersForCurrentAction = actionHandlersList.get(pendingActionDef)?.handlers ?: emptyList<RegisteredActionHandler<PAYLOAD>>()
		val (pendingHandlers, nonPendingHandlers) = handlersForCurrentAction.filter { stores.contains(it.store) }.partition { it.pending || it.handled }
		val unhandledHandlers = pendingHandlers.firstOrNull { !it.handled }
		require(unhandledHandlers == null, "Dispatcher.waitFor(...): Circular dependency detected while waiting for $unhandledHandlers.")
		nonPendingHandlers.forEach {
			require(actionHandlersList.get(it.actionDef)?.handlers?.contains(it) ?: false, "Dispatcher.waitFor(...): $it does not map to a registered callback.")
			invokeCallback(it)
		}
	}

	fun dispatch<PAYLOAD>(action: ActionDef<PAYLOAD>, payload: PAYLOAD) {
		require(!dispatching, "Dispatch.dispatch(...): Cannot dispatch in the middle of a dispatch.")
		this.startDispatching(action, payload);
		try {
			actionHandlersList.get(action)?.handlers?.forEach {
				if (!it.pending) {
					invokeCallback(it as RegisteredActionHandler<PAYLOAD>)
				}
			}
		} finally {
			this.stopDispatching();
		}
	}

	private fun invokeCallback<PAYLOAD>(it: RegisteredActionHandler<PAYLOAD>) {
		it.pending = true
		val body = DispatchCallbackBody<PAYLOAD>(it.store, it.actionDef)
		val callback = it.callback
		body.callback(pendingPayload as PAYLOAD)
		it.handled = true
	}

	private fun startDispatching<PAYLOAD>(action: ActionDef<PAYLOAD>, payload: PAYLOAD) {
		actionHandlersList.get(action)?.handlers?.forEach {
			it.pending = false
			it.handled = false
		}
		pendingPayload = payload
		pendingActionDef = action
		dispatching = true
	}

	private fun stopDispatching() {
		pendingActionDef = null
		pendingPayload = null
		dispatching = false
	}
}