/**
 * Takes control of the motors of the robot and response to commands given
 */
function Driver(currentState) {
	this.currentState = currentState == undefined ? {} : currentState;
}

Driver.prototype.go = function() {
	this.currentState.moving = true;
}

Driver.prototype.stop = function() {
	this.currentState.moving = false;
}