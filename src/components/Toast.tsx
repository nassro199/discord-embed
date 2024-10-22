import React from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';

interface ToastProps {
  message: string;
  type: string;
}

export default function Toast({ message, type }: ToastProps) {
  const bgColor = type === 'error' ? 'bg-red-500' : 'bg-green-500';
  const Icon = type === 'error' ? AlertCircle : CheckCircle;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className={`${bgColor} text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-2`}>
        <Icon className="w-5 h-5" />
        <span>{message}</span>
      </div>
    </div>
  );
}