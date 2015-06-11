/**
 * Tests the maths class
 */
QUnit.module('RxBoticsMath');

QUnit.test('Polyval test order 0', function(assert) {
	assert.equal(RxBotics.Math.polyval([ 3 ], 2), 3);
});

QUnit.test('Polyval test order 3', function(assert) {
	assert.equal(RxBotics.Math.polyval([ 2, 4, 5 ], 2), 21);
});
