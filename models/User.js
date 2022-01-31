const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    name: { type: String },
    password: { type: String, required: true, unique: true },
    email: { type: String },
    completedMeetings: { type: Number },
    image: { type: String },
    rate: { type: Number },
    sex: { type: String, enum: ["male", "female", "other"] },
    qualities: [{ type: Schema.Types.ObjectId, ref: "Quality" }],
    profession: { type: Schema.Types.ObjectId, ref: "Profession" },
  },

  { timestamps: true }
);

module.exports = model("User", schema);
