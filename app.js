const express = require("express");
const app = express();

require("dotenv").config();

const cors = require("cors");

const PORT = process.env.PORT;

const Post = require("./src/models/Posts");

const Sign = require("./src/models/Sign");

app.use(express.json());

app.use(cors());

app.post("/create_post", async (req, res) => {
  try {
    const { image, title, summary, content, category } = req.body;

    const post = await Post.create({
      image,
      title,
      summary,
      content,
      category,
    });

    res.send(post);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.get("/list_posts", async (req, res) => {
  try {
    const posts = await Post.find();

    res.send({ posts });
  } catch (err) {
    res.status(400).send(err);
  }
});

app.get("/show_post/:post_id", async (req, res) => {
  try {
    const postId = req.params.post_id;

    const post = await Post.findById(postId);

    res.send({ post });
  } catch (err) {
    res.status(400).send(err);
  }
});

app.get("/list_posts/1", async (req, res) => {
  try {
    const saudeId = req.params.saudeId;

    const post = await Post.find({ category: "comida" });

    res.send({ post });
  } catch (err) {
    res.status(400).send(err);
  }
});

app.patch("/update_post/:post_id", async (req, res) => {
  try {
    const postId = req.params.post_id;

    const { image, title, summary, content, category } = req.body;

    const post = await Post.findByIdAndUpdate(
      postId,
      { image, title, summary, content, category },
      { new: true }
    );

    res.send({ post });
  } catch (err) {
    res.status(400).send(err);
  }
});

app.delete("/delete_post/:post_id", async (req, res) => {
  try {
    const postId = req.params.post_id;

    await Post.findByIdAndDelete(postId);

    res.send({ msg: "Deletado com sucesso" });
  } catch (err) {
    res.status(400).send(err);
  }
});

app.post("/create_sign", async (req, res) => {
  try {
    const { name, city, email, telephone } = req.body;

    const sign = await Sign.create({ name, city, email, telephone });

    res.send(sign);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.get("/list_sign", async (req, res) => {
  try {
    const sign = await Sign.find();

    res.send({ sign });
  } catch (err) {
    res.status(400).send(err);
  }
});

app.delete("/delete_sign/:sign_id", async (req, res) => {
  try {
    const signId = req.params.sign_id;

    await Sign.findByIdAndDelete(signId);

    res.send({ msg: "Deletado com sucesso" });
  } catch (err) {
    res.status(400).send(err);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
