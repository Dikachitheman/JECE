const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {type: String},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['agency', 'admin'], required: true },
    agency: { type: Schema.Types.ObjectId, ref: 'Agency' },
});

module.exports = mongoose.model('User', userSchema);
