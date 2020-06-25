const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ColumnSchema = new Schema({
  name: { type: String, required: true, max: 32, trim: true },
  tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
  project: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
});

module.exports = mongoose.model('Column', ColumnSchema);
