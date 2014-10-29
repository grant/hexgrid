# hexgrid

A hexagonal grid layout. This prototype is flexible abstraction layer for hexagaonal grids.

```js
npm install hexgrid --save
```

Uses axial/trapezoidal coordinate space with pointy-top hexagons
- Increasing x goes right
- Increasing y goes bottom right

## Examples

```js
// Init the hexgrid
var Hexgrid = require('hexgrid');
var grid = new Hexgrid({
  size: 20
});

// Add a hexagon cell
var firstCellPoint = new Point(1, 2);
var firstCell = new Hexcell(firstCellPoint);
grid.add(firstCell);
```

## Methods

### Hexgrid.add()
### Hexgrid.remove()
### Hexgrid.get()
### Hexgrid.getXY()
### Hexgrid.isEmpty()
### Hexgrid.getHexcells()