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

function createSensorReadings(scheduler) {
	var xs =
			scheduler.createColdObservable(
					onNext(100, 0),
					onNext(150, 5),
					onNext(200, 10),
					onNext(250, 20),
					onNext(300, 50),
					onCompleted(400));
	return xs;
}

function createResults(scheduler, xs) {
	var results = scheduler.startWithCreate(function() {
		var behaviour = new Behaviour(xs);
		return behaviour.output;
	});

	return results;
}

QUnit.test('Behaviour single sensor', function() {
	var scheduler = new TestScheduler();

	var readings = createSensorReadings(scheduler);
	createResults(scheduler, readings).messages.assertEqual([
			onNext(300, 'OK'),
			onNext(350, 'OK'),
			onNext(400, 'OK'),
			onNext(450, 'STOP'),
			onNext(500, 'STOP'),
			onCompleted(600)
	]);
});

QUnit.test('Behaviour multiple sensor', function() {
	var scheduler = new TestScheduler();

	var readings =
			Observable.zipArray(
					createSensorReadings(scheduler),
					createSensorReadings(scheduler));

	createResults(scheduler, readings).messages.assertEqual([
			onNext(300, 'OK'),
			onNext(350, 'OK'),
			onNext(400, 'OK'),
			onNext(450, 'STOP'),
			onNext(500, 'STOP'),
			onCompleted(600)
	]);
});