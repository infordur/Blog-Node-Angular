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
	created: {
		type: Date, default: Date.now 
	},
	updated: {
		type: Date
	},
	user: {
		type: String
	},
	image: {
		type: String
	}
});

//Exportamos el modelo del Schema
module.exports = mongoose.model('blog', BlogSchema);