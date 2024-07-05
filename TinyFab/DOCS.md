

## Data Structure

```
world = Array[20,20]

world[x,y] = {
    type: 'none',
    terrain: 'plain',
    properties: {
        ...
    }
}
```


terrain: `plain`, `mountain`, `water`



## Block types and properties

### nature
```
{
    resource: 'tree',
    generation: {
        time: 2,
        quantity: 3
    },
    capacity: 10
}
```

resource: `tree`, `rock`

### transport
```
{
    transport: 'truck',
    in: {
        capacity: 5,
        location: {
            x: 0,
            y: 1
        }
    },
    out: {
        location: {
            x: 1,
            y: 1
        }
    },
    items: {
        tree: 2,
        rock: 3
        // contains dynamic items, max: capacity
    },
    status: 'standby',
    velocity: 1 // tiles per tick
}
```

transport: `helicopter`, `truck`, `boat`, `portal`

### storage
```
{
    storage: 'classic',
    capacity: 1
}
```

storage: `heliport`, `parking`, `dock`, `market`, `classic`

### building
```
{
    building: ''
}
```

building: `office`, `science`

### operations
```
{
    operation: 'fab',
    capacity: 10,
    result: ''
    requiredObject: [],
    time: 3
}
```

operation: `fab`, `miner`, `trasher`

result: \<object\> `none`, `diamond`, `wood`

requiredObject: [ \<object\> ] / any

