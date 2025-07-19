import { Message } from '../types';

const AI_RESPONSES = [
  "That's an interesting question! Let me think about that for a moment.",
  "I understand what you're asking. Here's my perspective on that topic.",
  "Great point! I can help you with that. Let me provide some insights.",
  "I see what you mean. That's definitely worth exploring further.",
  "Thanks for sharing that with me. I have some thoughts on this.",
  "That's a fascinating topic. Let me break this down for you.",
  "I appreciate your question. Here's what I think about that.",
  "Good question! There are several ways to approach this.",
  "I'm glad you asked about that. Let me explain my understanding.",
  "That's something I can definitely help you with. Here's my take.",
];

export function generateAIResponse(userMessage: string): Promise<string> {
  return new Promise((resolve) => {
    const delay = Math.random() * 3000 + 1000; // 1-4 seconds
    
    setTimeout(() => {
      const randomResponse = AI_RESPONSES[Math.floor(Math.random() * AI_RESPONSES.length)];
      resolve(randomResponse);
    }, delay);
  });
}

export function generateDummyMessages(chatRoomId: string, count: number = 20): Message[] {
  const messages: Message[] = [];
  const now = new Date();
  
  for (let i = 0; i < count; i++) {
    const timestamp = new Date(now.getTime() - (i * 60000)); // 1 minute apart
    
    messages.unshift({
      id: `msg-${Date.now()}-${i}`,
      content: i % 2 === 0 
        ? `This is a sample user message #${i + 1}`
        : `This is a sample AI response #${i + 1}. I'm here to help you with any questions you might have.`,
      sender: i % 2 === 0 ? 'user' : 'ai',
      timestamp,
      chatRoomId,
    });
  }
  
  return messages;
}