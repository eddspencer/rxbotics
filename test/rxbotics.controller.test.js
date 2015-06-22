/**
 * Tests the controller class, linking the various components together
 */
var expect = require('chai').expect;
var RxBotics = require('rxbotics');
var Rx = require('rx');

var Controller = RxBotics.Controller;
var Sensor = RxBotics.Sensor;
var Behaviour = RxBotics.Behaviour;
var Driver = RxBotics.Driver;
var Mock = RxBotics.Mock;

var Observable = Rx.Observable;
var TestScheduler = Rx.TestScheduler;
var onNext = Rx.ReactiveTest.onNext;
var onError = Rx.ReactiveTest.onError;
var onCompleted = Rx.ReactiveTest.onCompleted;

function createColdObservable(scheduler, sensorReadings) {
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

function createResults(scheduler, controller) {
	var results = scheduler.startWithCreate(function() {
		return controller.behaviourOutput;
	});

	return results;
}

function checkObserverResult(actual, expected) {
	var i, isOk = true;
	if (expected.length !== actual.length) {
		expect('Not equal length. Expected: ' + expected.length + ' Actual: ' + actual.length).equals(false);
		return;
	}
	for (i = 0; i < expected.length; i++) {
		var e = expected[i], a = actual[i];
		// ALlow for predicates
		if (e.value && typeof e.value.predicate === 'function') {

			isOk = e.time === a.time && e.value.predicate(a.value);
		} else {
			isOk = Rx.internals.isEqual(e, a);
		}

		if (!isOk) {
			break;
		}
	}
	it('Expected: [' + expected.toString() + ']\r\nActual: [' + actual.toString() + ']', function() {
		expect(isOk).equals(true);
	});
};

describe('RxBotics.Controller', function() {
	var scheduler = new TestScheduler();
	var timings = createColdObservable(scheduler, [ 0, 1, 2, 3, 4 ]);

	var sensors = [ new Sensor({
		id : 'Test1',
		x : 0,
		y : 0,
		theta : Math.PI / 2,
		calibration : [ 42 ]
	}), new Sensor({
		id : 'Test2',
		x : 1,
		y : 1,
		theta : Math.PI,
		calibration : [ 42 ]
	}) ];

	var controller = new Controller({
		scheduler : timings,
		sensors : sensors,
		initialBehaviour : new Behaviour(),
		driver : new Driver({
			leftMotor : new Mock.Motor(),
			rightMotor : new Mock.Motor()
		})
	});

	it('should return value from behaviour', function() {
		checkObserverResult(createResults(scheduler, controller).messages, [
				onNext(300, 'OK'),
				onNext(350, 'OK'),
				onNext(400, 'OK'),
				onNext(450, 'OK'),
				onNext(500, 'OK'),
				onCompleted(550) ]);
	});

	it('should update state with current time', function() {
		expect(controller.currentState.time).to.equal(4);
	});

	it('should update state with sensorReadings', function() {
		var expectedReading = sensors.map(function(sensor) {
			return {
				id : sensor.id,
				x : sensor.position.x,
				y : sensor.position.y,
				theta : sensor.theta,
				distance : sensor.calibration[0]
			};
		});
		expect(controller.currentState.sensorReadings).to.deep.equal(expectedReading);
	});

});