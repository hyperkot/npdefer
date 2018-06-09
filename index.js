"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * The most simple implementation of deferred concept based on native promises.
 * Basically creates a promise and stores resolve/reject handlers internaly.
 * Optionally you may pass an already existing promise to the deferred
 * constructor - this promise will become "basePromise" of the deferred.
 * Deferred "wraps" this "basePromise" - when the basePromise is rejected
 * or resolved the deferred rejects or resolves accordingly but only if it
 * was not already rejected or resolved by it's own means.
 */
var Deferred = /** @class */ (function () {
    function Deferred(basePromise) {
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
         *
         * This method is "bound" and will keep it's context even if passed
         * as a simple variable somewhere.
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
        if (basePromise) {
            basePromise.then(this.resolve, this.reject);
        }
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
    Object.defineProperty(Deferred.prototype, "isPending", {
        /**
         * A status shorthand for this.status === Deferred.Pending
         */
        get: function () { return this.status === Deferred.Pending; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Deferred.prototype, "isResolved", {
        /**
         * A status shorthand for this.status === Deferred.Resolved
         */
        get: function () { return this.status === Deferred.Resolved; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Deferred.prototype, "isRejected", {
        /**
         * A status shorthand for this.status === Deferred.Rejected
         */
        get: function () { return this.status === Deferred.Rejected; },
        enumerable: true,
        configurable: true
    });
    /**
     * Just a shorthand for the "catch" method of the underlying promise
     */
    Deferred.prototype.catch = function (callback) {
        return this.promise.catch(callback);
    };
    /**
     * Just a shorthand for the "then" method of the underlying promise
     */
    Deferred.prototype.then = function (onSucceed, onFail) {
        var d = new Deferred();
        return this.promise.then(onSucceed, onFail);
    };
    Deferred.resolve = function (v) {
        return new Deferred().resolve(v);
    };
    Deferred.reject = function (e) {
        return new Deferred().reject(e);
    };
    return Deferred;
}());
(function (Deferred) {
    Deferred.Pending = 'pending';
    Deferred.Resolved = 'resolved';
    Deferred.Rejected = 'rejected';
})(Deferred || (Deferred = {}));
exports.default = Deferred;
//# sourceMappingURL=index.js.map