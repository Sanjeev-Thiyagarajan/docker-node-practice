const express = require("express");
const postController = require("../controllers/postController");
const protect = require("../middleware/authMiddleware.js");

const router = express.Router();

router
  .route("/")
  .get(protect, postController.getAllPosts)
  .post(postController.createPost);

router
  .route("/:id")
  .get(postController.getOnePost)
  .patch(postController.updatePost)
  .delete(postController.deletePost);

module.exports = router;
