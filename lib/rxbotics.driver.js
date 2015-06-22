/**
 * Takes control of the motors of the robot and response to commands given.
 * Designed for a differential drive robot.
 */
var Driver = module.exports = function(config) {
	this.motors = config.motors;
}

Driver.prototype.go = function() {
	this.motors.forEach(function(motor){
		motor.setSpeed(0.5);
	});
}

Driver.prototype.stop = function() {
	this.motors.forEach(function(motor){
		motor.setSpeed(0);
	});
}