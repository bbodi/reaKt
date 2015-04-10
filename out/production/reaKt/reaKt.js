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
            this.$key_gp9lob$ = null;
            this.$ref_gp9qun$ = null;
            this.onCopy = null;
            this.onCut = null;
            this.onPaste = null;
            this.onKeyDown = null;
            this.onKeyPress = null;
            this.onKeyUp = null;
            this.onFocus = null;
            this.onBlur = null;
            this.onChange = null;
            this.onInput = null;
            this.onSubmit = null;
            this.onClick = null;
            this.onDoubleClick = null;
            this.onDrag = null;
            this.onDragEnd = null;
            this.onDragEnter = null;
            this.onDragExit = null;
            this.onDragLeave = null;
            this.onDragOver = null;
            this.onDragStart = null;
            this.onDrop = null;
            this.onMouseDown = null;
            this.onMouseEnter = null;
            this.onMouseLeave = null;
            this.onMouseMove = null;
            this.onMouseUp = null;
            this.onTouchCancel = null;
            this.onTouchEnd = null;
            this.onTouchMove = null;
            this.onTouchStart = null;
            this.onScroll = null;
            this.onWheel = null;
          }, /** @lends _.hu.nevermind.reakt.ReactProperties.prototype */ {
            key: {
              get: function () {
                return this.$key_gp9lob$;
              },
              set: function (key) {
                this.$key_gp9lob$ = key;
              }
            },
            ref: {
              get: function () {
                return this.$ref_gp9qun$;
              },
              set: function (ref) {
                this.$ref_gp9qun$ = ref;
              }
            }
          }),
          HtmlGlobalProperties: Kotlin.createClass(function () {
            return [_.hu.nevermind.reakt.ReactProperties];
          }, function $fun() {
            $fun.baseInitializer.call(this);
            this.$key_6kf53a$ = null;
            this.accessKey = null;
            this.className = null;
            this.contentEditable = null;
            this.contextMenu = null;
            this.dir = null;
            this.draggable = null;
            this.hidden = null;
            this.id = null;
            this.lang = null;
            this.spellCheck = null;
            this.role = null;
            this.scrollLeft = null;
            this.scrollTop = null;
            this.style = null;
          }, /** @lends _.hu.nevermind.reakt.HtmlGlobalProperties.prototype */ {
            key: {
              get: function () {
                return this.$key_6kf53a$;
              },
              set: function (key) {
                this.$key_6kf53a$ = key;
              }
            }
          }),
          FormProperties: Kotlin.createClass(function () {
            return [_.hu.nevermind.reakt.HtmlGlobalProperties];
          }, function $fun() {
            $fun.baseInitializer.call(this);
            this.accept = null;
            this.action = null;
            this.autoCapitalize = null;
            this.autoComplete = null;
            this.encType = null;
            this.method = null;
            this.name = null;
            this.target = null;
          }),
          InputProperties: Kotlin.createClass(function () {
            return [_.hu.nevermind.reakt.HtmlGlobalProperties];
          }, function $fun() {
            $fun.baseInitializer.call(this);
            this.accept = null;
            this.alt = null;
            this.autoCapitalize = null;
            this.autoComplete = null;
            this.autoFocus = null;
            this.checked = null;
            this.defaultValue = null;
            this.disabled = null;
            this.form = null;
            this.height = null;
            this.list = null;
            this.max = null;
            this.maxLength = null;
            this.min = null;
            this.multiple = null;
            this.name = null;
            this.pattern = null;
            this.placeholder = null;
            this.readOnly = null;
            this.required = null;
            this.size = null;
            this.src = null;
            this.step = null;
            this.type = null;
            this.value = null;
            this.width = null;
          }),
          IframeProperties: Kotlin.createClass(function () {
            return [_.hu.nevermind.reakt.HtmlGlobalProperties];
          }, function $fun() {
            $fun.baseInitializer.call(this);
            this.allowFullScreen = null;
            this.allowTransparency = null;
            this.frameBorder = null;
            this.height = null;
            this.name = null;
            this.src = null;
            this.width = null;
          }),
          AppletProperties: Kotlin.createClass(function () {
            return [_.hu.nevermind.reakt.HtmlGlobalProperties];
          }, function $fun() {
            $fun.baseInitializer.call(this);
            this.alt = null;
          }),
          AreaProperties: Kotlin.createClass(function () {
            return [_.hu.nevermind.reakt.HtmlGlobalProperties];
          }, function $fun() {
            $fun.baseInitializer.call(this);
            this.alt = null;
            this.href = null;
            this.rel = null;
            this.target = null;
          }),
          ImgProperties: Kotlin.createClass(function () {
            return [_.hu.nevermind.reakt.HtmlGlobalProperties];
          }, function $fun() {
            $fun.baseInitializer.call(this);
            this.alt = null;
            this.height = null;
            this.src = null;
            this.width = null;
          }),
          ButtonProperties: Kotlin.createClass(function () {
            return [_.hu.nevermind.reakt.HtmlGlobalProperties];
          }, function $fun() {
            $fun.baseInitializer.call(this);
            this.autoFocus = null;
            this.disabled = null;
            this.form = null;
            this.name = null;
            this.type = null;
            this.value = null;
          }),
          KeygenProperties: Kotlin.createClass(function () {
            return [_.hu.nevermind.reakt.HtmlGlobalProperties];
          }, function $fun() {
            $fun.baseInitializer.call(this);
            this.autoFocus = null;
            this.form = null;
            this.name = null;
          }),
          SelectProperties: Kotlin.createClass(function () {
            return [_.hu.nevermind.reakt.HtmlGlobalProperties];
          }, function $fun() {
            $fun.baseInitializer.call(this);
            this.autoFocus = null;
            this.disabled = null;
            this.form = null;
            this.multiple = null;
            this.name = null;
            this.required = null;
            this.size = null;
          }),
          TextareaProperties: Kotlin.createClass(function () {
            return [_.hu.nevermind.reakt.HtmlGlobalProperties];
          }, function $fun() {
            $fun.baseInitializer.call(this);
            this.autoFocus = null;
            this.form = null;
            this.maxLength = null;
            this.name = null;
            this.placeholder = null;
            this.readOnly = null;
            this.required = null;
          }),
          AudioProperties: Kotlin.createClass(function () {
            return [_.hu.nevermind.reakt.HtmlGlobalProperties];
          }, function $fun() {
            $fun.baseInitializer.call(this);
            this.autoPlay = null;
            this.controls = null;
            this.loop = null;
            this.preload = null;
            this.src = null;
          }),
          VideoProperties: Kotlin.createClass(function () {
            return [_.hu.nevermind.reakt.HtmlGlobalProperties];
          }, function $fun() {
            $fun.baseInitializer.call(this);
            this.autoPlay = null;
            this.controls = null;
            this.height = null;
            this.loop = null;
            this.poster = null;
            this.preload = null;
            this.src = null;
            this.width = null;
          }),
          TableProperties: Kotlin.createClass(function () {
            return [_.hu.nevermind.reakt.HtmlGlobalProperties];
          }, function $fun() {
            $fun.baseInitializer.call(this);
            this.cellPadding = null;
            this.cellSpacing = null;
          }),
          MetaProperties: Kotlin.createClass(function () {
            return [_.hu.nevermind.reakt.HtmlGlobalProperties];
          }, function $fun() {
            $fun.baseInitializer.call(this);
            this.charSet = null;
            this.content = null;
            this.httpEquiv = null;
            this.name = null;
          }),
          ScriptProperties: Kotlin.createClass(function () {
            return [_.hu.nevermind.reakt.HtmlGlobalProperties];
          }, function $fun() {
            $fun.baseInitializer.call(this);
            this.charSet = null;
            this.src = null;
            this.type = null;
          }),
          CommandProperties: Kotlin.createClass(function () {
            return [_.hu.nevermind.reakt.HtmlGlobalProperties];
          }, function $fun() {
            $fun.baseInitializer.call(this);
            this.checked = null;
            this.icon = null;
            this.radioGroup = null;
            this.type = null;
          }),
          TdProperties: Kotlin.createClass(function () {
            return [_.hu.nevermind.reakt.HtmlGlobalProperties];
          }, function $fun() {
            $fun.baseInitializer.call(this);
            this.colSpan = null;
            this.rowSpan = null;
          }),
          ThProperties: Kotlin.createClass(function () {
            return [_.hu.nevermind.reakt.HtmlGlobalProperties];
          }, function $fun() {
            $fun.baseInitializer.call(this);
            this.colSpan = null;
            this.rowSpan = null;
          }),
          ObjectProperties: Kotlin.createClass(function () {
            return [_.hu.nevermind.reakt.HtmlGlobalProperties];
          }, function $fun() {
            $fun.baseInitializer.call(this);
            this.data = null;
            this.form = null;
            this.height = null;
            this.name = null;
            this.type = null;
            this.width = null;
            this.wmode = null;
          }),
          DelProperties: Kotlin.createClass(function () {
            return [_.hu.nevermind.reakt.HtmlGlobalProperties];
          }, function $fun() {
            $fun.baseInitializer.call(this);
            this.dateTime = null;
          }),
          InsProperties: Kotlin.createClass(function () {
            return [_.hu.nevermind.reakt.HtmlGlobalProperties];
          }, function $fun() {
            $fun.baseInitializer.call(this);
            this.dateTime = null;
          }),
          TimeProperties: Kotlin.createClass(function () {
            return [_.hu.nevermind.reakt.HtmlGlobalProperties];
          }, function $fun() {
            $fun.baseInitializer.call(this);
            this.dateTime = null;
          }),
          FieldsetProperties: Kotlin.createClass(function () {
            return [_.hu.nevermind.reakt.HtmlGlobalProperties];
          }, function $fun() {
            $fun.baseInitializer.call(this);
            this.form = null;
            this.name = null;
          }),
          LabelProperties: Kotlin.createClass(function () {
            return [_.hu.nevermind.reakt.HtmlGlobalProperties];
          }, function $fun() {
            $fun.baseInitializer.call(this);
            this.form = null;
            this.htmlFor = null;
          }),
          MeterProperties: Kotlin.createClass(function () {
            return [_.hu.nevermind.reakt.HtmlGlobalProperties];
          }, function $fun() {
            $fun.baseInitializer.call(this);
            this.form = null;
            this.max = null;
            this.min = null;
            this.value = null;
          }),
          OutputProperties: Kotlin.createClass(function () {
            return [_.hu.nevermind.reakt.HtmlGlobalProperties];
          }, function $fun() {
            $fun.baseInitializer.call(this);
            this.form = null;
            this.htmlFor = null;
            this.name = null;
          }),
          ProgressProperties: Kotlin.createClass(function () {
            return [_.hu.nevermind.reakt.HtmlGlobalProperties];
          }, function $fun() {
            $fun.baseInitializer.call(this);
            this.form = null;
            this.max = null;
            this.value = null;
          }),
          CanvasProperties: Kotlin.createClass(function () {
            return [_.hu.nevermind.reakt.HtmlGlobalProperties];
          }, function $fun() {
            $fun.baseInitializer.call(this);
            this.height = null;
            this.width = null;
          }),
          EmbedProperties: Kotlin.createClass(function () {
            return [_.hu.nevermind.reakt.HtmlGlobalProperties];
          }, function $fun() {
            $fun.baseInitializer.call(this);
            this.height = null;
            this.src = null;
            this.type = null;
            this.width = null;
          }),
          AProperties: Kotlin.createClass(function () {
            return [_.hu.nevermind.reakt.HtmlGlobalProperties];
          }, function $fun() {
            $fun.baseInitializer.call(this);
            this.href = null;
            this.rel = null;
            this.target = null;
          }),
          BaseProperties: Kotlin.createClass(function () {
            return [_.hu.nevermind.reakt.HtmlGlobalProperties];
          }, function $fun() {
            $fun.baseInitializer.call(this);
            this.href = null;
            this.target = null;
          }),
          LinkProperties: Kotlin.createClass(function () {
            return [_.hu.nevermind.reakt.HtmlGlobalProperties];
          }, function $fun() {
            $fun.baseInitializer.call(this);
            this.href = null;
            this.rel = null;
          }),
          TrackProperties: Kotlin.createClass(function () {
            return [_.hu.nevermind.reakt.HtmlGlobalProperties];
          }, function $fun() {
            $fun.baseInitializer.call(this);
            this.label = null;
            this.src = null;
          }),
          BgsoundProperties: Kotlin.createClass(function () {
            return [_.hu.nevermind.reakt.HtmlGlobalProperties];
          }, function $fun() {
            $fun.baseInitializer.call(this);
            this.loop = null;
          }),
          MarqueeProperties: Kotlin.createClass(function () {
            return [_.hu.nevermind.reakt.HtmlGlobalProperties];
          }, function $fun() {
            $fun.baseInitializer.call(this);
            this.loop = null;
          }),
          MapProperties: Kotlin.createClass(function () {
            return [_.hu.nevermind.reakt.HtmlGlobalProperties];
          }, function $fun() {
            $fun.baseInitializer.call(this);
            this.name = null;
          }),
          ParamProperties: Kotlin.createClass(function () {
            return [_.hu.nevermind.reakt.HtmlGlobalProperties];
          }, function $fun() {
            $fun.baseInitializer.call(this);
            this.name = null;
            this.value = null;
          }),
          OptionProperties: Kotlin.createClass(function () {
            return [_.hu.nevermind.reakt.HtmlGlobalProperties];
          }, function $fun() {
            $fun.baseInitializer.call(this);
            this.selected = null;
            this.value = null;
          }),
          SourceProperties: Kotlin.createClass(function () {
            return [_.hu.nevermind.reakt.HtmlGlobalProperties];
          }, function $fun() {
            $fun.baseInitializer.call(this);
            this.src = null;
            this.type = null;
          }),
          StyleProperties: Kotlin.createClass(function () {
            return [_.hu.nevermind.reakt.HtmlGlobalProperties];
          }, function $fun() {
            $fun.baseInitializer.call(this);
            this.type = null;
          }),
          MenuProperties: Kotlin.createClass(function () {
            return [_.hu.nevermind.reakt.HtmlGlobalProperties];
          }, function $fun() {
            $fun.baseInitializer.call(this);
            this.type = null;
          }),
          LiProperties: Kotlin.createClass(function () {
            return [_.hu.nevermind.reakt.HtmlGlobalProperties];
          }, function $fun() {
            $fun.baseInitializer.call(this);
            this.value = null;
          }),
          SvgProperties: Kotlin.createClass(function () {
            return [_.hu.nevermind.reakt.ReactProperties];
          }, function $fun() {
            $fun.baseInitializer.call(this);
            this.id = null;
            this.cx = null;
            this.cy = null;
            this.d = null;
            this.fill = null;
            this.fx = null;
            this.fy = null;
            this.gradientTransform = null;
            this.gradientUnits = null;
            this.offset = null;
            this.points = null;
            this.r = null;
            this.rx = null;
            this.ry = null;
            this.spreadMethod = null;
            this.stopColor = null;
            this.stopOpacity = null;
            this.stroke = null;
            this.strokeLinecap = null;
            this.strokeWidth = null;
            this.transform = null;
            this.version = null;
            this.viewBox = null;
            this.x1 = null;
            this.x2 = null;
            this.x = null;
            this.y1 = null;
            this.y2 = null;
            this.y = null;
          })
        }),
        timeline: Kotlin.definePackage(null, /** @lends _.hu.nevermind.timeline */ {
          client: Kotlin.definePackage(function () {
            this.Rows = Kotlin.createObject(function () {
              return [_.hu.nevermind.timeline.client.ReactSpec];
            }, function $fun() {
              $fun.baseInitializer.call(this);
              this.$render_vepgbg$ = _.hu.nevermind.timeline.client.render$f(this);
            }, {
              render: {
                get: function () {
                  return this.$render_vepgbg$;
                }
              },
              element_1: function (body) {
                var childrenFromUserSite = _.hu.nevermind.timeline.client.collectChildren(body);
                return new _.hu.nevermind.timeline.client.ReactSpecInstance(this, null, childrenFromUserSite);
              }
            });
            this.Counter = Kotlin.createObject(function () {
              return [_.hu.nevermind.timeline.client.ReactSpec];
            }, function $fun() {
              $fun.baseInitializer.call(this);
              this.handleClick_1q8ijd$ = _.hu.nevermind.timeline.client.handleClick_1q8ijd$f(this);
              this.$render_di2kpb$ = _.hu.nevermind.timeline.client.render$f_0(this);
            }, {
              initialState: function () {
                return 3;
              },
              render: {
                get: function () {
                  return this.$render_di2kpb$;
                }
              },
              element_1: function (initialValue) {
                return new _.hu.nevermind.timeline.client.ReactSpecInstance(this, initialValue, Kotlin.modules['stdlib'].kotlin.emptyList());
              }
            });
            this.CounterAdderSpec = Kotlin.createObject(function () {
              return [_.hu.nevermind.timeline.client.ReactSpec];
            }, function $fun() {
              $fun.baseInitializer.call(this);
              this.handleClick_2zba8q$ = _.hu.nevermind.timeline.client.handleClick_2zba8q$f;
              this.$render_jstopc$ = _.hu.nevermind.timeline.client.render$f_1;
            }, {
              render: {
                get: function () {
                  return this.$render_jstopc$;
                }
              }
            });
            this.MyCompSpec = Kotlin.createObject(function () {
              return [_.hu.nevermind.timeline.client.ReactSpec];
            }, function $fun() {
              $fun.baseInitializer.call(this);
              this.$render_uxqw6f$ = _.hu.nevermind.timeline.client.render$f_2;
            }, {
              render: {
                get: function () {
                  return this.$render_uxqw6f$;
                }
              }
            });
            this.React = Kotlin.createObject(null, null, {
              render: function (comp, element) {
                React.render(comp, element);
              },
              createElement: function (tagNameOrSpec, options, children) {
                var tmp$0, tmp$1, tmp$2;
                tmp$0 = children != null ? Kotlin.modules['stdlib'].kotlin.map_m3yiqg$(children, _.hu.nevermind.timeline.client.createElement$f) : null;
                var reactElementChildren = tmp$0;
                return (tmp$2 = React).createElement.apply(tmp$2, [tagNameOrSpec, options].concat((tmp$1 = reactElementChildren != null ? Kotlin.modules['stdlib'].kotlin.toArrayList_ir3nkc$(reactElementChildren) : null) != null ? Kotlin.copyToArray(tmp$1) : null));
              },
              findDOMNode: function (component) {
                return React.findDOMNode(component);
              }
            });
          }, /** @lends _.hu.nevermind.timeline.client */ {
            f: function () {
              this.plus(_.hu.nevermind.timeline.client.MyCompSpec.element());
              this.plus(_.hu.nevermind.timeline.client.CounterAdderSpec.element());
            },
            main$f: function () {
              var asd = _.hu.nevermind.timeline.client.Rows.element_1(_.hu.nevermind.timeline.client.f);
              _.hu.nevermind.timeline.client.React.render(asd.createReactElement(), document.getElementById('q1'));
              _.hu.nevermind.timeline.client.tests();
            },
            main: function (args) {
              window.setTimeout(_.hu.nevermind.timeline.client.main$f, 500);
            },
            tests: function () {
              var counter = _.hu.nevermind.timeline.client.Counter.element_1(7);
              var renderedCounter = React.addons.TestUtils.renderIntoDocument(counter.createReactElement());
              var counterDom = React.addons.TestUtils.findRenderedDOMComponentWithTag(renderedCounter, 'div');
              var dom = _.hu.nevermind.timeline.client.React.findDOMNode(counterDom);
              Kotlin.modules['stdlib'].kotlin.check_eltq40$(Kotlin.equals(dom.textContent, '7'));
            },
            f_0: function (it) {
              return function () {
                this.plus(it);
              };
            },
            f_1: function () {
            },
            f_2: function (this$) {
              return function (it) {
                this$.plus(_.hu.nevermind.timeline.client.li(_.hu.nevermind.timeline.client.f_0(it)));
                this$.plus(_.hu.nevermind.timeline.client.div(void 0, _.hu.nevermind.timeline.client.f_1));
              };
            },
            f_3: function (this$Rows) {
              return function () {
                var operation = _.hu.nevermind.timeline.client.f_2(this);
                var tmp$0;
                tmp$0 = this$Rows.children.iterator();
                while (tmp$0.hasNext()) {
                  var element = tmp$0.next();
                  operation(element);
                }
              };
            },
            render$f: function (this$Rows) {
              return function () {
                return _.hu.nevermind.timeline.client.ul(_.hu.nevermind.timeline.client.f_3(this$Rows));
              };
            },
            handleClick_1q8ijd$f: function (this$Counter) {
              return function (e) {
                Kotlin.println('CLICK: props: ' + this$Counter.props);
              };
            },
            f_4: function (this$Counter) {
              return function () {
                this.onClick = this$Counter.handleClick_1q8ijd$;
                this.key = this$Counter.props.toString();
              };
            },
            f_5: function (this$Counter) {
              return function () {
                Kotlin.println('Draw props: ' + this$Counter.props);
                this.plus_1(this$Counter.props.toString());
              };
            },
            render$f_0: function (this$Counter) {
              return function () {
                return _.hu.nevermind.timeline.client.div(_.hu.nevermind.timeline.client.f_4(this$Counter), _.hu.nevermind.timeline.client.f_5(this$Counter));
              };
            },
            handleClick_2zba8q$f: function (e) {
              Kotlin.println('clicked');
            },
            f_6: function () {
              this.plus(_.hu.nevermind.timeline.client.Counter.element_1(1));
              this.plus(_.hu.nevermind.timeline.client.Counter.element_1(2));
            },
            render$f_1: function () {
              return _.hu.nevermind.timeline.client.div(void 0, _.hu.nevermind.timeline.client.f_6);
            },
            f_7: function () {
              this.plus_1('Hello');
            },
            f_8: function () {
              this.plus_1('World');
            },
            f_9: function () {
              this.plus_1('Salala');
            },
            f_10: function () {
              this.plus_1('!!!');
            },
            f_11: function () {
              this.plus(_.hu.nevermind.timeline.client.div(void 0, _.hu.nevermind.timeline.client.f_7));
              this.plus(_.hu.nevermind.timeline.client.div(void 0, _.hu.nevermind.timeline.client.f_8));
              this.plus(_.hu.nevermind.timeline.client.div(void 0, _.hu.nevermind.timeline.client.f_9));
              this.plus(_.hu.nevermind.timeline.client.div(void 0, _.hu.nevermind.timeline.client.f_10));
            },
            f_12: function () {
              this.plus_1('Hello');
            },
            f_13: function () {
              this.plus(_.hu.nevermind.timeline.client.Rows.element_1(_.hu.nevermind.timeline.client.f_11));
              this.plus(_.hu.nevermind.timeline.client.div(void 0, _.hu.nevermind.timeline.client.f_12));
            },
            render$f_2: function () {
              return _.hu.nevermind.timeline.client.div(void 0, _.hu.nevermind.timeline.client.f_13);
            },
            div$f: function () {
            },
            div: function (propBuilder, body) {
              if (propBuilder === void 0)
                propBuilder = _.hu.nevermind.timeline.client.div$f;
              var props = new _.hu.nevermind.reakt.HtmlGlobalProperties();
              propBuilder.call(props);
              delete props.key;
              return new _.hu.nevermind.timeline.client.TagElement('div', props, _.hu.nevermind.timeline.client.collectChildren(body));
            },
            ul: function (body) {
              return new _.hu.nevermind.timeline.client.TagElement('ul', null, _.hu.nevermind.timeline.client.collectChildren(body));
            },
            li: function (body) {
              return new _.hu.nevermind.timeline.client.TagElement('li', null, _.hu.nevermind.timeline.client.collectChildren(body));
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
            ReactSpecInstance: Kotlin.createClass(function () {
              return [_.hu.nevermind.timeline.client.ReactElementCreator];
            }, function (componentSpec, props, childrenFromUserSide) {
              if (props === void 0)
                props = null;
              if (childrenFromUserSide === void 0)
                childrenFromUserSide = Kotlin.modules['stdlib'].kotlin.emptyList();
              this.componentSpec = componentSpec;
              this.props = props;
              this.childrenFromUserSide = childrenFromUserSide;
              this.reactComponent$delegate = Kotlin.modules['stdlib'].kotlin.properties.Delegates.notNull();
            }, /** @lends _.hu.nevermind.timeline.client.ReactSpecInstance.prototype */ {
              reactComponent_mt50lg$: {
                get: function () {
                  return this.reactComponent$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('reactComponent'));
                },
                set: function (reactComponent) {
                  this.reactComponent$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('reactComponent'), reactComponent);
                }
              },
              createReactElement: function () {
                this.componentSpec.children = this.childrenFromUserSide;
                var renderFunc = this.componentSpec.render;
                var body = _.hu.nevermind.timeline.client.ReactSpecInstance.createReactElement$f(this, renderFunc);
                this.reactComponent_mt50lg$ = _.hu.nevermind.timeline.client.React.createElement(this.componentSpec.reactClass, null, _.hu.nevermind.timeline.client.collectChildren(body));
                return this.reactComponent_mt50lg$;
              }
            }, /** @lends _.hu.nevermind.timeline.client.ReactSpecInstance */ {
              createReactElement$f: function (this$ReactSpecInstance, renderFunc) {
                return function () {
                  this$ReactSpecInstance.componentSpec.props = this$ReactSpecInstance.props;
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
            RuntimeInstanceData: Kotlin.createClass(null, function (props, state) {
              this.props = props;
              this.state = state;
            }, /** @lends _.hu.nevermind.timeline.client.RuntimeInstanceData.prototype */ {
              component1: function () {
                return this.props;
              },
              component2: function () {
                return this.state;
              },
              copy: function (props, state) {
                return new _.hu.nevermind.timeline.client.RuntimeInstanceData(props === void 0 ? this.props : props, state === void 0 ? this.state : state);
              },
              toString: function () {
                return 'RuntimeInstanceData(props=' + Kotlin.toString(this.props) + (', state=' + Kotlin.toString(this.state)) + ')';
              },
              hashCode: function () {
                var result = 0;
                result = result * 31 + Kotlin.hashCode(this.props) | 0;
                result = result * 31 + Kotlin.hashCode(this.state) | 0;
                return result;
              },
              equals_za3rmp$: function (other) {
                return this === other || (other !== null && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.props, other.props) && Kotlin.equals(this.state, other.state))));
              }
            }),
            ReactSpec: Kotlin.createClass(function () {
              return [_.hu.nevermind.timeline.client.ReactMixin];
            }, function () {
              this.runtimeInstanceData$delegate = Kotlin.modules['stdlib'].kotlin.properties.Delegates.notNull();
              this.reactClass = null;
              this.component$delegate = Kotlin.modules['stdlib'].kotlin.properties.Delegates.notNull();
              this.children = Kotlin.modules['stdlib'].kotlin.emptyList();
              this.props$delegate = Kotlin.modules['stdlib'].kotlin.properties.Delegates.notNull();
              this.reactClass = React.createClass(_.hu.nevermind.timeline.client.ReactSpec.ReactSpec$f(this));
            }, /** @lends _.hu.nevermind.timeline.client.ReactSpec.prototype */ {
              runtimeInstanceData: {
                get: function () {
                  return this.runtimeInstanceData$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('runtimeInstanceData'));
                }
              },
              component: {
                get: function () {
                  return this.component$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('component'));
                },
                set: function (component) {
                  this.component$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('component'), component);
                }
              },
              state: {
                get: function () {
                  return this.component.state;
                },
                set: function (value) {
                  this.component.setState(value);
                }
              },
              props: {
                get: function () {
                  return this.props$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('props'));
                },
                set: function (props) {
                  this.props$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('props'), props);
                }
              },
              element: function () {
                return new _.hu.nevermind.timeline.client.ReactSpecInstance(this, null, Kotlin.modules['stdlib'].kotlin.emptyList());
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
            }, /** @lends _.hu.nevermind.timeline.client.ReactSpec */ {
              render$f: function (this$ReactSpec) {
                return function () {
                  var renderFunc = this$ReactSpec.render;
                  var builder = new _.hu.nevermind.timeline.client.ComponentBuilder();
                  var reactElementCreator = renderFunc.call(builder);
                  return reactElementCreator.createReactElement();
                };
              },
              ReactSpec$f: function (this$ReactSpec) {
                return Kotlin.createObject(null, function () {
                  this.render = _.hu.nevermind.timeline.client.ReactSpec.render$f(this$ReactSpec);
                });
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
