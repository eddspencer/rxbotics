/**
 * Tests the maths class
 */
var expect = require('chai').expect;
var RxBotics = require('rxbotics');

describe('RxBotics.Math', function() {
	describe('Polyval', function() {
		it('should work order 0', function() {
			expect(RxBotics.Math.polyval([ 3 ], 2)).to.equal(3);
		});
		it('should work order 3', function() {
			expect(RxBotics.Math.polyval([ 2, 4, 5 ], 2)).to.equal(21);
		});
	})
});