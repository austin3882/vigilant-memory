import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bot, Brain, MessageSquare, Settings } from 'lucide-react';
import ChatBot from '@/components/ChatBot';
import KnowledgeManager from '@/components/KnowledgeManager';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Bot className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              NERA Business AI
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your intelligent offline business assistant powered by advanced AI. 
            Ask questions, get support, and grow your knowledge base - all without internet connectivity.
          </p>
          <div className="flex items-center justify-center gap-4 mt-6">
            <Badge variant="secondary" className="flex items-center gap-2">
              <Brain className="w-4 h-4" />
              100% Offline
            </Badge>
            <Badge variant="outline" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Self-Learning
            </Badge>
            <Badge variant="outline" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Customizable
            </Badge>
          </div>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="chat" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8">
            <TabsTrigger value="chat" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Chat Assistant
            </TabsTrigger>
            <TabsTrigger value="knowledge" className="flex items-center gap-2">
              <Brain className="w-4 h-4" />
              Knowledge Base
            </TabsTrigger>
          </TabsList>

          <TabsContent value="chat">
            <div className="flex flex-col items-center">
              <ChatBot />
              
              <div className="mt-8 text-center">
                <h3 className="text-lg font-semibold mb-4">Featured Capabilities</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Picknify Business Support</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Get detailed information about Picknify features, pricing, and implementation
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Workflow Optimization</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Receive guidance on improving business processes and team productivity
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Continuous Learning</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        The AI learns from conversations to provide better responses over time
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="knowledge">
            <KnowledgeManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
