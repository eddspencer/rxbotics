var RxBoticsMath = require('./rxbotics.math.js');
var Vector = RxBoticsMath.Vector;

/**
 * Reads information from a sensor then maps it to value in meters using the
 * calibration provided, implement the voltageReading function to get the
 * reading you desire
 * 
 */
var Sensor = module.exports = function(config) {
	this.id = config.id;
	this.position = new Vector(config.x, config.y);
	this.theta = config.theta;
	this.calibration = config.calibration;
}

Sensor.prototype.voltageReading = function() {
	return 0;
}

Sensor.prototype.currentReading = function() {
	var voltage = this.voltageReading();
	var distance = RxBoticsMath.polyval(this.calibration, voltage);
	return distance;
}

Sensor.prototype.currentState = function() {
	var sensorData = {
		id : this.id,
		x : this.position.x,
		y : this.position.y,
		theta : this.theta,
		distance : this.currentReading()
	};
	return sensorData;
}