var RxBotics = require('rxbotics');
var Rx = require('rx');
var b = require('bonescript');

var Controller = RxBotics.Controller;
var Sensor = RxBotics.Sensor;
var Behaviour = RxBotics.Behaviour;
var Driver = RxBotics.Driver;

var Motor = function(dirPin1, dirPin2, pwmPin) {

	function initialisePins() {
		b.pinMode(dirPin1, b.OUTPUT);
		b.pinMode(dirPin2, b.OUTPUT);
		b.pinMode(pwmPin, b.OUTPUT);
	}

	initialisePins();

	this.setSpeed = function(value) {
		function setPins(dir1, dir2, pwm) {
			b.digitalWrite(dirPin1, dir1);
			b.digitalWrite(dirPin2, dir2);

			// PWM value must be between 0 and 1
			b.analogWrite(pwmPin, RxBotics.Math.constrain(Math.abs(pwm), 0, 1));
		}

		if (value > 0) {
			setPins(b.LOW, b.HIGH, pwm);
		} else if (value < 0) {
			setPins(b.HIGH, b.LOW, pwm);
		} else {
			setPins(b.LOW, b.LOW, 0);
		}
	}
}

var WheelEncoder = function(id, pin) {
	var encoder = new Encoder({
		id : id
	});

	encoder.voltageReading = function() {
		return b.analogRead(pin);
	}

	return encoder;
}

var IRSensor = function(id, x, y, theta, pin) {
	var sensor = new Sensor({
		id : id,
		x : x,
		y : y,
		theta : theta,
		calibration : [ -0.0182, 0.1690, -0.6264, 1.1853, -1.2104, 0.6293 ]
	});

	sensor.voltageReading = function() {
		// TODO re-calibrate sensor and move this 3!
		return b.analogRead(pin) * 3;
	}

	return sensor;
}

var frSensor = new IRSensor('FR', 0, 0, 0, 'P9_38');
var flSensor = new IRSensor('FL', 0, 0, Math.PI, 'P9_33');
var ffSensor = new IRSensor('FF', 0, 0, Math.PI / 2, 'P9_36');
var brSensor = new IRSensor('BR', 0, 0, 0, 'P9_38');
var blSensor = new IRSensor('BL', 0, 0, Math.PI, 'P9_40');
var sensors = [ frSensor, flSensor, ffSensor, brSensor, blSensor ];

var leftEncoder = new WheelEncoder('L', "P9_39");
var rightEncoder = new WheelEncoder('R', "P9_37");
var encoders = [ leftEncoder, rightEncoder ];

var scheduler = Rx.Observable.interval(500).timeInterval().take(10);

var controller = new Controller({
	scheduler : scheduler,
	sensors : sensors,
	encoders : encoders,
	initialBehaviour : new Behaviour(),
	driver : new Driver({
		motors : [ new Motor('P8_14', 'P8_16', 'P9_16'), new Motor('P8_12', 'P8_10', 'P9_14') ]
	}),
});

controller.behaviourOutput.forEach(function(x) {
	console.log(x);
});
