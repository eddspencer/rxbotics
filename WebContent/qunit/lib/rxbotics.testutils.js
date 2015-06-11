(function(window, undefined) {

	var freeExports = typeof exports == 'object' && exports, freeModule =
			typeof module == 'object' && module && module.exports == freeExports && module, freeGlobal =
			typeof global == 'object' && global;
	if (freeGlobal.global === freeGlobal) {
		window = freeGlobal;
	}

	var comparer = Rx.internals.isEqual;

	var slice = Array.prototype.slice;

	function createMessage(actual, expected) {
		return 'Expected: [' + expected.toString() + ']\r\nActual: [' + actual.toString() + ']';
	}

	Array.prototype.assertEqual = function(expected) {
		var actual = this;

		var i, isOk = true;
		if (expected.length !== actual.length) {
			ok(false, 'Not equal length. Expected: ' + expected.length + ' Actual: ' + actual.length);
			return;
		}
		for (i = 0; i < expected.length; i++) {
			var e = expected[i], a = actual[i];
			// ALlow for predicates
			if (e.value && typeof e.value.predicate === 'function') {

				isOk = e.time === a.time && e.value.predicate(a.value);
			} else {
				isOk = comparer(e, a);
			}

			if (!isOk) {
				break;
			}
		}
		ok(isOk, createMessage(actual, expected));
	};

}(this));

function createColdObservable(scheduler, sensorReadings) {
	var time = 100;
	var step = 50;
	var values = sensorReadings.map(function(reading) {
		var value = onNext(time, reading);
		time += step;
		return value;
	});
	values.push(onCompleted(time));

	var xs = scheduler.createColdObservable(values);
	return xs;
}