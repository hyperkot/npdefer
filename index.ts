
/**
 * The most simple implementation of deferred concept based on native promises.
 * Basically creates a promise and stores resolve/reject handlers internaly.
 * Optionally you may pass an already existing promise to the deferred
 * constructor - this promise will become "basePromise" of the deferred.
 * Deferred "wraps" this "basePromise" - when the basePromise is rejected
 * or resolved the deferred rejects or resolves accordingly but only if it
 * was not already rejected or resolved by it's own means.
 */
class Deferred<T = any> implements PromiseLike<T> {
    constructor(basePromise?: PromiseLike<T>) {
        this._promise = new Promise(
            (
                resolve: (result?: T | PromiseLike<T>) => void,
                reject: (error?: Error | any) => void
            ) => {
                this.resolvePromise = resolve;
                this.rejectPromise = reject;
            }
        );

        if (basePromise) {
            basePromise.then(this.resolve, this.reject);
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
    get status(): Deferred.Status { return this.promiseStatus; }

    /**
     * A status shorthand for this.status === Deferred.Pending
     */
    get isPending() { return this.status === Deferred.Pending; }
    /**
     * A status shorthand for this.status === Deferred.Resolved
     */
    get isResolved() { return this.status === Deferred.Resolved; }
    /**
     * A status shorthand for this.status === Deferred.Rejected
     */
    get isRejected() { return this.status === Deferred.Rejected; }

    /**
     * Resolves underlying native promise. Works the same way as the
     * "resolve" method passed to callback of native promise constructor.
     */
    resolve = (result?: PromiseLike<T> | T) => {
        if (this.status === Deferred.Pending) {
            this.promiseStatus = Deferred.Resolved;
            this.resolvePromise(result);
        }
        return this;
    }

    /**
     * Rejects underlying native promise. Works the same way as the
     * "reject" method passed to callback of native promise constructor.
     * 
     * This method is "bound" and will keep it's context even if passed
     * as a simple variable somewhere.
     */
    reject = (error?: Error | any) => {
        if (this.status === Deferred.Pending) {
            this.promiseStatus = Deferred.Rejected;
            this.rejectPromise(error);
        }
        return this;
    }

    /**
     * Just a shorthand for the "catch" method of the underlying promise
     */
    catch<TR = any>(callback: (err: Error | any) => TR | PromiseLike<TR>): PromiseLike<TR | T> {
        return this.promise.catch(callback);
    }

    /**
     * Just a shorthand for the "then" method of the underlying promise
     */
    then<TR1 = T, TR2 = never>(
        onSucceed?: (res: T) => TR1 | PromiseLike<TR1>,
        onFail?: (err: Error | any) => TR2 | PromiseLike<TR2>)
        : PromiseLike<TR1 | TR2> {
        const d = new Deferred<TR1 | TR2>();
        return this.promise.then(onSucceed, onFail);
    }

    private _promise: Promise<T>;
    private resolvePromise: (result?: T | PromiseLike<T>) => void;
    private rejectPromise: (error?: Error | any) => void;
    private promiseStatus: Deferred.Status = Deferred.Pending;

    static resolve<T>(v: T | PromiseLike<T>) {
        return new Deferred().resolve(v);
    }

    static reject(e: Error | any) {
        return new Deferred().reject(e);
    }
}

namespace Deferred {
    export const Pending = 'pending';
    export const Resolved = 'resolved';
    export const Rejected = 'rejected';

    export type Status = typeof Pending | typeof Resolved | typeof Rejected;
}

export default Deferred;
