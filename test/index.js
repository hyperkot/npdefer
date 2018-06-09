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
        chai_1.assert.strictEqual(d.isPending, true, 'isPending=true');
        chai_1.assert.strictEqual(d.isRejected, false, 'isRejected=false');
        chai_1.assert.strictEqual(d.isResolved, false, 'isResolved=false');
    });
    it('correct resolved status and cannot be changed', function () {
        var d = new __1.default();
        d.resolve();
        chai_1.assert.strictEqual(d.status, __1.default.Resolved);
        chai_1.assert.strictEqual(d.isPending, false);
        chai_1.assert.strictEqual(d.isRejected, false);
        chai_1.assert.strictEqual(d.isResolved, true);
        d.reject();
        chai_1.assert.strictEqual(d.status, __1.default.Resolved);
        chai_1.assert.strictEqual(d.isPending, false);
        chai_1.assert.strictEqual(d.isRejected, false);
        chai_1.assert.strictEqual(d.isResolved, true);
    });
    it('correct rejected status', function () {
        var d = new __1.default();
        d.reject();
        chai_1.assert.strictEqual(d.status, __1.default.Rejected);
        chai_1.assert.strictEqual(d.isPending, false);
        chai_1.assert.strictEqual(d.isRejected, true);
        chai_1.assert.strictEqual(d.isResolved, false);
        d.resolve();
        chai_1.assert.strictEqual(d.status, __1.default.Rejected);
        chai_1.assert.strictEqual(d.isPending, false);
        chai_1.assert.strictEqual(d.isRejected, true);
        chai_1.assert.strictEqual(d.isResolved, false);
        d.catch(function (x) { return x; });
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
        // This is to check that nothing asynchronous happens
        setTimeout(done, 0);
    });
    it('may wrap another promise', function (done) {
        var testValue = 4234;
        var d = new __1.default(new Promise(function (resolve, reject) {
            resolve(testValue);
        }));
        d.then(function (val) { return chai_1.assert.equal(val, testValue); }).then(done);
    });
    it('may resolve before and independently of wrapped promise', function (done) {
        var testValue = 42345454;
        var d = new __1.default(new Promise(function (resolve, reject) {
            setTimeout(function () {
                reject();
                d.reject();
                chai_1.assert.strictEqual(d.status, __1.default.Resolved);
                chai_1.assert.strictEqual(d.isPending, false, 'isPending=false');
                chai_1.assert.strictEqual(d.isRejected, false, 'isRejected=false');
                chai_1.assert.strictEqual(d.isResolved, true, 'isResolved=true');
                done();
            }, 0);
        }));
        d.resolve(testValue);
    });
});
//# sourceMappingURL=index.js.map