(function (Kotlin) {
  'use strict';
  var _ = Kotlin.defineRootPackage(null, /** @lends _ */ {
    hu: Kotlin.definePackage(null, /** @lends _.hu */ {
      nevermind: Kotlin.definePackage(null, /** @lends _.hu.nevermind */ {
        reakt: Kotlin.definePackage(null, /** @lends _.hu.nevermind.reakt */ {
          example: Kotlin.definePackage(function () {
            this.data = [new _.hu.nevermind.reakt.example.Person('Pete Hunt', 'This is one comment'), new _.hu.nevermind.reakt.example.Person('Jordan Walke', 'This is *another* comment')];
          }, /** @lends _.hu.nevermind.reakt.example */ {
            Comment: Kotlin.createClass(function () {
              return [_.hu.nevermind.reakt.ReactClass];
            }, function $fun(authorName, body) {
              $fun.baseInitializer.call(this, body);
              this.authorName$delegate = new _.hu.nevermind.reakt.ReactPropDelegate();
              this.authorName = authorName;
            }, /** @lends _.hu.nevermind.reakt.example.Comment.prototype */ {
              authorName: {
                get: function () {
                  return this.authorName$delegate.get(this, new Kotlin.PropertyMetadata('authorName'));
                },
                set: function (authorName) {
                  this.authorName$delegate.set(this, new Kotlin.PropertyMetadata('authorName'), authorName);
                }
              },
              doRender: function () {
                return _.hu.nevermind.reakt.div_3topnc$([Kotlin.modules['stdlib'].kotlin.to_l1ob02$('className', 'comment')], _.hu.nevermind.reakt.example.Comment.doRender$f(this));
              }
            }, /** @lends _.hu.nevermind.reakt.example.Comment */ {
              f: function (this$Comment) {
                return function () {
                  this.plus_pdl1w0$(this$Comment.authorName);
                };
              },
              doRender$f: function (this$Comment) {
                return function () {
                  this.plus_oclkc7$(_.hu.nevermind.reakt.h2_unrlpa$(Kotlin.modules['stdlib'].kotlin.to_l1ob02$('className', 'commentAuthor'), _.hu.nevermind.reakt.example.Comment.f(this$Comment)));
                  this.plus_eg9ybj$(this$Comment.children);
                };
              }
            }),
            CommentList: Kotlin.createClass(function () {
              return [_.hu.nevermind.reakt.ReactClass];
            }, function $fun(data, body) {
              if (body === void 0)
                body = _.hu.nevermind.reakt.example.CommentList.CommentList$f;
              $fun.baseInitializer.call(this, body);
              this.data$delegate = new _.hu.nevermind.reakt.ReactPropDelegate();
              this.data = data;
            }, /** @lends _.hu.nevermind.reakt.example.CommentList.prototype */ {
              data: {
                get: function () {
                  return this.data$delegate.get(this, new Kotlin.PropertyMetadata('data'));
                },
                set: function (data) {
                  this.data$delegate.set(this, new Kotlin.PropertyMetadata('data'), data);
                }
              },
              doRender: function () {
                var tmp$0;
                tmp$0 = Kotlin.modules['stdlib'].kotlin.map_rie7ol$(this.data, _.hu.nevermind.reakt.example.CommentList.doRender$f);
                var commentNodes = tmp$0;
                return _.hu.nevermind.reakt.div_3topnc$([Kotlin.modules['stdlib'].kotlin.to_l1ob02$('className', 'commentList')], _.hu.nevermind.reakt.example.CommentList.doRender$f_0(commentNodes));
              }
            }, /** @lends _.hu.nevermind.reakt.example.CommentList */ {
              CommentList$f: function () {
              },
              f: function (comment) {
                return function () {
                  this.plus_pdl1w0$(comment.text);
                };
              },
              doRender$f: function (comment) {
                return new _.hu.nevermind.reakt.example.Comment(comment.author, _.hu.nevermind.reakt.example.CommentList.f(comment));
              },
              doRender$f_0: function (commentNodes) {
                return function () {
                  this.plus_ow6yss$(commentNodes);
                };
              }
            }),
            CommentForm: Kotlin.createClass(function () {
              return [_.hu.nevermind.reakt.ReactClass];
            }, function $fun(body) {
              if (body === void 0)
                body = _.hu.nevermind.reakt.example.CommentForm.CommentForm$f;
              $fun.baseInitializer.call(this, body);
            }, /** @lends _.hu.nevermind.reakt.example.CommentForm.prototype */ {
              doRender: function () {
                return _.hu.nevermind.reakt.div_3topnc$([Kotlin.modules['stdlib'].kotlin.to_l1ob02$('className', 'CommentForm')], _.hu.nevermind.reakt.example.CommentForm.doRender$f);
              }
            }, /** @lends _.hu.nevermind.reakt.example.CommentForm */ {
              CommentForm$f: function () {
              },
              doRender$f: function () {
                this.plus_pdl1w0$('Hello, world! I am a CommentForm.');
              }
            }),
            CommentBox: Kotlin.createClass(function () {
              return [_.hu.nevermind.reakt.ReactClass];
            }, function $fun(data, body) {
              if (body === void 0)
                body = _.hu.nevermind.reakt.example.CommentBox.CommentBox$f;
              $fun.baseInitializer.call(this, body);
              this.data$delegate = new _.hu.nevermind.reakt.ReactPropDelegate();
              this.data = data;
            }, /** @lends _.hu.nevermind.reakt.example.CommentBox.prototype */ {
              data: {
                get: function () {
                  return this.data$delegate.get(this, new Kotlin.PropertyMetadata('data'));
                },
                set: function (data) {
                  this.data$delegate.set(this, new Kotlin.PropertyMetadata('data'), data);
                }
              },
              doRender: function () {
                return _.hu.nevermind.reakt.div_3topnc$([Kotlin.modules['stdlib'].kotlin.to_l1ob02$('className', 'commentBox')], _.hu.nevermind.reakt.example.CommentBox.doRender$f(this));
              }
            }, /** @lends _.hu.nevermind.reakt.example.CommentBox */ {
              CommentBox$f: function () {
              },
              f: function () {
                this.plus_pdl1w0$('Comments');
              },
              doRender$f: function (this$CommentBox) {
                return function () {
                  this.plus_oclkc7$(_.hu.nevermind.reakt.h1_3topnc$(void 0, _.hu.nevermind.reakt.example.CommentBox.f));
                  this.plus_zhpcab$(new _.hu.nevermind.reakt.example.CommentList(this$CommentBox.data));
                  this.plus_zhpcab$(new _.hu.nevermind.reakt.example.CommentForm());
                };
              }
            }),
            Person: Kotlin.createClass(null, function (author, text) {
              this.author = author;
              this.text = text;
            }, /** @lends _.hu.nevermind.reakt.example.Person.prototype */ {
              component1: function () {
                return this.author;
              },
              component2: function () {
                return this.text;
              },
              copy: function (author, text) {
                return new _.hu.nevermind.reakt.example.Person(author === void 0 ? this.author : author, text === void 0 ? this.text : text);
              },
              toString: function () {
                return 'Person(author=' + Kotlin.toString(this.author) + (', text=' + Kotlin.toString(this.text)) + ')';
              },
              hashCode: function () {
                var result = 0;
                result = result * 31 + Kotlin.hashCode(this.author) | 0;
                result = result * 31 + Kotlin.hashCode(this.text) | 0;
                return result;
              },
              equals_za3rmp$: function (other) {
                return this === other || (other !== null && (Object.getPrototypeOf(this) === Object.getPrototypeOf(other) && (Kotlin.equals(this.author, other.author) && Kotlin.equals(this.text, other.text))));
              }
            }),
            main_kand9s$: function (args) {
              _.hu.nevermind.reakt.React.object.render_40g7my$((new _.hu.nevermind.reakt.example.CommentBox(_.hu.nevermind.reakt.example.data)).createElement(), document.getElementById('content'));
            }
          }),
          ReactElementContainer: Kotlin.createClass(null, function () {
            this.elements = Kotlin.modules['stdlib'].kotlin.arrayListOf_9mqe4v$([]);
          }, /** @lends _.hu.nevermind.reakt.ReactElementContainer.prototype */ {
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
            return new _.hu.nevermind.reakt.ReactElement((tmp$0 = _.hu.nevermind.reakt.React.object.DOM).div.apply(tmp$0, [options].concat(Kotlin.copyToArray(elementContainer.elements))));
          },
          h1_3topnc$: function (options, body) {
            if (options === void 0)
              options = [];
            var elementContainer = new _.hu.nevermind.reakt.ReactElementContainer();
            body.call(elementContainer);
            return new _.hu.nevermind.reakt.ReactElement(_.hu.nevermind.reakt.React.object.DOM.h1(options, Kotlin.copyToArray(elementContainer.elements)));
          },
          h2_unrlpa$: function (options, body) {
            var elementContainer = new _.hu.nevermind.reakt.ReactElementContainer();
            body.call(elementContainer);
            return new _.hu.nevermind.reakt.ReactElement(_.hu.nevermind.reakt.React.object.DOM.h2(options, Kotlin.copyToArray(elementContainer.elements)));
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
            }
          }),
          React: Kotlin.createClass(null, null, null, /** @lends _.hu.nevermind.reakt.React */ {
            render_40g7my$f: function () {
            },
            f: function (render) {
              return function () {
                var tmp$0;
                var props = this.props;
                return (tmp$0 = render(props)) != null ? tmp$0.backend : null;
              };
            },
            createClass_jtih06$f: function (render) {
              return Kotlin.createObject(null, function () {
                this.render = _.hu.nevermind.reakt.React.f(render);
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
                createClass_jtih06$: function (render) {
                  return React.createClass(_.hu.nevermind.reakt.React.createClass_jtih06$f(render));
                }
              });
            }
          }),
          ReactProps: Kotlin.createClass(null, function () {
            this.children = noImpl;
          }, /** @lends _.hu.nevermind.reakt.ReactProps.prototype */ {
            get: function (name) {
              return noImpl;
            },
            set: function (name, value) {
              noImpl;
            }
          }),
          ReactClass: Kotlin.createClass(null, function (body) {
            this.body = body;
            this.props = null;
            this.constructorParams_blvvm5$ = Kotlin.modules['stdlib'].kotlin.arrayListOf_9mqe4v$([]);
            this.backend = _.hu.nevermind.reakt.React.object.createClass_jtih06$(_.hu.nevermind.reakt.ReactClass.ReactClass$f(this));
          }, /** @lends _.hu.nevermind.reakt.ReactClass.prototype */ {
            children: {
              get: function () {
                var tmp$0, tmp$1;
                var children = ((tmp$0 = this.props) != null ? tmp$0 : Kotlin.throwNPE()).children;
                if (Kotlin.isType(children, Kotlin.modules['builtins'].kotlin.Array)) {
                  tmp$1 = children;
                }
                 else {
                  tmp$1 = [children];
                }
                return tmp$1;
              }
            },
            addParam_bm4g0d$: function (name, value) {
              this.constructorParams_blvvm5$.add_za3rmp$(Kotlin.modules['stdlib'].kotlin.to_l1ob02$(name, value));
            },
            render_f3gibd$: function (props) {
              this.props = props;
              return this.doRender();
            },
            createElement: function () {
              var tmp$0;
              var constructorParams = this.createObjectWithDynamicFields();
              var elementContainer = new _.hu.nevermind.reakt.ReactElementContainer();
              this.body.call(elementContainer);
              return new _.hu.nevermind.reakt.ReactElement((tmp$0 = React).createElement.apply(tmp$0, [this.backend, constructorParams].concat(Kotlin.copyToArray(elementContainer.elements))));
            },
            createObjectWithDynamicFields: function () {
              var tmp$1;
              var tmpObj = _.hu.nevermind.reakt.ReactClass.createObjectWithDynamicFields$f();
              tmp$1 = this.constructorParams_blvvm5$.iterator();
              while (tmp$1.hasNext()) {
                var tmp$0 = tmp$1.next()
                , key = tmp$0.component1()
                , value = tmp$0.component2();
                tmpObj[key] = value;
              }
              return tmpObj;
            }
          }, /** @lends _.hu.nevermind.reakt.ReactClass */ {
            ReactClass$f: function (this$ReactClass) {
              return function (props) {
                return this$ReactClass.render_f3gibd$(props);
              };
            },
            createObjectWithDynamicFields$f: function () {
              return Kotlin.createObject(null, null);
            }
          }),
          ReactPropDelegate: Kotlin.createClass(null, null, /** @lends _.hu.nevermind.reakt.ReactPropDelegate.prototype */ {
            get: function (thisRef, fieldMetadata) {
              var tmp$0;
              return ((tmp$0 = thisRef.props) != null ? tmp$0 : Kotlin.throwNPE())[fieldMetadata.name];
            },
            set: function (thisRef, fieldMetadata, value) {
              var tmp$0;
              if (thisRef.props != null) {
                ((tmp$0 = thisRef.props) != null ? tmp$0 : Kotlin.throwNPE())[fieldMetadata.name] = value;
              }
               else {
                thisRef.addParam_bm4g0d$(fieldMetadata.name, value);
              }
            }
          })
        })
      })
    })
  });
  Kotlin.defineModule('reaKt', _);
  _.hu.nevermind.reakt.example.main_kand9s$([]);
}(Kotlin));
