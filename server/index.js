var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var _ = require('lodash');
var path = require('path');
var multer = require('multer');
var fs = require('fs');

var upload = multer({ dest: 'uploads/' });

// Creamos la aplicacción
var app = express();

// Aádimos un middleware para la API REST
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(express.static(path.join(__dirname, 'public')));

// Soporte para CORS
app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	next();
});

// Cargamos los modelos
app.models = require('./models/index');

// Cargamos las Rutas.
var BlogCtrl = require('./controllers/BlogController');

//Definimos el Router.
var blogs = express.Router();

// Subida de POST (separado de .route por problemas con multer)
blogs.post('/blogs', upload.any(), function(req, res, next) {
    console.log(req.files);
    console.log(req.body);

    if(req.files) {
        req.files.forEach(function(file) {
            console.log(file);
            var filename = (new Date).valueOf() + '-' + file.originalname;
            fs.rename(file.path, 'public/images/' + filename, function(err) {
                if(err){
                    throw err;
                }
                console.log('file uploaded...');
                BlogCtrl.addBlog(req, res, filename);
            });
        });
    }
});

blogs.put('/blogs/:id', upload.any(), function(req, res, next) {
    console.log(req.files);
    console.log(req.body);

    if(req.files) {
        req.files.forEach(function(file) {
            console.log(file);
            var filename = (new Date).valueOf() + '-' + file.originalname;
            fs.rename(file.path, 'public/images/' + filename, function(err) {
                if(err){
                    throw err;
                }
                console.log('file uploaded...');
                BlogCtrl.updateBlog(req, res, filename);
            });
        });
    }
});


//Definimos la ruta con sus métodos.
blogs.route('/blogs')
	.get(BlogCtrl.findAllBlogs)

blogs.route('/blogs/:id')
	.get(BlogCtrl.findById)
	.delete(BlogCtrl.deleteBlog);

// Definimos la ruta base de nuestra api (/api/blogs)
app.use('/api', blogs);

/*// Cargamos las Rutas.
var routes = require('./routes');
_.each(routes, function(controller, route) {
	app.use(route, controller(app, route));
});*/


// Conectamos con MongoDb
mongoose.connect('mongodb://localhost/blog', function(err, res) {  
  if(err) {
    console.log('ERROR: connecting to Database. ' + err);
  }
  app.listen(3000, function() {
    console.log("Node server running on http://localhost:3000");
  });
});

	
