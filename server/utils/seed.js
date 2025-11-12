import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Category from '../models/Category.js';
import Post from '../models/Post.js';

dotenv.config();

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || process.env.MONGO_URL);
    console.log('Connected for seeding');

    await Category.deleteMany({});
    await Post.deleteMany({});

    const cats = await Category.insertMany([
      { name: 'General' },
      { name: 'Tech' },
      { name: 'Life' },
    ]);

    const posts = [
      { title: 'Welcome', content: 'This is the first post.', category: cats[0]._id },
      { title: 'Tech trends', content: 'Some thoughts about tech.', category: cats[1]._id },
    ];

    await Post.insertMany(posts);
    console.log('Seed complete');
    process.exit(0);
  } catch (err) {
    console.error('Seed error', err);
    process.exit(1);
  }
};

seed();
