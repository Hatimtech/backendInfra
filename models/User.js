const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const {transient}  = require('mongoose-transient');
const userSchema = mongoose.Schema({
    keyclock_id: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    ccode: { type: String, required: false },
    mobile: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    country: { type: String, required: false },
    logo: { type: String, required: false },
    status: { type: Number, required: true, default: 1 },
    user_type: { type: Object, required: false },
    password: {
        type: String,
        transient: true,
    },
    photoUserBase64: {
        type: String,
        transient: true,
    },
    uuidPhoto :{type: String,required: false}
});

 userSchema.plugin(transient);
userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User', userSchema);
