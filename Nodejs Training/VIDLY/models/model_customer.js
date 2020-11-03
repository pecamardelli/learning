const	Joi			= require('joi');
const	mongoose	= require('mongoose');

const Customer		= mongoose.model('Customer', new mongoose.Schema({
	isGold: {
		type: 		Boolean,
		default:	false
	},
	name: {
		type:		String,
		required:	true,
		minlength:	5,
		maxlength:	50
	},
	phone: {
		type:		String,
		minlength:	6,
		maxlength:	20
	}
}));

function validateCustomer(customer) {
	const schema	= Joi.object({
		isGold: Joi.boolean(),
		name: Joi.string().min(3).required(),
		phone: Joi.string().min(6).max(20)
	});
	
	return schema.validate(customer);
}

exports.Customer	= Customer;
exports.validate	= validateCustomer;