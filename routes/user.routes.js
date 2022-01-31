const express = require("express");
const User = require("../models/User");
const auth = require("../middleware/auth.meddleware");
const router = express.Router({ mergeParams: true });

router.patch("/:userId", auth, async (req, res) => {
  try {
    const { userId } = req.params;
    // todo: userId === current user id
    if (userId === req.user._id) {
      const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
        new: true,
      });
      return res.send(updatedUser);
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  } catch (e) {
    res
      .status(500)
      .json({ message: "На сервере произошла ошибка попробуйте позже." });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const list = await User.find();
    res.send(list);
  } catch (e) {
    res
      .status(500)
      .json({ message: "На сервере произошла ошибка попробуйте позже." });
  }
});

module.exports = router;
