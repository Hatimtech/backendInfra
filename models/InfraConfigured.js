const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const infraSchema = mongoose.Schema({
    isConfigured: { type: Boolean, required: true },
});

infraSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Infra', infraSchema);
