import test from "testnow";
import Deferred from '..';

test.group("Deferred", () => {
    test("resolves", () => {
        const d = new Deferred()
        d.resolve(true);
        return d.promise;
    });
    test("rejects", () => {
        const d = new Deferred()
        d.reject();
        return d.promise.catch(e => true);
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
