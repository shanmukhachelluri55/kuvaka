import React, { useState } from 'react';
import { Copy, Check, User, Bot } from 'lucide-react';
import { Message } from '../types';

interface ChatBubbleProps {
  message: Message;
}

export function ChatBubble({ message }: ChatBubbleProps) {
  const [copied, setCopied] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const isUser = message.sender === 'user';
  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'} group`}>
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
        isUser 
          ? 'bg-blue-500 text-white' 
          : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
      }`}>
        {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
      </div>

      <div className={`flex-1 max-w-[70%] ${isUser ? 'text-right' : 'text-left'}`}>
        <div className={`relative inline-block px-4 py-3 rounded-2xl ${
          isUser 
            ? 'bg-blue-500 text-white rounded-br-md' 
            : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-bl-md'
        }`}>
          {message.image && (
            <div className="mb-3">
              <img
                src={message.image}
                alt="Shared image"
                className="max-w-full h-auto rounded-lg"
                onLoad={() => setImageLoaded(true)}
                style={{ display: imageLoaded ? 'block' : 'none' }}
              />
              {!imageLoaded && (
                <div className="w-48 h-32 bg-gray-200 dark:bg-gray-600 rounded-lg animate-pulse" />
              )}
            </div>
          )}
          
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {message.content}
          </p>
          
          <button
            onClick={copyToClipboard}
            className={`absolute -top-2 ${isUser ? '-left-2' : '-right-2'} 
              w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-600 
              flex items-center justify-center opacity-0 group-hover:opacity-100 
              transition-opacity duration-200 hover:bg-gray-300 dark:hover:bg-gray-500`}
            aria-label="Copy message"
          >
            {copied ? (
              <Check className="w-3 h-3 text-green-600" />
            ) : (
              <Copy className="w-3 h-3 text-gray-600 dark:text-gray-400" />
            )}
          </button>
        </div>
        
        <div className={`mt-1 text-xs text-gray-500 dark:text-gray-400 ${
          isUser ? 'text-right' : 'text-left'
        }`}>
          {formatTime(message.timestamp)}
        </div>
      </div>
    </div>
  );
}