/**
 * Reads information from a sensor, implement the currentReading function to get
 * the reading you desire
 * 
 * @param position
 *          Position of sensor relative to bot
 * @param direction
 *          Direction sensor is facing
 */
function Sensor(position, direction) {
	this.position = position;
	this.direction = direction;
}

Sensor.prototype.currentReadding = function() {
	return 0;
}

/**
 * IRSensor reads the IR signal from given input and converts it to 
 * a distance in mm
 */
function IRSensor(position, direction) {
	Sensor.call(this, position, direction);
}

IRSensor.prototype = Object.create(Sensor.prototype);
IRSensor.prototype.constructor = IRSensor;

IRSensor.prototype.currentReading = function() {
	// TODO Implement IRSensor using bonescript
	return 99;
}