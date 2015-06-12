/**
 * Tests the sensor class, mapping the input of the sensors to correct values
 */
var expect = require('chai').expect;
var RxBotics = require('rxbotics');

function testSensorInitialied(sensor, expectedReading) {
	expect(sensor.position.x).equals(0);
	expect(sensor.position.y).equals(1);
	expect(sensor.direction.x).equals(2);
	expect(sensor.direction.y).equals(3);

	expect(sensor.currentReading()).equals(expectedReading);
}

describe('RxBotics.Sensor', function() {
	it('should work', function() {
		var sensor = new RxBotics.Sensor({
			x : 0,
			y : 1,
			dx : 2,
			dy : 3,
			calibration : [ 42 ]
		});
		testSensorInitialied(sensor, 42);
	});
});
