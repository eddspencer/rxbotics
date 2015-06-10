// TODO implement tests in npm using chai? https://quickleft.com/blog/creating-and-publishing-a-node-js-module/

var RxBotics = require('./rxbotics.base.js');
RxBotics.Behaviour = require('./rxbotics.behaviour.js');
RxBotics.Controller = require('./rxbotics.controller.js');
RxBotics.Driver = require('./rxbotics.driver.js');
RxBotics.Math = require('./rxbotics.math.js');
RxBotics.Sensor = require('./rxbotics.sensor.js');

module.exports = RxBotics;