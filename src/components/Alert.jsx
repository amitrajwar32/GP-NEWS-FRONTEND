import React from 'react';
import { AlertCircle, CheckCircle, Info, XCircle } from 'lucide-react';

export const Alert = ({ type = 'info', message, onClose }) => {
  const bgColor = {
    success: 'bg-green-50 dark:bg-green-900',
    error: 'bg-red-50 dark:bg-red-900',
    warning: 'bg-yellow-50 dark:bg-yellow-900',
    info: 'bg-blue-50 dark:bg-blue-900',
  }[type];

  const borderColor = {
    success: 'border-green-200 dark:border-green-700',
    error: 'border-red-200 dark:border-red-700',
    warning: 'border-yellow-200 dark:border-yellow-700',
    info: 'border-blue-200 dark:border-blue-700',
  }[type];

  const textColor = {
    success: 'text-green-800 dark:text-green-200',
    error: 'text-red-800 dark:text-red-200',
    warning: 'text-yellow-800 dark:text-yellow-200',
    info: 'text-blue-800 dark:text-blue-200',
  }[type];

  const Icon = {
    success: CheckCircle,
    error: XCircle,
    warning: AlertCircle,
    info: Info,
  }[type];

  return (
    <div className={`${bgColor} border ${borderColor} ${textColor} px-4 py-3 rounded-lg flex items-center gap-3`}>
      <Icon size={20} />
      <span className="flex-1">{message}</span>
      {onClose && (
        <button onClick={onClose} className="text-lg hover:opacity-70">×</button>
      )}
    </div>
  );
};
