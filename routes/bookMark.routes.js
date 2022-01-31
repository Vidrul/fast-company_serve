const express = require("express");
const authMeddleware = require("../middleware/auth.meddleware");
const BookMark = require("../models/BookMark");
const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(authMeddleware, async (req, res) => {
    try {
      const { orderBy, equalTo } = req.query;
      const list = await BookMark.find({ [orderBy]: equalTo });
      return res.status(201).json(list);
    } catch (e) {
      return res
        .status(500)
        .json({ message: "На сервере произошла ошибка попробуйте позже." });
    }
  })
  .post(authMeddleware, async (req, res) => {
    try {
      const newBookMark = await BookMark.create({
        ...req.body,
      });
      return res.status(201).send(newBookMark);
    } catch (e) {
      return res
        .status(500)
        .json({ message: "На сервере произошла ошибка попробуйте позже." });
    }
  });

router.delete("/:bookMarkId", async (req, res) => {
  try {
    const { bookMarkId } = req.params;
    const removedBookMark = await BookMark.findById(bookMarkId);
    await removedBookMark.remove();
    return res.json(null);
  } catch (e) {
    res
      .status(500)
      .json({ message: "На сервере произошла ошибка попробуйте позже." });
  }
});

module.exports = router;
