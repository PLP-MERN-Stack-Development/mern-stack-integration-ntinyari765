import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getPost, getPosts } from '../services/postService';

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch (e) {
    return iso;
  }
}

function PostDetailPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      try {
        const p = await getPost(id);
        if (!mounted) return;
        setPost(p);

        // fetch posts to show related items (same category or latest)
        const all = await getPosts();
        if (!mounted) return;
        const relatedList = (all || [])
          .filter((x) => x._id !== p._id)
          .filter((x) => (p.category && x.category && x.category._id === p.category._id) || true)
          .slice(0, 3);
        setRelated(relatedList);
      } catch (err) {
        console.error(err);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, [id]);

  if (loading) return <div className="max-w-3xl mx-auto py-20 text-center text-gray-500">Loading post…</div>;
  if (!post) return <div className="max-w-3xl mx-auto py-20 text-center text-red-500">Post not found</div>;

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      {/* Hero */}
      <header className="card overflow-hidden mb-8">
        {post.image ? (
          <div
            className="w-full h-64 bg-cover bg-center"
            style={{ backgroundImage: `url(${post.image})` }}
            role="img"
            aria-label={post.title}
          />
        ) : (
          <div className="w-full h-48 bg-gradient-to-r from-[var(--color-primary)]/10 to-white flex items-center justify-center">
            <div className="text-center p-6">
              <h1 className="text-3xl font-extrabold text-primary mb-2">{post.title}</h1>
              {post.category && (
                <span className="inline-block text-sm text-primary-600 bg-primary/10 px-3 py-1 rounded-full">
                  {post.category.name}
                </span>
              )}
            </div>
          </div>
        )}

        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">By {post.author?.username || 'Unknown'}</span>
                <time className="text-xs text-gray-400">{formatDate(post.createdAt)}</time>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link to="/" className="text-sm text-primary hover:underline">Back</Link>
            </div>
          </div>

          <article className="prose prose-lg max-w-none text-gray-700">
            {post.content.split('\n').map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </article>
        </div>
      </header>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="mb-12">
          <h3 className="text-lg font-semibold mb-4">Related posts</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {related.map((r) => (
              <Link key={r._id} to={`/posts/${r._id}`} className="card p-4 hover:shadow-lg transition">
                <h4 className="text-sm font-semibold text-primary mb-2">{r.title}</h4>
                <p className="text-xs text-gray-500">{r.content?.slice(0, 80)}{r.content?.length > 80 ? '...' : ''}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <footer className="text-center text-sm text-gray-400">© {new Date().getFullYear()} Your Blog</footer>
    </main>
  );
}

export default PostDetailPage;
