/**
 * The most simple implementation of deferred concept based on native promises.
 * Basically creates a promise and stores resolve/reject handlers internaly.
 * Optionally you may pass an already existing promise to the deferred
 * constructor - this promise will become "basePromise" of the deferred.
 * Deferred "wraps" this "basePromise" - when the basePromise is rejected
 * or resolved the deferred rejects or resolves accordingly but only if it
 * was not already rejected or resolved by it's own means.
 */
declare class Deferred<T = any> implements PromiseLike<T> {
    constructor(basePromise?: PromiseLike<T>);
    /**
     * Returns native promise of this deferred object
     */
    readonly promise: Promise<T>;
    /**
     * Returns status of this deffered object which directly
     * corresponds to promise status. Possible values are
     * "pending", "resolved", "rejected". However it is better
     * to use constants defined at the end of this file
     * to check for exact status.
     */
    readonly status: Deferred.Status;
    /**
     * A status shorthand for this.status === Deferred.Pending
     */
    readonly isPending: boolean;
    /**
     * A status shorthand for this.status === Deferred.Resolved
     */
    readonly isResolved: boolean;
    /**
     * A status shorthand for this.status === Deferred.Rejected
     */
    readonly isRejected: boolean;
    /**
     * Resolves underlying native promise. Works the same way as the
     * "resolve" method passed to callback of native promise constructor.
     */
    resolve: (result?: T | PromiseLike<T>) => this;
    /**
     * Rejects underlying native promise. Works the same way as the
     * "reject" method passed to callback of native promise constructor.
     *
     * This method is "bound" and will keep it's context even if passed
     * as a simple variable somewhere.
     */
    reject: (error?: any) => this;
    /**
     * Just a shorthand for the "catch" method of the underlying promise
     */
    catch<TR = any>(callback: (err: Error | any) => TR | PromiseLike<TR>): PromiseLike<TR | T>;
    /**
     * Just a shorthand for the "then" method of the underlying promise
     */
    then<TR1 = T, TR2 = never>(onSucceed?: (res: T) => TR1 | PromiseLike<TR1>, onFail?: (err: Error | any) => TR2 | PromiseLike<TR2>): PromiseLike<TR1 | TR2>;
    private _promise;
    private resolvePromise;
    private rejectPromise;
    private promiseStatus;
    static resolve<T>(v: T | PromiseLike<T>): Deferred<any>;
    static reject(e: Error | any): Deferred<any>;
}
declare namespace Deferred {
    const Pending = "pending";
    const Resolved = "resolved";
    const Rejected = "rejected";
    type Status = typeof Pending | typeof Resolved | typeof Rejected;
}
export default Deferred;
