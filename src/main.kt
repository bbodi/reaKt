package hu.nevermind.reakt.example

import kotlin.js.dom.html.HTMLElement
import kotlin.js.dom.html.document
import org.w3c.dom.Element
import hu.nevermind.reakt.div
import hu.nevermind.reakt.React
import hu.nevermind.reakt.h1
import hu.nevermind.reakt.h2
import hu.nevermind.reakt.ReactElement
import hu.nevermind.reakt.ReactElementContainer
import hu.nevermind.reakt.ReactClass
import hu.nevermind.reakt.ReactPropDelegate

class Comment(authorName: String, body: ReactElementContainer.() -> Unit) : ReactClass(body) {
    var authorName: String by ReactPropDelegate()
    var count: Int by ReactPropDelegate()

    override fun doRender(): ReactElement? {
        return div("className" to "comment") {
            +h2("className" to "commentAuthor") {
                +authorName
            }
            +children
        }
    }

    {
        this.authorName = authorName
        this.count = 0
    }
}

class CommentList(data: Array<Person>, body: ReactElementContainer.() -> Unit = {}) : ReactClass(body) {
    var data: Array<Person> by ReactPropDelegate()

    override fun doRender(): ReactElement? {
        val commentNodes = data.map { comment ->
            Comment(authorName = comment.author) {
                +comment.text
            }
        }
        return div("className" to "commentList") {
            +commentNodes
        }
    }

    {
        this.data = data
    }
}

class CommentForm(body: ReactElementContainer.() -> Unit = {}) : ReactClass(body) {
    override fun doRender(): ReactElement? {
        return div("className" to "CommentForm") {
            +"Hello, world! I am a CommentForm."
        }
    }
}

class CommentBox(data: Array<Person>, body: ReactElementContainer.() -> Unit = {}) : ReactClass(body) {
    var data: Array<Person> by ReactPropDelegate()

    override fun doRender(): ReactElement?  {
        return div("className" to "commentBox") {
            +h1 { +"Comments" }
            +CommentList(data = data)
            +CommentForm()
        }
    }

    {
        this.data = data
    }
}

data class Person( val author: String, val text: String)

val data = array(
        Person( author = "Pete Hunt", text = "This is one comment" ),
        Person( author = "Jordan Walke", text = "This is *another* comment" )
)

public fun main(args: Array<String>) {
    React.render(CommentBox(data).createElement(), document.getElementById("content"))
}