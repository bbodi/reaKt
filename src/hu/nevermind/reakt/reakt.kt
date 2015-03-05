package hu.nevermind.reakt

import kotlin.js.dom.html.document
import org.w3c.dom.Element
import kotlin.properties.Delegates
import kotlin.js.dom.html.HTMLElement

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
					val props = js("this.props")
					val refs = js("this.refs")
					reactClass.props = props
					reactClass.refs = refs
					reactClass.render()?.backend
				}
				val componentDidMount = {
					val props = js("this.props")
					val refs = js("this.refs")
					reactClass.props = props
					reactClass.refs = refs
					reactClass.componentDidMount()
				}
			})
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


class ReactProps() {
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

abstract public class ReactClass(val body: ReactElementContainer.() -> Unit) {
	public fun ref(name: String): ReactRef = ReactRef(this, name)

	// TODO private
	public var props: ReactProps? = null
	public var refs: ReactRefs? = null

	public val children: Array<Any>
		get() {
			val children = props!!.children
			return if (children is Array<Any>) {
				children
			} else {
				array(children)
			}
		}

	private val constructorParams: MutableList<Pair<String, Any>> = arrayListOf()

	fun addParam(name: String, value: Any) {
		constructorParams.add(name to value)
	}

	abstract fun render(): ReactElement?
	open fun componentDidMount() {
	}

	val backend = React.createClass(this)

	public fun createElement(): ReactElement {
		val elementContainer = ReactElementContainer()
		elementContainer.body()

		val fullOptions = arrayListOf<Pair<String, Any>>()
		fullOptions.addAll(constructorParams)
		fullOptions.addAll(elementContainer.options)

		val constructorParams = createObjectWithDynamicFields(fullOptions)

		return ReactElement(ReactJs.createElement(this.backend, constructorParams, *elementContainer.elements.copyToArray()))
	}
}

private fun createObjectWithDynamicFields(options: Iterable<Pair<String, Any>>): Any {
	val tmpObj = object {}
	for ((key, value) in options) {
		js("tmpObj[key] = value")
	}
	return tmpObj
}


// TODO: it should be in ReactClass class, but currently kotlin us buggy...
public class ReactPropDelegate<V>() {

	fun get(thisRef: ReactClass, fieldMetadata: PropertyMetadata): V {
		return thisRef.props!!.get<V>(fieldMetadata.name)
	}

	fun set(thisRef: ReactClass, fieldMetadata: PropertyMetadata, value: V) {
		if (thisRef.props != null) {
			thisRef.props!!.set(fieldMetadata.name, value)
		} else {
			thisRef.addParam(fieldMetadata.name, value);
		}
	}
}