"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var Predicates_1 = require("./Predicates");
var Option = /** @class */ (function () {
    function Option() {
    }
    /**
     * Smart constructor for Options.
     * Returns None if `element` is `undefined` or fails predicate check.
     *
     * @param element The element to convert to a Option
     * @param predicate Optional predicate to determine if ele is None or Some
     * @return {Option} returns a `None` for all falsy values
     */
    Option.from = function (element, predicate) {
        if (predicate === void 0) { predicate = Predicates_1.Predicates.ANY; }
        if (element !== undefined) {
            return predicate(element) ? new Some(element) : exports.singletonNone;
        }
        else {
            return exports.singletonNone;
        }
    };
    Option.prototype.toString = function () {
        return this.map(function (e) { return "Some(" + e + ")"; }).getOrElse(function () { return 'None'; });
    };
    Option.prototype.map = function (fn) {
        if (this.isSome()) {
            var result = fn(this.get());
            if (result !== undefined) {
                return new Some(result);
            }
        }
        return exports.singletonNone;
    };
    Option.prototype.flatMap = function (fn) {
        return this.match({
            none: function () { return exports.singletonNone; },
            some: function (v) { return fn(v); }
        });
    };
    Option.prototype.getOrElse = function (input) {
        return this.match({
            none: function () { return (typeof input === 'function' ? input() : input); },
            some: function (v) { return v; }
        });
    };
    Option.prototype.orElse = function (input) {
        var _this = this;
        return this.match({
            none: function () { return (typeof input === 'function' ? input() : input); },
            some: function (_) {
                return _this;
            }
        });
    };
    Option.prototype.filter = function (fn) {
        var _this = this;
        return this.match({
            none: function () { return exports.singletonNone; },
            some: function (v) {
                return fn(v) ? _this : exports.singletonNone;
            }
        });
    };
    Option.prototype.isNone = function () {
        return !this._isSome();
    };
    Option.prototype.isSome = function () {
        return this._isSome();
    };
    Option.prototype._isSome = function () {
        return this.match({
            none: function () { return false; },
            some: function (_) { return true; }
        });
    };
    return Option;
}());
exports.Option = Option;
var None = /** @class */ (function (_super) {
    __extends(None, _super);
    function None() {
        return _super.call(this) || this;
    }
    None.prototype.match = function (matcher) {
        if (typeof matcher.none === 'function') {
            return matcher.none();
        }
        else {
            return matcher.none;
        }
    };
    return None;
}(Option));
exports.None = None;
exports.singletonNone = new None();
var Some = /** @class */ (function (_super) {
    __extends(Some, _super);
    function Some(value) {
        var _this = _super.call(this) || this;
        _this.value = value;
        return _this;
    }
    Some.prototype.get = function () {
        return this.value;
    };
    Some.prototype.match = function (matcher) {
        if (typeof matcher.some === 'function') {
            return matcher.some(this.get());
        }
        else {
            return matcher.some;
        }
    };
    return Some;
}(Option));
exports.Some = Some;
