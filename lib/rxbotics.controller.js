/*
 * Controller for robot, this defines the frequency to read inputs and links the reactions
 */
var Controller = module.exports = function(config) {
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
		currentState.sensorReadings = sensors.map(function(sensor) {
			return sensor.currentReading();
		});
		return activeBehaviour.processReadings(currentState.sensorReadings);
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
}

// TODO need to link the wheel encoders (odometry) and have them update state
// with current position estimate
// TODO have some extra actions you can run (like flash LED when on)
// TODO We need a state machine to govern behaviour
