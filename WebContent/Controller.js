/*
 * Controller for robot, this defines the frequency to read inputs and links the reactions
 */
function Controller(config) {
	var activeBehaviour;
	var currentState = {};
	
	var scheduler = config.scheduler;
	var sensors = config.sensors;
	var driver = config.driver;
	
	setActiveBehaviour(config.initialBehaviour);
	
	this.currentState = currentState;
	
	function setActiveBehaviour(behaviour) {
		activeBehaviour = behaviour;
		activeBehaviour.currentState = currentState;
	}

	function processSensorReadings(interval) {
		currentState.time = interval;
		var sensorReadings = sensors.map(function(sensor) {
			return sensor.currentReading();
		});
		return activeBehaviour.processReadings(sensorReadings);
	}
	
	this.behaviourOutput = scheduler.map(processSensorReadings);
	
	// TODO maybe want the driver to handle the reading of event
	function processBehaviourOutput(output) {
		if ('STOP' == output) {
			driver.stop();
		} else {
			driver.go();
		}
	}
	
	this.behaviourOutput.forEach(processBehaviourOutput);

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