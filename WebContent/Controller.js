/*
 * Controller for robot, this defines the frequency to read inputs and links the reactions
 * TODO try to offline a whole bunch of the rxJS GIT page so can play on the train.
 */
function Controller(delay, frequency) {
	var source =
			Rx.Observable.timer(delay, frequency).timeInterval().pluck('interval');

	this.subscribe = function(onNext, onError, onComplete) {
		return source.subscribe(onNext, onError, onComplete);
	}

	this.start = function() {
		subscription = source.subscribe(function(x) {
			console.log('Next: ' + x);
		}, function(err) {
			console.log('Error: ' + err);
		}, function() {
			console.log('Completed');
		});
	}

	this.stop = function() {
		if (null != subscription) {
			subscription.dispose();
		}
	}

}

function IRSensor() {
	var sensorObservable = new Rx.BehaviorSubject('');
	this.emitValue = function(value) {
		sensorObservable.onNext;
	}
	this.subscribe = function(onNext) {
		sensorObservable.subscribe(onNext);
	}
}

/**
 * Takes inputs from multiple sensors and outputs messages to the system which
 * will change the state
 */
function Behaviour(sensors) {
	var readings = Rx.Observable.zipArray(sensors);

	function processEvent(sensorReadings) {
		var sensorCount = sensorReadings.length;
		for (var i = 0; i < sensorCount; i++) {
			if (sensorReadings[i] > 10) {
				return 'STOP';
			}
		}
		return 'OK';
	}

	this.output = readings.map(processEvent);
}