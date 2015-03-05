package hu.nevermind.reakt

import kotlin.js.dom.html.document
import org.w3c.dom.Element
import kotlin.properties.Delegates

public class ReactElementContainer() {
    val elements: MutableList<Any> = arrayListOf()

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
    return ReactElement(React.DOM.div(options, *elementContainer.elements.copyToArray()))
}

public fun h1(vararg options: Pair<String, String> = array(), body: ReactElementContainer.() -> Unit): ReactElement {
    val elementContainer = ReactElementContainer()
    elementContainer.body()
    return ReactElement(React.DOM.h1(options, *elementContainer.elements.copyToArray()))
}

public fun h2(options: Pair<String, String>, body: ReactElementContainer.() -> Unit): ReactElement {
    val elementContainer = ReactElementContainer()
    elementContainer.body()
    return ReactElement(React.DOM.h2(options, *elementContainer.elements.copyToArray()))
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

        public fun createClass(render: (ReactProps) -> ReactElement?): ReactClassJs {
            return ReactJs.createClass(object {
                val render = {
                    // this = ReactCompositeComponent
                    val props = js("this.props")
                    render(props)?.backend
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

abstract public class ReactClass(val body: ReactElementContainer.() -> Unit) {
    // TODO private
    public var props: ReactProps? = null
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

    abstract fun doRender(): ReactElement?

    fun render(props: ReactProps): ReactElement? {
        this.props = props
        return doRender()
    }

    val backend = React.createClass(render = { props -> this.render(props) })

    public fun createElement(): ReactElement {
        val constructorParams = createObjectWithDynamicFields()
        val elementContainer = ReactElementContainer()
        elementContainer.body()
        return ReactElement(ReactJs.createElement(this.backend, constructorParams, *elementContainer.elements.copyToArray()))
    }

    private fun createObjectWithDynamicFields(): Any {
        val tmpObj = object {}
        for ((key, value) in constructorParams) {
            js("tmpObj[key] = value")
        }
        return tmpObj
    }
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