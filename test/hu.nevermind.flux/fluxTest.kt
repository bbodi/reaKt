package hu.nevermind.flux

import kotlin.test.assertEquals
import kotlin.test.assertTrue
import org.junit.Test
import kotlin.test.fails

private class TestAction1Payload() {

}

val testAction1 = ActionDef<Int>()

private object CTestStore : Store() {
	var callbacks = ""
	{
		register(testAction1, {(count: Int) ->
			waitFor(ATestStore, BTestStore)
			callbacks = ATestStore.callbacks + BTestStore.callbacks
		})
	}
}

private object ATestStore : Store() {
	var callbacks = ""
	{
		register(testAction1, {(count: Int) -> callbacks = callbacks + "a($count)" })
	}
}

private object BTestStore : Store() {
	var callbacks = ""
	{
		register(testAction1, {(count: Int) -> callbacks = callbacks + "b($count)" })
	}
}

class DispatcherSpecs {

	Test fun dispatcherShouldExecuteAllSubscriber() {
		testAction1.dispatch(2);
		assertEquals("a(2)", ATestStore.callbacks)
		assertEquals("b(2)", BTestStore.callbacks)
		assertEquals("a(2)b(2)", CTestStore.callbacks)

		testAction1.dispatch(3);
		assertEquals("a(2)a(3)", ATestStore.callbacks)
		assertEquals("b(2)b(3)", BTestStore.callbacks)
		assertEquals("a(2)a(3)b(2)b(3)", CTestStore.callbacks)
	}
}