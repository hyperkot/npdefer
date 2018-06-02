"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = __importDefault(require(".."));
var source_map_support_1 = require("source-map-support");
source_map_support_1.install();
var chai_1 = require("chai");
describe('Deferred', function () {
    it('resolve(): resolves the promise', function () {
        var d = new __1.default();
        d.resolve(true);
        return d.promise;
    });
    it('initially pending status', function () {
        var d = new __1.default();
        chai_1.assert.strictEqual(d.status, __1.default.Pending);
    });
    it('resolve(): passes arg correctly', function (done) {
        var d = new __1.default();
        var testData = {};
        d.resolve(testData).promise.then(function (r) {
            chai_1.assert.strictEqual(r, testData);
            done();
        }).catch(done);
    });
    it('reject(): rejects the promise with correct arg', function (done) {
        var d = new __1.default();
        var testError = new Error('test');
        d.reject(testError);
        ;
        d.promise.then(function () {
            done('not failed!');
        }).catch(function (error) {
            chai_1.assert.strictEqual(error, testError);
            chai_1.assert.strictEqual(d.status, __1.default.Rejected);
            done();
        });
    });
    it('will not resolve twice or fail after resolving', function (done) {
        var d = new __1.default();
        var a = {}, b = {}, c = new Error('test');
        var count = 0;
        d.promise.then(function (x) {
            count++;
            chai_1.assert.strictEqual(count, 1);
            chai_1.assert.strictEqual(x, a);
        }).catch(done);
        d.resolve(a);
        d.resolve(b);
        d.reject(c);
        chai_1.assert.strictEqual(d.status, __1.default.Resolved);
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
//# sourceMappingURL=index.js.map