package hu.nevermind.reakt

import kotlin.js.dom.html.document
import org.w3c.dom.Element
import kotlin.properties.Delegates
import kotlin.js.dom.html.HTMLElement
import org.w3c.dom.events.Event

abstract public class ReactClass(body: ReactElementContainer.() -> Unit = {}) {

	val children: Array<ReactNode> = ReactElementCollecter(body).elements

	abstract fun render(): ReactElement?
	open fun componentDidMount() {
	}

	open fun componentWillUnmount() {
	}

	var reactComponentJs: ReactComponentJs by Delegates.notNull()

	public fun ref(name: String): ReactRef = ReactRef(this, name)

	// TODO private
	var refs: ReactRefs? = null


	val reactClassJs = React.createClass(this)

	public fun createElement(): ReactElement {
		val fullOptions = arrayListOf<Pair<String, Any>>()
		val constructorParams = createObjectWithDynamicFields(fullOptions)
		return ReactElement(ReactJs.createElement(this.reactClassJs, constructorParams, *children))
	}
}

native("ReactClass")
private class ReactClassJs

native("ReactElement")
private class ReactElementJs

public class ReactElement(val backend: ReactElementJs)

private class ReactDom {
	native nativeGetter
	public fun <V>get(tagName: String): V = noImpl
}

public object React {
	val DOM: ReactDom = ReactJs.DOM
	public fun render(element: ReactElement?, container: Element, callback: () -> Unit = {}) {
		ReactJs.render(element?.backend, container, callback)
	}

	public fun createClass(reactClass: ReactClass): ReactClassJs {
		return ReactJs.createClass(object {
			val render = {
				// At this point, JavaScript this = ReactCompositeComponent
				var self: dynamic = null
				js("self = this")
				readStateFromJsToKotlin(self, reactClass)
				reactClass.render()?.backend
			}
			val componentDidMount = {
				var self: dynamic = null
				js("self = this")
				readStateFromJsToKotlin(self, reactClass)
				reactClass.componentDidMount()
			}
			val componentWillUnmount = {
				var self: dynamic = null
				js("self = this")
				readStateFromJsToKotlin(self, reactClass)
				reactClass.componentWillUnmount()
			}
		})
	}

	private fun readStateFromJsToKotlin(self: dynamic, reactClass: ReactClass) {
		val props = self.props
		val refs = self.refs
		reactClass.refs = refs
		reactClass.reactComponentJs = self
	}
}

native("React")
private object ReactJs {
	val DOM: ReactDom = ReactDom()
	public fun render(element: ReactElementJs?, container: Element, callback: () -> Unit = {}): Unit = noImpl
	public fun createClass(param: Any): ReactClassJs = noImpl
	public fun createElement(clazz: ReactClassJs?, options: Any?, vararg children: Any): ReactElementJs = noImpl
}


class ReactPropsJs() {
	native
	val children: Any = noImpl

	native nativeGetter
	public fun <V>get(name: String): V = noImpl

	native nativeSetter
	public fun <V>set(name: String, value: V): Unit = noImpl
}

class ReactRefs() {

	native nativeGetter
	public fun <V>get(name: String): V = noImpl

	native nativeSetter
	public fun <V>set(name: String, value: V): Unit = noImpl
}

public data class ReactRef(val reactClass: ReactClass, val name: String) {
	public fun getDOMNode(): HTMLElement {
		var ref: dynamic = reactClass.refs!!.get(name)
		return ref.getDOMNode()
	}
}


abstract public class StatefulReactClass<STATE>(initialState: STATE, body: ReactElementContainer.()->Unit={}) : ReactClass(body) {

	var state: STATE = initialState
		private set

	public fun changeState(body: () -> STATE) {
		state = body()
		forceUpdate()
	}

	public fun forceUpdate() {
		reactComponentJs.forceUpdate()
	}
}

private class ReactComponentJs {
	native fun <STATE> setState(newState: STATE): Unit = noImpl

	native fun forceUpdate(): Unit = noImpl
}

public class ReactElementCollecter(val body: ReactElementContainer.() -> Unit) {

	val elements: Array<ReactNode>

	{
		val reactElementContainer = ReactElementContainer()
		reactElementContainer.body()
		elements = reactElementContainer.elements.copyToArray()
	}
}

trait ReactNode {
	val value: Any
}
class ReactElementNode(override val value: ReactElement) : ReactNode
class ReactTextNode(override val value: String) : ReactNode
class ReactNumberNode(override val value: Number) : ReactNode

public class ReactElementContainer() {
	val elements: MutableList<ReactNode> = arrayListOf()


	public fun Iterable<ReactClass>.plus() {
		this.forEach {
			elements.add(ReactElementNode(it.createElement()))
		}
	}

	public fun ReactClass.plus() {
		val reactElement = this.createElement()
		elements.add(ReactElementNode(reactElement))
	}

	public fun ReactElement.plus() {
		elements.add(ReactElementNode(this))
	}

	public fun Array<out ReactElement>.plus() {
		elements.addAll(this.map{ReactElementNode(it)})
	}

	public fun String.plus() {
		elements.add(ReactTextNode(this))
	}

	public fun ReactNode.plus() {
		elements.add(this)
	}

	public fun Iterable<ReactNode>.plus() {
		elements.addAll(this)
	}
}


fun createReactElementJs(tagName: String, options: Array<out Pair<String, Any>>, addOptions: (MutableList<Pair<String, Any>>) -> Unit, body: (ReactElementContainer.() -> Unit)?): ReactElement {
	val fullOptions = arrayListOf<Pair<String, Any>>()
	fullOptions.addAll(options)
	var elements: Array<ReactNode> = array()
	if (body != null) {
		val elementContainer = ReactElementContainer()
		elementContainer.body()
		elements = elementContainer.elements.copyToArray()
	}

	addOptions(fullOptions)
	val constructorParams = createObjectWithDynamicFields(fullOptions)
	val reactElementJs: dynamic = React.DOM.get(tagName)
	val childrenArray = elements.map { it.value }.copyToArray()
	return ReactElement(reactElementJs(constructorParams, *childrenArray))
}

private fun createObjectWithDynamicFields(options: Iterable<Pair<String, Any>>): Any {
	val tmpObj = object {}
	for ((key, value) in options) {
		val convertedValue: Any = when (value) {
			is ReactRef -> value.name
			else -> value
		}
		js("tmpObj[key] = convertedValue")
	}
	return tmpObj
}

public fun div(vararg options: Pair<String, Any>, body: ReactElementContainer.() -> Unit): ReactElement {
	return createReactElementJs("div", options, {}, body)
}

public fun h1(vararg options: Pair<String, String> = array(), body: ReactElementContainer.() -> Unit): ReactElement {
	return createReactElementJs("h1", options, {}, body)
}

public fun h2(vararg options: Pair<String, String>, body: ReactElementContainer.() -> Unit): ReactElement {
	return createReactElementJs("h2", options, {}, body)
}

public fun h3(vararg options: Pair<String, String>, body: ReactElementContainer.() -> Unit): ReactElement {
	return createReactElementJs("h3", options, {}, body)
}

public fun h4(vararg options: Pair<String, String>, body: ReactElementContainer.() -> Unit): ReactElement {
	return createReactElementJs("h4", options, {}, body)
}

public fun small(vararg options: Pair<String, String>, body: ReactElementContainer.() -> Unit): ReactElement {
	return createReactElementJs("small", options, {}, body)
}

public fun label(vararg options: Pair<String, String>, body: ReactElementContainer.() -> Unit): ReactElement {
	return createReactElementJs("label", options, {}, body)
}

public fun form(vararg options: Pair<String, String>, onSubmit: (Event) -> Unit = {}, body: ReactElementContainer.() -> Unit): ReactElement {
	return createReactElementJs("form", options, { options ->
		options.add("onSubmit" to onSubmit)
	}, body)
}

public enum class InputType {
	BUTTON
	CHECKBOX
	COLOR
	DATE
	DATETIME
	DATETIME_LOCAL
	EMAIL
	FILE
	HIDDEN
	IMAGE
	MONTH
	NUMBER
	PASSWORD
	RADIO
	RANGE
	RESET
	SEARCH
	SUBMIT
	TEL
	TEXT
	TIME
	URL
	WEEK
}

public fun input(type: InputType, vararg options: Pair<String, Any>): ReactElement {
	return createReactElementJs("input", options, { options ->
		options.add("type" to type.name().toLowerCase())
	}, null)
}

public fun textarea(rows: Int, cols: Int, vararg options: Pair<String, Any>): ReactElement {
	return createReactElementJs("textarea", options, { options ->
		options.add("rows" to rows)
		options.add("cols" to cols)
	}, null)
}

public fun table(vararg options: Pair<String, String>, body: ReactElementContainer.() -> Unit): ReactElement {
	return createReactElementJs("table", options, {}, body)
}

public fun thead(vararg options: Pair<String, String>, body: ReactElementContainer.() -> Unit): ReactElement {
	return createReactElementJs("thead", options, {}, body)
}

public fun tbody(vararg options: Pair<String, String>, body: ReactElementContainer.() -> Unit): ReactElement {
	return createReactElementJs("tbody", options, {}, body)
}

public fun td(vararg options: Pair<String, Any>, body: ReactElementContainer.() -> Unit): ReactElement {
	return createReactElementJs("td", options, {}, body)
}

public fun th(vararg options: Pair<String, String>, body: ReactElementContainer.() -> Unit): ReactElement {
	return createReactElementJs("th", options, {}, body)
}

public fun tr(vararg options: Pair<String, String>, body: ReactElementContainer.() -> Unit): ReactElement {
	return createReactElementJs("tr", options, {}, body)
}

public enum class ButtonType {
	BUTTON
	RESET
	SUBMIT
}

public fun button(type: ButtonType = ButtonType.BUTTON, vararg options: Pair<String, Any>, body: ReactElementContainer.() -> Unit): ReactElement {
	return createReactElementJs("button", options, { options ->
		options.add("type" to type.name().toLowerCase())
	}, body)
}

public fun span(vararg options: Pair<String, String>, body: ReactElementContainer.() -> Unit): ReactElement {
	return createReactElementJs("span", options, { options -> }, body)
}

public fun ul(vararg options: Pair<String, String>, body: ReactElementContainer.() -> Unit): ReactElement {
	return createReactElementJs("ul", options, { options -> }, body)
}

public fun li(vararg options: Pair<String, String>, body: ReactElementContainer.() -> Unit): ReactElement {
	return createReactElementJs("li", options, { options -> }, body)
}

public fun a(vararg options: Pair<String, Any>, body: ReactElementContainer.() -> Unit): ReactElement {
	return createReactElementJs("a", options, { options -> }, body)
}