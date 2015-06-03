QUnit.module('RxBotics');

var Observable = Rx.Observable;
var TestScheduler = Rx.TestScheduler;
var onNext = Rx.ReactiveTest.onNext;
var onError = Rx.ReactiveTest.onError;
var onCompleted = Rx.ReactiveTest.onCompleted;

QUnit.test('IRSensor', function() {
	var scheduler = new TestScheduler();

	var results =
			scheduler.startWithCreate(function() {
				var xs =
						scheduler.createColdObservable(
								onNext(100, 0),
								onNext(150, 5),
								onNext(200, 10),
								onNext(250, 20),
								onNext(300, 50),
								onCompleted(400));
				var behaviour = new Behaviour(xs);
				return behaviour.output;
			});

	results.messages.assertEqual([
			onNext(300, 'OK'),
			onNext(350, 'OK'),
			onNext(400, 'OK'),
			onNext(450, 'STOP'),
			onNext(500, 'STOP'),
			onCompleted(600)
	]);
});