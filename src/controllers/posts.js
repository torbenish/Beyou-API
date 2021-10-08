const Post = require ("../models/Posts");

async function createPost (req, res) {
  try {
    const { title, summary, content, category } = req.body;

    const post = await Post.create({ title, summary, content, category });

    res.send(post);
  } catch (err) {
    res.status(400).send(err);
  }
};

async function listPosts(req, res) {
  try {
    const posts = await Post.find();

    res.send({ posts });
  } catch (err) {
    res.status(400).send(err);
  }
};

async function showPost (req, res) {
  try {
    const postId = req.params.post_id;

    const post = await Post.findById(postId);

    res.send({ post });
  } catch (err) {
    res.status(400).send(err);
  }
};

async function filterOne (req, res) {
  try {
    const saudeId = req.params.saudeId;

    const posts = await Post.find({ category: "saude" });

    res.send({ posts });
  } catch (err) {
    res.status(400).send(err);
  }
};

async function updatePost (req, res) {
  try {
    const postId = req.params.post_id;

    const { title, summary, content, category } = req.body;

    const post = await Post.findByIdAndUpdate(
      postId,
      { title, summary, content, category },
      { new: true }
    );

    res.send({ post });
  } catch (err) {
    res.status(400).send(err);
  }
};

async function deletePost (req, res) {
  try {
    const postId = req.params.post_id;

    await Post.findByIdAndDelete(postId);

    res.send({ msg: "Deletado com sucesso" });
  } catch (err) {
    res.status(400).send(err);
  }
};

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});

export default { createPost, listPosts, showPost, filterOne, updatePost, deletePost}

module.exports = Post
