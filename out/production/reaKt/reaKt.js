(function (Kotlin) {
  'use strict';
  var _ = Kotlin.defineRootPackage(null, /** @lends _ */ {
    hu: Kotlin.definePackage(null, /** @lends _.hu */ {
      nevermind: Kotlin.definePackage(null, /** @lends _.hu.nevermind */ {
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
          div_3topnc$: function (options, body) {
            var tmp$0;
            var elementContainer = new _.hu.nevermind.reakt.ReactElementContainer();
            body.call(elementContainer);
            var fullOptions = Kotlin.modules['stdlib'].kotlin.arrayListOf_9mqe4v$([]);
            Kotlin.modules['stdlib'].kotlin.addAll_7g2der$(fullOptions, options);
            fullOptions.addAll_4fm7v2$(elementContainer.options);
            var constructorParams = _.hu.nevermind.reakt.createObjectWithDynamicFields(fullOptions);
            return new _.hu.nevermind.reakt.ReactElement((tmp$0 = _.hu.nevermind.reakt.React.object.DOM).div.apply(tmp$0, [constructorParams].concat(Kotlin.copyToArray(elementContainer.elements))));
          },
          h1_3topnc$: function (options, body) {
            if (options === void 0)
              options = [];
            var elementContainer = new _.hu.nevermind.reakt.ReactElementContainer();
            body.call(elementContainer);
            var fullOptions = Kotlin.modules['stdlib'].kotlin.arrayListOf_9mqe4v$([]);
            Kotlin.modules['stdlib'].kotlin.addAll_7g2der$(fullOptions, options);
            fullOptions.addAll_4fm7v2$(elementContainer.options);
            var constructorParams = _.hu.nevermind.reakt.createObjectWithDynamicFields(fullOptions);
            return new _.hu.nevermind.reakt.ReactElement(_.hu.nevermind.reakt.React.object.DOM.h1(constructorParams, Kotlin.copyToArray(elementContainer.elements)));
          },
          h2_3topnc$: function (options, body) {
            var elementContainer = new _.hu.nevermind.reakt.ReactElementContainer();
            body.call(elementContainer);
            var fullOptions = Kotlin.modules['stdlib'].kotlin.arrayListOf_9mqe4v$([]);
            Kotlin.modules['stdlib'].kotlin.addAll_7g2der$(fullOptions, options);
            fullOptions.addAll_4fm7v2$(elementContainer.options);
            var constructorParams = _.hu.nevermind.reakt.createObjectWithDynamicFields(fullOptions);
            return new _.hu.nevermind.reakt.ReactElement(_.hu.nevermind.reakt.React.object.DOM.h2(constructorParams, Kotlin.copyToArray(elementContainer.elements)));
          },
          form_djsqtr$f: function (it) {
          },
          form_djsqtr$: function (options, onSubmit, body) {
            if (onSubmit === void 0)
              onSubmit = _.hu.nevermind.reakt.form_djsqtr$f;
            var elementContainer = new _.hu.nevermind.reakt.ReactElementContainer();
            body.call(elementContainer);
            var fullOptions = Kotlin.modules['stdlib'].kotlin.arrayListOf_9mqe4v$([]);
            Kotlin.modules['stdlib'].kotlin.addAll_7g2der$(fullOptions, options);
            fullOptions.addAll_4fm7v2$(elementContainer.options);
            fullOptions.add_za3rmp$(Kotlin.modules['stdlib'].kotlin.to_l1ob02$('onSubmit', onSubmit));
            var constructorParams = _.hu.nevermind.reakt.createObjectWithDynamicFields(fullOptions);
            return new _.hu.nevermind.reakt.ReactElement(_.hu.nevermind.reakt.React.object.DOM.form(constructorParams, Kotlin.copyToArray(elementContainer.elements)));
          },
          InputType: Kotlin.createEnumClass(function () {
            return [Kotlin.Enum];
          }, function $fun() {
            $fun.baseInitializer.call(this);
          }, function () {
            return {
              TEXT: new _.hu.nevermind.reakt.InputType(),
              SUBMIT: new _.hu.nevermind.reakt.InputType()
            };
          }),
          input_gy5mox$: function (options, type) {
            var fullOptions = Kotlin.modules['stdlib'].kotlin.arrayListOf_9mqe4v$([]);
            Kotlin.modules['stdlib'].kotlin.addAll_7g2der$(fullOptions, options);
            fullOptions.add_za3rmp$(Kotlin.modules['stdlib'].kotlin.to_l1ob02$('type', type.name().toLowerCase()));
            var constructorParams = _.hu.nevermind.reakt.createObjectWithDynamicFields(fullOptions);
            return new _.hu.nevermind.reakt.ReactElement(_.hu.nevermind.reakt.React.object.DOM.input(constructorParams));
          },
          ReactElement: Kotlin.createClass(null, function (backend) {
            this.backend = backend;
          }),
          ReactDom: Kotlin.createClass(null, null, /** @lends _.hu.nevermind.reakt.ReactDom.prototype */ {
            div: function (properties, children) {
              return noImpl;
            },
            h1: function (properties, children) {
              return noImpl;
            },
            h2: function (properties, children) {
              return noImpl;
            },
            form: function (properties, children) {
              return noImpl;
            },
            input: function (properties) {
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
            f_1: function (reactClass, this$React$) {
              return function () {
                var self = null;
                self = this;
                this$React$.readStateFromJsToKotlin(self, reactClass);
                if (Kotlin.isType(reactClass, _.hu.nevermind.reakt.StatefulReactClass)) {
                  return reactClass.getInitialState();
                }
                 else {
                  return null;
                }
              };
            },
            createClass_ew72dd$f: function (reactClass, this$React$) {
              return Kotlin.createObject(null, function () {
                this.render = _.hu.nevermind.reakt.React.f(reactClass, this$React$);
                this.componentDidMount = _.hu.nevermind.reakt.React.f_0(reactClass, this$React$);
                this.getInitialState = _.hu.nevermind.reakt.React.f_1(reactClass, this$React$);
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
            this.state$delegate = Kotlin.modules['stdlib'].kotlin.properties.Delegates.notNull();
          }, /** @lends _.hu.nevermind.reakt.StatefulReactClass.prototype */ {
            getInitialState: function () {
              return noImpl;
            },
            state: {
              get: function () {
                return this.state$delegate.get_1tsekc$(this, new Kotlin.PropertyMetadata('state'));
              },
              set: function (state) {
                this.state$delegate.set_1z3uih$(this, new Kotlin.PropertyMetadata('state'), state);
              }
            },
            setState_za3rmp$: function (newState) {
              this.reactClassRuntimeRepr.setState(newState);
            },
            setStateJs_za3rmp$: function (st) {
              this.state = st;
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
          }
        })
      })
    })
  });
  Kotlin.defineModule('reaKt', _);
}(Kotlin));
