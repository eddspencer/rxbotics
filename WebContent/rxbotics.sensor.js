/**
 * Reads information from a sensor, implement the currentReading function to get
 * the reading you desire
 * 
 * @param position
 *          Position of sensor relative to bot
 * @param direction
 *          Direction sensor is facing
 */
var Sensor = RxBotics.Sensor = function(x, y, dx, dy) {
	this.position = new Vector(x, y);
	this.direction = new Vector(dx, dy);
}

Sensor.prototype.currentReading = function() {
	return 0;
}

/**
 * IRSensor reads the IR signal from given input and converts it to a distance
 * in meters
 * 
 * IR sensors return values between 0.4 and 2.75V, this voltage is digitised by
 * the BBB to a ADC value so we need to convert to a voltage before converting
 * to distance
 */
var IRSensor = RxBotics.IRSensor = function(x, y, dx, dy) {
	Sensor.call(this, x, y, dx, dy);
}

IRSensor.prototype = Object.create(Sensor.prototype);
IRSensor.prototype.constructor = IRSensor;

IRSensor.prototype.currentReading = function() {

	// TODO Implement IRSensor using bonescript
	var voltageADC = 0;
	var voltage = voltageADC * 3 / 1000;
	var distance = RxBoticsMath.polyval([ -0.0182, 0.1690, -0.6264, 1.1853, -1.2104, 0.6293 ], voltage);

	return distance;
}