import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ChatState, ChatRoom, Message } from '../types';

interface ChatStore extends ChatState {
  setChatRooms: (rooms: ChatRoom[]) => void;
  addChatRoom: (room: ChatRoom) => void;
  deleteChatRoom: (id: string) => void;
  setCurrentChatRoom: (id: string | null) => void;
  addMessage: (message: Message) => void;
  setMessages: (chatRoomId: string, messages: Message[]) => void;
  appendMessages: (chatRoomId: string, messages: Message[]) => void;
  setIsTyping: (typing: boolean) => void;
  setSearchQuery: (query: string) => void;
  updateLastMessage: (chatRoomId: string, message: string) => void;
}

export const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      chatRooms: [],
      messages: {},
      currentChatRoom: null,
      isTyping: false,
      searchQuery: '',
      
      setChatRooms: (rooms) => set({ chatRooms: rooms }),
      
      addChatRoom: (room) => set((state) => ({
        chatRooms: [room, ...state.chatRooms],
      })),
      
      deleteChatRoom: (id) => set((state) => {
        const newMessages = { ...state.messages };
        delete newMessages[id];
        return {
          chatRooms: state.chatRooms.filter(room => room.id !== id),
          messages: newMessages,
          currentChatRoom: state.currentChatRoom === id ? null : state.currentChatRoom,
        };
      }),
      
      setCurrentChatRoom: (id) => set({ currentChatRoom: id }),
      
      addMessage: (message) => set((state) => ({
        messages: {
          ...state.messages,
          [message.chatRoomId]: [
            ...(state.messages[message.chatRoomId] || []),
            message,
          ],
        },
      })),
      
      setMessages: (chatRoomId, messages) => set((state) => ({
        messages: {
          ...state.messages,
          [chatRoomId]: messages,
        },
      })),
      
      appendMessages: (chatRoomId, messages) => set((state) => ({
        messages: {
          ...state.messages,
          [chatRoomId]: [
            ...messages,
            ...(state.messages[chatRoomId] || []),
          ],
        },
      })),
      
      setIsTyping: (typing) => set({ isTyping: typing }),
      
      setSearchQuery: (query) => set({ searchQuery: query }),
      
      updateLastMessage: (chatRoomId, message) => set((state) => ({
        chatRooms: state.chatRooms.map(room =>
          room.id === chatRoomId
            ? { ...room, lastMessage: message, lastMessageTime: new Date() }
            : room
        ),
      })),
    }),
    {
      name: 'chat-storage',
    }
  )
);