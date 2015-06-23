/*
 * Controller for robot, this defines the frequency to read inputs and links the reactions
 */
var Controller = module.exports = function(config) {
	var activeBehaviour;
	var currentState = {
		initiated : new Date().getTime()
	};

	var scheduler = config.scheduler;
	var sensors = config.sensors;
	var encoders = config.encoders;
	var driver = config.driver;

	setActiveBehaviour(config.initialBehaviour);

	function setActiveBehaviour(behaviour) {
		activeBehaviour = behaviour;
	}

	function processInterval(interval) {
		currentState.time = interval;

		currentState.sensors = getSensorReadings();
		currentState.encoders = getEncoderReadings();

		return activeBehaviour.processReadings(currentState);
	}

	function getSensorReadings() {
		return sensors.map(function(sensor) {
			return sensor.currentState();
		});
	}

	function getEncoderReadings() {
		return encoders.map(function(encoder) {
			return encoder.currentState();
		});
	}

	// TODO maybe want the driver to handle the reading of event
	function processBehaviourOutput(output) {
		if ('STOP' == output) {
			driver.stop();
		} else {
			driver.go();
		}
	}

	this.behaviourOutput = scheduler.map(processInterval);
	this.behaviourOutput.forEach(processBehaviourOutput);
	this.currentState = currentState;
}

// TODO need to link the wheel encoders (odometry) and have them update state
// with current position estimate
// TODO have some extra actions you can run (like flash LED when on)
// TODO We need a state machine to govern behaviour
