/**
 * Tests the driver class, responding to events in the system
 */
var expect = require('chai').expect;
var RxBotics = require('rxbotics');
var Driver = RxBotics.Driver;

describe('RxBotics.Driver', function() {
	var state = {};
	var driver = new Driver(state);

	it('should start', function() {
		driver.go();
		expect(state.moving).equals(true);
	});
	
	it('should stop', function() {
		driver.stop();
		expect(state.moving).equals(false);
	});
});
