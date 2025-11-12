import { useEffect, useState } from 'react';
import { getCategories } from '../services/categoryService';
import { Link } from 'react-router-dom';

export default function CategoryList() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then(setCategories).catch(() => setCategories([]));
  }, []);

  return (
    <aside className="w-full md:w-64">
      <div className="bg-white border rounded p-4">
        <h3 className="font-semibold mb-3">Categories</h3>
        {categories.length === 0 ? (
          <p className="text-sm text-gray-500">No categories</p>
        ) : (
          <ul className="space-y-2">
            {categories.map((c) => (
              <li key={c._id}>
                <Link to={`/?cat=${c.slug}`} className="text-gray-700 hover:text-indigo-600">{c.name}</Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </aside>
  );
}
