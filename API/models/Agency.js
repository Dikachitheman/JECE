const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const agencySchema = new Schema({
    name: { type: String, required: true },
    address: { type: String },
    contact: { type: String },
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    industry: {type: String },
    projects: [{
      title: String,
      description: String
    }]
});

// const agencySchema = new Schema({
//     owner: { type: Schema.Types.ObjectId, ref: 'User' },
//     name: { type: String, required: true },
//     logo: { type: String },
//     address: { type: String, required: true },
//     contactInfo: {
//       phone: { type: String, required: true },
//       email: { type: String, required: true },
//       website: { type: String }
//     },
//     businessHours: { type: String },
//     stats: {
//       projectsManaged: { type: Number, default: 0 },
//       clientSatisfactionRating: { type: Number, default: 0 },
//       ongoingProjects: { type: Number, default: 0 },
//       completedProjects: { type: Number, default: 0 },
//       pendingRequests: { type: Number, default: 0 },
//       revenue: { type: Number, default: 0 }
//     },
//     password: { type: String, required: true }
//   });

module.exports = mongoose.model('Agency', agencySchema);
