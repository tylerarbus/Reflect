const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

/**
	Utils functions return Promises.
 */
module.exports = {
	hash: function(plainTextPassword) {
		return bcrypt.hash(plainTextPassword, saltRounds);
	},

	/**
		* Compares a user's plain text password with the hashed password
		* retrieved from the DB.
		* @return {Boolean} True if successful
	 */
	compare: function(plainTextPassword, hashedPassword) {
		return bcrypt.compare(plainTextPassword, hashedPassword);
	},

	sign: function(user) {
		let payload = {
			email: user.email
		};

		let config = {
			algorithm: 'HS256',
			expiresIn: '2 days'
		};

		return new Promise((resolve, reject) => {
			jwt.sign(payload, process.env.JWT_SECRET, config, (err, token) => {
				if (err) {
					reject(err);
				} else {
					resolve(token);
				}
			});
		});
	},

	verify: function(token) {
		return new Promise((resolve, reject) => {
			jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
				if (err) {
					reject(err);
				} else {
					resolve(decoded);
				}
			});
		});
	}
}
