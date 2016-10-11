var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Creamos el BlogSchema.
var BlogSchema = new Schema({
	title: {
		type: String
	},
	description: {
		type: String
	},
	image: {
		type: String
	}
});

//Exportamos el modelo del Schema
module.exports = mongoose.model('blog', BlogSchema);