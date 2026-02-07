import React from 'react';

export const Loading = () => (
  <div className="flex items-center justify-center py-12">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
  </div>
);

export const LoadingCard = () => (
  <div className="bg-gray-200 dark:bg-gray-700 rounded-lg h-64 animate-pulse"></div>
);
