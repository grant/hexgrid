
var assert = require('assert');
var Hexgrid = require('../');

describe('Hexgrid', function () {
  describe('constructor', function () {
    it('should be good', function () {
      var grid = new Hexgrid({
        size: 2
      });
    });
  });
});