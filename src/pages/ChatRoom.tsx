import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MoreVertical, Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';
import { ChatBubble } from '../components/ChatBubble';
import { ChatInput } from '../components/ChatInput';
import { TypingIndicator } from '../components/TypingIndicator';
import { MessageSkeleton } from '../components/LoadingSkeleton';
import { useChatStore } from '../store/chatStore';
import { useChatScroll } from '../hooks/useChatScroll';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { generateAIResponse, generateDummyMessages } from '../lib/ai';
import { Message } from '../types';

export function ChatRoom() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    chatRooms,
    messages,
    isTyping,
    addMessage,
    setIsTyping,
    deleteChatRoom,
    updateLastMessage,
    appendMessages,
  } = useChatStore();

  const [loading, setLoading] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const chatRoom = chatRooms.find(room => room.id === id);
  const chatMessages = messages[id!] || [];
  const scrollRef = useChatScroll(chatMessages);

  const loadingMore = useInfiniteScroll(
    () => {
      if (hasMore && page < 5) { // Limit to 5 pages for demo
        const newMessages = generateDummyMessages(id!, 20);
        appendMessages(id!, newMessages);
        setPage(prev => prev + 1);
      } else {
        setHasMore(false);
      }
    },
    hasMore
  );

  useEffect(() => {
    if (!chatRoom) {
      navigate('/dashboard');
      return;
    }

    // Initialize with some messages if none exist
    if (chatMessages.length === 0) {
      const initialMessages = generateDummyMessages(id!, 10);
      appendMessages(id!, initialMessages);
    }

    setLoading(false);
  }, [id, chatRoom, navigate, chatMessages.length]);

  const handleSendMessage = async (content: string, image?: string) => {
    if (!chatRoom) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date(),
      image,
      chatRoomId: id!,
    };

    addMessage(userMessage);
    updateLastMessage(id!, content);
    setIsTyping(true);

    try {
      const aiResponse = await generateAIResponse(content);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        sender: 'ai',
        timestamp: new Date(),
        chatRoomId: id!,
      };
      
      addMessage(aiMessage);
      updateLastMessage(id!, aiResponse);
      toast.success('Message sent successfully!');
    } catch (error) {
      toast.error('Failed to get AI response. Please try again.');
    } finally {
      setIsTyping(false);
    }
  };

  const handleDeleteRoom = () => {
    deleteChatRoom(id!);
    toast.success('Chat room deleted successfully!');
    navigate('/dashboard');
  };

  if (loading) {
    return (
      <div className="flex-1 flex flex-col">
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded animate-pulse" />
            <div className="w-32 h-6 bg-gray-300 dark:bg-gray-600 rounded animate-pulse" />
          </div>
        </div>
        <div className="flex-1 p-4 space-y-4">
          {Array.from({ length: 5 }, (_, i) => (
            <MessageSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (!chatRoom) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Chat room not found
          </h2>
          <button
            onClick={() => navigate('/dashboard')}
            className="text-blue-500 hover:text-blue-600 transition-colors"
          >
            Go back to dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/dashboard')}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {chatRoom.name}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {chatMessages.length} messages
              </p>
            </div>
          </div>
          
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <MoreVertical className="w-5 h-5" />
            </button>
            
            {showMenu && (
              <div className="absolute right-0 top-full mt-1 w-40 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg z-10">
                <button
                  onClick={handleDeleteRoom}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete Chat
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth"
      >
        {loadingMore && (
          <div className="flex justify-center py-4">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Loading more messages...
            </div>
          </div>
        )}
        
        {chatMessages.map((message) => (
          <ChatBubble key={message.id} message={message} />
        ))}
        
        {isTyping && <TypingIndicator />}
      </div>

      <ChatInput
        onSendMessage={handleSendMessage}
        disabled={isTyping}
      />
    </div>
  );
}