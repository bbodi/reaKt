(function (Kotlin) {
  'use strict';
  var _ = Kotlin.defineRootPackage(null, /** @lends _ */ {
    hu: Kotlin.definePackage(null, /** @lends _.hu */ {
      nevermind: Kotlin.definePackage(null, /** @lends _.hu.nevermind */ {
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
              tmp$0 = Kotlin.modules['stdlib'].kotlin.getOrPut_x00lr4$(this.actionHandlersList_kk68hc$, action, _.hu.nevermind.flux.register$f(action));
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
              tmp$2 = Kotlin.modules['stdlib'].kotlin.filter_azvtw4$(handlersForCurrentAction, _.hu.nevermind.flux.waitFor$f(stores));
              tmp$3 = Kotlin.modules['stdlib'].kotlin.partition_azvtw4$(tmp$2, _.hu.nevermind.flux.waitFor$f_0);
              var tmp$4 = tmp$3
              , pendingHandlers = tmp$4.component1()
              , nonPendingHandlers = tmp$4.component2();
              tmp$5 = Kotlin.modules['stdlib'].kotlin.firstOrNull_azvtw4$(pendingHandlers, _.hu.nevermind.flux.waitFor$f_1);
              var unhandledHandlers = tmp$5;
              Kotlin.modules['stdlib'].kotlin.require_eltq40$(unhandledHandlers == null, 'Dispatcher.waitFor(...): Circular dependency detected while waiting for ' + Kotlin.toString(unhandledHandlers) + '.');
              Kotlin.modules['stdlib'].kotlin.forEach_p7e0bo$(nonPendingHandlers, _.hu.nevermind.flux.waitFor$f_2(this));
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
            this.changeListeners_pcuery$ = Kotlin.modules['stdlib'].kotlin.arrayListOf_9mqe4v$([]);
          }, /** @lends _.hu.nevermind.flux.Store.prototype */ {
            register_x5ky9g$: function (actionDef, callback) {
              return _.hu.nevermind.flux.Dispatcher.register(this, actionDef, callback);
            },
            addChangeListener_qshda6$: function (callback) {
              this.changeListeners_pcuery$.add_za3rmp$(callback);
            },
            emitChange: function () {
              Kotlin.modules['stdlib'].kotlin.forEach_p7e0bo$(this.changeListeners_pcuery$, _.hu.nevermind.flux.Store.emitChange$f);
            }
          }, /** @lends _.hu.nevermind.flux.Store */ {
            emitChange$f: function (it) {
              it();
            }
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
          register$f: function (action) {
            return function () {
              return new _.hu.nevermind.flux.ActionHandlers(action);
            };
          },
          waitFor$f: function (stores) {
            return function (it) {
              return Kotlin.modules['stdlib'].kotlin.contains_ke19y6$(stores, it.store);
            };
          },
          waitFor$f_0: function (it) {
            return it.pending || it.handled;
          },
          waitFor$f_1: function (it) {
            return !it.handled;
          },
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
        }),
        reakt: Kotlin.definePackage(null, /** @lends _.hu.nevermind.reakt */ {
          ReactElementContainer: Kotlin.createClass(null, function () {
            this.elements = Kotlin.modules['stdlib'].kotlin.arrayListOf_9mqe4v$([]);
            this.options = Kotlin.modules['stdlib'].kotlin.arrayListOf_9mqe4v$([]);
          }, /** @lends _.hu.nevermind.reakt.ReactElementContainer.prototype */ {
            ref: {
              get: function () {
                return Kotlin.modules['stdlib'].kotlin.error_za3rmp$('');
              },
              set: function (value) {
                this.options.add_za3rmp$(Kotlin.modules['stdlib'].kotlin.to_l1ob02$('ref', value.name));
              }
            },
            plus_ow6yss$: function ($receiver) {
              Kotlin.modules['stdlib'].kotlin.forEach_p7e0bo$($receiver, _.hu.nevermind.reakt.ReactElementContainer.plus_ow6yss$f(this));
            },
            plus_zhpcab$: function ($receiver) {
              var reactElementJs = $receiver.createElement().backend;
              this.elements.add_za3rmp$(reactElementJs);
            },
            plus_oclkc7$: function ($receiver) {
              this.elements.add_za3rmp$($receiver.backend);
            },
            plus_eg9ybj$: function ($receiver) {
              Kotlin.modules['stdlib'].kotlin.forEach_5wd4f$($receiver, _.hu.nevermind.reakt.ReactElementContainer.plus_eg9ybj$f(this));
            },
            plus_pdl1w0$: function ($receiver) {
              this.elements.add_za3rmp$($receiver);
            }
          }, /** @lends _.hu.nevermind.reakt.ReactElementContainer */ {
            plus_ow6yss$f: function (this$ReactElementContainer) {
              return function (it) {
                this$ReactElementContainer.elements.add_za3rmp$(it.createElement().backend);
              };
            },
            plus_eg9ybj$f: function (this$ReactElementContainer) {
              return function (it) {
                this$ReactElementContainer.elements.add_za3rmp$(Kotlin.isType(it, _.hu.nevermind.reakt.ReactElement) ? it.backend : it);
              };
            }
          }),
          createReactElementJs: function (tagName, options, addOptions, body) {
            var fullOptions = Kotlin.modules['stdlib'].kotlin.arrayListOf_9mqe4v$([]);
            Kotlin.modules['stdlib'].kotlin.addAll_7g2der$(fullOptions, options);
            var elements = [];
            if (body != null) {
              var elementContainer = new _.hu.nevermind.reakt.ReactElementContainer();
              body.call(elementContainer);
              fullOptions.addAll_4fm7v2$(elementContainer.options);
              elements = Kotlin.copyToArray(elementContainer.elements);
            }
            addOptions(fullOptions);
            var constructorParams = _.hu.nevermind.reakt.createObjectWithDynamicFields(fullOptions);
            var reactElementJs = _.hu.nevermind.reakt.React.object.DOM[tagName];
            return new _.hu.nevermind.reakt.ReactElement(reactElementJs(constructorParams, elements));
          },
          div_3topnc$f: function (it) {
          },
          div_3topnc$: function (options, body) {
            return _.hu.nevermind.reakt.createReactElementJs('div', options, _.hu.nevermind.reakt.div_3topnc$f, body);
          },
          h1_3topnc$f: function (it) {
          },
          h1_3topnc$: function (options, body) {
            if (options === void 0)
              options = [];
            return _.hu.nevermind.reakt.createReactElementJs('h1', options, _.hu.nevermind.reakt.h1_3topnc$f, body);
          },
          h2_3topnc$f: function (it) {
          },
          h2_3topnc$: function (options, body) {
            return _.hu.nevermind.reakt.createReactElementJs('h2', options, _.hu.nevermind.reakt.h2_3topnc$f, body);
          },
          h3_3topnc$f: function (it) {
          },
          h3_3topnc$: function (options, body) {
            return _.hu.nevermind.reakt.createReactElementJs('h3', options, _.hu.nevermind.reakt.h3_3topnc$f, body);
          },
          h4_3topnc$f: function (it) {
          },
          h4_3topnc$: function (options, body) {
            return _.hu.nevermind.reakt.createReactElementJs('h4', options, _.hu.nevermind.reakt.h4_3topnc$f, body);
          },
          label_3topnc$f: function (it) {
          },
          label_3topnc$: function (options, body) {
            return _.hu.nevermind.reakt.createReactElementJs('label', options, _.hu.nevermind.reakt.label_3topnc$f, body);
          },
          form_djsqtr$f: function (it) {
          },
          form_djsqtr$f_0: function (onSubmit) {
            return function (options) {
              options.add_za3rmp$(Kotlin.modules['stdlib'].kotlin.to_l1ob02$('onSubmit', onSubmit));
            };
          },
          form_djsqtr$: function (options, onSubmit, body) {
            if (onSubmit === void 0)
              onSubmit = _.hu.nevermind.reakt.form_djsqtr$f;
            return _.hu.nevermind.reakt.createReactElementJs('form', options, _.hu.nevermind.reakt.form_djsqtr$f_0(onSubmit), body);
          },
          InputType: Kotlin.createEnumClass(function () {
            return [Kotlin.Enum];
          }, function $fun() {
            $fun.baseInitializer.call(this);
          }, function () {
            return {
              BUTTON: new _.hu.nevermind.reakt.InputType(),
              CHECKBOX: new _.hu.nevermind.reakt.InputType(),
              COLOR: new _.hu.nevermind.reakt.InputType(),
              DATE: new _.hu.nevermind.reakt.InputType(),
              DATETIME: new _.hu.nevermind.reakt.InputType(),
              DATETIME_LOCAL: new _.hu.nevermind.reakt.InputType(),
              EMAIL: new _.hu.nevermind.reakt.InputType(),
              FILE: new _.hu.nevermind.reakt.InputType(),
              HIDDEN: new _.hu.nevermind.reakt.InputType(),
              IMAGE: new _.hu.nevermind.reakt.InputType(),
              MONTH: new _.hu.nevermind.reakt.InputType(),
              NUMBER: new _.hu.nevermind.reakt.InputType(),
              PASSWORD: new _.hu.nevermind.reakt.InputType(),
              RADIO: new _.hu.nevermind.reakt.InputType(),
              RANGE: new _.hu.nevermind.reakt.InputType(),
              RESET: new _.hu.nevermind.reakt.InputType(),
              SEARCH: new _.hu.nevermind.reakt.InputType(),
              SUBMIT: new _.hu.nevermind.reakt.InputType(),
              TEL: new _.hu.nevermind.reakt.InputType(),
              TEXT: new _.hu.nevermind.reakt.InputType(),
              TIME: new _.hu.nevermind.reakt.InputType(),
              URL: new _.hu.nevermind.reakt.InputType(),
              WEEK: new _.hu.nevermind.reakt.InputType()
            };
          }),
          input_5p5u6h$f: function (type) {
            return function (options) {
              options.add_za3rmp$(Kotlin.modules['stdlib'].kotlin.to_l1ob02$('type', type.name().toLowerCase()));
            };
          },
          input_5p5u6h$: function (type, options) {
            return _.hu.nevermind.reakt.createReactElementJs('input', options, _.hu.nevermind.reakt.input_5p5u6h$f(type), null);
          },
          textarea_nkp6m1$f: function (rows, cols) {
            return function (options) {
              options.add_za3rmp$(Kotlin.modules['stdlib'].kotlin.to_l1ob02$('rows', rows));
              options.add_za3rmp$(Kotlin.modules['stdlib'].kotlin.to_l1ob02$('cols', cols));
            };
          },
          textarea_nkp6m1$: function (rows, cols, options) {
            return _.hu.nevermind.reakt.createReactElementJs('textarea', options, _.hu.nevermind.reakt.textarea_nkp6m1$f(rows, cols), null);
          },
          table_3topnc$f: function (it) {
          },
          table_3topnc$: function (options, body) {
            return _.hu.nevermind.reakt.createReactElementJs('table', options, _.hu.nevermind.reakt.table_3topnc$f, body);
          },
          thead_3topnc$f: function (it) {
          },
          thead_3topnc$: function (options, body) {
            return _.hu.nevermind.reakt.createReactElementJs('thead', options, _.hu.nevermind.reakt.thead_3topnc$f, body);
          },
          td_3topnc$f: function (it) {
          },
          td_3topnc$: function (options, body) {
            return _.hu.nevermind.reakt.createReactElementJs('td', options, _.hu.nevermind.reakt.td_3topnc$f, body);
          },
          th_3topnc$f: function (it) {
          },
          th_3topnc$: function (options, body) {
            return _.hu.nevermind.reakt.createReactElementJs('th', options, _.hu.nevermind.reakt.th_3topnc$f, body);
          },
          tr_3topnc$f: function (it) {
          },
          tr_3topnc$: function (options, body) {
            return _.hu.nevermind.reakt.createReactElementJs('tr', options, _.hu.nevermind.reakt.tr_3topnc$f, body);
          },
          ButtonType: Kotlin.createEnumClass(function () {
            return [Kotlin.Enum];
          }, function $fun() {
            $fun.baseInitializer.call(this);
          }, function () {
            return {
              BUTTON: new _.hu.nevermind.reakt.ButtonType(),
              RESET: new _.hu.nevermind.reakt.ButtonType(),
              SUBMIT: new _.hu.nevermind.reakt.ButtonType()
            };
          }),
          button_tqynw0$f: function (type) {
            return function (options) {
              options.add_za3rmp$(Kotlin.modules['stdlib'].kotlin.to_l1ob02$('type', type.name().toLowerCase()));
            };
          },
          button_tqynw0$: function (type, options, body) {
            if (type === void 0)
              type = _.hu.nevermind.reakt.ButtonType.object.BUTTON;
            return _.hu.nevermind.reakt.createReactElementJs('button', options, _.hu.nevermind.reakt.button_tqynw0$f(type), body);
          },
          span_3topnc$f: function (options) {
          },
          span_3topnc$: function (options, body) {
            return _.hu.nevermind.reakt.createReactElementJs('span', options, _.hu.nevermind.reakt.span_3topnc$f, body);
          },
          ul_3topnc$f: function (options) {
          },
          ul_3topnc$: function (options, body) {
            return _.hu.nevermind.reakt.createReactElementJs('ul', options, _.hu.nevermind.reakt.ul_3topnc$f, body);
          },
          li_3topnc$f: function (options) {
          },
          li_3topnc$: function (options, body) {
            return _.hu.nevermind.reakt.createReactElementJs('li', options, _.hu.nevermind.reakt.li_3topnc$f, body);
          },
          a_3topnc$f: function (options) {
          },
          a_3topnc$: function (options, body) {
            return _.hu.nevermind.reakt.createReactElementJs('a', options, _.hu.nevermind.reakt.a_3topnc$f, body);
          },
          ReactElement: Kotlin.createClass(null, function (backend) {
            this.backend = backend;
          }),
          ReactDom: Kotlin.createClass(null, null, /** @lends _.hu.nevermind.reakt.ReactDom.prototype */ {
            get: function (tagName) {
              return noImpl;
            }
          }),
          React: Kotlin.createClass(null, null, null, /** @lends _.hu.nevermind.reakt.React */ {
            render_40g7my$f: function () {
            },
            f: function (reactClass, this$React$) {
              return function () {
                var tmp$0;
                var self = null;
                self = this;
                this$React$.readStateFromJsToKotlin(self, reactClass);
                return (tmp$0 = reactClass.render()) != null ? tmp$0.backend : null;
              };
            },
            f_0: function (reactClass, this$React$) {
              return function () {
                var self = null;
                self = this;
                this$React$.readStateFromJsToKotlin(self, reactClass);
                reactClass.componentDidMount();
              };
            },
            createClass_ew72dd$f: function (reactClass, this$React$) {
              return Kotlin.createObject(null, function () {
                this.render = _.hu.nevermind.reakt.React.f(reactClass, this$React$);
                this.componentDidMount = _.hu.nevermind.reakt.React.f_0(reactClass, this$React$);
              });
            },
            object_initializer$: function () {
              return Kotlin.createObject(null, function () {
                this.DOM = React.DOM;
              }, {
                render_40g7my$: function (element, container, callback) {
                  if (callback === void 0)
                    callback = _.hu.nevermind.reakt.React.render_40g7my$f;
                  React.render(element != null ? element.backend : null, container, callback);
                },
                createClass_ew72dd$: function (reactClass) {
                  return React.createClass(_.hu.nevermind.reakt.React.createClass_ew72dd$f(reactClass, this));
                },
                readStateFromJsToKotlin: function (self, reactClass) {
                  var props = self.props;
                  reactClass.propsJs = props;
                  var refs = self.refs;
                  reactClass.refs = refs;
                  if (Kotlin.isType(reactClass, _.hu.nevermind.reakt.StatefulReactClass)) {
                    var state = self.state;
                    reactClass.setStateJs_za3rmp$(state);
                  }
                  reactClass.reactClassRuntimeRepr = self;
                }
              });
            }
          }),
          ReactPropsJs: Kotlin.createClass(null, function () {
            this.children = noImpl;
          }, /** @lends _.hu.nevermind.reakt.ReactPropsJs.prototype */ {
            get: function (name) {
              return noImpl;
            },
            set: function (name, value) {
              noImpl;
            }
          }),
          ReactRefs: Kotlin.createClass(null, null, /** @lends _.hu.nevermind.reakt.ReactRefs.prototype */ {
            get: function (name) {
              return noImpl;
            },
            set: function (name, value) {
              noImpl;
            }
          }),
          ReactRef: Kotlin.createClass(null, function (reactClass, name) {
            this.reactClass = reactClass;
            this.name = name;
          }, /** @lends _.hu.nevermind.reakt.ReactRef.prototype */ {
            getDOMNode: function () {
              var tmp$0;
              var ref = ((tmp$0 = this.reactClass.refs) != null ? tmp$0 : Kotlin.throwNPE())[this.name];
              return ref.getDOMNode();
            },
            component1: function () {
              return this.reactClass;
            },
            component2: function () {
              return this.name;
            },
            copy_7dm7l9$: function (reactClass, name) {
              return new _.hu.nevermind.reakt.ReactRef(reactClass === void 0 ? this.reactClass : reactClass, name === void 0 ? this.name : name);
            },
            toString: function () {
              return 'ReactRef(reactClass=' + Kotlin.toString(this.reactClass) + (', name=' + Kotlin.toString(this.name)) + ')';
            },
            hashCode: function () {
              var result = 0;
              result = result * 31 + Kotlin.hashCode(this.reactClass) | 0;
              result = result * 31 + Kotlin.hashCode(this.name) | 0;
              return result;
            },
            equals_za3rmp$: function (other) {
              return this === other || (other !== null && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.reactClass, other.reactClass) && Kotlin.equals(this.name, other.name))));
            }
          }),
          StatefulReactClass: Kotlin.createClass(function () {
            return [_.hu.nevermind.reakt.ReactClass];
          }, function $fun(constructorOptions, body) {
            $fun.baseInitializer.call(this, constructorOptions, body);
            this.$state_poix00$ = this.getInitialState();
          }, /** @lends _.hu.nevermind.reakt.StatefulReactClass.prototype */ {
            state: {
              get: function () {
                return this.$state_poix00$;
              },
              set: function (state) {
                this.$state_poix00$ = state;
              }
            },
            changeState_un3fny$: function (body) {
              this.state = body();
              this.forceUpdate();
            },
            setState_za3rmp$: function (newState) {
              this.reactClassRuntimeRepr.setState(newState);
            },
            forceUpdate: function () {
              this.reactClassRuntimeRepr.forceUpdate();
            },
            setStateJs_za3rmp$: function (st) {
            }
          }),
          PropertyDefinition: Kotlin.createClass(null, function () {
            this.id = 'name_' + Kotlin.hashCode(this);
          }, /** @lends _.hu.nevermind.reakt.PropertyDefinition.prototype */ {
            copy: function () {
              return new _.hu.nevermind.reakt.PropertyDefinition();
            }
          }),
          set_ife7hi$: function ($receiver, param) {
            return new _.hu.nevermind.reakt.PropertyPair($receiver, param);
          },
          PropertyPair: Kotlin.createClass(null, function (key, value) {
            this.key = key;
            this.value = value;
          }, /** @lends _.hu.nevermind.reakt.PropertyPair.prototype */ {
            component1: function () {
              return this.key;
            },
            component2: function () {
              return this.value;
            },
            copy_u0sgdk$: function (key, value) {
              return new _.hu.nevermind.reakt.PropertyPair(key === void 0 ? this.key : key, value === void 0 ? this.value : value);
            },
            toString: function () {
              return 'PropertyPair(key=' + Kotlin.toString(this.key) + (', value=' + Kotlin.toString(this.value)) + ')';
            },
            hashCode: function () {
              var result = 0;
              result = result * 31 + Kotlin.hashCode(this.key) | 0;
              result = result * 31 + Kotlin.hashCode(this.value) | 0;
              return result;
            },
            equals_za3rmp$: function (other) {
              return this === other || (other !== null && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.key, other.key) && Kotlin.equals(this.value, other.value))));
            }
          }),
          ReactClassRuntimeRepr: Kotlin.createClass(null, null, /** @lends _.hu.nevermind.reakt.ReactClassRuntimeRepr.prototype */ {
            setState: function (newState) {
              noImpl;
            },
            forceUpdate: function () {
              noImpl;
            }
          }),
          ReactClass: Kotlin.createClass(null, function (constructorOptions, body) {
            this.constructorOptions_c8d5yn$ = constructorOptions;
            this.body = body;
            this.reactClassRuntimeRepr$delegate = Kotlin.modules['stdlib'].kotlin.properties.Delegates.notNull();
            this.propsJs = null;
            this.refs = null;
            this.backend = _.hu.nevermind.reakt.React.object.createClass_ew72dd$(this);
          }, /** @lends _.hu.nevermind.reakt.ReactClass.prototype */ {
            reactClassRuntimeRepr: {
              get: function () {
                return this.reactClassRuntimeRepr$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('reactClassRuntimeRepr'));
              },
              set: function (reactClassRuntimeRepr) {
                this.reactClassRuntimeRepr$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('reactClassRuntimeRepr'), reactClassRuntimeRepr);
              }
            },
            ref_61zpoe$: function (name) {
              return new _.hu.nevermind.reakt.ReactRef(this, name);
            },
            props_wh2x03$: function (prop) {
              var tmp$0;
              return ((tmp$0 = this.propsJs) != null ? tmp$0 : Kotlin.throwNPE())[prop.id];
            },
            children: {
              get: function () {
                var tmp$0, tmp$1;
                var children = ((tmp$0 = this.propsJs) != null ? tmp$0 : Kotlin.throwNPE()).children;
                if (Kotlin.isType(children, Kotlin.modules['builtins'].kotlin.Array)) {
                  tmp$1 = children;
                }
                 else {
                  tmp$1 = [children];
                }
                return tmp$1;
              }
            },
            componentDidMount: function () {
            },
            createElement: function () {
              var tmp$0;
              var elementContainer = new _.hu.nevermind.reakt.ReactElementContainer();
              this.body.call(elementContainer);
              var fullOptions = Kotlin.modules['stdlib'].kotlin.arrayListOf_9mqe4v$([]);
              Kotlin.modules['stdlib'].kotlin.forEach_5wd4f$(this.constructorOptions_c8d5yn$, _.hu.nevermind.reakt.ReactClass.createElement$f(fullOptions));
              fullOptions.addAll_4fm7v2$(elementContainer.options);
              var constructorParams = _.hu.nevermind.reakt.createObjectWithDynamicFields(fullOptions);
              return new _.hu.nevermind.reakt.ReactElement((tmp$0 = React).createElement.apply(tmp$0, [this.backend, constructorParams].concat(Kotlin.copyToArray(elementContainer.elements))));
            }
          }, /** @lends _.hu.nevermind.reakt.ReactClass */ {
            createElement$f: function (fullOptions) {
              return function (it) {
                fullOptions.add_za3rmp$(new Kotlin.modules['stdlib'].kotlin.Pair(it.key.id, it.value));
              };
            }
          }),
          createObjectWithDynamicFields: function (options) {
            var tmp$1, tmp$2;
            var tmpObj = Kotlin.createObject(null, null);
            tmp$1 = options.iterator();
            while (tmp$1.hasNext()) {
              var tmp$0 = tmp$1.next()
              , key = tmp$0.component1()
              , value = tmp$0.component2();
              if (Kotlin.isType(value, _.hu.nevermind.reakt.ReactRef))
                tmp$2 = value.name;
              else
                tmp$2 = value;
              var convertedValue = tmp$2;
              tmpObj[key] = convertedValue;
            }
            return tmpObj;
          },
          example: Kotlin.definePackage(null, /** @lends _.hu.nevermind.reakt.example */ {
            InputField: Kotlin.createClass(function () {
              return [_.hu.nevermind.reakt.ReactClass];
            }, function $fun(inputType, labelText, placeHolder, value, props, body) {
              if (placeHolder === void 0)
                placeHolder = '';
              if (value === void 0)
                value = '';
              if (body === void 0)
                body = _.hu.nevermind.reakt.example.InputField.InputField$f;
              $fun.baseInitializer.call(this, props, body);
              this.inputType = inputType;
              this.labelText = labelText;
              this.placeHolder = placeHolder;
              this.value = value;
              this.inputRef = this.ref_61zpoe$('input');
            }, /** @lends _.hu.nevermind.reakt.example.InputField.prototype */ {
              componentDidMount: function () {
                this.inputRef.getDOMNode().value = this.value;
              },
              render: function () {
                return _.hu.nevermind.reakt.div_3topnc$([Kotlin.modules['stdlib'].kotlin.to_l1ob02$('className', 'form-group')], _.hu.nevermind.reakt.example.InputField.render$f(this));
              }
            }, /** @lends _.hu.nevermind.reakt.example.InputField */ {
              InputField$f: function () {
              },
              f: function (this$InputField) {
                return function () {
                  this.plus_pdl1w0$(this$InputField.labelText);
                };
              },
              render$f: function (this$InputField) {
                return function () {
                  this.plus_oclkc7$(_.hu.nevermind.reakt.label_3topnc$([], _.hu.nevermind.reakt.example.InputField.f(this$InputField)));
                  this.plus_oclkc7$(_.hu.nevermind.reakt.input_5p5u6h$(this$InputField.inputType, [Kotlin.modules['stdlib'].kotlin.to_l1ob02$('className', 'form-control'), Kotlin.modules['stdlib'].kotlin.to_l1ob02$('placeholder', this$InputField.placeHolder), Kotlin.modules['stdlib'].kotlin.to_l1ob02$('ref', this$InputField.inputRef)]));
                };
              }
            }),
            EventForm: Kotlin.createClass(function () {
              return [_.hu.nevermind.reakt.ReactClass];
            }, function $fun(event, storeState, props, body) {
              if (body === void 0)
                body = _.hu.nevermind.reakt.example.EventForm.EventForm$f;
              $fun.baseInitializer.call(this, props, body);
              this.event = event;
              this.storeState = storeState;
              this.dateRef$delegate = Kotlin.modules['stdlib'].kotlin.properties.Delegates.notNull();
              this.fieldRefs = Kotlin.modules['stdlib'].kotlin.arrayListOf_9mqe4v$([]);
            }, /** @lends _.hu.nevermind.reakt.example.EventForm.prototype */ {
              dateRef: {
                get: function () {
                  return this.dateRef$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('dateRef'));
                },
                set: function (dateRef) {
                  this.dateRef$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('dateRef'), dateRef);
                }
              },
              componentDidMount: function () {
              },
              render: function () {
                return _.hu.nevermind.reakt.form_djsqtr$([], void 0, _.hu.nevermind.reakt.example.EventForm.render$f(this));
              }
            }, /** @lends _.hu.nevermind.reakt.example.EventForm */ {
              EventForm$f: function () {
              },
              f: function () {
                return this.year.fourDigits.plus('.').plus_9xull5$(this.month.twoDigits).plus_61zpoe$('.').plus_9xull5$(this.dayOfMonth.twoDigits).plus_61zpoe$(' ').plus_9xull5$(this.hour24.twoDigits).plus_61zpoe$(':').plus_9xull5$(this.minutes.twoDigits);
              },
              f_0: function () {
                return this.year.fourDigits.plus('.').plus_9xull5$(this.month.twoDigits).plus_61zpoe$('.').plus_9xull5$(this.dayOfMonth.twoDigits);
              },
              f_1: function (this$EventForm) {
                return function () {
                  this.plus_pdl1w0$(this$EventForm.event.name);
                };
              },
              f_2: function (this$EventForm) {
                return function (it) {
                  var tmp$0;
                  return (tmp$0 = this$EventForm.storeState.eventFields.get_za3rmp$(it)) != null ? tmp$0 : Kotlin.throwNPE();
                };
              },
              f_3: function (field, fieldTemplate, this$EventForm) {
                return function () {
                  var tmp$0, tmp$1, tmp$2, tmp$3, tmp$4, tmp$5, tmp$6;
                  tmp$0 = field.type;
                  if (tmp$0 === _.hu.nevermind.timeline.entities.EventFieldType.object.INT)
                    tmp$6 = new _.hu.nevermind.reakt.example.InputField(_.hu.nevermind.reakt.InputType.object.NUMBER, field.name, (tmp$1 = fieldTemplate != null ? fieldTemplate.hint : null) != null ? tmp$1 : '', Kotlin.toString(field.fieldValue), []);
                  else if (tmp$0 === _.hu.nevermind.timeline.entities.EventFieldType.object.FLOAT)
                    tmp$6 = new _.hu.nevermind.reakt.example.InputField(_.hu.nevermind.reakt.InputType.object.NUMBER, field.name, (tmp$2 = fieldTemplate != null ? fieldTemplate.hint : null) != null ? tmp$2 : '', Kotlin.toString(field.fieldValue), []);
                  else if (tmp$0 === _.hu.nevermind.timeline.entities.EventFieldType.object.STRING)
                    tmp$6 = new _.hu.nevermind.reakt.example.InputField(_.hu.nevermind.reakt.InputType.object.TEXT, field.name, (tmp$3 = fieldTemplate != null ? fieldTemplate.hint : null) != null ? tmp$3 : '', Kotlin.toString(field.fieldValue), []);
                  else if (tmp$0 === _.hu.nevermind.timeline.entities.EventFieldType.object.TEXTAREA)
                    tmp$6 = new _.hu.nevermind.reakt.example.InputField(_.hu.nevermind.reakt.InputType.object.TEXT, field.name, (tmp$4 = fieldTemplate != null ? fieldTemplate.hint : null) != null ? tmp$4 : '', Kotlin.toString(field.fieldValue), []);
                  else if (tmp$0 === _.hu.nevermind.timeline.entities.EventFieldType.object.SELECT)
                    tmp$6 = new _.hu.nevermind.reakt.example.InputField(_.hu.nevermind.reakt.InputType.object.TEXT, field.name, (tmp$5 = fieldTemplate != null ? fieldTemplate.hint : null) != null ? tmp$5 : '', Kotlin.toString(field.fieldValue), []);
                  var inputField = tmp$6;
                  this.plus_zhpcab$(inputField);
                  this$EventForm.fieldRefs.add_za3rmp$(inputField.inputRef);
                };
              },
              f_4: function (this$EventForm, this$) {
                return function (field) {
                  var fieldTemplate = this$EventForm.storeState.EventTemplateField.get_za3rmp$(field.templateFieldId);
                  this$.plus_oclkc7$(_.hu.nevermind.reakt.div_3topnc$([Kotlin.modules['stdlib'].kotlin.to_l1ob02$('className', 'form-group')], _.hu.nevermind.reakt.example.EventForm.f_3(field, fieldTemplate, this$EventForm)));
                };
              },
              render$f: function (this$EventForm) {
                return function () {
                  var tmp$0, tmp$1;
                  var template = this$EventForm.storeState.templates.get_za3rmp$(this$EventForm.event.templateId);
                  if ((tmp$0 = template != null ? template.useDateTime : null) != null ? tmp$0 : false) {
                    tmp$1 = _.net.yested.utils.format_hliocp$(_.hu.nevermind.reakt.example.EventForm.f);
                  }
                   else {
                    tmp$1 = _.net.yested.utils.format_hliocp$(_.hu.nevermind.reakt.example.EventForm.f_0);
                  }
                  var formatStr = tmp$1;
                  var dateField = new _.hu.nevermind.reakt.example.InputField(_.hu.nevermind.reakt.InputType.object.TEXT, 'Date', '', this$EventForm.event.date.format_k6n0qe$(formatStr), []);
                  this$EventForm.dateRef = dateField.inputRef;
                  this.plus_oclkc7$(_.hu.nevermind.reakt.h4_3topnc$([], _.hu.nevermind.reakt.example.EventForm.f_1(this$EventForm)));
                  this.plus_zhpcab$(dateField);
                  Kotlin.modules['stdlib'].kotlin.forEach_p7e0bo$(Kotlin.modules['stdlib'].kotlin.map_m3yiqg$(this$EventForm.event.fieldIds, _.hu.nevermind.reakt.example.EventForm.f_2(this$EventForm)), _.hu.nevermind.reakt.example.EventForm.f_4(this$EventForm, this));
                };
              }
            }),
            DropDownButtonItem: Kotlin.createClass(null, function (name, callback) {
              this.name = name;
              this.callback = callback;
            }),
            DropDownButton: Kotlin.createClass(function () {
              return [_.hu.nevermind.reakt.ReactClass];
            }, function $fun(buttonText, items, props, body) {
              if (body === void 0)
                body = _.hu.nevermind.reakt.example.DropDownButton.DropDownButton$f;
              $fun.baseInitializer.call(this, props, body);
              this.buttonText = buttonText;
              this.items = items;
            }, /** @lends _.hu.nevermind.reakt.example.DropDownButton.prototype */ {
              render: function () {
                return _.hu.nevermind.reakt.div_3topnc$([Kotlin.modules['stdlib'].kotlin.to_l1ob02$('className', 'dropdown')], _.hu.nevermind.reakt.example.DropDownButton.render$f(this));
              }
            }, /** @lends _.hu.nevermind.reakt.example.DropDownButton */ {
              DropDownButton$f: function () {
              },
              f: function () {
              },
              f_0: function (this$DropDownButton) {
                return function () {
                  this.plus_pdl1w0$(this$DropDownButton.buttonText);
                  this.plus_oclkc7$(_.hu.nevermind.reakt.span_3topnc$([Kotlin.modules['stdlib'].kotlin.to_l1ob02$('className', 'caret')], _.hu.nevermind.reakt.example.DropDownButton.f));
                };
              },
              f_1: function (it) {
                return function () {
                  var tmp$0;
                  (tmp$0 = it.callback) != null ? tmp$0() : null;
                };
              },
              f_2: function (it) {
                return function () {
                  this.plus_pdl1w0$(it.name);
                };
              },
              f_3: function (this$) {
                return function (it) {
                  this$.plus_oclkc7$(_.hu.nevermind.reakt.a_3topnc$([Kotlin.modules['stdlib'].kotlin.to_l1ob02$('role', 'menuItem'), Kotlin.modules['stdlib'].kotlin.to_l1ob02$('onClick', _.hu.nevermind.reakt.example.DropDownButton.f_1(it))], _.hu.nevermind.reakt.example.DropDownButton.f_2(it)));
                };
              },
              f_4: function (this$DropDownButton) {
                return function () {
                  Kotlin.modules['stdlib'].kotlin.forEach_p7e0bo$(this$DropDownButton.items, _.hu.nevermind.reakt.example.DropDownButton.f_3(this));
                };
              },
              f_5: function (this$DropDownButton) {
                return function () {
                  this.plus_oclkc7$(_.hu.nevermind.reakt.li_3topnc$([Kotlin.modules['stdlib'].kotlin.to_l1ob02$('role', 'presentation')], _.hu.nevermind.reakt.example.DropDownButton.f_4(this$DropDownButton)));
                };
              },
              render$f: function (this$DropDownButton) {
                return function () {
                  this.plus_oclkc7$(_.hu.nevermind.reakt.button_tqynw0$(_.hu.nevermind.reakt.ButtonType.object.BUTTON, [Kotlin.modules['stdlib'].kotlin.to_l1ob02$('className', 'btn btn-primary btn-default dropdown-toggle'), Kotlin.modules['stdlib'].kotlin.to_l1ob02$('data-toggle', 'dropdown')], _.hu.nevermind.reakt.example.DropDownButton.f_0(this$DropDownButton)));
                  this.plus_oclkc7$(_.hu.nevermind.reakt.ul_3topnc$([Kotlin.modules['stdlib'].kotlin.to_l1ob02$('className', 'dropdown-menu'), Kotlin.modules['stdlib'].kotlin.to_l1ob02$('role', 'menu')], _.hu.nevermind.reakt.example.DropDownButton.f_5(this$DropDownButton)));
                };
              }
            }),
            FilterSelectorButton: Kotlin.createClass(function () {
              return [_.hu.nevermind.reakt.ReactClass];
            }, function $fun(storeState, onFilteringTemplateSelected, props, body) {
              if (body === void 0)
                body = _.hu.nevermind.reakt.example.FilterSelectorButton.FilterSelectorButton$f;
              $fun.baseInitializer.call(this, props, body);
              this.storeState = storeState;
              this.onFilteringTemplateSelected = onFilteringTemplateSelected;
            }, /** @lends _.hu.nevermind.reakt.example.FilterSelectorButton.prototype */ {
              render: function () {
                var tmp$0, tmp$1, tmp$2;
                tmp$0 = Kotlin.modules['stdlib'].kotlin.map_m3yiqg$(this.storeState.templates.values(), _.hu.nevermind.reakt.example.FilterSelectorButton.render$f(this));
                tmp$1 = [];
                tmp$2 = void 0;
                return (new _.hu.nevermind.reakt.example.DropDownButton('Filter', tmp$0, tmp$1, tmp$2)).render();
              }
            }, /** @lends _.hu.nevermind.reakt.example.FilterSelectorButton */ {
              FilterSelectorButton$f: function () {
              },
              f: function (this$FilterSelectorButton, it) {
                return function () {
                  this$FilterSelectorButton.onFilteringTemplateSelected(it.id);
                };
              },
              render$f: function (this$FilterSelectorButton) {
                return function (it) {
                  return new _.hu.nevermind.reakt.example.DropDownButtonItem(it.name, _.hu.nevermind.reakt.example.FilterSelectorButton.f(this$FilterSelectorButton, it));
                };
              }
            }),
            FilterSelectorField: Kotlin.createClass(function () {
              return [_.hu.nevermind.reakt.ReactClass];
            }, function $fun(filteringTemplateIds, storeState, props, body) {
              if (body === void 0)
                body = _.hu.nevermind.reakt.example.FilterSelectorField.FilterSelectorField$f;
              $fun.baseInitializer.call(this, props, body);
              this.filteringTemplateIds = filteringTemplateIds;
              this.storeState = storeState;
              this.inputRef = this.ref_61zpoe$('inputRef');
            }, /** @lends _.hu.nevermind.reakt.example.FilterSelectorField.prototype */ {
              render: function () {
                return _.hu.nevermind.reakt.input_5p5u6h$(_.hu.nevermind.reakt.InputType.object.TEXT, [Kotlin.modules['stdlib'].kotlin.to_l1ob02$('ref', this.inputRef)]);
              },
              componentDidMount: function () {
                var tmp$0, tmp$1;
                tmp$1 = this.inputRef.getDOMNode();
                tmp$0 = Kotlin.modules['stdlib'].kotlin.map_m3yiqg$(this.filteringTemplateIds, _.hu.nevermind.reakt.example.FilterSelectorField.componentDidMount$f(this));
                tmp$1.value = Kotlin.modules['stdlib'].kotlin.join_raq5lb$(tmp$0, ',');
              }
            }, /** @lends _.hu.nevermind.reakt.example.FilterSelectorField */ {
              FilterSelectorField$f: function () {
              },
              componentDidMount$f: function (this$FilterSelectorField) {
                return function (it) {
                  var tmp$0;
                  return ((tmp$0 = this$FilterSelectorField.storeState.templates.get_za3rmp$(it)) != null ? tmp$0 : Kotlin.throwNPE()).name;
                };
              }
            }),
            EventFilter: Kotlin.createClass(function () {
              return [_.hu.nevermind.reakt.StatefulReactClass];
            }, function $fun(storeState, props, body) {
              if (body === void 0)
                body = _.hu.nevermind.reakt.example.EventFilter.EventFilter$f_0;
              $fun.baseInitializer.call(this, props, body);
              this.storeState = storeState;
              this.onFilteringTemplateSelected_lbmgfc$ = _.hu.nevermind.reakt.example.EventFilter.EventFilter$f(this);
            }, /** @lends _.hu.nevermind.reakt.example.EventFilter.prototype */ {
              getInitialState: function () {
                return Kotlin.modules['stdlib'].kotlin.emptyList();
              },
              render: function () {
                return _.hu.nevermind.reakt.div_3topnc$([Kotlin.modules['stdlib'].kotlin.to_l1ob02$('className', 'row')], _.hu.nevermind.reakt.example.EventFilter.render$f(this));
              }
            }, /** @lends _.hu.nevermind.reakt.example.EventFilter */ {
              f: function (this$EventFilter, id) {
                return function () {
                  return Kotlin.modules['stdlib'].kotlin.plus_pjxz11$(this$EventFilter.state, id);
                };
              },
              EventFilter$f: function (this$EventFilter) {
                return function (id) {
                  this$EventFilter.changeState_un3fny$(_.hu.nevermind.reakt.example.EventFilter.f(this$EventFilter, id));
                };
              },
              EventFilter$f_0: function () {
              },
              render$f: function (this$EventFilter) {
                return function () {
                  this.plus_zhpcab$(new _.hu.nevermind.reakt.example.FilterSelectorButton(this$EventFilter.storeState, this$EventFilter.onFilteringTemplateSelected_lbmgfc$, []));
                  this.plus_zhpcab$(new _.hu.nevermind.reakt.example.FilterSelectorField(this$EventFilter.state, this$EventFilter.storeState, []));
                };
              }
            }),
            AddEventDropDownButton: Kotlin.createClass(function () {
              return [_.hu.nevermind.reakt.ReactClass];
            }, function $fun(storeState, props, body) {
              if (body === void 0)
                body = _.hu.nevermind.reakt.example.AddEventDropDownButton.AddEventDropDownButton$f;
              $fun.baseInitializer.call(this, props, body);
              this.storeState = storeState;
            }, /** @lends _.hu.nevermind.reakt.example.AddEventDropDownButton.prototype */ {
              render: function () {
                var tmp$0, tmp$1, tmp$2;
                var eventsByTemplateIds = Kotlin.modules['stdlib'].kotlin.hashMapOf_eoa9s7$([]);
                Kotlin.modules['stdlib'].kotlin.forEach_p7e0bo$(this.storeState.templates.values(), _.hu.nevermind.reakt.example.AddEventDropDownButton.render$f(eventsByTemplateIds));
                tmp$0 = Kotlin.modules['stdlib'].kotlin.filter_azvtw4$(this.storeState.events, _.hu.nevermind.reakt.example.AddEventDropDownButton.render$f_0);
                Kotlin.modules['stdlib'].kotlin.forEach_p7e0bo$(tmp$0, _.hu.nevermind.reakt.example.AddEventDropDownButton.render$f_1(eventsByTemplateIds));
                tmp$1 = Kotlin.modules['stdlib'].kotlin.sortBy_cvgzri$(eventsByTemplateIds.entrySet(), _.hu.nevermind.reakt.example.AddEventDropDownButton.render$f_2);
                var orderedTemplateIds = Kotlin.modules['stdlib'].kotlin.map_m3yiqg$(tmp$1, _.hu.nevermind.reakt.example.AddEventDropDownButton.render$f_3);
                tmp$2 = Kotlin.modules['stdlib'].kotlin.map_m3yiqg$(Kotlin.modules['stdlib'].kotlin.reverse_ir3nkc$(orderedTemplateIds), _.hu.nevermind.reakt.example.AddEventDropDownButton.render$f_4(this));
                var items = tmp$2;
                return (new _.hu.nevermind.reakt.example.DropDownButton('Add', items, [])).render();
              }
            }, /** @lends _.hu.nevermind.reakt.example.AddEventDropDownButton */ {
              AddEventDropDownButton$f: function () {
              },
              render$f: function (eventsByTemplateIds) {
                return function (it) {
                  eventsByTemplateIds.put_wn2jw4$(it.id, 0);
                };
              },
              render$f_0: function (it) {
                return it.templateId != null;
              },
              render$f_1: function (eventsByTemplateIds) {
                return function (it) {
                  var tmp$0;
                  ((tmp$0 = eventsByTemplateIds.get_za3rmp$(it.templateId)) != null ? tmp$0 : Kotlin.throwNPE()) + 1;
                };
              },
              render$f_2: function (it) {
                return it.getValue();
              },
              render$f_3: function (it) {
                return it.getKey();
              },
              render$f_4: function (this$AddEventDropDownButton) {
                return function (it) {
                  var tmp$0;
                  var template = (tmp$0 = this$AddEventDropDownButton.storeState.templates.get_za3rmp$(it)) != null ? tmp$0 : Kotlin.throwNPE();
                  return new _.hu.nevermind.reakt.example.DropDownButtonItem(template.name, null);
                };
              }
            }),
            EventGridRow: Kotlin.createClass(function () {
              return [_.hu.nevermind.reakt.StatefulReactClass];
            }, function $fun(event, storeState, props, body) {
              if (body === void 0)
                body = _.hu.nevermind.reakt.example.EventGridRow.EventGridRow$f;
              $fun.baseInitializer.call(this, props, body);
              this.event = event;
              this.storeState = storeState;
            }, /** @lends _.hu.nevermind.reakt.example.EventGridRow.prototype */ {
              getInitialState: function () {
                return false;
              },
              render: function () {
                var tmp$0, tmp$1, tmp$2, tmp$3;
                var templ = this.event.templateId != null ? _.hu.nevermind.timeline.store.TemplateStore.getTemplate((tmp$0 = this.event.templateId) != null ? tmp$0 : Kotlin.throwNPE()) : null;
                if ((tmp$1 = templ != null ? templ.useDateTime : null) != null ? tmp$1 : false) {
                  tmp$2 = _.net.yested.utils.format_hliocp$(_.hu.nevermind.reakt.example.EventGridRow.render$f);
                }
                 else {
                  tmp$2 = _.net.yested.utils.format_hliocp$(_.hu.nevermind.reakt.example.EventGridRow.render$f_0);
                }
                var format = tmp$2;
                if (!this.state) {
                  tmp$3 = _.hu.nevermind.reakt.tr_3topnc$([], _.hu.nevermind.reakt.example.EventGridRow.render$f_1(this, format));
                }
                 else {
                  tmp$3 = _.hu.nevermind.reakt.tr_3topnc$([], _.hu.nevermind.reakt.example.EventGridRow.render$f_2(this, format));
                }
                return tmp$3;
              }
            }, /** @lends _.hu.nevermind.reakt.example.EventGridRow */ {
              EventGridRow$f: function () {
              },
              render$f: function () {
                return this.year.fourDigits.plus('.').plus_9xull5$(this.month.twoDigits).plus_61zpoe$('.').plus_9xull5$(this.dayOfMonth.twoDigits).plus_61zpoe$(' ').plus_9xull5$(this.hour24.twoDigits).plus_61zpoe$(':').plus_9xull5$(this.minutes.twoDigits);
              },
              render$f_0: function () {
                return this.year.fourDigits.plus('.').plus_9xull5$(this.month.twoDigits).plus_61zpoe$('.').plus_9xull5$(this.dayOfMonth.twoDigits);
              },
              f: function (this$EventGridRow, format) {
                return function () {
                  this.plus_pdl1w0$(this$EventGridRow.event.date.format_k6n0qe$(format));
                };
              },
              f_0: function (this$EventGridRow) {
                return function () {
                  this.plus_pdl1w0$(this$EventGridRow.event.name);
                };
              },
              f_1: function (field) {
                return function () {
                  this.plus_pdl1w0$(field.name);
                };
              },
              f_2: function (field) {
                return function () {
                  this.plus_pdl1w0$(Kotlin.toString(field.fieldValue));
                };
              },
              f_3: function () {
                this.plus_pdl1w0$('Copy');
              },
              f_4: function () {
                this.plus_oclkc7$(_.hu.nevermind.reakt.button_tqynw0$(void 0, [Kotlin.modules['stdlib'].kotlin.to_l1ob02$('className', 'btn btn-info btn-xs')], _.hu.nevermind.reakt.example.EventGridRow.f_3));
              },
              f_5: function () {
                return true;
              },
              f_6: function (this$EventGridRow) {
                return function () {
                  this$EventGridRow.changeState_un3fny$(_.hu.nevermind.reakt.example.EventGridRow.f_5);
                };
              },
              f_7: function () {
                this.plus_pdl1w0$('Edit');
              },
              f_8: function (this$EventGridRow) {
                return function () {
                  var onClick = _.hu.nevermind.reakt.example.EventGridRow.f_6(this$EventGridRow);
                  this.plus_oclkc7$(_.hu.nevermind.reakt.button_tqynw0$(_.hu.nevermind.reakt.ButtonType.object.BUTTON, [Kotlin.modules['stdlib'].kotlin.to_l1ob02$('className', 'btn btn-warning btn-xs'), Kotlin.modules['stdlib'].kotlin.to_l1ob02$('onClick', onClick)], _.hu.nevermind.reakt.example.EventGridRow.f_7));
                };
              },
              f_9: function () {
                this.plus_pdl1w0$('Delete');
              },
              f_10: function () {
                this.plus_oclkc7$(_.hu.nevermind.reakt.button_tqynw0$(void 0, [Kotlin.modules['stdlib'].kotlin.to_l1ob02$('className', 'btn btn-danger btn-xs')], _.hu.nevermind.reakt.example.EventGridRow.f_9));
              },
              f_11: function (this$EventGridRow) {
                return function () {
                  this.plus_oclkc7$(_.hu.nevermind.reakt.div_3topnc$([Kotlin.modules['stdlib'].kotlin.to_l1ob02$('className', 'col-md-1')], _.hu.nevermind.reakt.example.EventGridRow.f_4));
                  this.plus_oclkc7$(_.hu.nevermind.reakt.div_3topnc$([Kotlin.modules['stdlib'].kotlin.to_l1ob02$('className', 'col-md-1')], _.hu.nevermind.reakt.example.EventGridRow.f_8(this$EventGridRow)));
                  this.plus_oclkc7$(_.hu.nevermind.reakt.div_3topnc$([Kotlin.modules['stdlib'].kotlin.to_l1ob02$('className', 'col-md-1')], _.hu.nevermind.reakt.example.EventGridRow.f_10));
                };
              },
              f_12: function (this$EventGridRow) {
                return function () {
                  this.plus_oclkc7$(_.hu.nevermind.reakt.div_3topnc$([Kotlin.modules['stdlib'].kotlin.to_l1ob02$('className', 'row')], _.hu.nevermind.reakt.example.EventGridRow.f_11(this$EventGridRow)));
                };
              },
              render$f_1: function (this$EventGridRow, format) {
                return function () {
                  this.plus_oclkc7$(_.hu.nevermind.reakt.td_3topnc$([], _.hu.nevermind.reakt.example.EventGridRow.f(this$EventGridRow, format)));
                  this.plus_oclkc7$(_.hu.nevermind.reakt.td_3topnc$([], _.hu.nevermind.reakt.example.EventGridRow.f_0(this$EventGridRow)));
                  var field = _.hu.nevermind.timeline.store.EventFieldStore.get(this$EventGridRow.event.fieldIds.get_za3lpa$(0));
                  this.plus_oclkc7$(_.hu.nevermind.reakt.td_3topnc$([], _.hu.nevermind.reakt.example.EventGridRow.f_1(field)));
                  this.plus_oclkc7$(_.hu.nevermind.reakt.td_3topnc$([], _.hu.nevermind.reakt.example.EventGridRow.f_2(field)));
                  var underEditing = this$EventGridRow.state;
                  this.plus_oclkc7$(_.hu.nevermind.reakt.td_3topnc$([Kotlin.modules['stdlib'].kotlin.to_l1ob02$('className', 'col-md-6')], _.hu.nevermind.reakt.example.EventGridRow.f_12(this$EventGridRow)));
                };
              },
              f_13: function (eventForm) {
                return function () {
                  this.plus_zhpcab$(eventForm);
                };
              },
              f_14: function (it) {
                return it.getDOMNode().value;
              },
              f_15: function (this$EventGridRow) {
                return function (index, value) {
                  var tmp$0, tmp$1, tmp$2, tmp$3;
                  var field = (tmp$0 = this$EventGridRow.storeState.eventFields.get_za3rmp$(this$EventGridRow.event.fieldIds.get_za3lpa$(index))) != null ? tmp$0 : Kotlin.throwNPE();
                  tmp$1 = field.type;
                  if (tmp$1 === _.hu.nevermind.timeline.entities.EventFieldType.object.INT)
                    tmp$3 = parseInt(value);
                  else if (tmp$1 === _.hu.nevermind.timeline.entities.EventFieldType.object.FLOAT)
                    tmp$3 = (tmp$2 = Kotlin.safeParseDouble(value)) != null ? tmp$2 : Kotlin.throwNPE();
                  else if (tmp$1 === _.hu.nevermind.timeline.entities.EventFieldType.object.STRING)
                    tmp$3 = value;
                  else if (tmp$1 === _.hu.nevermind.timeline.entities.EventFieldType.object.TEXTAREA)
                    tmp$3 = value;
                  else if (tmp$1 === _.hu.nevermind.timeline.entities.EventFieldType.object.SELECT)
                    tmp$3 = value;
                  var extractedValue = tmp$3;
                  field.fieldValue = extractedValue;
                  return field;
                };
              },
              f_16: function (eventForm, format, this$EventGridRow) {
                return function () {
                  var tmp$0, tmp$1;
                  var dateValue = eventForm.dateRef.getDOMNode().value;
                  var date = _.net.yested.utils.Moment.object.parse_puj7f4$(dateValue, format.toString());
                  tmp$0 = Kotlin.modules['stdlib'].kotlin.map_m3yiqg$(eventForm.fieldRefs, _.hu.nevermind.reakt.example.EventGridRow.f_14);
                  tmp$1 = Kotlin.modules['stdlib'].kotlin.mapIndexed_v62v4j$(tmp$0, _.hu.nevermind.reakt.example.EventGridRow.f_15(this$EventGridRow));
                  var modifiedFields = tmp$1;
                  this$EventGridRow.event.date = date;
                  _.hu.nevermind.timeline.Actions.editEvent.dispatch_za3rmp$(new _.hu.nevermind.timeline.EditEvent(this$EventGridRow.event, modifiedFields));
                };
              },
              f_17: function () {
                this.plus_pdl1w0$('Save');
              },
              f_18: function (eventForm, format, this$EventGridRow) {
                return function () {
                  var onClick = _.hu.nevermind.reakt.example.EventGridRow.f_16(eventForm, format, this$EventGridRow);
                  this.plus_oclkc7$(_.hu.nevermind.reakt.button_tqynw0$(_.hu.nevermind.reakt.ButtonType.object.BUTTON, [Kotlin.modules['stdlib'].kotlin.to_l1ob02$('className', 'btn btn-success btn-xs'), Kotlin.modules['stdlib'].kotlin.to_l1ob02$('onClick', onClick)], _.hu.nevermind.reakt.example.EventGridRow.f_17));
                };
              },
              f_19: function () {
                return false;
              },
              f_20: function (this$EventGridRow) {
                return function () {
                  this$EventGridRow.changeState_un3fny$(_.hu.nevermind.reakt.example.EventGridRow.f_19);
                };
              },
              f_21: function () {
                this.plus_pdl1w0$('Cancel');
              },
              f_22: function (this$EventGridRow) {
                return function () {
                  var onClick = _.hu.nevermind.reakt.example.EventGridRow.f_20(this$EventGridRow);
                  this.plus_oclkc7$(_.hu.nevermind.reakt.button_tqynw0$(_.hu.nevermind.reakt.ButtonType.object.BUTTON, [Kotlin.modules['stdlib'].kotlin.to_l1ob02$('className', 'btn btn-warning btn-xs'), Kotlin.modules['stdlib'].kotlin.to_l1ob02$('onClick', onClick)], _.hu.nevermind.reakt.example.EventGridRow.f_21));
                };
              },
              f_23: function (eventForm, format, this$EventGridRow) {
                return function () {
                  this.plus_oclkc7$(_.hu.nevermind.reakt.div_3topnc$([Kotlin.modules['stdlib'].kotlin.to_l1ob02$('className', 'col-md-1')], _.hu.nevermind.reakt.example.EventGridRow.f_18(eventForm, format, this$EventGridRow)));
                  this.plus_oclkc7$(_.hu.nevermind.reakt.div_3topnc$([Kotlin.modules['stdlib'].kotlin.to_l1ob02$('className', 'col-md-1')], _.hu.nevermind.reakt.example.EventGridRow.f_22(this$EventGridRow)));
                };
              },
              render$f_2: function (this$EventGridRow, format) {
                return function () {
                  var eventForm = new _.hu.nevermind.reakt.example.EventForm(this$EventGridRow.event, this$EventGridRow.storeState, []);
                  this.plus_oclkc7$(_.hu.nevermind.reakt.td_3topnc$([Kotlin.modules['stdlib'].kotlin.to_l1ob02$('colSpan', 4)], _.hu.nevermind.reakt.example.EventGridRow.f_13(eventForm)));
                  this.plus_oclkc7$(_.hu.nevermind.reakt.td_3topnc$([Kotlin.modules['stdlib'].kotlin.to_l1ob02$('className', 'col-md-3')], _.hu.nevermind.reakt.example.EventGridRow.f_23(eventForm, format, this$EventGridRow)));
                };
              }
            }),
            EventGrid: Kotlin.createClass(function () {
              return [_.hu.nevermind.reakt.ReactClass];
            }, function $fun(storeState, appState, props, body) {
              if (body === void 0)
                body = _.hu.nevermind.reakt.example.EventGrid.EventGrid$f;
              $fun.baseInitializer.call(this, props, body);
              this.storeState = storeState;
              this.appState = appState;
            }, /** @lends _.hu.nevermind.reakt.example.EventGrid.prototype */ {
              render: function () {
                return _.hu.nevermind.reakt.table_3topnc$([Kotlin.modules['stdlib'].kotlin.to_l1ob02$('className', 'table table-striped table-bordered table-hover')], _.hu.nevermind.reakt.example.EventGrid.render$f(this));
              }
            }, /** @lends _.hu.nevermind.reakt.example.EventGrid */ {
              EventGrid$f: function () {
              },
              f: function () {
                this.plus_pdl1w0$('Date');
              },
              f_0: function () {
                this.plus_pdl1w0$('Name');
              },
              f_1: function () {
                this.plus_pdl1w0$('Value name');
              },
              f_2: function () {
                this.plus_pdl1w0$('Value');
              },
              f_3: function () {
                this.plus_pdl1w0$('');
              },
              f_4: function () {
                this.plus_oclkc7$(_.hu.nevermind.reakt.th_3topnc$([Kotlin.modules['stdlib'].kotlin.to_l1ob02$('className', 'col-md-2')], _.hu.nevermind.reakt.example.EventGrid.f));
                this.plus_oclkc7$(_.hu.nevermind.reakt.th_3topnc$([Kotlin.modules['stdlib'].kotlin.to_l1ob02$('className', 'col-md-1')], _.hu.nevermind.reakt.example.EventGrid.f_0));
                this.plus_oclkc7$(_.hu.nevermind.reakt.th_3topnc$([Kotlin.modules['stdlib'].kotlin.to_l1ob02$('className', 'col-md-1')], _.hu.nevermind.reakt.example.EventGrid.f_1));
                this.plus_oclkc7$(_.hu.nevermind.reakt.th_3topnc$([Kotlin.modules['stdlib'].kotlin.to_l1ob02$('className', 'col-md-3')], _.hu.nevermind.reakt.example.EventGrid.f_2));
                this.plus_oclkc7$(_.hu.nevermind.reakt.th_3topnc$([Kotlin.modules['stdlib'].kotlin.to_l1ob02$('className', 'col-md-3')], _.hu.nevermind.reakt.example.EventGrid.f_3));
              },
              f_5: function (this$EventGrid) {
                return function (it) {
                  return this$EventGrid.appState.filteringTemplateIds.contains_za3rmp$(it.templateId);
                };
              },
              f_6: function (it) {
                return it.date.millisecondsSinceUnixEpoch;
              },
              f_7: function (this$EventGrid, this$) {
                return function (it) {
                  this$.plus_zhpcab$(new _.hu.nevermind.reakt.example.EventGridRow(it, this$EventGrid.storeState, []));
                };
              },
              f_8: function (this$EventGrid) {
                return function () {
                  var tmp$0, tmp$1, tmp$2;
                  this.plus_oclkc7$(_.hu.nevermind.reakt.tr_3topnc$([], _.hu.nevermind.reakt.example.EventGrid.f_4));
                  if (this$EventGrid.appState.filteringTemplateIds.isEmpty()) {
                    tmp$1 = this$EventGrid.storeState.events;
                  }
                   else {
                    tmp$0 = Kotlin.modules['stdlib'].kotlin.filter_azvtw4$(this$EventGrid.storeState.events, _.hu.nevermind.reakt.example.EventGrid.f_5(this$EventGrid));
                    tmp$1 = tmp$0;
                  }
                  tmp$2 = Kotlin.modules['stdlib'].kotlin.sortBy_cvgzri$(tmp$1, _.hu.nevermind.reakt.example.EventGrid.f_6);
                  Kotlin.modules['stdlib'].kotlin.forEach_p7e0bo$(Kotlin.modules['stdlib'].kotlin.reverse_ir3nkc$(tmp$2), _.hu.nevermind.reakt.example.EventGrid.f_7(this$EventGrid, this));
                };
              },
              render$f: function (this$EventGrid) {
                return function () {
                  this.plus_oclkc7$(_.hu.nevermind.reakt.thead_3topnc$([], _.hu.nevermind.reakt.example.EventGrid.f_8(this$EventGrid)));
                };
              }
            }),
            TimelineStoreState: Kotlin.createClass(null, function (events, templates, eventFields, EventTemplateField) {
              if (events === void 0)
                events = Kotlin.modules['stdlib'].kotlin.emptyList();
              if (templates === void 0)
                templates = Kotlin.modules['stdlib'].kotlin.emptyMap();
              if (eventFields === void 0)
                eventFields = Kotlin.modules['stdlib'].kotlin.emptyMap();
              if (EventTemplateField === void 0)
                EventTemplateField = Kotlin.modules['stdlib'].kotlin.emptyMap();
              this.events = events;
              this.templates = templates;
              this.eventFields = eventFields;
              this.EventTemplateField = EventTemplateField;
            }, /** @lends _.hu.nevermind.reakt.example.TimelineStoreState.prototype */ {
              component1: function () {
                return this.events;
              },
              component2: function () {
                return this.templates;
              },
              component3: function () {
                return this.eventFields;
              },
              component4: function () {
                return this.EventTemplateField;
              },
              copy: function (events, templates, eventFields, EventTemplateField) {
                return new _.hu.nevermind.reakt.example.TimelineStoreState(events === void 0 ? this.events : events, templates === void 0 ? this.templates : templates, eventFields === void 0 ? this.eventFields : eventFields, EventTemplateField === void 0 ? this.EventTemplateField : EventTemplateField);
              },
              toString: function () {
                return 'TimelineStoreState(events=' + Kotlin.toString(this.events) + (', templates=' + Kotlin.toString(this.templates)) + (', eventFields=' + Kotlin.toString(this.eventFields)) + (', EventTemplateField=' + Kotlin.toString(this.EventTemplateField)) + ')';
              },
              hashCode: function () {
                var result = 0;
                result = result * 31 + Kotlin.hashCode(this.events) | 0;
                result = result * 31 + Kotlin.hashCode(this.templates) | 0;
                result = result * 31 + Kotlin.hashCode(this.eventFields) | 0;
                result = result * 31 + Kotlin.hashCode(this.EventTemplateField) | 0;
                return result;
              },
              equals_za3rmp$: function (other) {
                return this === other || (other !== null && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.events, other.events) && Kotlin.equals(this.templates, other.templates) && Kotlin.equals(this.eventFields, other.eventFields) && Kotlin.equals(this.EventTemplateField, other.EventTemplateField))));
              }
            }),
            TimelineAppState: Kotlin.createClass(null, function (filteringTemplateIds) {
              this.filteringTemplateIds = filteringTemplateIds;
            }, /** @lends _.hu.nevermind.reakt.example.TimelineAppState.prototype */ {
              component1: function () {
                return this.filteringTemplateIds;
              },
              copy: function (filteringTemplateIds) {
                return new _.hu.nevermind.reakt.example.TimelineAppState(filteringTemplateIds === void 0 ? this.filteringTemplateIds : filteringTemplateIds);
              },
              toString: function () {
                return 'TimelineAppState(filteringTemplateIds=' + Kotlin.toString(this.filteringTemplateIds) + ')';
              },
              hashCode: function () {
                var result = 0;
                result = result * 31 + Kotlin.hashCode(this.filteringTemplateIds) | 0;
                return result;
              },
              equals_za3rmp$: function (other) {
                return this === other || (other !== null && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && Kotlin.equals(this.filteringTemplateIds, other.filteringTemplateIds)));
              }
            }),
            TimelineApp: Kotlin.createClass(function () {
              return [_.hu.nevermind.reakt.StatefulReactClass];
            }, function $fun(storeState, props, body) {
              if (body === void 0)
                body = _.hu.nevermind.reakt.example.TimelineApp.TimelineApp$f_1;
              $fun.baseInitializer.call(this, props, body);
              this.storeState = storeState;
              this.newFieldRef = this.ref_61zpoe$('newField');
              this.handleCommentSubmit = _.hu.nevermind.reakt.example.TimelineApp.TimelineApp$f;
              this.handleNewTodoKeyDown = _.hu.nevermind.reakt.example.TimelineApp.TimelineApp$f_0;
            }, /** @lends _.hu.nevermind.reakt.example.TimelineApp.prototype */ {
              getInitialState: function () {
                return new _.hu.nevermind.reakt.example.TimelineAppState(Kotlin.modules['stdlib'].kotlin.emptyList());
              },
              componentDidMount: function () {
                _.hu.nevermind.timeline.store.EventStore.addChangeListener_qshda6$(_.hu.nevermind.reakt.example.TimelineApp.componentDidMount$f(this));
              },
              render: function () {
                return _.hu.nevermind.reakt.div_3topnc$([Kotlin.modules['stdlib'].kotlin.to_l1ob02$('className', 'commentBox')], _.hu.nevermind.reakt.example.TimelineApp.render$f(this));
              }
            }, /** @lends _.hu.nevermind.reakt.example.TimelineApp */ {
              TimelineApp$f: function (author, text) {
              },
              TimelineApp$f_0: function (event) {
                if (event.which === 13) {
                  event.preventDefault();
                }
              },
              TimelineApp$f_1: function () {
              },
              componentDidMount$f: function (this$TimelineApp) {
                return function () {
                  this$TimelineApp.storeState = new _.hu.nevermind.reakt.example.TimelineStoreState(_.hu.nevermind.timeline.store.EventStore.getEvents(), _.hu.nevermind.timeline.store.TemplateStore.getTemplates(), _.hu.nevermind.timeline.store.EventFieldStore.getFields());
                  this$TimelineApp.forceUpdate();
                };
              },
              f: function () {
                this.plus_pdl1w0$('Events');
              },
              render$f: function (this$TimelineApp) {
                return function () {
                  this.plus_oclkc7$(_.hu.nevermind.reakt.h1_3topnc$(void 0, _.hu.nevermind.reakt.example.TimelineApp.f));
                  this.plus_zhpcab$(new _.hu.nevermind.reakt.example.AddEventDropDownButton(this$TimelineApp.storeState, []));
                  this.plus_zhpcab$(new _.hu.nevermind.reakt.example.EventFilter(this$TimelineApp.storeState, []));
                  this.plus_zhpcab$(new _.hu.nevermind.reakt.example.EventGrid(this$TimelineApp.storeState, this$TimelineApp.state, []));
                };
              }
            }),
            main_kand9s$: function (args) {
              var tmp$0;
              if (!window.location.href.endsWith('?test')) {
                _.hu.nevermind.timeline.client.username = (tmp$0 = localStorage.getItem('username')) != null ? tmp$0 : '';
                if (Kotlin.equals(_.hu.nevermind.timeline.client.username, '')) {
                  var tmpUser = '';
                  tmpUser = prompt('Please enter your name');
                  _.hu.nevermind.timeline.client.username = tmpUser;
                  localStorage.setItem('username', _.hu.nevermind.timeline.client.username);
                }
                _.net.yested.utils.Moment.object.setLocale('hu');
                _.hu.nevermind.reakt.React.object.render_40g7my$((new _.hu.nevermind.reakt.example.TimelineApp(new _.hu.nevermind.reakt.example.TimelineStoreState(), [])).createElement(), document.getElementById('timelineApp'));
                _.hu.nevermind.reakt.example.queryEntitiesFromServer();
              }
            },
            queryEntitiesFromServer$f: function (template) {
              return _.hu.nevermind.timeline.entities.EventTemplate.object.fromJson_za3rmp$(template);
            },
            queryEntitiesFromServer$f_0: function (event) {
              return _.hu.nevermind.timeline.entities.EventInstance.object.fromJson_za3rmp$(event);
            },
            f: function (field) {
              return _.hu.nevermind.timeline.entities.EventField.object.fromJson_6gt5xa$(field);
            },
            queryEntitiesFromServer$f_1: function (event) {
              var tmp$0, tmp$1;
              tmp$1 = Kotlin.modules['stdlib'].kotlin.map_rie7ol$((tmp$0 = event.fields) != null ? tmp$0 : Kotlin.throwNPE(), _.hu.nevermind.reakt.example.f);
              return tmp$1;
            },
            queryEntitiesFromServer$f_2: function (it) {
              return it;
            },
            f_0: function (field) {
              return _.hu.nevermind.timeline.entities.EventTemplateField.object.fromJson(field);
            },
            queryEntitiesFromServer$f_3: function (event) {
              var tmp$0, tmp$1;
              tmp$1 = Kotlin.modules['stdlib'].kotlin.map_rie7ol$((tmp$0 = event.fields) != null ? tmp$0 : Kotlin.throwNPE(), _.hu.nevermind.reakt.example.f_0);
              return tmp$1;
            },
            queryEntitiesFromServer$f_4: function (it) {
              return it;
            },
            queryEntitiesFromServer: function () {
              var tmp$0, tmp$1, tmp$2, tmp$3, tmp$4;
              var templates = Kotlin.modules['stdlib'].kotlin.arrayListOf_9mqe4v$([]);
              var events = Kotlin.modules['stdlib'].kotlin.arrayListOf_9mqe4v$([]);
              var eventFields = Kotlin.modules['stdlib'].kotlin.arrayListOf_9mqe4v$([]);
              var templateFields = Kotlin.modules['stdlib'].kotlin.arrayListOf_9mqe4v$([]);
              var result = JSON.parse('{"events":[{"id":223,"millisecsFrom1970":1422748800000,"name":"T\xF6meg","templateId":9,"fields":[{"id":315,"type":"FLOAT","name":"t\xF6meg (kg)","templateFieldId":1,"floatValue":77.2,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":75,"millisecsFrom1970":1420934400000,"name":"T\xF6meg","templateId":9,"fields":[{"id":269,"type":"FLOAT","name":"t\xF6meg (kg)","templateFieldId":1,"floatValue":78.2,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":78,"millisecsFrom1970":1421020800000,"name":"T\xF6meg","templateId":9,"fields":[{"id":272,"type":"FLOAT","name":"t\xF6meg (kg)","templateFieldId":1,"floatValue":78.5,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":80,"millisecsFrom1970":1421107200000,"name":"T\xF6meg","templateId":9,"fields":[{"id":275,"type":"FLOAT","name":"t\xF6meg (kg)","templateFieldId":1,"floatValue":78.5,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":82,"millisecsFrom1970":1421193600000,"name":"T\xF6meg","templateId":9,"fields":[{"id":180,"type":"FLOAT","name":"t\xF6meg (kg)","templateFieldId":1,"floatValue":77.8,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":242,"millisecsFrom1970":1423612800000,"name":"\xC9tel","templateId":18,"fields":[{"id":335,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"k\xF6les,joghurt,z\xF6lds\xE9g,csirke,m\xE1j,alma,ban\xE1n"}]},{"id":243,"millisecsFrom1970":1423612800000,"name":"Szelek","templateId":23,"fields":[{"id":336,"type":"SELECT","name":"t\xEDpus","templateFieldId":21,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"zavar\xF3"}]},{"id":246,"millisecsFrom1970":1423699200000,"name":"Sz\xE9klet","templateId":17,"fields":[{"id":339,"type":"SELECT","name":"milyen?","templateFieldId":15,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"ok"}]},{"id":224,"millisecsFrom1970":1423353600000,"name":"T\xF6meg","templateId":9,"fields":[{"id":316,"type":"FLOAT","name":"t\xF6meg (kg)","templateFieldId":1,"floatValue":77.1,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":245,"millisecsFrom1970":1423612800000,"name":"Sz\xE9klet","templateId":17,"fields":[{"id":338,"type":"SELECT","name":"milyen?","templateFieldId":15,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"ok"}]},{"id":248,"millisecsFrom1970":1423699200000,"name":"\xC9tel","templateId":18,"fields":[{"id":341,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"alma"},{"id":342,"type":"INT","name":"mennyit? (g)","templateFieldId":0,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null}]},{"id":249,"millisecsFrom1970":1423699200000,"name":"\xC9tel","templateId":18,"fields":[{"id":343,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"ban\xE1n"},{"id":344,"type":"INT","name":"mennyit? (g)","templateFieldId":0,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null}]},{"id":586,"millisecsFrom1970":1423958400000,"name":"Sz\xE9klet","templateId":17,"fields":[{"id":1307,"type":"SELECT","name":"milyen?","templateFieldId":15,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"nehezen"}]},{"id":589,"millisecsFrom1970":1424044800000,"name":"\xC9tel","templateId":18,"fields":[{"id":1310,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"zab(80g) aszalv\xE1nyok(30g) di\xF3(2) mandula(4) mogyor\xF3(4) m\xE9z(1tk)"},{"id":1311,"type":"INT","name":"mennyit? (g)","templateFieldId":24,"floatValue":null,"intValue":0,"boolValue":null,"stringValue":null}]},{"id":218,"millisecsFrom1970":1422662400000,"name":"T\xF6meg","templateId":9,"fields":[{"id":288,"type":"FLOAT","name":"t\xF6meg (kg)","templateFieldId":1,"floatValue":76.8,"intValue":86,"boolValue":null,"stringValue":null}]},{"id":590,"millisecsFrom1970":1424044800000,"name":"\xC9tel","templateId":18,"fields":[{"id":1312,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"hajdina(200g) kelbi(100g) savany\xFAs\xE1g(50g) m\xE1j(100g) olivaolaj(1tk) t\xF6kmagolaj(1tk) lenmagolaj(1tk)"},{"id":1313,"type":"INT","name":"mennyit? (g)","templateFieldId":24,"floatValue":null,"intValue":0,"boolValue":null,"stringValue":null}]},{"id":591,"millisecsFrom1970":1424044800000,"name":"\xC9tel","templateId":18,"fields":[{"id":1314,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"rizs(200g) kelbi(100g) savany\xFAs\xE1g(50g) m\xE1j(100g) olivaolaj(1tk) t\xF6kmagolaj(1tk) lenmagolaj(1tk)"},{"id":1315,"type":"INT","name":"mennyit? (g)","templateFieldId":24,"floatValue":null,"intValue":0,"boolValue":null,"stringValue":null}]},{"id":592,"millisecsFrom1970":1424044800000,"name":"Szex","templateId":20,"fields":[{"id":1316,"type":"SELECT","name":"hossz","templateFieldId":18,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"\xE1tlag"},{"id":1317,"type":"SELECT","name":"kem\xE9nys\xE9g","templateFieldId":19,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"gyenge"}]},{"id":593,"millisecsFrom1970":1424044800000,"name":"Sz\xE9klet","templateId":17,"fields":[{"id":1318,"type":"SELECT","name":"milyen?","templateFieldId":15,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"ok"}]},{"id":594,"millisecsFrom1970":1424044800000,"name":"Sz\xE9klet","templateId":17,"fields":[{"id":1319,"type":"SELECT","name":"milyen?","templateFieldId":15,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"ok"}]},{"id":598,"millisecsFrom1970":1423440000000,"name":"Karny\xFAjt\xE1s csig\xE1n","templateId":37,"fields":[{"id":1324,"type":"INT","name":"ism\xE9tl\xE9s","templateFieldId":54,"floatValue":null,"intValue":7,"boolValue":null,"stringValue":null},{"id":1325,"type":"INT","name":"sorozat","templateFieldId":55,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null},{"id":1326,"type":"INT","name":"s\xFAly","templateFieldId":56,"floatValue":null,"intValue":15,"boolValue":null,"stringValue":null}]},{"id":605,"millisecsFrom1970":1424131200000,"name":"T\xF6meg","templateId":9,"fields":[{"id":1344,"type":"FLOAT","name":"t\xF6meg (kg)","templateFieldId":1,"floatValue":76.8,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":609,"millisecsFrom1970":1424242800000,"name":"\xC9tel","templateId":18,"fields":[{"id":1351,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"rizs(100g) kelbi(100g) savany\xFAs\xE1g(50g) diszno(100g) olivaolaj(1tk) t\xF6kmagolaj(1tk) lenmagolaj(1tk)"},{"id":1352,"type":"INT","name":"mennyit? (g)","templateFieldId":24,"floatValue":null,"intValue":0,"boolValue":null,"stringValue":null}]},{"id":611,"millisecsFrom1970":1424250000000,"name":"Sz\xE9klet","templateId":17,"fields":[{"id":1355,"type":"SELECT","name":"milyen?","templateFieldId":15,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"ok"}]},{"id":615,"millisecsFrom1970":1424413800000,"name":"T\xF6meg","templateId":9,"fields":[{"id":1359,"type":"FLOAT","name":"t\xF6meg (kg)","templateFieldId":1,"floatValue":76.2,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":616,"millisecsFrom1970":1424327400000,"name":"T\xF6meg","templateId":9,"fields":[{"id":1360,"type":"FLOAT","name":"t\xF6meg (kg)","templateFieldId":1,"floatValue":78.0,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":617,"millisecsFrom1970":1424520000000,"name":"T\xF6meg","templateId":9,"fields":[{"id":1361,"type":"FLOAT","name":"t\xF6meg (kg)","templateFieldId":1,"floatValue":76.1,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":652,"millisecsFrom1970":1424905200000,"name":"Szex","templateId":20,"fields":[{"id":1404,"type":"SELECT","name":"hossz","templateFieldId":18,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"\xE1tlag"},{"id":1405,"type":"SELECT","name":"kem\xE9nys\xE9g","templateFieldId":19,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"\xE1tlag"}]},{"id":631,"millisecsFrom1970":1424347200000,"name":"Sz\xE9klet","templateId":17,"fields":[{"id":1375,"type":"SELECT","name":"milyen?","templateFieldId":15,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"ok"}]},{"id":633,"millisecsFrom1970":1424433600000,"name":"Alkohol","templateId":21,"fields":[{"id":1377,"type":"INT","name":"mennyit?","templateFieldId":20,"floatValue":null,"intValue":2,"boolValue":null,"stringValue":null}]},{"id":634,"millisecsFrom1970":1424606400000,"name":"T\xF6meg","templateId":9,"fields":[{"id":1378,"type":"FLOAT","name":"t\xF6meg (kg)","templateFieldId":1,"floatValue":77.2,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":635,"millisecsFrom1970":1424698800000,"name":"Sz\xE9klet","templateId":17,"fields":[{"id":1379,"type":"SELECT","name":"milyen?","templateFieldId":15,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"fekete"}]},{"id":637,"millisecsFrom1970":1424770500000,"name":"Sz\xE9klet","templateId":17,"fields":[{"id":1381,"type":"SELECT","name":"milyen?","templateFieldId":15,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"ok"}]},{"id":643,"millisecsFrom1970":1424865600000,"name":"T\xF6meg","templateId":9,"fields":[{"id":1387,"type":"FLOAT","name":"t\xF6meg (kg)","templateFieldId":1,"floatValue":77.4,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":644,"millisecsFrom1970":1424757600000,"name":"\xC9tel","templateId":18,"fields":[{"id":1388,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"zab(100g),feh\xE9rje(50g),alma,ban\xE1n,aszalv\xE1ny,kefir,tej"},{"id":1389,"type":"INT","name":"mennyit? (g)","templateFieldId":24,"floatValue":null,"intValue":0,"boolValue":null,"stringValue":null}]},{"id":645,"millisecsFrom1970":1424844000000,"name":"\xC9tel","templateId":18,"fields":[{"id":1390,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"zab(100g),feh\xE9rje(50g),alma,ban\xE1n,aszalv\xE1ny,kefir,tej"},{"id":1391,"type":"INT","name":"mennyit? (g)","templateFieldId":24,"floatValue":null,"intValue":0,"boolValue":null,"stringValue":null}]},{"id":646,"millisecsFrom1970":1424773800000,"name":"\xC9tel","templateId":18,"fields":[{"id":1392,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"csirke,m\xE1j(50+50g), r\xEDzs( sz\xE1razon 100g), savany\xFA (50g),oliva,t\xF6kmag,lenmag(1 ek)"},{"id":1393,"type":"INT","name":"mennyit? (g)","templateFieldId":24,"floatValue":null,"intValue":0,"boolValue":null,"stringValue":null}]},{"id":647,"millisecsFrom1970":1424790000000,"name":"\xC9tel","templateId":18,"fields":[{"id":1394,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"csirke,m\xE1j(50+50g), r\xEDzs( sz\xE1razon 100g), savany\xFA (50g),oliva,t\xF6kmag,lenmag(1 ek)"},{"id":1395,"type":"INT","name":"mennyit? (g)","templateFieldId":24,"floatValue":null,"intValue":0,"boolValue":null,"stringValue":null}]},{"id":648,"millisecsFrom1970":1424806200000,"name":"\xC9tel","templateId":18,"fields":[{"id":1396,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"t\xF6kf\u0151zel\xE9k mamit\xF3l, pulykah\xFAs, kefir"},{"id":1397,"type":"INT","name":"mennyit? (g)","templateFieldId":24,"floatValue":null,"intValue":0,"boolValue":null,"stringValue":null}]},{"id":653,"millisecsFrom1970":1424878200000,"name":"Sz\xE9klet","templateId":17,"fields":[{"id":1406,"type":"SELECT","name":"milyen?","templateFieldId":15,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"ok"}]},{"id":654,"millisecsFrom1970":1424933160000,"name":"Sz\xE9klet","templateId":17,"fields":[{"id":1407,"type":"SELECT","name":"milyen?","templateFieldId":15,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"ok"}]},{"id":655,"millisecsFrom1970":1424952000000,"name":"T\xF6meg","templateId":9,"fields":[{"id":1408,"type":"FLOAT","name":"t\xF6meg (kg)","templateFieldId":1,"floatValue":76.9,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":657,"millisecsFrom1970":1424930400000,"name":"\xC9tel","templateId":18,"fields":[{"id":1411,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"zab(100g),feh\xE9rje(50g),alma,ban\xE1n,aszalv\xE1ny,kefir,v\xEDz"},{"id":1412,"type":"INT","name":"mennyit? (g)","templateFieldId":24,"floatValue":null,"intValue":0,"boolValue":null,"stringValue":null}]},{"id":656,"millisecsFrom1970":1424946600000,"name":"\xC9tel","templateId":18,"fields":[{"id":1409,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"csirke,m\xE1j(50+50g), r\xEDzs( f\u0151zve 200g), 1 oldal paprika, 1 gyufa uborka, 1 db retek, 1 paradicsom,oliva,t\xF6kmag,lenmag,halolaj(1 ek), 50g savany\xFAk\xE1poszta"},{"id":1410,"type":"INT","name":"mennyit? (g)","templateFieldId":24,"floatValue":null,"intValue":0,"boolValue":null,"stringValue":null}]},{"id":658,"millisecsFrom1970":1424962800000,"name":"\xC9tel","templateId":18,"fields":[{"id":1413,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"csirke,m\xE1j(50+50g), r\xEDzs( f\u0151zve 200g), 1 oldal paprika, 1 gyufa uborka, 1 db retek, 1 paradicsom,oliva,t\xF6kmag,lenmag,halolaj(1 ek), 50g savany\xFAk\xE1poszta"},{"id":1414,"type":"INT","name":"mennyit? (g)","templateFieldId":24,"floatValue":null,"intValue":0,"boolValue":null,"stringValue":null}]},{"id":667,"millisecsFrom1970":1425020100000,"name":"Sz\xE9klet","templateId":17,"fields":[{"id":1427,"type":"SELECT","name":"milyen?","templateFieldId":15,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"ok"}]},{"id":687,"millisecsFrom1970":1425124800000,"name":"T\xF6meg","templateId":9,"fields":[{"id":1447,"type":"FLOAT","name":"t\xF6meg (kg)","templateFieldId":1,"floatValue":76.1,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":650,"millisecsFrom1970":1424876400000,"name":"\xC9tel","templateId":18,"fields":[{"id":1400,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"csirke,m\xE1j(50+50g), r\xEDzs( f\u0151zve 200g), 1 oldal paprika, 1 gyufa uborka, 1 db retek, 1 paradicsom,oliva,t\xF6kmag,lenmag(1 ek)"},{"id":1401,"type":"INT","name":"mennyit? (g)","templateFieldId":24,"floatValue":null,"intValue":0,"boolValue":null,"stringValue":null}]},{"id":649,"millisecsFrom1970":1424860200000,"name":"\xC9tel","templateId":18,"fields":[{"id":1399,"type":"INT","name":"mennyit? (g)","templateFieldId":24,"floatValue":null,"intValue":0,"boolValue":null,"stringValue":null},{"id":1398,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"csirke,m\xE1j(50+50g), r\xEDzs( f\u0151zve 200g), 1 oldal paprika, 1 gyufa uborka, 1 db retek, 1 paradicsom,oliva,t\xF6kmag,lenmag(1 ek)"}]},{"id":250,"millisecsFrom1970":1423699200000,"name":"\xC9tel","templateId":18,"fields":[{"id":345,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"zab"},{"id":346,"type":"INT","name":"mennyit? (g)","templateFieldId":24,"floatValue":null,"intValue":100,"boolValue":null,"stringValue":null}]},{"id":251,"millisecsFrom1970":1423699200000,"name":"\xC9tel","templateId":18,"fields":[{"id":347,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"aszalt gy\xFCm\xF6lcs\xF6k"},{"id":348,"type":"INT","name":"mennyit? (g)","templateFieldId":24,"floatValue":null,"intValue":10,"boolValue":null,"stringValue":null}]},{"id":531,"millisecsFrom1970":1423785600000,"name":"T\xF6meg","templateId":9,"fields":[{"id":1158,"type":"FLOAT","name":"t\xF6meg (kg)","templateFieldId":1,"floatValue":76.3,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":532,"millisecsFrom1970":1423785600000,"name":"Szex","templateId":20,"fields":[{"id":1159,"type":"SELECT","name":"hossz","templateFieldId":18,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"\xE1tlag"},{"id":1160,"type":"SELECT","name":"kem\xE9nys\xE9g","templateFieldId":19,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"\xE1tlag"}]},{"id":533,"millisecsFrom1970":1423785600000,"name":"Sz\xE9klet","templateId":17,"fields":[{"id":1161,"type":"SELECT","name":"milyen?","templateFieldId":15,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"nehezen"}]},{"id":534,"millisecsFrom1970":1423785600000,"name":"\xC9tel","templateId":18,"fields":[{"id":1162,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"alma"},{"id":1163,"type":"INT","name":"mennyit? (g)","templateFieldId":24,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null}]},{"id":535,"millisecsFrom1970":1423785600000,"name":"\xC9tel","templateId":18,"fields":[{"id":1164,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"ban\xE1n"},{"id":1165,"type":"INT","name":"mennyit? (g)","templateFieldId":24,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null}]},{"id":536,"millisecsFrom1970":1423785600000,"name":"\xC9tel","templateId":18,"fields":[{"id":1166,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"zab"},{"id":1167,"type":"INT","name":"mennyit? (g)","templateFieldId":24,"floatValue":null,"intValue":100,"boolValue":null,"stringValue":null}]},{"id":537,"millisecsFrom1970":1423785600000,"name":"\xC9tel","templateId":18,"fields":[{"id":1168,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"aszalv\xE1nyok"},{"id":1169,"type":"INT","name":"mennyit? (g)","templateFieldId":24,"floatValue":null,"intValue":20,"boolValue":null,"stringValue":null}]},{"id":538,"millisecsFrom1970":1423785600000,"name":"Szelek","templateId":23,"fields":[{"id":1170,"type":"SELECT","name":"t\xEDpus","templateFieldId":21,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"enyhe"}]},{"id":539,"millisecsFrom1970":1423785600000,"name":"\xC9tel","templateId":18,"fields":[{"id":1171,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"rizs"},{"id":1172,"type":"INT","name":"mennyit? (g)","templateFieldId":24,"floatValue":null,"intValue":100,"boolValue":null,"stringValue":null}]},{"id":540,"millisecsFrom1970":1423785600000,"name":"\xC9tel","templateId":18,"fields":[{"id":1173,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"afrikai harcsa"},{"id":1174,"type":"INT","name":"mennyit? (g)","templateFieldId":24,"floatValue":null,"intValue":150,"boolValue":null,"stringValue":null}]},{"id":541,"millisecsFrom1970":1423785600000,"name":"\xC9tel","templateId":18,"fields":[{"id":1175,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"z\xF6lds\xE9gek"},{"id":1176,"type":"INT","name":"mennyit? (g)","templateFieldId":24,"floatValue":null,"intValue":50,"boolValue":null,"stringValue":null}]},{"id":543,"millisecsFrom1970":1422316800000,"name":"L\xE1btol\xE1s","templateId":11,"fields":[{"id":1178,"type":"INT","name":"ism\xE9tl\xE9s","templateFieldId":7,"floatValue":null,"intValue":10,"boolValue":null,"stringValue":null},{"id":1179,"type":"INT","name":"sorozat","templateFieldId":6,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null},{"id":1180,"type":"INT","name":"s\xFAly","templateFieldId":5,"floatValue":null,"intValue":50,"boolValue":null,"stringValue":null}]},{"id":544,"millisecsFrom1970":1420243200000,"name":"L\xE1btol\xE1s","templateId":11,"fields":[{"id":1181,"type":"INT","name":"ism\xE9tl\xE9s","templateFieldId":7,"floatValue":null,"intValue":9,"boolValue":null,"stringValue":null},{"id":1182,"type":"INT","name":"sorozat","templateFieldId":6,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null},{"id":1183,"type":"INT","name":"s\xFAly","templateFieldId":5,"floatValue":null,"intValue":60,"boolValue":null,"stringValue":null}]},{"id":546,"millisecsFrom1970":1421625600000,"name":"Mellb\u0151l nyom\xE1s","templateId":12,"fields":[{"id":1187,"type":"INT","name":"ism\xE9tl\xE9s","templateFieldId":8,"floatValue":null,"intValue":6,"boolValue":null,"stringValue":null},{"id":1188,"type":"INT","name":"t\xE1rcsa","templateFieldId":9,"floatValue":null,"intValue":5,"boolValue":null,"stringValue":null},{"id":1189,"type":"INT","name":"sorozat","templateFieldId":10,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null}]},{"id":547,"millisecsFrom1970":1422057600000,"name":"Mellb\u0151l nyom\xE1s","templateId":12,"fields":[{"id":1190,"type":"INT","name":"ism\xE9tl\xE9s","templateFieldId":8,"floatValue":null,"intValue":4,"boolValue":null,"stringValue":null},{"id":1191,"type":"INT","name":"t\xE1rcsa","templateFieldId":9,"floatValue":null,"intValue":5,"boolValue":null,"stringValue":null},{"id":1192,"type":"INT","name":"sorozat","templateFieldId":10,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null}]},{"id":548,"millisecsFrom1970":1422489600000,"name":"Mellb\u0151l nyom\xE1s","templateId":12,"fields":[{"id":1193,"type":"INT","name":"ism\xE9tl\xE9s","templateFieldId":8,"floatValue":null,"intValue":11,"boolValue":null,"stringValue":null},{"id":1194,"type":"INT","name":"t\xE1rcsa","templateFieldId":9,"floatValue":null,"intValue":5,"boolValue":null,"stringValue":null},{"id":1195,"type":"INT","name":"sorozat","templateFieldId":10,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null}]},{"id":549,"millisecsFrom1970":1422921600000,"name":"Mellb\u0151l nyom\xE1s","templateId":12,"fields":[{"id":1196,"type":"INT","name":"ism\xE9tl\xE9s","templateFieldId":8,"floatValue":null,"intValue":8,"boolValue":null,"stringValue":null},{"id":1197,"type":"INT","name":"t\xE1rcsa","templateFieldId":9,"floatValue":null,"intValue":35,"boolValue":null,"stringValue":null},{"id":1198,"type":"INT","name":"sorozat","templateFieldId":10,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null}]},{"id":550,"millisecsFrom1970":1423440000000,"name":"Mellb\u0151l nyom\xE1s","templateId":12,"fields":[{"id":1199,"type":"INT","name":"ism\xE9tl\xE9s","templateFieldId":8,"floatValue":null,"intValue":8,"boolValue":null,"stringValue":null},{"id":1200,"type":"INT","name":"t\xE1rcsa","templateFieldId":9,"floatValue":null,"intValue":35,"boolValue":null,"stringValue":null},{"id":1201,"type":"INT","name":"sorozat","templateFieldId":10,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null}]},{"id":551,"millisecsFrom1970":1423440000000,"name":"T\xE1rogat\xE1s","templateId":10,"fields":[{"id":1202,"type":"INT","name":"ism\xE9tl\xE9s","templateFieldId":4,"floatValue":null,"intValue":9,"boolValue":null,"stringValue":null},{"id":1203,"type":"INT","name":"t\xE1rcsa","templateFieldId":2,"floatValue":null,"intValue":7,"boolValue":null,"stringValue":null},{"id":1204,"type":"INT","name":"sorozat","templateFieldId":3,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null}]},{"id":552,"millisecsFrom1970":1422921600000,"name":"T\xE1rogat\xE1s","templateId":10,"fields":[{"id":1205,"type":"INT","name":"ism\xE9tl\xE9s","templateFieldId":4,"floatValue":null,"intValue":8,"boolValue":null,"stringValue":null},{"id":1206,"type":"INT","name":"t\xE1rcsa","templateFieldId":2,"floatValue":null,"intValue":7,"boolValue":null,"stringValue":null},{"id":1207,"type":"INT","name":"sorozat","templateFieldId":3,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null}]},{"id":553,"millisecsFrom1970":1422057600000,"name":"T\xE1rogat\xE1s","templateId":10,"fields":[{"id":1208,"type":"INT","name":"ism\xE9tl\xE9s","templateFieldId":4,"floatValue":null,"intValue":16,"boolValue":null,"stringValue":null},{"id":1209,"type":"INT","name":"t\xE1rcsa","templateFieldId":2,"floatValue":null,"intValue":5,"boolValue":null,"stringValue":null},{"id":1210,"type":"INT","name":"sorozat","templateFieldId":3,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null}]},{"id":554,"millisecsFrom1970":1421625600000,"name":"T\xE1rogat\xE1s","templateId":10,"fields":[{"id":1211,"type":"INT","name":"ism\xE9tl\xE9s","templateFieldId":4,"floatValue":null,"intValue":9,"boolValue":null,"stringValue":null},{"id":1212,"type":"INT","name":"t\xE1rcsa","templateFieldId":2,"floatValue":null,"intValue":5,"boolValue":null,"stringValue":null},{"id":1213,"type":"INT","name":"sorozat","templateFieldId":3,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null}]},{"id":555,"millisecsFrom1970":1422489600000,"name":"T\xE1rogat\xE1s","templateId":10,"fields":[{"id":1214,"type":"INT","name":"ism\xE9tl\xE9s","templateFieldId":4,"floatValue":null,"intValue":7,"boolValue":null,"stringValue":null},{"id":1215,"type":"INT","name":"t\xE1rcsa","templateFieldId":2,"floatValue":null,"intValue":7,"boolValue":null,"stringValue":null},{"id":1216,"type":"INT","name":"sorozat","templateFieldId":3,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null}]},{"id":566,"millisecsFrom1970":1423785600000,"name":"L\xE1bhajl\xEDt\xE1s","templateId":29,"fields":[{"id":1247,"type":"INT","name":"ism\xE9tl\xE9s","templateFieldId":30,"floatValue":null,"intValue":6,"boolValue":null,"stringValue":null},{"id":1248,"type":"INT","name":"sorozat","templateFieldId":31,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null},{"id":1249,"type":"INT","name":"s\xFAly","templateFieldId":32,"floatValue":null,"intValue":24,"boolValue":null,"stringValue":null}]},{"id":567,"millisecsFrom1970":1423785600000,"name":"L\xE1btol\xE1s","templateId":11,"fields":[{"id":1250,"type":"INT","name":"ism\xE9tl\xE9s","templateFieldId":36,"floatValue":null,"intValue":10,"boolValue":null,"stringValue":null},{"id":1251,"type":"INT","name":"sorozat","templateFieldId":37,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null},{"id":1252,"type":"INT","name":"s\xFAly","templateFieldId":38,"floatValue":null,"intValue":60,"boolValue":null,"stringValue":null}]},{"id":568,"millisecsFrom1970":1423785600000,"name":"V\xE1dli","templateId":30,"fields":[{"id":1253,"type":"INT","name":"ism\xE9tl\xE9s","templateFieldId":33,"floatValue":null,"intValue":12,"boolValue":null,"stringValue":null},{"id":1254,"type":"INT","name":"sorozat","templateFieldId":34,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null},{"id":1255,"type":"INT","name":"s\xFAly","templateFieldId":35,"floatValue":null,"intValue":170,"boolValue":null,"stringValue":null}]},{"id":569,"millisecsFrom1970":1423785600000,"name":"L\xE1bny\xFAjt\xE1s","templateId":32,"fields":[{"id":1256,"type":"INT","name":"ism\xE9tl\xE9s","templateFieldId":39,"floatValue":null,"intValue":8,"boolValue":null,"stringValue":null},{"id":1257,"type":"INT","name":"sorozat","templateFieldId":40,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null},{"id":1258,"type":"INT","name":"s\xFAly","templateFieldId":41,"floatValue":null,"intValue":25,"boolValue":null,"stringValue":null}]},{"id":570,"millisecsFrom1970":1423785600000,"name":"Der\xE9kg\xE9p","templateId":33,"fields":[{"id":1259,"type":"INT","name":"ism\xE9tl\xE9s","templateFieldId":42,"floatValue":null,"intValue":8,"boolValue":null,"stringValue":null},{"id":1260,"type":"INT","name":"sorozat","templateFieldId":43,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null},{"id":1261,"type":"INT","name":"s\xFAly","templateFieldId":44,"floatValue":null,"intValue":70,"boolValue":null,"stringValue":null}]},{"id":571,"millisecsFrom1970":1423612800000,"name":"Evez\xE9s","templateId":34,"fields":[{"id":1262,"type":"INT","name":"ism\xE9tl\xE9s","templateFieldId":45,"floatValue":null,"intValue":8,"boolValue":null,"stringValue":null},{"id":1263,"type":"INT","name":"t\xE1rcsa","templateFieldId":46,"floatValue":null,"intValue":5,"boolValue":null,"stringValue":null},{"id":1264,"type":"INT","name":"sorozat","templateFieldId":47,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null}]},{"id":572,"millisecsFrom1970":1423094400000,"name":"Evez\xE9s","templateId":34,"fields":[{"id":1265,"type":"INT","name":"ism\xE9tl\xE9s","templateFieldId":45,"floatValue":null,"intValue":9,"boolValue":null,"stringValue":null},{"id":1266,"type":"INT","name":"t\xE1rcsa","templateFieldId":46,"floatValue":null,"intValue":4,"boolValue":null,"stringValue":null},{"id":1267,"type":"INT","name":"sorozat","templateFieldId":47,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null}]},{"id":573,"millisecsFrom1970":1422662400000,"name":"Evez\xE9s","templateId":34,"fields":[{"id":1268,"type":"INT","name":"ism\xE9tl\xE9s","templateFieldId":45,"floatValue":null,"intValue":12,"boolValue":null,"stringValue":null},{"id":1269,"type":"INT","name":"t\xE1rcsa","templateFieldId":46,"floatValue":null,"intValue":4,"boolValue":null,"stringValue":null},{"id":1270,"type":"INT","name":"sorozat","templateFieldId":47,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null}]},{"id":574,"millisecsFrom1970":1422230400000,"name":"Evez\xE9s","templateId":34,"fields":[{"id":1271,"type":"INT","name":"ism\xE9tl\xE9s","templateFieldId":45,"floatValue":null,"intValue":10,"boolValue":null,"stringValue":null},{"id":1272,"type":"INT","name":"t\xE1rcsa","templateFieldId":46,"floatValue":null,"intValue":4,"boolValue":null,"stringValue":null},{"id":1273,"type":"INT","name":"sorozat","templateFieldId":47,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null}]},{"id":575,"millisecsFrom1970":1421798400000,"name":"Evez\xE9s","templateId":34,"fields":[{"id":1274,"type":"INT","name":"ism\xE9tl\xE9s","templateFieldId":45,"floatValue":null,"intValue":6,"boolValue":null,"stringValue":null},{"id":1275,"type":"INT","name":"t\xE1rcsa","templateFieldId":46,"floatValue":null,"intValue":4,"boolValue":null,"stringValue":null},{"id":1276,"type":"INT","name":"sorozat","templateFieldId":47,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null}]},{"id":576,"millisecsFrom1970":1423612800000,"name":"Bicepsz","templateId":35,"fields":[{"id":1277,"type":"INT","name":"ism\xE9tl\xE9s","templateFieldId":48,"floatValue":null,"intValue":6,"boolValue":null,"stringValue":null},{"id":1278,"type":"INT","name":"t\xE1rcsa","templateFieldId":49,"floatValue":null,"intValue":6,"boolValue":null,"stringValue":null},{"id":1279,"type":"INT","name":"sorozat","templateFieldId":50,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null}]},{"id":577,"millisecsFrom1970":1423094400000,"name":"Bicepsz","templateId":35,"fields":[{"id":1280,"type":"INT","name":"ism\xE9tl\xE9s","templateFieldId":48,"floatValue":null,"intValue":8,"boolValue":null,"stringValue":null},{"id":1281,"type":"INT","name":"t\xE1rcsa","templateFieldId":49,"floatValue":null,"intValue":6,"boolValue":null,"stringValue":null},{"id":1282,"type":"INT","name":"sorozat","templateFieldId":50,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null}]},{"id":578,"millisecsFrom1970":1422662400000,"name":"Bicepsz","templateId":35,"fields":[{"id":1283,"type":"INT","name":"ism\xE9tl\xE9s","templateFieldId":48,"floatValue":null,"intValue":6,"boolValue":null,"stringValue":null},{"id":1284,"type":"INT","name":"t\xE1rcsa","templateFieldId":49,"floatValue":null,"intValue":6,"boolValue":null,"stringValue":null},{"id":1285,"type":"INT","name":"sorozat","templateFieldId":50,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null}]},{"id":579,"millisecsFrom1970":1422230400000,"name":"Bicepsz","templateId":35,"fields":[{"id":1286,"type":"INT","name":"ism\xE9tl\xE9s","templateFieldId":48,"floatValue":null,"intValue":12,"boolValue":null,"stringValue":null},{"id":1287,"type":"INT","name":"t\xE1rcsa","templateFieldId":49,"floatValue":null,"intValue":5,"boolValue":null,"stringValue":null},{"id":1288,"type":"INT","name":"sorozat","templateFieldId":50,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null}]},{"id":545,"millisecsFrom1970":1423353600000,"name":"L\xE1btol\xE1s","templateId":11,"fields":[{"id":1184,"type":"INT","name":"ism\xE9tl\xE9s","templateFieldId":7,"floatValue":null,"intValue":10,"boolValue":null,"stringValue":null},{"id":1185,"type":"INT","name":"sorozat","templateFieldId":6,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null},{"id":1186,"type":"INT","name":"s\xFAly","templateFieldId":5,"floatValue":null,"intValue":60,"boolValue":null,"stringValue":null}]},{"id":152,"millisecsFrom1970":1416312000000,"name":"T\xF6meg","templateId":9,"fields":[{"id":198,"type":"FLOAT","name":"t\xF6meg (kg)","templateFieldId":1,"floatValue":79.0,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":556,"millisecsFrom1970":1421625600000,"name":"V\xE1llb\xF3l nyom\xE1s","templateId":28,"fields":[{"id":1217,"type":"INT","name":"ism\xE9tl\xE9s","templateFieldId":27,"floatValue":null,"intValue":7,"boolValue":null,"stringValue":null},{"id":1218,"type":"INT","name":"sorozat","templateFieldId":28,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null},{"id":1219,"type":"INT","name":"s\xFAly","templateFieldId":29,"floatValue":null,"intValue":30,"boolValue":null,"stringValue":null}]},{"id":252,"millisecsFrom1970":1423699200000,"name":"\xC9tel","templateId":18,"fields":[{"id":349,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"alma"},{"id":350,"type":"INT","name":"mennyit? (g)","templateFieldId":24,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null}]},{"id":253,"millisecsFrom1970":1423699200000,"name":"\xC9tel","templateId":18,"fields":[{"id":351,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"ban\xE1n"},{"id":352,"type":"INT","name":"mennyit? (g)","templateFieldId":24,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null}]},{"id":254,"millisecsFrom1970":1422835200000,"name":"T\xF6meg","templateId":9,"fields":[{"id":353,"type":"FLOAT","name":"t\xF6meg (kg)","templateFieldId":1,"floatValue":77.5,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":255,"millisecsFrom1970":1422921600000,"name":"T\xF6meg","templateId":9,"fields":[{"id":354,"type":"FLOAT","name":"t\xF6meg (kg)","templateFieldId":1,"floatValue":77.2,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":256,"millisecsFrom1970":1423008000000,"name":"T\xF6meg","templateId":9,"fields":[{"id":355,"type":"FLOAT","name":"t\xF6meg (kg)","templateFieldId":1,"floatValue":76.8,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":257,"millisecsFrom1970":1423094400000,"name":"T\xF6meg","templateId":9,"fields":[{"id":356,"type":"FLOAT","name":"t\xF6meg (kg)","templateFieldId":1,"floatValue":76.7,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":258,"millisecsFrom1970":1423180800000,"name":"T\xF6meg","templateId":9,"fields":[{"id":357,"type":"FLOAT","name":"t\xF6meg (kg)","templateFieldId":1,"floatValue":77.0,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":259,"millisecsFrom1970":1423267200000,"name":"T\xF6meg","templateId":9,"fields":[{"id":358,"type":"FLOAT","name":"t\xF6meg (kg)","templateFieldId":1,"floatValue":76.3,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":84,"millisecsFrom1970":1421280000000,"name":"T\xF6meg","templateId":9,"fields":[{"id":182,"type":"FLOAT","name":"t\xF6meg (kg)","templateFieldId":1,"floatValue":77.8,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":85,"millisecsFrom1970":1421539200000,"name":"T\xF6meg","templateId":9,"fields":[{"id":204,"type":"FLOAT","name":"t\xF6meg (kg)","templateFieldId":1,"floatValue":78.1,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":86,"millisecsFrom1970":1421366400000,"name":"T\xF6meg","templateId":9,"fields":[{"id":205,"type":"FLOAT","name":"t\xF6meg (kg)","templateFieldId":1,"floatValue":79.0,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":87,"millisecsFrom1970":1421452800000,"name":"T\xF6meg","templateId":9,"fields":[{"id":206,"type":"FLOAT","name":"t\xF6meg (kg)","templateFieldId":1,"floatValue":78.0,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":557,"millisecsFrom1970":1422057600000,"name":"V\xE1llb\xF3l nyom\xE1s","templateId":28,"fields":[{"id":1220,"type":"INT","name":"ism\xE9tl\xE9s","templateFieldId":27,"floatValue":null,"intValue":5,"boolValue":null,"stringValue":null},{"id":1221,"type":"INT","name":"sorozat","templateFieldId":28,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null},{"id":1222,"type":"INT","name":"s\xFAly","templateFieldId":29,"floatValue":null,"intValue":30,"boolValue":null,"stringValue":null}]},{"id":102,"millisecsFrom1970":1422057600000,"name":"T\xF6meg","templateId":9,"fields":[{"id":284,"type":"FLOAT","name":"t\xF6meg (kg)","templateFieldId":1,"floatValue":78.3,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":103,"millisecsFrom1970":1422144000000,"name":"T\xF6meg","templateId":9,"fields":[{"id":285,"type":"FLOAT","name":"t\xF6meg (kg)","templateFieldId":1,"floatValue":78.8,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":558,"millisecsFrom1970":1422489600000,"name":"V\xE1llb\xF3l nyom\xE1s","templateId":28,"fields":[{"id":1223,"type":"INT","name":"ism\xE9tl\xE9s","templateFieldId":27,"floatValue":null,"intValue":8,"boolValue":null,"stringValue":null},{"id":1224,"type":"INT","name":"sorozat","templateFieldId":28,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null},{"id":1225,"type":"INT","name":"s\xFAly","templateFieldId":29,"floatValue":null,"intValue":30,"boolValue":null,"stringValue":null}]},{"id":106,"millisecsFrom1970":1422230400000,"name":"T\xF6meg","templateId":9,"fields":[{"id":196,"type":"FLOAT","name":"t\xF6meg (kg)","templateFieldId":1,"floatValue":77.3,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":107,"millisecsFrom1970":1422316800000,"name":"T\xF6meg","templateId":9,"fields":[{"id":230,"type":"FLOAT","name":"t\xF6meg (kg)","templateFieldId":1,"floatValue":77.3,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":108,"millisecsFrom1970":1422403200000,"name":"T\xF6meg","templateId":9,"fields":[{"id":231,"type":"FLOAT","name":"t\xF6meg (kg)","templateFieldId":1,"floatValue":77.5,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":559,"millisecsFrom1970":1423440000000,"name":"V\xE1llb\xF3l nyom\xE1s","templateId":28,"fields":[{"id":1226,"type":"INT","name":"ism\xE9tl\xE9s","templateFieldId":27,"floatValue":null,"intValue":6,"boolValue":null,"stringValue":null},{"id":1227,"type":"INT","name":"sorozat","templateFieldId":28,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null},{"id":1228,"type":"INT","name":"s\xFAly","templateFieldId":29,"floatValue":null,"intValue":30,"boolValue":null,"stringValue":null}]},{"id":112,"millisecsFrom1970":1422489600000,"name":"T\xF6meg","templateId":9,"fields":[{"id":289,"type":"FLOAT","name":"t\xF6meg (kg)","templateFieldId":1,"floatValue":77.8,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":113,"millisecsFrom1970":1422576000000,"name":"T\xF6meg","templateId":9,"fields":[{"id":257,"type":"FLOAT","name":"t\xF6meg (kg)","templateFieldId":1,"floatValue":77.9,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":560,"millisecsFrom1970":1422921600000,"name":"L\xE1bhajl\xEDt\xE1s","templateId":29,"fields":[{"id":1229,"type":"INT","name":"ism\xE9tl\xE9s","templateFieldId":30,"floatValue":null,"intValue":7,"boolValue":null,"stringValue":null},{"id":1230,"type":"INT","name":"sorozat","templateFieldId":31,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null},{"id":1231,"type":"INT","name":"s\xFAly","templateFieldId":32,"floatValue":null,"intValue":24,"boolValue":null,"stringValue":null}]},{"id":117,"millisecsFrom1970":1418299200000,"name":"T\xF6meg","templateId":9,"fields":[{"id":252,"type":"FLOAT","name":"t\xF6meg (kg)","templateFieldId":1,"floatValue":77.8,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":118,"millisecsFrom1970":1418385600000,"name":"T\xF6meg","templateId":9,"fields":[{"id":253,"type":"FLOAT","name":"t\xF6meg (kg)","templateFieldId":1,"floatValue":77.8,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":119,"millisecsFrom1970":1418472000000,"name":"T\xF6meg","templateId":9,"fields":[{"id":254,"type":"FLOAT","name":"t\xF6meg (kg)","templateFieldId":1,"floatValue":77.9,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":120,"millisecsFrom1970":1418558400000,"name":"T\xF6meg","templateId":9,"fields":[{"id":255,"type":"FLOAT","name":"t\xF6meg (kg)","templateFieldId":1,"floatValue":77.9,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":121,"millisecsFrom1970":1418644800000,"name":"T\xF6meg","templateId":9,"fields":[{"id":256,"type":"FLOAT","name":"t\xF6meg (kg)","templateFieldId":1,"floatValue":78.4,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":122,"millisecsFrom1970":1418731200000,"name":"T\xF6meg","templateId":9,"fields":[{"id":194,"type":"FLOAT","name":"t\xF6meg (kg)","templateFieldId":1,"floatValue":78.5,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":123,"millisecsFrom1970":1418817600000,"name":"T\xF6meg","templateId":9,"fields":[{"id":258,"type":"FLOAT","name":"t\xF6meg (kg)","templateFieldId":1,"floatValue":78.5,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":124,"millisecsFrom1970":1418904000000,"name":"T\xF6meg","templateId":9,"fields":[{"id":259,"type":"FLOAT","name":"t\xF6meg (kg)","templateFieldId":1,"floatValue":78.1,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":125,"millisecsFrom1970":1418990400000,"name":"T\xF6meg","templateId":9,"fields":[{"id":260,"type":"FLOAT","name":"t\xF6meg (kg)","templateFieldId":1,"floatValue":78.4,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":126,"millisecsFrom1970":1419076800000,"name":"T\xF6meg","templateId":9,"fields":[{"id":261,"type":"FLOAT","name":"t\xF6meg (kg)","templateFieldId":1,"floatValue":77.7,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":127,"millisecsFrom1970":1419163200000,"name":"T\xF6meg","templateId":9,"fields":[{"id":262,"type":"FLOAT","name":"t\xF6meg (kg)","templateFieldId":1,"floatValue":78.3,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":128,"millisecsFrom1970":1419249600000,"name":"T\xF6meg","templateId":9,"fields":[{"id":183,"type":"FLOAT","name":"t\xF6meg (kg)","templateFieldId":1,"floatValue":78.5,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":129,"millisecsFrom1970":1418212800000,"name":"T\xF6meg","templateId":9,"fields":[{"id":251,"type":"FLOAT","name":"t\xF6meg (kg)","templateFieldId":1,"floatValue":78.1,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":130,"millisecsFrom1970":1417694400000,"name":"T\xF6meg","templateId":9,"fields":[{"id":245,"type":"FLOAT","name":"t\xF6meg (kg)","templateFieldId":1,"floatValue":77.9,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":131,"millisecsFrom1970":1417780800000,"name":"T\xF6meg","templateId":9,"fields":[{"id":246,"type":"FLOAT","name":"t\xF6meg (kg)","templateFieldId":1,"floatValue":77.4,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":132,"millisecsFrom1970":1417867200000,"name":"T\xF6meg","templateId":9,"fields":[{"id":247,"type":"FLOAT","name":"t\xF6meg (kg)","templateFieldId":1,"floatValue":77.6,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":133,"millisecsFrom1970":1417953600000,"name":"T\xF6meg","templateId":9,"fields":[{"id":248,"type":"FLOAT","name":"t\xF6meg (kg)","templateFieldId":1,"floatValue":77.7,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":134,"millisecsFrom1970":1418040000000,"name":"T\xF6meg","templateId":9,"fields":[{"id":249,"type":"FLOAT","name":"t\xF6meg (kg)","templateFieldId":1,"floatValue":78.2,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":135,"millisecsFrom1970":1418126400000,"name":"T\xF6meg","templateId":9,"fields":[{"id":250,"type":"FLOAT","name":"t\xF6meg (kg)","templateFieldId":1,"floatValue":78.1,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":136,"millisecsFrom1970":1417348800000,"name":"T\xF6meg","templateId":9,"fields":[{"id":241,"type":"FLOAT","name":"t\xF6meg (kg)","templateFieldId":1,"floatValue":78.0,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":137,"millisecsFrom1970":1417435200000,"name":"T\xF6meg","templateId":9,"fields":[{"id":242,"type":"FLOAT","name":"t\xF6meg (kg)","templateFieldId":1,"floatValue":78.5,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":138,"millisecsFrom1970":1417521600000,"name":"T\xF6meg","templateId":9,"fields":[{"id":243,"type":"FLOAT","name":"t\xF6meg (kg)","templateFieldId":1,"floatValue":78.1,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":139,"millisecsFrom1970":1417608000000,"name":"T\xF6meg","templateId":9,"fields":[{"id":244,"type":"FLOAT","name":"t\xF6meg (kg)","templateFieldId":1,"floatValue":78.0,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":140,"millisecsFrom1970":1417003200000,"name":"T\xF6meg","templateId":9,"fields":[{"id":237,"type":"FLOAT","name":"t\xF6meg (kg)","templateFieldId":1,"floatValue":78.1,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":141,"millisecsFrom1970":1417089600000,"name":"T\xF6meg","templateId":9,"fields":[{"id":238,"type":"FLOAT","name":"t\xF6meg (kg)","templateFieldId":1,"floatValue":77.9,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":142,"millisecsFrom1970":1417176000000,"name":"T\xF6meg","templateId":9,"fields":[{"id":239,"type":"FLOAT","name":"t\xF6meg (kg)","templateFieldId":1,"floatValue":78.0,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":143,"millisecsFrom1970":1417262400000,"name":"T\xF6meg","templateId":9,"fields":[{"id":240,"type":"FLOAT","name":"t\xF6meg (kg)","templateFieldId":1,"floatValue":78.0,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":144,"millisecsFrom1970":1416484800000,"name":"T\xF6meg","templateId":9,"fields":[{"id":200,"type":"FLOAT","name":"t\xF6meg (kg)","templateFieldId":1,"floatValue":78.3,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":145,"millisecsFrom1970":1416571200000,"name":"T\xF6meg","templateId":9,"fields":[{"id":201,"type":"FLOAT","name":"t\xF6meg (kg)","templateFieldId":1,"floatValue":78.5,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":146,"millisecsFrom1970":1416657600000,"name":"T\xF6meg","templateId":9,"fields":[{"id":202,"type":"FLOAT","name":"t\xF6meg (kg)","templateFieldId":1,"floatValue":78.6,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":147,"millisecsFrom1970":1416744000000,"name":"T\xF6meg","templateId":9,"fields":[{"id":203,"type":"FLOAT","name":"t\xF6meg (kg)","templateFieldId":1,"floatValue":78.4,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":148,"millisecsFrom1970":1416830400000,"name":"T\xF6meg","templateId":9,"fields":[{"id":235,"type":"FLOAT","name":"t\xF6meg (kg)","templateFieldId":1,"floatValue":78.6,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":149,"millisecsFrom1970":1416916800000,"name":"T\xF6meg","templateId":9,"fields":[{"id":236,"type":"FLOAT","name":"t\xF6meg (kg)","templateFieldId":1,"floatValue":78.1,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":150,"millisecsFrom1970":1416139200000,"name":"T\xF6meg","templateId":9,"fields":[{"id":229,"type":"FLOAT","name":"t\xF6meg (kg)","templateFieldId":1,"floatValue":80.0,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":151,"millisecsFrom1970":1416225600000,"name":"T\xF6meg","templateId":9,"fields":[{"id":197,"type":"FLOAT","name":"t\xF6meg (kg)","templateFieldId":1,"floatValue":79.5,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":561,"millisecsFrom1970":1423353600000,"name":"L\xE1bhajl\xEDt\xE1s","templateId":29,"fields":[{"id":1232,"type":"INT","name":"ism\xE9tl\xE9s","templateFieldId":30,"floatValue":null,"intValue":9,"boolValue":null,"stringValue":null},{"id":1233,"type":"INT","name":"sorozat","templateFieldId":31,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null},{"id":1234,"type":"INT","name":"s\xFAly","templateFieldId":32,"floatValue":null,"intValue":24,"boolValue":null,"stringValue":null}]},{"id":92,"millisecsFrom1970":1421625600000,"name":"T\xF6meg","templateId":9,"fields":[{"id":215,"type":"FLOAT","name":"t\xF6meg (kg)","templateFieldId":1,"floatValue":78.7,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":93,"millisecsFrom1970":1421798400000,"name":"T\xF6meg","templateId":9,"fields":[{"id":216,"type":"FLOAT","name":"t\xF6meg (kg)","templateFieldId":1,"floatValue":77.7,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":94,"millisecsFrom1970":1421712000000,"name":"T\xF6meg","templateId":9,"fields":[{"id":273,"type":"FLOAT","name":"t\xF6meg (kg)","templateFieldId":1,"floatValue":78.3,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":95,"millisecsFrom1970":1421884800000,"name":"T\xF6meg","templateId":9,"fields":[{"id":277,"type":"FLOAT","name":"t\xF6meg (kg)","templateFieldId":1,"floatValue":77.1,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":96,"millisecsFrom1970":1421971200000,"name":"T\xF6meg","templateId":9,"fields":[{"id":278,"type":"FLOAT","name":"t\xF6meg (kg)","templateFieldId":1,"floatValue":77.7,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":153,"millisecsFrom1970":1416398400000,"name":"T\xF6meg","templateId":9,"fields":[{"id":199,"type":"FLOAT","name":"t\xF6meg (kg)","templateFieldId":1,"floatValue":78.4,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":562,"millisecsFrom1970":1421798400000,"name":"V\xE1dli","templateId":30,"fields":[{"id":1235,"type":"INT","name":"ism\xE9tl\xE9s","templateFieldId":33,"floatValue":null,"intValue":14,"boolValue":null,"stringValue":null},{"id":1236,"type":"INT","name":"sorozat","templateFieldId":34,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null},{"id":1237,"type":"INT","name":"s\xFAly","templateFieldId":35,"floatValue":null,"intValue":150,"boolValue":null,"stringValue":null}]},{"id":563,"millisecsFrom1970":1422316800000,"name":"V\xE1dli","templateId":30,"fields":[{"id":1238,"type":"INT","name":"ism\xE9tl\xE9s","templateFieldId":33,"floatValue":null,"intValue":13,"boolValue":null,"stringValue":null},{"id":1239,"type":"INT","name":"sorozat","templateFieldId":34,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null},{"id":1240,"type":"INT","name":"s\xFAly","templateFieldId":35,"floatValue":null,"intValue":160,"boolValue":null,"stringValue":null}]},{"id":564,"millisecsFrom1970":1422921600000,"name":"V\xE1dli","templateId":30,"fields":[{"id":1241,"type":"INT","name":"ism\xE9tl\xE9s","templateFieldId":33,"floatValue":null,"intValue":9,"boolValue":null,"stringValue":null},{"id":1242,"type":"INT","name":"sorozat","templateFieldId":34,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null},{"id":1243,"type":"INT","name":"s\xFAly","templateFieldId":35,"floatValue":null,"intValue":170,"boolValue":null,"stringValue":null}]},{"id":565,"millisecsFrom1970":1423353600000,"name":"V\xE1dli","templateId":30,"fields":[{"id":1244,"type":"INT","name":"ism\xE9tl\xE9s","templateFieldId":33,"floatValue":null,"intValue":10,"boolValue":null,"stringValue":null},{"id":1245,"type":"INT","name":"sorozat","templateFieldId":34,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null},{"id":1246,"type":"INT","name":"s\xFAly","templateFieldId":35,"floatValue":null,"intValue":170,"boolValue":null,"stringValue":null}]},{"id":580,"millisecsFrom1970":1421798400000,"name":"Bicepsz","templateId":35,"fields":[{"id":1289,"type":"INT","name":"ism\xE9tl\xE9s","templateFieldId":48,"floatValue":null,"intValue":9,"boolValue":null,"stringValue":null},{"id":1290,"type":"INT","name":"t\xE1rcsa","templateFieldId":49,"floatValue":null,"intValue":5,"boolValue":null,"stringValue":null},{"id":1291,"type":"INT","name":"sorozat","templateFieldId":50,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null}]},{"id":260,"millisecsFrom1970":1423440000000,"name":"T\xF6meg","templateId":9,"fields":[{"id":359,"type":"FLOAT","name":"t\xF6meg (kg)","templateFieldId":1,"floatValue":77.6,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":581,"millisecsFrom1970":1421798400000,"name":"Mellhez h\xFAz\xE1s","templateId":36,"fields":[{"id":1292,"type":"INT","name":"ism\xE9tl\xE9s","templateFieldId":51,"floatValue":null,"intValue":4,"boolValue":null,"stringValue":null},{"id":1293,"type":"INT","name":"sorozat","templateFieldId":52,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null},{"id":1294,"type":"INT","name":"s\xFAly","templateFieldId":53,"floatValue":null,"intValue":35,"boolValue":null,"stringValue":null}]},{"id":582,"millisecsFrom1970":1422230400000,"name":"Mellhez h\xFAz\xE1s","templateId":36,"fields":[{"id":1295,"type":"INT","name":"ism\xE9tl\xE9s","templateFieldId":51,"floatValue":null,"intValue":11,"boolValue":null,"stringValue":null},{"id":1296,"type":"INT","name":"sorozat","templateFieldId":52,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null},{"id":1297,"type":"INT","name":"s\xFAly","templateFieldId":53,"floatValue":null,"intValue":35,"boolValue":null,"stringValue":null}]},{"id":583,"millisecsFrom1970":1422662400000,"name":"Mellhez h\xFAz\xE1s","templateId":36,"fields":[{"id":1298,"type":"INT","name":"ism\xE9tl\xE9s","templateFieldId":51,"floatValue":null,"intValue":7,"boolValue":null,"stringValue":null},{"id":1299,"type":"INT","name":"sorozat","templateFieldId":52,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null},{"id":1300,"type":"INT","name":"s\xFAly","templateFieldId":53,"floatValue":null,"intValue":35,"boolValue":null,"stringValue":null}]},{"id":584,"millisecsFrom1970":1423094400000,"name":"Mellhez h\xFAz\xE1s","templateId":36,"fields":[{"id":1301,"type":"INT","name":"ism\xE9tl\xE9s","templateFieldId":51,"floatValue":null,"intValue":8,"boolValue":null,"stringValue":null},{"id":1302,"type":"INT","name":"sorozat","templateFieldId":52,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null},{"id":1303,"type":"INT","name":"s\xFAly","templateFieldId":53,"floatValue":null,"intValue":35,"boolValue":null,"stringValue":null}]},{"id":585,"millisecsFrom1970":1423612800000,"name":"Mellhez h\xFAz\xE1s","templateId":36,"fields":[{"id":1304,"type":"INT","name":"ism\xE9tl\xE9s","templateFieldId":51,"floatValue":null,"intValue":8,"boolValue":null,"stringValue":null},{"id":1305,"type":"INT","name":"sorozat","templateFieldId":52,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null},{"id":1306,"type":"INT","name":"s\xFAly","templateFieldId":53,"floatValue":null,"intValue":35,"boolValue":null,"stringValue":null}]},{"id":65,"millisecsFrom1970":1420243200000,"name":"T\xF6meg","templateId":9,"fields":[{"id":221,"type":"FLOAT","name":"t\xF6meg (kg)","templateFieldId":1,"floatValue":78.4,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":67,"millisecsFrom1970":1420329600000,"name":"T\xF6meg","templateId":9,"fields":[{"id":223,"type":"FLOAT","name":"t\xF6meg (kg)","templateFieldId":1,"floatValue":78.5,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":195,"millisecsFrom1970":1420416000000,"name":"T\xF6meg","templateId":9,"fields":[{"id":225,"type":"FLOAT","name":"t\xF6meg (kg)","templateFieldId":1,"floatValue":79.1,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":196,"millisecsFrom1970":1420502400000,"name":"T\xF6meg","templateId":9,"fields":[{"id":226,"type":"FLOAT","name":"t\xF6meg (kg)","templateFieldId":1,"floatValue":79.5,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":599,"millisecsFrom1970":1424044800000,"name":"T\xE1rogat\xE1s","templateId":10,"fields":[{"id":1327,"type":"INT","name":"ism\xE9tl\xE9s","templateFieldId":4,"floatValue":null,"intValue":10,"boolValue":null,"stringValue":null},{"id":1328,"type":"INT","name":"t\xE1rcsa","templateFieldId":2,"floatValue":null,"intValue":7,"boolValue":null,"stringValue":null},{"id":1329,"type":"INT","name":"sorozat","templateFieldId":3,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null}]},{"id":68,"millisecsFrom1970":1420588800000,"name":"T\xF6meg","templateId":9,"fields":[{"id":263,"type":"FLOAT","name":"t\xF6meg (kg)","templateFieldId":1,"floatValue":79.5,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":70,"millisecsFrom1970":1420675200000,"name":"T\xF6meg","templateId":9,"fields":[{"id":264,"type":"FLOAT","name":"t\xF6meg (kg)","templateFieldId":1,"floatValue":79.7,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":600,"millisecsFrom1970":1424044800000,"name":"V\xE1llb\xF3l nyom\xE1s","templateId":28,"fields":[{"id":1330,"type":"INT","name":"ism\xE9tl\xE9s","templateFieldId":27,"floatValue":null,"intValue":7,"boolValue":null,"stringValue":null},{"id":1331,"type":"INT","name":"sorozat","templateFieldId":28,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null},{"id":1332,"type":"INT","name":"s\xFAly","templateFieldId":29,"floatValue":null,"intValue":30,"boolValue":null,"stringValue":null}]},{"id":73,"millisecsFrom1970":1420761600000,"name":"T\xF6meg","templateId":9,"fields":[{"id":267,"type":"FLOAT","name":"t\xF6meg (kg)","templateFieldId":1,"floatValue":79.7,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":74,"millisecsFrom1970":1420848000000,"name":"T\xF6meg","templateId":9,"fields":[{"id":268,"type":"FLOAT","name":"t\xF6meg (kg)","templateFieldId":1,"floatValue":78.8,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":601,"millisecsFrom1970":1424044800000,"name":"Karny\xFAjt\xE1s csig\xE1n","templateId":37,"fields":[{"id":1333,"type":"INT","name":"ism\xE9tl\xE9s","templateFieldId":54,"floatValue":null,"intValue":7,"boolValue":null,"stringValue":null},{"id":1334,"type":"INT","name":"sorozat","templateFieldId":55,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null},{"id":1335,"type":"INT","name":"s\xFAly","templateFieldId":56,"floatValue":null,"intValue":40,"boolValue":null,"stringValue":null}]},{"id":602,"millisecsFrom1970":1424044800000,"name":"Mellb\u0151l nyom\xE1s","templateId":12,"fields":[{"id":1336,"type":"INT","name":"ism\xE9tl\xE9s","templateFieldId":8,"floatValue":null,"intValue":5,"boolValue":null,"stringValue":null},{"id":1337,"type":"INT","name":"t\xE1rcsa","templateFieldId":9,"floatValue":null,"intValue":35,"boolValue":null,"stringValue":null},{"id":1338,"type":"INT","name":"sorozat","templateFieldId":10,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null}]},{"id":603,"millisecsFrom1970":1424044800000,"name":"Oldalemel\xE9s","templateId":41,"fields":[{"id":1339,"type":"INT","name":"ism\xE9tl\xE9s","templateFieldId":62,"floatValue":null,"intValue":5,"boolValue":null,"stringValue":null},{"id":1340,"type":"INT","name":"s\xFAly","templateFieldId":63,"floatValue":null,"intValue":5,"boolValue":null,"stringValue":null},{"id":1341,"type":"INT","name":"sorozat","templateFieldId":64,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null}]},{"id":604,"millisecsFrom1970":1424044800000,"name":"\xC9tel","templateId":18,"fields":[{"id":1342,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"m\xE1j,kelbi,broki,toj\xE1s,diszn\xF3sajt"},{"id":1343,"type":"INT","name":"mennyit? (g)","templateFieldId":24,"floatValue":null,"intValue":0,"boolValue":null,"stringValue":null}]},{"id":606,"millisecsFrom1970":1424131200000,"name":"\xC9tel","templateId":18,"fields":[{"id":1345,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"zab(80g) aszalv\xE1nyok(30g) di\xF3(2) mandula(4) mogyor\xF3(4) m\xE9z(1tk)"},{"id":1346,"type":"INT","name":"mennyit? (g)","templateFieldId":24,"floatValue":null,"intValue":0,"boolValue":null,"stringValue":null}]},{"id":191,"millisecsFrom1970":1419336000000,"name":"T\xF6meg","templateId":9,"fields":[{"id":184,"type":"FLOAT","name":"t\xF6meg (kg)","templateFieldId":1,"floatValue":78.5,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":192,"millisecsFrom1970":1419422400000,"name":"T\xF6meg","templateId":9,"fields":[{"id":185,"type":"FLOAT","name":"t\xF6meg (kg)","templateFieldId":1,"floatValue":78.5,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":193,"millisecsFrom1970":1419508800000,"name":"T\xF6meg","templateId":9,"fields":[{"id":186,"type":"FLOAT","name":"t\xF6meg (kg)","templateFieldId":1,"floatValue":78.5,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":199,"millisecsFrom1970":1419595200000,"name":"T\xF6meg","templateId":9,"fields":[{"id":187,"type":"FLOAT","name":"t\xF6meg (kg)","templateFieldId":1,"floatValue":78.8,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":200,"millisecsFrom1970":1419681600000,"name":"T\xF6meg","templateId":9,"fields":[{"id":195,"type":"FLOAT","name":"t\xF6meg (kg)","templateFieldId":1,"floatValue":78.4,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":201,"millisecsFrom1970":1419768000000,"name":"T\xF6meg","templateId":9,"fields":[{"id":209,"type":"FLOAT","name":"t\xF6meg (kg)","templateFieldId":1,"floatValue":78.1,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":636,"millisecsFrom1970":1424779200000,"name":"T\xF6meg","templateId":9,"fields":[{"id":1380,"type":"FLOAT","name":"t\xF6meg (kg)","templateFieldId":1,"floatValue":77.1,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":208,"millisecsFrom1970":1420027200000,"name":"T\xF6meg","templateId":9,"fields":[{"id":207,"type":"FLOAT","name":"t\xF6meg (kg)","templateFieldId":1,"floatValue":78.5,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":209,"millisecsFrom1970":1419854400000,"name":"T\xF6meg","templateId":9,"fields":[{"id":210,"type":"FLOAT","name":"t\xF6meg (kg)","templateFieldId":1,"floatValue":79.2,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":210,"millisecsFrom1970":1419940800000,"name":"T\xF6meg","templateId":9,"fields":[{"id":208,"type":"FLOAT","name":"t\xF6meg (kg)","templateFieldId":1,"floatValue":78.85,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":659,"millisecsFrom1970":1425033000000,"name":"\xC9tel","templateId":18,"fields":[{"id":1415,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"csirke,m\xE1j(50+50g), r\xEDzs( f\u0151zve 200g), 1 oldal paprika, 1 gyufa uborka, 1 db retek, 1 paradicsom,oliva,t\xF6kmag,lenmag,halolaj(1 ek), 50g savany\xFAk\xE1poszta"},{"id":1416,"type":"INT","name":"mennyit? (g)","templateFieldId":24,"floatValue":null,"intValue":0,"boolValue":null,"stringValue":null}]},{"id":214,"millisecsFrom1970":1420070400000,"name":"T\xF6meg","templateId":9,"fields":[{"id":217,"type":"FLOAT","name":"t\xF6meg (kg)","templateFieldId":1,"floatValue":79.7,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":216,"millisecsFrom1970":1420156800000,"name":"T\xF6meg","templateId":9,"fields":[{"id":218,"type":"FLOAT","name":"t\xF6meg (kg)","templateFieldId":1,"floatValue":78.6,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":661,"millisecsFrom1970":1425016800000,"name":"\xC9tel","templateId":18,"fields":[{"id":1419,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"zab(80g),feh\xE9rje(30g),alma,ban\xE1n,aszalv\xE1ny,kefir,v\xEDz"},{"id":1420,"type":"INT","name":"mennyit? (g)","templateFieldId":24,"floatValue":null,"intValue":0,"boolValue":null,"stringValue":null}]},{"id":662,"millisecsFrom1970":1424979000000,"name":"\xC9tel","templateId":18,"fields":[{"id":1421,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"5 toj\xE1s,kefir"},{"id":1422,"type":"INT","name":"mennyit? (g)","templateFieldId":24,"floatValue":null,"intValue":0,"boolValue":null,"stringValue":null}]},{"id":262,"millisecsFrom1970":1423612800000,"name":"T\xF6meg","templateId":9,"fields":[{"id":361,"type":"FLOAT","name":"t\xF6meg (kg)","templateFieldId":1,"floatValue":76.9,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":263,"millisecsFrom1970":1423699200000,"name":"T\xF6meg","templateId":9,"fields":[{"id":362,"type":"FLOAT","name":"t\xF6meg (kg)","templateFieldId":1,"floatValue":76.6,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":261,"millisecsFrom1970":1423526400000,"name":"T\xF6meg","templateId":9,"fields":[{"id":360,"type":"FLOAT","name":"t\xF6meg (kg)","templateFieldId":1,"floatValue":77.1,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":610,"millisecsFrom1970":1424271600000,"name":"\xC9tel","templateId":18,"fields":[{"id":1353,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"rizs(100g) kelbi(100g) savany\xFAs\xE1g(50g) hal(100g) olivaolaj(1tk) t\xF6kmagolaj(1tk) lenmagolaj(1tk)"},{"id":1354,"type":"INT","name":"mennyit? (g)","templateFieldId":24,"floatValue":null,"intValue":0,"boolValue":null,"stringValue":null}]},{"id":660,"millisecsFrom1970":1425049200000,"name":"\xC9tel","templateId":18,"fields":[{"id":1417,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"csirke,m\xE1j(50+50g), r\xEDzs( f\u0151zve 200g), 1 oldal paprika, 1 gyufa uborka, 1 db retek, 1 paradicsom,oliva,t\xF6kmag,lenmag,halolaj(1 ek), 50g savany\xFAk\xE1poszta"},{"id":1418,"type":"INT","name":"mennyit? (g)","templateFieldId":24,"floatValue":null,"intValue":0,"boolValue":null,"stringValue":null}]},{"id":681,"millisecsFrom1970":1425065520000,"name":"Sz\xE9klet","templateId":17,"fields":[{"id":1441,"type":"SELECT","name":"milyen?","templateFieldId":15,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":""}]},{"id":608,"millisecsFrom1970":1424255400000,"name":"\xC9tel","templateId":18,"fields":[{"id":1349,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"zab(80g) aszalv\xE1nyok(30g) di\xF3(2) mandula(4) mogyor\xF3(4) m\xE9z(1tk)"},{"id":1350,"type":"INT","name":"mennyit? (g)","templateFieldId":24,"floatValue":null,"intValue":0,"boolValue":null,"stringValue":null}]},{"id":663,"millisecsFrom1970":1425034800000,"name":"T\xF6meg","templateId":9,"fields":[{"id":1423,"type":"FLOAT","name":"t\xF6meg (kg)","templateFieldId":1,"floatValue":76.5,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":689,"millisecsFrom1970":1425121200000,"name":"45\xB0 mell","templateId":43,"fields":[{"id":1449,"type":"INT","name":"ism\xE9tl\xE9s","templateFieldId":65,"floatValue":null,"intValue":8,"boolValue":null,"stringValue":null},{"id":1450,"type":"FLOAT","name":"t\xE1rcsa","templateFieldId":66,"floatValue":8.75,"intValue":null,"boolValue":null,"stringValue":null},{"id":1451,"type":"INT","name":"sorozat","templateFieldId":67,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null}]},{"id":690,"millisecsFrom1970":1425121200000,"name":"Tricepsz r\xFAddal","templateId":44,"fields":[{"id":1452,"type":"INT","name":"ism\xE9tl\xE9s","templateFieldId":68,"floatValue":null,"intValue":5,"boolValue":null,"stringValue":null},{"id":1453,"type":"FLOAT","name":"t\xE1rcsa","templateFieldId":69,"floatValue":0.0,"intValue":null,"boolValue":null,"stringValue":null},{"id":1454,"type":"INT","name":"sorozat","templateFieldId":70,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null}]},{"id":691,"millisecsFrom1970":1425121200000,"name":"T\xE1rogat\xE1s","templateId":10,"fields":[{"id":1455,"type":"INT","name":"ism\xE9tl\xE9s","templateFieldId":4,"floatValue":null,"intValue":6,"boolValue":null,"stringValue":null},{"id":1456,"type":"INT","name":"t\xE1rcsa","templateFieldId":2,"floatValue":null,"intValue":7,"boolValue":null,"stringValue":null},{"id":1457,"type":"INT","name":"sorozat","templateFieldId":3,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null}]},{"id":692,"millisecsFrom1970":1425121200000,"name":"V\xE1llb\xF3l nyom\xE1s","templateId":28,"fields":[{"id":1458,"type":"INT","name":"ism\xE9tl\xE9s","templateFieldId":27,"floatValue":null,"intValue":5,"boolValue":null,"stringValue":null},{"id":1459,"type":"FLOAT","name":"sorozat","templateFieldId":28,"floatValue":1.0,"intValue":null,"boolValue":null,"stringValue":null},{"id":1460,"type":"INT","name":"s\xFAly","templateFieldId":29,"floatValue":null,"intValue":10,"boolValue":null,"stringValue":null}]},{"id":693,"millisecsFrom1970":1425121200000,"name":"L\xE1btol\xE1s","templateId":11,"fields":[{"id":1461,"type":"INT","name":"ism\xE9tl\xE9s","templateFieldId":7,"floatValue":null,"intValue":5,"boolValue":null,"stringValue":null},{"id":1462,"type":"INT","name":"sorozat","templateFieldId":6,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null},{"id":1463,"type":"INT","name":"s\xFAly","templateFieldId":5,"floatValue":null,"intValue":100,"boolValue":null,"stringValue":null}]},{"id":694,"millisecsFrom1970":1425121200000,"name":"L\xE1bhajl\xEDt\xE1s","templateId":29,"fields":[{"id":1464,"type":"INT","name":"ism\xE9tl\xE9s","templateFieldId":30,"floatValue":null,"intValue":11,"boolValue":null,"stringValue":null},{"id":1465,"type":"INT","name":"sorozat","templateFieldId":31,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null},{"id":1466,"type":"INT","name":"s\xFAly","templateFieldId":32,"floatValue":null,"intValue":24,"boolValue":null,"stringValue":null}]},{"id":695,"millisecsFrom1970":1425121200000,"name":"V\xE1dli","templateId":30,"fields":[{"id":1467,"type":"INT","name":"ism\xE9tl\xE9s","templateFieldId":33,"floatValue":null,"intValue":8,"boolValue":null,"stringValue":null},{"id":1468,"type":"INT","name":"sorozat","templateFieldId":34,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null},{"id":1469,"type":"INT","name":"s\xFAly","templateFieldId":35,"floatValue":null,"intValue":190,"boolValue":null,"stringValue":null}]},{"id":696,"millisecsFrom1970":1425078000000,"name":"Guggol\xE1s","templateId":45,"fields":[{"id":1470,"type":"INT","name":"ism\xE9tl\xE9s","templateFieldId":71,"floatValue":null,"intValue":8,"boolValue":null,"stringValue":null},{"id":1471,"type":"INT","name":"sorozat","templateFieldId":72,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null},{"id":1472,"type":"FLOAT","name":"s\xFAly","templateFieldId":73,"floatValue":10.0,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":697,"millisecsFrom1970":1425121200000,"name":"Bicepsz","templateId":35,"fields":[{"id":1473,"type":"INT","name":"ism\xE9tl\xE9s","templateFieldId":48,"floatValue":null,"intValue":9,"boolValue":null,"stringValue":null},{"id":1474,"type":"INT","name":"t\xE1rcsa","templateFieldId":49,"floatValue":null,"intValue":6,"boolValue":null,"stringValue":null},{"id":1475,"type":"INT","name":"sorozat","templateFieldId":50,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null}]},{"id":698,"millisecsFrom1970":1424862000000,"name":"Evez\xE9s","templateId":34,"fields":[{"id":1476,"type":"INT","name":"ism\xE9tl\xE9s","templateFieldId":45,"floatValue":null,"intValue":9,"boolValue":null,"stringValue":null},{"id":1477,"type":"INT","name":"t\xE1rcsa","templateFieldId":46,"floatValue":null,"intValue":5,"boolValue":null,"stringValue":null},{"id":1478,"type":"INT","name":"sorozat","templateFieldId":47,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null}]},{"id":699,"millisecsFrom1970":1424862000000,"name":"Bicepsz","templateId":35,"fields":[{"id":1479,"type":"INT","name":"ism\xE9tl\xE9s","templateFieldId":48,"floatValue":null,"intValue":7,"boolValue":null,"stringValue":null},{"id":1480,"type":"INT","name":"t\xE1rcsa","templateFieldId":49,"floatValue":null,"intValue":6,"boolValue":null,"stringValue":null},{"id":1481,"type":"INT","name":"sorozat","templateFieldId":50,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null}]},{"id":700,"millisecsFrom1970":1424862000000,"name":"Mellhez h\xFAz\xE1s","templateId":36,"fields":[{"id":1482,"type":"INT","name":"ism\xE9tl\xE9s","templateFieldId":51,"floatValue":null,"intValue":7,"boolValue":null,"stringValue":null},{"id":1483,"type":"INT","name":"sorozat","templateFieldId":52,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null},{"id":1484,"type":"INT","name":"s\xFAly","templateFieldId":53,"floatValue":null,"intValue":35,"boolValue":null,"stringValue":null}]},{"id":701,"millisecsFrom1970":1424862000000,"name":"Csuklya","templateId":46,"fields":[{"id":1485,"type":"INT","name":"ism\xE9tl\xE9s","templateFieldId":74,"floatValue":null,"intValue":5,"boolValue":null,"stringValue":null},{"id":1486,"type":"INT","name":"sorozat","templateFieldId":75,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null},{"id":1487,"type":"FLOAT","name":"s\xFAly","templateFieldId":76,"floatValue":15.0,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":703,"millisecsFrom1970":1424430000000,"name":"45\xB0 mell","templateId":43,"fields":[{"id":1491,"type":"INT","name":"ism\xE9tl\xE9s","templateFieldId":65,"floatValue":null,"intValue":6,"boolValue":null,"stringValue":null},{"id":1492,"type":"FLOAT","name":"t\xE1rcsa","templateFieldId":66,"floatValue":7.5,"intValue":null,"boolValue":null,"stringValue":null},{"id":1493,"type":"INT","name":"sorozat","templateFieldId":67,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null}]},{"id":704,"millisecsFrom1970":1424430000000,"name":"Tricepsz r\xFAddal","templateId":44,"fields":[{"id":1494,"type":"INT","name":"ism\xE9tl\xE9s","templateFieldId":68,"floatValue":null,"intValue":5,"boolValue":null,"stringValue":null},{"id":1495,"type":"FLOAT","name":"t\xE1rcsa","templateFieldId":69,"floatValue":0.0,"intValue":null,"boolValue":null,"stringValue":null},{"id":1496,"type":"INT","name":"sorozat","templateFieldId":70,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null}]},{"id":705,"millisecsFrom1970":1424430000000,"name":"T\xE1rogat\xE1s","templateId":10,"fields":[{"id":1497,"type":"INT","name":"ism\xE9tl\xE9s","templateFieldId":4,"floatValue":null,"intValue":8,"boolValue":null,"stringValue":null},{"id":1498,"type":"INT","name":"t\xE1rcsa","templateFieldId":2,"floatValue":null,"intValue":7,"boolValue":null,"stringValue":null},{"id":1499,"type":"INT","name":"sorozat","templateFieldId":3,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null}]},{"id":706,"millisecsFrom1970":1424430000000,"name":"V\xE1llb\xF3l nyom\xE1s","templateId":28,"fields":[{"id":1500,"type":"INT","name":"ism\xE9tl\xE9s","templateFieldId":27,"floatValue":null,"intValue":9,"boolValue":null,"stringValue":null},{"id":1501,"type":"FLOAT","name":"sorozat","templateFieldId":28,"floatValue":1.0,"intValue":null,"boolValue":null,"stringValue":null},{"id":1502,"type":"INT","name":"s\xFAly","templateFieldId":29,"floatValue":null,"intValue":30,"boolValue":null,"stringValue":null}]},{"id":707,"millisecsFrom1970":1424257200000,"name":"Csuklya","templateId":46,"fields":[{"id":1503,"type":"INT","name":"ism\xE9tl\xE9s","templateFieldId":74,"floatValue":null,"intValue":8,"boolValue":null,"stringValue":null},{"id":1504,"type":"INT","name":"sorozat","templateFieldId":75,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null},{"id":1505,"type":"FLOAT","name":"s\xFAly","templateFieldId":76,"floatValue":10.0,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":708,"millisecsFrom1970":1424257200000,"name":"Mellhez h\xFAz\xE1s","templateId":36,"fields":[{"id":1506,"type":"INT","name":"ism\xE9tl\xE9s","templateFieldId":51,"floatValue":null,"intValue":8,"boolValue":null,"stringValue":null},{"id":1507,"type":"INT","name":"sorozat","templateFieldId":52,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null},{"id":1508,"type":"INT","name":"s\xFAly","templateFieldId":53,"floatValue":null,"intValue":35,"boolValue":null,"stringValue":null}]},{"id":709,"millisecsFrom1970":1424257200000,"name":"Bicepsz","templateId":35,"fields":[{"id":1509,"type":"INT","name":"ism\xE9tl\xE9s","templateFieldId":48,"floatValue":null,"intValue":6,"boolValue":null,"stringValue":null},{"id":1510,"type":"INT","name":"t\xE1rcsa","templateFieldId":49,"floatValue":null,"intValue":6,"boolValue":null,"stringValue":null},{"id":1511,"type":"INT","name":"sorozat","templateFieldId":50,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null}]},{"id":710,"millisecsFrom1970":1424257200000,"name":"Evez\xE9s","templateId":34,"fields":[{"id":1512,"type":"INT","name":"ism\xE9tl\xE9s","templateFieldId":45,"floatValue":null,"intValue":8,"boolValue":null,"stringValue":null},{"id":1513,"type":"INT","name":"t\xE1rcsa","templateFieldId":46,"floatValue":null,"intValue":5,"boolValue":null,"stringValue":null},{"id":1514,"type":"INT","name":"sorozat","templateFieldId":47,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null}]},{"id":711,"millisecsFrom1970":1424170800000,"name":"L\xE1btol\xE1s","templateId":11,"fields":[{"id":1515,"type":"INT","name":"ism\xE9tl\xE9s","templateFieldId":7,"floatValue":null,"intValue":10,"boolValue":null,"stringValue":null},{"id":1516,"type":"INT","name":"sorozat","templateFieldId":6,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null},{"id":1517,"type":"INT","name":"s\xFAly","templateFieldId":5,"floatValue":null,"intValue":60,"boolValue":null,"stringValue":null}]},{"id":712,"millisecsFrom1970":1424170800000,"name":"L\xE1bhajl\xEDt\xE1s","templateId":29,"fields":[{"id":1518,"type":"INT","name":"ism\xE9tl\xE9s","templateFieldId":30,"floatValue":null,"intValue":6,"boolValue":null,"stringValue":null},{"id":1519,"type":"INT","name":"sorozat","templateFieldId":31,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null},{"id":1520,"type":"INT","name":"s\xFAly","templateFieldId":32,"floatValue":null,"intValue":24,"boolValue":null,"stringValue":null}]},{"id":713,"millisecsFrom1970":1424170800000,"name":"V\xE1dli","templateId":30,"fields":[{"id":1521,"type":"INT","name":"ism\xE9tl\xE9s","templateFieldId":33,"floatValue":null,"intValue":12,"boolValue":null,"stringValue":null},{"id":1522,"type":"INT","name":"sorozat","templateFieldId":34,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null},{"id":1523,"type":"INT","name":"s\xFAly","templateFieldId":35,"floatValue":null,"intValue":170,"boolValue":null,"stringValue":null}]},{"id":714,"millisecsFrom1970":1424430000000,"name":"L\xE1btol\xE1s","templateId":11,"fields":[{"id":1524,"type":"INT","name":"ism\xE9tl\xE9s","templateFieldId":7,"floatValue":null,"intValue":14,"boolValue":null,"stringValue":null},{"id":1525,"type":"INT","name":"sorozat","templateFieldId":6,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null},{"id":1526,"type":"INT","name":"s\xFAly","templateFieldId":5,"floatValue":null,"intValue":80,"boolValue":null,"stringValue":null}]},{"id":715,"millisecsFrom1970":1424430000000,"name":"L\xE1bhajl\xEDt\xE1s","templateId":29,"fields":[{"id":1527,"type":"INT","name":"ism\xE9tl\xE9s","templateFieldId":30,"floatValue":null,"intValue":9,"boolValue":null,"stringValue":null},{"id":1528,"type":"INT","name":"sorozat","templateFieldId":31,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null},{"id":1529,"type":"INT","name":"s\xFAly","templateFieldId":32,"floatValue":null,"intValue":24,"boolValue":null,"stringValue":null}]},{"id":716,"millisecsFrom1970":1424430000000,"name":"V\xE1dli","templateId":30,"fields":[{"id":1530,"type":"INT","name":"ism\xE9tl\xE9s","templateFieldId":33,"floatValue":null,"intValue":11,"boolValue":null,"stringValue":null},{"id":1531,"type":"INT","name":"sorozat","templateFieldId":34,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null},{"id":1532,"type":"INT","name":"s\xFAly","templateFieldId":35,"floatValue":null,"intValue":180,"boolValue":null,"stringValue":null}]},{"id":717,"millisecsFrom1970":1425110400000,"name":"\xC9tel","templateId":18,"fields":[{"id":1533,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"zab(100g),feh\xE9rje(50g),alma,ban\xE1n,aszalv\xE1ny,kefir,v\xEDz"},{"id":1534,"type":"INT","name":"mennyit? (g)","templateFieldId":24,"floatValue":null,"intValue":0,"boolValue":null,"stringValue":null}]},{"id":718,"millisecsFrom1970":1425207600000,"name":"T\xF6meg","templateId":9,"fields":[{"id":1535,"type":"FLOAT","name":"t\xF6meg (kg)","templateFieldId":1,"floatValue":76.5,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":719,"millisecsFrom1970":1425121200000,"name":"Alkohol","templateId":21,"fields":[{"id":1536,"type":"INT","name":"mennyit?","templateFieldId":20,"floatValue":null,"intValue":3,"boolValue":null,"stringValue":null}]},{"id":721,"millisecsFrom1970":1425195060000,"name":"Sz\xE9klet","templateId":17,"fields":[{"id":1538,"type":"SELECT","name":"milyen?","templateFieldId":15,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":""}]},{"id":722,"millisecsFrom1970":1425193200000,"name":"\xC9tel","templateId":18,"fields":[{"id":1539,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"zab(100g),feh\xE9rje(50g),alma,ban\xE1n,aszalv\xE1ny,kefir,v\xEDz"},{"id":1540,"type":"INT","name":"mennyit? (g)","templateFieldId":24,"floatValue":null,"intValue":0,"boolValue":null,"stringValue":null}]},{"id":723,"millisecsFrom1970":1425214800000,"name":"\xC9tel","templateId":18,"fields":[{"id":1541,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"rizs(200g),eg\xE9sz csirkecomb (sok), szalonn\xE1s m\xE1j"},{"id":1542,"type":"INT","name":"mennyit? (g)","templateFieldId":24,"floatValue":null,"intValue":0,"boolValue":null,"stringValue":null}]},{"id":724,"millisecsFrom1970":1425236400000,"name":"\xC9tel","templateId":18,"fields":[{"id":1543,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"r\xE9teseket, csilisbab, kefir"},{"id":1544,"type":"INT","name":"mennyit? (g)","templateFieldId":24,"floatValue":null,"intValue":0,"boolValue":null,"stringValue":null}]},{"id":725,"millisecsFrom1970":1425294000000,"name":"T\xF6meg","templateId":9,"fields":[{"id":1545,"type":"FLOAT","name":"t\xF6meg (kg)","templateFieldId":1,"floatValue":76.5,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":727,"millisecsFrom1970":1425281700000,"name":"Sz\xE9klet","templateId":17,"fields":[{"id":1548,"type":"SELECT","name":"milyen?","templateFieldId":15,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":""}]},{"id":729,"millisecsFrom1970":1425304800000,"name":"\xC9tel","templateId":18,"fields":[{"id":1551,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"csirke,m\xE1j(50+50g), r\xEDzs( f\u0151zve 200g), 1 sz\xE1l hagyma,1 oldal paprika, 1 gyufa uborka, 1 db retek, 1 paradicsom,oliva,t\xF6kmag,lenmag,halolaj(1 ek),"},{"id":1552,"type":"INT","name":"mennyit? (g)","templateFieldId":24,"floatValue":null,"intValue":0,"boolValue":null,"stringValue":null}]},{"id":728,"millisecsFrom1970":1425287700000,"name":"\xC9tel","templateId":18,"fields":[{"id":1549,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"csirke,m\xE1j(50+50g), r\xEDzs( f\u0151zve 200g), 1 sz\xE1l hagyma,1 oldal paprika, 1 gyufa uborka, 1 db retek, 1 paradicsom,oliva,t\xF6kmag,lenmag,halolaj(1 ek),"},{"id":1550,"type":"INT","name":"mennyit? (g)","templateFieldId":24,"floatValue":null,"intValue":0,"boolValue":null,"stringValue":null}]},{"id":726,"millisecsFrom1970":1425272400000,"name":"\xC9tel","templateId":18,"fields":[{"id":1546,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"zab(80g),feh\xE9rje(30g),alma,ban\xE1n,aszalv\xE1ny,kefir,v\xEDz"},{"id":1547,"type":"INT","name":"mennyit? (g)","templateFieldId":24,"floatValue":null,"intValue":0,"boolValue":null,"stringValue":null}]},{"id":730,"millisecsFrom1970":1425380400000,"name":"T\xF6meg","templateId":9,"fields":[{"id":1553,"type":"FLOAT","name":"t\xF6meg (kg)","templateFieldId":1,"floatValue":76.7,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":731,"millisecsFrom1970":1425358800000,"name":"\xC9tel","templateId":18,"fields":[{"id":1554,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"zab(60g),feh\xE9rje(30g),alma,ban\xE1n,aszalv\xE1ny,kefir,v\xEDz"},{"id":1555,"type":"INT","name":"mennyit? (g)","templateFieldId":24,"floatValue":null,"intValue":0,"boolValue":null,"stringValue":null}]},{"id":732,"millisecsFrom1970":1425380400000,"name":"Evez\xE9s","templateId":34,"fields":[{"id":1556,"type":"INT","name":"ism\xE9tl\xE9s","templateFieldId":45,"floatValue":null,"intValue":6,"boolValue":null,"stringValue":null},{"id":1557,"type":"INT","name":"t\xE1rcsa","templateFieldId":46,"floatValue":null,"intValue":5,"boolValue":null,"stringValue":null},{"id":1558,"type":"INT","name":"sorozat","templateFieldId":47,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null}]},{"id":733,"millisecsFrom1970":1425376800000,"name":"\xC9tel","templateId":18,"fields":[{"id":1559,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"csirke,m\xE1j(50+50g), r\xEDzs( f\u0151zve 200g), 1 sz\xE1l hagyma,1 oldal paprika, 1 gyufa uborka, 1 db retek, 1 paradicsom,oliva,t\xF6kmag,lenmag,halolaj(1 ek),"},{"id":1560,"type":"INT","name":"mennyit? (g)","templateFieldId":24,"floatValue":null,"intValue":0,"boolValue":null,"stringValue":null}]},{"id":734,"millisecsFrom1970":1425391200000,"name":"\xC9tel","templateId":18,"fields":[{"id":1561,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"r\xEDzs( f\u0151zve 200g), 1 sz\xE1l hagyma,1 oldal paprika, 1 gyufa uborka, 1 db retek, 1 paradicsom,oliva,t\xF6kmag,lenmag,halolaj(1 ek),"},{"id":1562,"type":"INT","name":"mennyit? (g)","templateFieldId":24,"floatValue":null,"intValue":0,"boolValue":null,"stringValue":null}]},{"id":735,"millisecsFrom1970":1425407400000,"name":"\xC9tel","templateId":18,"fields":[{"id":1563,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"3 toj\xE1s, lep\xE9ny, lekv\xE1r, kefir, leves"},{"id":1564,"type":"INT","name":"mennyit? (g)","templateFieldId":24,"floatValue":null,"intValue":0,"boolValue":null,"stringValue":null}]},{"id":736,"millisecsFrom1970":1425466800000,"name":"T\xF6meg","templateId":9,"fields":[{"id":1565,"type":"FLOAT","name":"t\xF6meg (kg)","templateFieldId":1,"floatValue":76.5,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":737,"millisecsFrom1970":1425447000000,"name":"\xC9tel","templateId":18,"fields":[{"id":1566,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"ban\xE1n, kefir"},{"id":1567,"type":"INT","name":"mennyit? (g)","templateFieldId":24,"floatValue":null,"intValue":0,"boolValue":null,"stringValue":null}]},{"id":738,"millisecsFrom1970":1425457800000,"name":"\xC9tel","templateId":18,"fields":[{"id":1568,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"alma,ban\xE1n"},{"id":1569,"type":"INT","name":"mennyit? (g)","templateFieldId":24,"floatValue":null,"intValue":0,"boolValue":null,"stringValue":null}]},{"id":739,"millisecsFrom1970":1425462360000,"name":"Sz\xE9klet","templateId":17,"fields":[{"id":1570,"type":"SELECT","name":"milyen?","templateFieldId":15,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"hatalmas"}]},{"id":740,"millisecsFrom1970":1425466800000,"name":"\xC9tel","templateId":18,"fields":[{"id":1571,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"csilisbab"},{"id":1572,"type":"INT","name":"mennyit? (g)","templateFieldId":24,"floatValue":null,"intValue":0,"boolValue":null,"stringValue":null}]},{"id":742,"millisecsFrom1970":1425380400000,"name":"T\xF6meg","templateId":9,"fields":[{"id":1574,"type":"FLOAT","name":"t\xF6meg (kg)","templateFieldId":1,"floatValue":0.0,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":743,"millisecsFrom1970":1425493320000,"name":"Sz\xE9klet","templateId":17,"fields":[{"id":1575,"type":"SELECT","name":"milyen?","templateFieldId":15,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"habos"}]},{"id":744,"millisecsFrom1970":1425496200000,"name":"\xC9tel","templateId":18,"fields":[{"id":1576,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"avok\xE1d\xF3s kr\xE9m, palacsinta lekv\xE1r kaka\xF3"},{"id":1577,"type":"INT","name":"mennyit? (g)","templateFieldId":24,"floatValue":null,"intValue":0,"boolValue":null,"stringValue":null}]},{"id":745,"millisecsFrom1970":1425553200000,"name":"T\xF6meg","templateId":9,"fields":[{"id":1578,"type":"FLOAT","name":"t\xF6meg (kg)","templateFieldId":1,"floatValue":76.5,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":746,"millisecsFrom1970":1425533400000,"name":"\xC9tel","templateId":18,"fields":[{"id":1579,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"100g zab, aszalv\xE1nyok, 15g feh\xE9rje, 1k m\xE9z, v\xEDz"},{"id":1580,"type":"INT","name":"mennyit? (g)","templateFieldId":24,"floatValue":null,"intValue":0,"boolValue":null,"stringValue":null}]},{"id":747,"millisecsFrom1970":1425553200000,"name":"L\xE1btol\xE1s","templateId":11,"fields":[{"id":1581,"type":"INT","name":"ism\xE9tl\xE9s","templateFieldId":7,"floatValue":null,"intValue":7,"boolValue":null,"stringValue":null},{"id":1582,"type":"INT","name":"sorozat","templateFieldId":6,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null},{"id":1583,"type":"INT","name":"s\xFAly","templateFieldId":5,"floatValue":null,"intValue":90,"boolValue":null,"stringValue":null}]},{"id":748,"millisecsFrom1970":1425553200000,"name":"L\xE1bhajl\xEDt\xE1s","templateId":29,"fields":[{"id":1584,"type":"INT","name":"ism\xE9tl\xE9s","templateFieldId":30,"floatValue":null,"intValue":10,"boolValue":null,"stringValue":null},{"id":1585,"type":"INT","name":"sorozat","templateFieldId":31,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null},{"id":1586,"type":"INT","name":"s\xFAly","templateFieldId":32,"floatValue":null,"intValue":24,"boolValue":null,"stringValue":null}]},{"id":749,"millisecsFrom1970":1425553200000,"name":"V\xE1dli","templateId":30,"fields":[{"id":1587,"type":"INT","name":"ism\xE9tl\xE9s","templateFieldId":33,"floatValue":null,"intValue":8,"boolValue":null,"stringValue":null},{"id":1588,"type":"INT","name":"sorozat","templateFieldId":34,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null},{"id":1589,"type":"INT","name":"s\xFAly","templateFieldId":35,"floatValue":null,"intValue":190,"boolValue":null,"stringValue":null}]},{"id":750,"millisecsFrom1970":1425553200000,"name":"Tricepsz r\xFAddal","templateId":44,"fields":[{"id":1590,"type":"INT","name":"ism\xE9tl\xE9s","templateFieldId":68,"floatValue":null,"intValue":6,"boolValue":null,"stringValue":null},{"id":1591,"type":"FLOAT","name":"t\xE1rcsa","templateFieldId":69,"floatValue":0.0,"intValue":null,"boolValue":null,"stringValue":null},{"id":1592,"type":"INT","name":"sorozat","templateFieldId":70,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null}]},{"id":751,"millisecsFrom1970":1425553200000,"name":"T\xE1rogat\xE1s","templateId":10,"fields":[{"id":1593,"type":"INT","name":"ism\xE9tl\xE9s","templateFieldId":4,"floatValue":null,"intValue":9,"boolValue":null,"stringValue":null},{"id":1594,"type":"INT","name":"t\xE1rcsa","templateFieldId":2,"floatValue":null,"intValue":7,"boolValue":null,"stringValue":null},{"id":1595,"type":"INT","name":"sorozat","templateFieldId":3,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null}]},{"id":752,"millisecsFrom1970":1425553200000,"name":"Bicepsz","templateId":35,"fields":[{"id":1596,"type":"INT","name":"ism\xE9tl\xE9s","templateFieldId":48,"floatValue":null,"intValue":8,"boolValue":null,"stringValue":null},{"id":1597,"type":"INT","name":"t\xE1rcsa","templateFieldId":49,"floatValue":null,"intValue":6,"boolValue":null,"stringValue":null},{"id":1598,"type":"INT","name":"sorozat","templateFieldId":50,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null}]},{"id":753,"millisecsFrom1970":1425576600000,"name":"\xC9tel","templateId":18,"fields":[{"id":1599,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"20g feh\xE9rje, 1ek halolaj, 50-50g(\xE1fonya,szeder,m\xE1lna,eper), 40g m\xE9z, 1 ban\xE1n, v\xEDz"},{"id":1600,"type":"INT","name":"mennyit? (g)","templateFieldId":24,"floatValue":null,"intValue":0,"boolValue":null,"stringValue":null}]},{"id":754,"millisecsFrom1970":1425639600000,"name":"T\xF6meg","templateId":9,"fields":[{"id":1601,"type":"FLOAT","name":"t\xF6meg (kg)","templateFieldId":1,"floatValue":76.4,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":755,"millisecsFrom1970":1425619020000,"name":"\xC9tel","templateId":18,"fields":[{"id":1602,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"zab(100g)aszalv\xE1nyok,feh\xE9rje(20g),ek m\xE9z, magok"},{"id":1603,"type":"INT","name":"mennyit? (g)","templateFieldId":24,"floatValue":null,"intValue":0,"boolValue":null,"stringValue":null}]},{"id":758,"millisecsFrom1970":1425639600000,"name":"Szex","templateId":20,"fields":[{"id":1606,"type":"SELECT","name":"hossz","templateFieldId":18,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"\xE1tlag"},{"id":1607,"type":"SELECT","name":"kem\xE9nys\xE9g","templateFieldId":19,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":""}]},{"id":761,"millisecsFrom1970":1425627000000,"name":"\xC9tel","templateId":18,"fields":[{"id":1610,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"kefir"},{"id":1611,"type":"INT","name":"mennyit? (g)","templateFieldId":24,"floatValue":null,"intValue":0,"boolValue":null,"stringValue":null}]},{"id":762,"millisecsFrom1970":1425631200000,"name":"Sz\xE9klet","templateId":17,"fields":[{"id":1612,"type":"SELECT","name":"milyen?","templateFieldId":15,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":""}]},{"id":763,"millisecsFrom1970":1425635340000,"name":"\xC9tel","templateId":18,"fields":[{"id":1613,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"rizs(200g),m\xE1j,avok\xE1d\xF3kr\xE9m,ek olajok"},{"id":1614,"type":"INT","name":"mennyit? (g)","templateFieldId":24,"floatValue":null,"intValue":0,"boolValue":null,"stringValue":null}]},{"id":764,"millisecsFrom1970":1425708000000,"name":"Sz\xE9klet","templateId":17,"fields":[{"id":1615,"type":"SELECT","name":"milyen?","templateFieldId":15,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":""}]},{"id":765,"millisecsFrom1970":1425726000000,"name":"T\xF6meg","templateId":9,"fields":[{"id":1616,"type":"FLOAT","name":"t\xF6meg (kg)","templateFieldId":1,"floatValue":76.7,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":766,"millisecsFrom1970":1425639600000,"name":"Alkohol","templateId":21,"fields":[{"id":1617,"type":"INT","name":"mennyit?","templateFieldId":20,"floatValue":null,"intValue":5,"boolValue":null,"stringValue":null},{"id":1618,"type":"SELECT","name":"m\xE1snaposs\xE1g?","templateFieldId":86,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":""}]},{"id":767,"millisecsFrom1970":1425715200000,"name":"\xC9tel","templateId":18,"fields":[{"id":1619,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"zab(100g)aszalv\xE1nyok,feh\xE9rje(20g),ek m\xE9z, magok"},{"id":1620,"type":"INT","name":"mennyit? (g)","templateFieldId":24,"floatValue":null,"intValue":0,"boolValue":null,"stringValue":null}]},{"id":768,"millisecsFrom1970":1425812400000,"name":"T\xF6meg","templateId":9,"fields":[{"id":1621,"type":"FLOAT","name":"t\xF6meg (kg)","templateFieldId":1,"floatValue":76.4,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":769,"millisecsFrom1970":1425794400000,"name":"\xC9tel","templateId":18,"fields":[{"id":1622,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"zab(100g)aszalv\xE1nyok,feh\xE9rje(20g),ek m\xE9z, magok"},{"id":1623,"type":"INT","name":"mennyit? (g)","templateFieldId":24,"floatValue":null,"intValue":0,"boolValue":null,"stringValue":null}]},{"id":770,"millisecsFrom1970":1425553200000,"name":"Csuklya","templateId":46,"fields":[{"id":1624,"type":"INT","name":"ism\xE9tl\xE9s","templateFieldId":74,"floatValue":null,"intValue":12,"boolValue":null,"stringValue":null},{"id":1625,"type":"INT","name":"sorozat","templateFieldId":75,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null},{"id":1626,"type":"FLOAT","name":"s\xFAly","templateFieldId":76,"floatValue":15.0,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":771,"millisecsFrom1970":1425816960000,"name":"Sz\xE9klet","templateId":17,"fields":[{"id":1627,"type":"SELECT","name":"milyen?","templateFieldId":15,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":""}]}],"templates":[{"id":11,"name":"L\xE1btol\xE1s","useDateTime":false,"fields":[{"id":7,"type":"INT","name":"ism\xE9tl\xE9s","hint":null},{"id":6,"type":"INT","name":"sorozat","hint":null},{"id":5,"type":"INT","name":"s\xFAly","hint":null}]},{"id":23,"name":"Szelek","useDateTime":false,"fields":[{"id":21,"type":"SELECT","name":"t\xEDpus","hint":"zavar\xF3,enyhe"}]},{"id":12,"name":"Mellb\u0151l nyom\xE1s","useDateTime":false,"fields":[{"id":8,"type":"INT","name":"ism\xE9tl\xE9s","hint":null},{"id":9,"type":"INT","name":"t\xE1rcsa","hint":""},{"id":10,"type":"INT","name":"sorozat","hint":null}]},{"id":19,"name":"Omega3","useDateTime":false,"fields":[{"id":17,"type":"INT","name":"mennyit? (ml)","hint":null}]},{"id":24,"name":"Feh\xE9rje por","useDateTime":false,"fields":[{"id":22,"type":"INT","name":"mennyi? (g)","hint":null}]},{"id":25,"name":"Kreatin","useDateTime":false,"fields":[{"id":23,"type":"INT","name":"mennyi? (g)","hint":null}]},{"id":43,"name":"45\xB0 mell","useDateTime":false,"fields":[{"id":65,"type":"INT","name":"ism\xE9tl\xE9s","hint":null},{"id":66,"type":"FLOAT","name":"t\xE1rcsa","hint":""},{"id":67,"type":"INT","name":"sorozat","hint":null}]},{"id":44,"name":"Tricepsz r\xFAddal","useDateTime":false,"fields":[{"id":68,"type":"INT","name":"ism\xE9tl\xE9s","hint":null},{"id":69,"type":"FLOAT","name":"t\xE1rcsa","hint":""},{"id":70,"type":"INT","name":"sorozat","hint":null}]},{"id":28,"name":"V\xE1llb\xF3l nyom\xE1s","useDateTime":false,"fields":[{"id":27,"type":"INT","name":"ism\xE9tl\xE9s","hint":null},{"id":28,"type":"FLOAT","name":"sorozat","hint":null},{"id":29,"type":"INT","name":"s\xFAly","hint":null}]},{"id":45,"name":"Guggol\xE1s","useDateTime":false,"fields":[{"id":71,"type":"INT","name":"ism\xE9tl\xE9s","hint":null},{"id":72,"type":"INT","name":"sorozat","hint":null},{"id":73,"type":"FLOAT","name":"s\xFAly","hint":"egyik oldal"}]},{"id":46,"name":"Csuklya","useDateTime":false,"fields":[{"id":74,"type":"INT","name":"ism\xE9tl\xE9s","hint":null},{"id":75,"type":"INT","name":"sorozat","hint":null},{"id":76,"type":"FLOAT","name":"s\xFAly","hint":""}]},{"id":9,"name":"T\xF6meg","useDateTime":false,"fields":[{"id":1,"type":"FLOAT","name":"t\xF6meg (kg)","hint":null}]},{"id":10,"name":"T\xE1rogat\xE1s","useDateTime":false,"fields":[{"id":4,"type":"INT","name":"ism\xE9tl\xE9s","hint":null},{"id":2,"type":"INT","name":"t\xE1rcsa","hint":null},{"id":3,"type":"INT","name":"sorozat","hint":null}]},{"id":17,"name":"Sz\xE9klet","useDateTime":true,"fields":[{"id":15,"type":"SELECT","name":"milyen?","hint":"ok,nehezen,habos,fekete,hatalmas,h\xEDg"}]},{"id":21,"name":"Alkohol","useDateTime":false,"fields":[{"id":20,"type":"INT","name":"mennyit?","hint":"(feles=s\xF6r=bor)"},{"id":86,"type":"SELECT","name":"m\xE1snaposs\xE1g?","hint":"igen,nem"}]},{"id":50,"name":"M\xE9recked\xE9s","useDateTime":false,"fields":[{"id":87,"type":"FLOAT","name":"mell","hint":null},{"id":88,"type":"FLOAT","name":"bal kar","hint":null},{"id":89,"type":"FLOAT","name":"jobb kar","hint":null},{"id":90,"type":"FLOAT","name":"k\xF6ld\xF6k felett","hint":null},{"id":91,"type":"FLOAT","name":"k\xF6ld\xF6k","hint":null},{"id":92,"type":"FLOAT","name":"k\xF6ld\xF6k alatt","hint":null},{"id":93,"type":"FLOAT","name":"bal comb","hint":null},{"id":94,"type":"FLOAT","name":"jobb comb","hint":null}]},{"id":26,"name":"Hasprobl\xE9ma","useDateTime":false,"fields":[{"id":25,"type":"SELECT","name":"\xE9rz\xE9s","hint":"durrog,f\xE1j,nagyon f\xE1j,kellemetlen"}]},{"id":29,"name":"L\xE1bhajl\xEDt\xE1s","useDateTime":false,"fields":[{"id":30,"type":"INT","name":"ism\xE9tl\xE9s","hint":null},{"id":31,"type":"INT","name":"sorozat","hint":null},{"id":32,"type":"INT","name":"s\xFAly","hint":null}]},{"id":30,"name":"V\xE1dli","useDateTime":false,"fields":[{"id":33,"type":"INT","name":"ism\xE9tl\xE9s","hint":null},{"id":34,"type":"INT","name":"sorozat","hint":null},{"id":35,"type":"INT","name":"s\xFAly","hint":null}]},{"id":32,"name":"L\xE1bny\xFAjt\xE1s","useDateTime":false,"fields":[{"id":39,"type":"INT","name":"ism\xE9tl\xE9s","hint":null},{"id":40,"type":"INT","name":"sorozat","hint":null},{"id":41,"type":"INT","name":"s\xFAly","hint":null}]},{"id":33,"name":"Der\xE9kg\xE9p","useDateTime":false,"fields":[{"id":42,"type":"INT","name":"ism\xE9tl\xE9s","hint":null},{"id":43,"type":"INT","name":"sorozat","hint":null},{"id":44,"type":"INT","name":"s\xFAly","hint":null}]},{"id":34,"name":"Evez\xE9s","useDateTime":false,"fields":[{"id":45,"type":"INT","name":"ism\xE9tl\xE9s","hint":null},{"id":46,"type":"INT","name":"t\xE1rcsa","hint":null},{"id":47,"type":"INT","name":"sorozat","hint":null}]},{"id":35,"name":"Bicepsz","useDateTime":false,"fields":[{"id":48,"type":"INT","name":"ism\xE9tl\xE9s","hint":null},{"id":49,"type":"INT","name":"t\xE1rcsa","hint":null},{"id":50,"type":"INT","name":"sorozat","hint":null}]},{"id":36,"name":"Mellhez h\xFAz\xE1s","useDateTime":false,"fields":[{"id":51,"type":"INT","name":"ism\xE9tl\xE9s","hint":null},{"id":52,"type":"INT","name":"sorozat","hint":null},{"id":53,"type":"INT","name":"s\xFAly","hint":null}]},{"id":37,"name":"Karny\xFAjt\xE1s csig\xE1n","useDateTime":false,"fields":[{"id":54,"type":"INT","name":"ism\xE9tl\xE9s","hint":null},{"id":55,"type":"INT","name":"sorozat","hint":null},{"id":56,"type":"INT","name":"s\xFAly","hint":null}]},{"id":20,"name":"Szex","useDateTime":false,"fields":[{"id":18,"type":"SELECT","name":"hossz","hint":"r\xF6vid,\xE1tlag,epic"},{"id":19,"type":"SELECT","name":"kem\xE9nys\xE9g","hint":"\xE1tlag,epic,gyenge"}]},{"id":41,"name":"Oldalemel\xE9s","useDateTime":false,"fields":[{"id":62,"type":"INT","name":"ism\xE9tl\xE9s","hint":null},{"id":63,"type":"INT","name":"s\xFAly","hint":null},{"id":64,"type":"INT","name":"sorozat","hint":null}]},{"id":18,"name":"\xC9tel","useDateTime":true,"fields":[{"id":16,"type":"STRING","name":"mit?","hint":null},{"id":24,"type":"INT","name":"mennyit? (g)","hint":null}]}],"reports":[{"id":2,"name":"L\xE1b","entries":[{"id":1,"templateId":11},{"id":2,"templateId":29},{"id":3,"templateId":30},{"id":4,"templateId":32}]},{"id":3,"name":"Mell","entries":[{"id":5,"templateId":12},{"id":6,"templateId":43},{"id":7,"templateId":44},{"id":8,"templateId":10},{"id":9,"templateId":28},{"id":10,"templateId":37},{"id":11,"templateId":41}]},{"id":4,"name":"H\xE1t","entries":[{"id":12,"templateId":46},{"id":13,"templateId":36},{"id":14,"templateId":35},{"id":15,"templateId":34}]}]}');
              tmp$1 = Kotlin.modules['stdlib'].kotlin.map_rie7ol$((tmp$0 = result.templates) != null ? tmp$0 : Kotlin.throwNPE(), _.hu.nevermind.reakt.example.queryEntitiesFromServer$f);
              templates.addAll_4fm7v2$(tmp$1);
              events.addAll_4fm7v2$(Kotlin.modules['stdlib'].kotlin.map_rie7ol$((tmp$2 = result.events) != null ? tmp$2 : Kotlin.throwNPE(), _.hu.nevermind.reakt.example.queryEntitiesFromServer$f_0));
              eventFields.addAll_4fm7v2$(Kotlin.modules['stdlib'].kotlin.flatMap_i7y96e$(Kotlin.modules['stdlib'].kotlin.map_rie7ol$((tmp$3 = result.events) != null ? tmp$3 : Kotlin.throwNPE(), _.hu.nevermind.reakt.example.queryEntitiesFromServer$f_1), _.hu.nevermind.reakt.example.queryEntitiesFromServer$f_2));
              templateFields.addAll_4fm7v2$(Kotlin.modules['stdlib'].kotlin.flatMap_i7y96e$(Kotlin.modules['stdlib'].kotlin.map_rie7ol$((tmp$4 = result.templates) != null ? tmp$4 : Kotlin.throwNPE(), _.hu.nevermind.reakt.example.queryEntitiesFromServer$f_3), _.hu.nevermind.reakt.example.queryEntitiesFromServer$f_4));
              var dataFromServer = new _.hu.nevermind.timeline.DataFromServer(events, eventFields, templates, templateFields);
              _.hu.nevermind.timeline.Actions.dataFromServer.dispatch_za3rmp$(dataFromServer);
            }
          })
        }),
        timeline: Kotlin.definePackage(function () {
          this.globalLocal = new _.hu.nevermind.timeline.HuLocal();
          this.Actions = Kotlin.createObject(null, function () {
            this.dataFromServer = new _.hu.nevermind.flux.ActionDef();
            this.editEvent = new _.hu.nevermind.flux.ActionDef();
          });
        }, /** @lends _.hu.nevermind.timeline */ {
          client: Kotlin.definePackage(function () {
            this.username = '';
          }, /** @lends _.hu.nevermind.timeline.client */ {
            AjaxResult: Kotlin.createClass(null, function (status, data) {
              this.status = status;
              this.data = data;
            }, /** @lends _.hu.nevermind.timeline.client.AjaxResult.prototype */ {
              component1: function () {
                return this.status;
              },
              component2: function () {
                return this.data;
              },
              copy_eltq40$: function (status, data) {
                return new _.hu.nevermind.timeline.client.AjaxResult(status === void 0 ? this.status : status, data === void 0 ? this.data : data);
              },
              toString: function () {
                return 'AjaxResult(status=' + Kotlin.toString(this.status) + (', data=' + Kotlin.toString(this.data)) + ')';
              },
              hashCode: function () {
                var result = 0;
                result = result * 31 + Kotlin.hashCode(this.status) | 0;
                result = result * 31 + Kotlin.hashCode(this.data) | 0;
                return result;
              },
              equals_za3rmp$: function (other) {
                return this === other || (other !== null && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.status, other.status) && Kotlin.equals(this.data, other.data))));
              }
            }),
            Sendable: Kotlin.createTrait(null),
            sendCommand_dz45tr$f: function (resultHandler) {
              return function (result) {
                if (result.status) {
                  resultHandler(result.data);
                }
                 else {
                  throw new Kotlin.Exception('Ajax Error');
                }
              };
            },
            sendCommand_dz45tr$: function (command, msg, resultHandler) {
              _.net.yested.ajaxPost_f0flkx$(new _.net.yested.AjaxRequest('/ajax/ajax/', void 0, JSON.stringify(Kotlin.createObject(null, function () {
                this.command = command;
                this.entity = msg.toServerSideObj();
                this.user = _.hu.nevermind.timeline.client.username;
              })), void 0, void 0, _.hu.nevermind.timeline.client.sendCommand_dz45tr$f(resultHandler)));
            }
          }),
          LocalizationEntry: Kotlin.createClass(null, function (name, localizationGenerator) {
            this.name = name;
            this.localizationGenerator = localizationGenerator;
          }, /** @lends _.hu.nevermind.timeline.LocalizationEntry.prototype */ {
            getLocalizedText_umf9ht$: function (local) {
              return this.localizationGenerator(local);
            },
            component1: function () {
              return this.name;
            },
            component2: function () {
              return this.localizationGenerator;
            },
            copy_ctdwip$: function (name, localizationGenerator) {
              return new _.hu.nevermind.timeline.LocalizationEntry(name === void 0 ? this.name : name, localizationGenerator === void 0 ? this.localizationGenerator : localizationGenerator);
            },
            toString: function () {
              return 'LocalizationEntry(name=' + Kotlin.toString(this.name) + (', localizationGenerator=' + Kotlin.toString(this.localizationGenerator)) + ')';
            },
            hashCode: function () {
              var result = 0;
              result = result * 31 + Kotlin.hashCode(this.name) | 0;
              result = result * 31 + Kotlin.hashCode(this.localizationGenerator) | 0;
              return result;
            },
            equals_za3rmp$: function (other) {
              return this === other || (other !== null && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.name, other.name) && Kotlin.equals(this.localizationGenerator, other.localizationGenerator))));
            }
          }),
          Local: Kotlin.createTrait(null, null, /** @lends _.hu.nevermind.timeline.Local */ {
            Local$f: function (it) {
              return it.eventFieldInt;
            },
            Local$f_0: function (it) {
              return it.eventFieldFloat;
            },
            Local$f_1: function (it) {
              return it.eventFieldString;
            },
            Local$f_2: function (it) {
              return it.eventFieldTextArea;
            },
            Local$f_3: function (it) {
              return it.eventFieldSelect;
            },
            object_initializer$: function () {
              return Kotlin.createObject(null, function () {
                this.eventFieldInt = new _.hu.nevermind.timeline.LocalizationEntry('event.field.int', _.hu.nevermind.timeline.Local.Local$f);
                this.eventFieldFloat = new _.hu.nevermind.timeline.LocalizationEntry('event.field.float', _.hu.nevermind.timeline.Local.Local$f_0);
                this.eventFieldString = new _.hu.nevermind.timeline.LocalizationEntry('event.field.string', _.hu.nevermind.timeline.Local.Local$f_1);
                this.eventFieldTextArea = new _.hu.nevermind.timeline.LocalizationEntry('event.field.textArea', _.hu.nevermind.timeline.Local.Local$f_2);
                this.eventFieldSelect = new _.hu.nevermind.timeline.LocalizationEntry('event.field.select', _.hu.nevermind.timeline.Local.Local$f_3);
              });
            }
          }),
          HuLocal: Kotlin.createClass(function () {
            return [_.hu.nevermind.timeline.Local];
          }, function () {
            this.$eventFieldInt_7fqcub$ = 'Eg\xE9sz sz\xE1m';
            this.$eventFieldFloat_r7hfkg$ = 'Val\xF3s sz\xE1m';
            this.$eventFieldString_f7drst$ = 'Sz\xF6veg';
            this.$eventFieldTextArea_4fz7t2$ = 'Sz\xF6vegdoboz';
            this.$eventFieldSelect_ez0xrc$ = 'V\xE1laszt\xF3mez\u0151';
          }, /** @lends _.hu.nevermind.timeline.HuLocal.prototype */ {
            eventFieldInt: {
              get: function () {
                return this.$eventFieldInt_7fqcub$;
              }
            },
            eventFieldFloat: {
              get: function () {
                return this.$eventFieldFloat_r7hfkg$;
              }
            },
            eventFieldString: {
              get: function () {
                return this.$eventFieldString_f7drst$;
              }
            },
            eventFieldTextArea: {
              get: function () {
                return this.$eventFieldTextArea_4fz7t2$;
              }
            },
            eventFieldSelect: {
              get: function () {
                return this.$eventFieldSelect_ez0xrc$;
              }
            }
          }),
          DataFromServer: Kotlin.createClass(null, function (events, eventFields, templates, templateFields) {
            this.events = events;
            this.eventFields = eventFields;
            this.templates = templates;
            this.templateFields = templateFields;
          }, /** @lends _.hu.nevermind.timeline.DataFromServer.prototype */ {
            component1: function () {
              return this.events;
            },
            component2: function () {
              return this.eventFields;
            },
            component3: function () {
              return this.templates;
            },
            component4: function () {
              return this.templateFields;
            },
            copy_1irf4v$: function (events, eventFields, templates, templateFields) {
              return new _.hu.nevermind.timeline.DataFromServer(events === void 0 ? this.events : events, eventFields === void 0 ? this.eventFields : eventFields, templates === void 0 ? this.templates : templates, templateFields === void 0 ? this.templateFields : templateFields);
            },
            toString: function () {
              return 'DataFromServer(events=' + Kotlin.toString(this.events) + (', eventFields=' + Kotlin.toString(this.eventFields)) + (', templates=' + Kotlin.toString(this.templates)) + (', templateFields=' + Kotlin.toString(this.templateFields)) + ')';
            },
            hashCode: function () {
              var result = 0;
              result = result * 31 + Kotlin.hashCode(this.events) | 0;
              result = result * 31 + Kotlin.hashCode(this.eventFields) | 0;
              result = result * 31 + Kotlin.hashCode(this.templates) | 0;
              result = result * 31 + Kotlin.hashCode(this.templateFields) | 0;
              return result;
            },
            equals_za3rmp$: function (other) {
              return this === other || (other !== null && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.events, other.events) && Kotlin.equals(this.eventFields, other.eventFields) && Kotlin.equals(this.templates, other.templates) && Kotlin.equals(this.templateFields, other.templateFields))));
            }
          }),
          EditEvent: Kotlin.createClass(null, function (event, fields) {
            this.event = event;
            this.fields = fields;
          }, /** @lends _.hu.nevermind.timeline.EditEvent.prototype */ {
            component1: function () {
              return this.event;
            },
            component2: function () {
              return this.fields;
            },
            copy_c7vwbs$: function (event, fields) {
              return new _.hu.nevermind.timeline.EditEvent(event === void 0 ? this.event : event, fields === void 0 ? this.fields : fields);
            },
            toString: function () {
              return 'EditEvent(event=' + Kotlin.toString(this.event) + (', fields=' + Kotlin.toString(this.fields)) + ')';
            },
            hashCode: function () {
              var result = 0;
              result = result * 31 + Kotlin.hashCode(this.event) | 0;
              result = result * 31 + Kotlin.hashCode(this.fields) | 0;
              return result;
            },
            equals_za3rmp$: function (other) {
              return this === other || (other !== null && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.event, other.event) && Kotlin.equals(this.fields, other.fields))));
            }
          }),
          entities: Kotlin.definePackage(null, /** @lends _.hu.nevermind.timeline.entities */ {
            EventFieldType: Kotlin.createEnumClass(function () {
              return [Kotlin.Enum];
            }, function $fun(localizationKey) {
              $fun.baseInitializer.call(this);
              this.localizationKey = localizationKey;
            }, function () {
              return {
                INT: new _.hu.nevermind.timeline.entities.EventFieldType(_.hu.nevermind.timeline.Local.object.eventFieldInt),
                FLOAT: new _.hu.nevermind.timeline.entities.EventFieldType(_.hu.nevermind.timeline.Local.object.eventFieldFloat),
                STRING: new _.hu.nevermind.timeline.entities.EventFieldType(_.hu.nevermind.timeline.Local.object.eventFieldString),
                TEXTAREA: new _.hu.nevermind.timeline.entities.EventFieldType(_.hu.nevermind.timeline.Local.object.eventFieldTextArea),
                SELECT: new _.hu.nevermind.timeline.entities.EventFieldType(_.hu.nevermind.timeline.Local.object.eventFieldSelect)
              };
            }),
            EventTemplate: Kotlin.createClass(function () {
              return [_.hu.nevermind.timeline.client.Sendable];
            }, function (id, name, useDateTime, fieldIds) {
              this.id = id;
              this.name = name;
              this.useDateTime = useDateTime;
              this.fieldIds = fieldIds;
            }, /** @lends _.hu.nevermind.timeline.entities.EventTemplate.prototype */ {
              toServerSideObj: function () {
                return _.hu.nevermind.timeline.entities.EventTemplate.toServerSideObj$f(this);
              },
              component1: function () {
                return this.id;
              },
              component2: function () {
                return this.name;
              },
              component3: function () {
                return this.useDateTime;
              },
              component4: function () {
                return this.fieldIds;
              },
              copy_u1jt6d$: function (id, name, useDateTime, fieldIds) {
                return new _.hu.nevermind.timeline.entities.EventTemplate(id === void 0 ? this.id : id, name === void 0 ? this.name : name, useDateTime === void 0 ? this.useDateTime : useDateTime, fieldIds === void 0 ? this.fieldIds : fieldIds);
              },
              toString: function () {
                return 'EventTemplate(id=' + Kotlin.toString(this.id) + (', name=' + Kotlin.toString(this.name)) + (', useDateTime=' + Kotlin.toString(this.useDateTime)) + (', fieldIds=' + Kotlin.toString(this.fieldIds)) + ')';
              },
              hashCode: function () {
                var result = 0;
                result = result * 31 + Kotlin.hashCode(this.id) | 0;
                result = result * 31 + Kotlin.hashCode(this.name) | 0;
                result = result * 31 + Kotlin.hashCode(this.useDateTime) | 0;
                result = result * 31 + Kotlin.hashCode(this.fieldIds) | 0;
                return result;
              },
              equals_za3rmp$: function (other) {
                return this === other || (other !== null && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.id, other.id) && Kotlin.equals(this.name, other.name) && Kotlin.equals(this.useDateTime, other.useDateTime) && Kotlin.equals(this.fieldIds, other.fieldIds))));
              }
            }, /** @lends _.hu.nevermind.timeline.entities.EventTemplate */ {
              f: function (id) {
                var field = _.hu.nevermind.timeline.store.TemplateFieldStore.get(id);
                return field.toServerSideObj();
              },
              toServerSideObj$f: function (this$EventTemplate) {
                return Kotlin.createObject(null, function () {
                  var tmp$0;
                  tmp$0 = Kotlin.modules['stdlib'].kotlin.map_m3yiqg$(this$EventTemplate.fieldIds, _.hu.nevermind.timeline.entities.EventTemplate.f);
                  this.id = this$EventTemplate.id.id;
                  this.name = this$EventTemplate.name;
                  this.fields = tmp$0;
                  this.useDateTime = this$EventTemplate.useDateTime;
                });
              },
              fromJson_za3rmp$f: function (field) {
                return _.hu.nevermind.timeline.entities.EventTemplateField.object.fromJson(field);
              },
              fromJson_za3rmp$f_0: function (it) {
                return it.id;
              },
              object_initializer$: function () {
                return Kotlin.createObject(null, null, {
                  fromJson_za3rmp$: function (template) {
                    var tmp$0, tmp$1, tmp$2;
                    tmp$1 = Kotlin.modules['stdlib'].kotlin.map_rie7ol$((tmp$0 = template.fields) != null ? tmp$0 : Kotlin.throwNPE(), _.hu.nevermind.timeline.entities.EventTemplate.fromJson_za3rmp$f);
                    var fields = tmp$1;
                    tmp$2 = Kotlin.modules['stdlib'].kotlin.map_m3yiqg$(fields, _.hu.nevermind.timeline.entities.EventTemplate.fromJson_za3rmp$f_0);
                    var fieldIds = tmp$2;
                    return new _.hu.nevermind.timeline.entities.EventTemplate(new _.hu.nevermind.timeline.entities.Id(template.id), template.name, template.useDateTime, Kotlin.modules['stdlib'].kotlin.toArrayList_ir3nkc$(fieldIds));
                  }
                });
              }
            }),
            EventTemplateField: Kotlin.createClass(null, function (id, name, type, hint) {
              this.id = id;
              this.name = name;
              this.type = type;
              this.hint = hint;
            }, /** @lends _.hu.nevermind.timeline.entities.EventTemplateField.prototype */ {
              toServerSideObj: function () {
                return _.hu.nevermind.timeline.entities.EventTemplateField.toServerSideObj$f(this);
              },
              component1: function () {
                return this.id;
              },
              component2: function () {
                return this.name;
              },
              component3: function () {
                return this.type;
              },
              component4: function () {
                return this.hint;
              },
              copy: function (id, name, type, hint) {
                return new _.hu.nevermind.timeline.entities.EventTemplateField(id === void 0 ? this.id : id, name === void 0 ? this.name : name, type === void 0 ? this.type : type, hint === void 0 ? this.hint : hint);
              },
              toString: function () {
                return 'EventTemplateField(id=' + Kotlin.toString(this.id) + (', name=' + Kotlin.toString(this.name)) + (', type=' + Kotlin.toString(this.type)) + (', hint=' + Kotlin.toString(this.hint)) + ')';
              },
              hashCode: function () {
                var result = 0;
                result = result * 31 + Kotlin.hashCode(this.id) | 0;
                result = result * 31 + Kotlin.hashCode(this.name) | 0;
                result = result * 31 + Kotlin.hashCode(this.type) | 0;
                result = result * 31 + Kotlin.hashCode(this.hint) | 0;
                return result;
              },
              equals_za3rmp$: function (other) {
                return this === other || (other !== null && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.id, other.id) && Kotlin.equals(this.name, other.name) && Kotlin.equals(this.type, other.type) && Kotlin.equals(this.hint, other.hint))));
              }
            }, /** @lends _.hu.nevermind.timeline.entities.EventTemplateField */ {
              toServerSideObj$f: function (this$EventTemplateField) {
                return Kotlin.createObject(null, function () {
                  this.id = this$EventTemplateField.id.id;
                  this.name = this$EventTemplateField.name;
                  this.type = this$EventTemplateField.type.name();
                  this.hint = this$EventTemplateField.hint;
                });
              },
              object_initializer$: function () {
                return Kotlin.createObject(null, null, {
                  fromJson: function (field) {
                    return new _.hu.nevermind.timeline.entities.EventTemplateField(new _.hu.nevermind.timeline.entities.Id(field.id), field.name, _.hu.nevermind.timeline.entities.EventFieldType.valueOf_61zpoe$(field.type), field.hint);
                  }
                });
              }
            }),
            ReportDescription: Kotlin.createClass(function () {
              return [_.hu.nevermind.timeline.client.Sendable];
            }, function (id, name, connectedTemplates) {
              this.id = id;
              this.name = name;
              this.connectedTemplates = connectedTemplates;
            }, /** @lends _.hu.nevermind.timeline.entities.ReportDescription.prototype */ {
              toServerSideObj: function () {
                return _.hu.nevermind.timeline.entities.ReportDescription.toServerSideObj$f(this);
              },
              component1: function () {
                return this.id;
              },
              component2: function () {
                return this.name;
              },
              component3: function () {
                return this.connectedTemplates;
              },
              copy_3uwrvd$: function (id, name, connectedTemplates) {
                return new _.hu.nevermind.timeline.entities.ReportDescription(id === void 0 ? this.id : id, name === void 0 ? this.name : name, connectedTemplates === void 0 ? this.connectedTemplates : connectedTemplates);
              },
              toString: function () {
                return 'ReportDescription(id=' + Kotlin.toString(this.id) + (', name=' + Kotlin.toString(this.name)) + (', connectedTemplates=' + Kotlin.toString(this.connectedTemplates)) + ')';
              },
              hashCode: function () {
                var result = 0;
                result = result * 31 + Kotlin.hashCode(this.id) | 0;
                result = result * 31 + Kotlin.hashCode(this.name) | 0;
                result = result * 31 + Kotlin.hashCode(this.connectedTemplates) | 0;
                return result;
              },
              equals_za3rmp$: function (other) {
                return this === other || (other !== null && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.id, other.id) && Kotlin.equals(this.name, other.name) && Kotlin.equals(this.connectedTemplates, other.connectedTemplates))));
              }
            }, /** @lends _.hu.nevermind.timeline.entities.ReportDescription */ {
              f: function (it) {
                return it.id;
              },
              toServerSideObj$f: function (this$ReportDescription) {
                return Kotlin.createObject(null, function () {
                  var tmp$0;
                  tmp$0 = Kotlin.modules['stdlib'].kotlin.map_m3yiqg$(this$ReportDescription.connectedTemplates, _.hu.nevermind.timeline.entities.ReportDescription.f);
                  this.id = this$ReportDescription.id.id;
                  this.name = this$ReportDescription.name;
                  this.templateIds = tmp$0;
                });
              },
              f_0: function (templateId) {
                return function (it) {
                  return Kotlin.equals(it.id, templateId);
                };
              },
              fromJson_xoz0db$f: function (templates) {
                return function (reportDescrEntry) {
                  var tmp$0;
                  var templateId = reportDescrEntry.templateId;
                  tmp$0 = Kotlin.modules['stdlib'].kotlin.filter_azvtw4$(templates, _.hu.nevermind.timeline.entities.ReportDescription.f_0(templateId));
                  return Kotlin.modules['stdlib'].kotlin.first_fvq2g0$(tmp$0);
                };
              },
              object_initializer$: function () {
                return Kotlin.createObject(null, null, {
                  fromJson_xoz0db$: function (templates, report) {
                    var tmp$0, tmp$1;
                    var name = report.name;
                    tmp$1 = Kotlin.modules['stdlib'].kotlin.map_rie7ol$((tmp$0 = report.entries) != null ? tmp$0 : Kotlin.throwNPE(), _.hu.nevermind.timeline.entities.ReportDescription.fromJson_xoz0db$f(templates));
                    var connectedTemplates = tmp$1;
                    return new _.hu.nevermind.timeline.entities.ReportDescription(new _.hu.nevermind.timeline.entities.Id(report.id), name, connectedTemplates);
                  }
                });
              }
            }),
            EventInstance: Kotlin.createClass(function () {
              return [_.hu.nevermind.timeline.client.Sendable];
            }, function (id, name, fieldIds, date, comment, templateId, tags) {
              this.id = id;
              this.name = name;
              this.fieldIds = fieldIds;
              this.date = date;
              this.comment = comment;
              this.templateId = templateId;
              this.tags = tags;
            }, /** @lends _.hu.nevermind.timeline.entities.EventInstance.prototype */ {
              toServerSideObj: function () {
                return _.hu.nevermind.timeline.entities.EventInstance.toServerSideObj$f(this);
              },
              component1: function () {
                return this.id;
              },
              component2: function () {
                return this.name;
              },
              component3: function () {
                return this.fieldIds;
              },
              component4: function () {
                return this.date;
              },
              component5: function () {
                return this.comment;
              },
              component6: function () {
                return this.templateId;
              },
              component7: function () {
                return this.tags;
              },
              copy_42hub2$: function (id, name, fieldIds, date, comment, templateId, tags) {
                return new _.hu.nevermind.timeline.entities.EventInstance(id === void 0 ? this.id : id, name === void 0 ? this.name : name, fieldIds === void 0 ? this.fieldIds : fieldIds, date === void 0 ? this.date : date, comment === void 0 ? this.comment : comment, templateId === void 0 ? this.templateId : templateId, tags === void 0 ? this.tags : tags);
              },
              toString: function () {
                return 'EventInstance(id=' + Kotlin.toString(this.id) + (', name=' + Kotlin.toString(this.name)) + (', fieldIds=' + Kotlin.toString(this.fieldIds)) + (', date=' + Kotlin.toString(this.date)) + (', comment=' + Kotlin.toString(this.comment)) + (', templateId=' + Kotlin.toString(this.templateId)) + (', tags=' + Kotlin.toString(this.tags)) + ')';
              },
              hashCode: function () {
                var result = 0;
                result = result * 31 + Kotlin.hashCode(this.id) | 0;
                result = result * 31 + Kotlin.hashCode(this.name) | 0;
                result = result * 31 + Kotlin.hashCode(this.fieldIds) | 0;
                result = result * 31 + Kotlin.hashCode(this.date) | 0;
                result = result * 31 + Kotlin.hashCode(this.comment) | 0;
                result = result * 31 + Kotlin.hashCode(this.templateId) | 0;
                result = result * 31 + Kotlin.hashCode(this.tags) | 0;
                return result;
              },
              equals_za3rmp$: function (other) {
                return this === other || (other !== null && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.id, other.id) && Kotlin.equals(this.name, other.name) && Kotlin.equals(this.fieldIds, other.fieldIds) && Kotlin.equals(this.date, other.date) && Kotlin.equals(this.comment, other.comment) && Kotlin.equals(this.templateId, other.templateId) && Kotlin.equals(this.tags, other.tags))));
              }
            }, /** @lends _.hu.nevermind.timeline.entities.EventInstance */ {
              f: function (id) {
                var field = _.hu.nevermind.timeline.store.EventFieldStore.get(id);
                return field.toServerSideObj();
              },
              toServerSideObj$f: function (this$EventInstance) {
                return Kotlin.createObject(null, function () {
                  var tmp$0, tmp$1;
                  tmp$0 = Kotlin.modules['stdlib'].kotlin.map_m3yiqg$(this$EventInstance.fieldIds, _.hu.nevermind.timeline.entities.EventInstance.f);
                  this.id = this$EventInstance.id.id;
                  this.name = this$EventInstance.name;
                  this.millisecsFrom1970 = this$EventInstance.date.millisecondsSinceUnixEpoch;
                  this.comment = this$EventInstance.comment;
                  this.fields = tmp$0;
                  this.tags = this$EventInstance.tags;
                  this.templateId = (tmp$1 = this$EventInstance.templateId) != null ? tmp$1.id : null;
                });
              },
              fromJson_za3rmp$f: function (field) {
                return _.hu.nevermind.timeline.entities.EventField.object.fromJson_6gt5xa$(field);
              },
              fromJson_za3rmp$f_0: function (it) {
                return it.id;
              },
              object_initializer$: function () {
                return Kotlin.createObject(null, null, {
                  fromJson_za3rmp$: function (event) {
                    var tmp$0, tmp$1, tmp$2;
                    var templateId = new _.hu.nevermind.timeline.entities.Id(event.templateId);
                    tmp$1 = Kotlin.modules['stdlib'].kotlin.map_rie7ol$((tmp$0 = event.fields) != null ? tmp$0 : Kotlin.throwNPE(), _.hu.nevermind.timeline.entities.EventInstance.fromJson_za3rmp$f);
                    var fields = tmp$1;
                    tmp$2 = Kotlin.modules['stdlib'].kotlin.map_m3yiqg$(fields, _.hu.nevermind.timeline.entities.EventInstance.fromJson_za3rmp$f_0);
                    var fieldIds = tmp$2;
                    var date = _.net.yested.utils.Moment.object.parseMillisecondsSinceUnixEpoch_s8cxhz$(event.millisecsFrom1970);
                    return new _.hu.nevermind.timeline.entities.EventInstance(new _.hu.nevermind.timeline.entities.Id(event.id), event.name, fieldIds, date, event.comment, templateId, null);
                  }
                });
              }
            }),
            EventFieldFromServer: Kotlin.createClass(null, function (id, type, name, templateFieldId, floatValue, intValue, boolValue, stringValue) {
              this.id = id;
              this.type = type;
              this.name = name;
              this.templateFieldId = templateFieldId;
              this.floatValue = floatValue;
              this.intValue = intValue;
              this.boolValue = boolValue;
              this.stringValue = stringValue;
            }, /** @lends _.hu.nevermind.timeline.entities.EventFieldFromServer.prototype */ {
              component1: function () {
                return this.id;
              },
              component2: function () {
                return this.type;
              },
              component3: function () {
                return this.name;
              },
              component4: function () {
                return this.templateFieldId;
              },
              component5: function () {
                return this.floatValue;
              },
              component6: function () {
                return this.intValue;
              },
              component7: function () {
                return this.boolValue;
              },
              component8: function () {
                return this.stringValue;
              },
              copy_fchoe6$: function (id, type, name, templateFieldId, floatValue, intValue, boolValue, stringValue) {
                return new _.hu.nevermind.timeline.entities.EventFieldFromServer(id === void 0 ? this.id : id, type === void 0 ? this.type : type, name === void 0 ? this.name : name, templateFieldId === void 0 ? this.templateFieldId : templateFieldId, floatValue === void 0 ? this.floatValue : floatValue, intValue === void 0 ? this.intValue : intValue, boolValue === void 0 ? this.boolValue : boolValue, stringValue === void 0 ? this.stringValue : stringValue);
              },
              toString: function () {
                return 'EventFieldFromServer(id=' + Kotlin.toString(this.id) + (', type=' + Kotlin.toString(this.type)) + (', name=' + Kotlin.toString(this.name)) + (', templateFieldId=' + Kotlin.toString(this.templateFieldId)) + (', floatValue=' + Kotlin.toString(this.floatValue)) + (', intValue=' + Kotlin.toString(this.intValue)) + (', boolValue=' + Kotlin.toString(this.boolValue)) + (', stringValue=' + Kotlin.toString(this.stringValue)) + ')';
              },
              hashCode: function () {
                var result = 0;
                result = result * 31 + Kotlin.hashCode(this.id) | 0;
                result = result * 31 + Kotlin.hashCode(this.type) | 0;
                result = result * 31 + Kotlin.hashCode(this.name) | 0;
                result = result * 31 + Kotlin.hashCode(this.templateFieldId) | 0;
                result = result * 31 + Kotlin.hashCode(this.floatValue) | 0;
                result = result * 31 + Kotlin.hashCode(this.intValue) | 0;
                result = result * 31 + Kotlin.hashCode(this.boolValue) | 0;
                result = result * 31 + Kotlin.hashCode(this.stringValue) | 0;
                return result;
              },
              equals_za3rmp$: function (other) {
                return this === other || (other !== null && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.id, other.id) && Kotlin.equals(this.type, other.type) && Kotlin.equals(this.name, other.name) && Kotlin.equals(this.templateFieldId, other.templateFieldId) && Kotlin.equals(this.floatValue, other.floatValue) && Kotlin.equals(this.intValue, other.intValue) && Kotlin.equals(this.boolValue, other.boolValue) && Kotlin.equals(this.stringValue, other.stringValue))));
              }
            }),
            Id: Kotlin.createClass(null, function (id) {
              this.id = id;
            }, /** @lends _.hu.nevermind.timeline.entities.Id.prototype */ {
              component1: function () {
                return this.id;
              },
              copy_za3lpa$: function (id) {
                return new _.hu.nevermind.timeline.entities.Id(id === void 0 ? this.id : id);
              },
              toString: function () {
                return 'Id(id=' + Kotlin.toString(this.id) + ')';
              },
              hashCode: function () {
                var result = 0;
                result = result * 31 + Kotlin.hashCode(this.id) | 0;
                return result;
              },
              equals_za3rmp$: function (other) {
                return this === other || (other !== null && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && Kotlin.equals(this.id, other.id)));
              }
            }),
            EventField: Kotlin.createClass(null, function (id, name, fieldValue, type, templateFieldId) {
              this.id = id;
              this.name = name;
              this.fieldValue = fieldValue;
              this.type = type;
              this.templateFieldId = templateFieldId;
            }, /** @lends _.hu.nevermind.timeline.entities.EventField.prototype */ {
              toServerSideObj: function () {
                return _.hu.nevermind.timeline.entities.EventField.toServerSideObj$f(this);
              },
              component1: function () {
                return this.id;
              },
              component2: function () {
                return this.name;
              },
              component3: function () {
                return this.fieldValue;
              },
              component4: function () {
                return this.type;
              },
              component5: function () {
                return this.templateFieldId;
              },
              copy_a9rcoo$: function (id, name, fieldValue, type, templateFieldId) {
                return new _.hu.nevermind.timeline.entities.EventField(id === void 0 ? this.id : id, name === void 0 ? this.name : name, fieldValue === void 0 ? this.fieldValue : fieldValue, type === void 0 ? this.type : type, templateFieldId === void 0 ? this.templateFieldId : templateFieldId);
              },
              toString: function () {
                return 'EventField(id=' + Kotlin.toString(this.id) + (', name=' + Kotlin.toString(this.name)) + (', fieldValue=' + Kotlin.toString(this.fieldValue)) + (', type=' + Kotlin.toString(this.type)) + (', templateFieldId=' + Kotlin.toString(this.templateFieldId)) + ')';
              },
              hashCode: function () {
                var result = 0;
                result = result * 31 + Kotlin.hashCode(this.id) | 0;
                result = result * 31 + Kotlin.hashCode(this.name) | 0;
                result = result * 31 + Kotlin.hashCode(this.fieldValue) | 0;
                result = result * 31 + Kotlin.hashCode(this.type) | 0;
                result = result * 31 + Kotlin.hashCode(this.templateFieldId) | 0;
                return result;
              },
              equals_za3rmp$: function (other) {
                return this === other || (other !== null && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.id, other.id) && Kotlin.equals(this.name, other.name) && Kotlin.equals(this.fieldValue, other.fieldValue) && Kotlin.equals(this.type, other.type) && Kotlin.equals(this.templateFieldId, other.templateFieldId))));
              }
            }, /** @lends _.hu.nevermind.timeline.entities.EventField */ {
              toServerSideObj$f: function (this$EventField) {
                return Kotlin.createObject(null, function () {
                  var tmp$0;
                  this.id = this$EventField.id.id;
                  this.name = this$EventField.name;
                  this.value = this$EventField.fieldValue;
                  this.type = this$EventField.type.name();
                  this.templateFieldId = (tmp$0 = this$EventField.templateFieldId) != null ? tmp$0.id : null;
                });
              },
              object_initializer$: function () {
                return Kotlin.createObject(null, null, {
                  fromJson_6gt5xa$: function (field) {
                    var tmp$0, tmp$1;
                    tmp$0 = _.hu.nevermind.timeline.entities.EventFieldType.valueOf_61zpoe$(field.type);
                    if (tmp$0 === _.hu.nevermind.timeline.entities.EventFieldType.object.INT)
                      tmp$1 = new _.hu.nevermind.timeline.entities.EventField(new _.hu.nevermind.timeline.entities.Id(field.id), field.name, field.intValue, _.hu.nevermind.timeline.entities.EventFieldType.object.INT, new _.hu.nevermind.timeline.entities.Id(field.templateFieldId));
                    else if (tmp$0 === _.hu.nevermind.timeline.entities.EventFieldType.object.FLOAT)
                      tmp$1 = new _.hu.nevermind.timeline.entities.EventField(new _.hu.nevermind.timeline.entities.Id(field.id), field.name, field.floatValue, _.hu.nevermind.timeline.entities.EventFieldType.object.FLOAT, new _.hu.nevermind.timeline.entities.Id(field.templateFieldId));
                    else if (tmp$0 === _.hu.nevermind.timeline.entities.EventFieldType.object.STRING)
                      tmp$1 = new _.hu.nevermind.timeline.entities.EventField(new _.hu.nevermind.timeline.entities.Id(field.id), field.name, field.stringValue, _.hu.nevermind.timeline.entities.EventFieldType.object.STRING, new _.hu.nevermind.timeline.entities.Id(field.templateFieldId));
                    else if (tmp$0 === _.hu.nevermind.timeline.entities.EventFieldType.object.SELECT)
                      tmp$1 = new _.hu.nevermind.timeline.entities.EventField(new _.hu.nevermind.timeline.entities.Id(field.id), field.name, field.stringValue, _.hu.nevermind.timeline.entities.EventFieldType.object.SELECT, new _.hu.nevermind.timeline.entities.Id(field.templateFieldId));
                    else if (tmp$0 === _.hu.nevermind.timeline.entities.EventFieldType.object.TEXTAREA)
                      tmp$1 = new _.hu.nevermind.timeline.entities.EventField(new _.hu.nevermind.timeline.entities.Id(field.id), field.name, field.stringValue, _.hu.nevermind.timeline.entities.EventFieldType.object.TEXTAREA, new _.hu.nevermind.timeline.entities.Id(field.templateFieldId));
                    return tmp$1;
                  },
                  createFieldFromTemplate_ilmkc7$: function (eventTemplateField) {
                    var tmp$0, tmp$1;
                    tmp$0 = eventTemplateField.type;
                    if (tmp$0 === _.hu.nevermind.timeline.entities.EventFieldType.object.INT)
                      tmp$1 = new _.hu.nevermind.timeline.entities.EventField(new _.hu.nevermind.timeline.entities.Id(0), eventTemplateField.name, 0, _.hu.nevermind.timeline.entities.EventFieldType.object.INT, eventTemplateField.id);
                    else if (tmp$0 === _.hu.nevermind.timeline.entities.EventFieldType.object.FLOAT)
                      tmp$1 = new _.hu.nevermind.timeline.entities.EventField(new _.hu.nevermind.timeline.entities.Id(0), eventTemplateField.name, 0.0, _.hu.nevermind.timeline.entities.EventFieldType.object.FLOAT, eventTemplateField.id);
                    else if (tmp$0 === _.hu.nevermind.timeline.entities.EventFieldType.object.STRING)
                      tmp$1 = new _.hu.nevermind.timeline.entities.EventField(new _.hu.nevermind.timeline.entities.Id(0), eventTemplateField.name, '', _.hu.nevermind.timeline.entities.EventFieldType.object.STRING, eventTemplateField.id);
                    else if (tmp$0 === _.hu.nevermind.timeline.entities.EventFieldType.object.SELECT)
                      tmp$1 = new _.hu.nevermind.timeline.entities.EventField(new _.hu.nevermind.timeline.entities.Id(0), eventTemplateField.name, '', _.hu.nevermind.timeline.entities.EventFieldType.object.SELECT, eventTemplateField.id);
                    else if (tmp$0 === _.hu.nevermind.timeline.entities.EventFieldType.object.TEXTAREA)
                      tmp$1 = new _.hu.nevermind.timeline.entities.EventField(new _.hu.nevermind.timeline.entities.Id(0), eventTemplateField.name, '', _.hu.nevermind.timeline.entities.EventFieldType.object.TEXTAREA, eventTemplateField.id);
                    return tmp$1;
                  }
                });
              }
            })
          }),
          store: Kotlin.definePackage(function () {
            this.EventFieldStore = Kotlin.createObject(function () {
              return [_.hu.nevermind.flux.Store];
            }, function $fun() {
              $fun.baseInitializer.call(this);
              this.register_x5ky9g$(_.hu.nevermind.timeline.Actions.dataFromServer, _.hu.nevermind.timeline.store.EventFieldStore$f(this));
              this.register_x5ky9g$(_.hu.nevermind.timeline.Actions.editEvent, _.hu.nevermind.timeline.store.EventFieldStore$f_0(this));
              this.fields_ljscr5$ = Kotlin.modules['stdlib'].kotlin.hashMapOf_eoa9s7$([]);
            }, {
              get: function (id) {
                var tmp$0;
                tmp$0 = Kotlin.modules['stdlib'].kotlin.getOrElse_lphkgk$(this.fields_ljscr5$, id, _.hu.nevermind.timeline.store.get$f(id));
                return tmp$0;
              },
              getFields: function () {
                return this.fields_ljscr5$;
              }
            });
            this.EventStore = Kotlin.createObject(function () {
              return [_.hu.nevermind.flux.Store];
            }, function $fun() {
              $fun.baseInitializer.call(this);
              this.register_x5ky9g$(_.hu.nevermind.timeline.Actions.dataFromServer, _.hu.nevermind.timeline.store.EventStore$f(this));
              this.register_x5ky9g$(_.hu.nevermind.timeline.Actions.editEvent, _.hu.nevermind.timeline.store.EventStore$f_0(this));
              this.events = Kotlin.modules['stdlib'].kotlin.arrayListOf_9mqe4v$([]);
            }, {
              getEvents: function () {
                return this.events;
              }
            });
            this.TemplateFieldStore = Kotlin.createObject(function () {
              return [_.hu.nevermind.flux.Store];
            }, function $fun() {
              $fun.baseInitializer.call(this);
              this.dataFromServerToken = this.register_x5ky9g$(_.hu.nevermind.timeline.Actions.dataFromServer, _.hu.nevermind.timeline.store.TemplateFieldStore$f(this));
              this.fields_mnwhzx$ = Kotlin.modules['stdlib'].kotlin.hashMapOf_eoa9s7$([]);
            }, {
              get: function (id) {
                var tmp$0;
                tmp$0 = Kotlin.modules['stdlib'].kotlin.getOrElse_lphkgk$(this.fields_mnwhzx$, id, _.hu.nevermind.timeline.store.get$f_0(id));
                return tmp$0;
              }
            });
            this.TemplateStore = Kotlin.createObject(function () {
              return [_.hu.nevermind.flux.Store];
            }, function $fun() {
              $fun.baseInitializer.call(this);
              this.register_x5ky9g$(_.hu.nevermind.timeline.Actions.dataFromServer, _.hu.nevermind.timeline.store.TemplateStore$f(this));
              this.templates_agm3wp$ = Kotlin.modules['stdlib'].kotlin.hashMapOf_eoa9s7$([]);
            }, {
              getTemplate: function (templateId) {
                var tmp$0;
                tmp$0 = Kotlin.modules['stdlib'].kotlin.getOrElse_lphkgk$(this.templates_agm3wp$, templateId, _.hu.nevermind.timeline.store.getTemplate$f(templateId));
                return tmp$0;
              },
              getTemplates: function () {
                return this.templates_agm3wp$;
              }
            });
          }, /** @lends _.hu.nevermind.timeline.store */ {
            f: function (this$EventFieldStore) {
              return function (it) {
                this$EventFieldStore.fields_ljscr5$.put_wn2jw4$(it.id, it);
              };
            },
            EventFieldStore$f: function (this$EventFieldStore) {
              return function (appState) {
                this$EventFieldStore.fields_ljscr5$.clear();
                Kotlin.modules['stdlib'].kotlin.forEach_p7e0bo$(appState.eventFields, _.hu.nevermind.timeline.store.f(this$EventFieldStore));
              };
            },
            EventFieldStore$f_0: function (this$EventFieldStore) {
              return function (data) {
                this$EventFieldStore.emitChange();
              };
            },
            get$f: function (id) {
              return function () {
                return Kotlin.modules['stdlib'].kotlin.error_za3rmp$('EventFieldStore: ' + id + ' not found');
              };
            },
            EventStore$f: function (this$EventStore) {
              return function (data) {
                this.waitFor([_.hu.nevermind.timeline.store.EventFieldStore, _.hu.nevermind.timeline.store.TemplateStore, _.hu.nevermind.timeline.store.TemplateFieldStore]);
                this$EventStore.events.clear();
                this$EventStore.events.addAll_4fm7v2$(data.events);
                this$EventStore.emitChange();
              };
            },
            EventStore$f_0: function (this$EventStore) {
              return function (data) {
                this$EventStore.emitChange();
              };
            },
            f_0: function (this$TemplateFieldStore) {
              return function (it) {
                this$TemplateFieldStore.fields_mnwhzx$.put_wn2jw4$(it.id, it);
              };
            },
            TemplateFieldStore$f: function (this$TemplateFieldStore) {
              return function (appState) {
                this$TemplateFieldStore.fields_mnwhzx$.clear();
                Kotlin.modules['stdlib'].kotlin.forEach_p7e0bo$(appState.templateFields, _.hu.nevermind.timeline.store.f_0(this$TemplateFieldStore));
              };
            },
            get$f_0: function (id) {
              return function () {
                return Kotlin.modules['stdlib'].kotlin.error_za3rmp$('EventFieldStore: ' + id + ' not found');
              };
            },
            f_1: function (this$TemplateStore) {
              return function (it) {
                this$TemplateStore.templates_agm3wp$.put_wn2jw4$(it.id, it);
              };
            },
            TemplateStore$f: function (this$TemplateStore) {
              return function (appState) {
                this$TemplateStore.templates_agm3wp$.clear();
                Kotlin.modules['stdlib'].kotlin.forEach_p7e0bo$(appState.templates, _.hu.nevermind.timeline.store.f_1(this$TemplateStore));
              };
            },
            getTemplate$f: function (templateId) {
              return function () {
                return Kotlin.modules['stdlib'].kotlin.error_za3rmp$('TemplateStore: ' + templateId);
              };
            }
          })
        })
      })
    }),
    net: Kotlin.definePackage(null, /** @lends _.net */ {
      yested: Kotlin.definePackage(null, /** @lends _.net.yested */ {
        AjaxRequest: Kotlin.createClass(null, function (url, type, data, contentType, dataType, success) {
          if (type === void 0)
            type = 'POST';
          if (contentType === void 0)
            contentType = 'application/json; charset=utf-8';
          if (dataType === void 0)
            dataType = 'json';
          this.url = url;
          this.type = type;
          this.data = data;
          this.contentType = contentType;
          this.dataType = dataType;
          this.success = success;
        }, /** @lends _.net.yested.AjaxRequest.prototype */ {
          component1: function () {
            return this.url;
          },
          component2: function () {
            return this.type;
          },
          component3: function () {
            return this.data;
          },
          component4: function () {
            return this.contentType;
          },
          component5: function () {
            return this.dataType;
          },
          component6: function () {
            return this.success;
          },
          copy: function (url, type, data, contentType, dataType, success) {
            return new _.net.yested.AjaxRequest(url === void 0 ? this.url : url, type === void 0 ? this.type : type, data === void 0 ? this.data : data, contentType === void 0 ? this.contentType : contentType, dataType === void 0 ? this.dataType : dataType, success === void 0 ? this.success : success);
          },
          toString: function () {
            return 'AjaxRequest(url=' + Kotlin.toString(this.url) + (', type=' + Kotlin.toString(this.type)) + (', data=' + Kotlin.toString(this.data)) + (', contentType=' + Kotlin.toString(this.contentType)) + (', dataType=' + Kotlin.toString(this.dataType)) + (', success=' + Kotlin.toString(this.success)) + ')';
          },
          hashCode: function () {
            var result = 0;
            result = result * 31 + Kotlin.hashCode(this.url) | 0;
            result = result * 31 + Kotlin.hashCode(this.type) | 0;
            result = result * 31 + Kotlin.hashCode(this.data) | 0;
            result = result * 31 + Kotlin.hashCode(this.contentType) | 0;
            result = result * 31 + Kotlin.hashCode(this.dataType) | 0;
            result = result * 31 + Kotlin.hashCode(this.success) | 0;
            return result;
          },
          equals_za3rmp$: function (other) {
            return this === other || (other !== null && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.url, other.url) && Kotlin.equals(this.type, other.type) && Kotlin.equals(this.data, other.data) && Kotlin.equals(this.contentType, other.contentType) && Kotlin.equals(this.dataType, other.dataType) && Kotlin.equals(this.success, other.success))));
          }
        }),
        ajaxGet_435vpa$: function (url, loaded) {
          $.get(url, loaded);
        },
        ajaxPost_f0flkx$: function (ajaxRequest) {
          $.ajax(ajaxRequest);
        },
        utils: Kotlin.definePackage(null, /** @lends _.net.yested.utils */ {
          Moment: Kotlin.createClass(null, function (moment) {
            this.moment_qmho9s$ = moment;
          }, /** @lends _.net.yested.utils.Moment.prototype */ {
            format_61zpoe$: function (format) {
              return this.moment_qmho9s$.format(format);
            },
            format_k6n0qe$: function (format) {
              return this.moment_qmho9s$.format(format.toString());
            },
            millisecondsSinceUnixEpoch: {
              get: function () {
                return this.moment_qmho9s$.valueOf();
              }
            },
            millisecond: {
              get: function () {
                return this.moment_qmho9s$.millisecond();
              },
              set: function (value) {
                this.moment_qmho9s$.millisecond(value);
              }
            },
            second: {
              get: function () {
                return this.moment_qmho9s$.second();
              },
              set: function (value) {
                this.moment_qmho9s$.second(value);
              }
            },
            minute: {
              get: function () {
                return this.moment_qmho9s$.minute();
              },
              set: function (value) {
                this.moment_qmho9s$.minute(value);
              }
            },
            hour: {
              get: function () {
                return this.moment_qmho9s$.hour();
              },
              set: function (value) {
                this.moment_qmho9s$.hour(value);
              }
            },
            dayOfMonth: {
              get: function () {
                return this.moment_qmho9s$.date();
              },
              set: function (value) {
                this.moment_qmho9s$.date(value);
              }
            },
            dayOfYear: {
              get: function () {
                return this.moment_qmho9s$.dayOfYear();
              },
              set: function (value) {
                this.moment_qmho9s$.dayOfYear(value);
              }
            },
            month: {
              get: function () {
                return this.moment_qmho9s$.month();
              },
              set: function (value) {
                this.moment_qmho9s$.month(value);
              }
            }
          }, /** @lends _.net.yested.utils.Moment */ {
            object_initializer$: function () {
              return Kotlin.createObject(null, null, {
                now: function () {
                  return new _.net.yested.utils.Moment(moment());
                },
                parse_puj7f4$: function (input, format) {
                  return new _.net.yested.utils.Moment(moment(input, format));
                },
                parseMillisecondsSinceUnixEpoch_s8cxhz$: function (millisecondsSinceUnixEpoch) {
                  Kotlin.modules['stdlib'].kotlin.requireNotNull_wn2jw4$(millisecondsSinceUnixEpoch);
                  return new _.net.yested.utils.Moment(moment(millisecondsSinceUnixEpoch));
                },
                setLocale: function (localeName) {
                  moment().locale(localeName);
                }
              });
            }
          }),
          FormatElement: Kotlin.createClass(null, function (str) {
            this.str = str;
          }, /** @lends _.net.yested.utils.FormatElement.prototype */ {
            plus_9xull5$: function (b) {
              return new _.net.yested.utils.FormatString(Kotlin.modules['stdlib'].kotlin.arrayListOf_9mqe4v$([this, b]));
            },
            plus: function (b) {
              return new _.net.yested.utils.FormatString(Kotlin.modules['stdlib'].kotlin.arrayListOf_9mqe4v$([this, new _.net.yested.utils.FormatElement(b)]));
            }
          }),
          FormatString: Kotlin.createClass(null, function (elements) {
            if (elements === void 0)
              elements = Kotlin.modules['stdlib'].kotlin.arrayListOf_9mqe4v$([]);
            this.elements_ovv2pb$ = elements;
          }, /** @lends _.net.yested.utils.FormatString.prototype */ {
            plus_9xull5$: function (b) {
              this.elements_ovv2pb$.add_za3rmp$(b);
              return new _.net.yested.utils.FormatString(this.elements_ovv2pb$);
            },
            plus_61zpoe$: function (b) {
              this.elements_ovv2pb$.add_za3rmp$(new _.net.yested.utils.FormatElement(b));
              return new _.net.yested.utils.FormatString(this.elements_ovv2pb$);
            },
            toString: function () {
              var tmp$0;
              tmp$0 = Kotlin.modules['stdlib'].kotlin.map_m3yiqg$(this.elements_ovv2pb$, _.net.yested.utils.FormatString.toString$f);
              return Kotlin.modules['stdlib'].kotlin.join_raq5lb$(tmp$0, '');
            }
          }, /** @lends _.net.yested.utils.FormatString */ {
            toString$f: function (it) {
              return it.str;
            }
          }),
          Digit: Kotlin.createClass(null, function (oneDigitFactory, twoDigitsFactory, fourDigitsFactory) {
            this.oneDigitFactory_2nv2s$ = oneDigitFactory;
            this.twoDigitsFactory_5y9a87$ = twoDigitsFactory;
            this.fourDigitsFactory_1omc1$ = fourDigitsFactory;
          }, /** @lends _.net.yested.utils.Digit.prototype */ {
            oneDigit: {
              get: function () {
                return this.oneDigitFactory_2nv2s$();
              }
            },
            twoDigits: {
              get: function () {
                return this.twoDigitsFactory_5y9a87$();
              }
            },
            fourDigits: {
              get: function () {
                return this.fourDigitsFactory_1omc1$();
              }
            }
          }),
          FormatStringBuilder: Kotlin.createClass(null, function () {
            this.year = new _.net.yested.utils.Digit(_.net.yested.utils.FormatStringBuilder.FormatStringBuilder$f, _.net.yested.utils.FormatStringBuilder.FormatStringBuilder$f_0, _.net.yested.utils.FormatStringBuilder.FormatStringBuilder$f_1);
            this.month = new _.net.yested.utils.Digit(_.net.yested.utils.FormatStringBuilder.FormatStringBuilder$f_2, _.net.yested.utils.FormatStringBuilder.FormatStringBuilder$f_3, _.net.yested.utils.FormatStringBuilder.FormatStringBuilder$f_4);
            this.dayOfMonth = new _.net.yested.utils.Digit(_.net.yested.utils.FormatStringBuilder.FormatStringBuilder$f_5, _.net.yested.utils.FormatStringBuilder.FormatStringBuilder$f_6, _.net.yested.utils.FormatStringBuilder.FormatStringBuilder$f_7);
            this.hour24 = new _.net.yested.utils.Digit(_.net.yested.utils.FormatStringBuilder.FormatStringBuilder$f_8, _.net.yested.utils.FormatStringBuilder.FormatStringBuilder$f_9, _.net.yested.utils.FormatStringBuilder.FormatStringBuilder$f_10);
            this.hour12 = new _.net.yested.utils.Digit(_.net.yested.utils.FormatStringBuilder.FormatStringBuilder$f_11, _.net.yested.utils.FormatStringBuilder.FormatStringBuilder$f_12, _.net.yested.utils.FormatStringBuilder.FormatStringBuilder$f_13);
            this.minutes = new _.net.yested.utils.Digit(_.net.yested.utils.FormatStringBuilder.FormatStringBuilder$f_14, _.net.yested.utils.FormatStringBuilder.FormatStringBuilder$f_15, _.net.yested.utils.FormatStringBuilder.FormatStringBuilder$f_16);
            this.seconds = new _.net.yested.utils.Digit(_.net.yested.utils.FormatStringBuilder.FormatStringBuilder$f_17, _.net.yested.utils.FormatStringBuilder.FormatStringBuilder$f_18, _.net.yested.utils.FormatStringBuilder.FormatStringBuilder$f_19);
          }, null, /** @lends _.net.yested.utils.FormatStringBuilder */ {
            FormatStringBuilder$f: function () {
              throw new Kotlin.UnsupportedOperationException();
            },
            FormatStringBuilder$f_0: function () {
              return new _.net.yested.utils.FormatElement('YY');
            },
            FormatStringBuilder$f_1: function () {
              return new _.net.yested.utils.FormatElement('YYYY');
            },
            FormatStringBuilder$f_2: function () {
              return new _.net.yested.utils.FormatElement('M');
            },
            FormatStringBuilder$f_3: function () {
              return new _.net.yested.utils.FormatElement('MM');
            },
            FormatStringBuilder$f_4: function () {
              throw new Kotlin.UnsupportedOperationException();
            },
            FormatStringBuilder$f_5: function () {
              return new _.net.yested.utils.FormatElement('D');
            },
            FormatStringBuilder$f_6: function () {
              return new _.net.yested.utils.FormatElement('DD');
            },
            FormatStringBuilder$f_7: function () {
              throw new Kotlin.UnsupportedOperationException();
            },
            FormatStringBuilder$f_8: function () {
              return new _.net.yested.utils.FormatElement('H');
            },
            FormatStringBuilder$f_9: function () {
              return new _.net.yested.utils.FormatElement('HH');
            },
            FormatStringBuilder$f_10: function () {
              throw new Kotlin.UnsupportedOperationException();
            },
            FormatStringBuilder$f_11: function () {
              return new _.net.yested.utils.FormatElement('h');
            },
            FormatStringBuilder$f_12: function () {
              return new _.net.yested.utils.FormatElement('hh');
            },
            FormatStringBuilder$f_13: function () {
              throw new Kotlin.UnsupportedOperationException();
            },
            FormatStringBuilder$f_14: function () {
              return new _.net.yested.utils.FormatElement('m');
            },
            FormatStringBuilder$f_15: function () {
              return new _.net.yested.utils.FormatElement('mm');
            },
            FormatStringBuilder$f_16: function () {
              throw new Kotlin.UnsupportedOperationException();
            },
            FormatStringBuilder$f_17: function () {
              return new _.net.yested.utils.FormatElement('s');
            },
            FormatStringBuilder$f_18: function () {
              return new _.net.yested.utils.FormatElement('ss');
            },
            FormatStringBuilder$f_19: function () {
              throw new Kotlin.UnsupportedOperationException();
            }
          }),
          format_hliocp$: function (init) {
            return init.call(new _.net.yested.utils.FormatStringBuilder());
          }
        })
      })
    })
  });
  Kotlin.defineModule('reaKt', _);
  _.hu.nevermind.reakt.example.main_kand9s$([]);
}(Kotlin));
