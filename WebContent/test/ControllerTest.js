/**
 * Tests the controller class, linking the various components together
 */
QUnit.module('Controller');

var Observable = Rx.Observable;
var TestScheduler = Rx.TestScheduler;
var onNext = Rx.ReactiveTest.onNext;
var onError = Rx.ReactiveTest.onError;
var onCompleted = Rx.ReactiveTest.onCompleted;

function createResults(scheduler, xs) {
	var sensors = [ new Sensor(0, 0, 0, 0), new Sensor(1, 1, 1, 1) ];
	var results = scheduler.startWithCreate(function() {
		return new Controller({
			scheduler : xs,
			sensors : sensors,
			initialBehaviour : new Behaviour(),
			driver : new Driver()
		}).behaviourOutput;
	});

	return results;
}

QUnit.test('Controller happy path', function() {
	var scheduler = new TestScheduler();
	var timings = createColdObservable(scheduler, [ 0, 1, 2, 3, 4 ]);

	createResults(scheduler, timings).messages.assertEqual([
			onNext(300, 'OK'),
			onNext(350, 'OK'),
			onNext(400, 'OK'),
			onNext(450, 'OK'),
			onNext(500, 'OK'),
			onCompleted(550) ]);
});
