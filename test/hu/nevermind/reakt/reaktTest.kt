package hu.nevermind.reakt

import org.junit.Test
import kotlin.js.dom.html.document

private class ContentToggle(body: ReactElementContainer.()->Unit) : ReactClass(body) {
	override fun render(): ReactElement? {
		return div() {
			val allElements = children.size()
			val openedElements = children.filter { (it.value as ContentElement).state }.size()
			+"$openedElements are open from $allElements"
			children.forEach {
				+it
			}
		}
	}
}

private class ContentElement(opened: Boolean, val content: ReactElement) : StatefulReactClass<Boolean>(opened) {
	override fun render(): ReactElement? {
		return div {
			+button(ButtonType.BUTTON, "onClick" to onClick) {
				+if (state) "Close" else "Open"
			}
			if (state) {
				+content
			}
		}
	}
	val onClick = {
		changeState {
			!state
		}
	}
}

class ReaktTest {
	 fun asd() {
		var node = document.getElementById("testContent");
		//js("React.render(React.createElement('div', null, 'Béla'), node)")
		val component = ContentToggle() {
			+ContentElement(true, div{+"Hello"})
			+ContentElement(false, div{+"World"})
			+ContentElement(false, div{+"!"})
			+ContentElement(false, button{+"Toggle me!"})
		}
		//React.render(component.createElement(), node);
	}
}