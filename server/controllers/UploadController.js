var express = require('express');
var restful = require('node-restful');
var multer = require('multer');
var upload = multer({ dest: 'uploads/'});
var app = express;

module.exports = function(app, route) {
	var rest = restful.model(
		// Definimos la configuración del controlador para REST
		'blog',
		app.models.image //Modelo de blog (mongoose.Schema)
	).methods(['get', 'put', 'post', 'delete']);

	// Register this endpoint with the application.
	rest.register(app, route);


	// Devolvemos el middleware.
	return function(req, res, next) {
		next();
	};
};
