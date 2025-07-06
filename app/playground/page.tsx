'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  PhotoIcon,
  PaperAirplaneIcon,
  SparklesIcon,
  HandThumbUpIcon,
  HandThumbDownIcon,
  ArrowPathIcon,
  DocumentArrowUpIcon
} from '@heroicons/react/24/outline';
import Navigation from '../components/layout/navigation';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  image?: string;
  timestamp: Date;
}

export default function Playground() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const sampleImages = [
    '/api/placeholder/400/300?text=Sample+Image+1',
    '/api/placeholder/400/300?text=Sample+Image+2',
    '/api/placeholder/400/300?text=Sample+Image+3',
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!input.trim() && !selectedImage) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      image: selectedImage || undefined,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setSelectedImage(null);
    setIsLoading(true);

    try {
      const formData = new FormData();
      if (selectedImage) {
        // Convert base64 to blob
        const response = await fetch(selectedImage);
        const blob = await response.blob();
        formData.append('image', blob, 'image.jpg');
      }
      formData.append('prompt', input);

      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: 'ai',
          content: data.result,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, aiMessage]);
      } else {
        throw new Error(data.error || 'Analysis failed');
      }
    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: 'Sorry, I encountered an error while analyzing your image. Please try again.',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFeedback = async (messageId: string, isPositive: boolean) => {
    try {
      await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          analysisId: messageId,
          feedback: isPositive ? 'positive' : 'negative',
        }),
      });
    } catch (error) {
      console.error('Feedback error:', error);
    }
  };

  return (
    <>
      <Navigation />
      
      <div className="min-h-screen bg-background">
        <div className="max-w-6xl mx-auto px-6 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 text-foreground">
              AI Vision Playground
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Upload an image and ask questions. Our AI will analyze and respond with intelligent insights.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="space-y-6">
              {/* Image Upload */}
              <div className="card p-6">
                <h3 className="text-lg font-semibold mb-4 text-foreground">Upload Image</h3>
                
                {selectedImage ? (
                  <div className="relative mb-4">
                    <img 
                      src={selectedImage} 
                      alt="Selected" 
                      className="w-full h-64 object-cover rounded-lg"
                    />
                    <button
                      onClick={() => setSelectedImage(null)}
                      className="absolute top-2 right-2 p-2 bg-destructive text-destructive-foreground rounded-full hover:bg-destructive/90 transition-colors"
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-muted-foreground/20 rounded-lg p-8 text-center cursor-pointer hover:border-muted-foreground/40 transition-colors"
                    >
                      <PhotoIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-muted-foreground mb-2">Click to upload an image</p>
                      <p className="text-sm text-muted-foreground">or drag and drop</p>
                    </div>
                    
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </div>
                )}

                {/* Sample Images */}
                <div className="mt-6">
                  <h4 className="text-sm font-medium mb-3 text-muted-foreground">Or try with sample images:</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {sampleImages.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(image)}
                        className="aspect-square rounded-lg overflow-hidden hover:opacity-80 transition-opacity"
                      >
                        <img 
                          src={image} 
                          alt={`Sample ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Question Input */}
              <div className="card p-6">
                <h3 className="text-lg font-semibold mb-4 text-foreground">Ask a Question</h3>
                <div className="space-y-4">
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="What would you like to know about this image?"
                    className="input min-h-[100px] resize-none"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSubmit();
                      }
                    }}
                  />
                  
                  <div className="flex gap-2">
                    <button
                      onClick={handleSubmit}
                      disabled={isLoading || (!input.trim() && !selectedImage)}
                      className="btn btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <>
                          <ArrowPathIcon className="h-5 w-5 mr-2 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <PaperAirplaneIcon className="h-5 w-5 mr-2" />
                          Ask AI
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Chat Section */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold mb-4 text-foreground">Conversation</h3>
              
              <div className="space-y-4 max-h-[600px] overflow-y-auto">
                <AnimatePresence>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[80%] ${message.type === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'} rounded-lg p-4`}>
                        {message.image && (
                          <img 
                            src={message.image} 
                            alt="User uploaded" 
                            className="w-full h-32 object-cover rounded mb-3"
                          />
                        )}
                        <p className="text-sm">{message.content}</p>
                        
                        {message.type === 'ai' && (
                          <div className="flex gap-2 mt-3">
                                                         <button
                               onClick={() => handleFeedback(message.id, true)}
                               className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                             >
                               <HandThumbUpIcon className="h-4 w-4" />
                             </button>
                             <button
                               onClick={() => handleFeedback(message.id, false)}
                               className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                             >
                               <HandThumbDownIcon className="h-4 w-4" />
                             </button>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="bg-muted rounded-lg p-4">
                      <div className="flex items-center space-x-2">
                        <SparklesIcon className="h-5 w-5 animate-pulse" />
                        <span className="text-sm">AI is thinking...</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {messages.length === 0 && (
                  <div className="text-center py-12 text-muted-foreground">
                    <SparklesIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Start by uploading an image and asking a question!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 