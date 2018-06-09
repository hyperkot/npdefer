import Deferred from '..';
import { install } from "source-map-support";
install();

import { assert } from 'chai';

describe('Deferred', function () {
    it('resolve(): resolves the promise', function () {
        const d = new Deferred();
        d.resolve(true);
        return d.promise;
    });
    it('initially pending status', function () {
        const d = new Deferred();
        assert.strictEqual(d.status, Deferred.Pending);
        assert.strictEqual(d.isPending, true, 'isPending=true');
        assert.strictEqual(d.isRejected, false, 'isRejected=false');
        assert.strictEqual(d.isResolved, false, 'isResolved=false');
    });
    it('correct resolved status and cannot be changed', function () {
        const d = new Deferred();
        d.resolve();
        assert.strictEqual(d.status, Deferred.Resolved);
        assert.strictEqual(d.isPending, false);
        assert.strictEqual(d.isRejected, false);
        assert.strictEqual(d.isResolved, true);
        d.reject();
        assert.strictEqual(d.status, Deferred.Resolved);
        assert.strictEqual(d.isPending, false);
        assert.strictEqual(d.isRejected, false);
        assert.strictEqual(d.isResolved, true);
    });
    it('correct rejected status', function () {
        const d = new Deferred();
        d.reject();
        assert.strictEqual(d.status, Deferred.Rejected);
        assert.strictEqual(d.isPending, false);
        assert.strictEqual(d.isRejected, true);
        assert.strictEqual(d.isResolved, false);
        d.resolve();
        assert.strictEqual(d.status, Deferred.Rejected);
        assert.strictEqual(d.isPending, false);
        assert.strictEqual(d.isRejected, true);
        assert.strictEqual(d.isResolved, false);
        d.catch(x => x) 
    });
    it('resolve(): passes arg correctly', function (done: MochaDone) {
        const d = new Deferred();
        const testData = {};
        d.resolve(testData).promise.then(r => {
            assert.strictEqual(r, testData);
            done();
        }).catch(done);
    });
    it('reject(): rejects the promise with correct arg', function (done) {
        const d = new Deferred();
        const testError = new Error('test');
        d.reject(testError);;
        d.promise.then(() => {
            done('not failed!');
        }).catch(error => {
            assert.strictEqual(error, testError);
            assert.strictEqual(d.status, Deferred.Rejected);
            done();
        });
    });
    it('will not resolve twice or fail after resolving', function (done) {
        const d = new Deferred();
        const a = {}, b = {}, c = new Error('test');
        let count = 0;
        d.promise.then(x => {
            count++;
            assert.strictEqual(count, 1);
            assert.strictEqual(x, a);
        }).catch(done);
        d.resolve(a);
        d.resolve(b);
        d.reject(c);
        assert.strictEqual(d.status, Deferred.Resolved);
        // This is to check that nothing asynchronous happens
        setTimeout(done, 0);
    });
    it('may wrap another promise', function (done) {
        const testValue = 4234;
        const d = new Deferred(new Promise((resolve, reject) => {
            resolve(testValue);
        }));
        d.then(val => assert.equal(val, testValue)).then(done);
    });
    it(
        'may resolve before and independently of wrapped promise',
        function (done) {
            const testValue = 42345454;
            const d = new Deferred(new Promise((resolve, reject) => {
                setTimeout(() => {
                    reject();
                    d.reject();
                    assert.strictEqual(d.status, Deferred.Resolved);
                    assert.strictEqual(d.isPending, false, 'isPending=false');
                    assert.strictEqual(d.isRejected, false, 'isRejected=false');
                    assert.strictEqual(d.isResolved, true, 'isResolved=true');
                    done();
                }, 0);
            }));
            d.resolve(testValue);
        });
});
