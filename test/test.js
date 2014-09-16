
var assert = require('assert');
var Hexgrid = require('../');
var Hexcell = require('hexcell');

function objEqual (obj1, obj2) {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}

describe('Hexgrid', function () {
  // Hexgrid()
  describe('constructor', function () {
    it('should be good', function () {
      var grid = new Hexgrid({
        size: 20
      });
      assert.equal(grid.size, 20);
    });
  });

  // Hexgrid.add(hexcell)
  describe('add', function () {
    it('should add hexcells to the grid', function () {
      var grid = new Hexgrid();
      grid.add(new Hexcell(new Point(0, 0), { data: 'cell1' }));
      assert(objEqual(grid.get(new Point(0, 0)).data, { data: 'cell1' }));
    });

    it('should replace existing hexcells', function () {
      var grid = new Hexgrid();
      grid.add(new Hexcell(new Point(), { data: 'cell1' }));
      grid.add(new Hexcell(new Point(), { data: 'cell2' }));
      assert(objEqual(grid.get(new Point(0, 0)).data, { data: 'cell2' }));
    });
  });

  // Hexcell.remove(point)
  describe('remove', function () {
    it('should remove properly', function () {
      var grid = new Hexgrid();
      grid.add(new Hexcell(new Point()));
      grid.remove(new Hexcell(new Point()));
      assert(grid.isEmpty(new Point()));
    });

    it('should not blow up if we try to remove a cell that is empty', function () {
      var grid = new Hexgrid();
      grid.remove(new Point());
    });
  });

  // Hexcell.isEmpty(point)
  describe('isEmpty', function () {
    it('should be true when there is no hexagon at a cell', function () {
      var grid = new Hexgrid();
      assert(grid.isEmpty(new Point()));
    });

    it('should be false when there is a hexagon at a cell', function () {
      var grid = new Hexgrid();
      grid.add(new Hexcell(new Point()));
      assert(!grid.isEmpty(new Point()));
    });
  });

  // Hexcell.getXY(point)
  describe('description', function () {
    it('should use the grid\'s origin', function () {
      var grid = new Hexgrid({
        size: 100,
        origin: new Point(33, 44)
      });
      grid.add(new Hexcell(new Point()));
      var expected = new Point(33 - (100 * Math.sqrt(3)/2), 44 - 100);
      assert(grid.getXY(new Point()).equals(expected));
    });

    it('should have proper x offset', function () {
      var grid = new Hexgrid({
        size: 100
      });
      grid.add(new Hexcell(new Point(10, 0)));
      var x = 100 * 2 * 10 - (100 * Math.sqrt(3)/2);
      var y = -100;
      assert(grid.getXY(new Point(10, 0)).equals(x, y));
    });

    it('should have proper y offset', function () {
      var grid = new Hexgrid({
        size: 100
      });
      grid.add(new Hexcell(new Point(0, 10)));
      var width = 100 * Math.sqrt(3);
      var x = 10 * (width/2) - (width/2);
      var y = 10 * 2 * 100 - 100;
      assert(grid.getXY(new Point(0, 10)).equals(x, y));
    });
  });

  // Hexcell.getHexcells()
  describe('getHexcells', function () {
    it('should get all cells', function () {
      var grid = new Hexgrid();
      grid.add(new Hexcell(new Point()));
      assert.equal(grid.getHexcells().length, 1);
    });

    it('shouldn\'t get cells that have been removed', function () {
      var grid = new Hexcell();
      grid.add(new Hexcell(new Point()));
      grid.remove(new Point());
      assert.equal(grid.getHexcells().length, 0);
    });
  });
});