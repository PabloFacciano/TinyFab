

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
    capacity: 1,
    timeToAction: 5,
    velocity: 1,
    startLocation: {
        x: 0,
        y: 1
    },
    endLocation: {
        x: 1,
        y: 1
    }
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

