const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  name: { type: String, required: true, max: 32, trim: true },
  columns: [{ type: Schema.Types.ObjectId, ref: 'Column' }],
});

module.exports = mongoose.model('Project', projectSchema);
