/*
 * Controller for robot, this defines the frequency to read inputs and links the reactions
 * TODO try to offline a whole bunch of the rxJS GIT page so can play on the train.
 */
function Controller(delay, frequency) {

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
function Behaviour(readings) {

	function processEvent(sensorReadings) {
		// TODO think of nicer way to do this
		if (!Array.isArray(sensorReadings)) {
			var arr = new Array(1);
			arr[0] = sensorReadings;
			sensorReadings = arr;
		}

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