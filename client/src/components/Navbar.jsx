import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <header className="bg-transparent">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-extrabold text-primary">MyBlog</Link>
        <nav className="flex items-center gap-4">
          <Link to="/" className="text-gray-700 hover:text-primary">Home</Link>
          <Link to="/create" className="btn-primary inline-block px-4 py-2 text-sm font-medium">Create Post</Link>
        </nav>
      </div>
    </header>
  );
}
