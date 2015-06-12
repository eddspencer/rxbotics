var RxBoticsMath = require('./rxbotics.math.js');
var Vector = RxBoticsMath.Vector;

/**
 * Reads information from a sensor then maps it to value in meters using the
 * calibration provided, implement the voltageReading function to get the reading
 * you desire
 * 
 */
var Sensor = module.exports = function(config) {
	this.position = new Vector(config.x, config.y);
	this.direction = new Vector(config.dx, config.dy);
	this.config = config;
}

Sensor.prototype.voltageReading = function() {
	return 0;
}

Sensor.prototype.currentReading = function() {
	var voltage = this.voltageReading();
	var distance = RxBoticsMath.polyval(this.config.calibration, voltage);
	return distance;
}