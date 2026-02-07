import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { newsAPI } from '../../api';
import { Loading } from '../../components/Loading';
import { Alert } from '../../components/Alert';
import AdminNavbar from '../../components/AdminNavbar';
import { formatDate } from '../../utils/helpers';
import { Eye, EyeOff, Edit, Trash2, Plus } from 'lucide-react';

const AdminNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [totalPages, setTotalPages] = useState(1);

  const fetchNews = async (pageNum = 1) => {
    try {
      const res = await newsAPI.getAll(pageNum, 10);
      // Backend: {success, data: {items: [...]}, pagination: {...}}
      const newsItems = res.data?.data?.items || res.data?.items || [];
      const pagination = res.data?.pagination || {};
      
      setNews(newsItems);
      setTotalPages(pagination.pages || 1);
    } catch (err) {
      console.error('Failed to load news:', err);
      setError(err?.response?.data?.message || 'Failed to load news');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews(page);
  }, [page]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure?')) return;
    try {
      await newsAPI.delete(id);
      setSuccess('News deleted');
      fetchNews(page);
    } catch (err) {
      setError('Failed to delete');
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === 'published' ? 'draft' : 'published';
      await newsAPI.updateStatus(id, newStatus);
      setSuccess('Status updated');
      fetchNews(page);
    } catch (err) {
      setError('Failed to update status');
    }
  };

  if (loading) return <Loading />;

  const filteredNews = news.filter(item =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950">
      <AdminNavbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Manage News</h1>
            <p className="text-gray-600 dark:text-gray-400">Edit, delete, or view all news articles</p>
          </div>
          <Link
            to="/admin/news/add"
            className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition"
          >
            <Plus size={18} /> Create News
          </Link>
        </div>

        {error && <Alert type="error" message={error} onClose={() => setError('')} />}
        {success && <Alert type="success" message={success} onClose={() => setSuccess('')} />}

        <div className="mb-6">
          <input
            type="text"
            placeholder="Search news..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-500 outline-none"
          />
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100 dark:bg-gray-700 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium">Title</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Category</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Status</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Date</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredNews.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                    No news found
                  </td>
                </tr>
              ) : (
                filteredNews.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                    <td className="px-6 py-4">
                      <Link to={`/news/${item.slug}`} className="text-primary-600 hover:underline font-medium">
                        {item.title}
                      </Link>
                    </td>
                    <td className="px-6 py-4">{item.category_name || item.category?.name || '-'}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        item.status === 'published'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : item.status === 'draft'
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">{formatDate(item.created_at || item.createdAt)}</td>
                    <td className="px-6 py-4 flex gap-2">
                      <button
                        onClick={() => handleToggleStatus(item.id, item.status)}
                        className="p-2 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-200 rounded hover:bg-blue-200 dark:hover:bg-blue-800 transition"
                        title={item.status === 'published' ? 'Hide' : 'Publish'}
                      >
                        {item.status === 'published' ? <Eye size={18} /> : <EyeOff size={18} />}
                      </button>
                      <Link
                        to={`/admin/news/edit/${item.slug}`}
                        className="p-2 bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-200 rounded hover:bg-primary-200 dark:hover:bg-primary-800 transition"
                      >
                        <Edit size={18} />
                      </Link>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-2 bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-200 rounded hover:bg-red-200 dark:hover:bg-red-800 transition"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-6">
          <button
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded hover:bg-gray-400 dark:hover:bg-gray-600 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-gray-600 dark:text-gray-400">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage(Math.min(totalPages, page + 1))}
            disabled={page === totalPages}
            className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded hover:bg-gray-400 dark:hover:bg-gray-600 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminNews;
