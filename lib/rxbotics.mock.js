/**
 * Contains mocks of some of the objects for testing
 */
module.exports = {
	Motor : function() {
		this.speed = -1;

		this.setSpeed = function(value) {
			this.speed = value;
		}
	}
};