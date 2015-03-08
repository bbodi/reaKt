package hu.nevermind.timeline.client

import net.yested.ajaxPost
import net.yested.AjaxRequest


public data class AjaxResult<T>(val status: Boolean, val data: T)

public var username: String = ""

public trait Sendable {
	fun toServerSideObj(): dynamic
}

public fun sendCommand<RESULT>(command: String, msg: Sendable, resultHandler: (RESULT) -> Unit) {
	ajaxPost(AjaxRequest<AjaxResult<RESULT>>(
			url = "/ajax/ajax/",
			data = JSON.stringify(object {
				val command = command
				val entity = msg.toServerSideObj()
                val user = username
			}),
			success = { (result: AjaxResult<RESULT>) ->
				if (result.status) {
					resultHandler(result.data)
				} else {
					throw Exception("Ajax Error")
				}
			}
	))
}