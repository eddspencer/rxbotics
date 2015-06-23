/**
 * Wheel encoders to estimate the current position of the robot, implement the
 * voltageReading function to return the reading from hardware
 */
var Encoder = module.exports = function(config) {
	this.id = config.id;
}

Encoder.prototype.voltageReading = function() {
	return 0;
}

Encoder.prototype.currentState = function() {
	return {
		id : this.id,
		voltage : this.voltageReading()
	};
}