
/**
 * The most simple implementation of deferred concept based on native promises.
 */
class Deferred<T = any> {
    /**
     * Usually deferred objects are created without arguments. You may pass
     * an argument to create an initially resolved or rejected deferred.
     * If you pass an instance of Error than this deferred will be initialy
     * rejected otherwise it will be initialy resolved
     */
    constructor(resolution?: T | Error) {
        if (arguments.length) {
            this.rejectPromise = Deferred.noop;
            this.resolvePromise = Deferred.noop;
            if (resolution instanceof Error) {
                this._promise = Promise.reject(resolution);
                this.promiseStatus = Deferred.Rejected;
            } else {
                this._promise = Promise.resolve(resolution);
                this.promiseStatus = Deferred.Resolved;
            }
        } else {
            this._promise = new Promise(
                (resolve: (result?: T | PromiseLike<T>) => void, reject: (error?: Error | any) => void) => {
                    this.resolvePromise = resolve;
                    this.rejectPromise = reject;
                }
            );
        }
    }

    /**
     * Returns native promise of this deferred object
     */
    get promise(): Promise<T> {
        return this._promise;
    }

    /**
     * Returns status of this deffered object which directly
     * corresponds to promise status. Possible values are
     * "pending", "resolved", "rejected". However it is better
     * to use constants defined at the end of this file
     * to check for exact status.
     */
    get status(): string { return this.promiseStatus; }

    /**
     * Resolves underlying native promise. Works the same way as the
     * "resolve" method passed to callback of native promise constructor.
     */
    resolve(result?: PromiseLike<T> | T) {
        if (this.status === Deferred.Pending) {
            this.promiseStatus = Deferred.Resolved;
            this.resolvePromise(result);
        }

    }

    /**
     * Rejects underlying native promise. Works the same way as the
     * "reject" method passed to callback of native promise constructor.
     */
    reject(error?: Error | any) {
        if (this.status === Deferred.Pending) {
            this.promiseStatus = Deferred.Rejected;
            this.rejectPromise(error);
        }
    }

    private _promise: Promise<T>;
    private resolvePromise: (result?: T | PromiseLike<T>) => void;
    private rejectPromise: (error?: Error | any) => void;
    private promiseStatus: string = Deferred.Pending;

    private static noop() { }
}

namespace Deferred {
    export const Pending = 'pending';
    export const Resolved = 'resolved';
    export const Rejected = 'rejected';

    export type Status = 'pending' | 'resolved' | 'rejected';
}

export default Deferred;
