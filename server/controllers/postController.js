import Post from '../models/Post.js';
import Category from '../models/Category.js';

// GET /api/posts
export const getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find().populate('category', 'name').sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    next(err);
  }
};

// GET /api/posts/:id
export const getPost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id).populate('category', 'name');
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (err) {
    next(err);
  }
};

// POST /api/posts
export const createPost = async (req, res, next) => {
  try {
    const { title, content, category } = req.body;
    if (!title || !content) return res.status(400).json({ message: 'Title and content are required' });

    let categoryId = null;
    if (category) {
      const found = await Category.findOne({ name: category });
      if (found) categoryId = found._id;
    }

    const post = new Post({
      title,
      content,
      category: categoryId,
      author: req.user ? req.user._id : undefined,
    });

    await post.save();
    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
};

// PUT /api/posts/:id
export const updatePost = async (req, res, next) => {
  try {
    const { title, content, category } = req.body;
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    if (title) post.title = title;
    if (content) post.content = content;
    if (category) {
      const found = await Category.findOne({ name: category });
      if (found) post.category = found._id;
    }

    await post.save();
    res.json(post);
  } catch (err) {
    next(err);
  }
};

// DELETE /api/posts/:id
export const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json({ message: 'Post deleted' });
  } catch (err) {
    next(err);
  }
};

