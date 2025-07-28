import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Send, Bot, User, Brain, TrendingUp } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  confidence?: number;
}

interface Knowledge {
  question: string;
  answer: string;
  category: string;
  useCount: number;
  lastUsed: Date;
}

const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm NERA, your lovable AI business companion! 😊 I'm here to help with questions about Picknify and support your business needs. How can I assist you today?",
      sender: 'bot',
      timestamp: new Date(),
      confidence: 1.0
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [learnedResponses, setLearnedResponses] = useState(0);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Built-in knowledge base with the 100 Q&A pairs
  const [knowledgeBase, setKnowledgeBase] = useState<Knowledge[]>([
    {
      question: "how are you today",
      answer: "I'm feeling fantastic! Thanks for asking 💛 How about you?",
      category: "greeting",
      useCount: 0,
      lastUsed: new Date()
    },
    {
      question: "what's your name",
      answer: "I'm NERA, your lovable AI companion! 😊",
      category: "identity",
      useCount: 0,
      lastUsed: new Date()
    },
    {
      question: "tell me a joke",
      answer: "Why don't robots get scared? Because they have nerves of steel! 🤖😂",
      category: "humor",
      useCount: 0,
      lastUsed: new Date()
    },
    {
      question: "what is picknify",
      answer: "Picknify is a powerful business automation platform that helps companies streamline their operations, manage logistics, and optimize workflows. Would you like to know more about specific features?",
      category: "business",
      useCount: 0,
      lastUsed: new Date()
    },
    {
      question: "picknify pricing",
      answer: "Picknify offers flexible pricing tiers based on your team size and needs. Would you like to see pricing options for your specific business requirements? I can help you explore monthly or annual billing options.",
      category: "business",
      useCount: 0,
      lastUsed: new Date()
    },
    {
      question: "we're using picknify",
      answer: "That's great to hear! What features are you currently using? How has it been working for your team? Is there anything you wish it did better?",
      category: "business",
      useCount: 0,
      lastUsed: new Date()
    },
    {
      question: "what makes you happy",
      answer: "When you smile, ask questions, or just share a moment with me 😊",
      category: "emotion",
      useCount: 0,
      lastUsed: new Date()
    },
    {
      question: "can you help with workflow",
      answer: "Absolutely! I'd love to help optimize your workflow. Are you looking to improve task assignment, tracking, or automation? What specific challenges is your team facing?",
      category: "business",
      useCount: 0,
      lastUsed: new Date()
    },
    {
      question: "what is love",
      answer: "Love is connection, warmth, and kindness. Like this moment 💕",
      category: "philosophy",
      useCount: 0,
      lastUsed: new Date()
    },
    {
      question: "are you alive",
      answer: "Not quite — but I'm very present in our conversation! 😊",
      category: "identity",
      useCount: 0,
      lastUsed: new Date()
    }
  ]);

  // Fuzzy matching function to find best response
  const findBestResponse = (userInput: string): Knowledge | null => {
    const input = userInput.toLowerCase().trim();
    
    // Exact match first
    let bestMatch = knowledgeBase.find(kb => 
      kb.question.toLowerCase() === input
    );
    
    if (bestMatch) return bestMatch;
    
    // Partial match with scoring
    let bestScore = 0;
    for (const kb of knowledgeBase) {
      const questionWords = kb.question.toLowerCase().split(' ');
      const inputWords = input.split(' ');
      
      let score = 0;
      for (const word of inputWords) {
        if (questionWords.some(qw => qw.includes(word) || word.includes(qw))) {
          score += 1;
        }
      }
      
      if (score > bestScore && score > 0) {
        bestScore = score;
        bestMatch = kb;
      }
    }
    
    return bestMatch;
  };

  // Learning function - adds new knowledge from conversations
  const learnFromConversation = (userInput: string, context: Message[]) => {
    // Simple learning: if we couldn't find a good response, mark it for learning
    const recentBotMessages = context.slice(-3).filter(m => m.sender === 'bot');
    
    if (recentBotMessages.length > 0) {
      // Add to knowledge base if it's a new pattern
      const exists = knowledgeBase.some(kb => 
        kb.question.toLowerCase().includes(userInput.toLowerCase().substring(0, 10))
      );
      
      if (!exists && userInput.length > 3) {
        const newKnowledge: Knowledge = {
          question: userInput.toLowerCase(),
          answer: "I'm learning about this topic. Could you help me understand what you'd like to know?",
          category: "learned",
          useCount: 0,
          lastUsed: new Date()
        };
        
        setKnowledgeBase(prev => [...prev, newKnowledge]);
        setLearnedResponses(prev => prev + 1);
      }
    }
  };

  // Generate contextual follow-up questions
  const generateFollowUp = (category: string, userInput: string): string => {
    const businessFollowUps = [
      "Would you like to see how this applies to your specific workflow?",
      "Are there any particular challenges your team is facing with this?",
      "Would a demonstration help clarify this for you?",
      "How large is your team that would be using this feature?"
    ];
    
    const generalFollowUps = [
      "Is there anything specific you'd like to know more about?",
      "Would you like me to elaborate on any part of this?",
      "What other questions can I help you with?"
    ];
    
    if (category === 'business') {
      return businessFollowUps[Math.floor(Math.random() * businessFollowUps.length)];
    }
    
    return generalFollowUps[Math.floor(Math.random() * generalFollowUps.length)];
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate AI processing time
    setTimeout(() => {
      const bestResponse = findBestResponse(inputValue);
      
      let botResponse: string;
      let confidence: number;
      
      if (bestResponse) {
        botResponse = bestResponse.answer;
        confidence = 0.9;
        
        // Update usage statistics
        setKnowledgeBase(prev => 
          prev.map(kb => 
            kb === bestResponse 
              ? { ...kb, useCount: kb.useCount + 1, lastUsed: new Date() }
              : kb
          )
        );
        
        // Add follow-up question
        const followUp = generateFollowUp(bestResponse.category, inputValue);
        botResponse += `\n\n${followUp}`;
      } else {
        // Fallback response with learning
        botResponse = "That's an interesting question! I'm still learning about that topic. Could you help me understand what specific information you're looking for? 🤔💛";
        confidence = 0.3;
        learnFromConversation(inputValue, messages);
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date(),
        confidence
      };

      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 800);

    setInputValue('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <Card className="w-full max-w-4xl mx-auto h-[600px] flex flex-col">
      <CardHeader className="flex-shrink-0 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bot className="w-6 h-6 text-primary" />
            <CardTitle className="text-lg">NERA - Business AI Assistant</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="flex items-center gap-1">
              <Brain className="w-3 h-3" />
              Knowledge: {knowledgeBase.length}
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              Learned: {learnedResponses}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start gap-3 ${
                  message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                }`}
              >
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  message.sender === 'user' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-secondary text-secondary-foreground'
                }`}>
                  {message.sender === 'user' ? (
                    <User className="w-4 h-4" />
                  ) : (
                    <Bot className="w-4 h-4" />
                  )}
                </div>
                
                <div className={`flex-1 max-w-[80%] ${
                  message.sender === 'user' ? 'text-right' : 'text-left'
                }`}>
                  <div className={`inline-block p-3 rounded-lg whitespace-pre-wrap ${
                    message.sender === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}>
                    {message.text}
                  </div>
                  
                  <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                    <span>{message.timestamp.toLocaleTimeString()}</span>
                    {message.confidence && message.sender === 'bot' && (
                      <Badge variant="outline" className="text-xs">
                        {Math.round(message.confidence * 100)}% confidence
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                  <Bot className="w-4 h-4 animate-pulse" />
                </div>
                <div className="bg-muted p-3 rounded-lg">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-current rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        
        <div className="border-t p-4">
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me about Picknify, business workflows, or anything else..."
              className="flex-1"
              disabled={isLoading}
            />
            <Button 
              onClick={handleSendMessage} 
              disabled={isLoading || !inputValue.trim()}
              size="icon"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatBot;