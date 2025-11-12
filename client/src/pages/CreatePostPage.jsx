import { useState, useEffect } from 'react';
import { createPost } from '../services/postService';
import { getCategories } from '../services/categoryService';
import { useNavigate } from 'react-router-dom';

function CreatePostPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createPost({ title, content, category });
    navigate('/');
  };

  useEffect(() => {
    getCategories().then(setCategories).catch(() => setCategories([]));
  }, []);

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create a Post</h1>
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-sm">
        <input
          className="w-full border rounded px-3 py-2 mb-3"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <select
          className="w-full border rounded px-3 py-2 mb-3"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select category (optional)</option>
          {categories.map((c) => (
            <option key={c._id} value={c.name}>{c.name}</option>
          ))}
        </select>

        <textarea
          className="w-full border rounded px-3 py-2 mb-3 h-40"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <div className="flex justify-end">
          <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">Add Post</button>
        </div>
      </form>
    </div>
  );
}

export default CreatePostPage;
