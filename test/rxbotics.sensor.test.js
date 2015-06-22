/**
 * Tests the sensor class, mapping the input of the sensors to correct values
 */
var expect = require('chai').expect;
var RxBotics = require('rxbotics');

describe('RxBotics.Sensor', function() {
	var sensor = new RxBotics.Sensor({
		id: 'Test1',
		x : 0,
		y : 1,
		theta : 2,
		calibration : [ 42 ]
	});

	it('should get initialised correctly', function() {
		expect(sensor.position.x).equals(0);
		expect(sensor.position.y).equals(1);
		expect(sensor.theta).equals(2);

		expect(sensor.currentReading()).equals(42);
	});

	it('should return correct state', function() {
		expect(sensor.currentState()).deep.to.equal({
			id : sensor.id,
			x : sensor.position.x,
			y : sensor.position.y,
			theta : sensor.theta,
			distance : sensor.calibration[0]
		});
	});

});
