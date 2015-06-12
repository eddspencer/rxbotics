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
}

Motor.prototype.setSpeed = function(value) {
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

/**
 * Sensor reads the signal from given input and converts it to a distance in
 * meters
 * 
 * IR sensors return values between 0.4 and 2.75V, this voltage is digitised by
 * the BBB to a ADC value so we need to convert to a voltage before converting
 * to distance
 */

/*
 * b.analogRead('P9_33', function(x) { fl = x.value; }); b.analogRead('P9_35',
 * function(x) { bl = x.value; }); b.analogRead('P9_36', function(x) { ff =
 * x.value; }); b.analogRead('P9_38', function(x) { fr = x.value; });
 * b.analogRead('P9_40', function(x) { br = x.value; });
 */
// calibration = [ -0.0182, 0.1690, -0.6264, 1.1853, -1.2104, 0.6293 ];

var sensors = [ new Sensor({
	x : 0,
	y : 0,
	dx : 0,
	dy : 0,
	calibration : [ 42 ]
}), new Sensor({
	x : 1,
	y : 1,
	dx : 1,
	dy : 1,
	calibration : [ 42 ]
}) ];

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
