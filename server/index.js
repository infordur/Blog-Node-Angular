var express = require('express');
var mongoose = require('mongoose');
var config = require('./config/config');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var _ = require('lodash');
var path = require('path');
var multer = require('multer');
var fs = require('fs');
var upload = multer({ dest: 'uploads/' });
var jwt = require('jwt-simple');
var passport = require('passport');


// Creamos la aplicacción
var app = express();

// Añadimos un middleware para la API REST
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));

// Decimos que el directorio 'public' es público
app.use(express.static(path.join(__dirname, 'public')));

// Soporte para CORS
app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	next();
});

// Usamos el paquete passport
app.use(passport.initialize());

// Cargamos los modelos
app.models = require('./models/index');

// Cargamos los Controladores.
var BlogCtrl = require('./controllers/BlogController');
var UserCtrl = require('./controllers/UserController');

require('./config/passport')(passport);

//Definimos el Router.
var apiRoutes = express.Router();

//------------------ Blogs Router ------------------------------

// Subida de POST (separado de .route por problemas con multer)
apiRoutes.post('/blogs', upload.any(), function(req, res, next) {
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

apiRoutes.put('/blogs/:id', upload.any(), function(req, res, next) {
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
apiRoutes.route('/blogs')
	.get(BlogCtrl.findAllBlogs)

apiRoutes.route('/blogs/:id')
	.get(BlogCtrl.findById)
	.delete(BlogCtrl.deleteBlog);


//-------------- Fin Router Blog ---------------------------

//-------------- Router Users -------------------------------


apiRoutes.route('/users')
    .get(UserCtrl.findAllUsers)
    .post(UserCtrl.createUser);

apiRoutes.route('/users/:id')
    .get(UserCtrl.findById)
    .put(UserCtrl.editUser)
    .delete(UserCtrl.deleteUser);

apiRoutes.route('/users/login')
    .post(UserCtrl.findByName);

//-------------- Fin Router Users ---------------------------




// Definimos la ruta base de nuestra api (/api/*)
app.use('/api', apiRoutes);

/*// Cargamos las Rutas.
var routes = require('./routes');
_.each(routes, function(controller, route) {
	app.use(route, controller(app, route));
});*/


// Conectamos con MongoDb
mongoose.connect(config.database, function(err, res) {  
  if(err) {
    console.log('ERROR: connecting to Database. ' + err);
  }
  app.listen(3000, function() {
    console.log("Node server running on http://localhost:3000");
  });
});

	
