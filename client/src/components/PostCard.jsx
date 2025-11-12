import { Link } from 'react-router-dom';

function PostCard({ post }) {
  return (
    <article className="card p-5 mb-4">
      <h2 className="text-xl font-semibold text-primary mb-2">{post.title}</h2>
      <p className="text-gray-600 mb-3">{post.content?.slice(0, 140)}...</p>
      <div className="flex items-center justify-between">
        <Link
          to={`/posts/${post._id}`}
          className="text-primary hover:underline font-medium"
        >
          Read More
        </Link>
        {post.category && <span className="text-sm text-primary-600">{post.category.name}</span>}
      </div>
    </article>
  );
}

export default PostCard;
