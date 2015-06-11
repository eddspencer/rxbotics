var RxBoticsMath = require('./rxbotics.math.js');
var Vector = RxBoticsMath.Vector;

/**
 * Reads information from a sensor, implement the currentReading function to get
 * the reading you desire
 * 
 * @param position
 *          Position of sensor relative to bot
 * @param direction
 *          Direction sensor is facing
 */
var Sensor = function(x, y, dx, dy) {
	this.position = new Vector(x, y);
	this.direction = new Vector(dx, dy);
}

Sensor.prototype.currentReading = function() {
	return 0;
}

// TODO make node module so can 'require' it for easy adding to project
/*
 *     b.analogRead('P9_33', function(x) { 
 fl = x.value;
 });
 b.analogRead('P9_35', function(x) { 
 bl = x.value;
 });
 b.analogRead('P9_36', function(x) { 
 ff = x.value;
 });   
 b.analogRead('P9_38', function(x) { 
 fr = x.value;
 });
 b.analogRead('P9_40', function(x) { 
 br = x.value;
 });
 */

/**
 * IRSensor reads the IR signal from given input and converts it to a distance
 * in meters
 * 
 * IR sensors return values between 0.4 and 2.75V, this voltage is digitised by
 * the BBB to a ADC value so we need to convert to a voltage before converting
 * to distance
 */
var IRSensor = module.exports = function(x, y, dx, dy) {
	Sensor.call(this, x, y, dx, dy);
	calibration = [ -0.0182, 0.1690, -0.6264, 1.1853, -1.2104, 0.6293 ];
}

IRSensor.prototype = Object.create(Sensor.prototype);
IRSensor.prototype.constructor = IRSensor;

IRSensor.prototype.currentReading = function() {

	// TODO Restructure this so we can get raw values easily for debugging
	var voltageADC = 0; //b.analogRead('P9_36');
	var voltage = voltageADC * 3; // / 1000
	var distance = RxBoticsMath.polyval(calibration, voltage);

	return distance;
}