import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto text-center py-16">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
        404 - Page Not Found
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        The highlight you're looking for doesn't exist or has been removed.
      </p>
      <Link
        to="/"
        className="btn-primary inline-block"
      >
        Back to Highlights
      </Link>
    </div>
  );
} 