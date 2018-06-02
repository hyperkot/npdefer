
/**
 * The most simple implementation of deferred concept based on native promises.
 * Basically creates a promise and stores resolve/reject handlers internaly.
 */
class Deferred<T = any> implements PromiseLike<T> {
    constructor() {
        this._promise = new Promise(
            (
                resolve: (result?: T | PromiseLike<T>) => void,
                reject: (error?: Error | any) => void
            ) => {
                this.resolvePromise = resolve;
                this.rejectPromise = reject;
            }
        );
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
    resolve = (result?: PromiseLike<T> | T) => {
        if (this.status === Deferred.Pending) {
            this.promiseStatus = Deferred.Resolved;
            this.resolvePromise(result);
        }
        return this;
    }

    catch<T2 = any>(callback: (err: Error | any) => T2 | PromiseLike<T2>): Deferred<T2> {
        const d = new Deferred();
        this.promise.catch(callback).then(d.resolve, d.reject);
        return d;
    }

    then<TR1 = T, TR2 = never>(
        onSucceed?: (res: T) => TR1 | PromiseLike<TR1>,
        onFail?: (err: Error | any) => TR2 | PromiseLike<TR2>)
        : Deferred<TR1 | TR2> {
        const d = new Deferred<TR1 | TR2>();
        this.promise.then(onSucceed, onFail).then(d.resolve, d.reject);
        return d;
    }

    /**
     * Rejects underlying native promise. Works the same way as the
     * "reject" method passed to callback of native promise constructor.
     */
    reject = (error?: Error | any) => {
        if (this.status === Deferred.Pending) {
            this.promiseStatus = Deferred.Rejected;
            this.rejectPromise(error);
        }
        return this;
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
