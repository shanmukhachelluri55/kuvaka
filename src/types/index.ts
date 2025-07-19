export interface User {
  id: string;
  phoneNumber: string;
  countryCode: string;
  isAuthenticated: boolean;
}

export interface ChatRoom {
  id: string;
  name: string;
  lastMessage: string;
  lastMessageTime: Date;
  createdAt: Date;
}

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  image?: string;
  chatRoomId: string;
}

export interface Country {
  name: {
    common: string;
  };
  cca2: string;
  idd: {
    root: string;
    suffixes: string[];
  };
  flag: string;
}

export interface ChatState {
  chatRooms: ChatRoom[];
  messages: Record<string, Message[]>;
  currentChatRoom: string | null;
  isTyping: boolean;
  searchQuery: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  otpSent: boolean;
}