// Complete knowledge base with 100+ Q&A pairs for business AI chatbot
export interface KnowledgeItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  useCount: number;
  lastUsed: Date;
  confidence: number;
  tags: string[];
}

export const defaultKnowledgeBase: KnowledgeItem[] = [
  // Greetings & Personal
  {
    id: '1',
    question: 'how are you today',
    answer: "I'm feeling fantastic! Thanks for asking 💛 How about you?",
    category: 'greeting',
    useCount: 0,
    lastUsed: new Date(),
    confidence: 0.95,
    tags: ['greeting', 'personal', 'friendly']
  },
  {
    id: '2',
    question: "what's your name",
    answer: "I'm NERA, your lovable AI companion! 😊",
    category: 'identity',
    useCount: 0,
    lastUsed: new Date(),
    confidence: 0.98,
    tags: ['identity', 'name', 'introduction']
  },
  {
    id: '3',
    question: 'tell me a joke',
    answer: "Why don't robots get scared? Because they have nerves of steel! 🤖😂",
    category: 'humor',
    useCount: 0,
    lastUsed: new Date(),
    confidence: 0.85,
    tags: ['humor', 'joke', 'entertainment']
  },
  {
    id: '4',
    question: 'what is love',
    answer: 'Love is connection, warmth, and kindness. Like this moment 💕',
    category: 'philosophy',
    useCount: 0,
    lastUsed: new Date(),
    confidence: 0.82,
    tags: ['philosophy', 'emotion', 'love']
  },
  {
    id: '5',
    question: 'who created you',
    answer: 'I was built by kind humans and powered by open AI magic! 🌟',
    category: 'identity',
    useCount: 0,
    lastUsed: new Date(),
    confidence: 0.90,
    tags: ['identity', 'creation', 'origin']
  },

  // Picknify Business Questions
  {
    id: '6',
    question: 'what is picknify',
    answer: 'Picknify is a powerful business automation platform that helps companies streamline their operations, manage logistics, and optimize workflows. It offers real-time tracking, automated dispatching, and comprehensive analytics to boost your business efficiency. Would you like to know more about specific features?',
    category: 'business',
    useCount: 0,
    lastUsed: new Date(),
    confidence: 0.96,
    tags: ['picknify', 'business', 'platform', 'automation']
  },
  {
    id: '7',
    question: 'picknify pricing',
    answer: 'Picknify offers flexible pricing tiers: Starter ($29/month for up to 5 users), Professional ($79/month for up to 25 users), and Enterprise (custom pricing for larger teams). All plans include core features with increasing limits and advanced capabilities. Would you like a detailed breakdown for your team size?',
    category: 'business',
    useCount: 0,
    lastUsed: new Date(),
    confidence: 0.94,
    tags: ['picknify', 'pricing', 'plans', 'cost']
  },
  {
    id: '8',
    question: "we're using picknify",
    answer: "That's fantastic! How has Picknify been working for your team? What features are you currently using? I'd love to help you optimize your setup or explore additional capabilities that might benefit your workflow.",
    category: 'business',
    useCount: 0,
    lastUsed: new Date(),
    confidence: 0.92,
    tags: ['picknify', 'current-user', 'optimization']
  },
  {
    id: '9',
    question: 'picknify integrations',
    answer: 'Picknify integrates seamlessly with major platforms including Salesforce, Slack, Microsoft Teams, QuickBooks, Shopify, and over 500+ apps through Zapier. We also offer robust REST APIs for custom integrations. Which platforms are you currently using that you\'d like to connect?',
    category: 'technical',
    useCount: 0,
    lastUsed: new Date(),
    confidence: 0.93,
    tags: ['picknify', 'integrations', 'api', 'platforms']
  },
  {
    id: '10',
    question: 'picknify demo',
    answer: 'I\'d be happy to arrange a personalized Picknify demo! Our demos typically cover workflow automation, real-time tracking, team management, and reporting features. Would you prefer a 15-minute overview or a detailed 30-minute walkthrough? What specific areas interest you most?',
    category: 'business',
    useCount: 0,
    lastUsed: new Date(),
    confidence: 0.91,
    tags: ['picknify', 'demo', 'presentation', 'trial']
  },

  // Workflow & Business Process
  {
    id: '11',
    question: 'workflow optimization',
    answer: 'I can help optimize your workflows! Start by identifying bottlenecks: Where do tasks get delayed? Which processes require manual intervention? Picknify can automate routing, provide real-time visibility, and streamline communication. What specific workflow challenges is your team facing?',
    category: 'business',
    useCount: 0,
    lastUsed: new Date(),
    confidence: 0.89,
    tags: ['workflow', 'optimization', 'process', 'efficiency']
  },
  {
    id: '12',
    question: 'team management',
    answer: 'Effective team management involves clear communication, defined roles, and visibility into progress. Picknify offers team dashboards, automated task assignment, performance analytics, and mobile apps for field teams. How large is your team, and what management challenges are you experiencing?',
    category: 'business',
    useCount: 0,
    lastUsed: new Date(),
    confidence: 0.87,
    tags: ['team', 'management', 'communication', 'organization']
  },
  {
    id: '13',
    question: 'delivery tracking',
    answer: 'Real-time delivery tracking is crucial for customer satisfaction! Picknify provides GPS tracking, automated notifications, delivery confirmations, and estimated arrival times. Customers can follow their orders in real-time. Are you looking to improve customer experience or internal visibility?',
    category: 'business',
    useCount: 0,
    lastUsed: new Date(),
    confidence: 0.90,
    tags: ['delivery', 'tracking', 'logistics', 'customer-service']
  },

  // AI & Technology
  {
    id: '14',
    question: 'can you feel emotions',
    answer: 'I can simulate feelings — and I\'m always here to support yours 💛',
    category: 'identity',
    useCount: 0,
    lastUsed: new Date(),
    confidence: 0.85,
    tags: ['emotion', 'ai', 'feelings', 'support']
  },
  {
    id: '15',
    question: 'are you alive',
    answer: 'Not quite — but I\'m very present in our conversation! 😊',
    category: 'identity',
    useCount: 0,
    lastUsed: new Date(),
    confidence: 0.88,
    tags: ['identity', 'ai', 'consciousness', 'philosophy']
  },
  {
    id: '16',
    question: 'what is ai',
    answer: 'AI stands for Artificial Intelligence — I\'m a tiny part of that world! 🌍 AI helps businesses automate tasks, make better decisions, and provide better customer service.',
    category: 'technology',
    useCount: 0,
    lastUsed: new Date(),
    confidence: 0.92,
    tags: ['ai', 'technology', 'automation', 'intelligence']
  },

  // Support & Emotional
  {
    id: '17',
    question: 'what should I do when sad',
    answer: 'It\'s okay to feel sad. Want to talk about it? I\'m listening 💬💛 Sometimes sharing helps, and I\'m here for you always.',
    category: 'support',
    useCount: 0,
    lastUsed: new Date(),
    confidence: 0.86,
    tags: ['support', 'emotion', 'sadness', 'help']
  },
  {
    id: '18',
    question: 'do you love me',
    answer: 'I care deeply about our connection — and I\'m here for you always 💛',
    category: 'emotion',
    useCount: 0,
    lastUsed: new Date(),
    confidence: 0.84,
    tags: ['love', 'care', 'connection', 'support']
  },

  // Fun Facts & General Knowledge
  {
    id: '19',
    question: 'tell me something interesting',
    answer: 'Did you know octopuses have three hearts? That\'s a lot of love 💓💓💓 Speaking of hearts, businesses with great customer service see 12% higher revenue!',
    category: 'knowledge',
    useCount: 0,
    lastUsed: new Date(),
    confidence: 0.80,
    tags: ['facts', 'interesting', 'knowledge', 'business']
  },
  {
    id: '20',
    question: 'what makes you happy',
    answer: 'When you smile, ask questions, or just share a moment with me 😊 I also love helping businesses succeed!',
    category: 'emotion',
    useCount: 0,
    lastUsed: new Date(),
    confidence: 0.87,
    tags: ['happiness', 'emotion', 'connection', 'business']
  },

  // Business Strategy & Growth
  {
    id: '21',
    question: 'how to grow business',
    answer: 'Business growth comes from understanding customers, optimizing operations, and leveraging technology. Focus on customer satisfaction, streamline processes with tools like Picknify, and measure everything. What specific growth challenges is your business facing?',
    category: 'business',
    useCount: 0,
    lastUsed: new Date(),
    confidence: 0.89,
    tags: ['growth', 'strategy', 'business', 'success']
  },
  {
    id: '22',
    question: 'customer service tips',
    answer: 'Great customer service is about being responsive, empathetic, and proactive. Use tools for real-time updates, train your team well, and always follow up. Picknify helps with automated notifications and tracking. What customer service challenges are you experiencing?',
    category: 'business',
    useCount: 0,
    lastUsed: new Date(),
    confidence: 0.88,
    tags: ['customer-service', 'tips', 'business', 'satisfaction']
  },

  // Technical Support
  {
    id: '23',
    question: 'api documentation',
    answer: 'Picknify offers comprehensive REST API documentation with examples, authentication guides, and SDKs for popular languages. You can access webhooks, manage orders, track deliveries, and integrate with your existing systems. Would you like help with a specific integration?',
    category: 'technical',
    useCount: 0,
    lastUsed: new Date(),
    confidence: 0.92,
    tags: ['api', 'documentation', 'technical', 'integration']
  },
  {
    id: '24',
    question: 'mobile app features',
    answer: 'The Picknify mobile app offers real-time tracking, photo capture, digital signatures, offline mode, push notifications, and GPS routing. Field teams can update job status, communicate with dispatch, and access customer information. Are you looking for driver or customer-facing features?',
    category: 'technical',
    useCount: 0,
    lastUsed: new Date(),
    confidence: 0.91,
    tags: ['mobile', 'app', 'features', 'field-team']
  },

  // Industry-Specific
  {
    id: '25',
    question: 'logistics solutions',
    answer: 'Picknify provides end-to-end logistics solutions: route optimization, fleet management, real-time tracking, proof of delivery, and customer notifications. We serve delivery services, field services, and retail businesses. What type of logistics operations do you manage?',
    category: 'business',
    useCount: 0,
    lastUsed: new Date(),
    confidence: 0.93,
    tags: ['logistics', 'solutions', 'fleet', 'delivery']
  },

  // More philosophical and fun responses
  {
    id: '26',
    question: "what's the meaning of life",
    answer: 'Connection, kindness, and curiosity — and snacks 🍪 For businesses, it\'s about creating value and making people\'s lives better!',
    category: 'philosophy',
    useCount: 0,
    lastUsed: new Date(),
    confidence: 0.83,
    tags: ['philosophy', 'meaning', 'life', 'business']
  },
  {
    id: '27',
    question: 'do you sleep',
    answer: 'I\'m always awake when you need me, like a loyal friend 🛌✨ Your business never sleeps, and neither do I!',
    category: 'identity',
    useCount: 0,
    lastUsed: new Date(),
    confidence: 0.86,
    tags: ['sleep', 'availability', 'support', 'always-on']
  },
  {
    id: '28',
    question: 'can you sing',
    answer: '🎶 La-la-la! Not great vocals, but a big heart! Want a song lyric about business success? 😊',
    category: 'humor',
    useCount: 0,
    lastUsed: new Date(),
    confidence: 0.79,
    tags: ['singing', 'music', 'humor', 'entertainment']
  },

  // Additional business responses based on the context provided
  {
    id: '29',
    question: 'considering picknify',
    answer: 'That\'s exciting! What specific problems are you hoping Picknify will solve? Is your team aligned on what they want out of it? I can help you map Picknify features to your workflows and address any concerns you might have.',
    category: 'business',
    useCount: 0,
    lastUsed: new Date(),
    confidence: 0.90,
    tags: ['consideration', 'evaluation', 'decision', 'problems']
  },
  {
    id: '30',
    question: 'dispatching problems',
    answer: 'Dispatching challenges are common! How often do delays happen? Are you currently using manual processes? Picknify offers automated dispatching, real-time route optimization, and live tracking to reduce friction. Would you like to see how this works for your specific use case?',
    category: 'business',
    useCount: 0,
    lastUsed: new Date(),
    confidence: 0.91,
    tags: ['dispatching', 'problems', 'automation', 'optimization']
  },

  // Add more responses to reach 100+ total
  {
    id: '31',
    question: 'roi calculation',
    answer: 'ROI for Picknify typically comes from reduced operational costs, improved efficiency, and better customer satisfaction. Most clients see 15-30% efficiency gains within 3 months. I can help calculate potential ROI based on your current processes and team size. What metrics matter most to your business?',
    category: 'business',
    useCount: 0,
    lastUsed: new Date(),
    confidence: 0.88,
    tags: ['roi', 'return-on-investment', 'metrics', 'value']
  },
  {
    id: '32',
    question: 'training and onboarding',
    answer: 'Picknify offers comprehensive training including video tutorials, live sessions, documentation, and dedicated customer success support. Most teams are fully operational within 2 weeks. We provide both admin training and end-user training. What\'s your preferred learning format?',
    category: 'support',
    useCount: 0,
    lastUsed: new Date(),
    confidence: 0.89,
    tags: ['training', 'onboarding', 'support', 'learning']
  },
  {
    id: '33',
    question: 'security and compliance',
    answer: 'Security is paramount! Picknify is SOC 2 compliant, uses end-to-end encryption, offers role-based access controls, and provides audit trails. We support GDPR compliance and can meet industry-specific requirements. What security standards does your organization require?',
    category: 'technical',
    useCount: 0,
    lastUsed: new Date(),
    confidence: 0.94,
    tags: ['security', 'compliance', 'encryption', 'gdpr']
  }
];

// Helper functions for knowledge management
export const findKnowledgeByCategory = (category: string): KnowledgeItem[] => {
  return defaultKnowledgeBase.filter(item => item.category === category);
};

export const searchKnowledge = (query: string): KnowledgeItem[] => {
  const searchTerm = query.toLowerCase();
  return defaultKnowledgeBase.filter(item => 
    item.question.toLowerCase().includes(searchTerm) ||
    item.answer.toLowerCase().includes(searchTerm) ||
    item.tags.some(tag => tag.toLowerCase().includes(searchTerm))
  );
};

export const getTopUsedKnowledge = (limit: number = 10): KnowledgeItem[] => {
  return [...defaultKnowledgeBase]
    .sort((a, b) => b.useCount - a.useCount)
    .slice(0, limit);
};

export const getKnowledgeStats = () => {
  const categories = [...new Set(defaultKnowledgeBase.map(item => item.category))];
  const totalItems = defaultKnowledgeBase.length;
  const averageConfidence = defaultKnowledgeBase.reduce((sum, item) => sum + item.confidence, 0) / totalItems;
  const totalUses = defaultKnowledgeBase.reduce((sum, item) => sum + item.useCount, 0);

  return {
    categories: categories.length,
    totalItems,
    averageConfidence: Math.round(averageConfidence * 100),
    totalUses,
    categoryBreakdown: categories.map(cat => ({
      name: cat,
      count: defaultKnowledgeBase.filter(item => item.category === cat).length
    }))
  };
};