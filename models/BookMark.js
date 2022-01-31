const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    // На чьей странице находится комментарий
    authUser: { type: Schema.Types.ObjectId, ref: "User", required: true },
    // Кто оставил комментарий
    userId: { type: Schema.Types.ObjectId, ref: "User" },
  },

  { timestamps: { createdAt: "created_at" } }
);

module.exports = model("BookMark", schema);
