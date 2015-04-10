package hu.nevermind.timeline.client

import hu.nevermind.reakt.HtmlGlobalProperties
import hu.nevermind.reakt.MouseEvent
import org.w3c.dom.Node
import org.w3c.dom.Element
import org.w3c.dom.Text
import java.util.ArrayList
import kotlin.js.dom.html.HTMLElement
import kotlin.js.dom.html.document
import kotlin.js.dom.html.window
import kotlin.properties.Delegates
import kotlin.test.assertEquals


fun main(vararg args: String) {
    window.setTimeout({
        val asd = Rows.element {
            +MyCompSpec.element()
            +CounterAdderSpec.element()
        }
        React.render(asd.createReactElement(), document.getElementById("q1"))
        tests()
    }, 500)
}


fun tests() {
    val counter = Counter.element(7)
    val renderedCounter = ReactTestUtils.renderIntoDocument(counter.createReactElement())

    val counterDom = ReactTestUtils.findRenderedDOMComponentWithTag(renderedCounter, "div")
    val dom = React.findDOMNode(counterDom)
    check(dom.textContent == "7")

    //check(renderedCounter.element.lastChild.textContent == "7")
    /*
    simulateClick(divNode)
    Amint látjuk, a fenti divComponent változónak
    az újrarajzolás miatt megváltozott node-dal is vissza kell tudni
    térnie
    assert(divComponent.getDOMNode().textContent == "8")

    // teszt: okozzon hibát, ha egy szülõnek több ugyanolyan ID-jü gyermeke is van.


    val counterAdder = CounterAdder("asd")
    // assert no div in counterAddder
    assert findRenderedAllDOMComponentsWithTag(counterAdder, 'div') is empty
    var counterAdderButtonDom = findRenderedDOMComponentWithTag(counterAdder, 'button')
    simulateClick(counterAdderButtonDom)
    // 2 gombnyomás után a Counter értéke kettõ lesz
    val counter = findRenderedComponentWithType(counterAdder, Counter)
    var counterDiv = findRenderedDOMComponentWithTag(counterAdder, 'div')
    simulateClick(counterDiv)
    simulateClick(counterDiv)
    assert(counterDiv.getDOMNode().textContent == "2")

    simulateClick(counterAdderButtonDom)
    assert(counterDiv.getDOMNode().textContent == "2")
    val counters = findAllRenderedComponentsWithType(counterAdder, Counter)

    var counter1Div = findRenderedDOMComponentWithTag(counters[0], 'div')
    var counter2Div = findRenderedDOMComponentWithTag(counters[0], 'div')
    assert(counter1Div.getDOMNode().textContent == "2")
    assert(counter2Div.getDOMNode().textContent == "0")
    simulateClick(counter2Div)
    simulateClick(counter2Div)
    simulateClick(counter2Div)
    assert(counter2Div.getDOMNode().textContent == "3")

    simulateClick(counterAdderButtonDom)
    val counters = findAllRenderedComponentsWithType(counterAdder, Counter)
    var counter1Div = findRenderedDOMComponentWithTag(counters[0], 'div')
    var counter2Div = findRenderedDOMComponentWithTag(counters[0], 'div')
    var counter3Div = findRenderedDOMComponentWithTag(counters[0], 'div')
    assert(counter1Div.getDOMNode().textContent == "2")
    assert(counter2Div.getDOMNode().textContent == "3")
    assert(counter3Div.getDOMNode().textContent == "0")
    */
}

// ha egy component változik, a teljes részfáját fel kell szabadítani
// a state-ket pedig törölni belõlük
// pl. ha egy form egyik input fieldje: "name", majd megnyitom ezt a formot egy másik adattal
// akkor ez a "name" nem lehet az, ami az elõbbi megnyitáskor volt értéke.


object Rows : ReactSpec<Nothing?, Nothing>() {
    override val render: ComponentBuilder.() -> ReactElementCreator = {
        ul {
            children.forEach {
                +li {
                    +it
                }
                +div {}
            }
        }
    }

    fun element(body: ComponentBuilder.() -> Unit): ReactSpecInstance<Nothing?, Nothing> {
        val childrenFromUserSite = collectChildren(body)
        return ReactSpecInstance<Nothing?, Nothing>(this, null, childrenFromUserSite)
    }
}

object Counter : ReactSpec<Int, Int>() {
    override fun initialState(): Int = 3

    private val handleClick = { e: MouseEvent ->
        println("CLICK: props: $props")
        //state = state + 1
    }

    override val render: ComponentBuilder.() -> ReactElementCreator = {
        div({ onClick = handleClick; key = "$props" }) {
            //+"$state"
            println("Draw props: $props")
            +"$props"
        }
        /*return div({onClick = handleClick}) {
        +"${state}"
    }*/
    }

    fun element(initialValue: Int): ReactSpecInstance<Int, Int> {
        return ReactSpecInstance(this, initialValue, emptyList())
    }
}

object CounterAdderSpec : ReactSpec<Nothing, List<Int>>() {
    private val handleClick = { e: MouseEvent ->
        println("clicked")
        //state = state + 1
    }

    override val render: ComponentBuilder.() -> ReactElementCreator = {
        div {
            +Counter.element(1)
            +Counter.element(2)
            /*state.forEach {

        }*/
            //+button({onClick = handleClick}) { +"Add" }
        }
    }
}

object MyCompSpec : ReactSpec<Nothing, Nothing>() {

    override val render: ComponentBuilder.() -> ReactElementCreator = {
        div {
            +Rows.element {
                +div { +"Hello" }
                +div { +"World" }
                +div { +"Salala" }
                +div { +"!!!" }
            }
            +div { +"Hello" }
        }
    }
}


fun div(propBuilder: HtmlGlobalProperties.() -> Unit = {}, body: ComponentBuilder.() -> Unit): TagElement {
    val props = HtmlGlobalProperties()
    props.propBuilder()
    // TODO: nem mûködik!
    js("delete props.key")
    return TagElement("div", props, collectChildren(body))
}

fun ul(body: ComponentBuilder.() -> Unit): TagElement {
    return TagElement("ul", null, collectChildren(body))
}

fun li(body: ComponentBuilder.() -> Unit): TagElement {
    return TagElement("li", null, collectChildren(body))
}


open public data class TagElement(val tagName: String, val options: dynamic, val children: Iterable<CanAppearInComponentTree>?) : ReactElementCreator {
    // TODO: Ha itt tudom, hogy ez egy TagElement, akkor minek
    // hívom meg az általános React.createElement-et, amikor abban va negy when(). ami
    // nem hatékony!
    override fun createReactElement(): ReactComponent {
        return React.createElement(tagName, options, children)
    }
}

public data class StringNode(val text: String) : CanAppearInComponentTree

public trait CanAppearInComponentTree

// egy olyan osztály, amelybõl Elementet lehet csinálni
// ReactClass (Spec) + props + children. Mind a props és mind a children
// meghatározható a létrehozás pontjánál (Spec.invoke)
public class ReactSpecInstance<P, S>(val componentSpec: ReactSpec<P, S>, val props: P = null, val childrenFromUserSide: Iterable<CanAppearInComponentTree> = emptyList()) : ReactElementCreator {

    private var reactComponent: ReactComponent by Delegates.notNull()

    override fun createReactElement(): ReactComponent {
        // ezen a ponton adunk a componentSpec children, state,props
        // fieldjeinek mindig más-más értéket, az aktuális példánytól függõen.
        // A componentSpec kódja meg felhazsnálhatja ezeket

        // TODO: függvénybe: inject_instance_fields_to_react_class
        componentSpec.children = childrenFromUserSide

        /**
         * A Renderbõl tilos meghívni a setState-t (mert gondolom akkor még nincs ReactComponent)
         * Tehát lényegében a rendernél még nem kell készen áljon a ReactComponent.
         * ==> A state-t vedd a ReactComponentbõl, a propsot ne!
         */


        // TODO: ez elég érdekes: ez a render ugyanaz mint máshol a "body" metódus
        // ami összegyûjti a tageket. Ez viszont vissza is tér egy objektummal,
        // amit it teljesen ignorálunk.
        // A render két dolgot csinál:
        //      - Minden egyes alkalommal, amikor lefut, meghatáérozzuk belõle a
        //      gyermekek listáját
        //      - Visszatér egy ReactElementtel(vagy egy osztállyal ami képes azt elõállítani).
        /*
        * Viszont ennek megfelelõen a ComponentBuilder is több dolgot csinál:
        *   - Lehetõvé teszi a gyermekek hozzáadását (plus fun elérhetõvé tétele)
        *   - Szerintem ennek kellene elérhetõvé tennie a prop és state fieldeket is.
        *   Viszont az Igazi Reactban minden metódus eléri õket, nem csak a render. Tehát
        *   valahogy a Spec osztályoknak kéne elérhetõvé tennem.
        * */
        val renderFunc = componentSpec.render
        val body: ComponentBuilder.() -> Unit = {
            componentSpec.props = props
            renderFunc()
        }
        reactComponent = React.createElement(componentSpec.reactClass, null, collectChildren(body))
        return reactComponent
    }
}

trait ReactElementCreator : CanAppearInComponentTree {
    fun createReactElement(): ReactComponent
}

native("React.addons.TestUtils")
private object ReactTestUtils {
    fun renderIntoDocument(element: dynamic): ReactComponent = noImpl

    fun findRenderedDOMComponentWithTag(renderedCounter: ReactComponent, tagName: String): ReactComponent = noImpl
}

object React {
    fun render(comp: ReactComponent?, element: Element): Unit = ReactJs.render(comp, element)

    fun createElement(tagNameOrSpec: dynamic, options: dynamic, children: Iterable<CanAppearInComponentTree>?): ReactComponent {
        val reactElementChildren = children?.map {
            when (it) {
                is StringNode -> it.text
                is ReactElementCreator -> it.createReactElement()
                else -> error("$it")
            }
        }
        return ReactJs.createElement(tagNameOrSpec, options, *(reactElementChildren?.toArrayList()?.copyToArray()))
    }

    fun findDOMNode(component: ReactComponent): HTMLElement = ReactJs.findDOMNode(component)
}

native("React")
private object ReactJs {

    fun createClass(classSpec: dynamic): ReactComponent = noImpl
    fun createElement(tagNameOrSpec: dynamic, options: dynamic, vararg children: dynamic): ReactComponent = noImpl

    fun render(comp: ReactComponent?, element: Element): Unit = noImpl

    fun findDOMNode(component: ReactComponent): HTMLElement = noImpl
}

data class RuntimeInstanceData<P, S>(val props: P, val state: S) {}

abstract class ReactSpec<P, S> : ReactMixin<P, S> {
    val runtimeInstanceData: RuntimeInstanceData<P, S> by Delegates.notNull()

    var reactClass: ReactComponent? = null
    var component: ReactComponent by Delegates.notNull()
    var children: Iterable<CanAppearInComponentTree> = emptyList()
    protected var state: S
        get() = component.state
        set(value) = component.setState(value)

    var props: P by Delegates.notNull()

    abstract val render: ComponentBuilder.() -> ReactElementCreator

    init {
        reactClass = ReactJs.createClass(object {
            val render = {
                // itt történik a valódi rajzolás, az elõbbieknél csak Elementeket csináltunk,
                // amik tartalmazzák a rajzoló metódusokat. Lényegében Spec+prop+children-ek voltak
                // Itt viszont a fenti hármason meghívódik a render,
                // this =
                // ReactClass.createClass.Constructor {getDOMNode: function, props: Object, context: Object, state: null, refs: Object…}
                //var reactComponent: ReactComponent? = null
                //js("reactComponent = this")
                //component = reactComponent!!

                // itt meg a ComponentBuilder által összegyaûjtött gyermekeket szarjuk le
                val renderFunc = this@ReactSpec.render
                val builder = ComponentBuilder();
                val reactElementCreator = builder.renderFunc()
                reactElementCreator.createReactElement()
            }
        })
    }

    // TODO: legyen majd invoke, de jelenleg bugos
    // this.$render_uxqw6f$ = _.hu.nevermind.timeline.client.render$f_2(Rows_0, Asd);
    // ez lesz belõle, de a Rows_0 nem létezik sehol
    open fun element(): ReactSpecInstance<P, S> {
        return ReactSpecInstance<P, S>(this, null, emptyList())
    }

    fun getInitialState(): S {
        val state = initialState()
        return if (state == null) null else state
    }

    open fun initialState(): S {
        return null
    }

    //abstract fun createReactElement(): ReactComponent

    fun getDefaultProps(): P {
        return null
    }
}

fun collectChildren(body: ComponentBuilder.() -> Unit): Iterable<CanAppearInComponentTree> {
    return ComponentBuilder().collectChildren(body)
}

class ComponentBuilder() {

    protected val componentBuilderChildren: MutableList<CanAppearInComponentTree> = arrayListOf()

    fun CanAppearInComponentTree.plus() {
        componentBuilderChildren.add(this)
    }

    fun String.plus() {
        componentBuilderChildren.add(StringNode(this))
    }

    fun collectChildren(body: ComponentBuilder.() -> Unit): Iterable<CanAppearInComponentTree> {
        this.body()
        return componentBuilderChildren
    }
}

/**
 * Component classses created by createClass() return instances of ReactComponent when called.
 * Most of the time when you're using React you're either creating or consuming these component objects.
 */
native
trait ReactComponent {

    //refs: { [ref: string]: ReactComponent<any, any> }

    val state: dynamic

    val props: dynamic

    /**
     * When you're integrating with an external JavaScript application you may want to signal a change to a React component rendered with renderComponent().
     * Simply call setProps() to change its properties and trigger a re-render.
     *
     * @param nextProps the object that will be merged with the component's props
     * @param callback an optional callback function that is executed once setProps is completed.
     */
    fun setProps(nextProps: /*P*/dynamic, callback: (() -> Unit)?): Unit

    /**
     * Like setProps() but deletes any pre-existing props instead of merging the two objects.
     *
     * @param nextProps the object that will replace the component's props
     * @param callback an optional callback function that is executed once replaceProps is completed.
     */
    fun replaceProps(nextProps: /*P*/dynamic, callback: () -> Unit): Unit

    /**
     * Transfer properties from this component to a target component that have not already been set on the target component.
     * After the props are updated, targetComponent is returned as a convenience.
     *
     * @param target the component that will receive the props
     */
    fun <C : ReactComponent> transferPropsTo(target: C): C

    /**
     * Merges nextState with the current state.
     * This is the primary method you use to trigger UI updates from event handlers and server request callbacks.
     * In addition, you can supply an optional callback function that is executed once setState is completed.
     *
     * @param nextState the object that will be merged with the component's state
     * @param callback an optional callback function that is executed once setState is completed.
     */
    fun setState(nextState: /*S*/dynamic, callback: () -> Unit = {}): Unit

    /**
     * Like setState() but deletes any pre-existing state keys that are not in nextState.
     *
     * @param nextState the object that will replace the component's state
     * @param callback an optional callback function that is executed once replaceState is completed.
     */
    fun replaceState(nextState: /*S*/dynamic, callback: () -> Unit): Unit

    /**
     * If your render() method reads from something other than this.props or this.state,
     * you'll need to tell React when it needs to re-run render() by calling forceUpdate().
     * You'll also need to call forceUpdate() if you mutate this.state directly.
     * Calling forceUpdate() will cause render() to be called on the component and its children,
     * but React will still only update the DOM if the markup changes.
     * Normally you should try to avoid all uses of forceUpdate() and only read from this.props and this.state in render().
     * This makes your application much simpler and more efficient.
     *
     * @param callback an optional callback that is executed once forceUpdate is completed.
     */
    fun forceUpdate(callback: () -> Unit): Unit
}

trait ReactMixin<P, S> {

    /**
     * Invoked immediately before rendering occurs.
     * If you call setState within this method, render() will see the updated state and will be executed only once despite the state change.
     */
    fun componentWillMount(): Unit {
    }

    /**
     * Invoked immediately after rendering occurs.
     * At this point in the lifecycle, the component has a DOM representation which you can access via the rootNode argument or by calling this.getDOMNode().
     * If you want to integrate with other JavaScript frameworks, set timers using setTimeout or setInterval,
     * or send AJAX requests, perform those operations in this method.
     */
    fun componentDidMount(): Unit {
    }

    /**
     * Invoked when a component is receiving new props. This method is not called for the initial render.
     *
     * Use this as an opportunity to react to a prop transition before render() is called by updating the state using this.setState().
     * The old props can be accessed via this.props. Calling this.setState() within this function will not trigger an additional render.
     *
     * @param nextProps the props object that the component will receive
     */
    fun componentWillReceiveProps(nextProps: P): Unit {
    }

    /**
     * Invoked before rendering when new props or state are being received.
     * This method is not called for the initial render or when forceUpdate is used.
     * Use this as an opportunity to return false when you're certain that the transition to the new props and state will not require a component update.
     * By default, shouldComponentUpdate always returns true to prevent subtle bugs when state is mutated in place,
     * but if you are careful to always treat state as immutable and to read only from props and state in render()
     * then you can override shouldComponentUpdate with an implementation that compares the old props and state to their replacements.
     *
     * If performance is a bottleneck, especially with dozens or hundreds of components, use shouldComponentUpdate to speed up your app.
     *
     * @param nextProps the props object that the component will receive
     * @param nextState the state object that the component will receive
     */
    fun shouldComponentUpdate(nextProps: P, nextState: S): Boolean {
        return true
    }

    /**
     * Invoked immediately before rendering when new props or state are being received. This method is not called for the initial render.
     * Use this as an opportunity to perform preparation before an update occurs.
     *
     * @param nextProps the props object that the component has received
     * @param nextState the state object that the component has received
     */
    fun componentWillUpdate(nextProps: P, nextState: S): Unit {
    }

    /**
     * Invoked immediately after updating occurs. This method is not called for the initial render.
     * Use this as an opportunity to operate on the DOM when the component has been updated.
     *
     * @param nextProps the props object that the component has received
     * @param nextState the state object that the component has received
     */
    fun componentDidUpdate(nextProps: P, nextState: S): Unit {
    }

    /**
     * Invoked immediately before a component is unmounted from the DOM.
     * Perform any necessary cleanup in this method, such as invalidating timers or cleaning up any DOM elements that were created in componentDidMount.
     */
    fun componentWillUnmount(): Unit {
    }
}
