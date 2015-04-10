package hu.nevermind.reakt

import hu.nevermind.react.Property
import kotlin.js.dom.html.Window
import kotlin.js.dom.html.Event

// TODO
trait EventTarget {
    val value: String
}

// TODO
trait DataTransfer {
}

// TODO
class Style {
}

trait SyntheticEvent  {
    var bubbles: Boolean
    var cancelable: Boolean
    var currentTarget: EventTarget
    var defaultPrevented: Boolean
    var eventPhase: Int
    var nativeEvent: Event
    var `type`: String
    var timeStamp: Date
    fun preventDefault(): Unit
    fun stopPropagation(): Unit
}

trait ClipboardEvent : SyntheticEvent {
    var clipboardData: DataTransfer
}

trait KeyboardEvent : SyntheticEvent {
    var altKey: Boolean
    var ctrlKey: Boolean
    var charCode: Int
    var key: String
    var keyCode: Int
    var locale: String
    var location: Int
    var metaKey: Boolean
    var repeat: Boolean
    var shiftKey: Boolean
    var which: Int
}

trait FocusEvent : SyntheticEvent {
    var relatedTarget: EventTarget
}

trait FormEvent : SyntheticEvent {
}

trait MouseEvent : SyntheticEvent {
    var altKey: Boolean
    var button: Int
    var buttons: Int
    var clientX: Int
    var clientY: Int
    var ctrlKey: Boolean
    var pageX: Int
    var pageY: Int
    var relatedTarget: EventTarget
    var screenX: Int
    var screenY: Int
    var shiftKey: Boolean
}

trait TouchEvent : SyntheticEvent {
    var altKey: Boolean
    var changedTouches: TouchEvent
    var ctrlKey: Boolean
    var metaKey: Boolean
    var shiftKey: Boolean
    var targetTouches: Any//DOMTouchList
    var touches: Any//DOMTouchList
}

trait UIEvent : SyntheticEvent {
    var detail: Int
    var view: Window
}

trait WheelEvent  {
    var deltaX: Int
    var deltaMode: Int
    var deltaY: Int
    var deltaZ: Int
}

open class ReactProperties  {
    open var key: String? = null
    open var ref: String? = null
    var onCopy: ((event: ClipboardEvent) -> Unit)? = null
    var onCut: ((event: ClipboardEvent) -> Unit)? = null
    var onPaste: ((event: ClipboardEvent) -> Unit)? = null
    var onKeyDown: ((event: KeyboardEvent) -> Unit)? = null
    var onKeyPress: ((event: KeyboardEvent) -> Unit)? = null
    var onKeyUp: ((event: KeyboardEvent) -> Unit)? = null
    var onFocus: ((event: FocusEvent) -> Unit)? = null
    var onBlur: ((event: FocusEvent) -> Unit)? = null
    var onChange: ((event: FormEvent) -> Unit)? = null
    var onInput: ((event: FormEvent) -> Unit)? = null
    var onSubmit: ((event: FormEvent) -> Unit)? = null
    var onClick: ((event: MouseEvent) -> Unit)? = null
    var onDoubleClick: ((event: MouseEvent) -> Unit)? = null
    var onDrag: ((event: MouseEvent) -> Unit)? = null
    var onDragEnd: ((event: MouseEvent) -> Unit)? = null
    var onDragEnter: ((event: MouseEvent) -> Unit)? = null
    var onDragExit: ((event: MouseEvent) -> Unit)? = null
    var onDragLeave: ((event: MouseEvent) -> Unit)? = null
    var onDragOver: ((event: MouseEvent) -> Unit)? = null
    var onDragStart: ((event: MouseEvent) -> Unit)? = null
    var onDrop: ((event: MouseEvent) -> Unit)? = null
    var onMouseDown: ((event: MouseEvent) -> Unit)? = null
    var onMouseEnter: ((event: MouseEvent) -> Unit)? = null
    var onMouseLeave: ((event: MouseEvent) -> Unit)? = null
    var onMouseMove: ((event: MouseEvent) -> Unit)? = null
    var onMouseUp: ((event: MouseEvent) -> Unit)? = null
    var onTouchCancel: ((event: TouchEvent) -> Unit)? = null
    var onTouchEnd: ((event: TouchEvent) -> Unit)? = null
    var onTouchMove: ((event: TouchEvent) -> Unit)? = null
    var onTouchStart: ((event: TouchEvent) -> Unit)? = null
    var onScroll: ((event: UIEvent) -> Unit)? = null
    var onWheel: ((event: WheelEvent) -> Unit)? = null
}

open class HtmlGlobalProperties : ReactProperties() {
    override var key: String? = null
    var accessKey: String? = null
    var className: String? = null
    var contentEditable: String? = null
    var contextMenu: String? = null
    var dir: String? = null
    var draggable: Boolean? = null
    var hidden: Boolean? = null
    var id: String? = null
    var lang: String? = null
    var spellCheck: Boolean? = null
    var role: String? = null
    var scrollLeft: Int? = null
    var scrollTop: Int? = null
    var style: Style? = null
}

class FormProperties : HtmlGlobalProperties() {
    var accept: String? = null
    var action: String? = null
    var autoCapitalize: String? = null
    var autoComplete: String? = null
    var encType: String? = null
    var method: String? = null
    var name: String? = null
    var target: String? = null
}

class InputProperties : HtmlGlobalProperties() {
    var accept: String? = null
    var alt: String? = null
    var autoCapitalize: String? = null
    var autoComplete: String? = null
    var autoFocus: Boolean? = null
    var checked: Any? = null
    var defaultValue: Any? = null
    var disabled: Boolean? = null
    var form: String? = null
    var height: Int? = null
    var list: String? = null
    var max: Int? = null
    var maxLength: Int? = null
    var min: Int? = null
    var multiple: Boolean? = null
    var name: String? = null
    var pattern: String? = null
    var placeholder: String? = null
    var readOnly: Boolean? = null
    var required: Boolean? = null
    var size: Int? = null
    var src: String? = null
    var step: Int? = null
    var `type`: String? = null
    var value: String? = null
    var width: Int? = null
}

class IframeProperties : HtmlGlobalProperties() {
    var allowFullScreen: Boolean? = null
    var allowTransparency: Boolean? = null
    var frameBorder: Int? = null
    var height: Int? = null
    var name: String? = null
    var src: String? = null
    var width: Int? = null
}

class AppletProperties : HtmlGlobalProperties() {
    var alt: String? = null
}

class AreaProperties : HtmlGlobalProperties() {
    var alt: String? = null
    var href: String? = null
    var rel: String? = null
    var target: String? = null
}

class ImgProperties : HtmlGlobalProperties() {
    var alt: String? = null
    var height: Int? = null
    var src: String? = null
    var width: Int? = null
}

class ButtonProperties : HtmlGlobalProperties() {
    var autoFocus: Boolean? = null
    var disabled: Boolean? = null
    var form: String? = null
    var name: String? = null
    var `type`: String? = null
    var value: String? = null
}

class KeygenProperties : HtmlGlobalProperties() {
    var autoFocus: Boolean? = null
    var form: String? = null
    var name: String? = null
}

class SelectProperties : HtmlGlobalProperties() {
    var autoFocus: Boolean? = null
    var disabled: Boolean? = null
    var form: String? = null
    var multiple: Boolean? = null
    var name: String? = null
    var required: Boolean? = null
    var size: Int? = null
}

class TextareaProperties : HtmlGlobalProperties() {
    var autoFocus: Boolean? = null
    var form: String? = null
    var maxLength: String? = null
    var name: String? = null
    var placeholder: String? = null
    var readOnly: String? = null
    var required: Boolean? = null
}

class AudioProperties : HtmlGlobalProperties() {
    var autoPlay: Boolean? = null
    var controls: Boolean? = null
    var loop: Boolean? = null
    var preload: String? = null
    var src: String? = null
}

class VideoProperties : HtmlGlobalProperties() {
    var autoPlay: Boolean? = null
    var controls: Boolean? = null
    var height: Int? = null
    var loop: Boolean? = null
    var poster: String? = null
    var preload: String? = null
    var src: String? = null
    var width: Int? = null
}

class TableProperties : HtmlGlobalProperties() {
    var cellPadding: Int? = null
    var cellSpacing: Int? = null
}

class MetaProperties : HtmlGlobalProperties() {
    var charSet: String? = null
    var content: String? = null
    var httpEquiv: String? = null
    var name: String? = null
}

class ScriptProperties : HtmlGlobalProperties() {
    var charSet: String? = null
    var src: String? = null
    var `type`: String? = null
}

class CommandProperties : HtmlGlobalProperties() {
    var checked: Boolean? = null
    var icon: String? = null
    var radioGroup: String? = null
    var `type`: String? = null
}

class TdProperties : HtmlGlobalProperties() {
    var colSpan: Int? = null
    var rowSpan: Int? = null
}

class ThProperties : HtmlGlobalProperties() {
    var colSpan: Int? = null
    var rowSpan: Int? = null
}

class ObjectProperties : HtmlGlobalProperties() {
    var data: String? = null
    var form: String? = null
    var height: Int? = null
    var name: String? = null
    var `type`: String? = null
    var width: Int? = null
    var wmode: String? = null
}

class DelProperties : HtmlGlobalProperties() {
    var dateTime: Date? = null
}

class InsProperties : HtmlGlobalProperties() {
    var dateTime: Date? = null
}

class TimeProperties : HtmlGlobalProperties() {
    var dateTime: Date? = null
}

class FieldsetProperties : HtmlGlobalProperties() {
    var form: String? = null
    var name: String? = null
}

class LabelProperties : HtmlGlobalProperties() {
    var form: String? = null
    var htmlFor: String? = null
}

class MeterProperties : HtmlGlobalProperties() {
    var form: String? = null
    var max: Int? = null
    var min: Int? = null
    var value: Int? = null
}

class OutputProperties : HtmlGlobalProperties() {
    var form: String? = null
    var htmlFor: String? = null
    var name: String? = null
}

class ProgressProperties : HtmlGlobalProperties() {
    var form: String? = null
    var max: Int? = null
    var value: Int? = null
}

class CanvasProperties : HtmlGlobalProperties() {
    var height: Int? = null
    var width: Int? = null
}

class EmbedProperties : HtmlGlobalProperties() {
    var height: Int? = null
    var src: String? = null
    var `type`: String? = null
    var width: Int? = null
}

class AProperties : HtmlGlobalProperties() {
    var href: String? = null
    var rel: String? = null
    var target: String? = null
}

class BaseProperties : HtmlGlobalProperties() {
    var href: String? = null
    var target: String? = null
}

class LinkProperties : HtmlGlobalProperties() {
    var href: String? = null
    var rel: String? = null
}

class TrackProperties : HtmlGlobalProperties() {
    var label: String? = null
    var src: String? = null
}

class BgsoundProperties : HtmlGlobalProperties() {
    var loop: Boolean? = null
}

class MarqueeProperties : HtmlGlobalProperties() {
    var loop: Boolean? = null
}

class MapProperties : HtmlGlobalProperties() {
    var name: String? = null
}

class ParamProperties : HtmlGlobalProperties() {
    var name: String? = null
    var value: String? = null
}

class OptionProperties : HtmlGlobalProperties() {
    var selected: Boolean? = null
    var value: String? = null
}

class SourceProperties : HtmlGlobalProperties() {
    var src: String? = null
    var `type`: String? = null
}

class StyleProperties : HtmlGlobalProperties() {
    var `type`: String? = null
}

class MenuProperties : HtmlGlobalProperties() {
    var `type`: String? = null
}

class LiProperties : HtmlGlobalProperties() {
    var value: String? = null
}

class SvgProperties : ReactProperties() {
    var id: String? = null
    var cx: Int? = null
    var cy: Int? = null
    var d: Int? = null
    var fill: String? = null
    var fx: Int? = null
    var fy: Int? = null
    var gradientTransform: Any? = null
    var gradientUnits: String? = null
    var offset: Int? = null
    var points: Any? = null
    var r: Int? = null
    var rx: Int? = null
    var ry: Int? = null
    var spreadMethod: String? = null
    var stopColor: String? = null
    var stopOpacity: Int? = null
    var stroke: String? = null
    var strokeLinecap: String? = null
    var strokeWidth: Int? = null
    var transform: String? = null
    var version: Int? = null
    var viewBox: Any? = null
    var x1: Int? = null
    var x2: Int? = null
    var x: Int? = null
    var y1: Int? = null
    var y2: Int? = null
    var y: Int? = null
}
