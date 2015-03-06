package hu.nevermind.reakt.example

import kotlin.js.dom.html.document
import hu.nevermind.reakt.div
import hu.nevermind.reakt.React
import hu.nevermind.reakt.h1
import hu.nevermind.reakt.h2
import hu.nevermind.reakt.ReactElement
import hu.nevermind.reakt.ReactElementContainer
import hu.nevermind.reakt.ReactClass
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
import hu.nevermind.reakt.ReactRef


enum class FilterState {
    ALL
    ACTIVE
    COMPLETED
}

data class TodoItem(val id: Int, val title: String, val completed: Boolean)

data class TodoAppState(val currentFilterState: FilterState, val editedTodoId: Int?, val todoItems: Array<TodoItem>)

class TodoApp(vararg props: PropertyPair<out Any>, body: ReactElementContainer.() -> Unit = {}) : StatefulReactClass<TodoAppState>(props, body) {

    class object {
    }
    val newFieldRef = ref("newField")
    val handleCommentSubmit = {(author: String, text: String) ->

        //this.setState(CommentBoxState(newComments.copyToArray()))
    }

    val handleNewTodoKeyDown = { (event: dynamic) ->
        if (event.which === 13) {
            event.preventDefault()
            val text = (newFieldRef.getDOMNode() as HTMLInputElement).value.trim()
            if (text.isNotEmpty()) {
                val state = this.state
                val newTodoItems = (state.todoItems + TodoItem(0, text, false)).copyToArray()
                this.setState(TodoAppState(state.currentFilterState, state.editedTodoId, newTodoItems))
                (newFieldRef.getDOMNode() as HTMLInputElement).value = ""
            }
        }
    }

    override fun componentDidMount() {

    }

    override fun getInitialState(): TodoAppState {
        return TodoAppState(FilterState.ALL, editedTodoId = null, todoItems = array())
    }

    override fun render(): ReactElement? {
        val shownTodos = state.todoItems.filter {
            when (state.currentFilterState) {
                FilterState.ACTIVE -> !it.completed
                FilterState.COMPLETED -> it.completed
                FilterState.ALL -> true
            }
        }
        return div("className" to "commentBox") {
            +h1 { +"Comments" }
            +CommentList(CommentList.data set state.data)
            +CommentForm(CommentForm.onCommentSubmit set handleCommentSubmit)
        }
    }
}

public fun main(args: Array<String>) {
    //React.render(CommentBox().createElement(), document.getElementById("content"))
}