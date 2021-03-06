var RxBoticsMath = module.exports = {

	/**
	 * Computes the result of polynomial p(x) using:
	 * 
	 * Y = P(1)*X^N + P(2)*X^(N-1) + ... + P(N)*X + P(N+1)
	 * 
	 * @param p
	 *          The polynomial to fit, an array of it's coefficients
	 * @param x
	 *          The value to fit
	 * @returns The y result of fitting x to the polynomial
	 */
	polyval : function(p, x) {
		var y = 0;
		var n = p.length - 1;

		for (var i = 0; i < n + 1; i++) {
			var k = n - i;
			y += p[i] * Math.pow(x, k);
		}

		return y;
	},

	/**
	 * Ensures that the value is within the min and max range inclusively
	 * 
	 * @param value The value to constrain
	 * @param min The minimum bound
	 * @param max The maximum bound
	 */
	constrain : function(value, min, max) {
		if (value > max) {
			return max;
		} else if (value < min) {
			return min;
		} else {
			return value;
		}
	},

	Vector : function(x, y) {
		this.x = x;
		this.y = y;
	}
}
