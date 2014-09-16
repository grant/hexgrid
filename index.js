
var Point = require('point2d');

/**
 * A hexagonal grid layout
 * Uses axial/trapezoidal coordinate space with pointy-top hexagons
 * - Increasing x goes right
 * - Increasing y goes bottom right
 * @param {Object} options Extra options
 */
function Hexgrid (options) {
  options = options || {};
  // The distance between the center of a hexagon and a corner in pixels
  this.size = options.size || 100;
  // The displacement of the Hexgrid. By default this is (0,0) and represents the center of the hexcell at (0,0)
  this.origin = options.origin || new Point();

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

  // Where all the hexagons are stored
  this._grid = {};
}

Hexgrid.prototype = {
  /**
   * Adds a hexagon to the grid. If the grid already has a hexagon there, it replaces the hexagon
   * @param {Hexcell} hexcell The new hexagon cell
   */
  add: function (hexcell) {
    // add row if doesn't exist
    var row = this._grid[hexcell.point.y];
    if (!row) {
      this._grid[hexcell.point.y] = {};
    }
    
    // add hexagon to row
    this._grid[hexcell.point.y][hexcell.point.x] = hexcell;
  },

  /**
   * Removes a hexcell at a point
   * @param {Point} point The point to remove the cell from
   */
  remove: function (point) {
    if (this._grid[point.y]) {
      delete this._grid[point.y][point.x];
    }
  },

  /**
   * Gets the hexcell at a point
   * @param {Point} point The point to get the cell at
   * @returns {Hexcell} The cell at this point
   */
  get: function (point) {
    if (!this.isEmpty(point)) {
      return this._grid[point.y][point.x];
    }
  },

  /**
   * Gets the center of the hexcell as a Cartesian point.
   * Translates the hexcell's axial coordinate system point to Cartesian.
   * @param {Point} hexcell The point of the hexcell
   * @returns {Point} The center of the hexcell
   */
  getXY: function (point) {
    var x = (point.x * this._horiSpacing) + (point.y * this._horiSpacing * 0.5);
    x += this.origin.x - (this._width * 0.5);
    var y = (point.y * this._vertSpacing);
    y += this.origin.y - (this._height * 0.5);
    var xy = new Point(x, y);
    return xy;
  },

  /**
   * Returns true if the grid is empty at the given point
   * @param {Point} point The point to check
   * @returns {Boolean} True if the cell is empty
   */
  isEmpty: function (point) {
    var row = this._grid[point.y];
    return !row || !row[point.x];
  },

  /**
   * Gets all the hexcells in an array
   * @returns {Hexcell[]} An array of hexcells
   */
  getHexcells: function () {
    var cells = [];
    for (var rowIndex in this._grid) {
      var row = this._grid[rowIndex];
      for (var columnIndex in row) {
        var column = this._grid[rowIndex][columnIndex];
        cells.push(column);
      }
    }
    return cells;
  }
};

module.exports = Hexgrid;