"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * The most simple implementation of deferred concept based on native promises.
 * Basically creates a promise and stores resolve/reject handlers internaly.
 */
var Deferred = /** @class */ (function () {
    function Deferred() {
        var _this = this;
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
    /**
     * Resolves underlying native promise. Works the same way as the
     * "resolve" method passed to callback of native promise constructor.
     */
    Deferred.prototype.resolve = function (result) {
        if (this.status === Deferred.Pending) {
            this.promiseStatus = Deferred.Resolved;
            this.resolvePromise(result);
        }
        return this;
    };
    /**
     * Rejects underlying native promise. Works the same way as the
     * "reject" method passed to callback of native promise constructor.
     */
    Deferred.prototype.reject = function (error) {
        if (this.status === Deferred.Pending) {
            this.promiseStatus = Deferred.Rejected;
            this.rejectPromise(error);
        }
        return this;
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