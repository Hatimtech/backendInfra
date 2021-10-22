const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    keyclock_id: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    ccode: { type: String, required: false },
    mobile: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    country: { type: String, required: false },
    logo: { type: String, required: false },
    status: { type: Number, required: true, default: 1 },
    roles:   {type: Array}
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
