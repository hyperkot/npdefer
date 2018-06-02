"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * The most simple implementation of deferred concept based on native promises.
 * Basically creates a promise and stores resolve/reject handlers internaly.
 */
var Deferred = /** @class */ (function () {
    function Deferred() {
        var _this = this;
        /**
         * Resolves underlying native promise. Works the same way as the
         * "resolve" method passed to callback of native promise constructor.
         */
        this.resolve = function (result) {
            if (_this.status === Deferred.Pending) {
                _this.promiseStatus = Deferred.Resolved;
                _this.resolvePromise(result);
            }
            return _this;
        };
        /**
         * Rejects underlying native promise. Works the same way as the
         * "reject" method passed to callback of native promise constructor.
         */
        this.reject = function (error) {
            if (_this.status === Deferred.Pending) {
                _this.promiseStatus = Deferred.Rejected;
                _this.rejectPromise(error);
            }
            return _this;
        };
        this.promiseStatus = Deferred.Pending;
        this._promise = new Promise(function (resolve, reject) {
            _this.resolvePromise = resolve;
            _this.rejectPromise = reject;
        });
    }
    Object.defineProperty(Deferred.prototype, "promise", {
        /**
         * Returns native promise of this deferred object
         */
        get: function () {
            return this._promise;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Deferred.prototype, "status", {
        /**
         * Returns status of this deffered object which directly
         * corresponds to promise status. Possible values are
         * "pending", "resolved", "rejected". However it is better
         * to use constants defined at the end of this file
         * to check for exact status.
         */
        get: function () { return this.promiseStatus; },
        enumerable: true,
        configurable: true
    });
    Deferred.prototype.catch = function (callback) {
        var d = new Deferred();
        this.promise.catch(callback).then(d.resolve, d.reject);
        return d;
    };
    Deferred.prototype.then = function (onSucceed, onFail) {
        var d = new Deferred();
        this.promise.then(onSucceed, onFail).then(d.resolve, d.reject);
        return d;
    };
    Deferred.noop = function () { };
    return Deferred;
}());
(function (Deferred) {
    Deferred.Pending = 'pending';
    Deferred.Resolved = 'resolved';
    Deferred.Rejected = 'rejected';
})(Deferred || (Deferred = {}));
exports.default = Deferred;
//# sourceMappingURL=index.js.map