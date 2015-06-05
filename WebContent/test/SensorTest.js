/**
 * Tests the sensor class, mapping the input of the sensors to correct values
 */
QUnit.module('Sensor');

var Observable = Rx.Observable;
var TestScheduler = Rx.TestScheduler;
var onNext = Rx.ReactiveTest.onNext;
var onError = Rx.ReactiveTest.onError;
var onCompleted = Rx.ReactiveTest.onCompleted;

function testSensorInitialied(assert, sensor, expectedReading) {

	assert.equal(0, sensor.position.x);
	assert.equal(1, sensor.position.y);
	assert.equal(2, sensor.direction.x);
	assert.equal(3, sensor.direction.y);

	assert.equal(expectedReading, sensor.currentReading(), "Dummy sensor always returns " + expectedReading);
}

QUnit.test('Sensor simple', function(assert) {
	var sensor = new Sensor(0, 1, 2, 3);
	testSensorInitialied(assert, sensor, 0);
});

QUnit.test('IRSensor simple', function(assert) {
	var sensor = new IRSensor(0, 1, 2, 3);
	testSensorInitialied(assert, sensor, 99);
});