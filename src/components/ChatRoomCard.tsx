import React from 'react';
import { MoreVertical, Trash2 } from 'lucide-react';
import { ChatRoom } from '../types';

interface ChatRoomCardProps {
  chatRoom: ChatRoom;
  onClick: () => void;
  onDelete: () => void;
  isActive?: boolean;
}

export function ChatRoomCard({ chatRoom, onClick, onDelete, isActive }: ChatRoomCardProps) {
  const [showMenu, setShowMenu] = React.useState(false);

  const formatTime = (date: Date) => {
    const now = new Date();
    const messageDate = new Date(date);
    const diffInHours = Math.floor((now.getTime() - messageDate.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      return messageDate.toLocaleDateString();
    }
  };

  return (
    <div
      className={`relative group p-4 rounded-lg cursor-pointer transition-all duration-200 ${
        isActive 
          ? 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500' 
          : 'hover:bg-gray-50 dark:hover:bg-gray-800'
      }`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 dark:text-white truncate">
            {chatRoom.name}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 truncate mt-1">
            {chatRoom.lastMessage || 'No messages yet'}
          </p>
          <span className="text-xs text-gray-400 dark:text-gray-500 mt-1 block">
            {formatTime(chatRoom.lastMessageTime)}
          </span>
        </div>
        
        <div className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowMenu(!showMenu);
            }}
            className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <MoreVertical className="w-4 h-4" />
          </button>
          
          {showMenu && (
            <div className="absolute right-0 top-full mt-1 w-32 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg z-10">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete();
                  setShowMenu(false);
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}