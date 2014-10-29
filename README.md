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

### Hexgrid.add(hexcell)
Adds a cell to the grid

### Hexgrid.remove(point2d)
Removes a grid cell at `point2d`

### Hexgrid.get(point2d)
Gets a hexcell at `point2d`

### Hexgrid.getXY(point2d)
Gets the calculated x and y (based on the hexagonal grid) of a point

### Hexgrid.isEmpty(point2d)
Returns true if there is no hexcell at `point2d`

### Hexgrid.getHexcells()
Returns an array of all hexcells