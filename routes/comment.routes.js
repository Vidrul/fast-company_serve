const express = require("express");
const authMeddleware = require("../middleware/auth.meddleware");
const Comment = require("../models/Commnet");
const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(authMeddleware, async (req, res) => {
    try {
      const { orderBy, equalTo } = req.query;
      const list = await Comment.find({ [orderBy]: equalTo });
      return res.status(201).json(list);
    } catch (e) {
      return res
        .status(500)
        .json({ message: "На сервере произошла ошибка попробуйте позже." });
    }
  })
  .post(authMeddleware, async (req, res) => {
    try {
      const newComment = await Comment.create({
        ...req.body,
        userId: req.user._id,
      });
      return res.status(201).send(newComment);
    } catch (e) {
      return res
        .status(500)
        .json({ message: "На сервере произошла ошибка попробуйте позже." });
    }
  });

router.delete("/:commentId", authMeddleware, async (req, res) => {
  try {
    const { commentId } = req.params;
    const removedCommnet = await Comment.findById(commentId);

    if (removedCommnet.userId.toString() === req.user._id) {
      await removedCommnet.remove();
      return res.json(null);
    } else {
      return res.status(401).json({
        message: "Unautorized",
      });
    }
  } catch (e) {
    res
      .status(500)
      .json({ message: "На сервере произошла ошибка попробуйте позже." });
  }
});

module.exports = router;
