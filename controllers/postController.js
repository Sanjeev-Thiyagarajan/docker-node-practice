const Post = require("../models/postModel");
exports.getAllPosts = async (req, res, next) => {
  console.log(req.session);
  try {
    const posts = await Post.find();

    res.status(200).json({
      status: "success",
      results: posts.length,
      data: {
        posts,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getOnePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    res.status(200).json({
      status: "success",

      data: {
        post,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

exports.createPost = async (req, res, next) => {
  try {
    const post = await Post.create(req.body);

    res.status(201).json({
      status: "success",

      data: {
        post,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

exports.updatePost = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",

      data: {
        post,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: "success",

      data: null,
    });
  } catch (err) {
    console.log(err);
  }
};
