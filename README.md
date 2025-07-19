# Gemini AI - Conversational Interface

A modern, fully-featured AI conversational interface built with React, TypeScript, and Tailwind CSS. Inspired by leading AI chat platforms like ChatGPT, Claude, and Gemini.

![Gemini AI Interface](https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop)

## ✨ Features

### 🔐 Authentication
- **Phone-based OTP Login**: Secure authentication using phone numbers
- **Country Code Selection**: Fetches real country data from REST Countries API
- **Form Validation**: Robust validation using React Hook Form + Zod
- **Persistent Sessions**: Authentication state stored in localStorage

### 📱 Dashboard
- **Chat Room Management**: Create, delete, and organize conversations
- **Real-time Search**: Debounced search across chat rooms and messages
- **Last Message Preview**: Quick overview of recent conversations
- **Responsive Grid Layout**: Optimized for all screen sizes

### 💬 Chat Interface
- **Real-time Messaging**: Instant message delivery with typing indicators
- **AI Response Simulation**: Realistic AI responses with configurable delays
- **Image Upload Support**: Share images with base64 preview
- **Infinite Scroll**: Load chat history with pagination (20 messages per batch)
- **Copy to Clipboard**: One-click message copying
- **Auto-scroll**: Automatic scrolling to newest messages
- **Message Timestamps**: Formatted time display for all messages

### 🎨 User Experience
- **Dark/Light Mode**: System preference detection with manual toggle
- **Toast Notifications**: Success/error feedback for all actions
- **Loading Skeletons**: Smooth loading states throughout the app
- **Keyboard Accessibility**: Full keyboard navigation support
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Smooth Animations**: Micro-interactions and transitions

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | React 18 + TypeScript |
| **Build Tool** | Vite |
| **Routing** | React Router DOM |
| **State Management** | Zustand |
| **Styling** | Tailwind CSS |
| **Form Handling** | React Hook Form + Zod |
| **Icons** | Lucide React |
| **Notifications** | React Toastify |
| **Utilities** | Lodash Debounce |

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ChatBubble.tsx   # Individual message display
│   ├── ChatInput.tsx    # Message input with image upload
│   ├── ChatRoomCard.tsx # Chat room list item
│   ├── CountrySelect.tsx# Country code selector
│   ├── Header.tsx       # App header with navigation
│   ├── LoadingSkeleton.tsx # Loading state components
│   └── TypingIndicator.tsx # AI typing animation
├── hooks/               # Custom React hooks
│   ├── useChatScroll.ts # Auto-scroll chat to bottom
│   ├── useDebounce.ts   # Debounced search functionality
│   └── useInfiniteScroll.ts # Infinite scroll pagination
├── lib/                 # Utility functions
│   ├── ai.ts           # AI response simulation
│   ├── countries.ts    # Country data fetching
│   └── otp.ts          # OTP simulation
├── pages/              # Main application pages
│   ├── AuthPage.tsx    # Login/OTP verification
│   ├── ChatRoom.tsx    # Individual chat interface
│   └── Dashboard.tsx   # Chat room management
├── store/              # Zustand state management
│   ├── authStore.ts    # Authentication state
│   ├── chatStore.ts    # Chat and message state
│   └── themeStore.ts   # Theme preferences
├── types/              # TypeScript type definitions
│   └── index.ts        # Shared interfaces
├── App.tsx             # Main app component
├── main.tsx           # App entry point
└── index.css          # Global styles
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Gemini-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173`

### Demo Credentials
- **OTP Code**: `123456` (for any phone number)
- **Country**: Any country from the dropdown
- **Phone**: Any valid phone number format

## 🎯 Usage Guide

### Authentication Flow
1. Select your country from the dropdown
2. Enter your phone number
3. Click "Send OTP"
4. Enter `123456` as the verification code
5. Click "Verify OTP" to access the dashboard

### Creating Chat Rooms
1. Click the "New Chat" button on the dashboard
2. Enter a descriptive name for your chat room
3. Click "Create" to add it to your list

### Chatting with AI
1. Select a chat room from the dashboard
2. Type your message in the input field
3. Optionally attach an image using the image button
4. Press Enter or click Send
5. Watch the AI typing indicator and receive responses

### Advanced Features
- **Search**: Use the search bar to filter chat rooms
- **Dark Mode**: Toggle using the moon/sun icon in the header
- **Copy Messages**: Hover over messages to reveal copy button
- **Delete Chats**: Use the menu button on chat room cards
- **Image Sharing**: Click the image icon in chat input

## 🔧 Configuration

### Environment Variables
No environment variables required for basic functionality. The app uses:
- REST Countries API for country data
- localStorage for data persistence
- Simulated backend responses

### Customization

#### AI Response Timing
```typescript
// In src/lib/ai.ts
const delay = Math.random() * 3000 + 1000; // 1-4 seconds
```

#### Message Pagination
```typescript
// In src/pages/ChatRoom.tsx
const newMessages = generateDummyMessages(id!, 20); // 20 messages per batch
```

#### Theme Colors
```javascript
// In tailwind.config.js
colors: {
  primary: {
    500: '#3b82f6', // Customize primary color
    // ... other shades
  }
}
```

## 📱 Responsive Design

The interface is optimized for all screen sizes:

- **Mobile (320px+)**: Single column layout, touch-friendly buttons
- **Tablet (768px+)**: Improved spacing, larger touch targets
- **Desktop (1024px+)**: Full feature set, hover states, keyboard shortcuts

## ♿ Accessibility

- **Keyboard Navigation**: Full tab/shift+tab support
- **Screen Readers**: Proper ARIA labels and semantic HTML
- **Color Contrast**: WCAG AA compliant color ratios
- **Focus Management**: Clear focus indicators throughout

## 🚀 Performance

- **Code Splitting**: Automatic route-based splitting
- **Lazy Loading**: Images and components loaded on demand
- **Debounced Search**: Optimized search performance
- **Virtual Scrolling**: Efficient handling of large message lists
- **Memoization**: React.memo and useMemo for expensive operations

## 🧪 Testing

```bash
# Run tests (when implemented)
npm run test

# Run linting
npm run lint

# Type checking
npm run type-check
```

## 📦 Building for Production

```bash
# Create production build
npm run build

# Preview production build
npm run preview



## 🙏 Acknowledgments

- [REST Countries API](https://restcountries.com/) for country data
- [Pexels](https://pexels.com/) for stock images
- [Lucide](https://lucide.dev/) for beautiful icons
- [Tailwind CSS](https://tailwindcss.com/) for styling system

## 📞 Support

For support, email 19bcs1072@gmail.com or join our Slack channel.

