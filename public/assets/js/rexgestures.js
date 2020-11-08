! function (t, e) {
    "object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define([], e) : "object" == typeof exports ? exports.rexgesturesplugin = e() : t.rexgesturesplugin = e()
}(window, function () {
    return function (t) {
        var e = {};

        function n(i) {
            if (e[i]) return e[i].exports;
            var r = e[i] = {
                i: i,
                l: !1,
                exports: {}
            };
            return t[i].call(r.exports, r, r.exports, n), r.l = !0, r.exports
        }
        return n.m = t, n.c = e, n.d = function (t, e, i) {
            n.o(t, e) || Object.defineProperty(t, e, {
                enumerable: !0,
                get: i
            })
        }, n.r = function (t) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
                value: "Module"
            }), Object.defineProperty(t, "__esModule", {
                value: !0
            })
        }, n.t = function (t, e) {
            if (1 & e && (t = n(t)), 8 & e) return t;
            if (4 & e && "object" == typeof t && t && t.__esModule) return t;
            var i = Object.create(null);
            if (n.r(i), Object.defineProperty(i, "default", {
                    enumerable: !0,
                    value: t
                }), 2 & e && "string" != typeof t)
                for (var r in t) n.d(i, r, function (e) {
                    return t[e]
                }.bind(null, r));
            return i
        }, n.n = function (t) {
            var e = t && t.__esModule ? function () {
                return t.default
            } : function () {
                return t
            };
            return n.d(e, "a", e), e
        }, n.o = function (t, e) {
            return Object.prototype.hasOwnProperty.call(t, e)
        }, n.p = "", n(n.s = 245)
    }({
        1: function (t, e) {
            t.exports = function (t, e, n) {
                if (t && "number" != typeof t) {
                    if (t.hasOwnProperty(e)) return t[e];
                    if (-1 !== e.indexOf(".")) {
                        for (var i = e.split("."), r = t, o = n, s = 0; s < i.length; s++) {
                            if (!r.hasOwnProperty(i[s])) {
                                o = n;
                                break
                            }
                            o = r[i[s]], r = r[i[s]]
                        }
                        return o
                    }
                    return n
                }
                return n
            }
        },
        117: function (t, e, n) {
            "use strict";
            var i = n(44),
                r = n(23);

            function o(t) {
                return (o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
                    return typeof t
                } : function (t) {
                    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
                })(t)
            }

            function s(t, e) {
                for (var n = 0; n < e.length; n++) {
                    var i = e[n];
                    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
                }
            }

            function a(t) {
                if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return t
            }

            function u(t, e, n) {
                return (u = "undefined" != typeof Reflect && Reflect.get ? Reflect.get : function (t, e, n) {
                    var i = function (t, e) {
                        for (; !Object.prototype.hasOwnProperty.call(t, e) && null !== (t = c(t)););
                        return t
                    }(t, e);
                    if (i) {
                        var r = Object.getOwnPropertyDescriptor(i, e);
                        return r.get ? r.get.call(n) : r.value
                    }
                })(t, e, n || t)
            }

            function c(t) {
                return (c = Object.setPrototypeOf ? Object.getPrototypeOf : function (t) {
                    return t.__proto__ || Object.getPrototypeOf(t)
                })(t)
            }

            function h(t, e) {
                return (h = Object.setPrototypeOf || function (t, e) {
                    return t.__proto__ = e, t
                })(t, e)
            }
            var f = Phaser.Utils.Objects.GetValue,
                l = function (t) {
                    function e(t, n) {
                        var i;
                        ! function (t, e) {
                            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                        }(this, e);
                        var s = a(i = function (t, e) {
                                return !e || "object" !== o(e) && "function" != typeof e ? a(t) : e
                            }(this, c(e).call(this, t, n))),
                            u = {
                                states: {
                                    IDLE: {},
                                    BEGIN: {
                                        enter: function () {
                                            var t = s.pointer;
                                            s.startX = t.x, s.startY = t.y, s.startWorldX = t.worldX, s.startWorldY = t.worldY
                                        }
                                    },
                                    RECOGNIZED: {
                                        enter: function () {
                                            s.emit("panstart", s, s.gameObject, s.lastPointer)
                                        },
                                        exit: function () {
                                            var t = s.lastPointer;
                                            s.endX = t.x, s.endY = t.y, s.endWorldX = t.worldX, s.endWorldY = t.worldY, s.emit("panend", s, s.gameObject, s.lastPointer)
                                        }
                                    }
                                },
                                init: function () {
                                    this.state = p
                                },
                                eventEmitter: !1
                            };
                        return i.setRecongizedStateObject(new r.a(u)), i
                    }
                    var n, l, d;
                    return function (t, e) {
                        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
                        t.prototype = Object.create(e && e.prototype, {
                            constructor: {
                                value: t,
                                writable: !0,
                                configurable: !0
                            }
                        }), e && h(t, e)
                    }(e, i["a"]), n = e, (l = [{
                        key: "resetFromJSON",
                        value: function (t) {
                            return u(c(e.prototype), "resetFromJSON", this).call(this, t), this.setDragThreshold(f(t, "threshold", 10)), this
                        }
                    }, {
                        key: "onDragStart",
                        value: function () {
                            this.state = 0 === this.dragThreshold ? v : y
                        }
                    }, {
                        key: "onDragEnd",
                        value: function () {
                            this.state = p
                        }
                    }, {
                        key: "onDrag",
                        value: function () {
                            switch (this.state) {
                                case y:
                                    this.pointer.getDistance() >= this.dragThreshold && (this.state = v);
                                    break;
                                case v:
                                    var t = this.pointer.position,
                                        e = this.pointer.prevPosition;
                                    this.dx = t.x - e.x, this.dy = t.y - e.y;
                                    var n = this.pointer;
                                    self.x = n.x, self.y = n.y, self.worldX = n.worldX, self.worldY = n.worldY, this.emit("pan", this)
                            }
                        }
                    }, {
                        key: "setDragThreshold",
                        value: function (t) {
                            return this.dragThreshold = t, this
                        }
                    }, {
                        key: "isPan",
                        get: function () {
                            return this.state === v
                        }
                    }]) && s(n.prototype, l), d && s(n, d), e
                }(),
                p = "IDLE",
                y = "BEGIN",
                v = "RECOGNIZED";
            e.a = l
        },
        118: function (t, e, n) {
            "use strict";
            var i = n(63),
                r = n(23),
                o = Phaser.Math.RotateAround,
                s = function (t, e, n, i) {
                    return o(t, e, n, i), t.rotation += i, t
                },
                a = {},
                u = function (t, e) {
                    if (!this.isRotation) return this;
                    void 0 === e && (e = this.pointers[0].camera);
                    var n = this.movementCenterX,
                        i = this.movementCenterY;
                    e.getWorldPoint(this.centerX, this.centerY, a);
                    var r = a.x,
                        o = a.y,
                        u = this.rotation;
                    if (Array.isArray(t))
                        for (var c = t, h = 0, f = c.length; h < f; h++)(t = c[h]).x += n, t.y += i, s(t, r, o, u);
                    else t.x += n, t.y += i, s(t, x, y, u);
                    return this
                };

            function c(t) {
                return (c = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
                    return typeof t
                } : function (t) {
                    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
                })(t)
            }

            function h(t, e) {
                for (var n = 0; n < e.length; n++) {
                    var i = e[n];
                    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
                }
            }

            function f(t) {
                if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return t
            }

            function l(t, e, n) {
                return (l = "undefined" != typeof Reflect && Reflect.get ? Reflect.get : function (t, e, n) {
                    var i = function (t, e) {
                        for (; !Object.prototype.hasOwnProperty.call(t, e) && null !== (t = p(t)););
                        return t
                    }(t, e);
                    if (i) {
                        var r = Object.getOwnPropertyDescriptor(i, e);
                        return r.get ? r.get.call(n) : r.value
                    }
                })(t, e, n || t)
            }

            function p(t) {
                return (p = Object.setPrototypeOf ? Object.getPrototypeOf : function (t) {
                    return t.__proto__ || Object.getPrototypeOf(t)
                })(t)
            }

            function v(t, e) {
                return (v = Object.setPrototypeOf || function (t, e) {
                    return t.__proto__ = e, t
                })(t, e)
            }
            var d = Phaser.Utils.Objects.GetValue,
                g = Phaser.Math.Angle.WrapDegrees,
                b = Phaser.Math.Angle.ShortestBetween,
                m = Phaser.Math.RadToDeg,
                O = Phaser.Math.DegToRad,
                w = function (t) {
                    function e(t, n) {
                        var i;
                        ! function (t, e) {
                            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                        }(this, e);
                        var o = f(i = function (t, e) {
                                return !e || "object" !== c(e) && "function" != typeof e ? f(t) : e
                            }(this, p(e).call(this, t, n))),
                            s = {
                                states: {
                                    IDLE: {
                                        enter: function () {
                                            o.prevAngle = void 0, o.angle = 0
                                        }
                                    },
                                    BEGIN: {},
                                    RECOGNIZED: {
                                        enter: function () {
                                            o.emit("rotatestart", o)
                                        },
                                        exit: function () {
                                            o.emit("rotateend", o)
                                        }
                                    }
                                },
                                init: function () {
                                    this.state = S
                                },
                                eventEmitter: !1
                            };
                        return i.setRecongizedStateObject(new r.a(s)), i
                    }
                    var n, o, s;
                    return function (t, e) {
                        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
                        t.prototype = Object.create(e && e.prototype, {
                            constructor: {
                                value: t,
                                writable: !0,
                                configurable: !0
                            }
                        }), e && v(t, e)
                    }(e, i["a"]), n = e, (o = [{
                        key: "resetFromJSON",
                        value: function (t) {
                            return l(p(e.prototype), "resetFromJSON", this).call(this, t), this.setDragThreshold(d(t, "threshold", 0)), this
                        }
                    }, {
                        key: "onDrag2Start",
                        value: function () {
                            this.prevAngle = g(m(this.angleBetween)), this.state = 0 === this.rotationThreshold ? P : E
                        }
                    }, {
                        key: "onDrag2End",
                        value: function () {
                            this.state = S
                        }
                    }, {
                        key: "onDrag2",
                        value: function () {
                            switch (this.state) {
                                case E:
                                    if (this.pointers[0].getDistance() >= this.dragThreshold && this.pointers[1].getDistance() >= this.dragThreshold) {
                                        var t = g(m(this.angleBetween));
                                        this.angle = b(this.prevAngle, t), this.prevAngle = t, this.state = P
                                    }
                                    break;
                                case P:
                                    t = g(m(this.angleBetween));
                                    this.angle = b(this.prevAngle, t), this.prevAngle = t, this.emit("rotate", this)
                            }
                        }
                    }, {
                        key: "setDragThreshold",
                        value: function (t) {
                            return this.dragThreshold = t, this
                        }
                    }, {
                        key: "isRotation",
                        get: function () {
                            return this.state === P
                        }
                    }, {
                        key: "rotation",
                        get: function () {
                            return O(this.angle)
                        }
                    }]) && h(n.prototype, o), s && h(n, s), e
                }(),
                k = {
                    spinObject: u
                };
            Object.assign(w.prototype, k);
            var S = "IDLE",
                E = "BEGIN",
                P = "RECOGNIZED";
            e.a = w
        },
        14: function (t, e, n) {
            "use strict";
            e.a = function (t) {
                if (Array.isArray(t)) t.length = 0;
                else
                    for (var e in t) delete t[e]
            }
        },
        19: function (t, e, n) {
            "use strict";
            var i = Phaser.GameObjects.GameObject;
            e.a = function (t) {
                return t instanceof i
            }
        },
        2: function (t, e, n) {
            "use strict";
            var i = Phaser.Scene;
            e.a = function (t) {
                return t instanceof i
            }
        },
        23: function (t, e, n) {
            "use strict";
            var i = n(3),
                r = n(1),
                o = n.n(r);

            function s(t, e) {
                for (var n = 0; n < e.length; n++) {
                    var i = e[n];
                    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
                }
            }
            var a = function () {
                function t(e) {
                    ! function (t, e) {
                        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                    }(this, t);
                    var n = o()(e, "states", void 0);
                    n && this.addStates(n);
                    var i = o()(e, "extend", void 0);
                    if (i)
                        for (var r in i) this.hasOwnProperty(r) && void 0 !== this[r] || (this[r] = i[r]);
                    var s = o()(e, "eventEmitter", void 0),
                        a = o()(e, "EventEmitterClass", void 0);
                    this.setEventEmitter(s, a), this._stateLock = !1, this.resetFromJSON(e)
                }
                var e, n, i;
                return e = t, (n = [{
                    key: "shutdown",
                    value: function () {
                        this.destroyEventEmitter()
                    }
                }, {
                    key: "destroy",
                    value: function () {
                        this.shutdown()
                    }
                }, {
                    key: "resetFromJSON",
                    value: function (t) {
                        this.setEnable(o()(t, "enable", !0)), this.start(o()(t, "start", void 0));
                        var e = o()(t, "init", void 0);
                        return e && e.call(this), this
                    }
                }, {
                    key: "toJSON",
                    value: function () {
                        return {
                            curState: this.state,
                            prevState: this.prevState,
                            enable: this.enable,
                            start: this._start
                        }
                    }
                }, {
                    key: "setEnable",
                    value: function (t) {
                        return void 0 === t && (t = !0), this.enable = t, this
                    }
                }, {
                    key: "start",
                    value: function (t) {
                        return this._start = t, this._prevState = void 0, this._state = t, this
                    }
                }, {
                    key: "goto",
                    value: function (t) {
                        return null != t && (this.state = t), this
                    }
                }, {
                    key: "next",
                    value: function () {
                        var t, e = this["next_" + this.state];
                        return e && (t = "string" == typeof e ? e : e.call(this)), this.goto(t), this
                    }
                }, {
                    key: "addState",
                    value: function (t, e) {
                        var n = o()(e, "next", void 0);
                        n && (this["next_" + t] = n);
                        var i = o()(e, "exit", void 0);
                        i && (this["exit_" + t] = i);
                        var r = o()(e, "enter", void 0);
                        return r && (this["enter_" + t] = r), this
                    }
                }, {
                    key: "addStates",
                    value: function (t) {
                        for (var e in t) this.addState(e, t[e]);
                        return this
                    }
                }, {
                    key: "update",
                    value: function (t, e, n) {
                        void 0 === n && (n = "update");
                        var i = this[n + "_" + this.state];
                        i && i.call(this, t, e)
                    }
                }, {
                    key: "preupdate",
                    value: function (t, e) {
                        this.update(t, e, "preupdate")
                    }
                }, {
                    key: "postupdate",
                    value: function (t, e) {
                        this.update(t, e, "postupdate")
                    }
                }, {
                    key: "state",
                    set: function (t) {
                        if (this.enable && !this._stateLock && this._state !== t) {
                            if (this._prevState = this._state, this._state = t, this._stateLock = !0, this.emit("statechange", this), null != this._prevState) {
                                var e = "exit_" + this._prevState,
                                    n = this[e];
                                n && n.call(this), this.emit(e, this)
                            }
                            if (this._stateLock = !1, null != this._state) {
                                var i = "enter_" + this._state,
                                    r = this[i];
                                r && r.call(this), this.emit(i, this)
                            }
                        }
                    },
                    get: function () {
                        return this._state
                    }
                }, {
                    key: "prevState",
                    get: function () {
                        return this._prevState
                    }
                }]) && s(e.prototype, n), i && s(e, i), t
            }();
            Object.assign(a.prototype, i.a);
            var u = a;
            e.a = u
        },
        245: function (t, e, n) {
            "use strict";

            function i(t, e) {
                for (var n = 0; n < e.length; n++) {
                    var i = e[n];
                    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
                }
            }
            n.r(e);
            var r = function () {
                    function t(e) {
                        ! function (t, e) {
                            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                        }(this, t), this.scene = e
                    }
                    var e, n, r;
                    return e = t, r = [{
                        key: "register",
                        value: function (e, n) {
                            t.prototype[e] = n
                        }
                    }], (n = null) && i(e.prototype, n), r && i(e, r), t
                }(),
                o = n(77),
                s = n(6),
                a = n(19);
            r.register("tap", function (t, e) {
                return Object(a.a)(t) || (e = t, t = this.scene), new o.a(t, e)
            }), Object(s.a)(window, "RexPlugins.Gestures.Tap", o.a);
            o.a;
            var u = n(78);
            r.register("press", function (t, e) {
                return Object(a.a)(t) || (e = t, t = this.scene), new u.a(t, e)
            }), Object(s.a)(window, "RexPlugins.Gestures.Press", u.a);
            u.a;
            var c = n(117);
            r.register("pan", function (t, e) {
                return Object(a.a)(t) || (e = t, t = this.scene), new c.a(t, e)
            }), Object(s.a)(window, "RexPlugins.Gestures.Pan", c.a);
            c.a;
            var h = n(96);
            r.register("swipe", function (t, e) {
                return Object(a.a)(t) || (e = t, t = this.scene), new h.a(t, e)
            }), Object(s.a)(window, "RexPlugins.Gestures.Swipe", h.a);
            h.a;
            var f = n(92);
            r.register("pinch", function (t) {
                return new f.a(this.scene, t)
            }), Object(s.a)(window, "RexPlugins.Gestures.Pinch", f.a);
            f.a;
            var l = n(118);
            r.register("rotate", function (t) {
                return new l.a(this.scene, t)
            }), Object(s.a)(window, "RexPlugins.Gestures.Rotate", l.a);
            l.a;

            function p(t) {
                return (p = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
                    return typeof t
                } : function (t) {
                    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
                })(t)
            }

            function y(t, e) {
                return !e || "object" !== p(e) && "function" != typeof e ? function (t) {
                    if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return t
                }(t) : e
            }

            function v(t) {
                return (v = Object.setPrototypeOf ? Object.getPrototypeOf : function (t) {
                    return t.__proto__ || Object.getPrototypeOf(t)
                })(t)
            }

            function d(t, e) {
                return (d = Object.setPrototypeOf || function (t, e) {
                    return t.__proto__ = e, t
                })(t, e)
            }
            var g = function (t) {
                function e(t, n) {
                    var i;
                    return function (t, e) {
                        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                    }(this, e), (i = y(this, v(e).call(this, t, n))).add = new r(t), i
                }
                return function (t, e) {
                    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
                    t.prototype = Object.create(e && e.prototype, {
                        constructor: {
                            value: t,
                            writable: !0,
                            configurable: !0
                        }
                    }), e && d(t, e)
                }(e, Phaser.Plugins.ScenePlugin), e
            }();
            e.default = g
        },
        26: function (t, e, n) {
            "use strict";
            var i = n(3);

            function r(t, e) {
                for (var n = 0; n < e.length; n++) {
                    var i = e[n];
                    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
                }
            }
            var o = Phaser.Utils.Objects.GetValue,
                s = function () {
                    function t(e, n) {
                        ! function (t, e) {
                            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                        }(this, t), this.parent = e, this._isRunning = !1, this.tickingState = !1, this.setEventEmitter(o(n, "eventEmitter", void 0)), this.setTickingMode(o(n, "tickingMode", 1))
                    }
                    var e, n, i;
                    return e = t, (n = [{
                        key: "boot",
                        value: function () {
                            2 !== this.tickingMode || this.tickingState || this.startTicking()
                        }
                    }, {
                        key: "shutdown",
                        value: function () {
                            this.destroyEventEmitter(), this.tickingState && this.stopTicking()
                        }
                    }, {
                        key: "setTickingMode",
                        value: function (t) {
                            "string" == typeof t && (t = a[t]), this.tickingMode = t
                        }
                    }, {
                        key: "startTicking",
                        value: function () {
                            this.tickingState = !0
                        }
                    }, {
                        key: "stopTicking",
                        value: function () {
                            this.tickingState = !1
                        }
                    }, {
                        key: "start",
                        value: function () {
                            return this.isRunning = !0, this
                        }
                    }, {
                        key: "pause",
                        value: function () {
                            return this.isRunning = !1, this
                        }
                    }, {
                        key: "resume",
                        value: function () {
                            return this.isRunning = !0, this
                        }
                    }, {
                        key: "stop",
                        value: function () {
                            return this.isRunning = !1, this
                        }
                    }, {
                        key: "complete",
                        value: function () {
                            this.isRunning = !1, this.emit("complete", this.parent, this)
                        }
                    }, {
                        key: "isRunning",
                        get: function () {
                            return this._isRunning
                        },
                        set: function (t) {
                            this._isRunning !== t && (this._isRunning = t, 1 === this.tickingMode && t != this.tickingState && (t ? this.startTicking() : this.stopTicking()))
                        }
                    }]) && r(e.prototype, n), i && r(e, i), t
                }();
            Object.assign(s.prototype, i.a);
            var a = {
                no: 0,
                lazy: 1,
                always: 2
            };
            e.a = s
        },
        3: function (t, e, n) {
            "use strict";
            e.a = {
                setEventEmitter: function (t, e) {
                    return void 0 === e && (e = Phaser.Events.EventEmitter), this._privateEE = void 0 === t, this._eventEmitter = this._privateEE ? new e : t, this
                },
                destroyEventEmitter: function () {
                    return this._eventEmitter && this._privateEE && this._eventEmitter.shutdown(), this
                },
                getEventEmitter: function () {
                    return this._eventEmitter
                },
                on: function () {
                    return this._eventEmitter && this._eventEmitter.on.apply(this._eventEmitter, arguments), this
                },
                once: function () {
                    return this._eventEmitter && this._eventEmitter.once.apply(this._eventEmitter, arguments), this
                },
                off: function () {
                    return this._eventEmitter && this._eventEmitter.off.apply(this._eventEmitter, arguments), this
                },
                emit: function (t) {
                    return this._eventEmitter && t && this._eventEmitter.emit.apply(this._eventEmitter, arguments), this
                },
                addListener: function () {
                    return this._eventEmitter && this._eventEmitter.addListener.apply(this._eventEmitter, arguments), this
                },
                removeListener: function () {
                    return this._eventEmitter && this._eventEmitter.removeListener.apply(this._eventEmitter, arguments), this
                },
                removeAllListeners: function () {
                    return this._eventEmitter && this._eventEmitter.removeAllListeners.apply(this._eventEmitter, arguments), this
                },
                listenerCount: function () {
                    return this._eventEmitter ? this._eventEmitter.listenerCount.apply(this._eventEmitter, arguments) : 0
                },
                listeners: function () {
                    return this._eventEmitter ? this._eventEmitter.listeners.apply(this._eventEmitter, arguments) : []
                }
            }
        },
        44: function (t, e, n) {
            "use strict";
            var i = n(26),
                r = n(7);

            function o(t) {
                return (o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
                    return typeof t
                } : function (t) {
                    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
                })(t)
            }

            function s(t, e) {
                for (var n = 0; n < e.length; n++) {
                    var i = e[n];
                    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
                }
            }

            function a(t, e) {
                return !e || "object" !== o(e) && "function" != typeof e ? function (t) {
                    if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return t
                }(t) : e
            }

            function u(t, e, n) {
                return (u = "undefined" != typeof Reflect && Reflect.get ? Reflect.get : function (t, e, n) {
                    var i = function (t, e) {
                        for (; !Object.prototype.hasOwnProperty.call(t, e) && null !== (t = c(t)););
                        return t
                    }(t, e);
                    if (i) {
                        var r = Object.getOwnPropertyDescriptor(i, e);
                        return r.get ? r.get.call(n) : r.value
                    }
                })(t, e, n || t)
            }

            function c(t) {
                return (c = Object.setPrototypeOf ? Object.getPrototypeOf : function (t) {
                    return t.__proto__ || Object.getPrototypeOf(t)
                })(t)
            }

            function h(t, e) {
                return (h = Object.setPrototypeOf || function (t, e) {
                    return t.__proto__ = e, t
                })(t, e)
            }
            var f = Phaser.Utils.Objects.GetValue,
                l = function (t) {
                    function e(t, n) {
                        var i;
                        ! function (t, e) {
                            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                        }(this, e);
                        var o = Object(r.a)(t);
                        return o === t && (t = void 0), (i = a(this, c(e).call(this, o, n))).scene = o, i.gameObject = t, t && t.setInteractive(f(n, "inputConfig", void 0)), i.resetFromJSON(n), i.boot(), i
                    }
                    var n, o, l;
                    return function (t, e) {
                        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
                        t.prototype = Object.create(e && e.prototype, {
                            constructor: {
                                value: t,
                                writable: !0,
                                configurable: !0
                            }
                        }), e && h(t, e)
                    }(e, i["a"]), n = e, (o = [{
                        key: "resetFromJSON",
                        value: function (t) {
                            return this.setEnable(f(t, "enable", !0)), void 0 === this.gameObject ? this.bounds = f(t, "bounds", void 0) : this.bounds = void 0, this.tracerState = p, this.pointer = void 0, this.lastPointer = void 0, this.movedState = !1, this.isTouchingAnyObject = !1, this
                        }
                    }, {
                        key: "boot",
                        value: function () {
                            u(c(e.prototype), "boot", this).call(this), this.gameObject ? this.gameObject.on("pointerdown", this.onPointerDown, this) : this.scene.input.on("pointerdown", this.onPointerDown, this), this.scene.input.on("pointerup", this.onPointerUp, this), this.scene.input.on("pointermove", this.onPointerMove, this), this.scene.events.once("shutdown", this.destroy, this)
                        }
                    }, {
                        key: "shutdown",
                        value: function () {
                            this.gameObject ? this.gameObject.off("pointerdown", this.onPointerDown, this) : this.scene && this.scene.input.off("pointerdown", this.onPointerDown, this), this.scene && (this.scene.input.off("pointerup", this.onPointerUp, this), this.scene.input.off("pointermove", this.onPointerMove, this), this.scene.events.off("destroy", this.destroy, this), this.scene = void 0), this.scene = void 0, this.gameObject = void 0, this.bounds = void 0, this.pointer = void 0, this.lastPointer = void 0, this.movedState = !1, u(c(e.prototype), "shutdown", this).call(this)
                        }
                    }, {
                        key: "destroy",
                        value: function () {
                            this.shutdown()
                        }
                    }, {
                        key: "setEnable",
                        value: function (t) {
                            return void 0 === t && (t = !0), this.enable === t ? this : (t || this.dragCancel(), this.enable = t, this)
                        }
                    }, {
                        key: "onPointerDown",
                        value: function (t, e) {
                            this.enable && (void 0 === this.pointer && (!this.bounds || this.bounds.contains(t.x, t.y)) && this.pointer !== t && (this.pointer = t, this.lastPointer = t, this.movedState = !1, this.tracerState = y, void 0 === this.gameObject && (this.isTouchingAnyObject = e.length > 0), this.onDragStart()))
                        }
                    }, {
                        key: "onPointerUp",
                        value: function (t) {
                            this.enable && ((!this.bounds || this.bounds.contains(t.x, t.y)) && this.pointer === t && (this.pointer = void 0, this.movedState = !1, this.tracerState = p, this.onDragEnd()))
                        }
                    }, {
                        key: "onPointerMove",
                        value: function (t) {
                            if (this.enable && t.isDown) {
                                var e = !this.bounds || this.bounds.contains(t.x, t.y),
                                    n = this.pointer === t;
                                !n && e || (n && !e ? this.onPointerUp(t) : (this.movedState || (this.movedState = t.x !== t.downX || t.y !== t.downY), this.movedState && this.onDrag()))
                            }
                        }
                    }, {
                        key: "dragCancel",
                        value: function () {
                            return this.tracerState === y && this.onDragEnd(), this.pointer = void 0, this.tracerState = p, this
                        }
                    }, {
                        key: "onDragStart",
                        value: function () {
                            this.emit("dragstart", this)
                        }
                    }, {
                        key: "onDragEnd",
                        value: function () {
                            this.emit("dragend", this)
                        }
                    }, {
                        key: "onDrag",
                        value: function () {
                            this.emit("drag", this)
                        }
                    }, {
                        key: "preUpdate",
                        value: function (t, e) {}
                    }, {
                        key: "postUpdate",
                        value: function (t, e) {}
                    }, {
                        key: "startTicking",
                        value: function () {
                            u(c(e.prototype), "startTicking", this).call(this), this.scene.events.on("preupdate", this.preUpdate, this), this.scene.events.on("postupdate", this.postUpdate, this)
                        }
                    }, {
                        key: "stopTicking",
                        value: function () {
                            u(c(e.prototype), "stopTicking", this).call(this), this.scene && (this.scene.events.off("preupdate", this.preUpdate, this), this.scene.events.off("postupdate", this.postUpdate, this))
                        }
                    }, {
                        key: "setRecongizedStateObject",
                        value: function (t) {
                            return this.recongizedState = t, this
                        }
                    }, {
                        key: "cancel",
                        value: function () {
                            return this.state = v, this
                        }
                    }, {
                        key: "state",
                        get: function () {
                            return this.recongizedState.state
                        },
                        set: function (t) {
                            this.recongizedState.state = t
                        }
                    }]) && s(n.prototype, o), l && s(n, l), e
                }(),
                p = 0,
                y = 1,
                v = "IDLE";
            e.a = l
        },
        6: function (t, e, n) {
            "use strict";

            function i(t) {
                return (i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
                    return typeof t
                } : function (t) {
                    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
                })(t)
            }
            var r = function (t) {
                return null == t || "" === t || 0 === t.length
            };
            e.a = function (t, e, n) {
                if ("object" === i(t)) {
                    if (r(e)) {
                        if (null == n) return;
                        "object" === i(n) && (t = n)
                    } else {
                        "string" == typeof e && (e = e.split("."));
                        var o = e.pop();
                        ((function (t, e, n) {
                            var o = t;
                            if (r(e));
                            else {
                                var s;
                                "string" == typeof e && (e = e.split("."));
                                for (var a = 0, u = e.length; a < u; a++) {
                                    var c;
                                    null != o[s = e[a]] && "object" === i(o[s]) || (c = a === u - 1 ? void 0 === n ? {} : n : {}, o[s] = c), o = o[s]
                                }
                            }
                            return o
                        })(t, e))[o] = n
                    }
                    return t
                }
            }
        },
        63: function (t, e, n) {
            "use strict";
            var i = n(3),
                r = n(14);

            function o(t, e) {
                for (var n = 0; n < e.length; n++) {
                    var i = e[n];
                    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
                }
            }
            var s = Phaser.Utils.Objects.GetValue,
                a = Phaser.Utils.Array.SpliceOne,
                u = Phaser.Math.Distance.Between,
                c = Phaser.Math.Angle.Between,
                h = function () {
                    function t(e, n) {
                        ! function (t, e) {
                            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                        }(this, t);
                        var i = e.input.manager.pointersTotal - 1;
                        i < 2 && e.input.addPointer(2 - i), this.scene = e, this.setEventEmitter(s(n, "eventEmitter", void 0)), this.pointers = [], this.movedState = {}, this.resetFromJSON(n), this.boot()
                    }
                    var e, n, i;
                    return e = t, (n = [{
                        key: "resetFromJSON",
                        value: function (t) {
                            return this.setEnable(s(t, "enable", !0)), this.bounds = s(t, "bounds", void 0), this.tracerState = l, this.pointers.length = 0, Object(r.a)(this.movedState), this
                        }
                    }, {
                        key: "boot",
                        value: function () {
                            this.scene.input.on("pointerdown", this.onPointerDown, this), this.scene.input.on("pointerup", this.onPointerUp, this), this.scene.input.on("pointermove", this.onPointerMove, this), this.scene.events.once("shutdown", this.destroy, this)
                        }
                    }, {
                        key: "shutdown",
                        value: function () {
                            this.destroyEventEmitter(), this.pointers.length = 0, Object(r.a)(this.movedState), this.scene && (this.scene.input.off("pointerdown", this.onPointerDown, this), this.scene.input.off("pointerup", this.onPointerUp, this), this.scene.input.off("pointermove", this.onPointerMove, this), this.scene.events.off("destroy", this.destroy, this), this.scene = void 0), this.scene = void 0
                        }
                    }, {
                        key: "destroy",
                        value: function () {
                            this.shutdown()
                        }
                    }, {
                        key: "setEnable",
                        value: function (t) {
                            return void 0 === t && (t = !0), this.enable === t ? this : (t || this.dragCancel(), this.enable = t, this)
                        }
                    }, {
                        key: "onPointerDown",
                        value: function (t) {
                            if (this.enable && (2 !== this.pointers.length && (!this.bounds || this.bounds.contains(t.x, t.y)) && -1 === this.pointers.indexOf(t))) switch (this.movedState[t.id] = !1, this.pointers.push(t), this.tracerState) {
                                case l:
                                    this.tracerState = p, this.onDrag1Start();
                                    break;
                                case p:
                                    this.tracerState = y, this.onDrag2Start()
                            }
                        }
                    }, {
                        key: "onPointerUp",
                        value: function (t) {
                            if (this.enable && (!this.bounds || this.bounds.contains(t.x, t.y))) {
                                var e = this.pointers.indexOf(t);
                                if (-1 !== e) switch (delete this.movedState[t.id], a(this.pointers, e), this.tracerState) {
                                    case p:
                                        this.tracerState = l, this.onDrag1End();
                                        break;
                                    case y:
                                        this.tracerState = p, this.onDrag2End(), this.onDrag1Start()
                                }
                            }
                        }
                    }, {
                        key: "onPointerMove",
                        value: function (t) {
                            if (this.enable && t.isDown) {
                                var e = !this.bounds || this.bounds.contains(t.x, t.y),
                                    n = -1 !== this.pointers.indexOf(t);
                                if (!n && e);
                                else if (n && !e) this.onPointerUp(t);
                                else if (this.movedState[t.id] || (this.movedState[t.id] = t.x !== t.downX || t.y !== t.downY), this.movedState[t.id]) switch (this.tracerState) {
                                    case p:
                                        this.onDrag1();
                                        break;
                                    case y:
                                        this.onDrag2()
                                }
                            }
                        }
                    }, {
                        key: "dragCancel",
                        value: function () {
                            return this.tracerState === y && this.onDrag2End(), this.pointers.length = 0, Object(r.a)(this.movedState), this.tracerState = l, this
                        }
                    }, {
                        key: "onDrag1Start",
                        value: function () {
                            this.emit("drag1start", this)
                        }
                    }, {
                        key: "onDrag1End",
                        value: function () {
                            this.emit("drag1end", this)
                        }
                    }, {
                        key: "onDrag1",
                        value: function () {
                            this.emit("drag1", this)
                        }
                    }, {
                        key: "onDrag2Start",
                        value: function () {
                            this.emit("drag2start", this)
                        }
                    }, {
                        key: "onDrag2End",
                        value: function () {
                            this.emit("drag2end", this)
                        }
                    }, {
                        key: "onDrag2",
                        value: function () {
                            this.emit("drag2", this)
                        }
                    }, {
                        key: "setRecongizedStateObject",
                        value: function (t) {
                            return this.recongizedState = t, this
                        }
                    }, {
                        key: "cancel",
                        value: function () {
                            return this.state = v, this
                        }
                    }, {
                        key: "distanceBetween",
                        get: function () {
                            if (this.tracerState !== y) return 0;
                            var t = this.pointers[0],
                                e = this.pointers[1];
                            return u(t.x, t.y, e.x, e.y)
                        }
                    }, {
                        key: "angleBetween",
                        get: function () {
                            if (this.tracerState !== y) return 0;
                            var t = this.pointers[0],
                                e = this.pointers[1];
                            return c(t.x, t.y, e.x, e.y)
                        }
                    }, {
                        key: "drag1Vector",
                        get: function () {
                            var t = this.pointers[0];
                            if (t && this.movedState[t.id]) {
                                var e = t.position,
                                    n = t.prevPosition;
                                f.x = e.x - n.x, f.y = e.y - n.y
                            } else f.x = 0, f.y = 0;
                            return f
                        }
                    }, {
                        key: "centerX",
                        get: function () {
                            if (this.tracerState !== y) return 0;
                            var t = this.pointers[0].position,
                                e = this.pointers[1].position;
                            return (t.x + e.x) / 2
                        }
                    }, {
                        key: "centerY",
                        get: function () {
                            if (this.tracerState !== y) return 0;
                            var t = this.pointers[0].position,
                                e = this.pointers[1].position;
                            return (t.y + e.y) / 2
                        }
                    }, {
                        key: "prevCenterX",
                        get: function () {
                            if (this.tracerState !== y) return 0;
                            var t = this.movedState[this.pointers[0].id] ? this.pointers[0].prevPosition : this.pointers[0].position,
                                e = this.movedState[this.pointers[1].id] ? this.pointers[1].prevPosition : this.pointers[1].position;
                            return (t.x + e.x) / 2
                        }
                    }, {
                        key: "prevCenterY",
                        get: function () {
                            if (this.tracerState !== y) return 0;
                            var t = this.movedState[this.pointers[0].id] ? this.pointers[0].prevPosition : this.pointers[0].position,
                                e = this.movedState[this.pointers[1].id] ? this.pointers[1].prevPosition : this.pointers[1].position;
                            return (t.y + e.y) / 2
                        }
                    }, {
                        key: "movementCenterX",
                        get: function () {
                            return this.centerX - this.prevCenterX
                        }
                    }, {
                        key: "movementCenterY",
                        get: function () {
                            return this.centerY - this.prevCenterY
                        }
                    }, {
                        key: "state",
                        get: function () {
                            return this.recongizedState.state
                        },
                        set: function (t) {
                            this.recongizedState.state = t
                        }
                    }]) && o(e.prototype, n), i && o(e, i), t
                }();
            Object.assign(h.prototype, i.a);
            var f = {},
                l = 0,
                p = 1,
                y = 2,
                v = "IDLE";
            e.a = h
        },
        66: function (t, e, n) {
            "use strict";
            e.a = {
                "up&down": 0,
                "left&right": 1,
                "4dir": 2,
                "8dir": 3
            }
        },
        67: function (t, e, n) {
            "use strict";
            var i = {};
            e.a = function (t, e, n) {
                switch (void 0 === n ? n = {} : !0 === n && (n = i), n.left = !1, n.right = !1, n.up = !1, n.down = !1, t = (t + 360) % 360, e) {
                    case 0:
                        t < 180 ? n.down = !0 : n.up = !0;
                        break;
                    case 1:
                        t > 90 && t <= 270 ? n.left = !0 : n.right = !0;
                        break;
                    case 2:
                        t > 45 && t <= 135 ? n.down = !0 : t > 135 && t <= 225 ? n.left = !0 : t > 225 && t <= 315 ? n.up = !0 : n.right = !0;
                        break;
                    case 3:
                        t > 22.5 && t <= 67.5 ? (n.down = !0, n.right = !0) : t > 67.5 && t <= 112.5 ? n.down = !0 : t > 112.5 && t <= 157.5 ? (n.down = !0, n.left = !0) : t > 157.5 && t <= 202.5 ? n.left = !0 : t > 202.5 && t <= 247.5 ? (n.left = !0, n.up = !0) : t > 247.5 && t <= 292.5 ? n.up = !0 : t > 292.5 && t <= 337.5 ? (n.up = !0, n.right = !0) : n.right = !0
                }
                return n
            }
        },
        7: function (t, e, n) {
            "use strict";
            var i = n(2);
            e.a = function (t) {
                return Object(i.a)(t) ? t : t.scene && Object(i.a)(t.scene) ? t.scene : t.parent && t.parent.scene && Object(i.a)(t.parent.scene) ? t.parent.scene : void 0
            }
        },
        77: function (t, e, n) {
            "use strict";
            var i = n(44),
                r = n(23);

            function o(t) {
                return (o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
                    return typeof t
                } : function (t) {
                    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
                })(t)
            }

            function s(t, e) {
                for (var n = 0; n < e.length; n++) {
                    var i = e[n];
                    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
                }
            }

            function a(t) {
                if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return t
            }

            function u(t, e, n) {
                return (u = "undefined" != typeof Reflect && Reflect.get ? Reflect.get : function (t, e, n) {
                    var i = function (t, e) {
                        for (; !Object.prototype.hasOwnProperty.call(t, e) && null !== (t = c(t)););
                        return t
                    }(t, e);
                    if (i) {
                        var r = Object.getOwnPropertyDescriptor(i, e);
                        return r.get ? r.get.call(n) : r.value
                    }
                })(t, e, n || t)
            }

            function c(t) {
                return (c = Object.setPrototypeOf ? Object.getPrototypeOf : function (t) {
                    return t.__proto__ || Object.getPrototypeOf(t)
                })(t)
            }

            function h(t, e) {
                return (h = Object.setPrototypeOf || function (t, e) {
                    return t.__proto__ = e, t
                })(t, e)
            }
            var f = Phaser.Utils.Objects.GetValue,
                l = Phaser.Math.Distance.Between,
                p = function (t) {
                    function e(t, n) {
                        var i;
                        ! function (t, e) {
                            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                        }(this, e);
                        var s = a(i = function (t, e) {
                                return !e || "object" !== o(e) && "function" != typeof e ? a(t) : e
                            }(this, c(e).call(this, t, n))),
                            u = {
                                states: {
                                    IDLE: {
                                        enter: function () {
                                            s.stop(), s.tapsCount = 0, s.x = 0, s.y = 0, s.worldX = 0, s.worldY = 0
                                        },
                                        exit: function () {
                                            var t = s.lastPointer;
                                            s.x = t.x, s.y = t.y, s.worldX = t.worldX, s.worldY = t.worldY
                                        }
                                    },
                                    BEGIN: {
                                        enter: function () {
                                            s.start(), s.tapsCount = 0, s.emit("tappingstart", s, s.gameObject, s.lastPointer)
                                        }
                                    },
                                    RECOGNIZED: {
                                        enter: function () {
                                            s.start(), s.emit("tap", s, s.gameObject, s.lastPointer), s.emit("".concat(s.tapsCount, "tap"), s, s.gameObject, s.lastPointer)
                                        }
                                    }
                                },
                                init: function () {
                                    this.state = y
                                },
                                eventEmitter: !1
                            };
                        return i.setRecongizedStateObject(new r.a(u)), i
                    }
                    var n, p, g;
                    return function (t, e) {
                        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
                        t.prototype = Object.create(e && e.prototype, {
                            constructor: {
                                value: t,
                                writable: !0,
                                configurable: !0
                            }
                        }), e && h(t, e)
                    }(e, i["a"]), n = e, (p = [{
                        key: "resetFromJSON",
                        value: function (t) {
                            u(c(e.prototype), "resetFromJSON", this).call(this, t), this.setMaxHoldTime(f(t, "time", 250)), this.setTapInterval(f(t, "tapInterval", 200)), this.setDragThreshold(f(t, "threshold", 9)), this.setTapOffset(f(t, "tapOffset", 10));
                            var n = f(t, "taps", void 0);
                            return void 0 !== n ? this.setTaps(n) : (this.setMaxTaps(f(t, "maxTaps", void 0)), this.setMinTaps(f(t, "minTaps", void 0))), this
                        }
                    }, {
                        key: "onDragStart",
                        value: function () {
                            switch (this.state) {
                                case y:
                                    this.state = v;
                                    break;
                                case v:
                                    var t = this.lastPointer;
                                    l(t.upX, t.upY, t.x, t.y) > this.tapOffset && (this.state = d, this.state = v);
                                    break;
                                case d:
                                    this.state = v
                            }
                        }
                    }, {
                        key: "onDragEnd",
                        value: function () {
                            this.state === v && (this.tapsCount++, this.emit("tapping", this, this.gameObject, this.lastPointer), void 0 !== this.maxTaps && this.tapsCount === this.maxTaps && (this.state = d))
                        }
                    }, {
                        key: "onDrag",
                        value: function () {
                            this.state !== y && this.pointer.getDistance() > this.dragThreshold && (this.state = y)
                        }
                    }, {
                        key: "preUpdate",
                        value: function (t, e) {
                            if (this.state === v) {
                                var n = this.lastPointer;
                                if (n.isDown) t - n.downTime > this.holdTime && (this.state = y);
                                else t - n.upTime > this.tapInterval && (void 0 === this.minTaps || this.tapsCount >= this.minTaps ? this.state = d : this.state = y)
                            }
                        }
                    }, {
                        key: "postUpdate",
                        value: function (t, e) {
                            this.state === d && (this.state = y)
                        }
                    }, {
                        key: "setMaxHoldTime",
                        value: function (t) {
                            return this.holdTime = t, this
                        }
                    }, {
                        key: "setTapInterval",
                        value: function (t) {
                            return this.tapInterval = t, this
                        }
                    }, {
                        key: "setDragThreshold",
                        value: function (t) {
                            return this.dragThreshold = t, this
                        }
                    }, {
                        key: "setTapOffset",
                        value: function (t) {
                            return this.tapOffset = t, this
                        }
                    }, {
                        key: "setMaxTaps",
                        value: function (t) {
                            return this.maxTaps = t, this
                        }
                    }, {
                        key: "setMinTaps",
                        value: function (t) {
                            return this.minTaps = t, this
                        }
                    }, {
                        key: "setTaps",
                        value: function (t, e) {
                            return void 0 === e && (e = t), this.setMinTaps(t).setMaxTaps(e), this
                        }
                    }, {
                        key: "isTapped",
                        get: function () {
                            return this.state === d
                        }
                    }]) && s(n.prototype, p), g && s(n, g), e
                }(),
                y = "IDLE",
                v = "BEGIN",
                d = "RECOGNIZED";
            e.a = p
        },
        78: function (t, e, n) {
            "use strict";
            var i = n(44),
                r = n(23);

            function o(t) {
                return (o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
                    return typeof t
                } : function (t) {
                    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
                })(t)
            }

            function s(t, e) {
                for (var n = 0; n < e.length; n++) {
                    var i = e[n];
                    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
                }
            }

            function a(t) {
                if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return t
            }

            function u(t, e, n) {
                return (u = "undefined" != typeof Reflect && Reflect.get ? Reflect.get : function (t, e, n) {
                    var i = function (t, e) {
                        for (; !Object.prototype.hasOwnProperty.call(t, e) && null !== (t = c(t)););
                        return t
                    }(t, e);
                    if (i) {
                        var r = Object.getOwnPropertyDescriptor(i, e);
                        return r.get ? r.get.call(n) : r.value
                    }
                })(t, e, n || t)
            }

            function c(t) {
                return (c = Object.setPrototypeOf ? Object.getPrototypeOf : function (t) {
                    return t.__proto__ || Object.getPrototypeOf(t)
                })(t)
            }

            function h(t, e) {
                return (h = Object.setPrototypeOf || function (t, e) {
                    return t.__proto__ = e, t
                })(t, e)
            }
            var f = Phaser.Utils.Objects.GetValue,
                l = function (t) {
                    function e(t, n) {
                        var i;
                        ! function (t, e) {
                            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                        }(this, e);
                        var s = a(i = function (t, e) {
                                return !e || "object" !== o(e) && "function" != typeof e ? a(t) : e
                            }(this, c(e).call(this, t, n))),
                            u = {
                                states: {
                                    IDLE: {
                                        enter: function () {
                                            s.x = 0, s.y = 0, s.worldX = 0, s.worldY = 0
                                        },
                                        exit: function () {
                                            var t = s.lastPointer;
                                            s.x = t.x, s.y = t.y, s.worldX = t.worldX, s.worldY = t.worldY
                                        }
                                    },
                                    BEGIN: {
                                        enter: function () {
                                            s.start()
                                        },
                                        exit: function () {
                                            s.stop()
                                        }
                                    },
                                    RECOGNIZED: {
                                        enter: function () {
                                            s.emit("pressstart", s, s.gameObject, s.lastPointer)
                                        },
                                        exit: function () {
                                            s.emit("pressend", s, s.gameObject, s.lastPointer)
                                        }
                                    }
                                },
                                init: function () {
                                    this.state = p
                                },
                                eventEmitter: !1
                            };
                        return i.setRecongizedStateObject(new r.a(u)), i
                    }
                    var n, l, d;
                    return function (t, e) {
                        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
                        t.prototype = Object.create(e && e.prototype, {
                            constructor: {
                                value: t,
                                writable: !0,
                                configurable: !0
                            }
                        }), e && h(t, e)
                    }(e, i["a"]), n = e, (l = [{
                        key: "resetFromJSON",
                        value: function (t) {
                            return u(c(e.prototype), "resetFromJSON", this).call(this, t), this.setDragThreshold(f(t, "threshold", 9)), this.setMinHoldTime(f(t, "time", 251)), this
                        }
                    }, {
                        key: "onDragStart",
                        value: function () {
                            this.state = 0 === this.holdTime ? v : y
                        }
                    }, {
                        key: "onDragEnd",
                        value: function () {
                            this.state = p
                        }
                    }, {
                        key: "onDrag",
                        value: function () {
                            this.state !== p && this.pointer.getDistance() > this.dragThreshold && (this.state = p)
                        }
                    }, {
                        key: "preUpdate",
                        value: function (t, e) {
                            this.state === y && (t - this.pointer.downTime >= this.holdTime && (this.state = v))
                        }
                    }, {
                        key: "setDragThreshold",
                        value: function (t) {
                            return this.dragThreshold = t, this
                        }
                    }, {
                        key: "setMinHoldTime",
                        value: function (t) {
                            return this.holdTime = t, this
                        }
                    }, {
                        key: "isPressed",
                        get: function () {
                            return this.state === v
                        }
                    }]) && s(n.prototype, l), d && s(n, d), e
                }(),
                p = "IDLE",
                y = "BEGIN",
                v = "RECOGNIZED";
            e.a = l
        },
        92: function (t, e, n) {
            "use strict";
            var i = n(63),
                r = n(23);

            function o(t) {
                return (o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
                    return typeof t
                } : function (t) {
                    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
                })(t)
            }

            function s(t, e) {
                for (var n = 0; n < e.length; n++) {
                    var i = e[n];
                    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
                }
            }

            function a(t) {
                if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return t
            }

            function u(t, e, n) {
                return (u = "undefined" != typeof Reflect && Reflect.get ? Reflect.get : function (t, e, n) {
                    var i = function (t, e) {
                        for (; !Object.prototype.hasOwnProperty.call(t, e) && null !== (t = c(t)););
                        return t
                    }(t, e);
                    if (i) {
                        var r = Object.getOwnPropertyDescriptor(i, e);
                        return r.get ? r.get.call(n) : r.value
                    }
                })(t, e, n || t)
            }

            function c(t) {
                return (c = Object.setPrototypeOf ? Object.getPrototypeOf : function (t) {
                    return t.__proto__ || Object.getPrototypeOf(t)
                })(t)
            }

            function h(t, e) {
                return (h = Object.setPrototypeOf || function (t, e) {
                    return t.__proto__ = e, t
                })(t, e)
            }
            var f = Phaser.Utils.Objects.GetValue,
                l = function (t) {
                    function e(t, n) {
                        var i;
                        ! function (t, e) {
                            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                        }(this, e);
                        var s = a(i = function (t, e) {
                                return !e || "object" !== o(e) && "function" != typeof e ? a(t) : e
                            }(this, c(e).call(this, t, n))),
                            u = {
                                states: {
                                    IDLE: {
                                        enter: function () {
                                            s.prevDistance = void 0, s.scaleFactor = 1
                                        }
                                    },
                                    BEGIN: {},
                                    RECOGNIZED: {
                                        enter: function () {
                                            s.emit("pinchstart", s)
                                        },
                                        exit: function () {
                                            s.emit("pinchend", s)
                                        }
                                    }
                                },
                                init: function () {
                                    this.state = p
                                },
                                eventEmitter: !1
                            };
                        return i.setRecongizedStateObject(new r.a(u)), i
                    }
                    var n, l, d;
                    return function (t, e) {
                        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
                        t.prototype = Object.create(e && e.prototype, {
                            constructor: {
                                value: t,
                                writable: !0,
                                configurable: !0
                            }
                        }), e && h(t, e)
                    }(e, i["a"]), n = e, (l = [{
                        key: "resetFromJSON",
                        value: function (t) {
                            return u(c(e.prototype), "resetFromJSON", this).call(this, t), this.setDragThreshold(f(t, "threshold", 0)), this
                        }
                    }, {
                        key: "onDrag2Start",
                        value: function () {
                            this.scaleFactor = 1, this.prevDistance = this.distanceBetween, this.state = 0 === this.dragThreshold ? v : y
                        }
                    }, {
                        key: "onDrag2End",
                        value: function () {
                            this.state = p
                        }
                    }, {
                        key: "onDrag2",
                        value: function () {
                            switch (this.state) {
                                case y:
                                    if (this.pointers[0].getDistance() >= this.dragThreshold && this.pointers[1].getDistance() >= this.dragThreshold) {
                                        var t = this.distanceBetween;
                                        this.scaleFactor = t / this.prevDistance, this.prevDistance = t, this.state = v
                                    }
                                    break;
                                case v:
                                    t = this.distanceBetween;
                                    this.scaleFactor = t / this.prevDistance, this.emit("pinch", this), this.prevDistance = t
                            }
                        }
                    }, {
                        key: "setDragThreshold",
                        value: function (t) {
                            return this.dragThreshold = t, this
                        }
                    }, {
                        key: "isPinch",
                        get: function () {
                            return this.state === v
                        }
                    }]) && s(n.prototype, l), d && s(n, d), e
                }(),
                p = "IDLE",
                y = "BEGIN",
                v = "RECOGNIZED";
            e.a = l
        },
        96: function (t, e, n) {
            "use strict";
            var i = n(44),
                r = n(23),
                o = Phaser.Math.Distance.Between,
                s = Phaser.Math.Angle.Between,
                a = {
                    getDt: function () {
                        return this.scene.sys.game.loop.delta
                    },
                    getVelocity: function () {
                        var t = this.pointer.position,
                            e = this.pointer.prevPosition;
                        return o(e.x, e.y, t.x, t.y) / (.001 * this.getDt())
                    },
                    getVelocityX: function () {
                        var t = this.pointer.position,
                            e = this.pointer.prevPosition;
                        return Math.abs(t.x - e.x) / (.001 * this.getDt())
                    },
                    getVelocityY: function () {
                        var t = this.pointer.position,
                            e = this.pointer.prevPosition;
                        return Math.abs(t.y - e.y) / (.001 * this.getDt())
                    },
                    getVelocityAngle: function () {
                        var t = this.pointer.position,
                            e = this.pointer.prevPosition;
                        return s(e.x, e.y, t.x, t.y)
                    }
                },
                u = n(66),
                c = n(67);

            function h(t) {
                return (h = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
                    return typeof t
                } : function (t) {
                    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
                })(t)
            }

            function f(t, e) {
                for (var n = 0; n < e.length; n++) {
                    var i = e[n];
                    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
                }
            }

            function l(t) {
                if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return t
            }

            function p(t, e, n) {
                return (p = "undefined" != typeof Reflect && Reflect.get ? Reflect.get : function (t, e, n) {
                    var i = function (t, e) {
                        for (; !Object.prototype.hasOwnProperty.call(t, e) && null !== (t = y(t)););
                        return t
                    }(t, e);
                    if (i) {
                        var r = Object.getOwnPropertyDescriptor(i, e);
                        return r.get ? r.get.call(n) : r.value
                    }
                })(t, e, n || t)
            }

            function y(t) {
                return (y = Object.setPrototypeOf ? Object.getPrototypeOf : function (t) {
                    return t.__proto__ || Object.getPrototypeOf(t)
                })(t)
            }

            function v(t, e) {
                return (v = Object.setPrototypeOf || function (t, e) {
                    return t.__proto__ = e, t
                })(t, e)
            }
            var d = Phaser.Utils.Objects.GetValue,
                g = Phaser.Math.RadToDeg,
                b = function (t) {
                    function e(t, n) {
                        var i;
                        ! function (t, e) {
                            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                        }(this, e);
                        var o = l(i = function (t, e) {
                                return !e || "object" !== h(e) && "function" != typeof e ? l(t) : e
                            }(this, y(e).call(this, t, n))),
                            s = {
                                states: {
                                    IDLE: {
                                        enter: function () {
                                            o.x = 0, o.y = 0, o.worldX = 0, o.worldY = 0
                                        },
                                        exit: function () {
                                            var t = o.lastPointer;
                                            o.x = t.x, o.y = t.y, o.worldX = t.worldX, o.worldY = t.worldY
                                        }
                                    },
                                    BEGIN: {
                                        enter: function () {
                                            o.validDrag = !1
                                        }
                                    },
                                    RECOGNIZED: {
                                        enter: function () {
                                            o.start(), o.updateDirectionStates(), o.emit("swipe", o, o.gameObject, o.lastPointer)
                                        },
                                        exit: function () {
                                            o.stop(), o.clearDirectionStates()
                                        }
                                    }
                                },
                                init: function () {
                                    this.state = m
                                },
                                eventEmitter: !1
                            };
                        return i.setRecongizedStateObject(new r.a(s)), i.clearDirectionStates(), i
                    }
                    var n, o, s;
                    return function (t, e) {
                        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
                        t.prototype = Object.create(e && e.prototype, {
                            constructor: {
                                value: t,
                                writable: !0,
                                configurable: !0
                            }
                        }), e && v(t, e)
                    }(e, i["a"]), n = e, (o = [{
                        key: "resetFromJSON",
                        value: function (t) {
                            return p(y(e.prototype), "resetFromJSON", this).call(this, t), this.setDragThreshold(d(t, "threshold", 10)), this.setMinDragVelocity(d(t, "velocityThreshold", 1e3)), this.setDirectionMode(d(t, "dir", "8dir")), this
                        }
                    }, {
                        key: "onDragStart",
                        value: function () {
                            this.state = O
                        }
                    }, {
                        key: "onDragEnd",
                        value: function () {
                            this.state = m
                        }
                    }, {
                        key: "onDrag",
                        value: function () {
                            this.state === O && (this.vaildDrag || (this.vaildDrag = 0 === this.dragThreshold || this.pointer.getDistance() >= this.dragThreshold), this.vaildDrag && this.dragVelocity > this.minDragVelocity && (this.state = w))
                        }
                    }, {
                        key: "postUpdate",
                        value: function (t, e) {
                            this.state === w && (this.state = m)
                        }
                    }, {
                        key: "setDragThreshold",
                        value: function (t) {
                            return this.dragThreshold = t, this
                        }
                    }, {
                        key: "setMinDragVelocity",
                        value: function (t) {
                            return this.minDragVelocity = t, this
                        }
                    }, {
                        key: "setDirectionMode",
                        value: function (t) {
                            return "string" == typeof t && (t = u.a[t]), this.dirMode = t, this
                        }
                    }, {
                        key: "updateDirectionStates",
                        value: function () {
                            var t = g(this.getVelocityAngle());
                            return Object(c.a)(t, this.dirMode, this), this
                        }
                    }, {
                        key: "clearDirectionStates",
                        value: function () {
                            return this.left = !1, this.right = !1, this.up = !1, this.down = !1, this
                        }
                    }, {
                        key: "isSwiped",
                        get: function () {
                            return this.state === w
                        }
                    }, {
                        key: "dragVelocity",
                        get: function () {
                            var t;
                            switch (this.dirMode) {
                                case 0:
                                    t = this.getVelocityY();
                                    break;
                                case 1:
                                    t = this.getVelocityX();
                                    break;
                                default:
                                    t = this.getVelocity()
                            }
                            return t
                        }
                    }]) && f(n.prototype, o), s && f(n, s), e
                }();
            Object.assign(b.prototype, a);
            var m = "IDLE",
                O = "BEGIN",
                w = "RECOGNIZED";
            e.a = b
        }
    }).default
});