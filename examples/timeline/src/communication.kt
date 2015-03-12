package hu.nevermind.timeline

import net.yested.ajaxPost
import net.yested.AjaxRequest
import kotlin.js.dom.html.window


public data class AjaxResult<T>(val status: Boolean, val data: T)

public var username: String = ""

public trait Sendable {
	fun toServerSideObj(): dynamic
}

public trait CommandSender {
    public fun sendCommand<RESULT>(command: String, msg: Sendable, resultHandler: (RESULT) -> Unit)
}

public class AjaxCommandSender() : CommandSender {

    override public fun sendCommand<RESULT>(command: String, msg: Sendable, resultHandler: (RESULT) -> Unit) {
        val objectToSend = object {
            val command = command
            val entity = msg.toServerSideObj()
            val user = username
        }
        val dataToSend = js("JSON.stringify(objectToSend, null, 4)")
        val result = js("window.confirm(dataToSend)")
        if (result == false) {
            return
        }
        ajaxPost(AjaxRequest<AjaxResult<RESULT>>(
                url = "/ajax/ajax/",
                data = dataToSend,
                success = { (result: AjaxResult<RESULT>) ->
                    if (result.status) {
                        resultHandler(result.data)
                    } else {
                        throw Exception("Ajax Error")
                    }
                }
        ))
    }
}