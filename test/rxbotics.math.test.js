/**
 * Tests the maths class
 */
var expect = require('chai').expect;
var RxBoticsMath = require('rxbotics').Math;

describe('RxBotics.Math', function() {
	describe('Polyval', function() {
		it('should work order 0', function() {
			expect(RxBoticsMath.polyval([ 3 ], 2)).to.equal(3);
		});
		it('should work order 3', function() {
			expect(RxBoticsMath.polyval([ 2, 4, 5 ], 2)).to.equal(21);
		});
	})

	describe('constrain', function() {
		it('should do nothing to correct value', function() {
			expect(RxBoticsMath.constrain(5, 0, 10)).to.equal(5);
		});
		it('should bound lower numbers', function() {
			expect(RxBoticsMath.constrain(-10, 0, 1)).to.equal(0);
		});
		it('should bound lower numbers', function() {
			expect(RxBoticsMath.constrain(10, 0, 1)).to.equal(1);
		});
	})
});