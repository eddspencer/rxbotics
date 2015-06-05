/**
 * Tests the driver class, responding to events in the system
 */
QUnit.module('Driver');

var Observable = Rx.Observable;
var TestScheduler = Rx.TestScheduler;
var onNext = Rx.ReactiveTest.onNext;
var onError = Rx.ReactiveTest.onError;
var onCompleted = Rx.ReactiveTest.onCompleted;

QUnit.test('Driver start', function(assert) {
	var state = {};
	var driver = new Driver(state);
	driver.go();
	assert.equal(true, state.moving, "Driver should have updated state");
});


QUnit.test('Driver stop', function(assert) {
	var state = {};
	var driver = new Driver(state);
	driver.go();
	driver.stop();
	assert.equal(false, state.moving, "Driver should have updated state");
});