const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkshopSchema = new Schema({
  title: { type: String, required: true },
  datetime: { type: Date, required: true },
});

// Export model
module.exports = mongoose.model("Workshop", WorkshopSchema);
