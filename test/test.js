
var assert = require('assert');
var Hexgrid = require('../');
var Hexcell = require('hexcell');

function objEqual (obj1, obj2) {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}

describe('Hexgrid', function () {
  describe('constructor', function () {
    it('should be good', function () {
      var grid = new Hexgrid({
        size: 20
      });
      assert.equal(grid.size, 20);
    });
  });

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
});