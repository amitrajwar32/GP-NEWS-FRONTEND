import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { newsAPI } from '../api';
import { Loading } from '../components/Loading';
import { Alert } from '../components/Alert';
import MainLayout from '../layouts/MainLayout';
import { formatDate, formatDateTime } from '../utils/helpers';
import { Share2, ArrowLeft } from 'lucide-react';

const NewsDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [news, setNews] = useState(null);
  const [relatedNews, setRelatedNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await newsAPI.getBySlug(slug);
        const payload = res?.data?.data || res?.data || null;
        console.debug('NewsDetail payload:', payload);
        setNews(payload);

        if (payload?.category_id || payload?.categoryId) {
          const categorySlug = payload.category_slug;
          console.log('Category Slug:', categorySlug);
          
          if (categorySlug) {
            try {
              const relatedRes = await newsAPI.getByCategory(categorySlug, 1, 6);
              console.log('Full Related news response:', relatedRes);
              
              let relatedList = [];
              
              // Handle response structure: data.items
              if (relatedRes?.data?.data?.items && Array.isArray(relatedRes.data.data.items)) {
                relatedList = relatedRes.data.data.items;
              }
              // Handle paginated response
              else if (relatedRes?.data?.data && Array.isArray(relatedRes.data.data)) {
                relatedList = relatedRes.data.data;
              } 
              // Handle direct array response
              else if (Array.isArray(relatedRes?.data)) {
                relatedList = relatedRes.data;
              }
              // Handle nested data structure
              else if (relatedRes?.data?.news && Array.isArray(relatedRes.data.news)) {
                relatedList = relatedRes.data.news;
              }
              
              console.log('Parsed related list:', relatedList);
              const filtered = relatedList.filter(n => n.id !== payload.id).slice(0, 3);
              console.log('Filtered related news:', filtered);
              setRelatedNews(filtered);
            } catch (categoryErr) {
              console.error('Error fetching related news:', categoryErr);
            }
          } else {
            console.warn('No category slug found:', payload);
          }
        }
      } catch (err) {
        console.error('Error fetching news:', err);
        setError('Failed to load news');
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, [slug]);

  if (loading) return <MainLayout><Loading /></MainLayout>;
  if (error || !news) return <MainLayout><Alert type="error" message={error || 'News not found'} /></MainLayout>;

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-6 transition"
        >
          <ArrowLeft size={18} /> Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Article - Left Side */}
          <article className="lg:col-span-2">
            {news.thumbnail && (
              <img
                src={news.thumbnail}
                alt={news.title}
                className="w-full h-96 object-cover rounded-lg mb-8"
              />
            )}

            <div className="mb-8">
              <div className="flex items-center gap-4 mb-4 flex-wrap">
                <span className="text-sm bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 px-3 py-1 rounded-full">
                  {news.category_name || news.category?.name || 'News'}
                </span>
                {news.status === 'breaking' && (
                  <span className="text-sm bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-3 py-1 rounded-full font-bold">
                    BREAKING NEWS
                  </span>
                )}
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {formatDateTime(news.created_at || news.createdAt)}
                </span>
              </div>

              <h1 className="text-4xl font-bold mb-4">{news.title}</h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">{news.summary}</p>

              <button
                onClick={() => {
                  const url = window.location.href;
                  const title = news.title;
                  if (navigator.share) {
                    navigator.share({ title, url });
                  } else {
                    alert(`Share this link:\n${url}`);
                  }
                }}
                className="flex items-center gap-2 text-primary-600 hover:text-primary-700 transition"
              >
                <Share2 size={18} /> Share
              </button>
            </div>

            <div className="prose dark:prose-invert max-w-none bg-white dark:bg-gray-800 p-6 rounded-lg">
              <div dangerouslySetInnerHTML={{ __html: news.content }} />
            </div>
          </article>

          {/* Related News - Right Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">
                Related News
              </h3>
              {relatedNews.length > 0 ? (
                <div className="space-y-4">
                  {relatedNews.map((item) => (
                    <a
                      key={item.id}
                      href={`/news/${item.slug}`}
                      className="block group border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0 last:pb-0 hover:no-underline"
                    >
                      {item.thumbnail && (
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="w-full h-32 object-cover rounded-lg mb-2 group-hover:opacity-80 transition-opacity"
                        />
                      )}
                      <h4 className="font-bold text-sm group-hover:text-primary-600 transition line-clamp-2 dark:text-white">
                        {item.title}
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {formatDateTime(item.created_at || item.createdAt)}
                      </p>
                    </a>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-sm">No related news found</p>
              )}
            </div>
          </aside>
        </div>
      </div>
    </MainLayout>
  );
};

export default NewsDetailPage;
