var assert = require("assert");
var _ = require('underscore');
describe('UnderscoreJS', function() {
  describe('operations on arrays', function() {
    describe('map', function() {
      it('should apply function to each of the elements in the input array and return a transformed array', function() {
        var input = [1, 2, 3, 4];
        var expected = [2, 4, 6, 8];
        assert.deepEqual(expected, _.map(input, function(a) {
          return a * 2;
        }));
      });
    });
  });
});
