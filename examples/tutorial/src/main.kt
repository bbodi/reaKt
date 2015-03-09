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
import hu.nevermind.reakt.ReactRef
import kotlin.js.dom.html.window
import hu.nevermind.reakt.input
import hu.nevermind.reakt.InputType
import hu.nevermind.reakt.form
import kotlin.js.dom.html.HTMLInputElement
import org.w3c.dom.events.Event
import hu.nevermind.reakt.PropertyDefinition
import hu.nevermind.reakt.set
import hu.nevermind.reakt.PropertyPair
import hu.nevermind.reakt.StatefulReactClass

class Comment(vararg props: PropertyPair<out Any>, body: ReactElementContainer.() -> Unit = {}) : ReactClass(props, body) {
    class object {
        val authorName = PropertyDefinition<String>()
    }
    val h2Ref = ref("h2")
    override fun render(): ReactElement? {
        return div("className" to "comment") {
            +h2("className" to "commentAuthor") {
                ref = h2Ref
                +props(authorName)
            }
            +children
        }
    }

    override fun componentDidMount() {
        window.setTimeout({ h2Ref.getDOMNode().innerHTML = "bali" }, 2000)
    }
}

class CommentList(vararg props: PropertyPair<out Any>, body: ReactElementContainer.() -> Unit = {}) : ReactClass(props, body) {
    class object {
        val data = PropertyDefinition<Array<CommentEntry>>()
    }
    override fun render(): ReactElement? {
        val commentNodes = this.props(data).map { comment ->
            Comment(Comment.authorName set comment.author) {
                +comment.text
            }
        }
        return div("className" to "commentList") {
            +commentNodes
        }
    }

}

class CommentForm(vararg props: PropertyPair<out Any>, body: ReactElementContainer.() -> Unit = {}) : ReactClass(props, body) {
    class object {
        val onCommentSubmit = PropertyDefinition<(String, String) -> Unit>()
    }

    val authorRef = ref("authorRef")
    val textRef = ref("textRef")
    private fun handleSubmit(e: Event) {
        e.preventDefault()
        val author = (authorRef.getDOMNode() as HTMLInputElement).value
        val text = (textRef.getDOMNode() as HTMLInputElement).value
        this.props(onCommentSubmit)(author, text)
        (authorRef.getDOMNode() as HTMLInputElement).value = ""
        (textRef.getDOMNode() as HTMLInputElement).value = ""
    }

    override fun render(): ReactElement? {
        return form(onSubmit = { event -> handleSubmit(event) }) {
            +input(InputType.TEXT, "placeholder" to "Your name", "ref" to authorRef)
            +input(InputType.TEXT, "placeholder" to "Say something...", "ref" to textRef)
            +input(InputType.SUBMIT, "value" to "Post")
        }
    }
}

data class CommentBoxState(val data: Array<CommentEntry>)

class CommentBox(vararg props: PropertyPair<out Any>, body: ReactElementContainer.() -> Unit = {}) : StatefulReactClass<CommentBoxState>(props, body) {

    val handleCommentSubmit = {(author: String, text: String) ->
        var comments = this.state.data;
        var newComments = comments + CommentEntry(author, text)

        this.setState(CommentBoxState(newComments.copyToArray()))
    }

    override fun getInitialState(): CommentBoxState {
        return CommentBoxState(array())
    }

    override fun render(): ReactElement? {
        return div("className" to "commentBox") {
            +h1 { +"Comments" }
            +CommentList(CommentList.data set state.data)
            +CommentForm(CommentForm.onCommentSubmit set handleCommentSubmit)
        }
    }
}

data class CommentEntry(val author: String, val text: String)

/*public fun main(args: Array<String>) {
    React.render(CommentBox().createElement(), document.getElementById("content"))
}*/