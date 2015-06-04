/*
 * Controller for robot, this defines the frequency to read inputs and links the reactions
 */
function Controller(scheduler, sensors, initialBehaviour) {
	var parent = this;
	this.activeBehaviour = initialBehaviour;

	function processSensorReadings(interval) {
		var sensorReadings = sensors.map(function(sensor) {
			return sensor.currentReading();
		});
		return parent.activeBehaviour.processReadings(sensorReadings);
	}
	
	this.output = scheduler.map(processSensorReadings);

	// TODO:
	// Takes a number of sensors
	// Defines a 'active behaviour'
	// maps events from an observable throught the sensors and behaviour
	// try to keep it as loosely coupled with observables as possible....think of
	// separating out calls like 'getSensorReadings'
	// needs to understand current state
}

function Vector(x, y) {
	this.x = x;
	this.y = y;
}