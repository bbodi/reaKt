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
          this.testAction1 = new _.hu.nevermind.flux.ActionDef();
          this.CTestStore = Kotlin.createObject(function () {
            return [_.hu.nevermind.flux.Store];
          }, function $fun() {
            $fun.baseInitializer.call(this);
            this.callbacks = '';
            this.register_x5ky9g$(_.hu.nevermind.flux.testAction1, _.hu.nevermind.flux.CTestStore$f(this));
          });
          this.ATestStore = Kotlin.createObject(function () {
            return [_.hu.nevermind.flux.Store];
          }, function $fun() {
            $fun.baseInitializer.call(this);
            this.callbacks = '';
            this.register_x5ky9g$(_.hu.nevermind.flux.testAction1, _.hu.nevermind.flux.ATestStore$f(this));
          });
          this.BTestStore = Kotlin.createObject(function () {
            return [_.hu.nevermind.flux.Store];
          }, function $fun() {
            $fun.baseInitializer.call(this);
            this.callbacks = '';
            this.register_x5ky9g$(_.hu.nevermind.flux.testAction1, _.hu.nevermind.flux.BTestStore$f(this));
          });
        }, /** @lends _.hu.nevermind.flux */ {
          Store: Kotlin.createClass(null, function () {
            this.changeListeners_pcuery$ = Kotlin.modules['stdlib'].kotlin.hashMapOf_eoa9s7$([]);
            this.commandSender = new _.hu.nevermind.timeline.AjaxCommandSender();
          }, /** @lends _.hu.nevermind.flux.Store.prototype */ {
            register_x5ky9g$: function (actionDef, callback) {
              return _.hu.nevermind.flux.Dispatcher.register(this, actionDef, callback);
            },
            sendCommand_c2tynk$: function (command, msg, resultHandler) {
              this.commandSender.sendCommand_c2tynk$(command, msg, resultHandler);
            },
            addChangeListener_o7wwlr$: function (self, callback) {
              this.changeListeners_pcuery$.put_wn2jw4$(self, callback);
            },
            emitChange: function () {
              Kotlin.modules['stdlib'].kotlin.forEach_p7e0bo$(this.changeListeners_pcuery$.values(), _.hu.nevermind.flux.Store.emitChange$f);
            },
            removeListener_za3rmp$: function (self) {
              this.changeListeners_pcuery$.remove_za3rmp$(self);
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
          },
          TestAction1Payload: Kotlin.createClass(null, null),
          CTestStore$f: function (this$CTestStore) {
            return function (count) {
              this.waitFor([_.hu.nevermind.flux.ATestStore, _.hu.nevermind.flux.BTestStore]);
              this$CTestStore.callbacks = _.hu.nevermind.flux.ATestStore.callbacks + _.hu.nevermind.flux.BTestStore.callbacks;
            };
          },
          ATestStore$f: function (this$ATestStore) {
            return function (count) {
              this$ATestStore.callbacks = this$ATestStore.callbacks + ('a(' + count + ')');
            };
          },
          BTestStore$f: function (this$BTestStore) {
            return function (count) {
              this$BTestStore.callbacks = this$BTestStore.callbacks + ('b(' + count + ')');
            };
          },
          DispatcherSpecs: Kotlin.createClass(null, null, /** @lends _.hu.nevermind.flux.DispatcherSpecs.prototype */ {
            dispatcherShouldExecuteAllSubscriber: function () {
              _.hu.nevermind.flux.testAction1.dispatch_za3rmp$(2);
              Kotlin.modules['stdlib'].kotlin.test.assertEquals_8vv676$('a(2)', _.hu.nevermind.flux.ATestStore.callbacks);
              Kotlin.modules['stdlib'].kotlin.test.assertEquals_8vv676$('b(2)', _.hu.nevermind.flux.BTestStore.callbacks);
              Kotlin.modules['stdlib'].kotlin.test.assertEquals_8vv676$('a(2)b(2)', _.hu.nevermind.flux.CTestStore.callbacks);
              _.hu.nevermind.flux.testAction1.dispatch_za3rmp$(3);
              Kotlin.modules['stdlib'].kotlin.test.assertEquals_8vv676$('a(2)a(3)', _.hu.nevermind.flux.ATestStore.callbacks);
              Kotlin.modules['stdlib'].kotlin.test.assertEquals_8vv676$('b(2)b(3)', _.hu.nevermind.flux.BTestStore.callbacks);
              Kotlin.modules['stdlib'].kotlin.test.assertEquals_8vv676$('a(2)a(3)b(2)b(3)', _.hu.nevermind.flux.CTestStore.callbacks);
            }
          })
        }),
        reakt: Kotlin.definePackage(function () {
          this.React = Kotlin.createObject(null, function () {
            this.DOM = React.DOM;
          }, {
            render_40g7my$: function (element, container, callback) {
              if (callback === void 0)
                callback = _.hu.nevermind.reakt.render_40g7my$f;
              React.render(element != null ? element.backend : null, container, callback);
            },
            createClass_ew72dd$: function (reactClass) {
              return React.createClass(_.hu.nevermind.reakt.createClass_ew72dd$f(reactClass, this));
            },
            readStateFromJsToKotlin: function (self, reactClass) {
              var props = self.props;
              var refs = self.refs;
              reactClass.refs = refs;
              reactClass.reactComponentJs = self;
            }
          });
        }, /** @lends _.hu.nevermind.reakt */ {
          ReactClass: Kotlin.createClass(null, function (body) {
            if (body === void 0)
              body = _.hu.nevermind.reakt.ReactClass.ReactClass$f;
            this.children = (new _.hu.nevermind.reakt.ReactElementCollecter(body)).elements;
            this.reactComponentJs$delegate = Kotlin.modules['stdlib'].kotlin.properties.Delegates.notNull();
            this.refs = null;
            this.reactClassJs = _.hu.nevermind.reakt.React.createClass_ew72dd$(this);
          }, /** @lends _.hu.nevermind.reakt.ReactClass.prototype */ {
            componentDidMount: function () {
            },
            componentWillUnmount: function () {
            },
            reactComponentJs: {
              get: function () {
                return this.reactComponentJs$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('reactComponentJs'));
              },
              set: function (reactComponentJs) {
                this.reactComponentJs$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('reactComponentJs'), reactComponentJs);
              }
            },
            ref_61zpoe$: function (name) {
              return new _.hu.nevermind.reakt.ReactRef(this, name);
            },
            createElement: function () {
              var tmp$0;
              var fullOptions = Kotlin.modules['stdlib'].kotlin.arrayListOf_9mqe4v$([]);
              var constructorParams = _.hu.nevermind.reakt.createObjectWithDynamicFields(fullOptions);
              return new _.hu.nevermind.reakt.ReactElement((tmp$0 = React).createElement.apply(tmp$0, [this.reactClassJs, constructorParams].concat(this.children)));
            }
          }, /** @lends _.hu.nevermind.reakt.ReactClass */ {
            ReactClass$f: function () {
            }
          }),
          ReactElement: Kotlin.createClass(null, function (backend) {
            this.backend = backend;
          }),
          ReactDom: Kotlin.createClass(null, null, /** @lends _.hu.nevermind.reakt.ReactDom.prototype */ {
            get: function (tagName) {
              return noImpl;
            }
          }),
          render_40g7my$f: function () {
          },
          f: function (reactClass, this$React) {
            return function () {
              var tmp$0;
              var self = null;
              self = this;
              this$React.readStateFromJsToKotlin(self, reactClass);
              return (tmp$0 = reactClass.render()) != null ? tmp$0.backend : null;
            };
          },
          f_0: function (reactClass, this$React) {
            return function () {
              var self = null;
              self = this;
              this$React.readStateFromJsToKotlin(self, reactClass);
              reactClass.componentDidMount();
            };
          },
          f_1: function (reactClass, this$React) {
            return function () {
              var self = null;
              self = this;
              this$React.readStateFromJsToKotlin(self, reactClass);
              reactClass.componentWillUnmount();
            };
          },
          createClass_ew72dd$f: function (reactClass, this$React) {
            return Kotlin.createObject(null, function () {
              this.render = _.hu.nevermind.reakt.f(reactClass, this$React);
              this.componentDidMount = _.hu.nevermind.reakt.f_0(reactClass, this$React);
              this.componentWillUnmount = _.hu.nevermind.reakt.f_1(reactClass, this$React);
            });
          },
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
          }, function $fun(initialState, body) {
            if (body === void 0)
              body = _.hu.nevermind.reakt.StatefulReactClass.StatefulReactClass$f;
            $fun.baseInitializer.call(this, body);
            this.$state_poix00$ = initialState;
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
            forceUpdate: function () {
              this.reactComponentJs.forceUpdate();
            }
          }, /** @lends _.hu.nevermind.reakt.StatefulReactClass */ {
            StatefulReactClass$f: function () {
            }
          }),
          ReactComponentJs: Kotlin.createClass(null, null, /** @lends _.hu.nevermind.reakt.ReactComponentJs.prototype */ {
            setState: function (newState) {
              noImpl;
            },
            forceUpdate: function () {
              noImpl;
            }
          }),
          ReactElementCollecter: Kotlin.createClass(null, function (body) {
            this.body = body;
            var reactElementContainer = new _.hu.nevermind.reakt.ReactElementContainer();
            this.body.call(reactElementContainer);
            this.elements = Kotlin.copyToArray(reactElementContainer.elements);
          }),
          ReactNode: Kotlin.createTrait(null),
          ReactElementNode: Kotlin.createClass(function () {
            return [_.hu.nevermind.reakt.ReactNode];
          }, function (value) {
            this.$value_fn8hau$ = value;
          }, /** @lends _.hu.nevermind.reakt.ReactElementNode.prototype */ {
            value: {
              get: function () {
                return this.$value_fn8hau$;
              }
            }
          }),
          ReactTextNode: Kotlin.createClass(function () {
            return [_.hu.nevermind.reakt.ReactNode];
          }, function (value) {
            this.$value_8k391z$ = value;
          }, /** @lends _.hu.nevermind.reakt.ReactTextNode.prototype */ {
            value: {
              get: function () {
                return this.$value_8k391z$;
              }
            }
          }),
          ReactNumberNode: Kotlin.createClass(function () {
            return [_.hu.nevermind.reakt.ReactNode];
          }, function (value) {
            this.$value_pwcgxx$ = value;
          }, /** @lends _.hu.nevermind.reakt.ReactNumberNode.prototype */ {
            value: {
              get: function () {
                return this.$value_pwcgxx$;
              }
            }
          }),
          ReactElementContainer: Kotlin.createClass(null, function () {
            this.elements = Kotlin.modules['stdlib'].kotlin.arrayListOf_9mqe4v$([]);
          }, /** @lends _.hu.nevermind.reakt.ReactElementContainer.prototype */ {
            plus_ow6yss$: function ($receiver) {
              Kotlin.modules['stdlib'].kotlin.forEach_p7e0bo$($receiver, _.hu.nevermind.reakt.ReactElementContainer.plus_ow6yss$f(this));
            },
            plus_zhpcab$: function ($receiver) {
              var reactElement = $receiver.createElement();
              this.elements.add_za3rmp$(new _.hu.nevermind.reakt.ReactElementNode(reactElement));
            },
            plus_oclkc7$: function ($receiver) {
              this.elements.add_za3rmp$(new _.hu.nevermind.reakt.ReactElementNode($receiver));
            },
            plus_ehgxxh$: function ($receiver) {
              var tmp$0, tmp$1;
              tmp$1 = this.elements;
              tmp$0 = Kotlin.modules['stdlib'].kotlin.map_rie7ol$($receiver, _.hu.nevermind.reakt.ReactElementContainer.plus_ehgxxh$f);
              tmp$1.addAll_4fm7v2$(tmp$0);
            },
            plus_pdl1w0$: function ($receiver) {
              this.elements.add_za3rmp$(new _.hu.nevermind.reakt.ReactTextNode($receiver));
            },
            plus_f2arp1$: function ($receiver) {
              this.elements.add_za3rmp$($receiver);
            },
            plus_ms6h6u$: function ($receiver) {
              Kotlin.modules['stdlib'].kotlin.addAll_p6ac9a$(this.elements, $receiver);
            }
          }, /** @lends _.hu.nevermind.reakt.ReactElementContainer */ {
            plus_ow6yss$f: function (this$ReactElementContainer) {
              return function (it) {
                this$ReactElementContainer.elements.add_za3rmp$(new _.hu.nevermind.reakt.ReactElementNode(it.createElement()));
              };
            },
            plus_ehgxxh$f: function (it) {
              return new _.hu.nevermind.reakt.ReactElementNode(it);
            }
          }),
          createReactElementJs$f: function (it) {
            return it.value;
          },
          createReactElementJs: function (tagName, options, addOptions, body) {
            var tmp$0;
            var fullOptions = Kotlin.modules['stdlib'].kotlin.arrayListOf_9mqe4v$([]);
            Kotlin.modules['stdlib'].kotlin.addAll_7g2der$(fullOptions, options);
            var elements = [];
            if (body != null) {
              var elementContainer = new _.hu.nevermind.reakt.ReactElementContainer();
              body.call(elementContainer);
              elements = Kotlin.copyToArray(elementContainer.elements);
            }
            addOptions(fullOptions);
            var constructorParams = _.hu.nevermind.reakt.createObjectWithDynamicFields(fullOptions);
            var reactElementJs = _.hu.nevermind.reakt.React.DOM[tagName];
            tmp$0 = Kotlin.modules['stdlib'].kotlin.map_rie7ol$(elements, _.hu.nevermind.reakt.createReactElementJs$f);
            var childrenArray = Kotlin.copyToArray(tmp$0);
            return new _.hu.nevermind.reakt.ReactElement(reactElementJs(constructorParams, childrenArray));
          },
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
          small_3topnc$f: function (it) {
          },
          small_3topnc$: function (options, body) {
            return _.hu.nevermind.reakt.createReactElementJs('small', options, _.hu.nevermind.reakt.small_3topnc$f, body);
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
          tbody_3topnc$f: function (it) {
          },
          tbody_3topnc$: function (options, body) {
            return _.hu.nevermind.reakt.createReactElementJs('tbody', options, _.hu.nevermind.reakt.tbody_3topnc$f, body);
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
          ContentToggle: Kotlin.createClass(function () {
            return [_.hu.nevermind.reakt.ReactClass];
          }, function $fun(body) {
            $fun.baseInitializer.call(this, body);
          }, /** @lends _.hu.nevermind.reakt.ContentToggle.prototype */ {
            render: function () {
              return _.hu.nevermind.reakt.div_3topnc$([], _.hu.nevermind.reakt.ContentToggle.render$f(this));
            }
          }, /** @lends _.hu.nevermind.reakt.ContentToggle */ {
            f: function (it) {
              return it.value.state;
            },
            f_0: function (this$) {
              return function (it) {
                this$.plus_f2arp1$(it);
              };
            },
            render$f: function (this$ContentToggle) {
              return function () {
                var tmp$0;
                var allElements = this$ContentToggle.children.length;
                tmp$0 = Kotlin.modules['stdlib'].kotlin.filter_dgtl0h$(this$ContentToggle.children, _.hu.nevermind.reakt.ContentToggle.f);
                var openedElements = tmp$0.size();
                this.plus_pdl1w0$(openedElements.toString() + ' are open from ' + allElements);
                Kotlin.modules['stdlib'].kotlin.forEach_5wd4f$(this$ContentToggle.children, _.hu.nevermind.reakt.ContentToggle.f_0(this));
              };
            }
          }),
          ContentElement: Kotlin.createClass(function () {
            return [_.hu.nevermind.reakt.StatefulReactClass];
          }, function $fun(opened, content) {
            $fun.baseInitializer.call(this, opened);
            this.content = content;
            this.onClick = _.hu.nevermind.reakt.ContentElement.ContentElement$f(this);
          }, /** @lends _.hu.nevermind.reakt.ContentElement.prototype */ {
            render: function () {
              return _.hu.nevermind.reakt.div_3topnc$([], _.hu.nevermind.reakt.ContentElement.render$f(this));
            }
          }, /** @lends _.hu.nevermind.reakt.ContentElement */ {
            f: function (this$ContentElement) {
              return function () {
                return !this$ContentElement.state;
              };
            },
            ContentElement$f: function (this$ContentElement) {
              return function () {
                this$ContentElement.changeState_un3fny$(_.hu.nevermind.reakt.ContentElement.f(this$ContentElement));
              };
            },
            f_0: function (this$ContentElement) {
              return function () {
                this.plus_pdl1w0$(this$ContentElement.state ? 'Close' : 'Open');
              };
            },
            render$f: function (this$ContentElement) {
              return function () {
                this.plus_oclkc7$(_.hu.nevermind.reakt.button_tqynw0$(_.hu.nevermind.reakt.ButtonType.object.BUTTON, [Kotlin.modules['stdlib'].kotlin.to_l1ob02$('onClick', this$ContentElement.onClick)], _.hu.nevermind.reakt.ContentElement.f_0(this$ContentElement)));
                if (this$ContentElement.state) {
                  this.plus_oclkc7$(this$ContentElement.content);
                }
              };
            }
          }),
          ReaktTest: Kotlin.createClass(null, null, /** @lends _.hu.nevermind.reakt.ReaktTest.prototype */ {
            asd: function () {
              var node = document.getElementById('testContent');
              var component = new _.hu.nevermind.reakt.ContentToggle(_.hu.nevermind.reakt.ReaktTest.asd$f);
            }
          }, /** @lends _.hu.nevermind.reakt.ReaktTest */ {
            f: function () {
              this.plus_pdl1w0$('Hello');
            },
            f_0: function () {
              this.plus_pdl1w0$('World');
            },
            f_1: function () {
              this.plus_pdl1w0$('!');
            },
            f_2: function () {
              this.plus_pdl1w0$('Toggle me!');
            },
            asd$f: function () {
              this.plus_zhpcab$(new _.hu.nevermind.reakt.ContentElement(true, _.hu.nevermind.reakt.div_3topnc$([], _.hu.nevermind.reakt.ReaktTest.f)));
              this.plus_zhpcab$(new _.hu.nevermind.reakt.ContentElement(false, _.hu.nevermind.reakt.div_3topnc$([], _.hu.nevermind.reakt.ReaktTest.f_0)));
              this.plus_zhpcab$(new _.hu.nevermind.reakt.ContentElement(false, _.hu.nevermind.reakt.div_3topnc$([], _.hu.nevermind.reakt.ReaktTest.f_1)));
              this.plus_zhpcab$(new _.hu.nevermind.reakt.ContentElement(false, _.hu.nevermind.reakt.button_tqynw0$(void 0, [], _.hu.nevermind.reakt.ReaktTest.f_2)));
            }
          }),
          example: Kotlin.definePackage(null, /** @lends _.hu.nevermind.reakt.example */ {
            FormField: Kotlin.createClass(null, function (id, inputType, labelText, placeHolder, value) {
              if (placeHolder === void 0)
                placeHolder = '';
              if (value === void 0)
                value = '';
              this.id = id;
              this.inputType = inputType;
              this.labelText = labelText;
              this.placeHolder = placeHolder;
              this.parent = null;
              this.initialValue = value;
            }, /** @lends _.hu.nevermind.reakt.example.FormField.prototype */ {
              value: {
                get: function () {
                  var tmp$0, tmp$1, tmp$2;
                  var ref = (tmp$1 = (tmp$0 = this.parent) != null ? tmp$0.idsToRefs : null) != null ? tmp$1.get_za3rmp$(this.id) : null;
                  if (ref != null) {
                    tmp$2 = ref.getDOMNode().value;
                  }
                   else {
                    tmp$2 = this.initialValue;
                  }
                  return tmp$2;
                },
                set: function (v) {
                  var tmp$0, tmp$1;
                  ((tmp$1 = ((tmp$0 = this.parent) != null ? tmp$0 : Kotlin.throwNPE()).idsToRefs.get_za3rmp$(this.id)) != null ? tmp$1 : Kotlin.throwNPE()).getDOMNode().value = v != null ? v : '';
                }
              },
              component1: function () {
                return this.id;
              },
              component2: function () {
                return this.inputType;
              },
              component3: function () {
                return this.labelText;
              },
              component4: function () {
                return this.placeHolder;
              },
              copy: function (id, inputType, labelText, placeHolder, value) {
                return new _.hu.nevermind.reakt.example.FormField(id === void 0 ? this.id : id, inputType === void 0 ? this.inputType : inputType, labelText === void 0 ? this.labelText : labelText, placeHolder === void 0 ? this.placeHolder : placeHolder, value);
              },
              toString: function () {
                return 'FormField(id=' + Kotlin.toString(this.id) + (', inputType=' + Kotlin.toString(this.inputType)) + (', labelText=' + Kotlin.toString(this.labelText)) + (', placeHolder=' + Kotlin.toString(this.placeHolder)) + ')';
              },
              hashCode: function () {
                var result = 0;
                result = result * 31 + Kotlin.hashCode(this.id) | 0;
                result = result * 31 + Kotlin.hashCode(this.inputType) | 0;
                result = result * 31 + Kotlin.hashCode(this.labelText) | 0;
                result = result * 31 + Kotlin.hashCode(this.placeHolder) | 0;
                return result;
              },
              equals_za3rmp$: function (other) {
                return this === other || (other !== null && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.id, other.id) && Kotlin.equals(this.inputType, other.inputType) && Kotlin.equals(this.labelText, other.labelText) && Kotlin.equals(this.placeHolder, other.placeHolder))));
              }
            }),
            FormState: Kotlin.createClass(null, function (formFields) {
              if (formFields === void 0)
                formFields = Kotlin.modules['stdlib'].kotlin.emptyList();
              this.formFields = formFields;
            }, /** @lends _.hu.nevermind.reakt.example.FormState.prototype */ {
              component1: function () {
                return this.formFields;
              },
              copy: function (formFields) {
                return new _.hu.nevermind.reakt.example.FormState(formFields === void 0 ? this.formFields : formFields);
              },
              toString: function () {
                return 'FormState(formFields=' + Kotlin.toString(this.formFields) + ')';
              },
              hashCode: function () {
                var result = 0;
                result = result * 31 + Kotlin.hashCode(this.formFields) | 0;
                return result;
              },
              equals_za3rmp$: function (other) {
                return this === other || (other !== null && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && Kotlin.equals(this.formFields, other.formFields)));
              }
            }),
            FormSchema: Kotlin.createClass(null, function () {
              this.id_laigbc$ = 0;
              this.fields = Kotlin.modules['stdlib'].kotlin.arrayListOf_9mqe4v$([]);
            }, /** @lends _.hu.nevermind.reakt.example.FormSchema.prototype */ {
              formField_tzrxoy$: function (inputType, labelText, placeHolder, value) {
                if (labelText === void 0)
                  labelText = '';
                if (placeHolder === void 0)
                  placeHolder = '';
                if (value === void 0)
                  value = '';
                var formField = new _.hu.nevermind.reakt.example.FormField(this.id_laigbc$++, inputType, labelText, placeHolder, value);
                this.fields.add_za3rmp$(formField);
                return formField;
              }
            }),
            Form: Kotlin.createClass(function () {
              return [_.hu.nevermind.reakt.StatefulReactClass];
            }, function $fun(title, schema, subTitle) {
              if (subTitle === void 0)
                subTitle = null;
              $fun.baseInitializer.call(this, new _.hu.nevermind.reakt.example.FormState(schema.fields));
              this.title = title;
              this.subTitle = subTitle;
              this.idsToRefs = Kotlin.modules['stdlib'].kotlin.hashMapOf_eoa9s7$([]);
            }, /** @lends _.hu.nevermind.reakt.example.Form.prototype */ {
              render: function () {
                return _.hu.nevermind.reakt.form_djsqtr$([], void 0, _.hu.nevermind.reakt.example.Form.render$f(this));
              }
            }, /** @lends _.hu.nevermind.reakt.example.Form */ {
              f: function (this$Form) {
                return function () {
                  this.plus_pdl1w0$(this$Form.subTitle);
                };
              },
              f_0: function (this$Form) {
                return function () {
                  this.plus_pdl1w0$(this$Form.title + ' ');
                  if (this$Form.subTitle != null) {
                    this.plus_oclkc7$(_.hu.nevermind.reakt.small_3topnc$([], _.hu.nevermind.reakt.example.Form.f(this$Form)));
                  }
                };
              },
              f_1: function (formField) {
                return function (it) {
                  return it.id !== formField.id;
                };
              },
              f_2: function (formField) {
                return function (it) {
                  return it.id !== formField.id;
                };
              },
              f_3: function (this$Form, formField, newValue) {
                return function () {
                  var tmp$0, tmp$1;
                  tmp$0 = Kotlin.modules['stdlib'].kotlin.takeWhile_azvtw4$(this$Form.state.formFields, _.hu.nevermind.reakt.example.Form.f_1(formField));
                  var head = tmp$0;
                  tmp$1 = Kotlin.modules['stdlib'].kotlin.dropWhile_azvtw4$(this$Form.state.formFields, _.hu.nevermind.reakt.example.Form.f_2(formField));
                  var tail = Kotlin.modules['stdlib'].kotlin.drop_21mo2$(tmp$1, 1);
                  var newFormFields = Kotlin.modules['stdlib'].kotlin.plus_84aay$(Kotlin.modules['stdlib'].kotlin.plus_pjxz11$(head, formField.copy(void 0, void 0, void 0, void 0, newValue)), tail);
                  return this$Form.state.copy(newFormFields);
                };
              },
              f_4: function (this$Form, formField) {
                return function (newValue) {
                  this$Form.changeState_un3fny$(_.hu.nevermind.reakt.example.Form.f_3(this$Form, formField, newValue));
                };
              },
              f_5: function (this$Form, this$) {
                return function (formField) {
                  formField.parent = this$Form;
                  var onChange = _.hu.nevermind.reakt.example.Form.f_4(this$Form, formField);
                  var inputField = new _.hu.nevermind.reakt.example.InputField(formField.inputType, formField.labelText, formField.placeHolder, formField.value, onChange);
                  var ref = inputField.inputRef;
                  this$Form.idsToRefs.put_wn2jw4$(formField.id, ref);
                  this$.plus_zhpcab$(inputField);
                };
              },
              render$f: function (this$Form) {
                return function () {
                  this.plus_oclkc7$(_.hu.nevermind.reakt.h3_3topnc$([], _.hu.nevermind.reakt.example.Form.f_0(this$Form)));
                  Kotlin.modules['stdlib'].kotlin.forEach_p7e0bo$(this$Form.state.formFields, _.hu.nevermind.reakt.example.Form.f_5(this$Form, this));
                };
              }
            }),
            EventTemplateFieldFormSchema: Kotlin.createClass(function () {
              return [_.hu.nevermind.reakt.example.FormSchema];
            }, function $fun() {
              $fun.baseInitializer.call(this);
              this.nameField = this.formField_tzrxoy$(_.hu.nevermind.reakt.InputType.object.TEXT, 'Name');
              this.hintField = this.formField_tzrxoy$(_.hu.nevermind.reakt.InputType.object.TEXT, 'Name');
            }),
            EventTemplateFormSchema: Kotlin.createClass(function () {
              return [_.hu.nevermind.reakt.example.FormSchema];
            }, function $fun() {
              $fun.baseInitializer.call(this);
              this.nameField = this.formField_tzrxoy$(_.hu.nevermind.reakt.InputType.object.TEXT, 'Name');
              this.useTime = this.formField_tzrxoy$(_.hu.nevermind.reakt.InputType.object.CHECKBOX, 'A d\xE1tumon k\xEDv\xFCl mentse az id\u0151pontot is!');
              this.fieldFields = Kotlin.modules['stdlib'].kotlin.arrayListOf_9mqe4v$([]);
            }, /** @lends _.hu.nevermind.reakt.example.EventTemplateFormSchema.prototype */ {
              setData: function (event) {
              }
            }),
            EventFormSchema: Kotlin.createClass(function () {
              return [_.hu.nevermind.reakt.example.FormSchema];
            }, function $fun(eventTemplate) {
              var tmp$0;
              $fun.baseInitializer.call(this);
              this.eventTemplate = eventTemplate;
              if (this.eventTemplate.useDateTime) {
                tmp$0 = _.net.yested.utils.format_hliocp$(_.hu.nevermind.reakt.example.EventFormSchema.EventFormSchema$f);
              }
               else {
                tmp$0 = _.net.yested.utils.format_hliocp$(_.hu.nevermind.reakt.example.EventFormSchema.EventFormSchema$f_0);
              }
              this.dateFormat = tmp$0;
              this.dateInput = this.formField_tzrxoy$(_.hu.nevermind.reakt.InputType.object.TEXT, 'Date');
              this.commentInput = this.formField_tzrxoy$(_.hu.nevermind.reakt.InputType.object.TEXT, 'Comment');
              this.fieldInputs = Kotlin.modules['stdlib'].kotlin.map_m3yiqg$(Kotlin.modules['stdlib'].kotlin.map_m3yiqg$(this.eventTemplate.fieldIds, _.hu.nevermind.reakt.example.EventFormSchema.EventFormSchema$f_1), _.hu.nevermind.reakt.example.EventFormSchema.EventFormSchema$f_2(this));
            }, /** @lends _.hu.nevermind.reakt.example.EventFormSchema.prototype */ {
              setData: function (event) {
                var tmp$1, tmp$2, tmp$3;
                this.dateInput.value = event.date.format_k6n0qe$(this.dateFormat);
                tmp$2 = this.fieldInputs;
                tmp$1 = Kotlin.modules['stdlib'].kotlin.map_m3yiqg$(event.fieldIds, _.hu.nevermind.reakt.example.EventFormSchema.setData$f);
                tmp$3 = Kotlin.modules['stdlib'].kotlin.zip_84aay$(tmp$2, tmp$1).iterator();
                while (tmp$3.hasNext()) {
                  var tmp$0 = tmp$3.next()
                  , fieldInput = tmp$0.component1()
                  , field = tmp$0.component2();
                  fieldInput.value = Kotlin.toString(field.fieldValue);
                }
              }
            }, /** @lends _.hu.nevermind.reakt.example.EventFormSchema */ {
              EventFormSchema$f: function () {
                return this.year.fourDigits.plus('.').plus_9xull5$(this.month.twoDigits).plus_61zpoe$('.').plus_9xull5$(this.dayOfMonth.twoDigits).plus_61zpoe$(' ').plus_9xull5$(this.hour24.twoDigits).plus_61zpoe$(':').plus_9xull5$(this.minutes.twoDigits);
              },
              EventFormSchema$f_0: function () {
                return this.year.fourDigits.plus('.').plus_9xull5$(this.month.twoDigits).plus_61zpoe$('.').plus_9xull5$(this.dayOfMonth.twoDigits);
              },
              EventFormSchema$f_1: function (it) {
                return _.hu.nevermind.timeline.store.EventTemplateFieldStore.get(it);
              },
              EventFormSchema$f_2: function (this$EventFormSchema) {
                return function (fieldTemplate) {
                  var tmp$0, tmp$1, tmp$2, tmp$3, tmp$4, tmp$5, tmp$6;
                  tmp$0 = fieldTemplate.type;
                  if (tmp$0 === _.hu.nevermind.timeline.entities.EventFieldType.object.INT)
                    tmp$6 = this$EventFormSchema.formField_tzrxoy$(_.hu.nevermind.reakt.InputType.object.NUMBER, fieldTemplate.name, (tmp$1 = fieldTemplate.hint) != null ? tmp$1 : '');
                  else if (tmp$0 === _.hu.nevermind.timeline.entities.EventFieldType.object.FLOAT)
                    tmp$6 = this$EventFormSchema.formField_tzrxoy$(_.hu.nevermind.reakt.InputType.object.NUMBER, fieldTemplate.name, (tmp$2 = fieldTemplate.hint) != null ? tmp$2 : '');
                  else if (tmp$0 === _.hu.nevermind.timeline.entities.EventFieldType.object.STRING)
                    tmp$6 = this$EventFormSchema.formField_tzrxoy$(_.hu.nevermind.reakt.InputType.object.TEXT, fieldTemplate.name, (tmp$3 = fieldTemplate.hint) != null ? tmp$3 : '');
                  else if (tmp$0 === _.hu.nevermind.timeline.entities.EventFieldType.object.TEXTAREA)
                    tmp$6 = this$EventFormSchema.formField_tzrxoy$(_.hu.nevermind.reakt.InputType.object.TEXT, fieldTemplate.name, (tmp$4 = fieldTemplate.hint) != null ? tmp$4 : '');
                  else if (tmp$0 === _.hu.nevermind.timeline.entities.EventFieldType.object.SELECT)
                    tmp$6 = this$EventFormSchema.formField_tzrxoy$(_.hu.nevermind.reakt.InputType.object.TEXT, fieldTemplate.name, (tmp$5 = fieldTemplate.hint) != null ? tmp$5 : '');
                  var inputField = tmp$6;
                  return inputField;
                };
              },
              setData$f: function (it) {
                return _.hu.nevermind.timeline.store.EventStore.getField(it);
              }
            }),
            InputField: Kotlin.createClass(function () {
              return [_.hu.nevermind.reakt.ReactClass];
            }, function $fun(inputType, labelText, placeHolder, value, onChange) {
              if (placeHolder === void 0)
                placeHolder = '';
              if (value === void 0)
                value = null;
              if (onChange === void 0)
                onChange = _.hu.nevermind.reakt.example.InputField.InputField$f;
              $fun.baseInitializer.call(this);
              this.inputType = inputType;
              this.labelText = labelText;
              this.placeHolder = placeHolder;
              this.value = value;
              this.onChange = onChange;
              this.inputRef = this.ref_61zpoe$('input');
            }, /** @lends _.hu.nevermind.reakt.example.InputField.prototype */ {
              componentDidMount: function () {
                var tmp$0;
                this.inputRef.getDOMNode().value = (tmp$0 = this.value) != null ? tmp$0 : '';
              },
              render: function () {
                return _.hu.nevermind.reakt.div_3topnc$([Kotlin.modules['stdlib'].kotlin.to_l1ob02$('className', 'form-group')], _.hu.nevermind.reakt.example.InputField.render$f(this));
              }
            }, /** @lends _.hu.nevermind.reakt.example.InputField */ {
              InputField$f: function (it) {
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
            DropDownButtonItem: Kotlin.createClass(function () {
              return [_.hu.nevermind.reakt.ReactClass];
            }, function $fun(name, callback) {
              $fun.baseInitializer.call(this);
              this.name = name;
              this.callback = callback;
            }, /** @lends _.hu.nevermind.reakt.example.DropDownButtonItem.prototype */ {
              render: function () {
                return _.hu.nevermind.reakt.a_3topnc$([Kotlin.modules['stdlib'].kotlin.to_l1ob02$('role', 'menuItem'), Kotlin.modules['stdlib'].kotlin.to_l1ob02$('onClick', _.hu.nevermind.reakt.example.DropDownButtonItem.render$f(this))], _.hu.nevermind.reakt.example.DropDownButtonItem.render$f_0(this));
              }
            }, /** @lends _.hu.nevermind.reakt.example.DropDownButtonItem */ {
              render$f: function (this$DropDownButtonItem) {
                return function () {
                  this$DropDownButtonItem.callback();
                };
              },
              render$f_0: function (this$DropDownButtonItem) {
                return function () {
                  this.plus_pdl1w0$(this$DropDownButtonItem.name);
                };
              }
            }),
            DropDownButton: Kotlin.createClass(function () {
              return [_.hu.nevermind.reakt.ReactClass];
            }, function $fun(buttonText, body) {
              if (body === void 0)
                body = _.hu.nevermind.reakt.example.DropDownButton.DropDownButton$f;
              $fun.baseInitializer.call(this, body);
              this.buttonText = buttonText;
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
                return it.value;
              },
              f_2: function (it) {
              },
              f_3: function (this$DropDownButton) {
                return function () {
                  var tmp$0;
                  tmp$0 = Kotlin.modules['stdlib'].kotlin.map_rie7ol$(this$DropDownButton.children, _.hu.nevermind.reakt.example.DropDownButton.f_1);
                  Kotlin.modules['stdlib'].kotlin.forEach_p7e0bo$(tmp$0, _.hu.nevermind.reakt.example.DropDownButton.f_2);
                };
              },
              f_4: function (this$DropDownButton) {
                return function () {
                  this.plus_oclkc7$(_.hu.nevermind.reakt.li_3topnc$([Kotlin.modules['stdlib'].kotlin.to_l1ob02$('role', 'presentation')], _.hu.nevermind.reakt.example.DropDownButton.f_3(this$DropDownButton)));
                };
              },
              render$f: function (this$DropDownButton) {
                return function () {
                  this.plus_oclkc7$(_.hu.nevermind.reakt.button_tqynw0$(_.hu.nevermind.reakt.ButtonType.object.BUTTON, [Kotlin.modules['stdlib'].kotlin.to_l1ob02$('className', 'btn btn-primary btn-default dropdown-toggle'), Kotlin.modules['stdlib'].kotlin.to_l1ob02$('data-toggle', 'dropdown')], _.hu.nevermind.reakt.example.DropDownButton.f_0(this$DropDownButton)));
                  this.plus_oclkc7$(_.hu.nevermind.reakt.ul_3topnc$([Kotlin.modules['stdlib'].kotlin.to_l1ob02$('className', 'dropdown-menu'), Kotlin.modules['stdlib'].kotlin.to_l1ob02$('role', 'menu')], _.hu.nevermind.reakt.example.DropDownButton.f_4(this$DropDownButton)));
                };
              }
            }),
            SplitDropDownButton: Kotlin.createClass(function () {
              return [_.hu.nevermind.reakt.ReactClass];
            }, function $fun(mainItem, items, body) {
              if (body === void 0)
                body = _.hu.nevermind.reakt.example.SplitDropDownButton.SplitDropDownButton$f;
              $fun.baseInitializer.call(this, body);
              this.mainItem = mainItem;
              this.items = items;
            }, /** @lends _.hu.nevermind.reakt.example.SplitDropDownButton.prototype */ {
              render: function () {
                return _.hu.nevermind.reakt.div_3topnc$([Kotlin.modules['stdlib'].kotlin.to_l1ob02$('className', 'btn-group')], _.hu.nevermind.reakt.example.SplitDropDownButton.render$f(this));
              }
            }, /** @lends _.hu.nevermind.reakt.example.SplitDropDownButton */ {
              SplitDropDownButton$f: function () {
              },
              f: function (this$SplitDropDownButton) {
                return function () {
                  this$SplitDropDownButton.mainItem.callback();
                };
              },
              f_0: function (this$SplitDropDownButton) {
                return function () {
                  this.plus_pdl1w0$(this$SplitDropDownButton.mainItem.name);
                };
              },
              f_1: function () {
              },
              f_2: function () {
                this.plus_oclkc7$(_.hu.nevermind.reakt.span_3topnc$([Kotlin.modules['stdlib'].kotlin.to_l1ob02$('className', 'caret')], _.hu.nevermind.reakt.example.SplitDropDownButton.f_1));
              },
              f_3: function (it) {
                return function () {
                  it.callback();
                };
              },
              f_4: function (it) {
                return function () {
                  this.plus_pdl1w0$(it.name);
                };
              },
              f_5: function (this$) {
                return function (it) {
                  this$.plus_oclkc7$(_.hu.nevermind.reakt.a_3topnc$([Kotlin.modules['stdlib'].kotlin.to_l1ob02$('role', 'menuItem'), Kotlin.modules['stdlib'].kotlin.to_l1ob02$('onClick', _.hu.nevermind.reakt.example.SplitDropDownButton.f_3(it))], _.hu.nevermind.reakt.example.SplitDropDownButton.f_4(it)));
                };
              },
              f_6: function (this$SplitDropDownButton) {
                return function () {
                  Kotlin.modules['stdlib'].kotlin.forEach_5wd4f$(this$SplitDropDownButton.items, _.hu.nevermind.reakt.example.SplitDropDownButton.f_5(this));
                };
              },
              f_7: function (this$SplitDropDownButton) {
                return function () {
                  this.plus_oclkc7$(_.hu.nevermind.reakt.li_3topnc$([Kotlin.modules['stdlib'].kotlin.to_l1ob02$('role', 'presentation')], _.hu.nevermind.reakt.example.SplitDropDownButton.f_6(this$SplitDropDownButton)));
                };
              },
              render$f: function (this$SplitDropDownButton) {
                return function () {
                  this.plus_oclkc7$(_.hu.nevermind.reakt.button_tqynw0$(_.hu.nevermind.reakt.ButtonType.object.BUTTON, [Kotlin.modules['stdlib'].kotlin.to_l1ob02$('className', 'btn btn-default'), Kotlin.modules['stdlib'].kotlin.to_l1ob02$('onClick', _.hu.nevermind.reakt.example.SplitDropDownButton.f(this$SplitDropDownButton))], _.hu.nevermind.reakt.example.SplitDropDownButton.f_0(this$SplitDropDownButton)));
                  this.plus_oclkc7$(_.hu.nevermind.reakt.button_tqynw0$(_.hu.nevermind.reakt.ButtonType.object.BUTTON, [Kotlin.modules['stdlib'].kotlin.to_l1ob02$('className', 'btn btn-default dropdown-toggle'), Kotlin.modules['stdlib'].kotlin.to_l1ob02$('data-toggle', 'dropdown')], _.hu.nevermind.reakt.example.SplitDropDownButton.f_2));
                  this.plus_oclkc7$(_.hu.nevermind.reakt.ul_3topnc$([Kotlin.modules['stdlib'].kotlin.to_l1ob02$('className', 'dropdown-menu'), Kotlin.modules['stdlib'].kotlin.to_l1ob02$('role', 'menu')], _.hu.nevermind.reakt.example.SplitDropDownButton.f_7(this$SplitDropDownButton)));
                };
              }
            }),
            FilterSelectorField: Kotlin.createClass(function () {
              return [_.hu.nevermind.reakt.ReactClass];
            }, function $fun(filteringTemplateIds, body) {
              if (body === void 0)
                body = _.hu.nevermind.reakt.example.FilterSelectorField.FilterSelectorField$f;
              $fun.baseInitializer.call(this, body);
              this.filteringTemplateIds = filteringTemplateIds;
              this.inputRef = this.ref_61zpoe$('inputRef');
            }, /** @lends _.hu.nevermind.reakt.example.FilterSelectorField.prototype */ {
              render: function () {
                return _.hu.nevermind.reakt.input_5p5u6h$(_.hu.nevermind.reakt.InputType.object.TEXT, [Kotlin.modules['stdlib'].kotlin.to_l1ob02$('ref', this.inputRef)]);
              },
              componentDidMount: function () {
                var tmp$0, tmp$1;
                tmp$1 = this.inputRef.getDOMNode();
                tmp$0 = Kotlin.modules['stdlib'].kotlin.map_m3yiqg$(this.filteringTemplateIds, _.hu.nevermind.reakt.example.FilterSelectorField.componentDidMount$f);
                tmp$1.value = Kotlin.modules['stdlib'].kotlin.join_raq5lb$(tmp$0, ',');
              }
            }, /** @lends _.hu.nevermind.reakt.example.FilterSelectorField */ {
              FilterSelectorField$f: function () {
              },
              componentDidMount$f: function (it) {
                return _.hu.nevermind.timeline.store.EventTemplateStore.get(it).name;
              }
            }),
            EventFilter: Kotlin.createClass(function () {
              return [_.hu.nevermind.reakt.StatefulReactClass];
            }, function $fun(filteringTemplateIds) {
              $fun.baseInitializer.call(this, filteringTemplateIds);
              this.filteringTemplateIds = filteringTemplateIds;
            }, /** @lends _.hu.nevermind.reakt.example.EventFilter.prototype */ {
              render: function () {
                return _.hu.nevermind.reakt.div_3topnc$([Kotlin.modules['stdlib'].kotlin.to_l1ob02$('className', 'row')], _.hu.nevermind.reakt.example.EventFilter.render$f(this));
              }
            }, /** @lends _.hu.nevermind.reakt.example.EventFilter */ {
              f: function (this$EventFilter, it) {
                return function () {
                  _.hu.nevermind.timeline.Actions.filteringTemplateIdsChanged.dispatch_za3rmp$(new _.hu.nevermind.timeline.FilteringTemplateIdsChangedPayload(Kotlin.modules['stdlib'].kotlin.plus_pjxz11$(this$EventFilter.filteringTemplateIds, it.id)));
                };
              },
              f_0: function (this$EventFilter, this$) {
                return function (it) {
                  this$.plus_zhpcab$(new _.hu.nevermind.reakt.example.DropDownButtonItem(it.name, _.hu.nevermind.reakt.example.EventFilter.f(this$EventFilter, it)));
                };
              },
              f_1: function (this$EventFilter) {
                return function () {
                  Kotlin.modules['stdlib'].kotlin.map_m3yiqg$(_.hu.nevermind.timeline.store.EventTemplateStore.getTemplates().values(), _.hu.nevermind.reakt.example.EventFilter.f_0(this$EventFilter, this));
                };
              },
              render$f: function (this$EventFilter) {
                return function () {
                  this.plus_zhpcab$(new _.hu.nevermind.reakt.example.DropDownButton('Filter', _.hu.nevermind.reakt.example.EventFilter.f_1(this$EventFilter)));
                  this.plus_zhpcab$(new _.hu.nevermind.reakt.example.FilterSelectorField(this$EventFilter.state));
                };
              }
            }),
            AddEventDropDownButton: Kotlin.createClass(function () {
              return [_.hu.nevermind.reakt.ReactClass];
            }, function $fun() {
              $fun.baseInitializer.call(this);
            }, /** @lends _.hu.nevermind.reakt.example.AddEventDropDownButton.prototype */ {
              render: function () {
                var tmp$0, tmp$1;
                var eventsByTemplateIds = Kotlin.modules['stdlib'].kotlin.hashMapOf_eoa9s7$([]);
                Kotlin.modules['stdlib'].kotlin.forEach_p7e0bo$(_.hu.nevermind.timeline.store.EventTemplateStore.getTemplates().values(), _.hu.nevermind.reakt.example.AddEventDropDownButton.render$f(eventsByTemplateIds));
                Kotlin.modules['stdlib'].kotlin.forEach_p7e0bo$(_.hu.nevermind.timeline.store.EventStore.getEvents().values(), _.hu.nevermind.reakt.example.AddEventDropDownButton.render$f_0(eventsByTemplateIds));
                tmp$0 = Kotlin.modules['stdlib'].kotlin.sortBy_cvgzri$(eventsByTemplateIds.entrySet(), _.hu.nevermind.reakt.example.AddEventDropDownButton.render$f_1);
                var orderedTemplateIds = Kotlin.modules['stdlib'].kotlin.map_m3yiqg$(tmp$0, _.hu.nevermind.reakt.example.AddEventDropDownButton.render$f_2);
                tmp$1 = Kotlin.modules['stdlib'].kotlin.map_m3yiqg$(Kotlin.modules['stdlib'].kotlin.reverse_ir3nkc$(orderedTemplateIds), _.hu.nevermind.reakt.example.AddEventDropDownButton.render$f_3);
                var items = tmp$1;
                return (new _.hu.nevermind.reakt.example.DropDownButton('Add', _.hu.nevermind.reakt.example.AddEventDropDownButton.render$f_4(items))).render();
              }
            }, /** @lends _.hu.nevermind.reakt.example.AddEventDropDownButton */ {
              render$f: function (eventsByTemplateIds) {
                return function (it) {
                  eventsByTemplateIds.put_wn2jw4$(it.id, 0);
                };
              },
              render$f_0: function (eventsByTemplateIds) {
                return function (it) {
                  var tmp$0;
                  ((tmp$0 = eventsByTemplateIds.get_za3rmp$(it.templateId)) != null ? tmp$0 : Kotlin.throwNPE()) + 1;
                };
              },
              render$f_1: function (it) {
                return it.getValue();
              },
              render$f_2: function (it) {
                return it.getKey();
              },
              createEventCreationPayload$f: function (it) {
                return it.value;
              },
              createEventCreationPayload$f_0: function (template) {
                return function (index, value) {
                  var templateFieldId = template.fieldIds.get_za3lpa$(index);
                  var fieldTemplate = _.hu.nevermind.timeline.store.EventTemplateFieldStore.get(templateFieldId);
                  var extractedValue = fieldTemplate.type.readValue(value);
                  return new _.hu.nevermind.timeline.EventFieldCreationPayload(fieldTemplate.id, extractedValue);
                };
              },
              createEventCreationPayload: function (eventFormSchema, template) {
                return function () {
                  var tmp$0, tmp$1;
                  var date = _.net.yested.utils.Moment.object.parse_puj7f4$(eventFormSchema.dateInput.value, eventFormSchema.dateFormat.toString());
                  var comment = eventFormSchema.commentInput.value;
                  tmp$0 = Kotlin.modules['stdlib'].kotlin.map_m3yiqg$(eventFormSchema.fieldInputs, _.hu.nevermind.reakt.example.AddEventDropDownButton.createEventCreationPayload$f);
                  tmp$1 = Kotlin.modules['stdlib'].kotlin.mapIndexed_v62v4j$(tmp$0, _.hu.nevermind.reakt.example.AddEventDropDownButton.createEventCreationPayload$f_0(template));
                  var eventFieldCreationPayload = tmp$1;
                  var eventChangePayload = new _.hu.nevermind.timeline.EventCreationPayload(template.id, date, comment, eventFieldCreationPayload);
                  return eventChangePayload;
                };
              },
              f: function (createEventCreationPayload) {
                return function () {
                  var eventCreationPayload = createEventCreationPayload();
                  _.hu.nevermind.timeline.Actions.eventCreated.dispatch_za3rmp$(eventCreationPayload);
                };
              },
              f_0: function (template) {
                return function () {
                  var eventFormSchema = new _.hu.nevermind.reakt.example.EventFormSchema(template);
                  var createEventCreationPayload = _.hu.nevermind.reakt.example.AddEventDropDownButton.createEventCreationPayload(eventFormSchema, template);
                  var eventEditorModalWindowState = new _.hu.nevermind.timeline.EventEditorModalState(template, eventFormSchema, null, _.hu.nevermind.reakt.example.AddEventDropDownButton.f(createEventCreationPayload));
                  _.hu.nevermind.timeline.Actions.eventEditorModalStateChanged.dispatch_za3rmp$(eventEditorModalWindowState);
                };
              },
              render$f_3: function (it) {
                var template = _.hu.nevermind.timeline.store.EventTemplateStore.get(it);
                return new _.hu.nevermind.reakt.example.DropDownButtonItem(template.name, _.hu.nevermind.reakt.example.AddEventDropDownButton.f_0(template));
              },
              render$f_4: function (items) {
                return function () {
                  this.plus_ow6yss$(items);
                };
              }
            }),
            EventGridRow: Kotlin.createClass(function () {
              return [_.hu.nevermind.reakt.ReactClass];
            }, function $fun(event) {
              $fun.baseInitializer.call(this);
              this.event = event;
            }, /** @lends _.hu.nevermind.reakt.example.EventGridRow.prototype */ {
              render: function () {
                var tmp$0;
                var templ = _.hu.nevermind.timeline.store.EventTemplateStore.get(this.event.templateId);
                if (templ.useDateTime) {
                  tmp$0 = _.net.yested.utils.format_hliocp$(_.hu.nevermind.reakt.example.EventGridRow.render$f);
                }
                 else {
                  tmp$0 = _.net.yested.utils.format_hliocp$(_.hu.nevermind.reakt.example.EventGridRow.render$f_0);
                }
                var dateFormat = tmp$0;
                return _.hu.nevermind.reakt.tr_3topnc$([], _.hu.nevermind.reakt.example.EventGridRow.render$f_1(this, dateFormat, templ));
              }
            }, /** @lends _.hu.nevermind.reakt.example.EventGridRow */ {
              render$f: function () {
                return this.year.fourDigits.plus('.').plus_9xull5$(this.month.twoDigits).plus_61zpoe$('.').plus_9xull5$(this.dayOfMonth.twoDigits).plus_61zpoe$(' ').plus_9xull5$(this.hour24.twoDigits).plus_61zpoe$(':').plus_9xull5$(this.minutes.twoDigits);
              },
              render$f_0: function () {
                return this.year.fourDigits.plus('.').plus_9xull5$(this.month.twoDigits).plus_61zpoe$('.').plus_9xull5$(this.dayOfMonth.twoDigits);
              },
              f: function (this$EventGridRow, dateFormat) {
                return function () {
                  this.plus_pdl1w0$(this$EventGridRow.event.date.format_k6n0qe$(dateFormat));
                };
              },
              f_0: function (templ) {
                return function () {
                  this.plus_pdl1w0$(templ.name);
                };
              },
              f_1: function (field) {
                return function () {
                  var fieldTemplate = _.hu.nevermind.timeline.store.EventTemplateFieldStore.get(field.templateFieldId);
                  this.plus_pdl1w0$(fieldTemplate.name);
                };
              },
              f_2: function (field) {
                return function () {
                  this.plus_pdl1w0$(Kotlin.toString(field.fieldValue));
                };
              },
              createEventCreationPayload$f: function (it) {
                return it.value;
              },
              createEventCreationPayload$f_0: function (this$EventGridRow) {
                return function (index, value) {
                  var field = _.hu.nevermind.timeline.store.EventStore.getField(this$EventGridRow.event.fieldIds.get_za3lpa$(index));
                  var fieldTemplate = _.hu.nevermind.timeline.store.EventTemplateFieldStore.get(field.templateFieldId);
                  var extractedValue = fieldTemplate.type.readValue(value);
                  return new _.hu.nevermind.timeline.EventFieldCreationPayload(fieldTemplate.id, extractedValue);
                };
              },
              createEventCreationPayload: function (eventFormSchema, dateFormat, this$EventGridRow) {
                return function () {
                  var tmp$0, tmp$1;
                  var date = _.net.yested.utils.Moment.object.parse_puj7f4$(eventFormSchema.dateInput.value, dateFormat.toString());
                  var comment = eventFormSchema.commentInput.value;
                  tmp$0 = Kotlin.modules['stdlib'].kotlin.map_m3yiqg$(eventFormSchema.fieldInputs, _.hu.nevermind.reakt.example.EventGridRow.createEventCreationPayload$f);
                  tmp$1 = Kotlin.modules['stdlib'].kotlin.mapIndexed_v62v4j$(tmp$0, _.hu.nevermind.reakt.example.EventGridRow.createEventCreationPayload$f_0(this$EventGridRow));
                  var eventFieldChangesPayload = tmp$1;
                  var copyEvent = this$EventGridRow.event.copy_qjs4h0$(new _.hu.nevermind.timeline.entities.Id(0));
                  var eventChangePayload = new _.hu.nevermind.timeline.EventCreationPayload(copyEvent.templateId, date, comment, eventFieldChangesPayload);
                  return eventChangePayload;
                };
              },
              f_3: function (createEventCreationPayload) {
                return function () {
                  var eventCreationPayload = createEventCreationPayload();
                  _.hu.nevermind.timeline.Actions.eventCreated.dispatch_za3rmp$(eventCreationPayload);
                };
              },
              f_4: function (templ, dateFormat, this$EventGridRow) {
                return function () {
                  var eventFormSchema = new _.hu.nevermind.reakt.example.EventFormSchema(templ);
                  var createEventCreationPayload = _.hu.nevermind.reakt.example.EventGridRow.createEventCreationPayload(eventFormSchema, dateFormat, this$EventGridRow);
                  var eventEditorModalWindowState = new _.hu.nevermind.timeline.EventEditorModalState(templ, eventFormSchema, this$EventGridRow.event, _.hu.nevermind.reakt.example.EventGridRow.f_3(createEventCreationPayload));
                  _.hu.nevermind.timeline.Actions.eventEditorModalStateChanged.dispatch_za3rmp$(eventEditorModalWindowState);
                };
              },
              createEventChangePayload$f: function (it) {
                return it.value;
              },
              createEventChangePayload$f_0: function (this$EventGridRow) {
                return function (index, value) {
                  var field = _.hu.nevermind.timeline.store.EventStore.getField(this$EventGridRow.event.fieldIds.get_za3lpa$(index));
                  var fieldTemplate = _.hu.nevermind.timeline.store.EventTemplateFieldStore.get(field.templateFieldId);
                  var extractedValue = fieldTemplate.type.readValue(value);
                  return new _.hu.nevermind.timeline.EventFieldChangePayload(field.id, extractedValue);
                };
              },
              createEventChangePayload: function (eventFormSchema, dateFormat, this$EventGridRow) {
                return function () {
                  var tmp$0, tmp$1;
                  var date = _.net.yested.utils.Moment.object.parse_puj7f4$(eventFormSchema.dateInput.value, dateFormat.toString());
                  tmp$0 = Kotlin.modules['stdlib'].kotlin.map_m3yiqg$(eventFormSchema.fieldInputs, _.hu.nevermind.reakt.example.EventGridRow.createEventChangePayload$f);
                  tmp$1 = Kotlin.modules['stdlib'].kotlin.mapIndexed_v62v4j$(tmp$0, _.hu.nevermind.reakt.example.EventGridRow.createEventChangePayload$f_0(this$EventGridRow));
                  var eventFieldChangesPayload = tmp$1;
                  var eventChangePayload = new _.hu.nevermind.timeline.EventChangePayload(this$EventGridRow.event.id, date, eventFieldChangesPayload);
                  return eventChangePayload;
                };
              },
              f_5: function (createEventChangePayload) {
                return function () {
                  var eventChangePayload = createEventChangePayload();
                  _.hu.nevermind.timeline.Actions.eventEdited.dispatch_za3rmp$(eventChangePayload);
                };
              },
              f_6: function (templ, dateFormat, this$EventGridRow) {
                return function () {
                  var eventFormSchema = new _.hu.nevermind.reakt.example.EventFormSchema(templ);
                  var createEventChangePayload = _.hu.nevermind.reakt.example.EventGridRow.createEventChangePayload(eventFormSchema, dateFormat, this$EventGridRow);
                  var eventEditorModalWindowState = new _.hu.nevermind.timeline.EventEditorModalState(templ, eventFormSchema, this$EventGridRow.event, _.hu.nevermind.reakt.example.EventGridRow.f_5(createEventChangePayload));
                  _.hu.nevermind.timeline.Actions.eventEditorModalStateChanged.dispatch_za3rmp$(eventEditorModalWindowState);
                };
              },
              f_7: function () {
              },
              f_8: function (templ, dateFormat, this$EventGridRow) {
                return function () {
                  var onCopyClick = _.hu.nevermind.reakt.example.EventGridRow.f_4(templ, dateFormat, this$EventGridRow);
                  var onEditClick = _.hu.nevermind.reakt.example.EventGridRow.f_6(templ, dateFormat, this$EventGridRow);
                  this.plus_zhpcab$(new _.hu.nevermind.reakt.example.SplitDropDownButton(new _.hu.nevermind.reakt.example.DropDownButtonItem('Edit', onEditClick), [new _.hu.nevermind.reakt.example.DropDownButtonItem('Copy', onCopyClick), new _.hu.nevermind.reakt.example.DropDownButtonItem('Delete', _.hu.nevermind.reakt.example.EventGridRow.f_7)]));
                };
              },
              render$f_1: function (this$EventGridRow, dateFormat, templ) {
                return function () {
                  this.plus_oclkc7$(_.hu.nevermind.reakt.td_3topnc$([], _.hu.nevermind.reakt.example.EventGridRow.f(this$EventGridRow, dateFormat)));
                  this.plus_oclkc7$(_.hu.nevermind.reakt.td_3topnc$([], _.hu.nevermind.reakt.example.EventGridRow.f_0(templ)));
                  var field = _.hu.nevermind.timeline.store.EventStore.getField(this$EventGridRow.event.fieldIds.get_za3lpa$(0));
                  this.plus_oclkc7$(_.hu.nevermind.reakt.td_3topnc$([], _.hu.nevermind.reakt.example.EventGridRow.f_1(field)));
                  this.plus_oclkc7$(_.hu.nevermind.reakt.td_3topnc$([], _.hu.nevermind.reakt.example.EventGridRow.f_2(field)));
                  this.plus_oclkc7$(_.hu.nevermind.reakt.td_3topnc$([Kotlin.modules['stdlib'].kotlin.to_l1ob02$('className', 'col-md-3')], _.hu.nevermind.reakt.example.EventGridRow.f_8(templ, dateFormat, this$EventGridRow)));
                };
              }
            }),
            EventTemplateGridRow: Kotlin.createClass(function () {
              return [_.hu.nevermind.reakt.ReactClass];
            }, function $fun(template) {
              $fun.baseInitializer.call(this);
              this.template = template;
            }, /** @lends _.hu.nevermind.reakt.example.EventTemplateGridRow.prototype */ {
              render: function () {
                return _.hu.nevermind.reakt.tr_3topnc$([], _.hu.nevermind.reakt.example.EventTemplateGridRow.render$f(this));
              }
            }, /** @lends _.hu.nevermind.reakt.example.EventTemplateGridRow */ {
              f: function (this$EventTemplateGridRow) {
                return function () {
                  this.plus_pdl1w0$(this$EventTemplateGridRow.template.name);
                };
              },
              f_0: function () {
              },
              f_1: function () {
              },
              f_2: function () {
              },
              f_3: function () {
                this.plus_zhpcab$(new _.hu.nevermind.reakt.example.SplitDropDownButton(new _.hu.nevermind.reakt.example.DropDownButtonItem('Edit', _.hu.nevermind.reakt.example.EventTemplateGridRow.f_0), [new _.hu.nevermind.reakt.example.DropDownButtonItem('Copy', _.hu.nevermind.reakt.example.EventTemplateGridRow.f_1), new _.hu.nevermind.reakt.example.DropDownButtonItem('Delete', _.hu.nevermind.reakt.example.EventTemplateGridRow.f_2)]));
              },
              render$f: function (this$EventTemplateGridRow) {
                return function () {
                  this.plus_oclkc7$(_.hu.nevermind.reakt.td_3topnc$([], _.hu.nevermind.reakt.example.EventTemplateGridRow.f(this$EventTemplateGridRow)));
                  this.plus_oclkc7$(_.hu.nevermind.reakt.td_3topnc$([Kotlin.modules['stdlib'].kotlin.to_l1ob02$('className', 'col-md-3')], _.hu.nevermind.reakt.example.EventTemplateGridRow.f_3));
                };
              }
            }),
            EventTemplateGrid: Kotlin.createClass(function () {
              return [_.hu.nevermind.reakt.ReactClass];
            }, function $fun(appState) {
              $fun.baseInitializer.call(this);
              this.appState = appState;
            }, /** @lends _.hu.nevermind.reakt.example.EventTemplateGrid.prototype */ {
              render: function () {
                return _.hu.nevermind.reakt.table_3topnc$([Kotlin.modules['stdlib'].kotlin.to_l1ob02$('className', 'table table-striped table-bordered table-hover table-condensed')], _.hu.nevermind.reakt.example.EventTemplateGrid.render$f);
              }
            }, /** @lends _.hu.nevermind.reakt.example.EventTemplateGrid */ {
              f: function () {
                this.plus_pdl1w0$('Name');
              },
              f_0: function () {
                this.plus_pdl1w0$('');
              },
              f_1: function () {
                this.plus_oclkc7$(_.hu.nevermind.reakt.th_3topnc$([Kotlin.modules['stdlib'].kotlin.to_l1ob02$('className', 'col-md-2')], _.hu.nevermind.reakt.example.EventTemplateGrid.f));
                this.plus_oclkc7$(_.hu.nevermind.reakt.th_3topnc$([Kotlin.modules['stdlib'].kotlin.to_l1ob02$('className', 'col-md-3')], _.hu.nevermind.reakt.example.EventTemplateGrid.f_0));
              },
              f_2: function () {
                this.plus_oclkc7$(_.hu.nevermind.reakt.tr_3topnc$([], _.hu.nevermind.reakt.example.EventTemplateGrid.f_1));
              },
              f_3: function (this$) {
                return function (it) {
                  this$.plus_zhpcab$(new _.hu.nevermind.reakt.example.EventTemplateGridRow(it));
                };
              },
              f_4: function () {
                Kotlin.modules['stdlib'].kotlin.forEach_p7e0bo$(_.hu.nevermind.timeline.store.EventTemplateStore.getTemplates().values(), _.hu.nevermind.reakt.example.EventTemplateGrid.f_3(this));
              },
              render$f: function () {
                this.plus_oclkc7$(_.hu.nevermind.reakt.thead_3topnc$([], _.hu.nevermind.reakt.example.EventTemplateGrid.f_2));
                this.plus_oclkc7$(_.hu.nevermind.reakt.tbody_3topnc$([], _.hu.nevermind.reakt.example.EventTemplateGrid.f_4));
              }
            }),
            EventGrid: Kotlin.createClass(function () {
              return [_.hu.nevermind.reakt.ReactClass];
            }, function $fun(appState) {
              $fun.baseInitializer.call(this);
              this.appState = appState;
            }, /** @lends _.hu.nevermind.reakt.example.EventGrid.prototype */ {
              render: function () {
                return _.hu.nevermind.reakt.table_3topnc$([Kotlin.modules['stdlib'].kotlin.to_l1ob02$('className', 'table table-striped table-bordered table-hover table-condensed')], _.hu.nevermind.reakt.example.EventGrid.render$f(this));
              }
            }, /** @lends _.hu.nevermind.reakt.example.EventGrid */ {
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
              f_5: function () {
                this.plus_oclkc7$(_.hu.nevermind.reakt.tr_3topnc$([], _.hu.nevermind.reakt.example.EventGrid.f_4));
              },
              f_6: function (this$EventGrid) {
                return function (it) {
                  return this$EventGrid.appState.filteringTemplateIds.contains_za3rmp$(it.templateId);
                };
              },
              f_7: function (it) {
                return it.date.millisecondsSinceUnixEpoch;
              },
              f_8: function (this$) {
                return function (it) {
                  this$.plus_zhpcab$(new _.hu.nevermind.reakt.example.EventGridRow(it));
                };
              },
              f_9: function (this$EventGrid) {
                return function () {
                  var tmp$0, tmp$1, tmp$2;
                  if (this$EventGrid.appState.filteringTemplateIds.isEmpty()) {
                    tmp$1 = _.hu.nevermind.timeline.store.EventStore.getEvents().values();
                  }
                   else {
                    tmp$0 = Kotlin.modules['stdlib'].kotlin.filter_azvtw4$(_.hu.nevermind.timeline.store.EventStore.getEvents().values(), _.hu.nevermind.reakt.example.EventGrid.f_6(this$EventGrid));
                    tmp$1 = tmp$0;
                  }
                  tmp$2 = Kotlin.modules['stdlib'].kotlin.sortBy_cvgzri$(tmp$1, _.hu.nevermind.reakt.example.EventGrid.f_7);
                  Kotlin.modules['stdlib'].kotlin.forEach_p7e0bo$(Kotlin.modules['stdlib'].kotlin.reverse_ir3nkc$(tmp$2), _.hu.nevermind.reakt.example.EventGrid.f_8(this));
                };
              },
              render$f: function (this$EventGrid) {
                return function () {
                  this.plus_oclkc7$(_.hu.nevermind.reakt.thead_3topnc$([], _.hu.nevermind.reakt.example.EventGrid.f_5));
                  this.plus_oclkc7$(_.hu.nevermind.reakt.tbody_3topnc$([], _.hu.nevermind.reakt.example.EventGrid.f_9(this$EventGrid)));
                };
              }
            }),
            TimelineAppState: Kotlin.createClass(null, function (filteringTemplateIds, isEventEditorShown) {
              this.filteringTemplateIds = filteringTemplateIds;
              this.isEventEditorShown = isEventEditorShown;
            }, /** @lends _.hu.nevermind.reakt.example.TimelineAppState.prototype */ {
              component1: function () {
                return this.filteringTemplateIds;
              },
              component2: function () {
                return this.isEventEditorShown;
              },
              copy: function (filteringTemplateIds, isEventEditorShown) {
                return new _.hu.nevermind.reakt.example.TimelineAppState(filteringTemplateIds === void 0 ? this.filteringTemplateIds : filteringTemplateIds, isEventEditorShown === void 0 ? this.isEventEditorShown : isEventEditorShown);
              },
              toString: function () {
                return 'TimelineAppState(filteringTemplateIds=' + Kotlin.toString(this.filteringTemplateIds) + (', isEventEditorShown=' + Kotlin.toString(this.isEventEditorShown)) + ')';
              },
              hashCode: function () {
                var result = 0;
                result = result * 31 + Kotlin.hashCode(this.filteringTemplateIds) | 0;
                result = result * 31 + Kotlin.hashCode(this.isEventEditorShown) | 0;
                return result;
              },
              equals_za3rmp$: function (other) {
                return this === other || (other !== null && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.filteringTemplateIds, other.filteringTemplateIds) && Kotlin.equals(this.isEventEditorShown, other.isEventEditorShown))));
              }
            }),
            ModalData: Kotlin.createClass(null, function (visible, data) {
              this.visible = visible;
              this.data = data;
            }, /** @lends _.hu.nevermind.reakt.example.ModalData.prototype */ {
              component1: function () {
                return this.visible;
              },
              component2: function () {
                return this.data;
              },
              copy: function (visible, data) {
                return new _.hu.nevermind.reakt.example.ModalData(visible === void 0 ? this.visible : visible, data === void 0 ? this.data : data);
              },
              toString: function () {
                return 'ModalData(visible=' + Kotlin.toString(this.visible) + (', data=' + Kotlin.toString(this.data)) + ')';
              },
              hashCode: function () {
                var result = 0;
                result = result * 31 + Kotlin.hashCode(this.visible) | 0;
                result = result * 31 + Kotlin.hashCode(this.data) | 0;
                return result;
              },
              equals_za3rmp$: function (other) {
                return this === other || (other !== null && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.visible, other.visible) && Kotlin.equals(this.data, other.data))));
              }
            }),
            ModalWindow: Kotlin.createClass(function () {
              return [_.hu.nevermind.reakt.ReactClass];
            }, function $fun() {
              $fun.baseInitializer.call(this);
            }, /** @lends _.hu.nevermind.reakt.example.ModalWindow.prototype */ {
              render: function () {
                var style = _.hu.nevermind.reakt.example.ModalWindow.render$f();
                return _.hu.nevermind.reakt.div_3topnc$([Kotlin.modules['stdlib'].kotlin.to_l1ob02$('className', 'modal fade in'), Kotlin.modules['stdlib'].kotlin.to_l1ob02$('style', style)], _.hu.nevermind.reakt.example.ModalWindow.render$f_0(this));
              }
            }, /** @lends _.hu.nevermind.reakt.example.ModalWindow */ {
              render$f: function () {
                return Kotlin.createObject(null, function () {
                  this.display = 'block';
                });
              },
              f: function (this$ModalWindow) {
                return function () {
                  this.plus_oclkc7$(this$ModalWindow.header());
                };
              },
              f_0: function (this$ModalWindow) {
                return function () {
                  this.plus_oclkc7$(this$ModalWindow.content());
                };
              },
              f_1: function (this$ModalWindow) {
                return function () {
                  this.plus_oclkc7$(this$ModalWindow.footer());
                };
              },
              f_2: function (this$ModalWindow) {
                return function () {
                  this.plus_oclkc7$(_.hu.nevermind.reakt.div_3topnc$([Kotlin.modules['stdlib'].kotlin.to_l1ob02$('className', 'modal-header')], _.hu.nevermind.reakt.example.ModalWindow.f(this$ModalWindow)));
                  this.plus_oclkc7$(_.hu.nevermind.reakt.div_3topnc$([Kotlin.modules['stdlib'].kotlin.to_l1ob02$('className', 'modal-body')], _.hu.nevermind.reakt.example.ModalWindow.f_0(this$ModalWindow)));
                  this.plus_oclkc7$(_.hu.nevermind.reakt.div_3topnc$([Kotlin.modules['stdlib'].kotlin.to_l1ob02$('className', 'modal-footer')], _.hu.nevermind.reakt.example.ModalWindow.f_1(this$ModalWindow)));
                };
              },
              f_3: function (this$ModalWindow) {
                return function () {
                  this.plus_oclkc7$(_.hu.nevermind.reakt.div_3topnc$([Kotlin.modules['stdlib'].kotlin.to_l1ob02$('className', 'modal-content')], _.hu.nevermind.reakt.example.ModalWindow.f_2(this$ModalWindow)));
                };
              },
              render$f_0: function (this$ModalWindow) {
                return function () {
                  this.plus_oclkc7$(_.hu.nevermind.reakt.div_3topnc$([Kotlin.modules['stdlib'].kotlin.to_l1ob02$('className', 'modal-dialog')], _.hu.nevermind.reakt.example.ModalWindow.f_3(this$ModalWindow)));
                };
              }
            }),
            eventDateFormat$f: function () {
              return this.year.fourDigits.plus('.').plus_9xull5$(this.month.twoDigits).plus_61zpoe$('.').plus_9xull5$(this.dayOfMonth.twoDigits).plus_61zpoe$(' ').plus_9xull5$(this.hour24.twoDigits).plus_61zpoe$(':').plus_9xull5$(this.minutes.twoDigits);
            },
            eventDateFormat$f_0: function () {
              return this.year.fourDigits.plus('.').plus_9xull5$(this.month.twoDigits).plus_61zpoe$('.').plus_9xull5$(this.dayOfMonth.twoDigits);
            },
            eventDateFormat: function (event) {
              var tmp$0;
              var templ = _.hu.nevermind.timeline.store.EventTemplateStore.get(event.templateId);
              if (templ.useDateTime) {
                tmp$0 = _.net.yested.utils.format_hliocp$(_.hu.nevermind.reakt.example.eventDateFormat$f);
              }
               else {
                tmp$0 = _.net.yested.utils.format_hliocp$(_.hu.nevermind.reakt.example.eventDateFormat$f_0);
              }
              return tmp$0;
            },
            EventEditorModalParent: Kotlin.createClass(function () {
              return [_.hu.nevermind.reakt.StatefulReactClass];
            }, function $fun() {
              $fun.baseInitializer.call(this, new _.hu.nevermind.reakt.example.ModalData(false, null));
            }, /** @lends _.hu.nevermind.reakt.example.EventEditorModalParent.prototype */ {
              render: function () {
                var tmp$0, tmp$1;
                if (this.state.visible) {
                  tmp$1 = (new _.hu.nevermind.reakt.example.EventEditorModal((tmp$0 = this.state.data) != null ? tmp$0 : Kotlin.throwNPE(), _.hu.nevermind.reakt.example.EventEditorModalParent.render$f)).createElement();
                }
                 else {
                  tmp$1 = _.hu.nevermind.reakt.div_3topnc$([], _.hu.nevermind.reakt.example.EventEditorModalParent.render$f_0);
                }
                return tmp$1;
              },
              componentDidMount: function () {
                _.hu.nevermind.timeline.store.ModalWindowStore.addChangeListener_o7wwlr$(this, _.hu.nevermind.reakt.example.EventEditorModalParent.componentDidMount$f(this));
              },
              componentWillUnmount: function () {
                _.hu.nevermind.timeline.store.ModalWindowStore.removeListener_za3rmp$(this);
              }
            }, /** @lends _.hu.nevermind.reakt.example.EventEditorModalParent */ {
              render$f: function () {
                _.hu.nevermind.timeline.Actions.eventEditorModalStateChanged.dispatch_za3rmp$(null);
              },
              render$f_0: function () {
              },
              f: function () {
                var newState = _.hu.nevermind.timeline.store.ModalWindowStore.eventEditorModalState;
                return new _.hu.nevermind.reakt.example.ModalData(newState != null, newState);
              },
              componentDidMount$f: function (this$EventEditorModalParent) {
                return function () {
                  this$EventEditorModalParent.changeState_un3fny$(_.hu.nevermind.reakt.example.EventEditorModalParent.f);
                };
              }
            }),
            EventEditorModal: Kotlin.createClass(function () {
              return [_.hu.nevermind.reakt.example.ModalWindow];
            }, function $fun(data, onCancel) {
              $fun.baseInitializer.call(this);
              this.data = data;
              this.onCancel = onCancel;
            }, /** @lends _.hu.nevermind.reakt.example.EventEditorModal.prototype */ {
              templ_hgxero$: {
                get: function () {
                  return this.data.eventTemplate;
                }
              },
              componentDidMount: function () {
                _.hu.nevermind.reakt.example.ModalWindow.prototype.componentDidMount.call(this);
                if (this.data.event != null) {
                  this.data.eventFormSchema.setData(this.data.event);
                }
              },
              componentWillUnmount: function () {
              },
              header: function () {
                return _.hu.nevermind.reakt.h1_3topnc$(void 0, _.hu.nevermind.reakt.example.EventEditorModal.header$f(this));
              },
              content: function () {
                var tmp$0;
                return (tmp$0 = (new _.hu.nevermind.reakt.example.Form(this.templ_hgxero$.name, this.data.eventFormSchema)).render()) != null ? tmp$0 : Kotlin.throwNPE();
              },
              footer: function () {
                return _.hu.nevermind.reakt.div_3topnc$([Kotlin.modules['stdlib'].kotlin.to_l1ob02$('className', 'row')], _.hu.nevermind.reakt.example.EventEditorModal.footer$f(this));
              }
            }, /** @lends _.hu.nevermind.reakt.example.EventEditorModal */ {
              header$f: function (this$EventEditorModal) {
                return function () {
                  this.plus_pdl1w0$(this$EventEditorModal.templ_hgxero$.name);
                };
              },
              f: function () {
                this.plus_pdl1w0$('Save');
              },
              f_0: function (this$EventEditorModal) {
                return function () {
                  this.plus_oclkc7$(_.hu.nevermind.reakt.button_tqynw0$(_.hu.nevermind.reakt.ButtonType.object.BUTTON, [Kotlin.modules['stdlib'].kotlin.to_l1ob02$('className', 'btn btn-success btn-xs'), Kotlin.modules['stdlib'].kotlin.to_l1ob02$('onClick', this$EventEditorModal.data.onSave)], _.hu.nevermind.reakt.example.EventEditorModal.f));
                };
              },
              f_1: function () {
                this.plus_pdl1w0$('Cancel');
              },
              f_2: function (this$EventEditorModal) {
                return function () {
                  this.plus_oclkc7$(_.hu.nevermind.reakt.button_tqynw0$(_.hu.nevermind.reakt.ButtonType.object.BUTTON, [Kotlin.modules['stdlib'].kotlin.to_l1ob02$('className', 'btn btn-warning btn-xs'), Kotlin.modules['stdlib'].kotlin.to_l1ob02$('onClick', this$EventEditorModal.onCancel)], _.hu.nevermind.reakt.example.EventEditorModal.f_1));
                };
              },
              footer$f: function (this$EventEditorModal) {
                return function () {
                  this.plus_oclkc7$(_.hu.nevermind.reakt.div_3topnc$([Kotlin.modules['stdlib'].kotlin.to_l1ob02$('className', 'col-md-1')], _.hu.nevermind.reakt.example.EventEditorModal.f_0(this$EventEditorModal)));
                  this.plus_oclkc7$(_.hu.nevermind.reakt.div_3topnc$([Kotlin.modules['stdlib'].kotlin.to_l1ob02$('className', 'col-md-1')], _.hu.nevermind.reakt.example.EventEditorModal.f_2(this$EventEditorModal)));
                };
              }
            }),
            TimelineApp: Kotlin.createClass(function () {
              return [_.hu.nevermind.reakt.StatefulReactClass];
            }, function $fun() {
              $fun.baseInitializer.call(this, new _.hu.nevermind.reakt.example.TimelineAppState(Kotlin.modules['stdlib'].kotlin.emptyList(), false));
            }, /** @lends _.hu.nevermind.reakt.example.TimelineApp.prototype */ {
              componentDidMount: function () {
                _.hu.nevermind.timeline.store.EventStore.addChangeListener_o7wwlr$(this, _.hu.nevermind.reakt.example.TimelineApp.componentDidMount$f(this));
                _.hu.nevermind.timeline.store.AppStore.addChangeListener_o7wwlr$(this, _.hu.nevermind.reakt.example.TimelineApp.componentDidMount$f_0(this));
              },
              validate: function (event) {
                Kotlin.modules['stdlib'].kotlin.forEach_p7e0bo$(event.fieldIds, _.hu.nevermind.reakt.example.TimelineApp.validate$f(event));
              },
              componentWillUnmount: function () {
                _.hu.nevermind.timeline.store.EventStore.removeListener_za3rmp$(this);
              },
              render: function () {
                return _.hu.nevermind.reakt.div_3topnc$([], _.hu.nevermind.reakt.example.TimelineApp.render$f(this));
              }
            }, /** @lends _.hu.nevermind.reakt.example.TimelineApp */ {
              f: function (this$TimelineApp) {
                return function (event) {
                  this$TimelineApp.validate(event);
                };
              },
              componentDidMount$f: function (this$TimelineApp) {
                return function () {
                  Kotlin.modules['stdlib'].kotlin.forEach_p7e0bo$(_.hu.nevermind.timeline.store.EventStore.getEvents().values(), _.hu.nevermind.reakt.example.TimelineApp.f(this$TimelineApp));
                  this$TimelineApp.forceUpdate();
                };
              },
              f_0: function (this$TimelineApp) {
                return function () {
                  return this$TimelineApp.state.copy(_.hu.nevermind.timeline.store.AppStore.filteringTemplateIds);
                };
              },
              componentDidMount$f_0: function (this$TimelineApp) {
                return function () {
                  this$TimelineApp.changeState_un3fny$(_.hu.nevermind.reakt.example.TimelineApp.f_0(this$TimelineApp));
                };
              },
              validate$f: function (event) {
                return function (fieldId) {
                  var eventTemplate = _.hu.nevermind.timeline.store.EventTemplateStore.getTemplates().get_za3rmp$(event.templateId);
                  if (eventTemplate == null) {
                    Kotlin.println('Missing templateID: ' + event.templateId + '\n' + '\t' + event + '\n' + '\t' + Kotlin.toString(eventTemplate));
                  }
                  var eventField = _.hu.nevermind.timeline.store.EventStore.getFields().get_za3rmp$(fieldId);
                  if (eventField == null) {
                    Kotlin.println('Missing fieldId: ' + fieldId + '\n' + '\t' + event + '\n' + '\t' + Kotlin.toString(eventTemplate));
                  }
                   else {
                    if (_.hu.nevermind.timeline.store.EventTemplateFieldStore.getFields().get_za3rmp$(eventField.templateFieldId) == null) {
                      Kotlin.println('Missing templateFieldId: ' + eventField.templateFieldId + '\n' + '\t' + event + '\n' + '\t' + Kotlin.toString(eventField) + '\n' + '\t' + Kotlin.toString(eventTemplate));
                    }
                  }
                };
              },
              f_1: function () {
                this.plus_pdl1w0$('Events');
              },
              f_2: function (this$TimelineApp) {
                return function () {
                  this.plus_oclkc7$(_.hu.nevermind.reakt.h1_3topnc$(void 0, _.hu.nevermind.reakt.example.TimelineApp.f_1));
                  this.plus_zhpcab$(new _.hu.nevermind.reakt.example.AddEventDropDownButton());
                  this.plus_zhpcab$(new _.hu.nevermind.reakt.example.EventFilter(this$TimelineApp.state.filteringTemplateIds));
                  this.plus_zhpcab$(new _.hu.nevermind.reakt.example.EventGrid(this$TimelineApp.state));
                };
              },
              f_3: function (this$TimelineApp) {
                return function () {
                  this.plus_zhpcab$(new _.hu.nevermind.reakt.example.EventTemplateGrid(this$TimelineApp.state));
                };
              },
              f_4: function (this$TimelineApp) {
                return function () {
                  this.plus_oclkc7$(_.hu.nevermind.reakt.div_3topnc$([Kotlin.modules['stdlib'].kotlin.to_l1ob02$('className', 'col-md-6')], _.hu.nevermind.reakt.example.TimelineApp.f_2(this$TimelineApp)));
                  this.plus_oclkc7$(_.hu.nevermind.reakt.div_3topnc$([Kotlin.modules['stdlib'].kotlin.to_l1ob02$('className', 'col-md-4 col-md-offset-2')], _.hu.nevermind.reakt.example.TimelineApp.f_3(this$TimelineApp)));
                  this.plus_zhpcab$(new _.hu.nevermind.reakt.example.EventEditorModalParent());
                };
              },
              render$f: function (this$TimelineApp) {
                return function () {
                  this.plus_oclkc7$(_.hu.nevermind.reakt.div_3topnc$([Kotlin.modules['stdlib'].kotlin.to_l1ob02$('className', 'row')], _.hu.nevermind.reakt.example.TimelineApp.f_4(this$TimelineApp)));
                };
              }
            }),
            main_kand9s$: function (args) {
              var tmp$0;
              React.createElement('div');
              if (!window.location.href.endsWith('?test')) {
                _.hu.nevermind.timeline.username = (tmp$0 = localStorage.getItem('username')) != null ? tmp$0 : '';
                if (Kotlin.equals(_.hu.nevermind.timeline.username, '')) {
                  var tmpUser = '';
                  tmpUser = prompt('Please enter your name');
                  _.hu.nevermind.timeline.username = tmpUser;
                  localStorage.setItem('username', _.hu.nevermind.timeline.username);
                }
                _.net.yested.utils.Moment.object.setLocale('hu');
                _.hu.nevermind.reakt.React.render_40g7my$((new _.hu.nevermind.reakt.example.TimelineApp()).createElement(), document.getElementById('timelineApp'));
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
            queryEntitiesFromServer$f_3: function (templates) {
              var tmp$0, tmp$1;
              tmp$1 = Kotlin.modules['stdlib'].kotlin.map_rie7ol$((tmp$0 = templates.fields) != null ? tmp$0 : Kotlin.throwNPE(), _.hu.nevermind.reakt.example.f_0);
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
              var result = JSON.parse('{"events":[{"id":223,"millisecsFrom1970":1422748800000,"name":"T\xC3\xB6meg","templateId":9,"fields":[{"id":315,"type":"FLOAT","name":"t\xC3\xB6meg (kg)","templateFieldId":1,"floatValue":77.2,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":75,"millisecsFrom1970":1420934400000,"name":"T\xC3\xB6meg","templateId":9,"fields":[{"id":269,"type":"FLOAT","name":"t\xC3\xB6meg (kg)","templateFieldId":1,"floatValue":78.2,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":78,"millisecsFrom1970":1421020800000,"name":"T\xC3\xB6meg","templateId":9,"fields":[{"id":272,"type":"FLOAT","name":"t\xC3\xB6meg (kg)","templateFieldId":1,"floatValue":78.5,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":80,"millisecsFrom1970":1421107200000,"name":"T\xC3\xB6meg","templateId":9,"fields":[{"id":275,"type":"FLOAT","name":"t\xC3\xB6meg (kg)","templateFieldId":1,"floatValue":78.5,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":82,"millisecsFrom1970":1421193600000,"name":"T\xC3\xB6meg","templateId":9,"fields":[{"id":180,"type":"FLOAT","name":"t\xC3\xB6meg (kg)","templateFieldId":1,"floatValue":77.8,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":242,"millisecsFrom1970":1423612800000,"name":"\xC3\u2030tel","templateId":18,"fields":[{"id":335,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"k\xC3\xB6les,joghurt,z\xC3\xB6lds\xC3\xA9g,csirke,m\xC3\xA1j,alma,ban\xC3\xA1n"}]},{"id":243,"millisecsFrom1970":1423612800000,"name":"Szelek","templateId":23,"fields":[{"id":336,"type":"SELECT","name":"t\xC3\xADpus","templateFieldId":21,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"zavar\xC3\xB3"}]},{"id":246,"millisecsFrom1970":1423699200000,"name":"Sz\xC3\xA9klet","templateId":17,"fields":[{"id":339,"type":"SELECT","name":"milyen?","templateFieldId":15,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"ok"}]},{"id":224,"millisecsFrom1970":1423353600000,"name":"T\xC3\xB6meg","templateId":9,"fields":[{"id":316,"type":"FLOAT","name":"t\xC3\xB6meg (kg)","templateFieldId":1,"floatValue":77.1,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":245,"millisecsFrom1970":1423612800000,"name":"Sz\xC3\xA9klet","templateId":17,"fields":[{"id":338,"type":"SELECT","name":"milyen?","templateFieldId":15,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"ok"}]},{"id":248,"millisecsFrom1970":1423699200000,"name":"\xC3\u2030tel","templateId":18,"fields":[{"id":341,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"alma"},{"id":342,"type":"INT","name":"mennyit? (g)","templateFieldId":0,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null}]},{"id":249,"millisecsFrom1970":1423699200000,"name":"\xC3\u2030tel","templateId":18,"fields":[{"id":343,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"ban\xC3\xA1n"},{"id":344,"type":"INT","name":"mennyit? (g)","templateFieldId":0,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null}]},{"id":586,"millisecsFrom1970":1423958400000,"name":"Sz\xC3\xA9klet","templateId":17,"fields":[{"id":1307,"type":"SELECT","name":"milyen?","templateFieldId":15,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"nehezen"}]},{"id":589,"millisecsFrom1970":1424044800000,"name":"\xC3\u2030tel","templateId":18,"fields":[{"id":1310,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"zab(80g) aszalv\xC3\xA1nyok(30g) di\xC3\xB3(2) mandula(4) mogyor\xC3\xB3(4) m\xC3\xA9z(1tk)"},{"id":1311,"type":"INT","name":"mennyit? (g)","templateFieldId":24,"floatValue":null,"intValue":0,"boolValue":null,"stringValue":null}]},{"id":218,"millisecsFrom1970":1422662400000,"name":"T\xC3\xB6meg","templateId":9,"fields":[{"id":288,"type":"FLOAT","name":"t\xC3\xB6meg (kg)","templateFieldId":1,"floatValue":76.8,"intValue":86,"boolValue":null,"stringValue":null}]},{"id":590,"millisecsFrom1970":1424044800000,"name":"\xC3\u2030tel","templateId":18,"fields":[{"id":1312,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"hajdina(200g) kelbi(100g) savany\xC3\xBAs\xC3\xA1g(50g) m\xC3\xA1j(100g) olivaolaj(1tk) t\xC3\xB6kmagolaj(1tk) lenmagolaj(1tk)"},{"id":1313,"type":"INT","name":"mennyit? (g)","templateFieldId":24,"floatValue":null,"intValue":0,"boolValue":null,"stringValue":null}]},{"id":591,"millisecsFrom1970":1424044800000,"name":"\xC3\u2030tel","templateId":18,"fields":[{"id":1314,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"rizs(200g) kelbi(100g) savany\xC3\xBAs\xC3\xA1g(50g) m\xC3\xA1j(100g) olivaolaj(1tk) t\xC3\xB6kmagolaj(1tk) lenmagolaj(1tk)"},{"id":1315,"type":"INT","name":"mennyit? (g)","templateFieldId":24,"floatValue":null,"intValue":0,"boolValue":null,"stringValue":null}]},{"id":592,"millisecsFrom1970":1424044800000,"name":"Szex","templateId":20,"fields":[{"id":1316,"type":"SELECT","name":"hossz","templateFieldId":18,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"\xC3\xA1tlag"},{"id":1317,"type":"SELECT","name":"kem\xC3\xA9nys\xC3\xA9g","templateFieldId":19,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"gyenge"}]},{"id":593,"millisecsFrom1970":1424044800000,"name":"Sz\xC3\xA9klet","templateId":17,"fields":[{"id":1318,"type":"SELECT","name":"milyen?","templateFieldId":15,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"ok"}]},{"id":594,"millisecsFrom1970":1424044800000,"name":"Sz\xC3\xA9klet","templateId":17,"fields":[{"id":1319,"type":"SELECT","name":"milyen?","templateFieldId":15,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"ok"}]},{"id":598,"millisecsFrom1970":1423440000000,"name":"Karny\xC3\xBAjt\xC3\xA1s csig\xC3\xA1n","templateId":37,"fields":[{"id":1324,"type":"INT","name":"ism\xC3\xA9tl\xC3\xA9s","templateFieldId":54,"floatValue":null,"intValue":7,"boolValue":null,"stringValue":null},{"id":1325,"type":"INT","name":"sorozat","templateFieldId":55,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null},{"id":1326,"type":"INT","name":"s\xC3\xBAly","templateFieldId":56,"floatValue":null,"intValue":15,"boolValue":null,"stringValue":null}]},{"id":605,"millisecsFrom1970":1424131200000,"name":"T\xC3\xB6meg","templateId":9,"fields":[{"id":1344,"type":"FLOAT","name":"t\xC3\xB6meg (kg)","templateFieldId":1,"floatValue":76.8,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":609,"millisecsFrom1970":1424242800000,"name":"\xC3\u2030tel","templateId":18,"fields":[{"id":1351,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"rizs(100g) kelbi(100g) savany\xC3\xBAs\xC3\xA1g(50g) diszno(100g) olivaolaj(1tk) t\xC3\xB6kmagolaj(1tk) lenmagolaj(1tk)"},{"id":1352,"type":"INT","name":"mennyit? (g)","templateFieldId":24,"floatValue":null,"intValue":0,"boolValue":null,"stringValue":null}]},{"id":611,"millisecsFrom1970":1424250000000,"name":"Sz\xC3\xA9klet","templateId":17,"fields":[{"id":1355,"type":"SELECT","name":"milyen?","templateFieldId":15,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"ok"}]},{"id":615,"millisecsFrom1970":1424413800000,"name":"T\xC3\xB6meg","templateId":9,"fields":[{"id":1359,"type":"FLOAT","name":"t\xC3\xB6meg (kg)","templateFieldId":1,"floatValue":76.2,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":616,"millisecsFrom1970":1424327400000,"name":"T\xC3\xB6meg","templateId":9,"fields":[{"id":1360,"type":"FLOAT","name":"t\xC3\xB6meg (kg)","templateFieldId":1,"floatValue":78.0,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":617,"millisecsFrom1970":1424520000000,"name":"T\xC3\xB6meg","templateId":9,"fields":[{"id":1361,"type":"FLOAT","name":"t\xC3\xB6meg (kg)","templateFieldId":1,"floatValue":76.1,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":652,"millisecsFrom1970":1424905200000,"name":"Szex","templateId":20,"fields":[{"id":1404,"type":"SELECT","name":"hossz","templateFieldId":18,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"\xC3\xA1tlag"},{"id":1405,"type":"SELECT","name":"kem\xC3\xA9nys\xC3\xA9g","templateFieldId":19,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"\xC3\xA1tlag"}]},{"id":631,"millisecsFrom1970":1424347200000,"name":"Sz\xC3\xA9klet","templateId":17,"fields":[{"id":1375,"type":"SELECT","name":"milyen?","templateFieldId":15,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"ok"}]},{"id":633,"millisecsFrom1970":1424433600000,"name":"Alkohol","templateId":21,"fields":[{"id":1377,"type":"INT","name":"mennyit?","templateFieldId":20,"floatValue":null,"intValue":2,"boolValue":null,"stringValue":null}]},{"id":634,"millisecsFrom1970":1424606400000,"name":"T\xC3\xB6meg","templateId":9,"fields":[{"id":1378,"type":"FLOAT","name":"t\xC3\xB6meg (kg)","templateFieldId":1,"floatValue":77.2,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":635,"millisecsFrom1970":1424698800000,"name":"Sz\xC3\xA9klet","templateId":17,"fields":[{"id":1379,"type":"SELECT","name":"milyen?","templateFieldId":15,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"fekete"}]},{"id":637,"millisecsFrom1970":1424770500000,"name":"Sz\xC3\xA9klet","templateId":17,"fields":[{"id":1381,"type":"SELECT","name":"milyen?","templateFieldId":15,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"ok"}]},{"id":643,"millisecsFrom1970":1424865600000,"name":"T\xC3\xB6meg","templateId":9,"fields":[{"id":1387,"type":"FLOAT","name":"t\xC3\xB6meg (kg)","templateFieldId":1,"floatValue":77.4,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":644,"millisecsFrom1970":1424757600000,"name":"\xC3\u2030tel","templateId":18,"fields":[{"id":1388,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"zab(100g),feh\xC3\xA9rje(50g),alma,ban\xC3\xA1n,aszalv\xC3\xA1ny,kefir,tej"},{"id":1389,"type":"INT","name":"mennyit? (g)","templateFieldId":24,"floatValue":null,"intValue":0,"boolValue":null,"stringValue":null}]},{"id":645,"millisecsFrom1970":1424844000000,"name":"\xC3\u2030tel","templateId":18,"fields":[{"id":1390,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"zab(100g),feh\xC3\xA9rje(50g),alma,ban\xC3\xA1n,aszalv\xC3\xA1ny,kefir,tej"},{"id":1391,"type":"INT","name":"mennyit? (g)","templateFieldId":24,"floatValue":null,"intValue":0,"boolValue":null,"stringValue":null}]},{"id":646,"millisecsFrom1970":1424773800000,"name":"\xC3\u2030tel","templateId":18,"fields":[{"id":1392,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"csirke,m\xC3\xA1j(50+50g), r\xC3\xADzs( sz\xC3\xA1razon 100g), savany\xC3\xBA (50g),oliva,t\xC3\xB6kmag,lenmag(1 ek)"},{"id":1393,"type":"INT","name":"mennyit? (g)","templateFieldId":24,"floatValue":null,"intValue":0,"boolValue":null,"stringValue":null}]},{"id":647,"millisecsFrom1970":1424790000000,"name":"\xC3\u2030tel","templateId":18,"fields":[{"id":1394,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"csirke,m\xC3\xA1j(50+50g), r\xC3\xADzs( sz\xC3\xA1razon 100g), savany\xC3\xBA (50g),oliva,t\xC3\xB6kmag,lenmag(1 ek)"},{"id":1395,"type":"INT","name":"mennyit? (g)","templateFieldId":24,"floatValue":null,"intValue":0,"boolValue":null,"stringValue":null}]},{"id":648,"millisecsFrom1970":1424806200000,"name":"\xC3\u2030tel","templateId":18,"fields":[{"id":1396,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"t\xC3\xB6kf\xC5\u2018zel\xC3\xA9k mamit\xC3\xB3l, pulykah\xC3\xBAs, kefir"},{"id":1397,"type":"INT","name":"mennyit? (g)","templateFieldId":24,"floatValue":null,"intValue":0,"boolValue":null,"stringValue":null}]},{"id":653,"millisecsFrom1970":1424878200000,"name":"Sz\xC3\xA9klet","templateId":17,"fields":[{"id":1406,"type":"SELECT","name":"milyen?","templateFieldId":15,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"ok"}]},{"id":654,"millisecsFrom1970":1424933160000,"name":"Sz\xC3\xA9klet","templateId":17,"fields":[{"id":1407,"type":"SELECT","name":"milyen?","templateFieldId":15,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"ok"}]},{"id":655,"millisecsFrom1970":1424952000000,"name":"T\xC3\xB6meg","templateId":9,"fields":[{"id":1408,"type":"FLOAT","name":"t\xC3\xB6meg (kg)","templateFieldId":1,"floatValue":76.9,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":657,"millisecsFrom1970":1424930400000,"name":"\xC3\u2030tel","templateId":18,"fields":[{"id":1411,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"zab(100g),feh\xC3\xA9rje(50g),alma,ban\xC3\xA1n,aszalv\xC3\xA1ny,kefir,v\xC3\xADz"},{"id":1412,"type":"INT","name":"mennyit? (g)","templateFieldId":24,"floatValue":null,"intValue":0,"boolValue":null,"stringValue":null}]},{"id":656,"millisecsFrom1970":1424946600000,"name":"\xC3\u2030tel","templateId":18,"fields":[{"id":1409,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"csirke,m\xC3\xA1j(50+50g), r\xC3\xADzs( f\xC5\u2018zve 200g), 1 oldal paprika, 1 gyufa uborka, 1 db retek, 1 paradicsom,oliva,t\xC3\xB6kmag,lenmag,halolaj(1 ek), 50g savany\xC3\xBAk\xC3\xA1poszta"},{"id":1410,"type":"INT","name":"mennyit? (g)","templateFieldId":24,"floatValue":null,"intValue":0,"boolValue":null,"stringValue":null}]},{"id":658,"millisecsFrom1970":1424962800000,"name":"\xC3\u2030tel","templateId":18,"fields":[{"id":1413,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"csirke,m\xC3\xA1j(50+50g), r\xC3\xADzs( f\xC5\u2018zve 200g), 1 oldal paprika, 1 gyufa uborka, 1 db retek, 1 paradicsom,oliva,t\xC3\xB6kmag,lenmag,halolaj(1 ek), 50g savany\xC3\xBAk\xC3\xA1poszta"},{"id":1414,"type":"INT","name":"mennyit? (g)","templateFieldId":24,"floatValue":null,"intValue":0,"boolValue":null,"stringValue":null}]},{"id":667,"millisecsFrom1970":1425020100000,"name":"Sz\xC3\xA9klet","templateId":17,"fields":[{"id":1427,"type":"SELECT","name":"milyen?","templateFieldId":15,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"ok"}]},{"id":687,"millisecsFrom1970":1425124800000,"name":"T\xC3\xB6meg","templateId":9,"fields":[{"id":1447,"type":"FLOAT","name":"t\xC3\xB6meg (kg)","templateFieldId":1,"floatValue":76.1,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":650,"millisecsFrom1970":1424876400000,"name":"\xC3\u2030tel","templateId":18,"fields":[{"id":1400,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"csirke,m\xC3\xA1j(50+50g), r\xC3\xADzs( f\xC5\u2018zve 200g), 1 oldal paprika, 1 gyufa uborka, 1 db retek, 1 paradicsom,oliva,t\xC3\xB6kmag,lenmag(1 ek)"},{"id":1401,"type":"INT","name":"mennyit? (g)","templateFieldId":24,"floatValue":null,"intValue":0,"boolValue":null,"stringValue":null}]},{"id":649,"millisecsFrom1970":1424860200000,"name":"\xC3\u2030tel","templateId":18,"fields":[{"id":1399,"type":"INT","name":"mennyit? (g)","templateFieldId":24,"floatValue":null,"intValue":0,"boolValue":null,"stringValue":null},{"id":1398,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"csirke,m\xC3\xA1j(50+50g), r\xC3\xADzs( f\xC5\u2018zve 200g), 1 oldal paprika, 1 gyufa uborka, 1 db retek, 1 paradicsom,oliva,t\xC3\xB6kmag,lenmag(1 ek)"}]},{"id":250,"millisecsFrom1970":1423699200000,"name":"\xC3\u2030tel","templateId":18,"fields":[{"id":345,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"zab"},{"id":346,"type":"INT","name":"mennyit? (g)","templateFieldId":24,"floatValue":null,"intValue":100,"boolValue":null,"stringValue":null}]},{"id":251,"millisecsFrom1970":1423699200000,"name":"\xC3\u2030tel","templateId":18,"fields":[{"id":347,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"aszalt gy\xC3\xBCm\xC3\xB6lcs\xC3\xB6k"},{"id":348,"type":"INT","name":"mennyit? (g)","templateFieldId":24,"floatValue":null,"intValue":10,"boolValue":null,"stringValue":null}]},{"id":531,"millisecsFrom1970":1423785600000,"name":"T\xC3\xB6meg","templateId":9,"fields":[{"id":1158,"type":"FLOAT","name":"t\xC3\xB6meg (kg)","templateFieldId":1,"floatValue":76.3,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":532,"millisecsFrom1970":1423785600000,"name":"Szex","templateId":20,"fields":[{"id":1159,"type":"SELECT","name":"hossz","templateFieldId":18,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"\xC3\xA1tlag"},{"id":1160,"type":"SELECT","name":"kem\xC3\xA9nys\xC3\xA9g","templateFieldId":19,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"\xC3\xA1tlag"}]},{"id":533,"millisecsFrom1970":1423785600000,"name":"Sz\xC3\xA9klet","templateId":17,"fields":[{"id":1161,"type":"SELECT","name":"milyen?","templateFieldId":15,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"nehezen"}]},{"id":534,"millisecsFrom1970":1423785600000,"name":"\xC3\u2030tel","templateId":18,"fields":[{"id":1162,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"alma"},{"id":1163,"type":"INT","name":"mennyit? (g)","templateFieldId":24,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null}]},{"id":535,"millisecsFrom1970":1423785600000,"name":"\xC3\u2030tel","templateId":18,"fields":[{"id":1164,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"ban\xC3\xA1n"},{"id":1165,"type":"INT","name":"mennyit? (g)","templateFieldId":24,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null}]},{"id":536,"millisecsFrom1970":1423785600000,"name":"\xC3\u2030tel","templateId":18,"fields":[{"id":1166,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"zab"},{"id":1167,"type":"INT","name":"mennyit? (g)","templateFieldId":24,"floatValue":null,"intValue":100,"boolValue":null,"stringValue":null}]},{"id":537,"millisecsFrom1970":1423785600000,"name":"\xC3\u2030tel","templateId":18,"fields":[{"id":1168,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"aszalv\xC3\xA1nyok"},{"id":1169,"type":"INT","name":"mennyit? (g)","templateFieldId":24,"floatValue":null,"intValue":20,"boolValue":null,"stringValue":null}]},{"id":538,"millisecsFrom1970":1423785600000,"name":"Szelek","templateId":23,"fields":[{"id":1170,"type":"SELECT","name":"t\xC3\xADpus","templateFieldId":21,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"enyhe"}]},{"id":539,"millisecsFrom1970":1423785600000,"name":"\xC3\u2030tel","templateId":18,"fields":[{"id":1171,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"rizs"},{"id":1172,"type":"INT","name":"mennyit? (g)","templateFieldId":24,"floatValue":null,"intValue":100,"boolValue":null,"stringValue":null}]},{"id":540,"millisecsFrom1970":1423785600000,"name":"\xC3\u2030tel","templateId":18,"fields":[{"id":1173,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"afrikai harcsa"},{"id":1174,"type":"INT","name":"mennyit? (g)","templateFieldId":24,"floatValue":null,"intValue":150,"boolValue":null,"stringValue":null}]},{"id":541,"millisecsFrom1970":1423785600000,"name":"\xC3\u2030tel","templateId":18,"fields":[{"id":1175,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"z\xC3\xB6lds\xC3\xA9gek"},{"id":1176,"type":"INT","name":"mennyit? (g)","templateFieldId":24,"floatValue":null,"intValue":50,"boolValue":null,"stringValue":null}]},{"id":543,"millisecsFrom1970":1422316800000,"name":"L\xC3\xA1btol\xC3\xA1s","templateId":11,"fields":[{"id":1178,"type":"INT","name":"ism\xC3\xA9tl\xC3\xA9s","templateFieldId":7,"floatValue":null,"intValue":10,"boolValue":null,"stringValue":null},{"id":1179,"type":"INT","name":"sorozat","templateFieldId":6,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null},{"id":1180,"type":"INT","name":"s\xC3\xBAly","templateFieldId":5,"floatValue":null,"intValue":50,"boolValue":null,"stringValue":null}]},{"id":544,"millisecsFrom1970":1420243200000,"name":"L\xC3\xA1btol\xC3\xA1s","templateId":11,"fields":[{"id":1181,"type":"INT","name":"ism\xC3\xA9tl\xC3\xA9s","templateFieldId":7,"floatValue":null,"intValue":9,"boolValue":null,"stringValue":null},{"id":1182,"type":"INT","name":"sorozat","templateFieldId":6,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null},{"id":1183,"type":"INT","name":"s\xC3\xBAly","templateFieldId":5,"floatValue":null,"intValue":60,"boolValue":null,"stringValue":null}]},{"id":546,"millisecsFrom1970":1421625600000,"name":"Mellb\xC5\u2018l nyom\xC3\xA1s","templateId":12,"fields":[{"id":1187,"type":"INT","name":"ism\xC3\xA9tl\xC3\xA9s","templateFieldId":8,"floatValue":null,"intValue":6,"boolValue":null,"stringValue":null},{"id":1188,"type":"INT","name":"t\xC3\xA1rcsa","templateFieldId":9,"floatValue":null,"intValue":5,"boolValue":null,"stringValue":null},{"id":1189,"type":"INT","name":"sorozat","templateFieldId":10,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null}]},{"id":547,"millisecsFrom1970":1422057600000,"name":"Mellb\xC5\u2018l nyom\xC3\xA1s","templateId":12,"fields":[{"id":1190,"type":"INT","name":"ism\xC3\xA9tl\xC3\xA9s","templateFieldId":8,"floatValue":null,"intValue":4,"boolValue":null,"stringValue":null},{"id":1191,"type":"INT","name":"t\xC3\xA1rcsa","templateFieldId":9,"floatValue":null,"intValue":5,"boolValue":null,"stringValue":null},{"id":1192,"type":"INT","name":"sorozat","templateFieldId":10,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null}]},{"id":548,"millisecsFrom1970":1422489600000,"name":"Mellb\xC5\u2018l nyom\xC3\xA1s","templateId":12,"fields":[{"id":1193,"type":"INT","name":"ism\xC3\xA9tl\xC3\xA9s","templateFieldId":8,"floatValue":null,"intValue":11,"boolValue":null,"stringValue":null},{"id":1194,"type":"INT","name":"t\xC3\xA1rcsa","templateFieldId":9,"floatValue":null,"intValue":5,"boolValue":null,"stringValue":null},{"id":1195,"type":"INT","name":"sorozat","templateFieldId":10,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null}]},{"id":549,"millisecsFrom1970":1422921600000,"name":"Mellb\xC5\u2018l nyom\xC3\xA1s","templateId":12,"fields":[{"id":1196,"type":"INT","name":"ism\xC3\xA9tl\xC3\xA9s","templateFieldId":8,"floatValue":null,"intValue":8,"boolValue":null,"stringValue":null},{"id":1197,"type":"INT","name":"t\xC3\xA1rcsa","templateFieldId":9,"floatValue":null,"intValue":35,"boolValue":null,"stringValue":null},{"id":1198,"type":"INT","name":"sorozat","templateFieldId":10,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null}]},{"id":550,"millisecsFrom1970":1423440000000,"name":"Mellb\xC5\u2018l nyom\xC3\xA1s","templateId":12,"fields":[{"id":1199,"type":"INT","name":"ism\xC3\xA9tl\xC3\xA9s","templateFieldId":8,"floatValue":null,"intValue":8,"boolValue":null,"stringValue":null},{"id":1200,"type":"INT","name":"t\xC3\xA1rcsa","templateFieldId":9,"floatValue":null,"intValue":35,"boolValue":null,"stringValue":null},{"id":1201,"type":"INT","name":"sorozat","templateFieldId":10,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null}]},{"id":551,"millisecsFrom1970":1423440000000,"name":"T\xC3\xA1rogat\xC3\xA1s","templateId":10,"fields":[{"id":1202,"type":"INT","name":"ism\xC3\xA9tl\xC3\xA9s","templateFieldId":4,"floatValue":null,"intValue":9,"boolValue":null,"stringValue":null},{"id":1203,"type":"INT","name":"t\xC3\xA1rcsa","templateFieldId":2,"floatValue":null,"intValue":7,"boolValue":null,"stringValue":null},{"id":1204,"type":"INT","name":"sorozat","templateFieldId":3,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null}]},{"id":552,"millisecsFrom1970":1422921600000,"name":"T\xC3\xA1rogat\xC3\xA1s","templateId":10,"fields":[{"id":1205,"type":"INT","name":"ism\xC3\xA9tl\xC3\xA9s","templateFieldId":4,"floatValue":null,"intValue":8,"boolValue":null,"stringValue":null},{"id":1206,"type":"INT","name":"t\xC3\xA1rcsa","templateFieldId":2,"floatValue":null,"intValue":7,"boolValue":null,"stringValue":null},{"id":1207,"type":"INT","name":"sorozat","templateFieldId":3,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null}]},{"id":553,"millisecsFrom1970":1422057600000,"name":"T\xC3\xA1rogat\xC3\xA1s","templateId":10,"fields":[{"id":1208,"type":"INT","name":"ism\xC3\xA9tl\xC3\xA9s","templateFieldId":4,"floatValue":null,"intValue":16,"boolValue":null,"stringValue":null},{"id":1209,"type":"INT","name":"t\xC3\xA1rcsa","templateFieldId":2,"floatValue":null,"intValue":5,"boolValue":null,"stringValue":null},{"id":1210,"type":"INT","name":"sorozat","templateFieldId":3,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null}]},{"id":554,"millisecsFrom1970":1421625600000,"name":"T\xC3\xA1rogat\xC3\xA1s","templateId":10,"fields":[{"id":1211,"type":"INT","name":"ism\xC3\xA9tl\xC3\xA9s","templateFieldId":4,"floatValue":null,"intValue":9,"boolValue":null,"stringValue":null},{"id":1212,"type":"INT","name":"t\xC3\xA1rcsa","templateFieldId":2,"floatValue":null,"intValue":5,"boolValue":null,"stringValue":null},{"id":1213,"type":"INT","name":"sorozat","templateFieldId":3,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null}]},{"id":555,"millisecsFrom1970":1422489600000,"name":"T\xC3\xA1rogat\xC3\xA1s","templateId":10,"fields":[{"id":1214,"type":"INT","name":"ism\xC3\xA9tl\xC3\xA9s","templateFieldId":4,"floatValue":null,"intValue":7,"boolValue":null,"stringValue":null},{"id":1215,"type":"INT","name":"t\xC3\xA1rcsa","templateFieldId":2,"floatValue":null,"intValue":7,"boolValue":null,"stringValue":null},{"id":1216,"type":"INT","name":"sorozat","templateFieldId":3,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null}]},{"id":566,"millisecsFrom1970":1423785600000,"name":"L\xC3\xA1bhajl\xC3\xADt\xC3\xA1s","templateId":29,"fields":[{"id":1247,"type":"INT","name":"ism\xC3\xA9tl\xC3\xA9s","templateFieldId":30,"floatValue":null,"intValue":6,"boolValue":null,"stringValue":null},{"id":1248,"type":"INT","name":"sorozat","templateFieldId":31,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null},{"id":1249,"type":"INT","name":"s\xC3\xBAly","templateFieldId":32,"floatValue":null,"intValue":24,"boolValue":null,"stringValue":null}]},{"id":567,"millisecsFrom1970":1423785600000,"name":"L\xC3\xA1btol\xC3\xA1s","templateId":11,"fields":[{"id":1250,"type":"INT","name":"ism\xC3\xA9tl\xC3\xA9s","templateFieldId":36,"floatValue":null,"intValue":10,"boolValue":null,"stringValue":null},{"id":1251,"type":"INT","name":"sorozat","templateFieldId":37,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null},{"id":1252,"type":"INT","name":"s\xC3\xBAly","templateFieldId":38,"floatValue":null,"intValue":60,"boolValue":null,"stringValue":null}]},{"id":568,"millisecsFrom1970":1423785600000,"name":"V\xC3\xA1dli","templateId":30,"fields":[{"id":1253,"type":"INT","name":"ism\xC3\xA9tl\xC3\xA9s","templateFieldId":33,"floatValue":null,"intValue":12,"boolValue":null,"stringValue":null},{"id":1254,"type":"INT","name":"sorozat","templateFieldId":34,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null},{"id":1255,"type":"INT","name":"s\xC3\xBAly","templateFieldId":35,"floatValue":null,"intValue":170,"boolValue":null,"stringValue":null}]},{"id":569,"millisecsFrom1970":1423785600000,"name":"L\xC3\xA1bny\xC3\xBAjt\xC3\xA1s","templateId":32,"fields":[{"id":1256,"type":"INT","name":"ism\xC3\xA9tl\xC3\xA9s","templateFieldId":39,"floatValue":null,"intValue":8,"boolValue":null,"stringValue":null},{"id":1257,"type":"INT","name":"sorozat","templateFieldId":40,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null},{"id":1258,"type":"INT","name":"s\xC3\xBAly","templateFieldId":41,"floatValue":null,"intValue":25,"boolValue":null,"stringValue":null}]},{"id":570,"millisecsFrom1970":1423785600000,"name":"Der\xC3\xA9kg\xC3\xA9p","templateId":33,"fields":[{"id":1259,"type":"INT","name":"ism\xC3\xA9tl\xC3\xA9s","templateFieldId":42,"floatValue":null,"intValue":8,"boolValue":null,"stringValue":null},{"id":1260,"type":"INT","name":"sorozat","templateFieldId":43,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null},{"id":1261,"type":"INT","name":"s\xC3\xBAly","templateFieldId":44,"floatValue":null,"intValue":70,"boolValue":null,"stringValue":null}]},{"id":571,"millisecsFrom1970":1423612800000,"name":"Evez\xC3\xA9s","templateId":34,"fields":[{"id":1262,"type":"INT","name":"ism\xC3\xA9tl\xC3\xA9s","templateFieldId":45,"floatValue":null,"intValue":8,"boolValue":null,"stringValue":null},{"id":1263,"type":"INT","name":"t\xC3\xA1rcsa","templateFieldId":46,"floatValue":null,"intValue":5,"boolValue":null,"stringValue":null},{"id":1264,"type":"INT","name":"sorozat","templateFieldId":47,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null}]},{"id":572,"millisecsFrom1970":1423094400000,"name":"Evez\xC3\xA9s","templateId":34,"fields":[{"id":1265,"type":"INT","name":"ism\xC3\xA9tl\xC3\xA9s","templateFieldId":45,"floatValue":null,"intValue":9,"boolValue":null,"stringValue":null},{"id":1266,"type":"INT","name":"t\xC3\xA1rcsa","templateFieldId":46,"floatValue":null,"intValue":4,"boolValue":null,"stringValue":null},{"id":1267,"type":"INT","name":"sorozat","templateFieldId":47,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null}]},{"id":573,"millisecsFrom1970":1422662400000,"name":"Evez\xC3\xA9s","templateId":34,"fields":[{"id":1268,"type":"INT","name":"ism\xC3\xA9tl\xC3\xA9s","templateFieldId":45,"floatValue":null,"intValue":12,"boolValue":null,"stringValue":null},{"id":1269,"type":"INT","name":"t\xC3\xA1rcsa","templateFieldId":46,"floatValue":null,"intValue":4,"boolValue":null,"stringValue":null},{"id":1270,"type":"INT","name":"sorozat","templateFieldId":47,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null}]},{"id":574,"millisecsFrom1970":1422230400000,"name":"Evez\xC3\xA9s","templateId":34,"fields":[{"id":1271,"type":"INT","name":"ism\xC3\xA9tl\xC3\xA9s","templateFieldId":45,"floatValue":null,"intValue":10,"boolValue":null,"stringValue":null},{"id":1272,"type":"INT","name":"t\xC3\xA1rcsa","templateFieldId":46,"floatValue":null,"intValue":4,"boolValue":null,"stringValue":null},{"id":1273,"type":"INT","name":"sorozat","templateFieldId":47,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null}]},{"id":575,"millisecsFrom1970":1421798400000,"name":"Evez\xC3\xA9s","templateId":34,"fields":[{"id":1274,"type":"INT","name":"ism\xC3\xA9tl\xC3\xA9s","templateFieldId":45,"floatValue":null,"intValue":6,"boolValue":null,"stringValue":null},{"id":1275,"type":"INT","name":"t\xC3\xA1rcsa","templateFieldId":46,"floatValue":null,"intValue":4,"boolValue":null,"stringValue":null},{"id":1276,"type":"INT","name":"sorozat","templateFieldId":47,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null}]},{"id":576,"millisecsFrom1970":1423612800000,"name":"Bicepsz","templateId":35,"fields":[{"id":1277,"type":"INT","name":"ism\xC3\xA9tl\xC3\xA9s","templateFieldId":48,"floatValue":null,"intValue":6,"boolValue":null,"stringValue":null},{"id":1278,"type":"INT","name":"t\xC3\xA1rcsa","templateFieldId":49,"floatValue":null,"intValue":6,"boolValue":null,"stringValue":null},{"id":1279,"type":"INT","name":"sorozat","templateFieldId":50,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null}]},{"id":577,"millisecsFrom1970":1423094400000,"name":"Bicepsz","templateId":35,"fields":[{"id":1280,"type":"INT","name":"ism\xC3\xA9tl\xC3\xA9s","templateFieldId":48,"floatValue":null,"intValue":8,"boolValue":null,"stringValue":null},{"id":1281,"type":"INT","name":"t\xC3\xA1rcsa","templateFieldId":49,"floatValue":null,"intValue":6,"boolValue":null,"stringValue":null},{"id":1282,"type":"INT","name":"sorozat","templateFieldId":50,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null}]},{"id":578,"millisecsFrom1970":1422662400000,"name":"Bicepsz","templateId":35,"fields":[{"id":1283,"type":"INT","name":"ism\xC3\xA9tl\xC3\xA9s","templateFieldId":48,"floatValue":null,"intValue":6,"boolValue":null,"stringValue":null},{"id":1284,"type":"INT","name":"t\xC3\xA1rcsa","templateFieldId":49,"floatValue":null,"intValue":6,"boolValue":null,"stringValue":null},{"id":1285,"type":"INT","name":"sorozat","templateFieldId":50,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null}]},{"id":579,"millisecsFrom1970":1422230400000,"name":"Bicepsz","templateId":35,"fields":[{"id":1286,"type":"INT","name":"ism\xC3\xA9tl\xC3\xA9s","templateFieldId":48,"floatValue":null,"intValue":12,"boolValue":null,"stringValue":null},{"id":1287,"type":"INT","name":"t\xC3\xA1rcsa","templateFieldId":49,"floatValue":null,"intValue":5,"boolValue":null,"stringValue":null},{"id":1288,"type":"INT","name":"sorozat","templateFieldId":50,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null}]},{"id":545,"millisecsFrom1970":1423353600000,"name":"L\xC3\xA1btol\xC3\xA1s","templateId":11,"fields":[{"id":1184,"type":"INT","name":"ism\xC3\xA9tl\xC3\xA9s","templateFieldId":7,"floatValue":null,"intValue":10,"boolValue":null,"stringValue":null},{"id":1185,"type":"INT","name":"sorozat","templateFieldId":6,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null},{"id":1186,"type":"INT","name":"s\xC3\xBAly","templateFieldId":5,"floatValue":null,"intValue":60,"boolValue":null,"stringValue":null}]},{"id":152,"millisecsFrom1970":1416312000000,"name":"T\xC3\xB6meg","templateId":9,"fields":[{"id":198,"type":"FLOAT","name":"t\xC3\xB6meg (kg)","templateFieldId":1,"floatValue":79.0,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":556,"millisecsFrom1970":1421625600000,"name":"V\xC3\xA1llb\xC3\xB3l nyom\xC3\xA1s","templateId":28,"fields":[{"id":1217,"type":"INT","name":"ism\xC3\xA9tl\xC3\xA9s","templateFieldId":27,"floatValue":null,"intValue":7,"boolValue":null,"stringValue":null},{"id":1218,"type":"INT","name":"sorozat","templateFieldId":28,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null},{"id":1219,"type":"INT","name":"s\xC3\xBAly","templateFieldId":29,"floatValue":null,"intValue":30,"boolValue":null,"stringValue":null}]},{"id":252,"millisecsFrom1970":1423699200000,"name":"\xC3\u2030tel","templateId":18,"fields":[{"id":349,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"alma"},{"id":350,"type":"INT","name":"mennyit? (g)","templateFieldId":24,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null}]},{"id":253,"millisecsFrom1970":1423699200000,"name":"\xC3\u2030tel","templateId":18,"fields":[{"id":351,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"ban\xC3\xA1n"},{"id":352,"type":"INT","name":"mennyit? (g)","templateFieldId":24,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null}]},{"id":254,"millisecsFrom1970":1422835200000,"name":"T\xC3\xB6meg","templateId":9,"fields":[{"id":353,"type":"FLOAT","name":"t\xC3\xB6meg (kg)","templateFieldId":1,"floatValue":77.5,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":255,"millisecsFrom1970":1422921600000,"name":"T\xC3\xB6meg","templateId":9,"fields":[{"id":354,"type":"FLOAT","name":"t\xC3\xB6meg (kg)","templateFieldId":1,"floatValue":77.2,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":256,"millisecsFrom1970":1423008000000,"name":"T\xC3\xB6meg","templateId":9,"fields":[{"id":355,"type":"FLOAT","name":"t\xC3\xB6meg (kg)","templateFieldId":1,"floatValue":76.8,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":257,"millisecsFrom1970":1423094400000,"name":"T\xC3\xB6meg","templateId":9,"fields":[{"id":356,"type":"FLOAT","name":"t\xC3\xB6meg (kg)","templateFieldId":1,"floatValue":76.7,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":258,"millisecsFrom1970":1423180800000,"name":"T\xC3\xB6meg","templateId":9,"fields":[{"id":357,"type":"FLOAT","name":"t\xC3\xB6meg (kg)","templateFieldId":1,"floatValue":77.0,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":259,"millisecsFrom1970":1423267200000,"name":"T\xC3\xB6meg","templateId":9,"fields":[{"id":358,"type":"FLOAT","name":"t\xC3\xB6meg (kg)","templateFieldId":1,"floatValue":76.3,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":84,"millisecsFrom1970":1421280000000,"name":"T\xC3\xB6meg","templateId":9,"fields":[{"id":182,"type":"FLOAT","name":"t\xC3\xB6meg (kg)","templateFieldId":1,"floatValue":77.8,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":85,"millisecsFrom1970":1421539200000,"name":"T\xC3\xB6meg","templateId":9,"fields":[{"id":204,"type":"FLOAT","name":"t\xC3\xB6meg (kg)","templateFieldId":1,"floatValue":78.1,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":86,"millisecsFrom1970":1421366400000,"name":"T\xC3\xB6meg","templateId":9,"fields":[{"id":205,"type":"FLOAT","name":"t\xC3\xB6meg (kg)","templateFieldId":1,"floatValue":79.0,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":87,"millisecsFrom1970":1421452800000,"name":"T\xC3\xB6meg","templateId":9,"fields":[{"id":206,"type":"FLOAT","name":"t\xC3\xB6meg (kg)","templateFieldId":1,"floatValue":78.0,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":557,"millisecsFrom1970":1422057600000,"name":"V\xC3\xA1llb\xC3\xB3l nyom\xC3\xA1s","templateId":28,"fields":[{"id":1220,"type":"INT","name":"ism\xC3\xA9tl\xC3\xA9s","templateFieldId":27,"floatValue":null,"intValue":5,"boolValue":null,"stringValue":null},{"id":1221,"type":"INT","name":"sorozat","templateFieldId":28,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null},{"id":1222,"type":"INT","name":"s\xC3\xBAly","templateFieldId":29,"floatValue":null,"intValue":30,"boolValue":null,"stringValue":null}]},{"id":102,"millisecsFrom1970":1422057600000,"name":"T\xC3\xB6meg","templateId":9,"fields":[{"id":284,"type":"FLOAT","name":"t\xC3\xB6meg (kg)","templateFieldId":1,"floatValue":78.3,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":103,"millisecsFrom1970":1422144000000,"name":"T\xC3\xB6meg","templateId":9,"fields":[{"id":285,"type":"FLOAT","name":"t\xC3\xB6meg (kg)","templateFieldId":1,"floatValue":78.8,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":558,"millisecsFrom1970":1422489600000,"name":"V\xC3\xA1llb\xC3\xB3l nyom\xC3\xA1s","templateId":28,"fields":[{"id":1223,"type":"INT","name":"ism\xC3\xA9tl\xC3\xA9s","templateFieldId":27,"floatValue":null,"intValue":8,"boolValue":null,"stringValue":null},{"id":1224,"type":"INT","name":"sorozat","templateFieldId":28,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null},{"id":1225,"type":"INT","name":"s\xC3\xBAly","templateFieldId":29,"floatValue":null,"intValue":30,"boolValue":null,"stringValue":null}]},{"id":106,"millisecsFrom1970":1422230400000,"name":"T\xC3\xB6meg","templateId":9,"fields":[{"id":196,"type":"FLOAT","name":"t\xC3\xB6meg (kg)","templateFieldId":1,"floatValue":77.3,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":107,"millisecsFrom1970":1422316800000,"name":"T\xC3\xB6meg","templateId":9,"fields":[{"id":230,"type":"FLOAT","name":"t\xC3\xB6meg (kg)","templateFieldId":1,"floatValue":77.3,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":108,"millisecsFrom1970":1422403200000,"name":"T\xC3\xB6meg","templateId":9,"fields":[{"id":231,"type":"FLOAT","name":"t\xC3\xB6meg (kg)","templateFieldId":1,"floatValue":77.5,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":559,"millisecsFrom1970":1423440000000,"name":"V\xC3\xA1llb\xC3\xB3l nyom\xC3\xA1s","templateId":28,"fields":[{"id":1226,"type":"INT","name":"ism\xC3\xA9tl\xC3\xA9s","templateFieldId":27,"floatValue":null,"intValue":6,"boolValue":null,"stringValue":null},{"id":1227,"type":"INT","name":"sorozat","templateFieldId":28,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null},{"id":1228,"type":"INT","name":"s\xC3\xBAly","templateFieldId":29,"floatValue":null,"intValue":30,"boolValue":null,"stringValue":null}]},{"id":112,"millisecsFrom1970":1422489600000,"name":"T\xC3\xB6meg","templateId":9,"fields":[{"id":289,"type":"FLOAT","name":"t\xC3\xB6meg (kg)","templateFieldId":1,"floatValue":77.8,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":113,"millisecsFrom1970":1422576000000,"name":"T\xC3\xB6meg","templateId":9,"fields":[{"id":257,"type":"FLOAT","name":"t\xC3\xB6meg (kg)","templateFieldId":1,"floatValue":77.9,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":560,"millisecsFrom1970":1422921600000,"name":"L\xC3\xA1bhajl\xC3\xADt\xC3\xA1s","templateId":29,"fields":[{"id":1229,"type":"INT","name":"ism\xC3\xA9tl\xC3\xA9s","templateFieldId":30,"floatValue":null,"intValue":7,"boolValue":null,"stringValue":null},{"id":1230,"type":"INT","name":"sorozat","templateFieldId":31,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null},{"id":1231,"type":"INT","name":"s\xC3\xBAly","templateFieldId":32,"floatValue":null,"intValue":24,"boolValue":null,"stringValue":null}]},{"id":117,"millisecsFrom1970":1418299200000,"name":"T\xC3\xB6meg","templateId":9,"fields":[{"id":252,"type":"FLOAT","name":"t\xC3\xB6meg (kg)","templateFieldId":1,"floatValue":77.8,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":118,"millisecsFrom1970":1418385600000,"name":"T\xC3\xB6meg","templateId":9,"fields":[{"id":253,"type":"FLOAT","name":"t\xC3\xB6meg (kg)","templateFieldId":1,"floatValue":77.8,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":119,"millisecsFrom1970":1418472000000,"name":"T\xC3\xB6meg","templateId":9,"fields":[{"id":254,"type":"FLOAT","name":"t\xC3\xB6meg (kg)","templateFieldId":1,"floatValue":77.9,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":120,"millisecsFrom1970":1418558400000,"name":"T\xC3\xB6meg","templateId":9,"fields":[{"id":255,"type":"FLOAT","name":"t\xC3\xB6meg (kg)","templateFieldId":1,"floatValue":77.9,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":121,"millisecsFrom1970":1418644800000,"name":"T\xC3\xB6meg","templateId":9,"fields":[{"id":256,"type":"FLOAT","name":"t\xC3\xB6meg (kg)","templateFieldId":1,"floatValue":78.4,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":122,"millisecsFrom1970":1418731200000,"name":"T\xC3\xB6meg","templateId":9,"fields":[{"id":194,"type":"FLOAT","name":"t\xC3\xB6meg (kg)","templateFieldId":1,"floatValue":78.5,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":123,"millisecsFrom1970":1418817600000,"name":"T\xC3\xB6meg","templateId":9,"fields":[{"id":258,"type":"FLOAT","name":"t\xC3\xB6meg (kg)","templateFieldId":1,"floatValue":78.5,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":124,"millisecsFrom1970":1418904000000,"name":"T\xC3\xB6meg","templateId":9,"fields":[{"id":259,"type":"FLOAT","name":"t\xC3\xB6meg (kg)","templateFieldId":1,"floatValue":78.1,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":125,"millisecsFrom1970":1418990400000,"name":"T\xC3\xB6meg","templateId":9,"fields":[{"id":260,"type":"FLOAT","name":"t\xC3\xB6meg (kg)","templateFieldId":1,"floatValue":78.4,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":126,"millisecsFrom1970":1419076800000,"name":"T\xC3\xB6meg","templateId":9,"fields":[{"id":261,"type":"FLOAT","name":"t\xC3\xB6meg (kg)","templateFieldId":1,"floatValue":77.7,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":127,"millisecsFrom1970":1419163200000,"name":"T\xC3\xB6meg","templateId":9,"fields":[{"id":262,"type":"FLOAT","name":"t\xC3\xB6meg (kg)","templateFieldId":1,"floatValue":78.3,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":128,"millisecsFrom1970":1419249600000,"name":"T\xC3\xB6meg","templateId":9,"fields":[{"id":183,"type":"FLOAT","name":"t\xC3\xB6meg (kg)","templateFieldId":1,"floatValue":78.5,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":129,"millisecsFrom1970":1418212800000,"name":"T\xC3\xB6meg","templateId":9,"fields":[{"id":251,"type":"FLOAT","name":"t\xC3\xB6meg (kg)","templateFieldId":1,"floatValue":78.1,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":130,"millisecsFrom1970":1417694400000,"name":"T\xC3\xB6meg","templateId":9,"fields":[{"id":245,"type":"FLOAT","name":"t\xC3\xB6meg (kg)","templateFieldId":1,"floatValue":77.9,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":131,"millisecsFrom1970":1417780800000,"name":"T\xC3\xB6meg","templateId":9,"fields":[{"id":246,"type":"FLOAT","name":"t\xC3\xB6meg (kg)","templateFieldId":1,"floatValue":77.4,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":132,"millisecsFrom1970":1417867200000,"name":"T\xC3\xB6meg","templateId":9,"fields":[{"id":247,"type":"FLOAT","name":"t\xC3\xB6meg (kg)","templateFieldId":1,"floatValue":77.6,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":133,"millisecsFrom1970":1417953600000,"name":"T\xC3\xB6meg","templateId":9,"fields":[{"id":248,"type":"FLOAT","name":"t\xC3\xB6meg (kg)","templateFieldId":1,"floatValue":77.7,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":134,"millisecsFrom1970":1418040000000,"name":"T\xC3\xB6meg","templateId":9,"fields":[{"id":249,"type":"FLOAT","name":"t\xC3\xB6meg (kg)","templateFieldId":1,"floatValue":78.2,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":135,"millisecsFrom1970":1418126400000,"name":"T\xC3\xB6meg","templateId":9,"fields":[{"id":250,"type":"FLOAT","name":"t\xC3\xB6meg (kg)","templateFieldId":1,"floatValue":78.1,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":136,"millisecsFrom1970":1417348800000,"name":"T\xC3\xB6meg","templateId":9,"fields":[{"id":241,"type":"FLOAT","name":"t\xC3\xB6meg (kg)","templateFieldId":1,"floatValue":78.0,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":137,"millisecsFrom1970":1417435200000,"name":"T\xC3\xB6meg","templateId":9,"fields":[{"id":242,"type":"FLOAT","name":"t\xC3\xB6meg (kg)","templateFieldId":1,"floatValue":78.5,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":138,"millisecsFrom1970":1417521600000,"name":"T\xC3\xB6meg","templateId":9,"fields":[{"id":243,"type":"FLOAT","name":"t\xC3\xB6meg (kg)","templateFieldId":1,"floatValue":78.1,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":139,"millisecsFrom1970":1417608000000,"name":"T\xC3\xB6meg","templateId":9,"fields":[{"id":244,"type":"FLOAT","name":"t\xC3\xB6meg (kg)","templateFieldId":1,"floatValue":78.0,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":140,"millisecsFrom1970":1417003200000,"name":"T\xC3\xB6meg","templateId":9,"fields":[{"id":237,"type":"FLOAT","name":"t\xC3\xB6meg (kg)","templateFieldId":1,"floatValue":78.1,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":141,"millisecsFrom1970":1417089600000,"name":"T\xC3\xB6meg","templateId":9,"fields":[{"id":238,"type":"FLOAT","name":"t\xC3\xB6meg (kg)","templateFieldId":1,"floatValue":77.9,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":142,"millisecsFrom1970":1417176000000,"name":"T\xC3\xB6meg","templateId":9,"fields":[{"id":239,"type":"FLOAT","name":"t\xC3\xB6meg (kg)","templateFieldId":1,"floatValue":78.0,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":143,"millisecsFrom1970":1417262400000,"name":"T\xC3\xB6meg","templateId":9,"fields":[{"id":240,"type":"FLOAT","name":"t\xC3\xB6meg (kg)","templateFieldId":1,"floatValue":78.0,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":144,"millisecsFrom1970":1416484800000,"name":"T\xC3\xB6meg","templateId":9,"fields":[{"id":200,"type":"FLOAT","name":"t\xC3\xB6meg (kg)","templateFieldId":1,"floatValue":78.3,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":145,"millisecsFrom1970":1416571200000,"name":"T\xC3\xB6meg","templateId":9,"fields":[{"id":201,"type":"FLOAT","name":"t\xC3\xB6meg (kg)","templateFieldId":1,"floatValue":78.5,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":146,"millisecsFrom1970":1416657600000,"name":"T\xC3\xB6meg","templateId":9,"fields":[{"id":202,"type":"FLOAT","name":"t\xC3\xB6meg (kg)","templateFieldId":1,"floatValue":78.6,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":147,"millisecsFrom1970":1416744000000,"name":"T\xC3\xB6meg","templateId":9,"fields":[{"id":203,"type":"FLOAT","name":"t\xC3\xB6meg (kg)","templateFieldId":1,"floatValue":78.4,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":148,"millisecsFrom1970":1416830400000,"name":"T\xC3\xB6meg","templateId":9,"fields":[{"id":235,"type":"FLOAT","name":"t\xC3\xB6meg (kg)","templateFieldId":1,"floatValue":78.6,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":149,"millisecsFrom1970":1416916800000,"name":"T\xC3\xB6meg","templateId":9,"fields":[{"id":236,"type":"FLOAT","name":"t\xC3\xB6meg (kg)","templateFieldId":1,"floatValue":78.1,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":150,"millisecsFrom1970":1416139200000,"name":"T\xC3\xB6meg","templateId":9,"fields":[{"id":229,"type":"FLOAT","name":"t\xC3\xB6meg (kg)","templateFieldId":1,"floatValue":80.0,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":151,"millisecsFrom1970":1416225600000,"name":"T\xC3\xB6meg","templateId":9,"fields":[{"id":197,"type":"FLOAT","name":"t\xC3\xB6meg (kg)","templateFieldId":1,"floatValue":79.5,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":561,"millisecsFrom1970":1423353600000,"name":"L\xC3\xA1bhajl\xC3\xADt\xC3\xA1s","templateId":29,"fields":[{"id":1232,"type":"INT","name":"ism\xC3\xA9tl\xC3\xA9s","templateFieldId":30,"floatValue":null,"intValue":9,"boolValue":null,"stringValue":null},{"id":1233,"type":"INT","name":"sorozat","templateFieldId":31,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null},{"id":1234,"type":"INT","name":"s\xC3\xBAly","templateFieldId":32,"floatValue":null,"intValue":24,"boolValue":null,"stringValue":null}]},{"id":92,"millisecsFrom1970":1421625600000,"name":"T\xC3\xB6meg","templateId":9,"fields":[{"id":215,"type":"FLOAT","name":"t\xC3\xB6meg (kg)","templateFieldId":1,"floatValue":78.7,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":93,"millisecsFrom1970":1421798400000,"name":"T\xC3\xB6meg","templateId":9,"fields":[{"id":216,"type":"FLOAT","name":"t\xC3\xB6meg (kg)","templateFieldId":1,"floatValue":77.7,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":94,"millisecsFrom1970":1421712000000,"name":"T\xC3\xB6meg","templateId":9,"fields":[{"id":273,"type":"FLOAT","name":"t\xC3\xB6meg (kg)","templateFieldId":1,"floatValue":78.3,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":95,"millisecsFrom1970":1421884800000,"name":"T\xC3\xB6meg","templateId":9,"fields":[{"id":277,"type":"FLOAT","name":"t\xC3\xB6meg (kg)","templateFieldId":1,"floatValue":77.1,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":96,"millisecsFrom1970":1421971200000,"name":"T\xC3\xB6meg","templateId":9,"fields":[{"id":278,"type":"FLOAT","name":"t\xC3\xB6meg (kg)","templateFieldId":1,"floatValue":77.7,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":153,"millisecsFrom1970":1416398400000,"name":"T\xC3\xB6meg","templateId":9,"fields":[{"id":199,"type":"FLOAT","name":"t\xC3\xB6meg (kg)","templateFieldId":1,"floatValue":78.4,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":562,"millisecsFrom1970":1421798400000,"name":"V\xC3\xA1dli","templateId":30,"fields":[{"id":1235,"type":"INT","name":"ism\xC3\xA9tl\xC3\xA9s","templateFieldId":33,"floatValue":null,"intValue":14,"boolValue":null,"stringValue":null},{"id":1236,"type":"INT","name":"sorozat","templateFieldId":34,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null},{"id":1237,"type":"INT","name":"s\xC3\xBAly","templateFieldId":35,"floatValue":null,"intValue":150,"boolValue":null,"stringValue":null}]},{"id":563,"millisecsFrom1970":1422316800000,"name":"V\xC3\xA1dli","templateId":30,"fields":[{"id":1238,"type":"INT","name":"ism\xC3\xA9tl\xC3\xA9s","templateFieldId":33,"floatValue":null,"intValue":13,"boolValue":null,"stringValue":null},{"id":1239,"type":"INT","name":"sorozat","templateFieldId":34,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null},{"id":1240,"type":"INT","name":"s\xC3\xBAly","templateFieldId":35,"floatValue":null,"intValue":160,"boolValue":null,"stringValue":null}]},{"id":564,"millisecsFrom1970":1422921600000,"name":"V\xC3\xA1dli","templateId":30,"fields":[{"id":1241,"type":"INT","name":"ism\xC3\xA9tl\xC3\xA9s","templateFieldId":33,"floatValue":null,"intValue":9,"boolValue":null,"stringValue":null},{"id":1242,"type":"INT","name":"sorozat","templateFieldId":34,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null},{"id":1243,"type":"INT","name":"s\xC3\xBAly","templateFieldId":35,"floatValue":null,"intValue":170,"boolValue":null,"stringValue":null}]},{"id":565,"millisecsFrom1970":1423353600000,"name":"V\xC3\xA1dli","templateId":30,"fields":[{"id":1244,"type":"INT","name":"ism\xC3\xA9tl\xC3\xA9s","templateFieldId":33,"floatValue":null,"intValue":10,"boolValue":null,"stringValue":null},{"id":1245,"type":"INT","name":"sorozat","templateFieldId":34,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null},{"id":1246,"type":"INT","name":"s\xC3\xBAly","templateFieldId":35,"floatValue":null,"intValue":170,"boolValue":null,"stringValue":null}]},{"id":580,"millisecsFrom1970":1421798400000,"name":"Bicepsz","templateId":35,"fields":[{"id":1289,"type":"INT","name":"ism\xC3\xA9tl\xC3\xA9s","templateFieldId":48,"floatValue":null,"intValue":9,"boolValue":null,"stringValue":null},{"id":1290,"type":"INT","name":"t\xC3\xA1rcsa","templateFieldId":49,"floatValue":null,"intValue":5,"boolValue":null,"stringValue":null},{"id":1291,"type":"INT","name":"sorozat","templateFieldId":50,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null}]},{"id":260,"millisecsFrom1970":1423440000000,"name":"T\xC3\xB6meg","templateId":9,"fields":[{"id":359,"type":"FLOAT","name":"t\xC3\xB6meg (kg)","templateFieldId":1,"floatValue":77.6,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":581,"millisecsFrom1970":1421798400000,"name":"Mellhez h\xC3\xBAz\xC3\xA1s","templateId":36,"fields":[{"id":1292,"type":"INT","name":"ism\xC3\xA9tl\xC3\xA9s","templateFieldId":51,"floatValue":null,"intValue":4,"boolValue":null,"stringValue":null},{"id":1293,"type":"INT","name":"sorozat","templateFieldId":52,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null},{"id":1294,"type":"INT","name":"s\xC3\xBAly","templateFieldId":53,"floatValue":null,"intValue":35,"boolValue":null,"stringValue":null}]},{"id":582,"millisecsFrom1970":1422230400000,"name":"Mellhez h\xC3\xBAz\xC3\xA1s","templateId":36,"fields":[{"id":1295,"type":"INT","name":"ism\xC3\xA9tl\xC3\xA9s","templateFieldId":51,"floatValue":null,"intValue":11,"boolValue":null,"stringValue":null},{"id":1296,"type":"INT","name":"sorozat","templateFieldId":52,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null},{"id":1297,"type":"INT","name":"s\xC3\xBAly","templateFieldId":53,"floatValue":null,"intValue":35,"boolValue":null,"stringValue":null}]},{"id":583,"millisecsFrom1970":1422662400000,"name":"Mellhez h\xC3\xBAz\xC3\xA1s","templateId":36,"fields":[{"id":1298,"type":"INT","name":"ism\xC3\xA9tl\xC3\xA9s","templateFieldId":51,"floatValue":null,"intValue":7,"boolValue":null,"stringValue":null},{"id":1299,"type":"INT","name":"sorozat","templateFieldId":52,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null},{"id":1300,"type":"INT","name":"s\xC3\xBAly","templateFieldId":53,"floatValue":null,"intValue":35,"boolValue":null,"stringValue":null}]},{"id":584,"millisecsFrom1970":1423094400000,"name":"Mellhez h\xC3\xBAz\xC3\xA1s","templateId":36,"fields":[{"id":1301,"type":"INT","name":"ism\xC3\xA9tl\xC3\xA9s","templateFieldId":51,"floatValue":null,"intValue":8,"boolValue":null,"stringValue":null},{"id":1302,"type":"INT","name":"sorozat","templateFieldId":52,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null},{"id":1303,"type":"INT","name":"s\xC3\xBAly","templateFieldId":53,"floatValue":null,"intValue":35,"boolValue":null,"stringValue":null}]},{"id":585,"millisecsFrom1970":1423612800000,"name":"Mellhez h\xC3\xBAz\xC3\xA1s","templateId":36,"fields":[{"id":1304,"type":"INT","name":"ism\xC3\xA9tl\xC3\xA9s","templateFieldId":51,"floatValue":null,"intValue":8,"boolValue":null,"stringValue":null},{"id":1305,"type":"INT","name":"sorozat","templateFieldId":52,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null},{"id":1306,"type":"INT","name":"s\xC3\xBAly","templateFieldId":53,"floatValue":null,"intValue":35,"boolValue":null,"stringValue":null}]},{"id":65,"millisecsFrom1970":1420243200000,"name":"T\xC3\xB6meg","templateId":9,"fields":[{"id":221,"type":"FLOAT","name":"t\xC3\xB6meg (kg)","templateFieldId":1,"floatValue":78.4,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":67,"millisecsFrom1970":1420329600000,"name":"T\xC3\xB6meg","templateId":9,"fields":[{"id":223,"type":"FLOAT","name":"t\xC3\xB6meg (kg)","templateFieldId":1,"floatValue":78.5,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":195,"millisecsFrom1970":1420416000000,"name":"T\xC3\xB6meg","templateId":9,"fields":[{"id":225,"type":"FLOAT","name":"t\xC3\xB6meg (kg)","templateFieldId":1,"floatValue":79.1,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":196,"millisecsFrom1970":1420502400000,"name":"T\xC3\xB6meg","templateId":9,"fields":[{"id":226,"type":"FLOAT","name":"t\xC3\xB6meg (kg)","templateFieldId":1,"floatValue":79.5,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":599,"millisecsFrom1970":1424044800000,"name":"T\xC3\xA1rogat\xC3\xA1s","templateId":10,"fields":[{"id":1327,"type":"INT","name":"ism\xC3\xA9tl\xC3\xA9s","templateFieldId":4,"floatValue":null,"intValue":10,"boolValue":null,"stringValue":null},{"id":1328,"type":"INT","name":"t\xC3\xA1rcsa","templateFieldId":2,"floatValue":null,"intValue":7,"boolValue":null,"stringValue":null},{"id":1329,"type":"INT","name":"sorozat","templateFieldId":3,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null}]},{"id":68,"millisecsFrom1970":1420588800000,"name":"T\xC3\xB6meg","templateId":9,"fields":[{"id":263,"type":"FLOAT","name":"t\xC3\xB6meg (kg)","templateFieldId":1,"floatValue":79.5,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":70,"millisecsFrom1970":1420675200000,"name":"T\xC3\xB6meg","templateId":9,"fields":[{"id":264,"type":"FLOAT","name":"t\xC3\xB6meg (kg)","templateFieldId":1,"floatValue":79.7,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":600,"millisecsFrom1970":1424044800000,"name":"V\xC3\xA1llb\xC3\xB3l nyom\xC3\xA1s","templateId":28,"fields":[{"id":1330,"type":"INT","name":"ism\xC3\xA9tl\xC3\xA9s","templateFieldId":27,"floatValue":null,"intValue":7,"boolValue":null,"stringValue":null},{"id":1331,"type":"INT","name":"sorozat","templateFieldId":28,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null},{"id":1332,"type":"INT","name":"s\xC3\xBAly","templateFieldId":29,"floatValue":null,"intValue":30,"boolValue":null,"stringValue":null}]},{"id":73,"millisecsFrom1970":1420761600000,"name":"T\xC3\xB6meg","templateId":9,"fields":[{"id":267,"type":"FLOAT","name":"t\xC3\xB6meg (kg)","templateFieldId":1,"floatValue":79.7,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":74,"millisecsFrom1970":1420848000000,"name":"T\xC3\xB6meg","templateId":9,"fields":[{"id":268,"type":"FLOAT","name":"t\xC3\xB6meg (kg)","templateFieldId":1,"floatValue":78.8,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":601,"millisecsFrom1970":1424044800000,"name":"Karny\xC3\xBAjt\xC3\xA1s csig\xC3\xA1n","templateId":37,"fields":[{"id":1333,"type":"INT","name":"ism\xC3\xA9tl\xC3\xA9s","templateFieldId":54,"floatValue":null,"intValue":7,"boolValue":null,"stringValue":null},{"id":1334,"type":"INT","name":"sorozat","templateFieldId":55,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null},{"id":1335,"type":"INT","name":"s\xC3\xBAly","templateFieldId":56,"floatValue":null,"intValue":40,"boolValue":null,"stringValue":null}]},{"id":602,"millisecsFrom1970":1424044800000,"name":"Mellb\xC5\u2018l nyom\xC3\xA1s","templateId":12,"fields":[{"id":1336,"type":"INT","name":"ism\xC3\xA9tl\xC3\xA9s","templateFieldId":8,"floatValue":null,"intValue":5,"boolValue":null,"stringValue":null},{"id":1337,"type":"INT","name":"t\xC3\xA1rcsa","templateFieldId":9,"floatValue":null,"intValue":35,"boolValue":null,"stringValue":null},{"id":1338,"type":"INT","name":"sorozat","templateFieldId":10,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null}]},{"id":603,"millisecsFrom1970":1424044800000,"name":"Oldalemel\xC3\xA9s","templateId":41,"fields":[{"id":1339,"type":"INT","name":"ism\xC3\xA9tl\xC3\xA9s","templateFieldId":62,"floatValue":null,"intValue":5,"boolValue":null,"stringValue":null},{"id":1340,"type":"INT","name":"s\xC3\xBAly","templateFieldId":63,"floatValue":null,"intValue":5,"boolValue":null,"stringValue":null},{"id":1341,"type":"INT","name":"sorozat","templateFieldId":64,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null}]},{"id":604,"millisecsFrom1970":1424044800000,"name":"\xC3\u2030tel","templateId":18,"fields":[{"id":1342,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"m\xC3\xA1j,kelbi,broki,toj\xC3\xA1s,diszn\xC3\xB3sajt"},{"id":1343,"type":"INT","name":"mennyit? (g)","templateFieldId":24,"floatValue":null,"intValue":0,"boolValue":null,"stringValue":null}]},{"id":606,"millisecsFrom1970":1424131200000,"name":"\xC3\u2030tel","templateId":18,"fields":[{"id":1345,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"zab(80g) aszalv\xC3\xA1nyok(30g) di\xC3\xB3(2) mandula(4) mogyor\xC3\xB3(4) m\xC3\xA9z(1tk)"},{"id":1346,"type":"INT","name":"mennyit? (g)","templateFieldId":24,"floatValue":null,"intValue":0,"boolValue":null,"stringValue":null}]},{"id":191,"millisecsFrom1970":1419336000000,"name":"T\xC3\xB6meg","templateId":9,"fields":[{"id":184,"type":"FLOAT","name":"t\xC3\xB6meg (kg)","templateFieldId":1,"floatValue":78.5,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":192,"millisecsFrom1970":1419422400000,"name":"T\xC3\xB6meg","templateId":9,"fields":[{"id":185,"type":"FLOAT","name":"t\xC3\xB6meg (kg)","templateFieldId":1,"floatValue":78.5,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":193,"millisecsFrom1970":1419508800000,"name":"T\xC3\xB6meg","templateId":9,"fields":[{"id":186,"type":"FLOAT","name":"t\xC3\xB6meg (kg)","templateFieldId":1,"floatValue":78.5,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":199,"millisecsFrom1970":1419595200000,"name":"T\xC3\xB6meg","templateId":9,"fields":[{"id":187,"type":"FLOAT","name":"t\xC3\xB6meg (kg)","templateFieldId":1,"floatValue":78.8,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":200,"millisecsFrom1970":1419681600000,"name":"T\xC3\xB6meg","templateId":9,"fields":[{"id":195,"type":"FLOAT","name":"t\xC3\xB6meg (kg)","templateFieldId":1,"floatValue":78.4,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":201,"millisecsFrom1970":1419768000000,"name":"T\xC3\xB6meg","templateId":9,"fields":[{"id":209,"type":"FLOAT","name":"t\xC3\xB6meg (kg)","templateFieldId":1,"floatValue":78.1,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":636,"millisecsFrom1970":1424779200000,"name":"T\xC3\xB6meg","templateId":9,"fields":[{"id":1380,"type":"FLOAT","name":"t\xC3\xB6meg (kg)","templateFieldId":1,"floatValue":77.1,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":208,"millisecsFrom1970":1420027200000,"name":"T\xC3\xB6meg","templateId":9,"fields":[{"id":207,"type":"FLOAT","name":"t\xC3\xB6meg (kg)","templateFieldId":1,"floatValue":78.5,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":209,"millisecsFrom1970":1419854400000,"name":"T\xC3\xB6meg","templateId":9,"fields":[{"id":210,"type":"FLOAT","name":"t\xC3\xB6meg (kg)","templateFieldId":1,"floatValue":79.2,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":210,"millisecsFrom1970":1419940800000,"name":"T\xC3\xB6meg","templateId":9,"fields":[{"id":208,"type":"FLOAT","name":"t\xC3\xB6meg (kg)","templateFieldId":1,"floatValue":78.85,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":659,"millisecsFrom1970":1425033000000,"name":"\xC3\u2030tel","templateId":18,"fields":[{"id":1415,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"csirke,m\xC3\xA1j(50+50g), r\xC3\xADzs( f\xC5\u2018zve 200g), 1 oldal paprika, 1 gyufa uborka, 1 db retek, 1 paradicsom,oliva,t\xC3\xB6kmag,lenmag,halolaj(1 ek), 50g savany\xC3\xBAk\xC3\xA1poszta"},{"id":1416,"type":"INT","name":"mennyit? (g)","templateFieldId":24,"floatValue":null,"intValue":0,"boolValue":null,"stringValue":null}]},{"id":214,"millisecsFrom1970":1420070400000,"name":"T\xC3\xB6meg","templateId":9,"fields":[{"id":217,"type":"FLOAT","name":"t\xC3\xB6meg (kg)","templateFieldId":1,"floatValue":79.7,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":216,"millisecsFrom1970":1420156800000,"name":"T\xC3\xB6meg","templateId":9,"fields":[{"id":218,"type":"FLOAT","name":"t\xC3\xB6meg (kg)","templateFieldId":1,"floatValue":78.6,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":661,"millisecsFrom1970":1425016800000,"name":"\xC3\u2030tel","templateId":18,"fields":[{"id":1419,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"zab(80g),feh\xC3\xA9rje(30g),alma,ban\xC3\xA1n,aszalv\xC3\xA1ny,kefir,v\xC3\xADz"},{"id":1420,"type":"INT","name":"mennyit? (g)","templateFieldId":24,"floatValue":null,"intValue":0,"boolValue":null,"stringValue":null}]},{"id":662,"millisecsFrom1970":1424979000000,"name":"\xC3\u2030tel","templateId":18,"fields":[{"id":1421,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"5 toj\xC3\xA1s,kefir"},{"id":1422,"type":"INT","name":"mennyit? (g)","templateFieldId":24,"floatValue":null,"intValue":0,"boolValue":null,"stringValue":null}]},{"id":262,"millisecsFrom1970":1423612800000,"name":"T\xC3\xB6meg","templateId":9,"fields":[{"id":361,"type":"FLOAT","name":"t\xC3\xB6meg (kg)","templateFieldId":1,"floatValue":76.9,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":263,"millisecsFrom1970":1423699200000,"name":"T\xC3\xB6meg","templateId":9,"fields":[{"id":362,"type":"FLOAT","name":"t\xC3\xB6meg (kg)","templateFieldId":1,"floatValue":76.6,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":261,"millisecsFrom1970":1423526400000,"name":"T\xC3\xB6meg","templateId":9,"fields":[{"id":360,"type":"FLOAT","name":"t\xC3\xB6meg (kg)","templateFieldId":1,"floatValue":77.1,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":610,"millisecsFrom1970":1424271600000,"name":"\xC3\u2030tel","templateId":18,"fields":[{"id":1353,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"rizs(100g) kelbi(100g) savany\xC3\xBAs\xC3\xA1g(50g) hal(100g) olivaolaj(1tk) t\xC3\xB6kmagolaj(1tk) lenmagolaj(1tk)"},{"id":1354,"type":"INT","name":"mennyit? (g)","templateFieldId":24,"floatValue":null,"intValue":0,"boolValue":null,"stringValue":null}]},{"id":660,"millisecsFrom1970":1425049200000,"name":"\xC3\u2030tel","templateId":18,"fields":[{"id":1417,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"csirke,m\xC3\xA1j(50+50g), r\xC3\xADzs( f\xC5\u2018zve 200g), 1 oldal paprika, 1 gyufa uborka, 1 db retek, 1 paradicsom,oliva,t\xC3\xB6kmag,lenmag,halolaj(1 ek), 50g savany\xC3\xBAk\xC3\xA1poszta"},{"id":1418,"type":"INT","name":"mennyit? (g)","templateFieldId":24,"floatValue":null,"intValue":0,"boolValue":null,"stringValue":null}]},{"id":681,"millisecsFrom1970":1425065520000,"name":"Sz\xC3\xA9klet","templateId":17,"fields":[{"id":1441,"type":"SELECT","name":"milyen?","templateFieldId":15,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":""}]},{"id":608,"millisecsFrom1970":1424255400000,"name":"\xC3\u2030tel","templateId":18,"fields":[{"id":1349,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"zab(80g) aszalv\xC3\xA1nyok(30g) di\xC3\xB3(2) mandula(4) mogyor\xC3\xB3(4) m\xC3\xA9z(1tk)"},{"id":1350,"type":"INT","name":"mennyit? (g)","templateFieldId":24,"floatValue":null,"intValue":0,"boolValue":null,"stringValue":null}]},{"id":663,"millisecsFrom1970":1425034800000,"name":"T\xC3\xB6meg","templateId":9,"fields":[{"id":1423,"type":"FLOAT","name":"t\xC3\xB6meg (kg)","templateFieldId":1,"floatValue":76.5,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":689,"millisecsFrom1970":1425121200000,"name":"45\xC2\xB0 mell","templateId":43,"fields":[{"id":1449,"type":"INT","name":"ism\xC3\xA9tl\xC3\xA9s","templateFieldId":65,"floatValue":null,"intValue":8,"boolValue":null,"stringValue":null},{"id":1450,"type":"FLOAT","name":"t\xC3\xA1rcsa","templateFieldId":66,"floatValue":8.75,"intValue":null,"boolValue":null,"stringValue":null},{"id":1451,"type":"INT","name":"sorozat","templateFieldId":67,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null}]},{"id":690,"millisecsFrom1970":1425121200000,"name":"Tricepsz r\xC3\xBAddal","templateId":44,"fields":[{"id":1452,"type":"INT","name":"ism\xC3\xA9tl\xC3\xA9s","templateFieldId":68,"floatValue":null,"intValue":5,"boolValue":null,"stringValue":null},{"id":1453,"type":"FLOAT","name":"t\xC3\xA1rcsa","templateFieldId":69,"floatValue":0.0,"intValue":null,"boolValue":null,"stringValue":null},{"id":1454,"type":"INT","name":"sorozat","templateFieldId":70,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null}]},{"id":691,"millisecsFrom1970":1425121200000,"name":"T\xC3\xA1rogat\xC3\xA1s","templateId":10,"fields":[{"id":1455,"type":"INT","name":"ism\xC3\xA9tl\xC3\xA9s","templateFieldId":4,"floatValue":null,"intValue":6,"boolValue":null,"stringValue":null},{"id":1456,"type":"INT","name":"t\xC3\xA1rcsa","templateFieldId":2,"floatValue":null,"intValue":7,"boolValue":null,"stringValue":null},{"id":1457,"type":"INT","name":"sorozat","templateFieldId":3,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null}]},{"id":692,"millisecsFrom1970":1425121200000,"name":"V\xC3\xA1llb\xC3\xB3l nyom\xC3\xA1s","templateId":28,"fields":[{"id":1458,"type":"INT","name":"ism\xC3\xA9tl\xC3\xA9s","templateFieldId":27,"floatValue":null,"intValue":5,"boolValue":null,"stringValue":null},{"id":1459,"type":"FLOAT","name":"sorozat","templateFieldId":28,"floatValue":1.0,"intValue":null,"boolValue":null,"stringValue":null},{"id":1460,"type":"INT","name":"s\xC3\xBAly","templateFieldId":29,"floatValue":null,"intValue":10,"boolValue":null,"stringValue":null}]},{"id":693,"millisecsFrom1970":1425121200000,"name":"L\xC3\xA1btol\xC3\xA1s","templateId":11,"fields":[{"id":1461,"type":"INT","name":"ism\xC3\xA9tl\xC3\xA9s","templateFieldId":7,"floatValue":null,"intValue":5,"boolValue":null,"stringValue":null},{"id":1462,"type":"INT","name":"sorozat","templateFieldId":6,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null},{"id":1463,"type":"INT","name":"s\xC3\xBAly","templateFieldId":5,"floatValue":null,"intValue":100,"boolValue":null,"stringValue":null}]},{"id":694,"millisecsFrom1970":1425121200000,"name":"L\xC3\xA1bhajl\xC3\xADt\xC3\xA1s","templateId":29,"fields":[{"id":1464,"type":"INT","name":"ism\xC3\xA9tl\xC3\xA9s","templateFieldId":30,"floatValue":null,"intValue":11,"boolValue":null,"stringValue":null},{"id":1465,"type":"INT","name":"sorozat","templateFieldId":31,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null},{"id":1466,"type":"INT","name":"s\xC3\xBAly","templateFieldId":32,"floatValue":null,"intValue":24,"boolValue":null,"stringValue":null}]},{"id":695,"millisecsFrom1970":1425121200000,"name":"V\xC3\xA1dli","templateId":30,"fields":[{"id":1467,"type":"INT","name":"ism\xC3\xA9tl\xC3\xA9s","templateFieldId":33,"floatValue":null,"intValue":8,"boolValue":null,"stringValue":null},{"id":1468,"type":"INT","name":"sorozat","templateFieldId":34,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null},{"id":1469,"type":"INT","name":"s\xC3\xBAly","templateFieldId":35,"floatValue":null,"intValue":190,"boolValue":null,"stringValue":null}]},{"id":696,"millisecsFrom1970":1425078000000,"name":"Guggol\xC3\xA1s","templateId":45,"fields":[{"id":1470,"type":"INT","name":"ism\xC3\xA9tl\xC3\xA9s","templateFieldId":71,"floatValue":null,"intValue":8,"boolValue":null,"stringValue":null},{"id":1471,"type":"INT","name":"sorozat","templateFieldId":72,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null},{"id":1472,"type":"FLOAT","name":"s\xC3\xBAly","templateFieldId":73,"floatValue":10.0,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":697,"millisecsFrom1970":1425121200000,"name":"Bicepsz","templateId":35,"fields":[{"id":1473,"type":"INT","name":"ism\xC3\xA9tl\xC3\xA9s","templateFieldId":48,"floatValue":null,"intValue":9,"boolValue":null,"stringValue":null},{"id":1474,"type":"INT","name":"t\xC3\xA1rcsa","templateFieldId":49,"floatValue":null,"intValue":6,"boolValue":null,"stringValue":null},{"id":1475,"type":"INT","name":"sorozat","templateFieldId":50,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null}]},{"id":698,"millisecsFrom1970":1424862000000,"name":"Evez\xC3\xA9s","templateId":34,"fields":[{"id":1476,"type":"INT","name":"ism\xC3\xA9tl\xC3\xA9s","templateFieldId":45,"floatValue":null,"intValue":9,"boolValue":null,"stringValue":null},{"id":1477,"type":"INT","name":"t\xC3\xA1rcsa","templateFieldId":46,"floatValue":null,"intValue":5,"boolValue":null,"stringValue":null},{"id":1478,"type":"INT","name":"sorozat","templateFieldId":47,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null}]},{"id":699,"millisecsFrom1970":1424862000000,"name":"Bicepsz","templateId":35,"fields":[{"id":1479,"type":"INT","name":"ism\xC3\xA9tl\xC3\xA9s","templateFieldId":48,"floatValue":null,"intValue":7,"boolValue":null,"stringValue":null},{"id":1480,"type":"INT","name":"t\xC3\xA1rcsa","templateFieldId":49,"floatValue":null,"intValue":6,"boolValue":null,"stringValue":null},{"id":1481,"type":"INT","name":"sorozat","templateFieldId":50,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null}]},{"id":700,"millisecsFrom1970":1424862000000,"name":"Mellhez h\xC3\xBAz\xC3\xA1s","templateId":36,"fields":[{"id":1482,"type":"INT","name":"ism\xC3\xA9tl\xC3\xA9s","templateFieldId":51,"floatValue":null,"intValue":7,"boolValue":null,"stringValue":null},{"id":1483,"type":"INT","name":"sorozat","templateFieldId":52,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null},{"id":1484,"type":"INT","name":"s\xC3\xBAly","templateFieldId":53,"floatValue":null,"intValue":35,"boolValue":null,"stringValue":null}]},{"id":701,"millisecsFrom1970":1424862000000,"name":"Csuklya","templateId":46,"fields":[{"id":1485,"type":"INT","name":"ism\xC3\xA9tl\xC3\xA9s","templateFieldId":74,"floatValue":null,"intValue":5,"boolValue":null,"stringValue":null},{"id":1486,"type":"INT","name":"sorozat","templateFieldId":75,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null},{"id":1487,"type":"FLOAT","name":"s\xC3\xBAly","templateFieldId":76,"floatValue":15.0,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":703,"millisecsFrom1970":1424430000000,"name":"45\xC2\xB0 mell","templateId":43,"fields":[{"id":1491,"type":"INT","name":"ism\xC3\xA9tl\xC3\xA9s","templateFieldId":65,"floatValue":null,"intValue":6,"boolValue":null,"stringValue":null},{"id":1492,"type":"FLOAT","name":"t\xC3\xA1rcsa","templateFieldId":66,"floatValue":7.5,"intValue":null,"boolValue":null,"stringValue":null},{"id":1493,"type":"INT","name":"sorozat","templateFieldId":67,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null}]},{"id":704,"millisecsFrom1970":1424430000000,"name":"Tricepsz r\xC3\xBAddal","templateId":44,"fields":[{"id":1494,"type":"INT","name":"ism\xC3\xA9tl\xC3\xA9s","templateFieldId":68,"floatValue":null,"intValue":5,"boolValue":null,"stringValue":null},{"id":1495,"type":"FLOAT","name":"t\xC3\xA1rcsa","templateFieldId":69,"floatValue":0.0,"intValue":null,"boolValue":null,"stringValue":null},{"id":1496,"type":"INT","name":"sorozat","templateFieldId":70,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null}]},{"id":705,"millisecsFrom1970":1424430000000,"name":"T\xC3\xA1rogat\xC3\xA1s","templateId":10,"fields":[{"id":1497,"type":"INT","name":"ism\xC3\xA9tl\xC3\xA9s","templateFieldId":4,"floatValue":null,"intValue":8,"boolValue":null,"stringValue":null},{"id":1498,"type":"INT","name":"t\xC3\xA1rcsa","templateFieldId":2,"floatValue":null,"intValue":7,"boolValue":null,"stringValue":null},{"id":1499,"type":"INT","name":"sorozat","templateFieldId":3,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null}]},{"id":706,"millisecsFrom1970":1424430000000,"name":"V\xC3\xA1llb\xC3\xB3l nyom\xC3\xA1s","templateId":28,"fields":[{"id":1500,"type":"INT","name":"ism\xC3\xA9tl\xC3\xA9s","templateFieldId":27,"floatValue":null,"intValue":9,"boolValue":null,"stringValue":null},{"id":1501,"type":"FLOAT","name":"sorozat","templateFieldId":28,"floatValue":1.0,"intValue":null,"boolValue":null,"stringValue":null},{"id":1502,"type":"INT","name":"s\xC3\xBAly","templateFieldId":29,"floatValue":null,"intValue":30,"boolValue":null,"stringValue":null}]},{"id":707,"millisecsFrom1970":1424257200000,"name":"Csuklya","templateId":46,"fields":[{"id":1503,"type":"INT","name":"ism\xC3\xA9tl\xC3\xA9s","templateFieldId":74,"floatValue":null,"intValue":8,"boolValue":null,"stringValue":null},{"id":1504,"type":"INT","name":"sorozat","templateFieldId":75,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null},{"id":1505,"type":"FLOAT","name":"s\xC3\xBAly","templateFieldId":76,"floatValue":10.0,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":708,"millisecsFrom1970":1424257200000,"name":"Mellhez h\xC3\xBAz\xC3\xA1s","templateId":36,"fields":[{"id":1506,"type":"INT","name":"ism\xC3\xA9tl\xC3\xA9s","templateFieldId":51,"floatValue":null,"intValue":8,"boolValue":null,"stringValue":null},{"id":1507,"type":"INT","name":"sorozat","templateFieldId":52,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null},{"id":1508,"type":"INT","name":"s\xC3\xBAly","templateFieldId":53,"floatValue":null,"intValue":35,"boolValue":null,"stringValue":null}]},{"id":709,"millisecsFrom1970":1424257200000,"name":"Bicepsz","templateId":35,"fields":[{"id":1509,"type":"INT","name":"ism\xC3\xA9tl\xC3\xA9s","templateFieldId":48,"floatValue":null,"intValue":6,"boolValue":null,"stringValue":null},{"id":1510,"type":"INT","name":"t\xC3\xA1rcsa","templateFieldId":49,"floatValue":null,"intValue":6,"boolValue":null,"stringValue":null},{"id":1511,"type":"INT","name":"sorozat","templateFieldId":50,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null}]},{"id":710,"millisecsFrom1970":1424257200000,"name":"Evez\xC3\xA9s","templateId":34,"fields":[{"id":1512,"type":"INT","name":"ism\xC3\xA9tl\xC3\xA9s","templateFieldId":45,"floatValue":null,"intValue":8,"boolValue":null,"stringValue":null},{"id":1513,"type":"INT","name":"t\xC3\xA1rcsa","templateFieldId":46,"floatValue":null,"intValue":5,"boolValue":null,"stringValue":null},{"id":1514,"type":"INT","name":"sorozat","templateFieldId":47,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null}]},{"id":711,"millisecsFrom1970":1424170800000,"name":"L\xC3\xA1btol\xC3\xA1s","templateId":11,"fields":[{"id":1515,"type":"INT","name":"ism\xC3\xA9tl\xC3\xA9s","templateFieldId":7,"floatValue":null,"intValue":10,"boolValue":null,"stringValue":null},{"id":1516,"type":"INT","name":"sorozat","templateFieldId":6,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null},{"id":1517,"type":"INT","name":"s\xC3\xBAly","templateFieldId":5,"floatValue":null,"intValue":60,"boolValue":null,"stringValue":null}]},{"id":712,"millisecsFrom1970":1424170800000,"name":"L\xC3\xA1bhajl\xC3\xADt\xC3\xA1s","templateId":29,"fields":[{"id":1518,"type":"INT","name":"ism\xC3\xA9tl\xC3\xA9s","templateFieldId":30,"floatValue":null,"intValue":6,"boolValue":null,"stringValue":null},{"id":1519,"type":"INT","name":"sorozat","templateFieldId":31,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null},{"id":1520,"type":"INT","name":"s\xC3\xBAly","templateFieldId":32,"floatValue":null,"intValue":24,"boolValue":null,"stringValue":null}]},{"id":713,"millisecsFrom1970":1424170800000,"name":"V\xC3\xA1dli","templateId":30,"fields":[{"id":1521,"type":"INT","name":"ism\xC3\xA9tl\xC3\xA9s","templateFieldId":33,"floatValue":null,"intValue":12,"boolValue":null,"stringValue":null},{"id":1522,"type":"INT","name":"sorozat","templateFieldId":34,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null},{"id":1523,"type":"INT","name":"s\xC3\xBAly","templateFieldId":35,"floatValue":null,"intValue":170,"boolValue":null,"stringValue":null}]},{"id":714,"millisecsFrom1970":1424430000000,"name":"L\xC3\xA1btol\xC3\xA1s","templateId":11,"fields":[{"id":1524,"type":"INT","name":"ism\xC3\xA9tl\xC3\xA9s","templateFieldId":7,"floatValue":null,"intValue":14,"boolValue":null,"stringValue":null},{"id":1525,"type":"INT","name":"sorozat","templateFieldId":6,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null},{"id":1526,"type":"INT","name":"s\xC3\xBAly","templateFieldId":5,"floatValue":null,"intValue":80,"boolValue":null,"stringValue":null}]},{"id":715,"millisecsFrom1970":1424430000000,"name":"L\xC3\xA1bhajl\xC3\xADt\xC3\xA1s","templateId":29,"fields":[{"id":1527,"type":"INT","name":"ism\xC3\xA9tl\xC3\xA9s","templateFieldId":30,"floatValue":null,"intValue":9,"boolValue":null,"stringValue":null},{"id":1528,"type":"INT","name":"sorozat","templateFieldId":31,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null},{"id":1529,"type":"INT","name":"s\xC3\xBAly","templateFieldId":32,"floatValue":null,"intValue":24,"boolValue":null,"stringValue":null}]},{"id":716,"millisecsFrom1970":1424430000000,"name":"V\xC3\xA1dli","templateId":30,"fields":[{"id":1530,"type":"INT","name":"ism\xC3\xA9tl\xC3\xA9s","templateFieldId":33,"floatValue":null,"intValue":11,"boolValue":null,"stringValue":null},{"id":1531,"type":"INT","name":"sorozat","templateFieldId":34,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null},{"id":1532,"type":"INT","name":"s\xC3\xBAly","templateFieldId":35,"floatValue":null,"intValue":180,"boolValue":null,"stringValue":null}]},{"id":717,"millisecsFrom1970":1425110400000,"name":"\xC3\u2030tel","templateId":18,"fields":[{"id":1533,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"zab(100g),feh\xC3\xA9rje(50g),alma,ban\xC3\xA1n,aszalv\xC3\xA1ny,kefir,v\xC3\xADz"},{"id":1534,"type":"INT","name":"mennyit? (g)","templateFieldId":24,"floatValue":null,"intValue":0,"boolValue":null,"stringValue":null}]},{"id":718,"millisecsFrom1970":1425207600000,"name":"T\xC3\xB6meg","templateId":9,"fields":[{"id":1535,"type":"FLOAT","name":"t\xC3\xB6meg (kg)","templateFieldId":1,"floatValue":76.5,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":719,"millisecsFrom1970":1425121200000,"name":"Alkohol","templateId":21,"fields":[{"id":1536,"type":"INT","name":"mennyit?","templateFieldId":20,"floatValue":null,"intValue":3,"boolValue":null,"stringValue":null}]},{"id":721,"millisecsFrom1970":1425195060000,"name":"Sz\xC3\xA9klet","templateId":17,"fields":[{"id":1538,"type":"SELECT","name":"milyen?","templateFieldId":15,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":""}]},{"id":722,"millisecsFrom1970":1425193200000,"name":"\xC3\u2030tel","templateId":18,"fields":[{"id":1539,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"zab(100g),feh\xC3\xA9rje(50g),alma,ban\xC3\xA1n,aszalv\xC3\xA1ny,kefir,v\xC3\xADz"},{"id":1540,"type":"INT","name":"mennyit? (g)","templateFieldId":24,"floatValue":null,"intValue":0,"boolValue":null,"stringValue":null}]},{"id":723,"millisecsFrom1970":1425214800000,"name":"\xC3\u2030tel","templateId":18,"fields":[{"id":1541,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"rizs(200g),eg\xC3\xA9sz csirkecomb (sok), szalonn\xC3\xA1s m\xC3\xA1j"},{"id":1542,"type":"INT","name":"mennyit? (g)","templateFieldId":24,"floatValue":null,"intValue":0,"boolValue":null,"stringValue":null}]},{"id":724,"millisecsFrom1970":1425236400000,"name":"\xC3\u2030tel","templateId":18,"fields":[{"id":1543,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"r\xC3\xA9teseket, csilisbab, kefir"},{"id":1544,"type":"INT","name":"mennyit? (g)","templateFieldId":24,"floatValue":null,"intValue":0,"boolValue":null,"stringValue":null}]},{"id":725,"millisecsFrom1970":1425294000000,"name":"T\xC3\xB6meg","templateId":9,"fields":[{"id":1545,"type":"FLOAT","name":"t\xC3\xB6meg (kg)","templateFieldId":1,"floatValue":76.5,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":727,"millisecsFrom1970":1425281700000,"name":"Sz\xC3\xA9klet","templateId":17,"fields":[{"id":1548,"type":"SELECT","name":"milyen?","templateFieldId":15,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":""}]},{"id":729,"millisecsFrom1970":1425304800000,"name":"\xC3\u2030tel","templateId":18,"fields":[{"id":1551,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"csirke,m\xC3\xA1j(50+50g), r\xC3\xADzs( f\xC5\u2018zve 200g), 1 sz\xC3\xA1l hagyma,1 oldal paprika, 1 gyufa uborka, 1 db retek, 1 paradicsom,oliva,t\xC3\xB6kmag,lenmag,halolaj(1 ek),"},{"id":1552,"type":"INT","name":"mennyit? (g)","templateFieldId":24,"floatValue":null,"intValue":0,"boolValue":null,"stringValue":null}]},{"id":728,"millisecsFrom1970":1425287700000,"name":"\xC3\u2030tel","templateId":18,"fields":[{"id":1549,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"csirke,m\xC3\xA1j(50+50g), r\xC3\xADzs( f\xC5\u2018zve 200g), 1 sz\xC3\xA1l hagyma,1 oldal paprika, 1 gyufa uborka, 1 db retek, 1 paradicsom,oliva,t\xC3\xB6kmag,lenmag,halolaj(1 ek),"},{"id":1550,"type":"INT","name":"mennyit? (g)","templateFieldId":24,"floatValue":null,"intValue":0,"boolValue":null,"stringValue":null}]},{"id":726,"millisecsFrom1970":1425272400000,"name":"\xC3\u2030tel","templateId":18,"fields":[{"id":1546,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"zab(80g),feh\xC3\xA9rje(30g),alma,ban\xC3\xA1n,aszalv\xC3\xA1ny,kefir,v\xC3\xADz"},{"id":1547,"type":"INT","name":"mennyit? (g)","templateFieldId":24,"floatValue":null,"intValue":0,"boolValue":null,"stringValue":null}]},{"id":730,"millisecsFrom1970":1425380400000,"name":"T\xC3\xB6meg","templateId":9,"fields":[{"id":1553,"type":"FLOAT","name":"t\xC3\xB6meg (kg)","templateFieldId":1,"floatValue":76.7,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":731,"millisecsFrom1970":1425358800000,"name":"\xC3\u2030tel","templateId":18,"fields":[{"id":1554,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"zab(60g),feh\xC3\xA9rje(30g),alma,ban\xC3\xA1n,aszalv\xC3\xA1ny,kefir,v\xC3\xADz"},{"id":1555,"type":"INT","name":"mennyit? (g)","templateFieldId":24,"floatValue":null,"intValue":0,"boolValue":null,"stringValue":null}]},{"id":732,"millisecsFrom1970":1425380400000,"name":"Evez\xC3\xA9s","templateId":34,"fields":[{"id":1556,"type":"INT","name":"ism\xC3\xA9tl\xC3\xA9s","templateFieldId":45,"floatValue":null,"intValue":6,"boolValue":null,"stringValue":null},{"id":1557,"type":"INT","name":"t\xC3\xA1rcsa","templateFieldId":46,"floatValue":null,"intValue":5,"boolValue":null,"stringValue":null},{"id":1558,"type":"INT","name":"sorozat","templateFieldId":47,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null}]},{"id":733,"millisecsFrom1970":1425376800000,"name":"\xC3\u2030tel","templateId":18,"fields":[{"id":1559,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"csirke,m\xC3\xA1j(50+50g), r\xC3\xADzs( f\xC5\u2018zve 200g), 1 sz\xC3\xA1l hagyma,1 oldal paprika, 1 gyufa uborka, 1 db retek, 1 paradicsom,oliva,t\xC3\xB6kmag,lenmag,halolaj(1 ek),"},{"id":1560,"type":"INT","name":"mennyit? (g)","templateFieldId":24,"floatValue":null,"intValue":0,"boolValue":null,"stringValue":null}]},{"id":734,"millisecsFrom1970":1425391200000,"name":"\xC3\u2030tel","templateId":18,"fields":[{"id":1561,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"r\xC3\xADzs( f\xC5\u2018zve 200g), 1 sz\xC3\xA1l hagyma,1 oldal paprika, 1 gyufa uborka, 1 db retek, 1 paradicsom,oliva,t\xC3\xB6kmag,lenmag,halolaj(1 ek),"},{"id":1562,"type":"INT","name":"mennyit? (g)","templateFieldId":24,"floatValue":null,"intValue":0,"boolValue":null,"stringValue":null}]},{"id":735,"millisecsFrom1970":1425407400000,"name":"\xC3\u2030tel","templateId":18,"fields":[{"id":1563,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"3 toj\xC3\xA1s, lep\xC3\xA9ny, lekv\xC3\xA1r, kefir, leves"},{"id":1564,"type":"INT","name":"mennyit? (g)","templateFieldId":24,"floatValue":null,"intValue":0,"boolValue":null,"stringValue":null}]},{"id":736,"millisecsFrom1970":1425466800000,"name":"T\xC3\xB6meg","templateId":9,"fields":[{"id":1565,"type":"FLOAT","name":"t\xC3\xB6meg (kg)","templateFieldId":1,"floatValue":76.5,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":737,"millisecsFrom1970":1425447000000,"name":"\xC3\u2030tel","templateId":18,"fields":[{"id":1566,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"ban\xC3\xA1n, kefir"},{"id":1567,"type":"INT","name":"mennyit? (g)","templateFieldId":24,"floatValue":null,"intValue":0,"boolValue":null,"stringValue":null}]},{"id":738,"millisecsFrom1970":1425457800000,"name":"\xC3\u2030tel","templateId":18,"fields":[{"id":1568,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"alma,ban\xC3\xA1n"},{"id":1569,"type":"INT","name":"mennyit? (g)","templateFieldId":24,"floatValue":null,"intValue":0,"boolValue":null,"stringValue":null}]},{"id":739,"millisecsFrom1970":1425462360000,"name":"Sz\xC3\xA9klet","templateId":17,"fields":[{"id":1570,"type":"SELECT","name":"milyen?","templateFieldId":15,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"hatalmas"}]},{"id":740,"millisecsFrom1970":1425466800000,"name":"\xC3\u2030tel","templateId":18,"fields":[{"id":1571,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"csilisbab"},{"id":1572,"type":"INT","name":"mennyit? (g)","templateFieldId":24,"floatValue":null,"intValue":0,"boolValue":null,"stringValue":null}]},{"id":742,"millisecsFrom1970":1425380400000,"name":"T\xC3\xB6meg","templateId":9,"fields":[{"id":1574,"type":"FLOAT","name":"t\xC3\xB6meg (kg)","templateFieldId":1,"floatValue":0.0,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":743,"millisecsFrom1970":1425493320000,"name":"Sz\xC3\xA9klet","templateId":17,"fields":[{"id":1575,"type":"SELECT","name":"milyen?","templateFieldId":15,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"habos"}]},{"id":744,"millisecsFrom1970":1425496200000,"name":"\xC3\u2030tel","templateId":18,"fields":[{"id":1576,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"avok\xC3\xA1d\xC3\xB3s kr\xC3\xA9m, palacsinta lekv\xC3\xA1r kaka\xC3\xB3"},{"id":1577,"type":"INT","name":"mennyit? (g)","templateFieldId":24,"floatValue":null,"intValue":0,"boolValue":null,"stringValue":null}]},{"id":745,"millisecsFrom1970":1425553200000,"name":"T\xC3\xB6meg","templateId":9,"fields":[{"id":1578,"type":"FLOAT","name":"t\xC3\xB6meg (kg)","templateFieldId":1,"floatValue":76.5,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":746,"millisecsFrom1970":1425533400000,"name":"\xC3\u2030tel","templateId":18,"fields":[{"id":1579,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"100g zab, aszalv\xC3\xA1nyok, 15g feh\xC3\xA9rje, 1k m\xC3\xA9z, v\xC3\xADz"},{"id":1580,"type":"INT","name":"mennyit? (g)","templateFieldId":24,"floatValue":null,"intValue":0,"boolValue":null,"stringValue":null}]},{"id":747,"millisecsFrom1970":1425553200000,"name":"L\xC3\xA1btol\xC3\xA1s","templateId":11,"fields":[{"id":1581,"type":"INT","name":"ism\xC3\xA9tl\xC3\xA9s","templateFieldId":7,"floatValue":null,"intValue":7,"boolValue":null,"stringValue":null},{"id":1582,"type":"INT","name":"sorozat","templateFieldId":6,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null},{"id":1583,"type":"INT","name":"s\xC3\xBAly","templateFieldId":5,"floatValue":null,"intValue":90,"boolValue":null,"stringValue":null}]},{"id":748,"millisecsFrom1970":1425553200000,"name":"L\xC3\xA1bhajl\xC3\xADt\xC3\xA1s","templateId":29,"fields":[{"id":1584,"type":"INT","name":"ism\xC3\xA9tl\xC3\xA9s","templateFieldId":30,"floatValue":null,"intValue":10,"boolValue":null,"stringValue":null},{"id":1585,"type":"INT","name":"sorozat","templateFieldId":31,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null},{"id":1586,"type":"INT","name":"s\xC3\xBAly","templateFieldId":32,"floatValue":null,"intValue":24,"boolValue":null,"stringValue":null}]},{"id":749,"millisecsFrom1970":1425553200000,"name":"V\xC3\xA1dli","templateId":30,"fields":[{"id":1587,"type":"INT","name":"ism\xC3\xA9tl\xC3\xA9s","templateFieldId":33,"floatValue":null,"intValue":8,"boolValue":null,"stringValue":null},{"id":1588,"type":"INT","name":"sorozat","templateFieldId":34,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null},{"id":1589,"type":"INT","name":"s\xC3\xBAly","templateFieldId":35,"floatValue":null,"intValue":190,"boolValue":null,"stringValue":null}]},{"id":750,"millisecsFrom1970":1425553200000,"name":"Tricepsz r\xC3\xBAddal","templateId":44,"fields":[{"id":1590,"type":"INT","name":"ism\xC3\xA9tl\xC3\xA9s","templateFieldId":68,"floatValue":null,"intValue":6,"boolValue":null,"stringValue":null},{"id":1591,"type":"FLOAT","name":"t\xC3\xA1rcsa","templateFieldId":69,"floatValue":0.0,"intValue":null,"boolValue":null,"stringValue":null},{"id":1592,"type":"INT","name":"sorozat","templateFieldId":70,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null}]},{"id":751,"millisecsFrom1970":1425553200000,"name":"T\xC3\xA1rogat\xC3\xA1s","templateId":10,"fields":[{"id":1593,"type":"INT","name":"ism\xC3\xA9tl\xC3\xA9s","templateFieldId":4,"floatValue":null,"intValue":9,"boolValue":null,"stringValue":null},{"id":1594,"type":"INT","name":"t\xC3\xA1rcsa","templateFieldId":2,"floatValue":null,"intValue":7,"boolValue":null,"stringValue":null},{"id":1595,"type":"INT","name":"sorozat","templateFieldId":3,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null}]},{"id":752,"millisecsFrom1970":1425553200000,"name":"Bicepsz","templateId":35,"fields":[{"id":1596,"type":"INT","name":"ism\xC3\xA9tl\xC3\xA9s","templateFieldId":48,"floatValue":null,"intValue":8,"boolValue":null,"stringValue":null},{"id":1597,"type":"INT","name":"t\xC3\xA1rcsa","templateFieldId":49,"floatValue":null,"intValue":6,"boolValue":null,"stringValue":null},{"id":1598,"type":"INT","name":"sorozat","templateFieldId":50,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null}]},{"id":753,"millisecsFrom1970":1425576600000,"name":"\xC3\u2030tel","templateId":18,"fields":[{"id":1599,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"20g feh\xC3\xA9rje, 1ek halolaj, 50-50g(\xC3\xA1fonya,szeder,m\xC3\xA1lna,eper), 40g m\xC3\xA9z, 1 ban\xC3\xA1n, v\xC3\xADz"},{"id":1600,"type":"INT","name":"mennyit? (g)","templateFieldId":24,"floatValue":null,"intValue":0,"boolValue":null,"stringValue":null}]},{"id":754,"millisecsFrom1970":1425639600000,"name":"T\xC3\xB6meg","templateId":9,"fields":[{"id":1601,"type":"FLOAT","name":"t\xC3\xB6meg (kg)","templateFieldId":1,"floatValue":76.4,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":755,"millisecsFrom1970":1425619020000,"name":"\xC3\u2030tel","templateId":18,"fields":[{"id":1602,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"zab(100g)aszalv\xC3\xA1nyok,feh\xC3\xA9rje(20g),ek m\xC3\xA9z, magok"},{"id":1603,"type":"INT","name":"mennyit? (g)","templateFieldId":24,"floatValue":null,"intValue":0,"boolValue":null,"stringValue":null}]},{"id":758,"millisecsFrom1970":1425639600000,"name":"Szex","templateId":20,"fields":[{"id":1606,"type":"SELECT","name":"hossz","templateFieldId":18,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"\xC3\xA1tlag"},{"id":1607,"type":"SELECT","name":"kem\xC3\xA9nys\xC3\xA9g","templateFieldId":19,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":""}]},{"id":761,"millisecsFrom1970":1425627000000,"name":"\xC3\u2030tel","templateId":18,"fields":[{"id":1610,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"kefir"},{"id":1611,"type":"INT","name":"mennyit? (g)","templateFieldId":24,"floatValue":null,"intValue":0,"boolValue":null,"stringValue":null}]},{"id":762,"millisecsFrom1970":1425631200000,"name":"Sz\xC3\xA9klet","templateId":17,"fields":[{"id":1612,"type":"SELECT","name":"milyen?","templateFieldId":15,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":""}]},{"id":763,"millisecsFrom1970":1425635340000,"name":"\xC3\u2030tel","templateId":18,"fields":[{"id":1613,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"rizs(200g),m\xC3\xA1j,avok\xC3\xA1d\xC3\xB3kr\xC3\xA9m,ek olajok"},{"id":1614,"type":"INT","name":"mennyit? (g)","templateFieldId":24,"floatValue":null,"intValue":0,"boolValue":null,"stringValue":null}]},{"id":764,"millisecsFrom1970":1425708000000,"name":"Sz\xC3\xA9klet","templateId":17,"fields":[{"id":1615,"type":"SELECT","name":"milyen?","templateFieldId":15,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":""}]},{"id":765,"millisecsFrom1970":1425726000000,"name":"T\xC3\xB6meg","templateId":9,"fields":[{"id":1616,"type":"FLOAT","name":"t\xC3\xB6meg (kg)","templateFieldId":1,"floatValue":76.7,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":766,"millisecsFrom1970":1425639600000,"name":"Alkohol","templateId":21,"fields":[{"id":1617,"type":"INT","name":"mennyit?","templateFieldId":20,"floatValue":null,"intValue":5,"boolValue":null,"stringValue":null},{"id":1618,"type":"SELECT","name":"m\xC3\xA1snaposs\xC3\xA1g?","templateFieldId":86,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":""}]},{"id":767,"millisecsFrom1970":1425715200000,"name":"\xC3\u2030tel","templateId":18,"fields":[{"id":1619,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"zab(100g)aszalv\xC3\xA1nyok,feh\xC3\xA9rje(20g),ek m\xC3\xA9z, magok"},{"id":1620,"type":"INT","name":"mennyit? (g)","templateFieldId":24,"floatValue":null,"intValue":0,"boolValue":null,"stringValue":null}]},{"id":768,"millisecsFrom1970":1425812400000,"name":"T\xC3\xB6meg","templateId":9,"fields":[{"id":1621,"type":"FLOAT","name":"t\xC3\xB6meg (kg)","templateFieldId":1,"floatValue":76.4,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":769,"millisecsFrom1970":1425794400000,"name":"\xC3\u2030tel","templateId":18,"fields":[{"id":1622,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"zab(100g)aszalv\xC3\xA1nyok,feh\xC3\xA9rje(20g),ek m\xC3\xA9z, magok"},{"id":1623,"type":"INT","name":"mennyit? (g)","templateFieldId":24,"floatValue":null,"intValue":0,"boolValue":null,"stringValue":null}]},{"id":770,"millisecsFrom1970":1425553200000,"name":"Csuklya","templateId":46,"fields":[{"id":1624,"type":"INT","name":"ism\xC3\xA9tl\xC3\xA9s","templateFieldId":74,"floatValue":null,"intValue":12,"boolValue":null,"stringValue":null},{"id":1625,"type":"INT","name":"sorozat","templateFieldId":75,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null},{"id":1626,"type":"FLOAT","name":"s\xC3\xBAly","templateFieldId":76,"floatValue":15.0,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":771,"millisecsFrom1970":1425816960000,"name":"Sz\xC3\xA9klet","templateId":17,"fields":[{"id":1627,"type":"SELECT","name":"milyen?","templateFieldId":15,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":""}]},{"id":772,"millisecsFrom1970":1425898800000,"name":"T\xC3\xB6meg","templateId":9,"fields":[{"id":1628,"type":"FLOAT","name":"t\xC3\xB6meg (kg)","templateFieldId":1,"floatValue":76.9,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":773,"millisecsFrom1970":1425878100000,"name":"\xC3\u2030tel","templateId":18,"fields":[{"id":1629,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"zab(100g) aszalv\xC3\xA1nyok,feh\xC3\xA9rje(20g),ek m\xC3\xA9z, magok"},{"id":1630,"type":"INT","name":"mennyit? (g)","templateFieldId":24,"floatValue":null,"intValue":0,"boolValue":null,"stringValue":null}]},{"id":774,"millisecsFrom1970":1425880800000,"name":"Sz\xC3\xA9klet","templateId":17,"fields":[{"id":1631,"type":"SELECT","name":"milyen?","templateFieldId":15,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":""}]},{"id":775,"millisecsFrom1970":1425891480000,"name":"\xC3\u2030tel","templateId":18,"fields":[{"id":1632,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"mandula(40g),kefir,hagyma"},{"id":1633,"type":"INT","name":"mennyit? (g)","templateFieldId":24,"floatValue":null,"intValue":0,"boolValue":null,"stringValue":null}]},{"id":776,"millisecsFrom1970":1425898800000,"name":"Csuklya","templateId":46,"fields":[{"id":1634,"type":"INT","name":"ism\xC3\xA9tl\xC3\xA9s","templateFieldId":74,"floatValue":null,"intValue":7,"boolValue":null,"stringValue":null},{"id":1635,"type":"INT","name":"sorozat","templateFieldId":75,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null},{"id":1636,"type":"FLOAT","name":"s\xC3\xBAly","templateFieldId":76,"floatValue":17.5,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":777,"millisecsFrom1970":1425898800000,"name":"Mellhez h\xC3\xBAz\xC3\xA1s","templateId":36,"fields":[{"id":1637,"type":"INT","name":"ism\xC3\xA9tl\xC3\xA9s","templateFieldId":51,"floatValue":null,"intValue":8,"boolValue":null,"stringValue":null},{"id":1638,"type":"INT","name":"sorozat","templateFieldId":52,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null},{"id":1639,"type":"INT","name":"s\xC3\xBAly","templateFieldId":53,"floatValue":null,"intValue":35,"boolValue":null,"stringValue":null}]},{"id":778,"millisecsFrom1970":1425898800000,"name":"Bicepsz","templateId":35,"fields":[{"id":1640,"type":"INT","name":"ism\xC3\xA9tl\xC3\xA9s","templateFieldId":48,"floatValue":null,"intValue":8,"boolValue":null,"stringValue":null},{"id":1641,"type":"INT","name":"t\xC3\xA1rcsa","templateFieldId":49,"floatValue":null,"intValue":6,"boolValue":null,"stringValue":null},{"id":1642,"type":"INT","name":"sorozat","templateFieldId":50,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null}]},{"id":779,"millisecsFrom1970":1425898800000,"name":"Evez\xC3\xA9s","templateId":34,"fields":[{"id":1643,"type":"INT","name":"ism\xC3\xA9tl\xC3\xA9s","templateFieldId":45,"floatValue":null,"intValue":11,"boolValue":null,"stringValue":null},{"id":1644,"type":"INT","name":"t\xC3\xA1rcsa","templateFieldId":46,"floatValue":null,"intValue":5,"boolValue":null,"stringValue":null},{"id":1645,"type":"INT","name":"sorozat","templateFieldId":47,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null}]},{"id":780,"millisecsFrom1970":1425898800000,"name":"Tricepsz r\xC3\xBAddal","templateId":44,"fields":[{"id":1646,"type":"INT","name":"ism\xC3\xA9tl\xC3\xA9s","templateFieldId":68,"floatValue":null,"intValue":7,"boolValue":null,"stringValue":null},{"id":1647,"type":"FLOAT","name":"t\xC3\xA1rcsa","templateFieldId":69,"floatValue":0.0,"intValue":null,"boolValue":null,"stringValue":null},{"id":1648,"type":"INT","name":"sorozat","templateFieldId":70,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null}]},{"id":781,"millisecsFrom1970":1425985200000,"name":"T\xC3\xB6meg","templateId":9,"fields":[{"id":1649,"type":"FLOAT","name":"t\xC3\xB6meg (kg)","templateFieldId":1,"floatValue":76.9,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":782,"millisecsFrom1970":1425964920000,"name":"\xC3\u2030tel","templateId":18,"fields":[{"id":1650,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"zab(100g) aszalv\xC3\xA1nyok,feh\xC3\xA9rje(20g),ek m\xC3\xA9z, magok"},{"id":1651,"type":"INT","name":"mennyit? (g)","templateFieldId":24,"floatValue":null,"intValue":0,"boolValue":null,"stringValue":null}]},{"id":783,"millisecsFrom1970":1425902400000,"name":"\xC3\u2030tel","templateId":18,"fields":[{"id":1652,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"\xC3\xA9desburgonya(300g), h\xC3\xBAs(50g), 1 retek,paprika,h\xC3\xBCvelykujjnyi ubi,hagyma,paradicsom"},{"id":1653,"type":"INT","name":"mennyit? (g)","templateFieldId":24,"floatValue":null,"intValue":0,"boolValue":null,"stringValue":null}]},{"id":784,"millisecsFrom1970":1425989160000,"name":"\xC3\u2030tel","templateId":18,"fields":[{"id":1654,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"\xC3\xA9desburgonya(200g), h\xC3\xBAs(50g), 1 retek,paprika,h\xC3\xBCvelykujjnyi ubi,hagyma,paradicsom"},{"id":1655,"type":"INT","name":"mennyit? (g)","templateFieldId":24,"floatValue":null,"intValue":0,"boolValue":null,"stringValue":null}]},{"id":785,"millisecsFrom1970":1425978900000,"name":"\xC3\u2030tel","templateId":18,"fields":[{"id":1656,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"\xC3\xA9desburgonya(200g), h\xC3\xBAs(50g), 1 retek,paprika,h\xC3\xBCvelykujjnyi ubi,hagyma,paradicsom"},{"id":1657,"type":"INT","name":"mennyit? (g)","templateFieldId":24,"floatValue":null,"intValue":0,"boolValue":null,"stringValue":null}]},{"id":786,"millisecsFrom1970":1426014000000,"name":"\xC3\u2030tel","templateId":18,"fields":[{"id":1658,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"f\xC5\u2018tt toj\xC3\xA1s, m\xC3\xA1jak, savany\xC3\xBAs\xC3\xA1g"},{"id":1659,"type":"INT","name":"mennyit? (g)","templateFieldId":24,"floatValue":null,"intValue":0,"boolValue":null,"stringValue":null}]},{"id":787,"millisecsFrom1970":1426016460000,"name":"\xC3\u2030tel","templateId":18,"fields":[{"id":1660,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"5g aranygy\xC3\xB6k\xC3\xA9r tea"},{"id":1661,"type":"INT","name":"mennyit? (g)","templateFieldId":24,"floatValue":null,"intValue":0,"boolValue":null,"stringValue":null}]},{"id":788,"millisecsFrom1970":1426071600000,"name":"T\xC3\xB6meg","templateId":9,"fields":[{"id":1662,"type":"FLOAT","name":"t\xC3\xB6meg (kg)","templateFieldId":1,"floatValue":76.1,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":789,"millisecsFrom1970":1426051200000,"name":"\xC3\u2030tel","templateId":18,"fields":[{"id":1663,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"zab(100g) aszalv\xC3\xA1nyok,feh\xC3\xA9rje(20g),ek m\xC3\xA9z, magok"},{"id":1664,"type":"INT","name":"mennyit? (g)","templateFieldId":24,"floatValue":null,"intValue":0,"boolValue":null,"stringValue":null}]},{"id":790,"millisecsFrom1970":1426059000000,"name":"Sz\xC3\xA9klet","templateId":17,"fields":[{"id":1665,"type":"SELECT","name":"milyen?","templateFieldId":15,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":""}]},{"id":791,"millisecsFrom1970":1426063860000,"name":"\xC3\u2030tel","templateId":18,"fields":[{"id":1666,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":" \xC3\xA9desburgonya(200g), m\xC3\xA1j(50g), 1 retek,paprika,h\xC3\xBCvelykujjnyi ubi,hagyma,paradicsom, 1ek olajak"},{"id":1667,"type":"INT","name":"mennyit? (g)","templateFieldId":24,"floatValue":null,"intValue":0,"boolValue":null,"stringValue":null}]},{"id":792,"millisecsFrom1970":1426077780000,"name":"\xC3\u2030tel","templateId":18,"fields":[{"id":1668,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"\xC3\xA9desburgonya(200g), m\xC3\xA1j(50g), 1 retek,paprika,h\xC3\xBCvelykujjnyi ubi,hagyma,paradicsom, 1ek olajak"},{"id":1669,"type":"INT","name":"mennyit? (g)","templateFieldId":24,"floatValue":null,"intValue":0,"boolValue":null,"stringValue":null}]},{"id":793,"millisecsFrom1970":1426071600000,"name":"Csuklya","templateId":46,"fields":[{"id":1670,"type":"INT","name":"ism\xC3\xA9tl\xC3\xA9s","templateFieldId":74,"floatValue":null,"intValue":8,"boolValue":null,"stringValue":null},{"id":1671,"type":"INT","name":"sorozat","templateFieldId":75,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null},{"id":1672,"type":"FLOAT","name":"s\xC3\xBAly","templateFieldId":76,"floatValue":17.5,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":794,"millisecsFrom1970":1426071600000,"name":"Csuklya","templateId":46,"fields":[{"id":1673,"type":"INT","name":"ism\xC3\xA9tl\xC3\xA9s","templateFieldId":74,"floatValue":null,"intValue":8,"boolValue":null,"stringValue":null},{"id":1674,"type":"INT","name":"sorozat","templateFieldId":75,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null},{"id":1675,"type":"FLOAT","name":"s\xC3\xBAly","templateFieldId":76,"floatValue":17.5,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":795,"millisecsFrom1970":1426071600000,"name":"Bicepsz","templateId":35,"fields":[{"id":1676,"type":"INT","name":"ism\xC3\xA9tl\xC3\xA9s","templateFieldId":48,"floatValue":null,"intValue":6,"boolValue":null,"stringValue":null},{"id":1677,"type":"INT","name":"t\xC3\xA1rcsa","templateFieldId":49,"floatValue":null,"intValue":6,"boolValue":null,"stringValue":null},{"id":1678,"type":"INT","name":"sorozat","templateFieldId":50,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null}]},{"id":796,"millisecsFrom1970":1426071600000,"name":"Tricepsz r\xC3\xBAddal","templateId":44,"fields":[{"id":1679,"type":"INT","name":"ism\xC3\xA9tl\xC3\xA9s","templateFieldId":68,"floatValue":null,"intValue":8,"boolValue":null,"stringValue":null},{"id":1680,"type":"FLOAT","name":"t\xC3\xA1rcsa","templateFieldId":69,"floatValue":0.0,"intValue":null,"boolValue":null,"stringValue":null},{"id":1681,"type":"INT","name":"sorozat","templateFieldId":70,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null}]},{"id":797,"millisecsFrom1970":1426071600000,"name":"T\xC3\xA1rogat\xC3\xA1s","templateId":10,"fields":[{"id":1682,"type":"INT","name":"ism\xC3\xA9tl\xC3\xA9s","templateFieldId":4,"floatValue":null,"intValue":8,"boolValue":null,"stringValue":null},{"id":1683,"type":"INT","name":"t\xC3\xA1rcsa","templateFieldId":2,"floatValue":null,"intValue":8,"boolValue":null,"stringValue":null},{"id":1684,"type":"INT","name":"sorozat","templateFieldId":3,"floatValue":null,"intValue":1,"boolValue":null,"stringValue":null}]},{"id":798,"millisecsFrom1970":1426158000000,"name":"T\xC3\xB6meg","templateId":9,"fields":[{"id":1685,"type":"FLOAT","name":"t\xC3\xB6meg (kg)","templateFieldId":1,"floatValue":76.6,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":799,"millisecsFrom1970":1426138020000,"name":"\xC3\u2030tel","templateId":18,"fields":[{"id":1686,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"zab(100g) aszalv\xC3\xA1nyok,feh\xC3\xA9rje(20g),ek m\xC3\xA9z, magok"},{"id":1687,"type":"INT","name":"mennyit? (g)","templateFieldId":24,"floatValue":null,"intValue":0,"boolValue":null,"stringValue":null}]},{"id":800,"millisecsFrom1970":1426140000000,"name":"Sz\xC3\xA9klet","templateId":17,"fields":[{"id":1688,"type":"SELECT","name":"milyen?","templateFieldId":15,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":""}]},{"id":801,"millisecsFrom1970":1426151700000,"name":"\xC3\u2030tel","templateId":18,"fields":[{"id":1689,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"\xC3\xA9desburgonya(200g), m\xC3\xA1j(50g), 1 retek,paprika,h\xC3\xBCvelykujjnyi ubi,hagyma,paradicsom, 1ek olajak"},{"id":1690,"type":"INT","name":"mennyit? (g)","templateFieldId":24,"floatValue":null,"intValue":0,"boolValue":null,"stringValue":null}]},{"id":802,"millisecsFrom1970":1426158000000,"name":"T\xC3\xB6meg","templateId":9,"fields":[{"id":1691,"type":"FLOAT","name":"t\xC3\xB6meg (kg)","templateFieldId":1,"floatValue":0.0,"intValue":null,"boolValue":null,"stringValue":null}]},{"id":803,"millisecsFrom1970":1426166100000,"name":"\xC3\u2030tel","templateId":18,"fields":[{"id":1692,"type":"STRING","name":"mit?","templateFieldId":16,"floatValue":null,"intValue":null,"boolValue":null,"stringValue":"\xC3\xA9desburgonya(200g), m\xC3\xA1j(50g), 1 retek,paprika,h\xC3\xBCvelykujjnyi ubi,hagyma,paradicsom, 1ek olajak"},{"id":1693,"type":"INT","name":"mennyit? (g)","templateFieldId":24,"floatValue":null,"intValue":0,"boolValue":null,"stringValue":null}]}],"templates":[{"id":11,"name":"L\xC3\xA1btol\xC3\xA1s","useDateTime":false,"fields":[{"id":7,"type":"INT","name":"ism\xC3\xA9tl\xC3\xA9s","hint":null},{"id":6,"type":"INT","name":"sorozat","hint":null},{"id":5,"type":"INT","name":"s\xC3\xBAly","hint":null}]},{"id":23,"name":"Szelek","useDateTime":false,"fields":[{"id":21,"type":"SELECT","name":"t\xC3\xADpus","hint":"zavar\xC3\xB3,enyhe"}]},{"id":12,"name":"Mellb\xC5\u2018l nyom\xC3\xA1s","useDateTime":false,"fields":[{"id":8,"type":"INT","name":"ism\xC3\xA9tl\xC3\xA9s","hint":null},{"id":9,"type":"INT","name":"t\xC3\xA1rcsa","hint":""},{"id":10,"type":"INT","name":"sorozat","hint":null}]},{"id":19,"name":"Omega3","useDateTime":false,"fields":[{"id":17,"type":"INT","name":"mennyit? (ml)","hint":null}]},{"id":24,"name":"Feh\xC3\xA9rje por","useDateTime":false,"fields":[{"id":22,"type":"INT","name":"mennyi? (g)","hint":null}]},{"id":25,"name":"Kreatin","useDateTime":false,"fields":[{"id":23,"type":"INT","name":"mennyi? (g)","hint":null}]},{"id":43,"name":"45\xC2\xB0 mell","useDateTime":false,"fields":[{"id":65,"type":"INT","name":"ism\xC3\xA9tl\xC3\xA9s","hint":null},{"id":66,"type":"FLOAT","name":"t\xC3\xA1rcsa","hint":""},{"id":67,"type":"INT","name":"sorozat","hint":null}]},{"id":44,"name":"Tricepsz r\xC3\xBAddal","useDateTime":false,"fields":[{"id":68,"type":"INT","name":"ism\xC3\xA9tl\xC3\xA9s","hint":null},{"id":69,"type":"FLOAT","name":"t\xC3\xA1rcsa","hint":""},{"id":70,"type":"INT","name":"sorozat","hint":null}]},{"id":28,"name":"V\xC3\xA1llb\xC3\xB3l nyom\xC3\xA1s","useDateTime":false,"fields":[{"id":27,"type":"INT","name":"ism\xC3\xA9tl\xC3\xA9s","hint":null},{"id":28,"type":"FLOAT","name":"sorozat","hint":null},{"id":29,"type":"INT","name":"s\xC3\xBAly","hint":null}]},{"id":45,"name":"Guggol\xC3\xA1s","useDateTime":false,"fields":[{"id":71,"type":"INT","name":"ism\xC3\xA9tl\xC3\xA9s","hint":null},{"id":72,"type":"INT","name":"sorozat","hint":null},{"id":73,"type":"FLOAT","name":"s\xC3\xBAly","hint":"egyik oldal"}]},{"id":46,"name":"Csuklya","useDateTime":false,"fields":[{"id":74,"type":"INT","name":"ism\xC3\xA9tl\xC3\xA9s","hint":null},{"id":75,"type":"INT","name":"sorozat","hint":null},{"id":76,"type":"FLOAT","name":"s\xC3\xBAly","hint":""}]},{"id":9,"name":"T\xC3\xB6meg","useDateTime":false,"fields":[{"id":1,"type":"FLOAT","name":"t\xC3\xB6meg (kg)","hint":null}]},{"id":10,"name":"T\xC3\xA1rogat\xC3\xA1s","useDateTime":false,"fields":[{"id":4,"type":"INT","name":"ism\xC3\xA9tl\xC3\xA9s","hint":null},{"id":2,"type":"INT","name":"t\xC3\xA1rcsa","hint":null},{"id":3,"type":"INT","name":"sorozat","hint":null}]},{"id":17,"name":"Sz\xC3\xA9klet","useDateTime":true,"fields":[{"id":15,"type":"SELECT","name":"milyen?","hint":"ok,nehezen,habos,fekete,hatalmas,h\xC3\xADg"}]},{"id":21,"name":"Alkohol","useDateTime":false,"fields":[{"id":20,"type":"INT","name":"mennyit?","hint":"(feles=s\xC3\xB6r=bor)"},{"id":86,"type":"SELECT","name":"m\xC3\xA1snaposs\xC3\xA1g?","hint":"igen,nem"}]},{"id":50,"name":"M\xC3\xA9recked\xC3\xA9s","useDateTime":false,"fields":[{"id":87,"type":"FLOAT","name":"mell","hint":null},{"id":88,"type":"FLOAT","name":"bal kar","hint":null},{"id":89,"type":"FLOAT","name":"jobb kar","hint":null},{"id":90,"type":"FLOAT","name":"k\xC3\xB6ld\xC3\xB6k felett","hint":null},{"id":91,"type":"FLOAT","name":"k\xC3\xB6ld\xC3\xB6k","hint":null},{"id":92,"type":"FLOAT","name":"k\xC3\xB6ld\xC3\xB6k alatt","hint":null},{"id":93,"type":"FLOAT","name":"bal comb","hint":null},{"id":94,"type":"FLOAT","name":"jobb comb","hint":null}]},{"id":26,"name":"Hasprobl\xC3\xA9ma","useDateTime":false,"fields":[{"id":25,"type":"SELECT","name":"\xC3\xA9rz\xC3\xA9s","hint":"durrog,f\xC3\xA1j,nagyon f\xC3\xA1j,kellemetlen"}]},{"id":29,"name":"L\xC3\xA1bhajl\xC3\xADt\xC3\xA1s","useDateTime":false,"fields":[{"id":30,"type":"INT","name":"ism\xC3\xA9tl\xC3\xA9s","hint":null},{"id":31,"type":"INT","name":"sorozat","hint":null},{"id":32,"type":"INT","name":"s\xC3\xBAly","hint":null}]},{"id":30,"name":"V\xC3\xA1dli","useDateTime":false,"fields":[{"id":33,"type":"INT","name":"ism\xC3\xA9tl\xC3\xA9s","hint":null},{"id":34,"type":"INT","name":"sorozat","hint":null},{"id":35,"type":"INT","name":"s\xC3\xBAly","hint":null}]},{"id":32,"name":"L\xC3\xA1bny\xC3\xBAjt\xC3\xA1s","useDateTime":false,"fields":[{"id":39,"type":"INT","name":"ism\xC3\xA9tl\xC3\xA9s","hint":null},{"id":40,"type":"INT","name":"sorozat","hint":null},{"id":41,"type":"INT","name":"s\xC3\xBAly","hint":null}]},{"id":33,"name":"Der\xC3\xA9kg\xC3\xA9p","useDateTime":false,"fields":[{"id":42,"type":"INT","name":"ism\xC3\xA9tl\xC3\xA9s","hint":null},{"id":43,"type":"INT","name":"sorozat","hint":null},{"id":44,"type":"INT","name":"s\xC3\xBAly","hint":null}]},{"id":34,"name":"Evez\xC3\xA9s","useDateTime":false,"fields":[{"id":45,"type":"INT","name":"ism\xC3\xA9tl\xC3\xA9s","hint":null},{"id":46,"type":"INT","name":"t\xC3\xA1rcsa","hint":null},{"id":47,"type":"INT","name":"sorozat","hint":null}]},{"id":35,"name":"Bicepsz","useDateTime":false,"fields":[{"id":48,"type":"INT","name":"ism\xC3\xA9tl\xC3\xA9s","hint":null},{"id":49,"type":"INT","name":"t\xC3\xA1rcsa","hint":null},{"id":50,"type":"INT","name":"sorozat","hint":null}]},{"id":36,"name":"Mellhez h\xC3\xBAz\xC3\xA1s","useDateTime":false,"fields":[{"id":51,"type":"INT","name":"ism\xC3\xA9tl\xC3\xA9s","hint":null},{"id":52,"type":"INT","name":"sorozat","hint":null},{"id":53,"type":"INT","name":"s\xC3\xBAly","hint":null}]},{"id":37,"name":"Karny\xC3\xBAjt\xC3\xA1s csig\xC3\xA1n","useDateTime":false,"fields":[{"id":54,"type":"INT","name":"ism\xC3\xA9tl\xC3\xA9s","hint":null},{"id":55,"type":"INT","name":"sorozat","hint":null},{"id":56,"type":"INT","name":"s\xC3\xBAly","hint":null}]},{"id":20,"name":"Szex","useDateTime":false,"fields":[{"id":18,"type":"SELECT","name":"hossz","hint":"r\xC3\xB6vid,\xC3\xA1tlag,epic"},{"id":19,"type":"SELECT","name":"kem\xC3\xA9nys\xC3\xA9g","hint":"\xC3\xA1tlag,epic,gyenge"}]},{"id":41,"name":"Oldalemel\xC3\xA9s","useDateTime":false,"fields":[{"id":62,"type":"INT","name":"ism\xC3\xA9tl\xC3\xA9s","hint":null},{"id":63,"type":"INT","name":"s\xC3\xBAly","hint":null},{"id":64,"type":"INT","name":"sorozat","hint":null}]},{"id":18,"name":"\xC3\u2030tel","useDateTime":true,"fields":[{"id":16,"type":"STRING","name":"mit?","hint":null},{"id":24,"type":"INT","name":"mennyit? (g)","hint":null}]},{"id":51,"name":"Evez\xC3\xA9s T-r\xC3\xBAddal","useDateTime":false,"fields":[{"id":95,"type":"INT","name":"ism\xC3\xA9tl\xC3\xA9s","hint":null},{"id":96,"type":"INT","name":"s\xC3\xBAly","hint":null},{"id":97,"type":"INT","name":"sorozat","hint":null}]}],"reports":[{"id":2,"name":"L\xC3\xA1b","entries":[{"id":1,"templateId":11},{"id":2,"templateId":29},{"id":3,"templateId":30},{"id":4,"templateId":32}]},{"id":3,"name":"Mell","entries":[{"id":5,"templateId":12},{"id":6,"templateId":43},{"id":7,"templateId":44},{"id":8,"templateId":10},{"id":9,"templateId":28},{"id":10,"templateId":37},{"id":11,"templateId":41}]},{"id":4,"name":"H\xC3\xA1t","entries":[{"id":12,"templateId":46},{"id":13,"templateId":36},{"id":14,"templateId":35},{"id":15,"templateId":34}]}]}');
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
          this.username = '';
          this.globalLocal = new _.hu.nevermind.timeline.HuLocal();
          this.Actions = Kotlin.createObject(null, function () {
            this.dataFromServer = new _.hu.nevermind.flux.ActionDef();
            this.eventEdited = new _.hu.nevermind.flux.ActionDef();
            this.eventCreated = new _.hu.nevermind.flux.ActionDef();
            this.filteringTemplateIdsChanged = new _.hu.nevermind.flux.ActionDef();
            this.eventEditorModalStateChanged = new _.hu.nevermind.flux.ActionDef();
          });
        }, /** @lends _.hu.nevermind.timeline */ {
          AjaxResult: Kotlin.createClass(null, function (status, data) {
            this.status = status;
            this.data = data;
          }, /** @lends _.hu.nevermind.timeline.AjaxResult.prototype */ {
            component1: function () {
              return this.status;
            },
            component2: function () {
              return this.data;
            },
            copy_eltq40$: function (status, data) {
              return new _.hu.nevermind.timeline.AjaxResult(status === void 0 ? this.status : status, data === void 0 ? this.data : data);
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
          CommandSender: Kotlin.createTrait(null),
          AjaxCommandSender: Kotlin.createClass(function () {
            return [_.hu.nevermind.timeline.CommandSender];
          }, null, /** @lends _.hu.nevermind.timeline.AjaxCommandSender.prototype */ {
            sendCommand_c2tynk$: function (command, msg, resultHandler) {
              var objectToSend = _.hu.nevermind.timeline.AjaxCommandSender.sendCommand_c2tynk$f(command, msg);
              var dataToSend = JSON.stringify(objectToSend, null, 4);
              var result = window.confirm(dataToSend);
              if (result == false) {
                return;
              }
              _.net.yested.ajaxPost_f0flkx$(new _.net.yested.AjaxRequest('/ajax/ajax/', void 0, dataToSend, void 0, void 0, _.hu.nevermind.timeline.AjaxCommandSender.sendCommand_c2tynk$f_0(resultHandler)));
            }
          }, /** @lends _.hu.nevermind.timeline.AjaxCommandSender */ {
            sendCommand_c2tynk$f: function (command, msg) {
              return Kotlin.createObject(null, function () {
                this.command = command;
                this.entity = msg.toServerSideObj();
                this.user = _.hu.nevermind.timeline.username;
              });
            },
            sendCommand_c2tynk$f_0: function (resultHandler) {
              return function (result) {
                if (result.status) {
                  resultHandler(result.data);
                }
                 else {
                  throw new Kotlin.Exception('Ajax Error');
                }
              };
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
          EventFieldChangePayload: Kotlin.createClass(null, function (id, newValue) {
            this.id = id;
            this.newValue = newValue;
          }, /** @lends _.hu.nevermind.timeline.EventFieldChangePayload.prototype */ {
            component1: function () {
              return this.id;
            },
            component2: function () {
              return this.newValue;
            },
            copy_cczngu$: function (id, newValue) {
              return new _.hu.nevermind.timeline.EventFieldChangePayload(id === void 0 ? this.id : id, newValue === void 0 ? this.newValue : newValue);
            },
            toString: function () {
              return 'EventFieldChangePayload(id=' + Kotlin.toString(this.id) + (', newValue=' + Kotlin.toString(this.newValue)) + ')';
            },
            hashCode: function () {
              var result = 0;
              result = result * 31 + Kotlin.hashCode(this.id) | 0;
              result = result * 31 + Kotlin.hashCode(this.newValue) | 0;
              return result;
            },
            equals_za3rmp$: function (other) {
              return this === other || (other !== null && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.id, other.id) && Kotlin.equals(this.newValue, other.newValue))));
            }
          }),
          EventChangePayload: Kotlin.createClass(null, function (id, newDate, fieldChanges) {
            this.id = id;
            this.newDate = newDate;
            this.fieldChanges = fieldChanges;
          }, /** @lends _.hu.nevermind.timeline.EventChangePayload.prototype */ {
            component1: function () {
              return this.id;
            },
            component2: function () {
              return this.newDate;
            },
            component3: function () {
              return this.fieldChanges;
            },
            copy_j6h6qb$: function (id, newDate, fieldChanges) {
              return new _.hu.nevermind.timeline.EventChangePayload(id === void 0 ? this.id : id, newDate === void 0 ? this.newDate : newDate, fieldChanges === void 0 ? this.fieldChanges : fieldChanges);
            },
            toString: function () {
              return 'EventChangePayload(id=' + Kotlin.toString(this.id) + (', newDate=' + Kotlin.toString(this.newDate)) + (', fieldChanges=' + Kotlin.toString(this.fieldChanges)) + ')';
            },
            hashCode: function () {
              var result = 0;
              result = result * 31 + Kotlin.hashCode(this.id) | 0;
              result = result * 31 + Kotlin.hashCode(this.newDate) | 0;
              result = result * 31 + Kotlin.hashCode(this.fieldChanges) | 0;
              return result;
            },
            equals_za3rmp$: function (other) {
              return this === other || (other !== null && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.id, other.id) && Kotlin.equals(this.newDate, other.newDate) && Kotlin.equals(this.fieldChanges, other.fieldChanges))));
            }
          }),
          EventFieldCreationPayload: Kotlin.createClass(null, function (templateFieldId, value) {
            this.templateFieldId = templateFieldId;
            this.value = value;
          }, /** @lends _.hu.nevermind.timeline.EventFieldCreationPayload.prototype */ {
            component1: function () {
              return this.templateFieldId;
            },
            component2: function () {
              return this.value;
            },
            copy_5z5ttg$: function (templateFieldId, value) {
              return new _.hu.nevermind.timeline.EventFieldCreationPayload(templateFieldId === void 0 ? this.templateFieldId : templateFieldId, value === void 0 ? this.value : value);
            },
            toString: function () {
              return 'EventFieldCreationPayload(templateFieldId=' + Kotlin.toString(this.templateFieldId) + (', value=' + Kotlin.toString(this.value)) + ')';
            },
            hashCode: function () {
              var result = 0;
              result = result * 31 + Kotlin.hashCode(this.templateFieldId) | 0;
              result = result * 31 + Kotlin.hashCode(this.value) | 0;
              return result;
            },
            equals_za3rmp$: function (other) {
              return this === other || (other !== null && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.templateFieldId, other.templateFieldId) && Kotlin.equals(this.value, other.value))));
            }
          }),
          EventFieldCreated: Kotlin.createClass(null, function (date) {
            this.date = date;
          }, /** @lends _.hu.nevermind.timeline.EventFieldCreated.prototype */ {
            component1: function () {
              return this.date;
            },
            copy_x80w7i$: function (date) {
              return new _.hu.nevermind.timeline.EventFieldCreated(date === void 0 ? this.date : date);
            },
            toString: function () {
              return 'EventFieldCreated(date=' + Kotlin.toString(this.date) + ')';
            },
            hashCode: function () {
              var result = 0;
              result = result * 31 + Kotlin.hashCode(this.date) | 0;
              return result;
            },
            equals_za3rmp$: function (other) {
              return this === other || (other !== null && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && Kotlin.equals(this.date, other.date)));
            }
          }),
          EventCreationPayload: Kotlin.createClass(null, function (templateId, date, comment, fieldCreations) {
            this.templateId = templateId;
            this.date = date;
            this.comment = comment;
            this.fieldCreations = fieldCreations;
          }, /** @lends _.hu.nevermind.timeline.EventCreationPayload.prototype */ {
            component1: function () {
              return this.templateId;
            },
            component2: function () {
              return this.date;
            },
            component3: function () {
              return this.comment;
            },
            component4: function () {
              return this.fieldCreations;
            },
            copy_btr2ad$: function (templateId, date, comment, fieldCreations) {
              return new _.hu.nevermind.timeline.EventCreationPayload(templateId === void 0 ? this.templateId : templateId, date === void 0 ? this.date : date, comment === void 0 ? this.comment : comment, fieldCreations === void 0 ? this.fieldCreations : fieldCreations);
            },
            toString: function () {
              return 'EventCreationPayload(templateId=' + Kotlin.toString(this.templateId) + (', date=' + Kotlin.toString(this.date)) + (', comment=' + Kotlin.toString(this.comment)) + (', fieldCreations=' + Kotlin.toString(this.fieldCreations)) + ')';
            },
            hashCode: function () {
              var result = 0;
              result = result * 31 + Kotlin.hashCode(this.templateId) | 0;
              result = result * 31 + Kotlin.hashCode(this.date) | 0;
              result = result * 31 + Kotlin.hashCode(this.comment) | 0;
              result = result * 31 + Kotlin.hashCode(this.fieldCreations) | 0;
              return result;
            },
            equals_za3rmp$: function (other) {
              return this === other || (other !== null && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.templateId, other.templateId) && Kotlin.equals(this.date, other.date) && Kotlin.equals(this.comment, other.comment) && Kotlin.equals(this.fieldCreations, other.fieldCreations))));
            }
          }),
          FilteringTemplateIdsChangedPayload: Kotlin.createClass(null, function (filteringTemplateIds) {
            this.filteringTemplateIds = filteringTemplateIds;
          }, /** @lends _.hu.nevermind.timeline.FilteringTemplateIdsChangedPayload.prototype */ {
            component1: function () {
              return this.filteringTemplateIds;
            },
            copy_3dy865$: function (filteringTemplateIds) {
              return new _.hu.nevermind.timeline.FilteringTemplateIdsChangedPayload(filteringTemplateIds === void 0 ? this.filteringTemplateIds : filteringTemplateIds);
            },
            toString: function () {
              return 'FilteringTemplateIdsChangedPayload(filteringTemplateIds=' + Kotlin.toString(this.filteringTemplateIds) + ')';
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
          EventEditorModalState: Kotlin.createClass(null, function (eventTemplate, eventFormSchema, event, onSave) {
            this.eventTemplate = eventTemplate;
            this.eventFormSchema = eventFormSchema;
            this.event = event;
            this.onSave = onSave;
          }, /** @lends _.hu.nevermind.timeline.EventEditorModalState.prototype */ {
            component1: function () {
              return this.eventTemplate;
            },
            component2: function () {
              return this.eventFormSchema;
            },
            component3: function () {
              return this.event;
            },
            component4: function () {
              return this.onSave;
            },
            copy_g1cxwg$: function (eventTemplate, eventFormSchema, event, onSave) {
              return new _.hu.nevermind.timeline.EventEditorModalState(eventTemplate === void 0 ? this.eventTemplate : eventTemplate, eventFormSchema === void 0 ? this.eventFormSchema : eventFormSchema, event === void 0 ? this.event : event, onSave === void 0 ? this.onSave : onSave);
            },
            toString: function () {
              return 'EventEditorModalState(eventTemplate=' + Kotlin.toString(this.eventTemplate) + (', eventFormSchema=' + Kotlin.toString(this.eventFormSchema)) + (', event=' + Kotlin.toString(this.event)) + (', onSave=' + Kotlin.toString(this.onSave)) + ')';
            },
            hashCode: function () {
              var result = 0;
              result = result * 31 + Kotlin.hashCode(this.eventTemplate) | 0;
              result = result * 31 + Kotlin.hashCode(this.eventFormSchema) | 0;
              result = result * 31 + Kotlin.hashCode(this.event) | 0;
              result = result * 31 + Kotlin.hashCode(this.onSave) | 0;
              return result;
            },
            equals_za3rmp$: function (other) {
              return this === other || (other !== null && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.eventTemplate, other.eventTemplate) && Kotlin.equals(this.eventFormSchema, other.eventFormSchema) && Kotlin.equals(this.event, other.event) && Kotlin.equals(this.onSave, other.onSave))));
            }
          }),
          entities: Kotlin.definePackage(null, /** @lends _.hu.nevermind.timeline.entities */ {
            EventFieldType: Kotlin.createEnumClass(function () {
              return [Kotlin.Enum];
            }, function $fun(localizationKey, readValue) {
              $fun.baseInitializer.call(this);
              this.localizationKey = localizationKey;
              this.readValue = readValue;
            }, function () {
              return {
                INT: new _.hu.nevermind.timeline.entities.EventFieldType(_.hu.nevermind.timeline.Local.object.eventFieldInt, _.hu.nevermind.timeline.entities.EventFieldType.INT$f),
                FLOAT: new _.hu.nevermind.timeline.entities.EventFieldType(_.hu.nevermind.timeline.Local.object.eventFieldFloat, _.hu.nevermind.timeline.entities.EventFieldType.FLOAT$f),
                STRING: new _.hu.nevermind.timeline.entities.EventFieldType(_.hu.nevermind.timeline.Local.object.eventFieldString, _.hu.nevermind.timeline.entities.EventFieldType.STRING$f),
                TEXTAREA: new _.hu.nevermind.timeline.entities.EventFieldType(_.hu.nevermind.timeline.Local.object.eventFieldTextArea, _.hu.nevermind.timeline.entities.EventFieldType.TEXTAREA$f),
                SELECT: new _.hu.nevermind.timeline.entities.EventFieldType(_.hu.nevermind.timeline.Local.object.eventFieldSelect, _.hu.nevermind.timeline.entities.EventFieldType.SELECT$f)
              };
            }, null, /** @lends _.hu.nevermind.timeline.entities.EventFieldType */ {
              INT$f: function (it) {
                return Kotlin.safeParseInt(it);
              },
              FLOAT$f: function (it) {
                var tmp$0;
                return (tmp$0 = Kotlin.safeParseDouble(it)) != null ? tmp$0 : null;
              },
              STRING$f: function (it) {
                return it;
              },
              TEXTAREA$f: function (it) {
                return it;
              },
              SELECT$f: function (it) {
                return it;
              }
            }),
            EventTemplate: Kotlin.createClass(null, function (id, name, useDateTime, fieldIds) {
              this.id = id;
              this.name = name;
              this.useDateTime = useDateTime;
              this.fieldIds = fieldIds;
            }, /** @lends _.hu.nevermind.timeline.entities.EventTemplate.prototype */ {
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
              return [_.hu.nevermind.timeline.Sendable];
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
            EventInstance: Kotlin.createClass(null, function (id, fieldIds, date, comment, templateId, tags) {
              this.id = id;
              this.fieldIds = fieldIds;
              this.date = date;
              this.comment = comment;
              this.templateId = templateId;
              this.tags = tags;
            }, /** @lends _.hu.nevermind.timeline.entities.EventInstance.prototype */ {
              component1: function () {
                return this.id;
              },
              component2: function () {
                return this.fieldIds;
              },
              component3: function () {
                return this.date;
              },
              component4: function () {
                return this.comment;
              },
              component5: function () {
                return this.templateId;
              },
              component6: function () {
                return this.tags;
              },
              copy_qjs4h0$: function (id, fieldIds, date, comment, templateId, tags) {
                return new _.hu.nevermind.timeline.entities.EventInstance(id === void 0 ? this.id : id, fieldIds === void 0 ? this.fieldIds : fieldIds, date === void 0 ? this.date : date, comment === void 0 ? this.comment : comment, templateId === void 0 ? this.templateId : templateId, tags === void 0 ? this.tags : tags);
              },
              toString: function () {
                return 'EventInstance(id=' + Kotlin.toString(this.id) + (', fieldIds=' + Kotlin.toString(this.fieldIds)) + (', date=' + Kotlin.toString(this.date)) + (', comment=' + Kotlin.toString(this.comment)) + (', templateId=' + Kotlin.toString(this.templateId)) + (', tags=' + Kotlin.toString(this.tags)) + ')';
              },
              hashCode: function () {
                var result = 0;
                result = result * 31 + Kotlin.hashCode(this.id) | 0;
                result = result * 31 + Kotlin.hashCode(this.fieldIds) | 0;
                result = result * 31 + Kotlin.hashCode(this.date) | 0;
                result = result * 31 + Kotlin.hashCode(this.comment) | 0;
                result = result * 31 + Kotlin.hashCode(this.templateId) | 0;
                result = result * 31 + Kotlin.hashCode(this.tags) | 0;
                return result;
              },
              equals_za3rmp$: function (other) {
                return this === other || (other !== null && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.id, other.id) && Kotlin.equals(this.fieldIds, other.fieldIds) && Kotlin.equals(this.date, other.date) && Kotlin.equals(this.comment, other.comment) && Kotlin.equals(this.templateId, other.templateId) && Kotlin.equals(this.tags, other.tags))));
              }
            }, /** @lends _.hu.nevermind.timeline.entities.EventInstance */ {
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
                    return new _.hu.nevermind.timeline.entities.EventInstance(new _.hu.nevermind.timeline.entities.Id(event.id), fieldIds, date, event.comment, templateId, null);
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
            EventField: Kotlin.createClass(null, function (id, fieldValue, templateFieldId) {
              this.id = id;
              this.fieldValue = fieldValue;
              this.templateFieldId = templateFieldId;
            }, /** @lends _.hu.nevermind.timeline.entities.EventField.prototype */ {
              toServerSideObj: function () {
                return _.hu.nevermind.timeline.entities.EventField.toServerSideObj$f(this);
              },
              component1: function () {
                return this.id;
              },
              component2: function () {
                return this.fieldValue;
              },
              component3: function () {
                return this.templateFieldId;
              },
              copy_by3iqz$: function (id, fieldValue, templateFieldId) {
                return new _.hu.nevermind.timeline.entities.EventField(id === void 0 ? this.id : id, fieldValue === void 0 ? this.fieldValue : fieldValue, templateFieldId === void 0 ? this.templateFieldId : templateFieldId);
              },
              toString: function () {
                return 'EventField(id=' + Kotlin.toString(this.id) + (', fieldValue=' + Kotlin.toString(this.fieldValue)) + (', templateFieldId=' + Kotlin.toString(this.templateFieldId)) + ')';
              },
              hashCode: function () {
                var result = 0;
                result = result * 31 + Kotlin.hashCode(this.id) | 0;
                result = result * 31 + Kotlin.hashCode(this.fieldValue) | 0;
                result = result * 31 + Kotlin.hashCode(this.templateFieldId) | 0;
                return result;
              },
              equals_za3rmp$: function (other) {
                return this === other || (other !== null && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.id, other.id) && Kotlin.equals(this.fieldValue, other.fieldValue) && Kotlin.equals(this.templateFieldId, other.templateFieldId))));
              }
            }, /** @lends _.hu.nevermind.timeline.entities.EventField */ {
              toServerSideObj$f: function (this$EventField) {
                return Kotlin.createObject(null, function () {
                  this.id = this$EventField.id.id;
                  this.value = this$EventField.fieldValue;
                  this.templateFieldId = this$EventField.templateFieldId.id;
                });
              },
              object_initializer$: function () {
                return Kotlin.createObject(null, null, {
                  fromJson_6gt5xa$: function (field) {
                    var tmp$0, tmp$1;
                    tmp$0 = _.hu.nevermind.timeline.entities.EventFieldType.valueOf_61zpoe$(field.type);
                    if (tmp$0 === _.hu.nevermind.timeline.entities.EventFieldType.object.INT)
                      tmp$1 = new _.hu.nevermind.timeline.entities.EventField(new _.hu.nevermind.timeline.entities.Id(field.id), field.intValue, new _.hu.nevermind.timeline.entities.Id(field.templateFieldId));
                    else if (tmp$0 === _.hu.nevermind.timeline.entities.EventFieldType.object.FLOAT)
                      tmp$1 = new _.hu.nevermind.timeline.entities.EventField(new _.hu.nevermind.timeline.entities.Id(field.id), field.floatValue, new _.hu.nevermind.timeline.entities.Id(field.templateFieldId));
                    else if (tmp$0 === _.hu.nevermind.timeline.entities.EventFieldType.object.STRING)
                      tmp$1 = new _.hu.nevermind.timeline.entities.EventField(new _.hu.nevermind.timeline.entities.Id(field.id), field.stringValue, new _.hu.nevermind.timeline.entities.Id(field.templateFieldId));
                    else if (tmp$0 === _.hu.nevermind.timeline.entities.EventFieldType.object.SELECT)
                      tmp$1 = new _.hu.nevermind.timeline.entities.EventField(new _.hu.nevermind.timeline.entities.Id(field.id), field.stringValue, new _.hu.nevermind.timeline.entities.Id(field.templateFieldId));
                    else if (tmp$0 === _.hu.nevermind.timeline.entities.EventFieldType.object.TEXTAREA)
                      tmp$1 = new _.hu.nevermind.timeline.entities.EventField(new _.hu.nevermind.timeline.entities.Id(field.id), field.stringValue, new _.hu.nevermind.timeline.entities.Id(field.templateFieldId));
                    return tmp$1;
                  },
                  createFieldFromTemplate_ilmkc7$: function (eventTemplateField) {
                    var tmp$0, tmp$1;
                    tmp$0 = eventTemplateField.type;
                    if (tmp$0 === _.hu.nevermind.timeline.entities.EventFieldType.object.INT)
                      tmp$1 = new _.hu.nevermind.timeline.entities.EventField(new _.hu.nevermind.timeline.entities.Id(0), 0, eventTemplateField.id);
                    else if (tmp$0 === _.hu.nevermind.timeline.entities.EventFieldType.object.FLOAT)
                      tmp$1 = new _.hu.nevermind.timeline.entities.EventField(new _.hu.nevermind.timeline.entities.Id(0), 0.0, eventTemplateField.id);
                    else if (tmp$0 === _.hu.nevermind.timeline.entities.EventFieldType.object.STRING)
                      tmp$1 = new _.hu.nevermind.timeline.entities.EventField(new _.hu.nevermind.timeline.entities.Id(0), '', eventTemplateField.id);
                    else if (tmp$0 === _.hu.nevermind.timeline.entities.EventFieldType.object.SELECT)
                      tmp$1 = new _.hu.nevermind.timeline.entities.EventField(new _.hu.nevermind.timeline.entities.Id(0), '', eventTemplateField.id);
                    else if (tmp$0 === _.hu.nevermind.timeline.entities.EventFieldType.object.TEXTAREA)
                      tmp$1 = new _.hu.nevermind.timeline.entities.EventField(new _.hu.nevermind.timeline.entities.Id(0), '', eventTemplateField.id);
                    return tmp$1;
                  }
                });
              }
            })
          }),
          store: Kotlin.definePackage(function () {
            this.AppStore = Kotlin.createObject(function () {
              return [_.hu.nevermind.flux.Store];
            }, function $fun() {
              $fun.baseInitializer.call(this);
              this.$filteringTemplateIds_9u7hq1$ = Kotlin.modules['stdlib'].kotlin.arrayListOf_9mqe4v$([]);
              this.register_x5ky9g$(_.hu.nevermind.timeline.Actions.filteringTemplateIdsChanged, _.hu.nevermind.timeline.store.AppStore$f(this));
            }, {
              filteringTemplateIds: {
                get: function () {
                  return this.$filteringTemplateIds_9u7hq1$;
                },
                set: function (filteringTemplateIds) {
                  this.$filteringTemplateIds_9u7hq1$ = filteringTemplateIds;
                }
              }
            });
            this.EventStore = Kotlin.createObject(function () {
              return [_.hu.nevermind.flux.Store];
            }, function $fun() {
              $fun.baseInitializer.call(this);
              this.events_gulth3$ = Kotlin.modules['stdlib'].kotlin.hashMapOf_eoa9s7$([]);
              this.fields_h4i2af$ = Kotlin.modules['stdlib'].kotlin.hashMapOf_eoa9s7$([]);
              this.register_x5ky9g$(_.hu.nevermind.timeline.Actions.dataFromServer, _.hu.nevermind.timeline.store.EventStore$f(this));
              this.register_x5ky9g$(_.hu.nevermind.timeline.Actions.eventEdited, _.hu.nevermind.timeline.store.EventStore$f_0(this));
              this.register_x5ky9g$(_.hu.nevermind.timeline.Actions.eventCreated, _.hu.nevermind.timeline.store.EventStore$f_1(this));
            }, {
              getField: function (id) {
                var tmp$0;
                tmp$0 = Kotlin.modules['stdlib'].kotlin.getOrElse_lphkgk$(this.fields_h4i2af$, id, _.hu.nevermind.timeline.store.getField$f(id));
                return tmp$0;
              },
              getFields: function () {
                return this.fields_h4i2af$;
              },
              getEvents: function () {
                return this.events_gulth3$;
              }
            });
            this.EventTemplateFieldStore = Kotlin.createObject(function () {
              return [_.hu.nevermind.flux.Store];
            }, function $fun() {
              $fun.baseInitializer.call(this);
              this.fields_cdwuej$ = Kotlin.modules['stdlib'].kotlin.hashMapOf_eoa9s7$([]);
              this.register_x5ky9g$(_.hu.nevermind.timeline.Actions.dataFromServer, _.hu.nevermind.timeline.store.EventTemplateFieldStore$f(this));
            }, {
              getFields: function () {
                return this.fields_cdwuej$;
              },
              get: function (id) {
                var tmp$0;
                tmp$0 = Kotlin.modules['stdlib'].kotlin.getOrElse_lphkgk$(this.fields_cdwuej$, id, _.hu.nevermind.timeline.store.get$f(id));
                return tmp$0;
              }
            });
            this.EventTemplateStore = Kotlin.createObject(function () {
              return [_.hu.nevermind.flux.Store];
            }, function $fun() {
              $fun.baseInitializer.call(this);
              this.register_x5ky9g$(_.hu.nevermind.timeline.Actions.dataFromServer, _.hu.nevermind.timeline.store.EventTemplateStore$f(this));
              this.templates_s30ren$ = Kotlin.modules['stdlib'].kotlin.hashMapOf_eoa9s7$([]);
            }, {
              get: function (templateId) {
                var tmp$0;
                tmp$0 = Kotlin.modules['stdlib'].kotlin.getOrElse_lphkgk$(this.templates_s30ren$, templateId, _.hu.nevermind.timeline.store.get$f_0(templateId));
                return tmp$0;
              },
              getTemplates: function () {
                return this.templates_s30ren$;
              }
            });
            this.ModalWindowStore = Kotlin.createObject(function () {
              return [_.hu.nevermind.flux.Store];
            }, function $fun() {
              $fun.baseInitializer.call(this);
              this.$eventEditorModalState_1vkekq$ = null;
              this.register_x5ky9g$(_.hu.nevermind.timeline.Actions.eventEditorModalStateChanged, _.hu.nevermind.timeline.store.ModalWindowStore$f(this));
            }, {
              eventEditorModalState: {
                get: function () {
                  return this.$eventEditorModalState_1vkekq$;
                },
                set: function (eventEditorModalState) {
                  this.$eventEditorModalState_1vkekq$ = eventEditorModalState;
                }
              }
            });
          }, /** @lends _.hu.nevermind.timeline.store */ {
            AppStore$f: function (this$AppStore) {
              return function (payload) {
                this$AppStore.filteringTemplateIds.clear();
                this$AppStore.filteringTemplateIds.addAll_4fm7v2$(payload.filteringTemplateIds);
                this$AppStore.emitChange();
              };
            },
            f: function (this$EventStore) {
              return function (it) {
                this$EventStore.fields_h4i2af$.put_wn2jw4$(it.id, it);
              };
            },
            f_0: function (it) {
              return !Kotlin.modules['stdlib'].kotlin.contains_ke19y6$([248, 249, 567], it.id.id);
            },
            f_1: function (this$EventStore) {
              return function (it) {
                this$EventStore.events_gulth3$.put_wn2jw4$(it.id, it);
              };
            },
            EventStore$f: function (this$EventStore) {
              return function (payload) {
                var tmp$0;
                this.waitFor([_.hu.nevermind.timeline.store.EventTemplateStore, _.hu.nevermind.timeline.store.EventTemplateFieldStore]);
                this$EventStore.fields_h4i2af$.clear();
                Kotlin.modules['stdlib'].kotlin.forEach_p7e0bo$(payload.eventFields, _.hu.nevermind.timeline.store.f(this$EventStore));
                this$EventStore.events_gulth3$.clear();
                tmp$0 = Kotlin.modules['stdlib'].kotlin.filter_azvtw4$(payload.events, _.hu.nevermind.timeline.store.f_0);
                Kotlin.modules['stdlib'].kotlin.forEach_p7e0bo$(tmp$0, _.hu.nevermind.timeline.store.f_1(this$EventStore));
                this$EventStore.emitChange();
              };
            },
            f_2: function (this$EventStore) {
              return function (fieldChange) {
                var tmp$0;
                var changedField = (tmp$0 = this$EventStore.fields_h4i2af$.get_za3rmp$(fieldChange.id)) != null ? tmp$0 : Kotlin.throwNPE();
                return changedField.copy_by3iqz$(void 0, fieldChange.newValue);
              };
            },
            f_3: function (it) {
              return Kotlin.createObject(null, function () {
                var tmp$0;
                this.id = it.id.id;
                this.newValue = (tmp$0 = it.newValue) != null ? tmp$0.toString() : null;
              });
            },
            f_4: function (it) {
              return _.hu.nevermind.timeline.store.f_3(it);
            },
            f_5: function (eventChange) {
              return Kotlin.createObject(null, function () {
                this.id = eventChange.id.id;
                this.millisecondsSinceUnixEpoch = eventChange.newDate.millisecondsSinceUnixEpoch;
              });
            },
            toServerSideObj$f: function (eventChange) {
              return Kotlin.createObject(null, function () {
                this.fieldChanges = Kotlin.modules['stdlib'].kotlin.map_m3yiqg$(eventChange.fieldChanges, _.hu.nevermind.timeline.store.f_4);
                this.eventChange = _.hu.nevermind.timeline.store.f_5(eventChange);
              });
            },
            f_6: function (eventChange) {
              return Kotlin.createObject(function () {
                return [_.hu.nevermind.timeline.Sendable];
              }, null, {
                toServerSideObj: function () {
                  return _.hu.nevermind.timeline.store.toServerSideObj$f(eventChange);
                }
              });
            },
            f_7: function (changedEvent, eventChange, this$EventStore) {
              return function (result) {
                var newEvent = changedEvent.copy_qjs4h0$(void 0, void 0, eventChange.newDate);
                this$EventStore.events_gulth3$.put_wn2jw4$(newEvent.id, newEvent);
                this$EventStore.emitChange();
              };
            },
            EventStore$f_0: function (this$EventStore) {
              return function (eventChange) {
                var tmp$0, tmp$1;
                tmp$0 = Kotlin.modules['stdlib'].kotlin.map_m3yiqg$(eventChange.fieldChanges, _.hu.nevermind.timeline.store.f_2(this$EventStore));
                var newFields = tmp$0;
                var changedEvent = (tmp$1 = this$EventStore.events_gulth3$.get_za3rmp$(eventChange.id)) != null ? tmp$1 : Kotlin.throwNPE();
                var sendingPayload = _.hu.nevermind.timeline.store.f_6(eventChange);
                this$EventStore.sendCommand_c2tynk$('updateEvent', sendingPayload, _.hu.nevermind.timeline.store.f_7(changedEvent, eventChange, this$EventStore));
              };
            },
            f_8: function (it) {
              return Kotlin.createObject(null, function () {
                var tmp$0;
                this.value = (tmp$0 = it.value) != null ? tmp$0.toString() : null;
                this.templateFieldId = it.templateFieldId.id;
              });
            },
            f_9: function (it) {
              return _.hu.nevermind.timeline.store.f_8(it);
            },
            f_10: function (payload) {
              return Kotlin.createObject(null, function () {
                this.templateId = payload.templateId.id;
                this.millisecondsSinceUnixEpoch = payload.date.millisecondsSinceUnixEpoch;
                this.comment = payload.comment;
              });
            },
            toServerSideObj$f_0: function (payload) {
              return Kotlin.createObject(null, function () {
                this.fields = Kotlin.modules['stdlib'].kotlin.map_m3yiqg$(payload.fieldCreations, _.hu.nevermind.timeline.store.f_9);
                this.event = _.hu.nevermind.timeline.store.f_10(payload);
              });
            },
            f_11: function (payload) {
              return Kotlin.createObject(function () {
                return [_.hu.nevermind.timeline.Sendable];
              }, null, {
                toServerSideObj: function () {
                  return _.hu.nevermind.timeline.store.toServerSideObj$f_0(payload);
                }
              });
            },
            f_12: function (field) {
              return _.hu.nevermind.timeline.entities.EventField.object.fromJson_6gt5xa$(field);
            },
            f_13: function (this$EventStore) {
              return function (responsePayload) {
                var tmp$0;
                var insertedEvent = _.hu.nevermind.timeline.entities.EventInstance.object.fromJson_za3rmp$(responsePayload);
                this$EventStore.events_gulth3$.put_wn2jw4$(insertedEvent.id, insertedEvent);
                Kotlin.modules['stdlib'].kotlin.map_rie7ol$((tmp$0 = responsePayload.fields) != null ? tmp$0 : Kotlin.throwNPE(), _.hu.nevermind.timeline.store.f_12);
                this$EventStore.emitChange();
              };
            },
            EventStore$f_1: function (this$EventStore) {
              return function (payload) {
                var sendingPayload = _.hu.nevermind.timeline.store.f_11(payload);
                this$EventStore.sendCommand_c2tynk$('insertEvent', sendingPayload, _.hu.nevermind.timeline.store.f_13(this$EventStore));
              };
            },
            getField$f: function (id) {
              return function () {
                return Kotlin.modules['stdlib'].kotlin.error_za3rmp$('EventFieldStore: ' + id + ' not found');
              };
            },
            f_14: function (it) {
              return it.id.id;
            },
            f_15: function (this$EventTemplateFieldStore) {
              return function (it) {
                this$EventTemplateFieldStore.fields_cdwuej$.put_wn2jw4$(it.id, it);
              };
            },
            EventTemplateFieldStore$f: function (this$EventTemplateFieldStore) {
              return function (appState) {
                var tmp$0;
                this$EventTemplateFieldStore.fields_cdwuej$.clear();
                tmp$0 = Kotlin.modules['stdlib'].kotlin.sortBy_cvgzri$(appState.templateFields, _.hu.nevermind.timeline.store.f_14);
                Kotlin.modules['stdlib'].kotlin.forEach_p7e0bo$(tmp$0, _.hu.nevermind.timeline.store.f_15(this$EventTemplateFieldStore));
              };
            },
            get$f: function (id) {
              return function () {
                return Kotlin.modules['stdlib'].kotlin.error_za3rmp$('EventTemplateFieldStore: ' + id + ' not found');
              };
            },
            f_16: function (this$EventTemplateStore) {
              return function (it) {
                this$EventTemplateStore.templates_s30ren$.put_wn2jw4$(it.id, it);
              };
            },
            EventTemplateStore$f: function (this$EventTemplateStore) {
              return function (appState) {
                this$EventTemplateStore.templates_s30ren$.clear();
                Kotlin.modules['stdlib'].kotlin.forEach_p7e0bo$(appState.templates, _.hu.nevermind.timeline.store.f_16(this$EventTemplateStore));
              };
            },
            get$f_0: function (templateId) {
              return function () {
                return Kotlin.modules['stdlib'].kotlin.error_za3rmp$('TemplateStore: ' + templateId);
              };
            },
            ModalWindowStore$f: function (this$ModalWindowStore) {
              return function (newEventEditorModalState) {
                this$ModalWindowStore.eventEditorModalState = newEventEditorModalState;
                this$ModalWindowStore.emitChange();
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
            },
            toString: function () {
              return this.format_k6n0qe$(_.net.yested.utils.format_hliocp$(_.net.yested.utils.Moment.toString$f));
            }
          }, /** @lends _.net.yested.utils.Moment */ {
            toString$f: function () {
              return this.year.fourDigits.plus('.').plus_9xull5$(this.month.twoDigits).plus_61zpoe$('.').plus_9xull5$(this.dayOfMonth.twoDigits).plus_61zpoe$(' ').plus_9xull5$(this.hour24.twoDigits).plus_61zpoe$(':').plus_9xull5$(this.minutes.twoDigits);
            },
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
  QUnit.test('DispatcherSpecs.dispatcherShouldExecuteAllSubscriber', function () {
    (new _.hu.nevermind.flux.DispatcherSpecs()).dispatcherShouldExecuteAllSubscriber();
  });
}(Kotlin));
