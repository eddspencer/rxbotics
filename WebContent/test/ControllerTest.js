/**
 * Tests the controller class, linking the various components together
 */
QUnit.module('Controller');

var Observable = Rx.Observable;
var TestScheduler = Rx.TestScheduler;
var onNext = Rx.ReactiveTest.onNext;
var onError = Rx.ReactiveTest.onError;
var onCompleted = Rx.ReactiveTest.onCompleted;

function createResults(scheduler, controller) {
	var results = scheduler.startWithCreate(function() {
		return controller.behaviourOutput;
	});

	return results;
}

QUnit.test('Controller happy path', function(assert) {
	var scheduler = new TestScheduler();
	var timings = createColdObservable(scheduler, [ 0, 1, 2, 3, 4 ]);
	var sensors = [ new Sensor(0, 0, 0, 0), new Sensor(1, 1, 1, 1) ];
	var controller = new Controller({
		scheduler : timings,
		sensors : sensors,
		initialBehaviour : new Behaviour(),
		driver : new Driver()
	});
	createResults(scheduler, controller).messages.assertEqual([
			onNext(300, 'OK'),
			onNext(350, 'OK'),
			onNext(400, 'OK'),
			onNext(450, 'OK'),
			onNext(500, 'OK'),
			onCompleted(550) ]);

	assert.equal(controller.currentState.time, 4, "current state must be updated with time");
});
