/**
 * The most simple implementation of deferred concept based on native promises.
 */
declare class Deferred<T = any> {
    /**
     * Usually deferred objects are created without arguments. You may pass
     * an argument to create an initially resolved or rejected deferred.
     * If you pass an instance of Error than this deferred will be initialy
     * rejected otherwise it will be initialy resolved
     */
    constructor(resolution?: T | Error);
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
    readonly status: string;
    /**
     * Resolves underlying native promise. Works the same way as the
     * "resolve" method passed to callback of native promise constructor.
     */
    resolve(result?: PromiseLike<T> | T): void;
    /**
     * Rejects underlying native promise. Works the same way as the
     * "reject" method passed to callback of native promise constructor.
     */
    reject(error?: Error | any): void;
    private _promise;
    private resolvePromise;
    private rejectPromise;
    private promiseStatus;
    private static noop();
}
declare namespace Deferred {
    const Pending = "pending";
    const Resolved = "resolved";
    const Rejected = "rejected";
    type Status = 'pending' | 'resolved' | 'rejected';
}
export default Deferred;
