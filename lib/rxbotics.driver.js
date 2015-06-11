/**
 * Takes control of the motors of the robot and response to commands given
 */
var Driver = module.exports = function(currentState) {
	this.currentState = currentState == undefined ? {} : currentState;
}

Driver.prototype.go = function() {
	this.currentState.moving = true;
}

Driver.prototype.stop = function() {
	this.currentState.moving = false;
}