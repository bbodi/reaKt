package hu.nevermind.timeline.store

import kotlin.test.assertEquals
import kotlin.test.assertTrue
import org.junit.Test
import kotlin.test.fails
import hu.nevermind.timeline.Actions
import hu.nevermind.timeline.DataFromServer
import hu.nevermind.timeline.entities.EventInstance
import hu.nevermind.timeline.entities.Id
import net.yested.utils.Moment
import hu.nevermind.timeline.entities.EventField
import hu.nevermind.timeline.entities.EventFieldType
import hu.nevermind.timeline.CommandSender
import hu.nevermind.timeline.Sendable


class EventStoreTest {

    Test fun testDispatchingEventChange() {
        EventStore.commandSender = object : CommandSender {
            val sentObjects: MutableList<Pair<String, Sendable>> = arrayListOf()
            override fun <RESULT> sendCommand(command: String, msg: Sendable, resultHandler: (RESULT) -> Unit) {
                sentObjects.add(command to msg)
            }
        }
        val event = EventInstance(Id(1), "event1", listOf<Id<EventField>>(Id(1), Id(2), Id(3)), Moment.now(), "comment1", Id(1), "tags")
        val field1 = EventField(Id(1), "field1", "value1", EventFieldType.STRING, Id(1))
        // TODO
        //Actions.dataFromServer.dispatch(DataFromServer())
    }
}