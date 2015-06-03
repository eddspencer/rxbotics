/**
 * Tests the behaviour class, mapping the input of the sensors to correct state
 */
// TODO comment in QUnit?
QUnit.module('Behaviour');

var Observable = Rx.Observable;
var TestScheduler = Rx.TestScheduler;
var onNext = Rx.ReactiveTest.onNext;
var onError = Rx.ReactiveTest.onError;
var onCompleted = Rx.ReactiveTest.onCompleted;

function createSensorReadings(scheduler, sensorReadings) {
	var time = 100;
	var step = 50;
	var values = sensorReadings.map(function(reading) {
		var value = onNext(time, reading);
		time += step;
		return value;
	});
	values.push(onCompleted(time));

	var xs = scheduler.createColdObservable(values);
	return xs;
}

function createResults(scheduler, xs) {
	var results = scheduler.startWithCreate(function() {
		var behaviour = new Behaviour(xs);
		return behaviour.output;
	});

	return results;
}

QUnit.test('Behaviour happy path', function() {
	var scheduler = new TestScheduler();

	var readings = createSensorReadings(scheduler, [
			0, 5
	]);

	createResults(scheduler, readings).messages.assertEqual([
			onNext(300, 'OK'), onNext(350, 'OK'), onCompleted(400)
	]);
});

QUnit.test('Behaviour single sensor', function() {
	var scheduler = new TestScheduler();

	var readings = createSensorReadings(scheduler, [
			0, 5, 10, 20, 50
	]);
	createResults(scheduler, readings).messages.assertEqual([
			onNext(300, 'OK'),
			onNext(350, 'OK'),
			onNext(400, 'OK'),
			onNext(450, 'STOP'),
			onNext(500, 'STOP'),
			onCompleted(550)
	]);
});

QUnit.test('Behaviour multiple sensor', function() {
	var scheduler = new TestScheduler();

	var readings =
			Observable.zipArray(createSensorReadings(scheduler, [
					0, 5, 5, 4, 2
			]), createSensorReadings(scheduler, [
					0, 5, 10, 20, 50
			]));

	createResults(scheduler, readings).messages.assertEqual([
			onNext(300, 'OK'),
			onNext(350, 'OK'),
			onNext(400, 'OK'),
			onNext(450, 'STOP'),
			onNext(500, 'STOP'),
			onCompleted(550)
	]);
});