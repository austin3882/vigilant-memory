import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Plus, Trash2, Edit, Save, X, Brain, TrendingUp, Clock } from 'lucide-react';

interface Knowledge {
  id: string;
  question: string;
  answer: string;
  category: string;
  useCount: number;
  lastUsed: Date;
  confidence: number;
}

const KnowledgeManager = () => {
  const [knowledge, setKnowledge] = useState<Knowledge[]>([
    {
      id: '1',
      question: 'what is picknify',
      answer: 'Picknify is a powerful business automation platform that helps companies streamline their operations, manage logistics, and optimize workflows.',
      category: 'business',
      useCount: 15,
      lastUsed: new Date(),
      confidence: 0.95
    },
    {
      id: '2', 
      question: 'how does picknify pricing work',
      answer: 'Picknify offers flexible pricing tiers: Starter ($29/month), Professional ($79/month), and Enterprise (custom pricing). All plans include core features with increasing limits and advanced capabilities.',
      category: 'business',
      useCount: 8,
      lastUsed: new Date(Date.now() - 86400000),
      confidence: 0.92
    },
    {
      id: '3',
      question: 'what integrations does picknify support',
      answer: 'Picknify integrates with major platforms including Salesforce, Slack, Microsoft Teams, QuickBooks, and over 500+ apps through Zapier. We also offer REST APIs for custom integrations.',
      category: 'technical',
      useCount: 12,
      lastUsed: new Date(Date.now() - 172800000),
      confidence: 0.88
    }
  ]);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [newKnowledge, setNewKnowledge] = useState({
    question: '',
    answer: '',
    category: 'general'
  });

  const categories = ['general', 'business', 'technical', 'support', 'pricing', 'features'];

  const addKnowledge = () => {
    if (!newKnowledge.question.trim() || !newKnowledge.answer.trim()) return;

    const knowledge_item: Knowledge = {
      id: Date.now().toString(),
      question: newKnowledge.question.toLowerCase().trim(),
      answer: newKnowledge.answer.trim(),
      category: newKnowledge.category,
      useCount: 0,
      lastUsed: new Date(),
      confidence: 0.8
    };

    setKnowledge(prev => [...prev, knowledge_item]);
    setNewKnowledge({ question: '', answer: '', category: 'general' });
  };

  const deleteKnowledge = (id: string) => {
    setKnowledge(prev => prev.filter(k => k.id !== id));
  };

  const updateKnowledge = (id: string, updates: Partial<Knowledge>) => {
    setKnowledge(prev => prev.map(k => 
      k.id === id ? { ...k, ...updates } : k
    ));
    setEditingId(null);
  };

  const exportKnowledge = () => {
    const dataStr = JSON.stringify(knowledge, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'chatbot-knowledge.json';
    link.click();
  };

  const importKnowledge = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target?.result as string);
        setKnowledge(prev => [...prev, ...imported]);
      } catch (error) {
        console.error('Failed to import knowledge:', error);
      }
    };
    reader.readAsText(file);
  };

  const getAnalytics = () => {
    const totalUses = knowledge.reduce((sum, k) => sum + k.useCount, 0);
    const avgConfidence = knowledge.reduce((sum, k) => sum + k.confidence, 0) / knowledge.length;
    const categoryStats = categories.map(cat => ({
      name: cat,
      count: knowledge.filter(k => k.category === cat).length
    }));

    return { totalUses, avgConfidence, categoryStats };
  };

  const analytics = getAnalytics();

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5" />
            AI Knowledge Management System
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Brain className="w-4 h-4 text-blue-500" />
                  <span className="text-sm text-muted-foreground">Knowledge Base</span>
                </div>
                <p className="text-2xl font-bold">{knowledge.length}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-muted-foreground">Total Uses</span>
                </div>
                <p className="text-2xl font-bold">{analytics.totalUses}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-purple-500" />
                  <span className="text-sm text-muted-foreground">Avg Confidence</span>
                </div>
                <p className="text-2xl font-bold">{(analytics.avgConfidence * 100).toFixed(1)}%</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="manage" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="manage">Manage Knowledge</TabsTrigger>
              <TabsTrigger value="add">Add Knowledge</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>
            
            <TabsContent value="manage" className="mt-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Knowledge Base ({knowledge.length} entries)</h3>
                <div className="flex gap-2">
                  <Button onClick={exportKnowledge} variant="outline" size="sm">
                    Export JSON
                  </Button>
                  <label>
                    <Button variant="outline" size="sm" asChild>
                      <span>Import JSON</span>
                    </Button>
                    <input
                      type="file"
                      accept=".json"
                      onChange={importKnowledge}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
              
              <ScrollArea className="h-[400px]">
                <div className="space-y-4">
                  {knowledge.map((item) => (
                    <Card key={item.id}>
                      <CardContent className="p-4">
                        {editingId === item.id ? (
                          <div className="space-y-3">
                            <Input
                              defaultValue={item.question}
                              onBlur={(e) => updateKnowledge(item.id, { question: e.target.value })}
                              placeholder="Question"
                            />
                            <Textarea
                              defaultValue={item.answer}
                              onBlur={(e) => updateKnowledge(item.id, { answer: e.target.value })}
                              placeholder="Answer"
                              rows={3}
                            />
                            <div className="flex justify-between items-center">
                              <Select
                                defaultValue={item.category}
                                onValueChange={(value) => updateKnowledge(item.id, { category: value })}
                              >
                                <SelectTrigger className="w-40">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {categories.map(cat => (
                                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <div className="flex gap-2">
                                <Button size="sm" onClick={() => setEditingId(null)}>
                                  <Save className="w-4 h-4" />
                                </Button>
                                <Button size="sm" variant="outline" onClick={() => setEditingId(null)}>
                                  <X className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <div className="flex justify-between items-start mb-2">
                              <div className="flex-1">
                                <p className="font-medium text-sm mb-1">Q: {item.question}</p>
                                <p className="text-sm text-muted-foreground">{item.answer}</p>
                              </div>
                              <div className="flex gap-2 ml-4">
                                <Button 
                                  size="sm" 
                                  variant="ghost"
                                  onClick={() => setEditingId(item.id)}
                                >
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="ghost"
                                  onClick={() => deleteKnowledge(item.id)}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge variant="secondary">{item.category}</Badge>
                              <Badge variant="outline">Used {item.useCount} times</Badge>
                              <Badge variant="outline">{(item.confidence * 100).toFixed(0)}% confidence</Badge>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
            
            <TabsContent value="add" className="mt-4">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Question</label>
                  <Input
                    value={newKnowledge.question}
                    onChange={(e) => setNewKnowledge(prev => ({ ...prev, question: e.target.value }))}
                    placeholder="Enter the question or keyword..."
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Answer</label>
                  <Textarea
                    value={newKnowledge.answer}
                    onChange={(e) => setNewKnowledge(prev => ({ ...prev, answer: e.target.value }))}
                    placeholder="Enter the response..."
                    rows={4}
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Category</label>
                  <Select
                    value={newKnowledge.category}
                    onValueChange={(value) => setNewKnowledge(prev => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(cat => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <Button onClick={addKnowledge} className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Knowledge
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="analytics" className="mt-4">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Category Distribution</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {analytics.categoryStats.map(stat => (
                      <Card key={stat.name}>
                        <CardContent className="p-4 text-center">
                          <p className="text-sm text-muted-foreground capitalize">{stat.name}</p>
                          <p className="text-2xl font-bold">{stat.count}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-4">Most Used Knowledge</h3>
                  <div className="space-y-2">
                    {knowledge
                      .sort((a, b) => b.useCount - a.useCount)
                      .slice(0, 5)
                      .map(item => (
                        <div key={item.id} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                          <span className="font-medium">{item.question}</span>
                          <Badge>{item.useCount} uses</Badge>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default KnowledgeManager;