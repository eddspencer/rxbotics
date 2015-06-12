var RxBotics = require('rxbotics');
var Rx = require('rx');
var b = require('bonescript');

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
			b.analogWrite(pwmPin, RxBotics.Math.costrain(Math.abs(pwm), 0, 1));
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

var IRSensor = function(x, y, dx, dy, pin) {
	var sensor = new Sensor({
		x : x,
		y : y,
		dx : dx,
		dy : dy,
		calibration : [ -0.0182, 0.1690, -0.6264, 1.1853, -1.2104, 0.6293 ]
	});

	sensor.voltageReading = function() {
		return b.analogRead(pin) * 3;
	}

	return sensor;
}

var frSensor = new IRSensor(0, 0, 0, 0, 'P9_38');
var flSensor = new IRSensor(0, 0, 0, 0, 'P9_33');
var ffSensor = new IRSensor(0, 0, 0, 0, 'P9_36');
var brSensor = new IRSensor(0, 0, 0, 0, 'P9_38');
var blSensor = new IRSensor(0, 0, 0, 0, 'P9_40');
var sensors = [ frSensor, flSensor, ffSensor, brSensor, blSensor ];

var scheduler = Rx.Observable.interval(500).timeInterval().take(10);

var controller = new RxBotics.Controller({
	scheduler : scheduler,
	sensors : sensors,
	initialBehaviour : new RxBotics.Behaviour(),
	driver : new RxBotics.Driver()
});

controller.behaviourOutput.forEach(function(x) {
	console.log(x);
});
