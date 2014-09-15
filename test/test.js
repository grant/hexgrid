
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

  // Hexgrid.add
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

  // Hexcell.remove
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

  // Hexcell.isEmpty
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
});