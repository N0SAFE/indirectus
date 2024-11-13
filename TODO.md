add a helper function like select() to change the object to keep
like with the object

```typescript
type object = {
    a: string;
    b: number;
    c: boolean;
    aSub: {
        id: string
    };
    bSub: {
        id: string
    };
    cSub: {
        id: string;
    };
    dSub: {
        id: string;
        subSub: {
            id: string
        }
    };
}

select(object: object, keep: string[]): object

type keep = [
    'a', 
    'aSub',
    {
        bSub: ['id']
    }, 
    'cSub',
    {
        cSub: ['id']
    },
    {
        dSub: ['*']
    }
] // for every subObject selected it has to be an object on the entry object
type returnType = {
    a: string;
    aSub: string;
    bSub: {
        id: string
    };
    cSub: {
        id: string;
    }; // even if it as been also selected on id only ('cSub')
    dSub: {
        id: string;
        subSub: string
    }
}
```

add aggregate options to the safe bindings