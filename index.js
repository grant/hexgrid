
/**
 * A hexagonal grid layout
 * Uses axial/trapezoidal coordinate space with pointy-top hexagons
 * @param {Object} options Extra options
 */
function Hexgrid (options) {
  // The distance between the center of a hexagon and a corner 
  this.size = options.size;

  // Derived properties
  // 
  // height: The height of a hexagon
  // width: The width of a hexagon
  // vertSpacing: The vertical spacing between hexagons
  // horiSpacing: The horizontal spacing between hexagons
  this._height = this.size * 2;
  this._width = (Math.sqrt(3) / 2) * this._height;
  this._vertSpacing = (3/4) * this._height;
  this._horiSpacing = this._width;

  this._grid = {};
}

Hexgrid.prototype = {
  /**
   * Adds a hexagon to the grid. If the grid already has a hexagon there, it replaces the hexagon
   * @param {Hexcell} hexcell The new hexagon cell
   */
  add: function (hexcell) {
    // add row if doesn't exist
    var row = this.grid[hexcell.point.y];
    if (!row) {
      this.grid[hexcell.point.y] = {};
    }
    
    // add hexagon to row
    this.grid[hexcell.point.y][hexcell.point.x] = hexcell;
  },

  /**
   * Returns true if the grid is empty at the given point
   * @param {Point} point The point to check
   * @returns {Boolean} True if the cell is empty
   */
  isEmpty: function (point) {
    var row = this.grid[point.y];
    return !row || !row[point.x];
  }
};

module.exports = Hexgrid;