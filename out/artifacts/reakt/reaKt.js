(function (Kotlin) {
  'use strict';
  var _ = Kotlin.defineRootPackage(null, /** @lends _ */ {
    hu: Kotlin.definePackage(null, /** @lends _.hu */ {
      nevermind: Kotlin.definePackage(null, /** @lends _.hu.nevermind */ {
        reakt: Kotlin.definePackage(null, /** @lends _.hu.nevermind.reakt */ {
          EventTarget: Kotlin.createTrait(null),
          DataTransfer: Kotlin.createTrait(null),
          Style: Kotlin.createClass(null, null),
          SyntheticEvent: Kotlin.createTrait(null),
          ClipboardEvent: Kotlin.createTrait(function () {
            return [_.hu.nevermind.reakt.SyntheticEvent];
          }),
          KeyboardEvent: Kotlin.createTrait(function () {
            return [_.hu.nevermind.reakt.SyntheticEvent];
          }),
          FocusEvent: Kotlin.createTrait(function () {
            return [_.hu.nevermind.reakt.SyntheticEvent];
          }),
          FormEvent: Kotlin.createTrait(function () {
            return [_.hu.nevermind.reakt.SyntheticEvent];
          }),
          MouseEvent: Kotlin.createTrait(function () {
            return [_.hu.nevermind.reakt.SyntheticEvent];
          }),
          TouchEvent: Kotlin.createTrait(function () {
            return [_.hu.nevermind.reakt.SyntheticEvent];
          }),
          UIEvent: Kotlin.createTrait(function () {
            return [_.hu.nevermind.reakt.SyntheticEvent];
          }),
          WheelEvent: Kotlin.createTrait(null),
          ReactProperties: Kotlin.createClass(null, function () {
            this.key$delegate = new _.hu.nevermind.react.Property();
            this.ref$delegate = new _.hu.nevermind.react.Property();
            this.onCopy$delegate = new _.hu.nevermind.react.Property();
            this.onCut$delegate = new _.hu.nevermind.react.Property();
            this.onPaste$delegate = new _.hu.nevermind.react.Property();
            this.onKeyDown$delegate = new _.hu.nevermind.react.Property();
            this.onKeyPress$delegate = new _.hu.nevermind.react.Property();
            this.onKeyUp$delegate = new _.hu.nevermind.react.Property();
            this.onFocus$delegate = new _.hu.nevermind.react.Property();
            this.onBlur$delegate = new _.hu.nevermind.react.Property();
            this.onChange$delegate = new _.hu.nevermind.react.Property();
            this.onInput$delegate = new _.hu.nevermind.react.Property();
            this.onSubmit$delegate = new _.hu.nevermind.react.Property();
            this.onClick$delegate = new _.hu.nevermind.react.Property();
            this.onDoubleClick$delegate = new _.hu.nevermind.react.Property();
            this.onDrag$delegate = new _.hu.nevermind.react.Property();
            this.onDragEnd$delegate = new _.hu.nevermind.react.Property();
            this.onDragEnter$delegate = new _.hu.nevermind.react.Property();
            this.onDragExit$delegate = new _.hu.nevermind.react.Property();
            this.onDragLeave$delegate = new _.hu.nevermind.react.Property();
            this.onDragOver$delegate = new _.hu.nevermind.react.Property();
            this.onDragStart$delegate = new _.hu.nevermind.react.Property();
            this.onDrop$delegate = new _.hu.nevermind.react.Property();
            this.onMouseDown$delegate = new _.hu.nevermind.react.Property();
            this.onMouseEnter$delegate = new _.hu.nevermind.react.Property();
            this.onMouseLeave$delegate = new _.hu.nevermind.react.Property();
            this.onMouseMove$delegate = new _.hu.nevermind.react.Property();
            this.onMouseUp$delegate = new _.hu.nevermind.react.Property();
            this.onTouchCancel$delegate = new _.hu.nevermind.react.Property();
            this.onTouchEnd$delegate = new _.hu.nevermind.react.Property();
            this.onTouchMove$delegate = new _.hu.nevermind.react.Property();
            this.onTouchStart$delegate = new _.hu.nevermind.react.Property();
            this.onScroll$delegate = new _.hu.nevermind.react.Property();
            this.onWheel$delegate = new _.hu.nevermind.react.Property();
          }, /** @lends _.hu.nevermind.reakt.ReactProperties.prototype */ {
            key: {
              get: function () {
                return this.key$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('key'));
              },
              set: function (key) {
                this.key$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('key'), key);
              }
            },
            ref: {
              get: function () {
                return this.ref$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('ref'));
              },
              set: function (ref) {
                this.ref$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('ref'), ref);
              }
            },
            onCopy: {
              get: function () {
                return this.onCopy$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('onCopy'));
              },
              set: function (onCopy) {
                this.onCopy$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('onCopy'), onCopy);
              }
            },
            onCut: {
              get: function () {
                return this.onCut$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('onCut'));
              },
              set: function (onCut) {
                this.onCut$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('onCut'), onCut);
              }
            },
            onPaste: {
              get: function () {
                return this.onPaste$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('onPaste'));
              },
              set: function (onPaste) {
                this.onPaste$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('onPaste'), onPaste);
              }
            },
            onKeyDown: {
              get: function () {
                return this.onKeyDown$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('onKeyDown'));
              },
              set: function (onKeyDown) {
                this.onKeyDown$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('onKeyDown'), onKeyDown);
              }
            },
            onKeyPress: {
              get: function () {
                return this.onKeyPress$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('onKeyPress'));
              },
              set: function (onKeyPress) {
                this.onKeyPress$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('onKeyPress'), onKeyPress);
              }
            },
            onKeyUp: {
              get: function () {
                return this.onKeyUp$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('onKeyUp'));
              },
              set: function (onKeyUp) {
                this.onKeyUp$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('onKeyUp'), onKeyUp);
              }
            },
            onFocus: {
              get: function () {
                return this.onFocus$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('onFocus'));
              },
              set: function (onFocus) {
                this.onFocus$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('onFocus'), onFocus);
              }
            },
            onBlur: {
              get: function () {
                return this.onBlur$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('onBlur'));
              },
              set: function (onBlur) {
                this.onBlur$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('onBlur'), onBlur);
              }
            },
            onChange: {
              get: function () {
                return this.onChange$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('onChange'));
              },
              set: function (onChange) {
                this.onChange$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('onChange'), onChange);
              }
            },
            onInput: {
              get: function () {
                return this.onInput$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('onInput'));
              },
              set: function (onInput) {
                this.onInput$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('onInput'), onInput);
              }
            },
            onSubmit: {
              get: function () {
                return this.onSubmit$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('onSubmit'));
              },
              set: function (onSubmit) {
                this.onSubmit$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('onSubmit'), onSubmit);
              }
            },
            onClick: {
              get: function () {
                return this.onClick$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('onClick'));
              },
              set: function (onClick) {
                this.onClick$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('onClick'), onClick);
              }
            },
            onDoubleClick: {
              get: function () {
                return this.onDoubleClick$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('onDoubleClick'));
              },
              set: function (onDoubleClick) {
                this.onDoubleClick$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('onDoubleClick'), onDoubleClick);
              }
            },
            onDrag: {
              get: function () {
                return this.onDrag$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('onDrag'));
              },
              set: function (onDrag) {
                this.onDrag$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('onDrag'), onDrag);
              }
            },
            onDragEnd: {
              get: function () {
                return this.onDragEnd$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('onDragEnd'));
              },
              set: function (onDragEnd) {
                this.onDragEnd$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('onDragEnd'), onDragEnd);
              }
            },
            onDragEnter: {
              get: function () {
                return this.onDragEnter$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('onDragEnter'));
              },
              set: function (onDragEnter) {
                this.onDragEnter$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('onDragEnter'), onDragEnter);
              }
            },
            onDragExit: {
              get: function () {
                return this.onDragExit$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('onDragExit'));
              },
              set: function (onDragExit) {
                this.onDragExit$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('onDragExit'), onDragExit);
              }
            },
            onDragLeave: {
              get: function () {
                return this.onDragLeave$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('onDragLeave'));
              },
              set: function (onDragLeave) {
                this.onDragLeave$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('onDragLeave'), onDragLeave);
              }
            },
            onDragOver: {
              get: function () {
                return this.onDragOver$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('onDragOver'));
              },
              set: function (onDragOver) {
                this.onDragOver$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('onDragOver'), onDragOver);
              }
            },
            onDragStart: {
              get: function () {
                return this.onDragStart$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('onDragStart'));
              },
              set: function (onDragStart) {
                this.onDragStart$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('onDragStart'), onDragStart);
              }
            },
            onDrop: {
              get: function () {
                return this.onDrop$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('onDrop'));
              },
              set: function (onDrop) {
                this.onDrop$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('onDrop'), onDrop);
              }
            },
            onMouseDown: {
              get: function () {
                return this.onMouseDown$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('onMouseDown'));
              },
              set: function (onMouseDown) {
                this.onMouseDown$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('onMouseDown'), onMouseDown);
              }
            },
            onMouseEnter: {
              get: function () {
                return this.onMouseEnter$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('onMouseEnter'));
              },
              set: function (onMouseEnter) {
                this.onMouseEnter$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('onMouseEnter'), onMouseEnter);
              }
            },
            onMouseLeave: {
              get: function () {
                return this.onMouseLeave$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('onMouseLeave'));
              },
              set: function (onMouseLeave) {
                this.onMouseLeave$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('onMouseLeave'), onMouseLeave);
              }
            },
            onMouseMove: {
              get: function () {
                return this.onMouseMove$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('onMouseMove'));
              },
              set: function (onMouseMove) {
                this.onMouseMove$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('onMouseMove'), onMouseMove);
              }
            },
            onMouseUp: {
              get: function () {
                return this.onMouseUp$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('onMouseUp'));
              },
              set: function (onMouseUp) {
                this.onMouseUp$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('onMouseUp'), onMouseUp);
              }
            },
            onTouchCancel: {
              get: function () {
                return this.onTouchCancel$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('onTouchCancel'));
              },
              set: function (onTouchCancel) {
                this.onTouchCancel$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('onTouchCancel'), onTouchCancel);
              }
            },
            onTouchEnd: {
              get: function () {
                return this.onTouchEnd$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('onTouchEnd'));
              },
              set: function (onTouchEnd) {
                this.onTouchEnd$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('onTouchEnd'), onTouchEnd);
              }
            },
            onTouchMove: {
              get: function () {
                return this.onTouchMove$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('onTouchMove'));
              },
              set: function (onTouchMove) {
                this.onTouchMove$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('onTouchMove'), onTouchMove);
              }
            },
            onTouchStart: {
              get: function () {
                return this.onTouchStart$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('onTouchStart'));
              },
              set: function (onTouchStart) {
                this.onTouchStart$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('onTouchStart'), onTouchStart);
              }
            },
            onScroll: {
              get: function () {
                return this.onScroll$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('onScroll'));
              },
              set: function (onScroll) {
                this.onScroll$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('onScroll'), onScroll);
              }
            },
            onWheel: {
              get: function () {
                return this.onWheel$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('onWheel'));
              },
              set: function (onWheel) {
                this.onWheel$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('onWheel'), onWheel);
              }
            }
          }),
          HtmlGlobalProperties: Kotlin.createClass(function () {
            return [_.hu.nevermind.reakt.ReactProperties];
          }, function $fun() {
            $fun.baseInitializer.call(this);
            this.key$delegate = new _.hu.nevermind.react.Property();
            this.accessKey$delegate = new _.hu.nevermind.react.Property();
            this.className$delegate = new _.hu.nevermind.react.Property();
            this.contentEditable$delegate = new _.hu.nevermind.react.Property();
            this.contextMenu$delegate = new _.hu.nevermind.react.Property();
            this.dir$delegate = new _.hu.nevermind.react.Property();
            this.draggable$delegate = new _.hu.nevermind.react.Property();
            this.hidden$delegate = new _.hu.nevermind.react.Property();
            this.id$delegate = new _.hu.nevermind.react.Property();
            this.lang$delegate = new _.hu.nevermind.react.Property();
            this.spellCheck$delegate = new _.hu.nevermind.react.Property();
            this.role$delegate = new _.hu.nevermind.react.Property();
            this.scrollLeft$delegate = new _.hu.nevermind.react.Property();
            this.scrollTop$delegate = new _.hu.nevermind.react.Property();
            this.style$delegate = new _.hu.nevermind.react.Property();
          }, /** @lends _.hu.nevermind.reakt.HtmlGlobalProperties.prototype */ {
            key: {
              get: function () {
                return this.key$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('key'));
              },
              set: function (key) {
                this.key$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('key'), key);
              }
            },
            accessKey: {
              get: function () {
                return this.accessKey$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('accessKey'));
              },
              set: function (accessKey) {
                this.accessKey$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('accessKey'), accessKey);
              }
            },
            className: {
              get: function () {
                return this.className$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('className'));
              },
              set: function (className) {
                this.className$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('className'), className);
              }
            },
            contentEditable: {
              get: function () {
                return this.contentEditable$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('contentEditable'));
              },
              set: function (contentEditable) {
                this.contentEditable$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('contentEditable'), contentEditable);
              }
            },
            contextMenu: {
              get: function () {
                return this.contextMenu$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('contextMenu'));
              },
              set: function (contextMenu) {
                this.contextMenu$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('contextMenu'), contextMenu);
              }
            },
            dir: {
              get: function () {
                return this.dir$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('dir'));
              },
              set: function (dir) {
                this.dir$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('dir'), dir);
              }
            },
            draggable: {
              get: function () {
                return this.draggable$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('draggable'));
              },
              set: function (draggable) {
                this.draggable$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('draggable'), draggable);
              }
            },
            hidden: {
              get: function () {
                return this.hidden$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('hidden'));
              },
              set: function (hidden) {
                this.hidden$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('hidden'), hidden);
              }
            },
            id: {
              get: function () {
                return this.id$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('id'));
              },
              set: function (id) {
                this.id$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('id'), id);
              }
            },
            lang: {
              get: function () {
                return this.lang$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('lang'));
              },
              set: function (lang) {
                this.lang$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('lang'), lang);
              }
            },
            spellCheck: {
              get: function () {
                return this.spellCheck$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('spellCheck'));
              },
              set: function (spellCheck) {
                this.spellCheck$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('spellCheck'), spellCheck);
              }
            },
            role: {
              get: function () {
                return this.role$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('role'));
              },
              set: function (role) {
                this.role$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('role'), role);
              }
            },
            scrollLeft: {
              get: function () {
                return this.scrollLeft$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('scrollLeft'));
              },
              set: function (scrollLeft) {
                this.scrollLeft$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('scrollLeft'), scrollLeft);
              }
            },
            scrollTop: {
              get: function () {
                return this.scrollTop$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('scrollTop'));
              },
              set: function (scrollTop) {
                this.scrollTop$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('scrollTop'), scrollTop);
              }
            },
            style: {
              get: function () {
                return this.style$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('style'));
              },
              set: function (style) {
                this.style$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('style'), style);
              }
            }
          }),
          FormProperties: Kotlin.createClass(function () {
            return [_.hu.nevermind.reakt.HtmlGlobalProperties];
          }, function $fun() {
            $fun.baseInitializer.call(this);
            this.accept$delegate = new _.hu.nevermind.react.Property();
            this.action$delegate = new _.hu.nevermind.react.Property();
            this.autoCapitalize$delegate = new _.hu.nevermind.react.Property();
            this.autoComplete$delegate = new _.hu.nevermind.react.Property();
            this.encType$delegate = new _.hu.nevermind.react.Property();
            this.method$delegate = new _.hu.nevermind.react.Property();
            this.name$delegate = new _.hu.nevermind.react.Property();
            this.target$delegate = new _.hu.nevermind.react.Property();
          }, /** @lends _.hu.nevermind.reakt.FormProperties.prototype */ {
            accept: {
              get: function () {
                return this.accept$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('accept'));
              },
              set: function (accept) {
                this.accept$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('accept'), accept);
              }
            },
            action: {
              get: function () {
                return this.action$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('action'));
              },
              set: function (action) {
                this.action$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('action'), action);
              }
            },
            autoCapitalize: {
              get: function () {
                return this.autoCapitalize$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('autoCapitalize'));
              },
              set: function (autoCapitalize) {
                this.autoCapitalize$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('autoCapitalize'), autoCapitalize);
              }
            },
            autoComplete: {
              get: function () {
                return this.autoComplete$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('autoComplete'));
              },
              set: function (autoComplete) {
                this.autoComplete$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('autoComplete'), autoComplete);
              }
            },
            encType: {
              get: function () {
                return this.encType$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('encType'));
              },
              set: function (encType) {
                this.encType$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('encType'), encType);
              }
            },
            method: {
              get: function () {
                return this.method$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('method'));
              },
              set: function (method) {
                this.method$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('method'), method);
              }
            },
            name: {
              get: function () {
                return this.name$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('name'));
              },
              set: function (name) {
                this.name$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('name'), name);
              }
            },
            target: {
              get: function () {
                return this.target$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('target'));
              },
              set: function (target) {
                this.target$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('target'), target);
              }
            }
          }),
          InputProperties: Kotlin.createClass(function () {
            return [_.hu.nevermind.reakt.HtmlGlobalProperties];
          }, function $fun() {
            $fun.baseInitializer.call(this);
            this.accept$delegate = new _.hu.nevermind.react.Property();
            this.alt$delegate = new _.hu.nevermind.react.Property();
            this.autoCapitalize$delegate = new _.hu.nevermind.react.Property();
            this.autoComplete$delegate = new _.hu.nevermind.react.Property();
            this.autoFocus$delegate = new _.hu.nevermind.react.Property();
            this.checked$delegate = new _.hu.nevermind.react.Property();
            this.defaultValue$delegate = new _.hu.nevermind.react.Property();
            this.disabled$delegate = new _.hu.nevermind.react.Property();
            this.form$delegate = new _.hu.nevermind.react.Property();
            this.height$delegate = new _.hu.nevermind.react.Property();
            this.list$delegate = new _.hu.nevermind.react.Property();
            this.max$delegate = new _.hu.nevermind.react.Property();
            this.maxLength$delegate = new _.hu.nevermind.react.Property();
            this.min$delegate = new _.hu.nevermind.react.Property();
            this.multiple$delegate = new _.hu.nevermind.react.Property();
            this.name$delegate = new _.hu.nevermind.react.Property();
            this.pattern$delegate = new _.hu.nevermind.react.Property();
            this.placeholder$delegate = new _.hu.nevermind.react.Property();
            this.readOnly$delegate = new _.hu.nevermind.react.Property();
            this.required$delegate = new _.hu.nevermind.react.Property();
            this.size$delegate = new _.hu.nevermind.react.Property();
            this.src$delegate = new _.hu.nevermind.react.Property();
            this.step$delegate = new _.hu.nevermind.react.Property();
            this.type$delegate = new _.hu.nevermind.react.Property();
            this.value$delegate = new _.hu.nevermind.react.Property();
            this.width$delegate = new _.hu.nevermind.react.Property();
          }, /** @lends _.hu.nevermind.reakt.InputProperties.prototype */ {
            accept: {
              get: function () {
                return this.accept$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('accept'));
              },
              set: function (accept) {
                this.accept$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('accept'), accept);
              }
            },
            alt: {
              get: function () {
                return this.alt$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('alt'));
              },
              set: function (alt) {
                this.alt$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('alt'), alt);
              }
            },
            autoCapitalize: {
              get: function () {
                return this.autoCapitalize$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('autoCapitalize'));
              },
              set: function (autoCapitalize) {
                this.autoCapitalize$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('autoCapitalize'), autoCapitalize);
              }
            },
            autoComplete: {
              get: function () {
                return this.autoComplete$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('autoComplete'));
              },
              set: function (autoComplete) {
                this.autoComplete$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('autoComplete'), autoComplete);
              }
            },
            autoFocus: {
              get: function () {
                return this.autoFocus$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('autoFocus'));
              },
              set: function (autoFocus) {
                this.autoFocus$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('autoFocus'), autoFocus);
              }
            },
            checked: {
              get: function () {
                return this.checked$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('checked'));
              },
              set: function (checked) {
                this.checked$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('checked'), checked);
              }
            },
            defaultValue: {
              get: function () {
                return this.defaultValue$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('defaultValue'));
              },
              set: function (defaultValue) {
                this.defaultValue$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('defaultValue'), defaultValue);
              }
            },
            disabled: {
              get: function () {
                return this.disabled$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('disabled'));
              },
              set: function (disabled) {
                this.disabled$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('disabled'), disabled);
              }
            },
            form: {
              get: function () {
                return this.form$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('form'));
              },
              set: function (form) {
                this.form$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('form'), form);
              }
            },
            height: {
              get: function () {
                return this.height$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('height'));
              },
              set: function (height) {
                this.height$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('height'), height);
              }
            },
            list: {
              get: function () {
                return this.list$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('list'));
              },
              set: function (list) {
                this.list$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('list'), list);
              }
            },
            max: {
              get: function () {
                return this.max$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('max'));
              },
              set: function (max) {
                this.max$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('max'), max);
              }
            },
            maxLength: {
              get: function () {
                return this.maxLength$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('maxLength'));
              },
              set: function (maxLength) {
                this.maxLength$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('maxLength'), maxLength);
              }
            },
            min: {
              get: function () {
                return this.min$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('min'));
              },
              set: function (min) {
                this.min$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('min'), min);
              }
            },
            multiple: {
              get: function () {
                return this.multiple$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('multiple'));
              },
              set: function (multiple) {
                this.multiple$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('multiple'), multiple);
              }
            },
            name: {
              get: function () {
                return this.name$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('name'));
              },
              set: function (name) {
                this.name$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('name'), name);
              }
            },
            pattern: {
              get: function () {
                return this.pattern$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('pattern'));
              },
              set: function (pattern) {
                this.pattern$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('pattern'), pattern);
              }
            },
            placeholder: {
              get: function () {
                return this.placeholder$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('placeholder'));
              },
              set: function (placeholder) {
                this.placeholder$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('placeholder'), placeholder);
              }
            },
            readOnly: {
              get: function () {
                return this.readOnly$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('readOnly'));
              },
              set: function (readOnly) {
                this.readOnly$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('readOnly'), readOnly);
              }
            },
            required: {
              get: function () {
                return this.required$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('required'));
              },
              set: function (required) {
                this.required$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('required'), required);
              }
            },
            size: {
              get: function () {
                return this.size$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('size'));
              },
              set: function (size) {
                this.size$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('size'), size);
              }
            },
            src: {
              get: function () {
                return this.src$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('src'));
              },
              set: function (src) {
                this.src$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('src'), src);
              }
            },
            step: {
              get: function () {
                return this.step$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('step'));
              },
              set: function (step) {
                this.step$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('step'), step);
              }
            },
            type: {
              get: function () {
                return this.type$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('type'));
              },
              set: function (type) {
                this.type$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('type'), type);
              }
            },
            value: {
              get: function () {
                return this.value$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('value'));
              },
              set: function (value) {
                this.value$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('value'), value);
              }
            },
            width: {
              get: function () {
                return this.width$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('width'));
              },
              set: function (width) {
                this.width$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('width'), width);
              }
            }
          }),
          IframeProperties: Kotlin.createClass(function () {
            return [_.hu.nevermind.reakt.HtmlGlobalProperties];
          }, function $fun() {
            $fun.baseInitializer.call(this);
            this.allowFullScreen$delegate = new _.hu.nevermind.react.Property();
            this.allowTransparency$delegate = new _.hu.nevermind.react.Property();
            this.frameBorder$delegate = new _.hu.nevermind.react.Property();
            this.height$delegate = new _.hu.nevermind.react.Property();
            this.name$delegate = new _.hu.nevermind.react.Property();
            this.src$delegate = new _.hu.nevermind.react.Property();
            this.width$delegate = new _.hu.nevermind.react.Property();
          }, /** @lends _.hu.nevermind.reakt.IframeProperties.prototype */ {
            allowFullScreen: {
              get: function () {
                return this.allowFullScreen$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('allowFullScreen'));
              },
              set: function (allowFullScreen) {
                this.allowFullScreen$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('allowFullScreen'), allowFullScreen);
              }
            },
            allowTransparency: {
              get: function () {
                return this.allowTransparency$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('allowTransparency'));
              },
              set: function (allowTransparency) {
                this.allowTransparency$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('allowTransparency'), allowTransparency);
              }
            },
            frameBorder: {
              get: function () {
                return this.frameBorder$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('frameBorder'));
              },
              set: function (frameBorder) {
                this.frameBorder$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('frameBorder'), frameBorder);
              }
            },
            height: {
              get: function () {
                return this.height$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('height'));
              },
              set: function (height) {
                this.height$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('height'), height);
              }
            },
            name: {
              get: function () {
                return this.name$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('name'));
              },
              set: function (name) {
                this.name$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('name'), name);
              }
            },
            src: {
              get: function () {
                return this.src$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('src'));
              },
              set: function (src) {
                this.src$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('src'), src);
              }
            },
            width: {
              get: function () {
                return this.width$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('width'));
              },
              set: function (width) {
                this.width$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('width'), width);
              }
            }
          }),
          AppletProperties: Kotlin.createClass(function () {
            return [_.hu.nevermind.reakt.HtmlGlobalProperties];
          }, function $fun() {
            $fun.baseInitializer.call(this);
            this.alt$delegate = new _.hu.nevermind.react.Property();
          }, /** @lends _.hu.nevermind.reakt.AppletProperties.prototype */ {
            alt: {
              get: function () {
                return this.alt$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('alt'));
              },
              set: function (alt) {
                this.alt$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('alt'), alt);
              }
            }
          }),
          AreaProperties: Kotlin.createClass(function () {
            return [_.hu.nevermind.reakt.HtmlGlobalProperties];
          }, function $fun() {
            $fun.baseInitializer.call(this);
            this.alt$delegate = new _.hu.nevermind.react.Property();
            this.href$delegate = new _.hu.nevermind.react.Property();
            this.rel$delegate = new _.hu.nevermind.react.Property();
            this.target$delegate = new _.hu.nevermind.react.Property();
          }, /** @lends _.hu.nevermind.reakt.AreaProperties.prototype */ {
            alt: {
              get: function () {
                return this.alt$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('alt'));
              },
              set: function (alt) {
                this.alt$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('alt'), alt);
              }
            },
            href: {
              get: function () {
                return this.href$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('href'));
              },
              set: function (href) {
                this.href$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('href'), href);
              }
            },
            rel: {
              get: function () {
                return this.rel$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('rel'));
              },
              set: function (rel) {
                this.rel$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('rel'), rel);
              }
            },
            target: {
              get: function () {
                return this.target$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('target'));
              },
              set: function (target) {
                this.target$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('target'), target);
              }
            }
          }),
          ImgProperties: Kotlin.createClass(function () {
            return [_.hu.nevermind.reakt.HtmlGlobalProperties];
          }, function $fun() {
            $fun.baseInitializer.call(this);
            this.alt$delegate = new _.hu.nevermind.react.Property();
            this.height$delegate = new _.hu.nevermind.react.Property();
            this.src$delegate = new _.hu.nevermind.react.Property();
            this.width$delegate = new _.hu.nevermind.react.Property();
          }, /** @lends _.hu.nevermind.reakt.ImgProperties.prototype */ {
            alt: {
              get: function () {
                return this.alt$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('alt'));
              },
              set: function (alt) {
                this.alt$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('alt'), alt);
              }
            },
            height: {
              get: function () {
                return this.height$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('height'));
              },
              set: function (height) {
                this.height$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('height'), height);
              }
            },
            src: {
              get: function () {
                return this.src$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('src'));
              },
              set: function (src) {
                this.src$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('src'), src);
              }
            },
            width: {
              get: function () {
                return this.width$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('width'));
              },
              set: function (width) {
                this.width$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('width'), width);
              }
            }
          }),
          ButtonProperties: Kotlin.createClass(function () {
            return [_.hu.nevermind.reakt.HtmlGlobalProperties];
          }, function $fun() {
            $fun.baseInitializer.call(this);
            this.autoFocus$delegate = new _.hu.nevermind.react.Property();
            this.disabled$delegate = new _.hu.nevermind.react.Property();
            this.form$delegate = new _.hu.nevermind.react.Property();
            this.name$delegate = new _.hu.nevermind.react.Property();
            this.type$delegate = new _.hu.nevermind.react.Property();
            this.value$delegate = new _.hu.nevermind.react.Property();
          }, /** @lends _.hu.nevermind.reakt.ButtonProperties.prototype */ {
            autoFocus: {
              get: function () {
                return this.autoFocus$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('autoFocus'));
              },
              set: function (autoFocus) {
                this.autoFocus$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('autoFocus'), autoFocus);
              }
            },
            disabled: {
              get: function () {
                return this.disabled$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('disabled'));
              },
              set: function (disabled) {
                this.disabled$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('disabled'), disabled);
              }
            },
            form: {
              get: function () {
                return this.form$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('form'));
              },
              set: function (form) {
                this.form$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('form'), form);
              }
            },
            name: {
              get: function () {
                return this.name$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('name'));
              },
              set: function (name) {
                this.name$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('name'), name);
              }
            },
            type: {
              get: function () {
                return this.type$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('type'));
              },
              set: function (type) {
                this.type$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('type'), type);
              }
            },
            value: {
              get: function () {
                return this.value$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('value'));
              },
              set: function (value) {
                this.value$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('value'), value);
              }
            }
          }),
          KeygenProperties: Kotlin.createClass(function () {
            return [_.hu.nevermind.reakt.HtmlGlobalProperties];
          }, function $fun() {
            $fun.baseInitializer.call(this);
            this.autoFocus$delegate = new _.hu.nevermind.react.Property();
            this.form$delegate = new _.hu.nevermind.react.Property();
            this.name$delegate = new _.hu.nevermind.react.Property();
          }, /** @lends _.hu.nevermind.reakt.KeygenProperties.prototype */ {
            autoFocus: {
              get: function () {
                return this.autoFocus$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('autoFocus'));
              },
              set: function (autoFocus) {
                this.autoFocus$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('autoFocus'), autoFocus);
              }
            },
            form: {
              get: function () {
                return this.form$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('form'));
              },
              set: function (form) {
                this.form$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('form'), form);
              }
            },
            name: {
              get: function () {
                return this.name$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('name'));
              },
              set: function (name) {
                this.name$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('name'), name);
              }
            }
          }),
          SelectProperties: Kotlin.createClass(function () {
            return [_.hu.nevermind.reakt.HtmlGlobalProperties];
          }, function $fun() {
            $fun.baseInitializer.call(this);
            this.autoFocus$delegate = new _.hu.nevermind.react.Property();
            this.disabled$delegate = new _.hu.nevermind.react.Property();
            this.form$delegate = new _.hu.nevermind.react.Property();
            this.multiple$delegate = new _.hu.nevermind.react.Property();
            this.name$delegate = new _.hu.nevermind.react.Property();
            this.required$delegate = new _.hu.nevermind.react.Property();
            this.size$delegate = new _.hu.nevermind.react.Property();
          }, /** @lends _.hu.nevermind.reakt.SelectProperties.prototype */ {
            autoFocus: {
              get: function () {
                return this.autoFocus$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('autoFocus'));
              },
              set: function (autoFocus) {
                this.autoFocus$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('autoFocus'), autoFocus);
              }
            },
            disabled: {
              get: function () {
                return this.disabled$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('disabled'));
              },
              set: function (disabled) {
                this.disabled$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('disabled'), disabled);
              }
            },
            form: {
              get: function () {
                return this.form$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('form'));
              },
              set: function (form) {
                this.form$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('form'), form);
              }
            },
            multiple: {
              get: function () {
                return this.multiple$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('multiple'));
              },
              set: function (multiple) {
                this.multiple$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('multiple'), multiple);
              }
            },
            name: {
              get: function () {
                return this.name$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('name'));
              },
              set: function (name) {
                this.name$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('name'), name);
              }
            },
            required: {
              get: function () {
                return this.required$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('required'));
              },
              set: function (required) {
                this.required$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('required'), required);
              }
            },
            size: {
              get: function () {
                return this.size$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('size'));
              },
              set: function (size) {
                this.size$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('size'), size);
              }
            }
          }),
          TextareaProperties: Kotlin.createClass(function () {
            return [_.hu.nevermind.reakt.HtmlGlobalProperties];
          }, function $fun() {
            $fun.baseInitializer.call(this);
            this.autoFocus$delegate = new _.hu.nevermind.react.Property();
            this.form$delegate = new _.hu.nevermind.react.Property();
            this.maxLength$delegate = new _.hu.nevermind.react.Property();
            this.name$delegate = new _.hu.nevermind.react.Property();
            this.placeholder$delegate = new _.hu.nevermind.react.Property();
            this.readOnly$delegate = new _.hu.nevermind.react.Property();
            this.required$delegate = new _.hu.nevermind.react.Property();
          }, /** @lends _.hu.nevermind.reakt.TextareaProperties.prototype */ {
            autoFocus: {
              get: function () {
                return this.autoFocus$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('autoFocus'));
              },
              set: function (autoFocus) {
                this.autoFocus$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('autoFocus'), autoFocus);
              }
            },
            form: {
              get: function () {
                return this.form$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('form'));
              },
              set: function (form) {
                this.form$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('form'), form);
              }
            },
            maxLength: {
              get: function () {
                return this.maxLength$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('maxLength'));
              },
              set: function (maxLength) {
                this.maxLength$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('maxLength'), maxLength);
              }
            },
            name: {
              get: function () {
                return this.name$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('name'));
              },
              set: function (name) {
                this.name$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('name'), name);
              }
            },
            placeholder: {
              get: function () {
                return this.placeholder$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('placeholder'));
              },
              set: function (placeholder) {
                this.placeholder$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('placeholder'), placeholder);
              }
            },
            readOnly: {
              get: function () {
                return this.readOnly$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('readOnly'));
              },
              set: function (readOnly) {
                this.readOnly$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('readOnly'), readOnly);
              }
            },
            required: {
              get: function () {
                return this.required$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('required'));
              },
              set: function (required) {
                this.required$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('required'), required);
              }
            }
          }),
          AudioProperties: Kotlin.createClass(function () {
            return [_.hu.nevermind.reakt.HtmlGlobalProperties];
          }, function $fun() {
            $fun.baseInitializer.call(this);
            this.autoPlay$delegate = new _.hu.nevermind.react.Property();
            this.controls$delegate = new _.hu.nevermind.react.Property();
            this.loop$delegate = new _.hu.nevermind.react.Property();
            this.preload$delegate = new _.hu.nevermind.react.Property();
            this.src$delegate = new _.hu.nevermind.react.Property();
          }, /** @lends _.hu.nevermind.reakt.AudioProperties.prototype */ {
            autoPlay: {
              get: function () {
                return this.autoPlay$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('autoPlay'));
              },
              set: function (autoPlay) {
                this.autoPlay$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('autoPlay'), autoPlay);
              }
            },
            controls: {
              get: function () {
                return this.controls$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('controls'));
              },
              set: function (controls) {
                this.controls$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('controls'), controls);
              }
            },
            loop: {
              get: function () {
                return this.loop$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('loop'));
              },
              set: function (loop) {
                this.loop$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('loop'), loop);
              }
            },
            preload: {
              get: function () {
                return this.preload$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('preload'));
              },
              set: function (preload) {
                this.preload$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('preload'), preload);
              }
            },
            src: {
              get: function () {
                return this.src$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('src'));
              },
              set: function (src) {
                this.src$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('src'), src);
              }
            }
          }),
          VideoProperties: Kotlin.createClass(function () {
            return [_.hu.nevermind.reakt.HtmlGlobalProperties];
          }, function $fun() {
            $fun.baseInitializer.call(this);
            this.autoPlay$delegate = new _.hu.nevermind.react.Property();
            this.controls$delegate = new _.hu.nevermind.react.Property();
            this.height$delegate = new _.hu.nevermind.react.Property();
            this.loop$delegate = new _.hu.nevermind.react.Property();
            this.poster$delegate = new _.hu.nevermind.react.Property();
            this.preload$delegate = new _.hu.nevermind.react.Property();
            this.src$delegate = new _.hu.nevermind.react.Property();
            this.width$delegate = new _.hu.nevermind.react.Property();
          }, /** @lends _.hu.nevermind.reakt.VideoProperties.prototype */ {
            autoPlay: {
              get: function () {
                return this.autoPlay$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('autoPlay'));
              },
              set: function (autoPlay) {
                this.autoPlay$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('autoPlay'), autoPlay);
              }
            },
            controls: {
              get: function () {
                return this.controls$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('controls'));
              },
              set: function (controls) {
                this.controls$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('controls'), controls);
              }
            },
            height: {
              get: function () {
                return this.height$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('height'));
              },
              set: function (height) {
                this.height$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('height'), height);
              }
            },
            loop: {
              get: function () {
                return this.loop$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('loop'));
              },
              set: function (loop) {
                this.loop$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('loop'), loop);
              }
            },
            poster: {
              get: function () {
                return this.poster$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('poster'));
              },
              set: function (poster) {
                this.poster$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('poster'), poster);
              }
            },
            preload: {
              get: function () {
                return this.preload$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('preload'));
              },
              set: function (preload) {
                this.preload$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('preload'), preload);
              }
            },
            src: {
              get: function () {
                return this.src$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('src'));
              },
              set: function (src) {
                this.src$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('src'), src);
              }
            },
            width: {
              get: function () {
                return this.width$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('width'));
              },
              set: function (width) {
                this.width$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('width'), width);
              }
            }
          }),
          TableProperties: Kotlin.createClass(function () {
            return [_.hu.nevermind.reakt.HtmlGlobalProperties];
          }, function $fun() {
            $fun.baseInitializer.call(this);
            this.cellPadding$delegate = new _.hu.nevermind.react.Property();
            this.cellSpacing$delegate = new _.hu.nevermind.react.Property();
          }, /** @lends _.hu.nevermind.reakt.TableProperties.prototype */ {
            cellPadding: {
              get: function () {
                return this.cellPadding$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('cellPadding'));
              },
              set: function (cellPadding) {
                this.cellPadding$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('cellPadding'), cellPadding);
              }
            },
            cellSpacing: {
              get: function () {
                return this.cellSpacing$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('cellSpacing'));
              },
              set: function (cellSpacing) {
                this.cellSpacing$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('cellSpacing'), cellSpacing);
              }
            }
          }),
          MetaProperties: Kotlin.createClass(function () {
            return [_.hu.nevermind.reakt.HtmlGlobalProperties];
          }, function $fun() {
            $fun.baseInitializer.call(this);
            this.charSet$delegate = new _.hu.nevermind.react.Property();
            this.content$delegate = new _.hu.nevermind.react.Property();
            this.httpEquiv$delegate = new _.hu.nevermind.react.Property();
            this.name$delegate = new _.hu.nevermind.react.Property();
          }, /** @lends _.hu.nevermind.reakt.MetaProperties.prototype */ {
            charSet: {
              get: function () {
                return this.charSet$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('charSet'));
              },
              set: function (charSet) {
                this.charSet$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('charSet'), charSet);
              }
            },
            content: {
              get: function () {
                return this.content$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('content'));
              },
              set: function (content) {
                this.content$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('content'), content);
              }
            },
            httpEquiv: {
              get: function () {
                return this.httpEquiv$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('httpEquiv'));
              },
              set: function (httpEquiv) {
                this.httpEquiv$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('httpEquiv'), httpEquiv);
              }
            },
            name: {
              get: function () {
                return this.name$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('name'));
              },
              set: function (name) {
                this.name$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('name'), name);
              }
            }
          }),
          ScriptProperties: Kotlin.createClass(function () {
            return [_.hu.nevermind.reakt.HtmlGlobalProperties];
          }, function $fun() {
            $fun.baseInitializer.call(this);
            this.charSet$delegate = new _.hu.nevermind.react.Property();
            this.src$delegate = new _.hu.nevermind.react.Property();
            this.type$delegate = new _.hu.nevermind.react.Property();
          }, /** @lends _.hu.nevermind.reakt.ScriptProperties.prototype */ {
            charSet: {
              get: function () {
                return this.charSet$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('charSet'));
              },
              set: function (charSet) {
                this.charSet$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('charSet'), charSet);
              }
            },
            src: {
              get: function () {
                return this.src$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('src'));
              },
              set: function (src) {
                this.src$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('src'), src);
              }
            },
            type: {
              get: function () {
                return this.type$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('type'));
              },
              set: function (type) {
                this.type$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('type'), type);
              }
            }
          }),
          CommandProperties: Kotlin.createClass(function () {
            return [_.hu.nevermind.reakt.HtmlGlobalProperties];
          }, function $fun() {
            $fun.baseInitializer.call(this);
            this.checked$delegate = new _.hu.nevermind.react.Property();
            this.icon$delegate = new _.hu.nevermind.react.Property();
            this.radioGroup$delegate = new _.hu.nevermind.react.Property();
            this.type$delegate = new _.hu.nevermind.react.Property();
          }, /** @lends _.hu.nevermind.reakt.CommandProperties.prototype */ {
            checked: {
              get: function () {
                return this.checked$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('checked'));
              },
              set: function (checked) {
                this.checked$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('checked'), checked);
              }
            },
            icon: {
              get: function () {
                return this.icon$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('icon'));
              },
              set: function (icon) {
                this.icon$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('icon'), icon);
              }
            },
            radioGroup: {
              get: function () {
                return this.radioGroup$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('radioGroup'));
              },
              set: function (radioGroup) {
                this.radioGroup$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('radioGroup'), radioGroup);
              }
            },
            type: {
              get: function () {
                return this.type$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('type'));
              },
              set: function (type) {
                this.type$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('type'), type);
              }
            }
          }),
          TdProperties: Kotlin.createClass(function () {
            return [_.hu.nevermind.reakt.HtmlGlobalProperties];
          }, function $fun() {
            $fun.baseInitializer.call(this);
            this.colSpan$delegate = new _.hu.nevermind.react.Property();
            this.rowSpan$delegate = new _.hu.nevermind.react.Property();
          }, /** @lends _.hu.nevermind.reakt.TdProperties.prototype */ {
            colSpan: {
              get: function () {
                return this.colSpan$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('colSpan'));
              },
              set: function (colSpan) {
                this.colSpan$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('colSpan'), colSpan);
              }
            },
            rowSpan: {
              get: function () {
                return this.rowSpan$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('rowSpan'));
              },
              set: function (rowSpan) {
                this.rowSpan$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('rowSpan'), rowSpan);
              }
            }
          }),
          ThProperties: Kotlin.createClass(function () {
            return [_.hu.nevermind.reakt.HtmlGlobalProperties];
          }, function $fun() {
            $fun.baseInitializer.call(this);
            this.colSpan$delegate = new _.hu.nevermind.react.Property();
            this.rowSpan$delegate = new _.hu.nevermind.react.Property();
          }, /** @lends _.hu.nevermind.reakt.ThProperties.prototype */ {
            colSpan: {
              get: function () {
                return this.colSpan$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('colSpan'));
              },
              set: function (colSpan) {
                this.colSpan$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('colSpan'), colSpan);
              }
            },
            rowSpan: {
              get: function () {
                return this.rowSpan$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('rowSpan'));
              },
              set: function (rowSpan) {
                this.rowSpan$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('rowSpan'), rowSpan);
              }
            }
          }),
          ObjectProperties: Kotlin.createClass(function () {
            return [_.hu.nevermind.reakt.HtmlGlobalProperties];
          }, function $fun() {
            $fun.baseInitializer.call(this);
            this.data$delegate = new _.hu.nevermind.react.Property();
            this.form$delegate = new _.hu.nevermind.react.Property();
            this.height$delegate = new _.hu.nevermind.react.Property();
            this.name$delegate = new _.hu.nevermind.react.Property();
            this.type$delegate = new _.hu.nevermind.react.Property();
            this.width$delegate = new _.hu.nevermind.react.Property();
            this.wmode$delegate = new _.hu.nevermind.react.Property();
          }, /** @lends _.hu.nevermind.reakt.ObjectProperties.prototype */ {
            data: {
              get: function () {
                return this.data$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('data'));
              },
              set: function (data) {
                this.data$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('data'), data);
              }
            },
            form: {
              get: function () {
                return this.form$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('form'));
              },
              set: function (form) {
                this.form$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('form'), form);
              }
            },
            height: {
              get: function () {
                return this.height$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('height'));
              },
              set: function (height) {
                this.height$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('height'), height);
              }
            },
            name: {
              get: function () {
                return this.name$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('name'));
              },
              set: function (name) {
                this.name$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('name'), name);
              }
            },
            type: {
              get: function () {
                return this.type$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('type'));
              },
              set: function (type) {
                this.type$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('type'), type);
              }
            },
            width: {
              get: function () {
                return this.width$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('width'));
              },
              set: function (width) {
                this.width$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('width'), width);
              }
            },
            wmode: {
              get: function () {
                return this.wmode$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('wmode'));
              },
              set: function (wmode) {
                this.wmode$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('wmode'), wmode);
              }
            }
          }),
          DelProperties: Kotlin.createClass(function () {
            return [_.hu.nevermind.reakt.HtmlGlobalProperties];
          }, function $fun() {
            $fun.baseInitializer.call(this);
            this.dateTime$delegate = new _.hu.nevermind.react.Property();
          }, /** @lends _.hu.nevermind.reakt.DelProperties.prototype */ {
            dateTime: {
              get: function () {
                return this.dateTime$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('dateTime'));
              },
              set: function (dateTime) {
                this.dateTime$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('dateTime'), dateTime);
              }
            }
          }),
          InsProperties: Kotlin.createClass(function () {
            return [_.hu.nevermind.reakt.HtmlGlobalProperties];
          }, function $fun() {
            $fun.baseInitializer.call(this);
            this.dateTime$delegate = new _.hu.nevermind.react.Property();
          }, /** @lends _.hu.nevermind.reakt.InsProperties.prototype */ {
            dateTime: {
              get: function () {
                return this.dateTime$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('dateTime'));
              },
              set: function (dateTime) {
                this.dateTime$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('dateTime'), dateTime);
              }
            }
          }),
          TimeProperties: Kotlin.createClass(function () {
            return [_.hu.nevermind.reakt.HtmlGlobalProperties];
          }, function $fun() {
            $fun.baseInitializer.call(this);
            this.dateTime$delegate = new _.hu.nevermind.react.Property();
          }, /** @lends _.hu.nevermind.reakt.TimeProperties.prototype */ {
            dateTime: {
              get: function () {
                return this.dateTime$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('dateTime'));
              },
              set: function (dateTime) {
                this.dateTime$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('dateTime'), dateTime);
              }
            }
          }),
          FieldsetProperties: Kotlin.createClass(function () {
            return [_.hu.nevermind.reakt.HtmlGlobalProperties];
          }, function $fun() {
            $fun.baseInitializer.call(this);
            this.form$delegate = new _.hu.nevermind.react.Property();
            this.name$delegate = new _.hu.nevermind.react.Property();
          }, /** @lends _.hu.nevermind.reakt.FieldsetProperties.prototype */ {
            form: {
              get: function () {
                return this.form$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('form'));
              },
              set: function (form) {
                this.form$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('form'), form);
              }
            },
            name: {
              get: function () {
                return this.name$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('name'));
              },
              set: function (name) {
                this.name$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('name'), name);
              }
            }
          }),
          LabelProperties: Kotlin.createClass(function () {
            return [_.hu.nevermind.reakt.HtmlGlobalProperties];
          }, function $fun() {
            $fun.baseInitializer.call(this);
            this.form$delegate = new _.hu.nevermind.react.Property();
            this.htmlFor$delegate = new _.hu.nevermind.react.Property();
          }, /** @lends _.hu.nevermind.reakt.LabelProperties.prototype */ {
            form: {
              get: function () {
                return this.form$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('form'));
              },
              set: function (form) {
                this.form$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('form'), form);
              }
            },
            htmlFor: {
              get: function () {
                return this.htmlFor$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('htmlFor'));
              },
              set: function (htmlFor) {
                this.htmlFor$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('htmlFor'), htmlFor);
              }
            }
          }),
          MeterProperties: Kotlin.createClass(function () {
            return [_.hu.nevermind.reakt.HtmlGlobalProperties];
          }, function $fun() {
            $fun.baseInitializer.call(this);
            this.form$delegate = new _.hu.nevermind.react.Property();
            this.max$delegate = new _.hu.nevermind.react.Property();
            this.min$delegate = new _.hu.nevermind.react.Property();
            this.value$delegate = new _.hu.nevermind.react.Property();
          }, /** @lends _.hu.nevermind.reakt.MeterProperties.prototype */ {
            form: {
              get: function () {
                return this.form$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('form'));
              },
              set: function (form) {
                this.form$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('form'), form);
              }
            },
            max: {
              get: function () {
                return this.max$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('max'));
              },
              set: function (max) {
                this.max$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('max'), max);
              }
            },
            min: {
              get: function () {
                return this.min$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('min'));
              },
              set: function (min) {
                this.min$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('min'), min);
              }
            },
            value: {
              get: function () {
                return this.value$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('value'));
              },
              set: function (value) {
                this.value$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('value'), value);
              }
            }
          }),
          OutputProperties: Kotlin.createClass(function () {
            return [_.hu.nevermind.reakt.HtmlGlobalProperties];
          }, function $fun() {
            $fun.baseInitializer.call(this);
            this.form$delegate = new _.hu.nevermind.react.Property();
            this.htmlFor$delegate = new _.hu.nevermind.react.Property();
            this.name$delegate = new _.hu.nevermind.react.Property();
          }, /** @lends _.hu.nevermind.reakt.OutputProperties.prototype */ {
            form: {
              get: function () {
                return this.form$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('form'));
              },
              set: function (form) {
                this.form$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('form'), form);
              }
            },
            htmlFor: {
              get: function () {
                return this.htmlFor$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('htmlFor'));
              },
              set: function (htmlFor) {
                this.htmlFor$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('htmlFor'), htmlFor);
              }
            },
            name: {
              get: function () {
                return this.name$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('name'));
              },
              set: function (name) {
                this.name$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('name'), name);
              }
            }
          }),
          ProgressProperties: Kotlin.createClass(function () {
            return [_.hu.nevermind.reakt.HtmlGlobalProperties];
          }, function $fun() {
            $fun.baseInitializer.call(this);
            this.form$delegate = new _.hu.nevermind.react.Property();
            this.max$delegate = new _.hu.nevermind.react.Property();
            this.value$delegate = new _.hu.nevermind.react.Property();
          }, /** @lends _.hu.nevermind.reakt.ProgressProperties.prototype */ {
            form: {
              get: function () {
                return this.form$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('form'));
              },
              set: function (form) {
                this.form$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('form'), form);
              }
            },
            max: {
              get: function () {
                return this.max$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('max'));
              },
              set: function (max) {
                this.max$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('max'), max);
              }
            },
            value: {
              get: function () {
                return this.value$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('value'));
              },
              set: function (value) {
                this.value$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('value'), value);
              }
            }
          }),
          CanvasProperties: Kotlin.createClass(function () {
            return [_.hu.nevermind.reakt.HtmlGlobalProperties];
          }, function $fun() {
            $fun.baseInitializer.call(this);
            this.height$delegate = new _.hu.nevermind.react.Property();
            this.width$delegate = new _.hu.nevermind.react.Property();
          }, /** @lends _.hu.nevermind.reakt.CanvasProperties.prototype */ {
            height: {
              get: function () {
                return this.height$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('height'));
              },
              set: function (height) {
                this.height$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('height'), height);
              }
            },
            width: {
              get: function () {
                return this.width$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('width'));
              },
              set: function (width) {
                this.width$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('width'), width);
              }
            }
          }),
          EmbedProperties: Kotlin.createClass(function () {
            return [_.hu.nevermind.reakt.HtmlGlobalProperties];
          }, function $fun() {
            $fun.baseInitializer.call(this);
            this.height$delegate = new _.hu.nevermind.react.Property();
            this.src$delegate = new _.hu.nevermind.react.Property();
            this.type$delegate = new _.hu.nevermind.react.Property();
            this.width$delegate = new _.hu.nevermind.react.Property();
          }, /** @lends _.hu.nevermind.reakt.EmbedProperties.prototype */ {
            height: {
              get: function () {
                return this.height$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('height'));
              },
              set: function (height) {
                this.height$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('height'), height);
              }
            },
            src: {
              get: function () {
                return this.src$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('src'));
              },
              set: function (src) {
                this.src$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('src'), src);
              }
            },
            type: {
              get: function () {
                return this.type$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('type'));
              },
              set: function (type) {
                this.type$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('type'), type);
              }
            },
            width: {
              get: function () {
                return this.width$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('width'));
              },
              set: function (width) {
                this.width$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('width'), width);
              }
            }
          }),
          AProperties: Kotlin.createClass(function () {
            return [_.hu.nevermind.reakt.HtmlGlobalProperties];
          }, function $fun() {
            $fun.baseInitializer.call(this);
            this.href$delegate = new _.hu.nevermind.react.Property();
            this.rel$delegate = new _.hu.nevermind.react.Property();
            this.target$delegate = new _.hu.nevermind.react.Property();
          }, /** @lends _.hu.nevermind.reakt.AProperties.prototype */ {
            href: {
              get: function () {
                return this.href$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('href'));
              },
              set: function (href) {
                this.href$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('href'), href);
              }
            },
            rel: {
              get: function () {
                return this.rel$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('rel'));
              },
              set: function (rel) {
                this.rel$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('rel'), rel);
              }
            },
            target: {
              get: function () {
                return this.target$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('target'));
              },
              set: function (target) {
                this.target$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('target'), target);
              }
            }
          }),
          BaseProperties: Kotlin.createClass(function () {
            return [_.hu.nevermind.reakt.HtmlGlobalProperties];
          }, function $fun() {
            $fun.baseInitializer.call(this);
            this.href$delegate = new _.hu.nevermind.react.Property();
            this.target$delegate = new _.hu.nevermind.react.Property();
          }, /** @lends _.hu.nevermind.reakt.BaseProperties.prototype */ {
            href: {
              get: function () {
                return this.href$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('href'));
              },
              set: function (href) {
                this.href$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('href'), href);
              }
            },
            target: {
              get: function () {
                return this.target$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('target'));
              },
              set: function (target) {
                this.target$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('target'), target);
              }
            }
          }),
          LinkProperties: Kotlin.createClass(function () {
            return [_.hu.nevermind.reakt.HtmlGlobalProperties];
          }, function $fun() {
            $fun.baseInitializer.call(this);
            this.href$delegate = new _.hu.nevermind.react.Property();
            this.rel$delegate = new _.hu.nevermind.react.Property();
          }, /** @lends _.hu.nevermind.reakt.LinkProperties.prototype */ {
            href: {
              get: function () {
                return this.href$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('href'));
              },
              set: function (href) {
                this.href$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('href'), href);
              }
            },
            rel: {
              get: function () {
                return this.rel$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('rel'));
              },
              set: function (rel) {
                this.rel$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('rel'), rel);
              }
            }
          }),
          TrackProperties: Kotlin.createClass(function () {
            return [_.hu.nevermind.reakt.HtmlGlobalProperties];
          }, function $fun() {
            $fun.baseInitializer.call(this);
            this.label$delegate = new _.hu.nevermind.react.Property();
            this.src$delegate = new _.hu.nevermind.react.Property();
          }, /** @lends _.hu.nevermind.reakt.TrackProperties.prototype */ {
            label: {
              get: function () {
                return this.label$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('label'));
              },
              set: function (label) {
                this.label$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('label'), label);
              }
            },
            src: {
              get: function () {
                return this.src$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('src'));
              },
              set: function (src) {
                this.src$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('src'), src);
              }
            }
          }),
          BgsoundProperties: Kotlin.createClass(function () {
            return [_.hu.nevermind.reakt.HtmlGlobalProperties];
          }, function $fun() {
            $fun.baseInitializer.call(this);
            this.loop$delegate = new _.hu.nevermind.react.Property();
          }, /** @lends _.hu.nevermind.reakt.BgsoundProperties.prototype */ {
            loop: {
              get: function () {
                return this.loop$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('loop'));
              },
              set: function (loop) {
                this.loop$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('loop'), loop);
              }
            }
          }),
          MarqueeProperties: Kotlin.createClass(function () {
            return [_.hu.nevermind.reakt.HtmlGlobalProperties];
          }, function $fun() {
            $fun.baseInitializer.call(this);
            this.loop$delegate = new _.hu.nevermind.react.Property();
          }, /** @lends _.hu.nevermind.reakt.MarqueeProperties.prototype */ {
            loop: {
              get: function () {
                return this.loop$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('loop'));
              },
              set: function (loop) {
                this.loop$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('loop'), loop);
              }
            }
          }),
          MapProperties: Kotlin.createClass(function () {
            return [_.hu.nevermind.reakt.HtmlGlobalProperties];
          }, function $fun() {
            $fun.baseInitializer.call(this);
            this.name$delegate = new _.hu.nevermind.react.Property();
          }, /** @lends _.hu.nevermind.reakt.MapProperties.prototype */ {
            name: {
              get: function () {
                return this.name$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('name'));
              },
              set: function (name) {
                this.name$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('name'), name);
              }
            }
          }),
          ParamProperties: Kotlin.createClass(function () {
            return [_.hu.nevermind.reakt.HtmlGlobalProperties];
          }, function $fun() {
            $fun.baseInitializer.call(this);
            this.name$delegate = new _.hu.nevermind.react.Property();
            this.value$delegate = new _.hu.nevermind.react.Property();
          }, /** @lends _.hu.nevermind.reakt.ParamProperties.prototype */ {
            name: {
              get: function () {
                return this.name$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('name'));
              },
              set: function (name) {
                this.name$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('name'), name);
              }
            },
            value: {
              get: function () {
                return this.value$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('value'));
              },
              set: function (value) {
                this.value$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('value'), value);
              }
            }
          }),
          OptionProperties: Kotlin.createClass(function () {
            return [_.hu.nevermind.reakt.HtmlGlobalProperties];
          }, function $fun() {
            $fun.baseInitializer.call(this);
            this.selected$delegate = new _.hu.nevermind.react.Property();
            this.value$delegate = new _.hu.nevermind.react.Property();
          }, /** @lends _.hu.nevermind.reakt.OptionProperties.prototype */ {
            selected: {
              get: function () {
                return this.selected$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('selected'));
              },
              set: function (selected) {
                this.selected$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('selected'), selected);
              }
            },
            value: {
              get: function () {
                return this.value$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('value'));
              },
              set: function (value) {
                this.value$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('value'), value);
              }
            }
          }),
          SourceProperties: Kotlin.createClass(function () {
            return [_.hu.nevermind.reakt.HtmlGlobalProperties];
          }, function $fun() {
            $fun.baseInitializer.call(this);
            this.src$delegate = new _.hu.nevermind.react.Property();
            this.type$delegate = new _.hu.nevermind.react.Property();
          }, /** @lends _.hu.nevermind.reakt.SourceProperties.prototype */ {
            src: {
              get: function () {
                return this.src$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('src'));
              },
              set: function (src) {
                this.src$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('src'), src);
              }
            },
            type: {
              get: function () {
                return this.type$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('type'));
              },
              set: function (type) {
                this.type$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('type'), type);
              }
            }
          }),
          StyleProperties: Kotlin.createClass(function () {
            return [_.hu.nevermind.reakt.HtmlGlobalProperties];
          }, function $fun() {
            $fun.baseInitializer.call(this);
            this.type$delegate = new _.hu.nevermind.react.Property();
          }, /** @lends _.hu.nevermind.reakt.StyleProperties.prototype */ {
            type: {
              get: function () {
                return this.type$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('type'));
              },
              set: function (type) {
                this.type$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('type'), type);
              }
            }
          }),
          MenuProperties: Kotlin.createClass(function () {
            return [_.hu.nevermind.reakt.HtmlGlobalProperties];
          }, function $fun() {
            $fun.baseInitializer.call(this);
            this.type$delegate = new _.hu.nevermind.react.Property();
          }, /** @lends _.hu.nevermind.reakt.MenuProperties.prototype */ {
            type: {
              get: function () {
                return this.type$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('type'));
              },
              set: function (type) {
                this.type$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('type'), type);
              }
            }
          }),
          LiProperties: Kotlin.createClass(function () {
            return [_.hu.nevermind.reakt.HtmlGlobalProperties];
          }, function $fun() {
            $fun.baseInitializer.call(this);
            this.value$delegate = new _.hu.nevermind.react.Property();
          }, /** @lends _.hu.nevermind.reakt.LiProperties.prototype */ {
            value: {
              get: function () {
                return this.value$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('value'));
              },
              set: function (value) {
                this.value$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('value'), value);
              }
            }
          }),
          SvgProperties: Kotlin.createClass(function () {
            return [_.hu.nevermind.reakt.ReactProperties];
          }, function $fun() {
            $fun.baseInitializer.call(this);
            this.id$delegate = new _.hu.nevermind.react.Property();
            this.cx$delegate = new _.hu.nevermind.react.Property();
            this.cy$delegate = new _.hu.nevermind.react.Property();
            this.d$delegate = new _.hu.nevermind.react.Property();
            this.fill$delegate = new _.hu.nevermind.react.Property();
            this.fx$delegate = new _.hu.nevermind.react.Property();
            this.fy$delegate = new _.hu.nevermind.react.Property();
            this.gradientTransform$delegate = new _.hu.nevermind.react.Property();
            this.gradientUnits$delegate = new _.hu.nevermind.react.Property();
            this.offset$delegate = new _.hu.nevermind.react.Property();
            this.points$delegate = new _.hu.nevermind.react.Property();
            this.r$delegate = new _.hu.nevermind.react.Property();
            this.rx$delegate = new _.hu.nevermind.react.Property();
            this.ry$delegate = new _.hu.nevermind.react.Property();
            this.spreadMethod$delegate = new _.hu.nevermind.react.Property();
            this.stopColor$delegate = new _.hu.nevermind.react.Property();
            this.stopOpacity$delegate = new _.hu.nevermind.react.Property();
            this.stroke$delegate = new _.hu.nevermind.react.Property();
            this.strokeLinecap$delegate = new _.hu.nevermind.react.Property();
            this.strokeWidth$delegate = new _.hu.nevermind.react.Property();
            this.transform$delegate = new _.hu.nevermind.react.Property();
            this.version$delegate = new _.hu.nevermind.react.Property();
            this.viewBox$delegate = new _.hu.nevermind.react.Property();
            this.x1$delegate = new _.hu.nevermind.react.Property();
            this.x2$delegate = new _.hu.nevermind.react.Property();
            this.x$delegate = new _.hu.nevermind.react.Property();
            this.y1$delegate = new _.hu.nevermind.react.Property();
            this.y2$delegate = new _.hu.nevermind.react.Property();
            this.y$delegate = new _.hu.nevermind.react.Property();
          }, /** @lends _.hu.nevermind.reakt.SvgProperties.prototype */ {
            id: {
              get: function () {
                return this.id$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('id'));
              },
              set: function (id) {
                this.id$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('id'), id);
              }
            },
            cx: {
              get: function () {
                return this.cx$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('cx'));
              },
              set: function (cx) {
                this.cx$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('cx'), cx);
              }
            },
            cy: {
              get: function () {
                return this.cy$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('cy'));
              },
              set: function (cy) {
                this.cy$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('cy'), cy);
              }
            },
            d: {
              get: function () {
                return this.d$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('d'));
              },
              set: function (d) {
                this.d$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('d'), d);
              }
            },
            fill: {
              get: function () {
                return this.fill$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('fill'));
              },
              set: function (fill) {
                this.fill$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('fill'), fill);
              }
            },
            fx: {
              get: function () {
                return this.fx$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('fx'));
              },
              set: function (fx) {
                this.fx$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('fx'), fx);
              }
            },
            fy: {
              get: function () {
                return this.fy$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('fy'));
              },
              set: function (fy) {
                this.fy$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('fy'), fy);
              }
            },
            gradientTransform: {
              get: function () {
                return this.gradientTransform$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('gradientTransform'));
              },
              set: function (gradientTransform) {
                this.gradientTransform$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('gradientTransform'), gradientTransform);
              }
            },
            gradientUnits: {
              get: function () {
                return this.gradientUnits$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('gradientUnits'));
              },
              set: function (gradientUnits) {
                this.gradientUnits$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('gradientUnits'), gradientUnits);
              }
            },
            offset: {
              get: function () {
                return this.offset$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('offset'));
              },
              set: function (offset) {
                this.offset$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('offset'), offset);
              }
            },
            points: {
              get: function () {
                return this.points$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('points'));
              },
              set: function (points) {
                this.points$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('points'), points);
              }
            },
            r: {
              get: function () {
                return this.r$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('r'));
              },
              set: function (r) {
                this.r$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('r'), r);
              }
            },
            rx: {
              get: function () {
                return this.rx$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('rx'));
              },
              set: function (rx) {
                this.rx$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('rx'), rx);
              }
            },
            ry: {
              get: function () {
                return this.ry$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('ry'));
              },
              set: function (ry) {
                this.ry$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('ry'), ry);
              }
            },
            spreadMethod: {
              get: function () {
                return this.spreadMethod$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('spreadMethod'));
              },
              set: function (spreadMethod) {
                this.spreadMethod$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('spreadMethod'), spreadMethod);
              }
            },
            stopColor: {
              get: function () {
                return this.stopColor$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('stopColor'));
              },
              set: function (stopColor) {
                this.stopColor$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('stopColor'), stopColor);
              }
            },
            stopOpacity: {
              get: function () {
                return this.stopOpacity$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('stopOpacity'));
              },
              set: function (stopOpacity) {
                this.stopOpacity$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('stopOpacity'), stopOpacity);
              }
            },
            stroke: {
              get: function () {
                return this.stroke$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('stroke'));
              },
              set: function (stroke) {
                this.stroke$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('stroke'), stroke);
              }
            },
            strokeLinecap: {
              get: function () {
                return this.strokeLinecap$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('strokeLinecap'));
              },
              set: function (strokeLinecap) {
                this.strokeLinecap$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('strokeLinecap'), strokeLinecap);
              }
            },
            strokeWidth: {
              get: function () {
                return this.strokeWidth$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('strokeWidth'));
              },
              set: function (strokeWidth) {
                this.strokeWidth$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('strokeWidth'), strokeWidth);
              }
            },
            transform: {
              get: function () {
                return this.transform$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('transform'));
              },
              set: function (transform) {
                this.transform$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('transform'), transform);
              }
            },
            version: {
              get: function () {
                return this.version$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('version'));
              },
              set: function (version) {
                this.version$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('version'), version);
              }
            },
            viewBox: {
              get: function () {
                return this.viewBox$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('viewBox'));
              },
              set: function (viewBox) {
                this.viewBox$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('viewBox'), viewBox);
              }
            },
            x1: {
              get: function () {
                return this.x1$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('x1'));
              },
              set: function (x1) {
                this.x1$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('x1'), x1);
              }
            },
            x2: {
              get: function () {
                return this.x2$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('x2'));
              },
              set: function (x2) {
                this.x2$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('x2'), x2);
              }
            },
            x: {
              get: function () {
                return this.x$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('x'));
              },
              set: function (x) {
                this.x$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('x'), x);
              }
            },
            y1: {
              get: function () {
                return this.y1$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('y1'));
              },
              set: function (y1) {
                this.y1$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('y1'), y1);
              }
            },
            y2: {
              get: function () {
                return this.y2$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('y2'));
              },
              set: function (y2) {
                this.y2$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('y2'), y2);
              }
            },
            y: {
              get: function () {
                return this.y$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('y'));
              },
              set: function (y) {
                this.y$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('y'), y);
              }
            }
          })
        }),
        timeline: Kotlin.definePackage(null, /** @lends _.hu.nevermind.timeline */ {
          client: Kotlin.definePackage(function () {
            this.React = Kotlin.createObject(null, null, {
              render: function (comp, element) {
                React.render(comp, element);
              },
              createElement: function (tagNameOrSpec, options, children) {
                var tmp$0, tmp$1, tmp$2;
                tmp$0 = children != null ? Kotlin.modules['stdlib'].kotlin.map_m3yiqg$(children, _.hu.nevermind.timeline.client.createElement$f) : null;
                var reactElementChildren = tmp$0;
                return (tmp$2 = React).createElement.apply(tmp$2, [tagNameOrSpec, options].concat((tmp$1 = reactElementChildren != null ? Kotlin.modules['stdlib'].kotlin.toArrayList_ir3nkc$(reactElementChildren) : null) != null ? Kotlin.copyToArray(tmp$1) : null));
              }
            });
          }, /** @lends _.hu.nevermind.timeline.client */ {
            f: function () {
              this.plus(new _.hu.nevermind.timeline.client.MyCompSpec());
              this.plus(new _.hu.nevermind.timeline.client.CounterAdderSpec());
            },
            main$f: function () {
              var asd = new _.hu.nevermind.timeline.client.Rows(_.hu.nevermind.timeline.client.f);
              _.hu.nevermind.timeline.client.React.render(asd.createReactElement(), document.getElementById('q1'));
              _.hu.nevermind.timeline.client.tests();
            },
            main: function (args) {
              window.setTimeout(_.hu.nevermind.timeline.client.main$f, 500);
            },
            tests: function () {
            },
            Rows: Kotlin.createClass(function () {
              return [_.hu.nevermind.timeline.client.ComponentSpecInTree];
            }, function $fun(body) {
              $fun.baseInitializer.call(this);
              this.body = body;
              this.$componentSpec_s1ll2u$ = _.hu.nevermind.timeline.client.Rows.object;
              this.$childrenFromUserSide_uzof5z$ = _.hu.nevermind.timeline.client.collectChildren(this.body);
            }, /** @lends _.hu.nevermind.timeline.client.Rows.prototype */ {
              componentSpec: {
                get: function () {
                  return this.$componentSpec_s1ll2u$;
                }
              },
              childrenFromUserSide: {
                get: function () {
                  return this.$childrenFromUserSide_uzof5z$;
                }
              }
            }, /** @lends _.hu.nevermind.timeline.client.Rows */ {
              f: function (it) {
                return function () {
                  this.plus(it);
                };
              },
              f_0: function () {
              },
              f_1: function (this$) {
                return function (it) {
                  this$.plus(_.hu.nevermind.timeline.client.li(_.hu.nevermind.timeline.client.Rows.f(it)));
                  this$.plus(_.hu.nevermind.timeline.client.div(_.hu.nevermind.timeline.client.Rows.f_0));
                };
              },
              f_2: function (this$Rows$) {
                return function () {
                  var operation = _.hu.nevermind.timeline.client.Rows.f_1(this);
                  var tmp$0;
                  tmp$0 = this$Rows$.children.iterator();
                  while (tmp$0.hasNext()) {
                    var element = tmp$0.next();
                    operation(element);
                  }
                };
              },
              render$f: function (this$Rows$) {
                return function () {
                  return _.hu.nevermind.timeline.client.ul(_.hu.nevermind.timeline.client.Rows.f_2(this$Rows$));
                };
              },
              object_initializer$: function () {
                return Kotlin.createObject(function () {
                  return [_.hu.nevermind.timeline.client.ReactSpec];
                }, function $fun() {
                  $fun.baseInitializer.call(this);
                  this.$render_qmgcgq$ = _.hu.nevermind.timeline.client.Rows.render$f(this);
                }, {
                  render: {
                    get: function () {
                      return this.$render_qmgcgq$;
                    }
                  }
                });
              }
            }),
            CounterAdderSpec: Kotlin.createClass(function () {
              return [_.hu.nevermind.timeline.client.ComponentSpecInTree];
            }, function $fun() {
              $fun.baseInitializer.call(this);
              this.$componentSpec_izzrwi$ = _.hu.nevermind.timeline.client.CounterAdderSpec.object;
            }, /** @lends _.hu.nevermind.timeline.client.CounterAdderSpec.prototype */ {
              componentSpec: {
                get: function () {
                  return this.$componentSpec_izzrwi$;
                }
              }
            }, /** @lends _.hu.nevermind.timeline.client.CounterAdderSpec */ {
              handleClick_33woik$f: function (e) {
                Kotlin.println('clicked');
              },
              f: function () {
                this.plus(new _.hu.nevermind.timeline.client.Counter(1));
                this.plus(new _.hu.nevermind.timeline.client.Counter(2));
              },
              render$f: function () {
                return _.hu.nevermind.timeline.client.div(_.hu.nevermind.timeline.client.CounterAdderSpec.f);
              },
              object_initializer$: function () {
                return Kotlin.createObject(function () {
                  return [_.hu.nevermind.timeline.client.ReactSpec];
                }, function $fun() {
                  $fun.baseInitializer.call(this);
                  this.handleClick_33woik$ = _.hu.nevermind.timeline.client.CounterAdderSpec.handleClick_33woik$f;
                  this.$render_112f76$ = _.hu.nevermind.timeline.client.CounterAdderSpec.render$f;
                }, {
                  render: {
                    get: function () {
                      return this.$render_112f76$;
                    }
                  }
                });
              }
            }),
            Counter: Kotlin.createClass(function () {
              return [_.hu.nevermind.timeline.client.ComponentSpecInTree];
            }, function $fun(initialValue) {
              $fun.baseInitializer.call(this);
              this.initialValue = initialValue;
              this.$props_mi2ag9$ = this.initialValue;
              this.$componentSpec_n7z5hd$ = _.hu.nevermind.timeline.client.Counter.object;
            }, /** @lends _.hu.nevermind.timeline.client.Counter.prototype */ {
              props: {
                get: function () {
                  return this.$props_mi2ag9$;
                }
              },
              componentSpec: {
                get: function () {
                  return this.$componentSpec_n7z5hd$;
                }
              }
            }, /** @lends _.hu.nevermind.timeline.client.Counter */ {
              handleClick_nwkuw5$f: function (this$Counter$) {
                return function (e) {
                  this$Counter$.state = this$Counter$.state + 1;
                };
              },
              f: function () {
                this.plus_1('asd');
              },
              render$f: function () {
                return _.hu.nevermind.timeline.client.div(_.hu.nevermind.timeline.client.Counter.f);
              },
              object_initializer$: function () {
                return Kotlin.createObject(function () {
                  return [_.hu.nevermind.timeline.client.ReactSpec];
                }, function $fun() {
                  $fun.baseInitializer.call(this);
                  this.handleClick_nwkuw5$ = _.hu.nevermind.timeline.client.Counter.handleClick_nwkuw5$f(this);
                  this.$render_qux7bl$ = _.hu.nevermind.timeline.client.Counter.render$f;
                }, {
                  initialState: function () {
                    return 3;
                  },
                  render: {
                    get: function () {
                      return this.$render_qux7bl$;
                    }
                  }
                });
              }
            }),
            MyCompSpec: Kotlin.createClass(function () {
              return [_.hu.nevermind.timeline.client.ComponentSpecInTree];
            }, function $fun() {
              $fun.baseInitializer.call(this);
              this.$componentSpec_lh5gmf$ = _.hu.nevermind.timeline.client.MyCompSpec.object;
            }, /** @lends _.hu.nevermind.timeline.client.MyCompSpec.prototype */ {
              componentSpec: {
                get: function () {
                  return this.$componentSpec_lh5gmf$;
                }
              }
            }, /** @lends _.hu.nevermind.timeline.client.MyCompSpec */ {
              f: function () {
                this.plus_1('Hello');
              },
              f_0: function () {
                this.plus_1('World');
              },
              f_1: function () {
                this.plus_1('Salala');
              },
              f_2: function () {
                this.plus_1('!!!');
              },
              f_3: function () {
                this.plus(_.hu.nevermind.timeline.client.div(_.hu.nevermind.timeline.client.MyCompSpec.f));
                this.plus(_.hu.nevermind.timeline.client.div(_.hu.nevermind.timeline.client.MyCompSpec.f_0));
                this.plus(_.hu.nevermind.timeline.client.div(_.hu.nevermind.timeline.client.MyCompSpec.f_1));
                this.plus(_.hu.nevermind.timeline.client.div(_.hu.nevermind.timeline.client.MyCompSpec.f_2));
              },
              f_4: function () {
                this.plus_1('Hello');
              },
              f_5: function () {
                this.plus(new _.hu.nevermind.timeline.client.Rows(_.hu.nevermind.timeline.client.MyCompSpec.f_3));
                this.plus(_.hu.nevermind.timeline.client.div(_.hu.nevermind.timeline.client.MyCompSpec.f_4));
              },
              render$f: function () {
                return _.hu.nevermind.timeline.client.div(_.hu.nevermind.timeline.client.MyCompSpec.f_5);
              },
              object_initializer$: function () {
                return Kotlin.createObject(function () {
                  return [_.hu.nevermind.timeline.client.ReactSpec];
                }, function $fun() {
                  $fun.baseInitializer.call(this);
                  this.$render_8pl0fd$ = _.hu.nevermind.timeline.client.MyCompSpec.render$f;
                }, {
                  render: {
                    get: function () {
                      return this.$render_8pl0fd$;
                    }
                  }
                });
              }
            }),
            div: function (body) {
              return new _.hu.nevermind.timeline.client.TagElement('div', null, _.hu.nevermind.timeline.client.collectChildren(body));
            },
            ul: function (body) {
              return new _.hu.nevermind.timeline.client.TagElement('ul', null, _.hu.nevermind.timeline.client.collectChildren(body));
            },
            LiTag: Kotlin.createClass(function () {
              return [_.hu.nevermind.timeline.client.TagElement];
            }, function $fun(body) {
              $fun.baseInitializer.call(this, 'li', null, _.hu.nevermind.timeline.client.collectChildren(body));
            }),
            li: function (body) {
              return new _.hu.nevermind.timeline.client.LiTag(body);
            },
            TagElement: Kotlin.createClass(function () {
              return [_.hu.nevermind.timeline.client.ReactElementCreator];
            }, function (tagName, options, children) {
              this.tagName = tagName;
              this.options = options;
              this.children = children;
            }, /** @lends _.hu.nevermind.timeline.client.TagElement.prototype */ {
              createReactElement: function () {
                return _.hu.nevermind.timeline.client.React.createElement(this.tagName, this.options, this.children);
              },
              component1: function () {
                return this.tagName;
              },
              component2: function () {
                return this.options;
              },
              component3: function () {
                return this.children;
              },
              copy_xcidsu$: function (tagName, options, children) {
                return new _.hu.nevermind.timeline.client.TagElement(tagName === void 0 ? this.tagName : tagName, options === void 0 ? this.options : options, children === void 0 ? this.children : children);
              },
              toString: function () {
                return 'TagElement(tagName=' + Kotlin.toString(this.tagName) + (', options=' + Kotlin.toString(this.options)) + (', children=' + Kotlin.toString(this.children)) + ')';
              },
              hashCode: function () {
                var result = 0;
                result = result * 31 + Kotlin.hashCode(this.tagName) | 0;
                result = result * 31 + Kotlin.hashCode(this.options) | 0;
                result = result * 31 + Kotlin.hashCode(this.children) | 0;
                return result;
              },
              equals_za3rmp$: function (other) {
                return this === other || (other !== null && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.tagName, other.tagName) && Kotlin.equals(this.options, other.options) && Kotlin.equals(this.children, other.children))));
              }
            }),
            StringNode: Kotlin.createClass(function () {
              return [_.hu.nevermind.timeline.client.CanAppearInComponentTree];
            }, function (text) {
              this.text = text;
            }, /** @lends _.hu.nevermind.timeline.client.StringNode.prototype */ {
              component1: function () {
                return this.text;
              },
              copy_61zpoe$: function (text) {
                return new _.hu.nevermind.timeline.client.StringNode(text === void 0 ? this.text : text);
              },
              toString: function () {
                return 'StringNode(text=' + Kotlin.toString(this.text) + ')';
              },
              hashCode: function () {
                var result = 0;
                result = result * 31 + Kotlin.hashCode(this.text) | 0;
                return result;
              },
              equals_za3rmp$: function (other) {
                return this === other || (other !== null && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && Kotlin.equals(this.text, other.text)));
              }
            }),
            CanAppearInComponentTree: Kotlin.createTrait(null),
            ComponentSpecInTree: Kotlin.createClass(function () {
              return [_.hu.nevermind.timeline.client.ReactElementCreator];
            }, function () {
              this.$childrenFromUserSide_mfoysl$ = Kotlin.modules['stdlib'].kotlin.emptyList();
              this.$props_pdaxxm$ = null;
            }, /** @lends _.hu.nevermind.timeline.client.ComponentSpecInTree.prototype */ {
              childrenFromUserSide: {
                get: function () {
                  return this.$childrenFromUserSide_mfoysl$;
                }
              },
              props: {
                get: function () {
                  return this.$props_pdaxxm$;
                }
              },
              createReactElement: function () {
                if (this.componentSpec.reactClass == null) {
                  this.componentSpec.reactClass = React.createClass(_.hu.nevermind.timeline.client.ComponentSpecInTree.createReactElement$f(this));
                }
                this.componentSpec.children = this.childrenFromUserSide;
                var renderFunc = this.componentSpec.render;
                var body = _.hu.nevermind.timeline.client.ComponentSpecInTree.createReactElement$f_0(renderFunc);
                return _.hu.nevermind.timeline.client.React.createElement(this.componentSpec.reactClass, null, _.hu.nevermind.timeline.client.collectChildren(body));
              }
            }, /** @lends _.hu.nevermind.timeline.client.ComponentSpecInTree */ {
              render$f: function (this$ComponentSpecInTree) {
                return function () {
                  var renderFunc = this$ComponentSpecInTree.componentSpec.render;
                  var builder = new _.hu.nevermind.timeline.client.ComponentBuilder();
                  var reactElementCreator = renderFunc.call(builder);
                  return reactElementCreator.createReactElement();
                };
              },
              createReactElement$f: function (this$ComponentSpecInTree) {
                return Kotlin.createObject(null, function () {
                  this.render = _.hu.nevermind.timeline.client.ComponentSpecInTree.render$f(this$ComponentSpecInTree);
                });
              },
              createReactElement$f_0: function (renderFunc) {
                return function () {
                  renderFunc.call(this);
                };
              }
            }),
            ReactElementCreator: Kotlin.createTrait(function () {
              return [_.hu.nevermind.timeline.client.CanAppearInComponentTree];
            }),
            createElement$f: function (it) {
              if (Kotlin.isType(it, _.hu.nevermind.timeline.client.StringNode))
                return it.text;
              else if (Kotlin.isType(it, _.hu.nevermind.timeline.client.ReactElementCreator))
                return it.createReactElement();
              else
                return Kotlin.modules['stdlib'].kotlin.error_za3rmp$(it.toString());
            },
            ReactSpec: Kotlin.createClass(function () {
              return [_.hu.nevermind.timeline.client.ReactMixin];
            }, function () {
              this.reactClass = null;
              this.component = null;
              this.children = Kotlin.modules['stdlib'].kotlin.emptyList();
            }, /** @lends _.hu.nevermind.timeline.client.ReactSpec.prototype */ {
              state: {
                get: function () {
                  var tmp$0;
                  return ((tmp$0 = this.component) != null ? tmp$0 : Kotlin.throwNPE()).state;
                },
                set: function (value) {
                  var tmp$0;
                  ((tmp$0 = this.component) != null ? tmp$0 : Kotlin.throwNPE()).setState(value);
                }
              },
              props: {
                get: function () {
                  var tmp$0;
                  return ((tmp$0 = this.component) != null ? tmp$0 : Kotlin.throwNPE()).props;
                },
                set: function (value) {
                  var tmp$0;
                  ((tmp$0 = this.component) != null ? tmp$0 : Kotlin.throwNPE()).setProps(value, null);
                }
              },
              getInitialState: function () {
                var state = this.initialState();
                return state == null ? null : state;
              },
              initialState: function () {
                return null;
              },
              getDefaultProps: function () {
                return null;
              }
            }),
            collectChildren: function (body) {
              return (new _.hu.nevermind.timeline.client.ComponentBuilder()).collectChildren(body);
            },
            ComponentBuilder: Kotlin.createClass(null, function () {
              this.componentBuilderChildren = Kotlin.modules['stdlib'].kotlin.arrayListOf_9mqe4v$([]);
            }, /** @lends _.hu.nevermind.timeline.client.ComponentBuilder.prototype */ {
              plus: function ($receiver) {
                this.componentBuilderChildren.add_za3rmp$($receiver);
              },
              plus_1: function ($receiver) {
                this.componentBuilderChildren.add_za3rmp$(new _.hu.nevermind.timeline.client.StringNode($receiver));
              },
              collectChildren: function (body) {
                body.call(this);
                return this.componentBuilderChildren;
              }
            }),
            ReactMixin: Kotlin.createTrait(null, /** @lends _.hu.nevermind.timeline.client.ReactMixin.prototype */ {
              componentWillMount: function () {
              },
              componentDidMount: function () {
              },
              componentWillReceiveProps_za3rmp$: function (nextProps) {
              },
              shouldComponentUpdate_wn2jw4$: function (nextProps, nextState) {
                return true;
              },
              componentWillUpdate_wn2jw4$: function (nextProps, nextState) {
              },
              componentDidUpdate_wn2jw4$: function (nextProps, nextState) {
              },
              componentWillUnmount: function () {
              }
            })
          })
        }),
        react: Kotlin.definePackage(null, /** @lends _.hu.nevermind.react */ {
          ReadWriteProperty: Kotlin.createTrait(null),
          Property: Kotlin.createClass(function () {
            return [_.hu.nevermind.react.ReadWriteProperty];
          }, null, /** @lends _.hu.nevermind.react.Property.prototype */ {
            get_1tsekc$: function (thisRef, desc) {
              return Reakt.getProperty(thisRef, desc.name);
            },
            set_1z3uih$: function (thisRef, desc, value) {
              Reakt.setProperty(thisRef, desc.name, value);
            }
          })
        }),
        flux: Kotlin.definePackage(function () {
          this.Dispatcher = Kotlin.createObject(null, function () {
            this.pendingPayload_gnnswa$ = null;
            this.pendingActionDef_upeeln$ = null;
            this.lastId_gkcrg$ = 0;
            this.actionHandlersList_kk68hc$ = Kotlin.modules['stdlib'].kotlin.hashMapOf_eoa9s7$([]);
            this.dispatching_1gxqlx$ = false;
          }, {
            register: function (store, action, callback) {
              var tmp$0;
              var $receiver = this.actionHandlersList_kk68hc$;
              var getOrPut_x00lr4$result;
              getOrPut_x00lr4$break: {
                var tmp$1;
                if ($receiver.containsKey_za3rmp$(action)) {
                  getOrPut_x00lr4$result = $receiver.get_za3rmp$(action);
                  break getOrPut_x00lr4$break;
                }
                 else {
                  tmp$1 = new _.hu.nevermind.flux.ActionHandlers(action);
                  var answer = tmp$1;
                  $receiver.put_wn2jw4$(action, answer);
                  getOrPut_x00lr4$result = answer;
                  break getOrPut_x00lr4$break;
                }
              }
              tmp$0 = getOrPut_x00lr4$result;
              var actionHandlers = tmp$0;
              var registeredActionHandler = new _.hu.nevermind.flux.RegisteredActionHandler(store, action, callback);
              actionHandlers.handlers.add_za3rmp$(registeredActionHandler);
              return registeredActionHandler;
            },
            unRegister: function (registeredActionHandler) {
              var tmp$0, tmp$1;
              (tmp$1 = (tmp$0 = this.actionHandlersList_kk68hc$.get_za3rmp$(registeredActionHandler.actionDef)) != null ? tmp$0.handlers : null) != null ? tmp$1.remove_za3rmp$(registeredActionHandler) : null;
            },
            waitFor: function (stores) {
              var tmp$0, tmp$1, tmp$2, tmp$3, tmp$5;
              Kotlin.modules['stdlib'].kotlin.require_eltq40$(this.dispatching_1gxqlx$, 'Dispatcher.waitFor(...): Must be invoked while dispatching.');
              var handlersForCurrentAction = (tmp$1 = (tmp$0 = this.actionHandlersList_kk68hc$.get_za3rmp$(this.pendingActionDef_upeeln$)) != null ? tmp$0.handlers : null) != null ? tmp$1 : Kotlin.modules['stdlib'].kotlin.emptyList();
              var filter_azvtw4$result;
              var tmp$8;
              var destination = new Kotlin.ArrayList();
              var filterTo_5pn78a$result;
              var tmp$6, tmp$7;
              tmp$6 = handlersForCurrentAction.iterator();
              while (tmp$6.hasNext()) {
                var element = tmp$6.next();
                tmp$7 = Kotlin.modules['stdlib'].kotlin.contains_ke19y6$(stores, element.store);
                if (tmp$7) {
                  destination.add_za3rmp$(element);
                }
              }
              filterTo_5pn78a$result = destination;
              tmp$8 = filterTo_5pn78a$result;
              filter_azvtw4$result = tmp$8;
              tmp$2 = filter_azvtw4$result;
              var partition_azvtw4$result;
              var tmp$10, tmp$9;
              var first = new Kotlin.ArrayList();
              var second = new Kotlin.ArrayList();
              tmp$10 = tmp$2.iterator();
              while (tmp$10.hasNext()) {
                var element_0 = tmp$10.next();
                tmp$9 = element_0.pending || element_0.handled;
                if (tmp$9) {
                  first.add_za3rmp$(element_0);
                }
                 else {
                  second.add_za3rmp$(element_0);
                }
              }
              partition_azvtw4$result = new Kotlin.modules['stdlib'].kotlin.Pair(first, second);
              tmp$3 = partition_azvtw4$result;
              var tmp$4 = tmp$3
              , pendingHandlers = tmp$4.component1()
              , nonPendingHandlers = tmp$4.component2();
              var firstOrNull_azvtw4$result;
              firstOrNull_azvtw4$break: {
                var tmp$12, tmp$11;
                tmp$12 = pendingHandlers.iterator();
                while (tmp$12.hasNext()) {
                  var element_1 = tmp$12.next();
                  tmp$11 = !element_1.handled;
                  if (tmp$11) {
                    firstOrNull_azvtw4$result = element_1;
                    break firstOrNull_azvtw4$break;
                  }
                }
                firstOrNull_azvtw4$result = null;
                break firstOrNull_azvtw4$break;
              }
              tmp$5 = firstOrNull_azvtw4$result;
              var unhandledHandlers = tmp$5;
              Kotlin.modules['stdlib'].kotlin.require_eltq40$(unhandledHandlers == null, 'Dispatcher.waitFor(...): Circular dependency detected while waiting for ' + Kotlin.toString(unhandledHandlers) + '.');
              var operation = _.hu.nevermind.flux.waitFor$f_2(this);
              var tmp$13;
              tmp$13 = nonPendingHandlers.iterator();
              while (tmp$13.hasNext()) {
                var element_2 = tmp$13.next();
                operation(element_2);
              }
            },
            dispatch: function (action, payload) {
              var tmp$0, tmp$1;
              Kotlin.modules['stdlib'].kotlin.require_eltq40$(!this.dispatching_1gxqlx$, 'Dispatch.dispatch(...): Cannot dispatch in the middle of a dispatch.');
              this.startDispatching(action, payload);
              try {
                (tmp$1 = (tmp$0 = this.actionHandlersList_kk68hc$.get_za3rmp$(action)) != null ? tmp$0.handlers : null) != null ? Kotlin.modules['stdlib'].kotlin.forEach_p7e0bo$(tmp$1, _.hu.nevermind.flux.dispatch$f(this)) : null;
              }
              finally {
                this.stopDispatching();
              }
            },
            invokeCallback: function (it) {
              it.pending = true;
              var body = new _.hu.nevermind.flux.DispatchCallbackBody(it.store, it.actionDef);
              var callback = it.callback;
              callback.call(body, this.pendingPayload_gnnswa$);
              it.handled = true;
            },
            startDispatching: function (action, payload) {
              var tmp$0, tmp$1;
              (tmp$1 = (tmp$0 = this.actionHandlersList_kk68hc$.get_za3rmp$(action)) != null ? tmp$0.handlers : null) != null ? Kotlin.modules['stdlib'].kotlin.forEach_p7e0bo$(tmp$1, _.hu.nevermind.flux.startDispatching$f) : null;
              this.pendingPayload_gnnswa$ = payload;
              this.pendingActionDef_upeeln$ = action;
              this.dispatching_1gxqlx$ = true;
            },
            stopDispatching: function () {
              this.pendingActionDef_upeeln$ = null;
              this.pendingPayload_gnnswa$ = null;
              this.dispatching_1gxqlx$ = false;
            }
          });
        }, /** @lends _.hu.nevermind.flux */ {
          Store: Kotlin.createClass(null, function () {
            this.changeListeners_pcuery$ = Kotlin.modules['stdlib'].kotlin.hashMapOf_eoa9s7$([]);
          }, /** @lends _.hu.nevermind.flux.Store.prototype */ {
            register_x5ky9g$: function (actionDef, callback) {
              return _.hu.nevermind.flux.Dispatcher.register(this, actionDef, callback);
            },
            addChangeListener_o7wwlr$: function (self, callback) {
              this.changeListeners_pcuery$.put_wn2jw4$(self, callback);
            },
            emitChange: function () {
              var $receiver = this.changeListeners_pcuery$.values();
              var tmp$0;
              tmp$0 = $receiver.iterator();
              while (tmp$0.hasNext()) {
                var element = tmp$0.next();
                element();
              }
            },
            removeListener_za3rmp$: function (self) {
              this.changeListeners_pcuery$.remove_za3rmp$(self);
            }
          }, /** @lends _.hu.nevermind.flux.Store */ {
          }),
          ActionDef: Kotlin.createClass(null, null, /** @lends _.hu.nevermind.flux.ActionDef.prototype */ {
            dispatch_za3rmp$: function (payload) {
              _.hu.nevermind.flux.Dispatcher.dispatch(this, payload);
            }
          }),
          ActionHandlers: Kotlin.createClass(null, function (action, handlers) {
            if (handlers === void 0)
              handlers = Kotlin.modules['stdlib'].kotlin.arrayListOf_9mqe4v$([]);
            this.action = action;
            this.handlers = handlers;
          }),
          RegisteredActionHandler: Kotlin.createClass(null, function (store, actionDef, callback) {
            this.store = store;
            this.actionDef = actionDef;
            this.callback = callback;
            this.pending = false;
            this.handled = false;
          }),
          DispatchCallbackBody: Kotlin.createClass(null, function (store, actionDef) {
            this.store = store;
            this.actionDef = actionDef;
          }, /** @lends _.hu.nevermind.flux.DispatchCallbackBody.prototype */ {
            waitFor: function (registeredActionHandlers) {
              _.hu.nevermind.flux.Dispatcher.waitFor(registeredActionHandlers);
            }
          }),
          waitFor$f_2: function (this$Dispatcher) {
            return function (it) {
              var tmp$0, tmp$1, tmp$2;
              Kotlin.modules['stdlib'].kotlin.require_eltq40$((tmp$2 = (tmp$1 = (tmp$0 = this$Dispatcher.actionHandlersList_kk68hc$.get_za3rmp$(it.actionDef)) != null ? tmp$0.handlers : null) != null ? tmp$1.contains_za3rmp$(it) : null) != null ? tmp$2 : false, 'Dispatcher.waitFor(...): ' + it + ' does not map to a registered callback.');
              this$Dispatcher.invokeCallback(it);
            };
          },
          dispatch$f: function (this$Dispatcher) {
            return function (it) {
              if (!it.pending) {
                this$Dispatcher.invokeCallback(it);
              }
            };
          },
          startDispatching$f: function (it) {
            it.pending = false;
            it.handled = false;
          }
        })
      })
    })
  });
  Kotlin.defineModule('reaKt', _);
  _.hu.nevermind.timeline.client.main([]);
}(Kotlin));
