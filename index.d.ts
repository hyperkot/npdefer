/**
 * The most simple implementation of deferred concept based on native promises.
 * Basically creates a promise and stores resolve/reject handlers internaly.
 */
declare class Deferred<T = any> {
    constructor();
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
    resolve(result?: PromiseLike<T> | T): this;
    /**
     * Rejects underlying native promise. Works the same way as the
     * "reject" method passed to callback of native promise constructor.
     */
    reject(error?: Error | any): this;
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
