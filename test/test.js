
var assert = require('assert');
var Hexgrid = require('../');
var Hexcell = require('hexcell');

describe('Hexgrid', function () {
  describe('constructor', function () {
    it('should be good', function () {
      var grid = new Hexgrid({
        size: 20
      });
      assert.equal(grid.size, 20);
    });
  });
});