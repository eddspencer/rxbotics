/*
 * Controller for robot, this defines the frequency to read inputs and links the reactions
 * TODO try to offline a whole bunch of the rxJS GIT page so can play on the train.
 */
function Controller(delay, frequency) {

}

function Vector(x, y) {
	this.x = x;
	this.y = y;
}

/**
 * Takes inputs from multiple sensors and outputs messages to the system which
 * will change the state
 */
function Behaviour(readings) {

	// TODO incorporate the location of the sensor and current direction and speed
	// so will only stop when oject is infront of you

	// TODO NEXT. Link up the whole thing like it is, it can stop whenever it gets
	// close to something

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