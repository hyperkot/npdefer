"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var testnow_1 = __importDefault(require("testnow"));
var __1 = __importDefault(require(".."));
testnow_1.default.group("Deferred", function () {
    testnow_1.default("resolves", function () {
        var d = new __1.default();
        d.resolve(true);
        return d.promise;
    });
    testnow_1.default("rejects", function () {
        var d = new __1.default();
        d.reject();
        return d.promise.catch(function (e) { return true; });
    });
});
testnow_1.default.run().then(function (results) {
    if (results.errors.length) {
        results.errors.map(function (err) { return console.error(err); });
        throw new Error("Tests failed!");
    }
    else {
        console.log("All tests passed!");
    }
});
//# sourceMappingURL=index.js.map