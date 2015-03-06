package hu.nevermind.reakt

import kotlin.js.dom.html.document
import org.w3c.dom.Element
import kotlin.properties.Delegates
import kotlin.js.dom.html.HTMLElement
import org.w3c.dom.events.Event

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

public fun div(vararg options: Pair<String, String>, body: ReactElementContainer.() -> Unit): ReactElement {
	val elementContainer = ReactElementContainer()
	elementContainer.body()
	val fullOptions = arrayListOf<Pair<String, Any>>()
	fullOptions.addAll(options)
	fullOptions.addAll(elementContainer.options)
	val constructorParams = createObjectWithDynamicFields(fullOptions)
	return ReactElement(React.DOM.div(constructorParams, *elementContainer.elements.copyToArray()))
}

public fun h1(vararg options: Pair<String, String> = array(), body: ReactElementContainer.() -> Unit): ReactElement {
	val elementContainer = ReactElementContainer()
	elementContainer.body()
	val fullOptions = arrayListOf<Pair<String, Any>>()
	fullOptions.addAll(options)
	fullOptions.addAll(elementContainer.options)
	val constructorParams = createObjectWithDynamicFields(fullOptions)
	return ReactElement(React.DOM.h1(constructorParams, *elementContainer.elements.copyToArray()))
}

public fun h2(vararg options: Pair<String, Any>, body: ReactElementContainer.() -> Unit): ReactElement {
	val elementContainer = ReactElementContainer()
	elementContainer.body()
	val fullOptions = arrayListOf<Pair<String, Any>>()
	fullOptions.addAll(options)
	fullOptions.addAll(elementContainer.options)
	val constructorParams = createObjectWithDynamicFields(fullOptions)
	return ReactElement(React.DOM.h2(constructorParams, *elementContainer.elements.copyToArray()))
}

public fun form(vararg options: Pair<String, Any>, onSubmit: (Event)->Unit={}, body: ReactElementContainer.() -> Unit): ReactElement {
    val elementContainer = ReactElementContainer()
    elementContainer.body()
    val fullOptions = arrayListOf<Pair<String, Any>>()
    fullOptions.addAll(options)
    fullOptions.addAll(elementContainer.options)
    fullOptions.add("onSubmit" to onSubmit)
    val constructorParams = createObjectWithDynamicFields(fullOptions)
    return ReactElement(React.DOM.form(constructorParams, *elementContainer.elements.copyToArray()))
}

public enum class InputType {
    TEXT
    SUBMIT
}
public fun input(vararg options: Pair<String, Any>, type: InputType): ReactElement {
    val fullOptions = arrayListOf<Pair<String, Any>>()
    fullOptions.addAll(options)
    fullOptions.add("type" to type.name().toLowerCase())
    val constructorParams = createObjectWithDynamicFields(fullOptions)
    return ReactElement(React.DOM.input(constructorParams))
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
	native
	fun div(properties: Any?, vararg children: Any): ReactElementJs = noImpl

	fun h1(properties: Any?, vararg children: Any): ReactElementJs = noImpl
	fun h2(properties: Any?, vararg children: Any): ReactElementJs = noImpl
    fun form(properties: Any?, vararg children: Any): ReactElementJs = noImpl

    fun input(properties: Any?): ReactElementJs = noImpl
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
                val getInitialState = {
                    var self: dynamic = null
                    js("self = this")
                    readStateFromJsToKotlin(self, reactClass)
                    if (reactClass is StatefulReactClass<*>) {
                        reactClass.getInitialState()
                    } else {
                        null
                    }
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

    open fun getInitialState(): STATE = noImpl

    var state: STATE by Delegates.notNull()

    public fun setState(newState: STATE) {
        reactClassRuntimeRepr.setState(newState)
    }

    fun setStateJs(st: Any) {
        state = st as STATE
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
    native
    fun <STATE> setState(newState: STATE): Unit = noImpl
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