/*var restful = require('node-restful');

module.exports = function(app, route) {
	var rest = restful.model(
		// Definimos la configuración del controlador para REST
		'blog',
		app.models.blog //Modelo de blog (mongoose.Schema)
	).methods(['get', 'put', 'post', 'delete']);

	// Register this endpoint with the application.
	rest.register(app, route);

	// Devolvemos el middleware.
	return function(req, res, next) {
		next();
	};
};*/

var mongoose = require('mongoose');
var BlogModel = mongoose.model('blog');

// GET - Devuelve todos los Blogs de la BD
exports.findAllBlogs = function(req, res) {
	BlogModel.find(function(err, blogs) {
		if(err) {
			res.send(500, err.message);
		}
		console.log('GET /blogs');
		res.status(200).jsonp(blogs);
	});
};

// GET - Devuelve un blog por ID
exports.findById = function(req, res) {
	BlogModel.findById(req.params.id, function(err, blog) {
		if(err) {
			res.send(500, err.message);
		}
		console.log('GET /blog/' +req.params.id);
		res.status(200).jsonp(blog);
	});
};

// POST - Inserta un nuevo Blog en la BD
exports.addBlog = function(req, res, filename) {
	
	console.log('POST');
	console.log(req.body);

	var blog = new BlogModel({
		title: req.body.title,
		description: req.body.description,
		image: filename
	});


	blog.save(function(err, blog) {
		if(err) {
			return res.status(500).send(err.message);
		}
		res.status(200).jsonp(blog);
	});
};

// PUT - Actualiza un registro que ya existe en la BD
exports.updateBlog = function(req, res, filename) {
	BlogModel.findById(req.params.id, function(err, blog) {
		blog.title = req.body.title;
		blog.description = req.body.description;
		blog.image = filename;

		blog.save(function(err) {
			if(err) {
				return res.status(500).send(err.message);
			}
			res.status(200).jsonp(blog);
		});
	});
};

// DELETE - Borra un Blog con el ID especificado de la BD
exports.deleteBlog = function(req, res) {
	BlogModel.findById(req.params.id, function(err, blog) {
		blog.remove(function(err) {
			if(err) {
				return res.status(500).send(err.message);
			}
			res.status(200).jsonp(blog);
		})
	})
};

