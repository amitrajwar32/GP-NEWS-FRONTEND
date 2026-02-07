import React, { useState, useEffect } from 'react';
import { newsAPI, settingsAPI } from '../api';
import { Loading } from '../components/Loading';
import MainLayout from '../layouts/MainLayout';
import NewsCard from '../components/NewsCard';
import { Link } from 'react-router-dom';
import { formatDate } from '../utils/helpers';
import { categoryAPI } from '../api';
import { API_URL } from '../config/env.js';
import { Youtube } from 'lucide-react';

const HomePage = () => {
  const [breakingNews, setBreakingNews] = useState(null);
  const [latestNews, setLatestNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [apiDebug, setApiDebug] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const itemsPerPage = 9;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const newsPromise = token ? newsAPI.getAll(page, itemsPerPage) : newsAPI.getLatest(page, itemsPerPage);
        const [breaking, latest, cats, settings] = await Promise.all([
          newsAPI.getBreaking(),
          newsPromise,
          categoryAPI.getAll(),
          settingsAPI.getByKey('youtube_channel_url').catch(() => ({ data: { data: '' } })),
        ]);

        // Backend returns: {success, message, data: [...], timestamp}
        // For /news/latest: data is array
        // For /news (admin): data has {items: [...], pagination: {...}}
        
        let breakingItem = breaking?.data?.data || breaking?.data || null;
        // If API returns an array of breaking items, pick the first one
        if (Array.isArray(breakingItem) && breakingItem.length > 0) {
          breakingItem = breakingItem[0];
        }
        
        let latestList = [];
        let pagination = {};
        if (latest?.data?.data?.items) {
          // Admin response: paginated with items wrapper
          latestList = latest.data.data.items;
          pagination = latest.data.pagination || {};
        } else if (latest?.data?.data && Array.isArray(latest.data.data)) {
          // Public response: /news/latest returns array in data
          latestList = latest.data.data;
          pagination = latest.data.pagination || {};
        } else if (Array.isArray(latest?.data)) {
          latestList = latest.data;
        }
        
        let catsPayload = latest?.data?.data || [];
        if (cats?.data?.data && Array.isArray(cats.data.data)) {
          catsPayload = cats.data.data;
        } else if (Array.isArray(cats?.data)) {
          catsPayload = cats.data;
        }

        const validLatest = latestList.filter(item => item && (item.id || item._id));
        setBreakingNews(breakingItem || null);
        setLatestNews(validLatest);
        setTotalPages(pagination.pages || 1);
        setCategories(catsPayload);
        setYoutubeUrl(settings?.data?.data || '');
      } catch (error) {
        console.error('Failed to load data:', error);
        setLatestNews([]);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [page]);

  if (loading) return <MainLayout><Loading /></MainLayout>;

  return (
    <MainLayout>
      {/* Hero Section with Breaking News */}
      {breakingNews && (
        <Link to={`/news/${breakingNews.slug}`} className="block">
          <div
            className="relative text-white overflow-hidden bg-cover bg-center group"
            style={
              breakingNews.thumbnail
                ? { backgroundImage: `url('${breakingNews.thumbnail}')` }
                : {}
            }
          >
            {/* Background Image with Zoom Effect */}
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/35 transition-all duration-500" />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
            
            {/* Animated Border */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-red-500 to-transparent animate-pulse" />
            
            <div className="relative py-16 md:py-24 max-w-7xl mx-auto px-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {/* Content */}
                <div className="space-y-6">
                  {/* Breaking Badge with Pulse */}
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="absolute inset-0 bg-red-600 rounded-full animate-pulse" style={{ opacity: 0.3 }} />
                      <div className="relative inline-block">
                        <span className="inline-block w-3 h-3 bg-red-600 rounded-full animate-pulse mr-2" />
                        <span className="text-sm font-black tracking-widest bg-gradient-to-r from-red-500 to-red-600 px-4 py-2 rounded-full inline-block">
                          ● LIVE BREAKING
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-red-400 uppercase">This Moment</span>
                  </div>

                  {/* Headline */}
                  <h1 className="text-4xl md:text-5xl xl:text-6xl font-black leading-tight group-hover:text-red-400 transition-colors duration-300">
                    {breakingNews.title}
                  </h1>

                  {/* Summary */}
                  <p className="text-lg md:text-xl text-gray-100 leading-relaxed line-clamp-3">
                    {breakingNews.summary}
                  </p>

                  {/* Meta Information */}
                  <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-white/20">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                      <span className="text-sm font-semibold text-red-400 uppercase">Breaking Now</span>
                    </div>
                    <span className="text-sm text-gray-300">
                      {formatDate(breakingNews.created_at || breakingNews.createdAt)}
                    </span>
                  </div>

                  {/* Call to Action */}
                  <div className="flex items-center gap-2 pt-2 group/cta">
                    <span className="text-sm font-semibold uppercase tracking-wider group-hover/cta:text-red-400 transition-colors">
                      Read Full Story
                    </span>
                    <svg className="w-4 h-4 group-hover/cta:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>

                {/* Right side - Decorative Element */}
                <div className="hidden lg:flex items-center justify-center">
                  <div className="relative w-full h-full min-h-96">
                    {/* Floating cards effect */}
                    <div className="absolute top-0 right-0 w-48 h-48 bg-red-600/20 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-red-500/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '0.5s' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* News Grid */}
          <div className="lg:col-span-3">
            <h2 className="text-3xl font-bold mb-8">Latest News</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestNews.length === 0 ? (
                <div className="col-span-full text-center py-12 text-gray-500 dark:text-gray-400">
                  <div>No news available. Please add news in the admin panel or check backend data.</div>
                  {apiDebug && (
                    <pre className="mt-6 text-left text-xs whitespace-pre-wrap bg-gray-100 dark:bg-gray-800 p-4 rounded text-gray-700 dark:text-gray-200 max-h-64 overflow-auto">
                      {JSON.stringify({
                        breaking: apiDebug.breakingRaw?.data || apiDebug.breakingRaw,
                        latest: apiDebug.latestRaw?.data || apiDebug.latestRaw,
                        categories: apiDebug.categoriesRaw?.data || apiDebug.categoriesRaw,
                      }, null, 2)}
                    </pre>
                  )}
                </div>
              ) : (
                latestNews.map((news) => (
                  <NewsCard key={news.id || news._id || news.slug || Math.random()} news={news} />
                ))
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-12">
                <button
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                  className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  Previous
                </button>
                <span className="text-gray-600 dark:text-gray-400 font-medium">
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={() => setPage(Math.min(totalPages, page + 1))}
                  disabled={page === totalPages}
                  className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  Next
                </button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow sticky top-20">
              <h3 className="text-xl font-bold mb-4">Categories</h3>
              <div className="space-y-2">
                {categories && categories.length > 0 ? categories.map((cat) => (
                  <Link
                    key={cat.id}
                    to={`/category/${cat.slug}`}
                    className="block px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-primary-100 dark:hover:bg-primary-900 rounded transition"
                  >
                    {cat.name}
                  </Link>
                )) : <div className="text-gray-500">No categories</div>}
              </div>
            </div>

            {/* YouTube Channel Card */}
            {youtubeUrl && (
              <div className="mt-6 bg-gradient-to-br from-red-600 to-red-700 dark:from-red-700 dark:to-red-800 p-6 rounded-lg shadow text-white sticky top-96">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold">Subscribe</h3>
                  <Youtube size={28} />
                </div>
                <p className="text-red-100 text-sm mb-4">
                  Follow us on YouTube for exclusive news content!
                </p>
                <a
                  href={youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-white text-red-600 font-bold py-2 px-4 rounded-lg transition hover:bg-red-50 text-center text-sm"
                >
                  Subscribe Now
                </a>
              </div>
            )}
          </aside>
        </div>
      </div>
    </MainLayout>
  );
};

export default HomePage;
