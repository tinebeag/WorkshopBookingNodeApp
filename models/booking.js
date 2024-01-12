const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BookingSchema = new Schema(
  {
    name: { type: String, required: true, minLength: 1, maxLength: 100 },
    workshop: { type: Schema.ObjectId, ref: "Workshop", required: true },
    cardNum: { type: String, required: true, minLength: 16, maxLength: 16 },
    cardExpiry: { type: String, required: true, minLength: 5, maxLength: 5 },
    cardCVV: { type: String, required: true, minLength: 3, maxLength: 3 },
  },
  { timestamps: true }
);

// Export model
module.exports = mongoose.model("Booking", BookingSchema);
