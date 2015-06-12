/**
 * Takes control of the motors of the robot and response to commands given.
 * Designed for a differential drive robot.
 */
var Driver = module.exports = function(config) {
	this.leftMotor = config.leftMotor;
	this.rightMotor = config.rightMotor;
}

Driver.prototype.go = function() {
	this.leftMotor.setSpeed(0.5);
	this.rightMotor.setSpeed(0.5);
}

Driver.prototype.stop = function() {
	this.leftMotor.setSpeed(0);
	this.rightMotor.setSpeed(0);
}