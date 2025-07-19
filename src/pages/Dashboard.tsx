import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, MessageCircle } from 'lucide-react';
import { toast } from 'react-toastify';
import { ChatRoomCard } from '../components/ChatRoomCard';
import { ChatRoomSkeleton } from '../components/LoadingSkeleton';
import { useChatStore } from '../store/chatStore';
import { useDebounce } from '../hooks/useDebounce';
import { ChatRoom } from '../types';

export function Dashboard() {
  const navigate = useNavigate();
  const {
    chatRooms,
    addChatRoom,
    deleteChatRoom,
    searchQuery,
    setSearchQuery,
  } = useChatStore();
  
  const [isCreating, setIsCreating] = useState(false);
  const [newRoomName, setNewRoomName] = useState('');
  const [loading, setLoading] = useState(true);
  
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const filteredChatRooms = chatRooms.filter(room =>
    room.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
    room.lastMessage.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
  );

  const handleCreateRoom = () => {
    if (newRoomName.trim()) {
      const newRoom: ChatRoom = {
        id: Date.now().toString(),
        name: newRoomName.trim(),
        lastMessage: '',
        lastMessageTime: new Date(),
        createdAt: new Date(),
      };
      
      addChatRoom(newRoom);
      setNewRoomName('');
      setIsCreating(false);
      toast.success('Chat room created successfully!');
    }
  };

  const handleDeleteRoom = (roomId: string) => {
    deleteChatRoom(roomId);
    toast.success('Chat room deleted successfully!');
  };

  const handleRoomClick = (roomId: string) => {
    navigate(`/chat/${roomId}`);
  };

  return (
    <div className="flex-1 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Your Conversations
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your chat rooms and conversations with Gemini AI
          </p>
        </div>

        <div className="mb-6 flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search chat rooms..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <button
            onClick={() => setIsCreating(true)}
            className="flex items-center gap-2 px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Plus className="w-5 h-5" />
            New Chat
          </button>
        </div>

        {isCreating && (
          <div className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-600">
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Enter chat room name..."
                value={newRoomName}
                onChange={(e) => setNewRoomName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleCreateRoom()}
                className="flex-1 px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
              />
              <button
                onClick={handleCreateRoom}
                disabled={!newRoomName.trim()}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Create
              </button>
              <button
                onClick={() => {
                  setIsCreating(false);
                  setNewRoomName('');
                }}
                className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="grid gap-4">
          {loading ? (
            Array.from({ length: 3 }, (_, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-lg">
                <ChatRoomSkeleton />
              </div>
            ))
          ) : filteredChatRooms.length > 0 ? (
            filteredChatRooms.map((room) => (
              <div key={room.id} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
                <ChatRoomCard
                  chatRoom={room}
                  onClick={() => handleRoomClick(room.id)}
                  onDelete={() => handleDeleteRoom(room.id)}
                />
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                No conversations yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Start a new conversation with Gemini AI
              </p>
              <button
                onClick={() => setIsCreating(true)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Create Your First Chat
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}