var RxBotics = require('rxbotics');
var Rx = require('rx');

var sensors = [ new RxBotics.Sensor(0, 0, 0, 0), new RxBotics.Sensor(1, 1, 1, 1) ];
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
