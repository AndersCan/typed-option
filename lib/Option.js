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
var Option = (function () {
    function Option() {
    }
    Option.prototype.map = function (fn) {
        if (this.isSome()) {
            return new Some(fn(this.get()));
        }
        else {
            return new None();
        }
    };
    Option.prototype.flatMap = function (fn) {
        if (this.isSome()) {
            return fn(this.get());
        }
        else {
            return new None();
        }
    };
    Option.prototype.getOrElse = function (fn) {
        if (this.isSome()) {
            return this.get();
        }
        else {
            return fn();
        }
    };
    Option.prototype.orElse = function (fn) {
        if (this.isSome()) {
            return this;
        }
        else {
            return fn();
        }
    };
    Option.prototype.filter = function (fn) {
        if (this.isSome()) {
            if (fn(this.get())) {
                return this;
            }
            else {
                return new None();
            }
        }
        else {
            return this;
        }
    };
    Option.prototype.isNone = function () {
        return !this._isSome();
    };
    Option.prototype.isSome = function () {
        return this._isSome();
    };
    return Option;
}());
exports.Option = Option;
var None = (function (_super) {
    __extends(None, _super);
    function None() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    None.prototype._isSome = function () {
        return false;
    };
    return None;
}(Option));
exports.None = None;
var Some = (function (_super) {
    __extends(Some, _super);
    function Some(value) {
        var _this = _super.call(this) || this;
        _this.value = value;
        return _this;
    }
    Some.prototype._isSome = function () {
        return true;
    };
    Some.prototype.get = function () {
        return this.value;
    };
    return Some;
}(Option));
exports.Some = Some;
