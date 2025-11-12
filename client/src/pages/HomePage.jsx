import { useEffect, useState } from 'react';
import { getPosts } from '../services/postService';
import PostCard from '../components/PostCard';
import CategoryList from '../components/CategoryList';

function HomePage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts().then(setPosts);
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-6">
      <section className="md:col-span-3">
        <header className="mb-6">
          <h1 className="text-3xl font-bold">All Posts</h1>
          <p className="text-sm text-gray-500">Recent posts and updates</p>
        </header>

        {posts.length === 0 ? (
          <p className="text-gray-600">No posts yet.</p>
        ) : (
          posts.map((post) => <PostCard key={post._id} post={post} />)
        )}
      </section>

      <aside className="hidden md:block md:col-span-1">
        <CategoryList />
      </aside>
    </div>
  );
}

export default HomePage;
