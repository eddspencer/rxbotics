// TODO Add README for GIT

var RxBotics = module.exports = {

}

RxBotics.Behaviour = require('./rxbotics.behaviour.js');
RxBotics.Controller = require('./rxbotics.controller.js');
RxBotics.Driver = require('./rxbotics.driver.js');
RxBotics.Math = require('./rxbotics.math.js');
RxBotics.Sensor = require('./rxbotics.sensor.js');

//TODO For testing only
RxBotics.Mock = require('./rxbotics.mock.js');

module.exports = RxBotics;