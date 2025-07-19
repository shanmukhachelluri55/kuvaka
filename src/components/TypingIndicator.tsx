import React from 'react';
import { Bot } from 'lucide-react';

export function TypingIndicator() {
  return (
    <div className="flex gap-3">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
        <Bot className="w-4 h-4 text-gray-600 dark:text-gray-400" />
      </div>
      
      <div className="flex-1 max-w-[70%]">
        <div className="inline-block px-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-2xl rounded-bl-md">
          <div className="flex items-center gap-1">
            <span className="text-sm text-gray-600 dark:text-gray-400">Gemini is typing</span>
            <div className="flex gap-1 ml-2">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}