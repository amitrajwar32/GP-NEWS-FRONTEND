import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { newsAPI } from '../api';
import { Loading } from '../components/Loading';
import { Alert } from '../components/Alert';
import MainLayout from '../layouts/MainLayout';
import NewsCard from '../components/NewsCard';

const CategoryPage = () => {
  const { slug } = useParams();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await newsAPI.getByCategory(slug, page, 12);
        // Backend: {success, data: {items: [...]}, pagination: {...}}
        const newsItems = res?.data?.data?.items || res?.data?.items || [];
        const pagination = res?.data?.pagination || {};
        
        setNews(newsItems);
        setTotalPages(pagination.pages || 1);
        setCategoryName(slug);
      } catch (err) {
        console.error('Failed to load category:', err);
        setError('Failed to load category');
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, [slug, page]);

  if (loading) return <MainLayout><Loading /></MainLayout>;

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 capitalize">{categoryName}</h1>
          <p className="text-gray-600 dark:text-gray-400">Latest news in {categoryName}</p>
        </div>

        {error && <Alert type="error" message={error} />}

        {news.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">No news in this category yet</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {news.map((item) => (
                <NewsCard key={item.id} news={item} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                  className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg disabled:opacity-50 transition"
                >
                  Previous
                </button>
                <span className="flex items-center text-gray-600 dark:text-gray-400">
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={() => setPage(Math.min(totalPages, page + 1))}
                  disabled={page === totalPages}
                  className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg disabled:opacity-50 transition"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </MainLayout>
  );
};

export default CategoryPage;
