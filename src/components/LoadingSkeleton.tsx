import React from 'react';

export function MessageSkeleton() {
  return (
    <div className="flex gap-3 animate-pulse">
      <div className="w-8 h-8 bg-gray-300 dark:bg-gray-700 rounded-full" />
      <div className="flex-1 max-w-[70%]">
        <div className="bg-gray-300 dark:bg-gray-700 h-12 rounded-2xl rounded-bl-md" />
        <div className="bg-gray-200 dark:bg-gray-800 h-3 w-16 rounded mt-1" />
      </div>
    </div>
  );
}

export function ChatRoomSkeleton() {
  return (
    <div className="p-4 animate-pulse">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="bg-gray-300 dark:bg-gray-700 h-5 rounded w-32 mb-2" />
          <div className="bg-gray-200 dark:bg-gray-800 h-4 rounded w-48 mb-1" />
          <div className="bg-gray-200 dark:bg-gray-800 h-3 rounded w-16" />
        </div>
        <div className="bg-gray-300 dark:bg-gray-700 h-6 w-6 rounded" />
      </div>
    </div>
  );
}