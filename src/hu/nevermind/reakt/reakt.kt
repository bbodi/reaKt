package hu.nevermind.reakt

import kotlin.js.dom.html.document
import org.w3c.dom.Element
import kotlin.properties.Delegates
import kotlin.js.dom.html.HTMLElement
import org.w3c.dom.events.Event
import hu.nevermind.reakt.example.TimelineAppState

public class ReactElementContainer() {
	val elements: MutableList<Any> = arrayListOf()
	val options: MutableList<Pair<String, String>> = arrayListOf()
	var ref: ReactRef
		get() = error("")
		set(value) {
			options.add("ref" to value.name)
		}

	public fun Iterable<ReactClass>.plus() {
		this.forEach {
			elements.add(it.createElement().backend)
		}
	}

	public fun ReactClass.plus() {
		val reactElementJs = this.createElement().backend
		elements.add(reactElementJs)
	}

	public fun ReactElement.plus() {
		elements.add(this.backend)
	}

	public fun Array<out Any>.plus() {
		this.forEach {
			elements.add(if (it is ReactElement) it.backend else it)
		}
	}

	public fun String.plus() {
		elements.add(this)
	}
}



fun createReactElementJs(tagName: String, options: Array<out Pair<String, Any>>, addOptions: (MutableList<Pair<String, Any>>)->Unit, body: (ReactElementContainer.() -> Unit)?): ReactElement {
	val fullOptions = arrayListOf<Pair<String, Any>>()
	fullOptions.addAll(options)
	var elements: Array<Any> = array()
	if (body != null) {
		val elementContainer = ReactElementContainer()
		elementContainer.body()
		fullOptions.addAll(elementContainer.options)
		elements = elementContainer.elements.copyToArray()
	}

	addOptions(fullOptions)
	val constructorParams = createObjectWithDynamicFields(fullOptions)
	val reactElementJs: dynamic = React.DOM.get(tagName)
	//js("reactElementJs = React.DOM["+tagName+"]")
	return ReactElement(reactElementJs(constructorParams, *elements))
}

public fun div(vararg options: Pair<String, String>, body: ReactElementContainer.() -> Unit): ReactElement {
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

public fun label(vararg options: Pair<String, String>, body: ReactElementContainer.() -> Unit): ReactElement {
    return createReactElementJs("label", options, {}, body)
}

public fun form(vararg options: Pair<String, String>, onSubmit: (Event)->Unit={}, body: ReactElementContainer.() -> Unit): ReactElement {
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
	return createReactElementJs("button", options, {options ->
		options.add("type" to type.name().toLowerCase())
	}, body)
}

public fun span(vararg options: Pair<String, String>, body: ReactElementContainer.() -> Unit): ReactElement {
    return createReactElementJs("span", options, {options -> }, body)
}
public fun ul(vararg options: Pair<String, String>, body: ReactElementContainer.() -> Unit): ReactElement {
    return createReactElementJs("ul", options, {options -> }, body)
}

public fun li(vararg options: Pair<String, String>, body: ReactElementContainer.() -> Unit): ReactElement {
    return createReactElementJs("li", options, {options -> }, body)
}

public fun a(vararg options: Pair<String, Any>, body: ReactElementContainer.() -> Unit): ReactElement {
    return createReactElementJs("a", options, {options -> }, body)
}

native("ReactClass")
private class ReactClassJs {

}

native("ReactElement")
private class ReactElementJs {
}

public class ReactElement(val backend: ReactElementJs) {
}

private class ReactDom {
	native nativeGetter
	public fun <V>get(tagName: String): V = noImpl
}

public class React {
	class object {
		val DOM: ReactDom = ReactJs.DOM
		public fun render(element: ReactElement?, container: Element, callback: () -> Unit = {}) {
			ReactJs.render(element?.backend, container, callback)
		}

		public fun createClass(reactClass: ReactClass): ReactClassJs {
			// render: (ReactProps) -> ReactElement?
			return ReactJs.createClass(object {
				val render = {
					// this = ReactCompositeComponent
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
			})
		}

        private fun readStateFromJsToKotlin(self: dynamic, reactClass: ReactClass) {
            val props = self.props
            reactClass.propsJs = props
            val refs = self.refs
            reactClass.refs = refs
            if (reactClass is StatefulReactClass<*>) {
                val state = self.state
                reactClass.setStateJs(state)
            }
            reactClass.reactClassRuntimeRepr = self
        }
    }
}

native("React")
class ReactJs {
	class object {
		val DOM: ReactDom = ReactDom()
		public fun render(element: ReactElementJs?, container: Element, callback: () -> Unit = {}): Unit = noImpl
		public fun createClass(param: Any): ReactClassJs = noImpl
		public fun createElement(clazz: ReactClassJs, options: Any?, vararg children: Any): ReactElementJs = noImpl
	}
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


abstract public class StatefulReactClass<STATE>(constructorOptions: Array<out PropertyPair<out Any>>, body: ReactElementContainer.() -> Unit) : ReactClass(constructorOptions, body) {

    var state: STATE = getInitialState()
        private set

    public fun changeState(body: ()->STATE) {
        state = body()
        forceUpdate()
    }

    abstract fun getInitialState(): STATE

    //var state: STATE by Delegates.notNull()

    public fun setState(newState: STATE) {
        reactClassRuntimeRepr.setState(newState)
    }

    public fun forceUpdate() {
        reactClassRuntimeRepr.forceUpdate()
    }

    fun setStateJs(st: Any) {
        //state = st as STATE
    }
}

public data class PropertyDefinition<V> {
    public val id: String = "name_${hashCode()}"
}

public fun <V> PropertyDefinition<V>.set(param: V): PropertyPair<V> {
    return PropertyPair(this, param)
}

public data class PropertyPair<V>(val key: PropertyDefinition<V>, val value: V)

private class ReactClassRuntimeRepr {
    native fun <STATE> setState(newState: STATE): Unit = noImpl

    native fun forceUpdate(): Unit = noImpl
}

abstract public class ReactClass(private val constructorOptions: Array<out PropertyPair<out Any>>, val body: ReactElementContainer.() -> Unit) {

    var reactClassRuntimeRepr: ReactClassRuntimeRepr by Delegates.notNull()

    public fun ref(name: String): ReactRef = ReactRef(this, name)

	// TODO private
    var propsJs: ReactPropsJs? = null
	public fun <V> props(prop: PropertyDefinition<V>): V {
        return propsJs!!.get<V>(prop.id)
    }
    var refs: ReactRefs? = null

	public val children: Array<Any>
		get() {
			val children = propsJs!!.children
			return if (children is Array<Any>) {
				children
			} else {
				array(children)
			}
		}

	abstract fun render(): ReactElement?
	open fun componentDidMount() {}

	val backend = React.createClass(this)

	public fun createElement(): ReactElement {
		val elementContainer = ReactElementContainer()
		elementContainer.body()

		val fullOptions = arrayListOf<Pair<String, Any>>()
        constructorOptions.forEach {
            fullOptions.add(Pair(it.key.id, it.value))
        }

		fullOptions.addAll(elementContainer.options)

		val constructorParams = createObjectWithDynamicFields(fullOptions)

		return ReactElement(ReactJs.createElement(this.backend, constructorParams, *elementContainer.elements.copyToArray()))
	}
}

private fun createObjectWithDynamicFields(options: Iterable<Pair<String, Any>>): Any {
	val tmpObj = object {}
	for ((key, value) in options) {
        val convertedValue: Any = when(value) {
            is ReactRef -> value.name
            else -> value
        }
		js("tmpObj[key] = convertedValue")
	}
	return tmpObj
}