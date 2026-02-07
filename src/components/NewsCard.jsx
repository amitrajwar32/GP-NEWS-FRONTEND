import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate, truncate } from '../utils/helpers';

const NewsCard = ({ news }) => {
  return (
    <Link to={news?.slug ? `/news/${news.slug}` : '#'}>
      <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow h-full flex flex-col">
        <div className="relative w-full h-48 overflow-hidden bg-gray-200 dark:bg-gray-700">
          {(() => {
            const placeholder = `https://picsum.photos/seed/${encodeURIComponent(
              news.slug || news.id
            )}/800/600`;
            const src = news.thumbnail || placeholder;
            return (
              <img
                src={src}
                alt={news.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            );
          })()}
          {news.status === 'breaking' && (
            <div className="absolute top-0 right-0 bg-red-600 text-white px-3 py-1 text-sm font-bold">
              BREAKING
            </div>
          )}
        </div>
        <div className="p-4 flex-1 flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 px-2 py-1 rounded">
              {news.category_name || news.category?.name || 'News'}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">{formatDate(news.created_at || news.createdAt)}</span>
          </div>
          <h3 className="font-bold text-lg mb-2 line-clamp-2 hover:text-primary-600 transition">
            {news.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm flex-1 line-clamp-2">
            {truncate(news.summary, 100)}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default NewsCard;
