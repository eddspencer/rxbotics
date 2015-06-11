/**
 * Tests the behaviour class, mapping the input of the sensors to correct state
 */
QUnit.module('Behaviour');

var Observable = Rx.Observable;
var TestScheduler = Rx.TestScheduler;
var onNext = Rx.ReactiveTest.onNext;
var onError = Rx.ReactiveTest.onError;
var onCompleted = Rx.ReactiveTest.onCompleted;

function createBehaviour(scheduler, xs) {
	var results = scheduler.startWithCreate(function() {
		var behaviour = new RxBotics.Behaviour();
		return xs.map(behaviour.processReadings);
	});

	return results;
}

QUnit.test('Behaviour happy path', function() {
	var scheduler = new TestScheduler();

	var readings = createColdObservable(scheduler, [ 0, 5 ]);

	createBehaviour(scheduler, readings).messages.assertEqual([ onNext(300, 'OK'), onNext(350, 'OK'), onCompleted(400) ]);
});

QUnit.test('Behaviour single sensor', function() {
	var scheduler = new TestScheduler();

	var readings = createColdObservable(scheduler, [ 0, 5, 10, 20, 50 ]);
	createBehaviour(scheduler, readings).messages.assertEqual([
			onNext(300, 'OK'),
			onNext(350, 'OK'),
			onNext(400, 'OK'),
			onNext(450, 'STOP'),
			onNext(500, 'STOP'),
			onCompleted(550) ]);
});

QUnit.test('Behaviour multiple sensor', function() {
	var scheduler = new TestScheduler();

	var readings =
			Observable
					.zipArray(createColdObservable(scheduler, [ 0, 5, 5, 4, 2 ]), createColdObservable(scheduler, [ 0, 5, 10, 20, 50 ]));

	createBehaviour(scheduler, readings).messages.assertEqual([
			onNext(300, 'OK'),
			onNext(350, 'OK'),
			onNext(400, 'OK'),
			onNext(450, 'STOP'),
			onNext(500, 'STOP'),
			onCompleted(550) ]);
});