/**
 * Reads information from a sensor, implement the currentReading function to get
 * the reading you desire
 * 
 * @param position
 *          Position of sensor relative to bot
 * @param direction
 *          Direction sensor is facing
 */
function Sensor(x, y, dx, dy) {
	this.position = new Vector(x, y);
	this.direction = new Vector(dx, dy);
}

Sensor.prototype.currentReading = function() {
	return 0;
}

/**
 * IRSensor reads the IR signal from given input and converts it to a distance
 * in mm
 */
function IRSensor(x, y, dx, dy) {
	Sensor.call(this, x, y, dx, dy);
}

IRSensor.prototype = Object.create(Sensor.prototype);
IRSensor.prototype.constructor = IRSensor;

IRSensor.prototype.currentReading = function() {
	// TODO Implement IRSensor using bonescript
	return 99;
}