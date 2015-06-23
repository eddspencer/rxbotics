/**
 * Contains mocks of some of the objects for testing
 */

var RxBotics = require('rxbotics');
var Sensor = RxBotics.Sensor;
var Encoder = RxBotics.Encoder;

module.exports = {
	Motor : function() {
		this.speed = -1;

		this.setSpeed = function(value) {
			this.speed = value;
		}
	},
	Encoder : function(id) {
		return new Encoder({
			id : id
		});
	},
	Sensor : function(id, x, y, theta, calibration) {
		return new Sensor({
			id : id,
			x : x,
			y : y,
			theta : theta,
			calibration : calibration
		});
	}
};