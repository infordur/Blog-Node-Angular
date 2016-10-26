var mongoose = require('mongoose');
var UserModel = mongoose.model('user');
var jwt = require('jwt-simple');
var config = require('./../config/config');


// GET - Devuelve todos los Usuarios de la BD
exports.findAllUsers = function(req, res) {
	UserModel.find(function(err, users) {
		if(err) {
			res.send(500, err.message)
		}
		console.log('GET /users');
		res.status(200).jsonp(users);
	});
};


// GET - Devuelve un Usuario por ID
exports.findById = function(req, res){
	UserModel.findById(req.params.id, function(err, user) {
		if(err) {
			res.send(500, err.message);
		}
		console.log('GET /users/ ' + req.params.id);
		res.status(200).jsonp(user);
	});
}


// POST - Devuelve un Usuario por el nombre 
exports.findByName = function(req, res) {
	UserModel.findOne({
		user: req.body.user
	}, function(err, user) {
		console.log(user);
		if(err){
			throw err;
		}

		if(!user) {
			res.send(403, err.message)
		} else {
			user.comparePassword(req.body.password, function(err, isMatch) {
				if(isMatch && !err) {
					var token = jwt.encode(user, config.secret);

					console.log('token: ' + token);

					res.status(200).jsonp(token);
					
				} else {
					res.send(403, err.message)
				}
			})
		}
	});
}

// POST - Crea un Usuario en la BD
exports.createUser = function(req, res) {
	console.log('POST');
	console.log(req.body);

	var user = new UserModel({
		user: req.body.user,
		password: req.body.password
	});

	user.save(function(err, user) {
		if(err) {
			return res.status(500).send(err.message);
		}
		res.status(200).jsonp(user);
	});
}

// PUT - Edita un Usuario
exports.editUser = function(req, res) {
	UserModel.findById(req.params.id, function(err, user) {
		user.user = req.body.user;
		user.password = req.body.password;

		user.save(function(err, user) {
			if(err) {
				return res.status(500).send(err.message);
			}
			res.status(200).jsonp(user);
		})
	})
}

// DELETE - Elimina un Usuario de la BD
exports.deleteUser = function(req, res) {
	console.log('DELETE');
	UserModel.findById(req.params.id, function(err, user) {
		user.remove(function(err) {
			if(err) {
				return res.status(500).send(err.message);
			}
			res.status(200).jsonp(user);
		})
	})

}