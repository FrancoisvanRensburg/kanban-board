const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  content: { type: String, required: true },
});

module.exports = mongoose.model('Task', TaskSchema);
