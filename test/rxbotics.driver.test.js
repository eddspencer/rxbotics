/**
 * Tests the driver class, responding to events in the system
 */
var expect = require('chai').expect;
var RxBotics = require('rxbotics');

var Driver = RxBotics.Driver;
var Mock = RxBotics.Mock;

describe('RxBotics.Driver', function() {
	var state = {};

	var leftMotor = new Mock.Motor();
	var rightMotor = new Mock.Motor();
	var driver = new Driver({
		leftMotor : leftMotor,
		rightMotor : rightMotor
	});

	it('should start', function() {
		driver.go();
		expect(leftMotor.speed).to.equal(0.5);
		expect(rightMotor.speed).to.equal(0.5);
	});

	it('should stop', function() {
		driver.stop();
		expect(leftMotor.speed).to.equal(0);
		expect(rightMotor.speed).to.equal(0);
	});
});
