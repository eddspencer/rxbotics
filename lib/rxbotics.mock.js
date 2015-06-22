/**
 * Contains mocks of some of the objects for testing
 */
module.exports = {
	Motor : function() {
		this.speed = -1;

		this.setSpeed = function(value) {
			this.speed = value;
		}
	},
	Encoder : function(id) {
		this.currentVoltage = function() {
			return 0;
		}

		this.currentState = function() {
			return {
				id : id,
				currentVoltage : this.currentVoltage()
			};
		}
	}

};