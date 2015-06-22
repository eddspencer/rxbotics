/**
 * Tests the behaviour class, mapping the input of the sensors to correct state
 */
var expect = require('chai').expect;
var RxBotics = require('rxbotics');
var Behaviour = RxBotics.Behaviour;

function process(sensorReadings) {
	return new Behaviour().processReadings({
		sensorReadings : sensorReadings
	});
}

describe('RxBotics.Behaviour', function() {
	it('should have happy path', function() {
		expect(process(1)).to.equal('OK');
	});
	it('should have happy path with multiple readings', function() {
		expect(process([ 5, 0, 1 ])).to.equal('OK');
	});
	it('should change output depending on reading', function() {
		expect(process(50)).to.equal('STOP');
	});
});