Most straight-forward and simple implementation of
'Deferred Object' concept based on native promises

# install
```bash
npm install --save npdefer
```

# usage
```typescript
    import Deferred from 'npdefer';

    const processExit = new Deferred();

    process.on('close', () => {
        processExit.resolve("bye");
    });

    processExit.promise.then(message => {
        console.log(message);
    })
```
