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
        setTimeout(done, 50);

    });
});
/*
test.group("Deferred", () => {
    test("resolves", () => {
        const d = new Deferred();
        d.resolve(true);
        return d.promise;
    });
    test("rejects", () => {
        const d = new Deferred();
        d.reject();
        return d.promise.catch(e => true);
    });
    test("resolves", () => {
        const d = new Deferred();
        d.resolve(true);
        return d.promise;
    });
});


test.run().then(results => {
    if (results.errors.length) {
        results.errors.map(err => console.error(err));
        throw new Error(`Tests failed!`);
    } else {
        console.log(`All tests passed!`);
    }
});
*/
