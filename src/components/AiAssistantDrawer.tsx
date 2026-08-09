import React, { useState } from 'react';
import { X, Sparkles, Send, Bot, User, Lightbulb, Code } from 'lucide-react';
import { AiEngine } from '../services/aiEngine';

interface AiAssistantDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  skillName: string;
  initialQuestion?: string;
}

export const AiAssistantDrawer: React.FC<AiAssistantDrawerProps> = ({
  isOpen,
  onClose,
  skillName,
  initialQuestion
}) => {
  const [messages, setMessages] = useState<{ sender: 'ai' | 'user'; text: string }[]>([
    {
      sender: 'ai',
      text: `Hello! I'm your contextual AI learning assistant for **${skillName}**. Ask me to explain concepts simpler, provide custom code examples, or quiz you!`
    }
  ]);
  const [input, setInput] = useState('');

  if (!isOpen) return null;

  const handleSend = (textToSend?: string) => {
    const q = textToSend || input;
    if (!q.trim()) return;

    const newMsgs = [...messages, { sender: 'user' as const, text: q }];
    setMessages(newMsgs);
    if (!textToSend) setInput('');

    setTimeout(() => {
      const response = AiEngine.askAssistant(skillName, q);
      setMessages([...newMsgs, { sender: 'ai', text: response }]);
    }, 400);
  };

  const quickPromptChips = [
    'Explain this more simply.',
    'Give me another example.',
    'Why does this code work?',
    'Give me a harder exercise.',
    'Quiz me on this concept.'
  ];

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[420px] glass-panel border-l border-slate-800 shadow-2xl flex flex-col justify-between animate-slideInRight">
      
      {/* Drawer Header */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-surface-low/80">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-600/90 text-text-primary flex items-center justify-center shadow-glow-primary">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-text-primary text-sm">AI Learning Assistant</h3>
            <p className="text-[10px] text-text-muted font-medium">Context: {skillName}</p>
          </div>
        </div>

        <button onClick={onClose} className="p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-slate-800">
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="p-4 flex-1 overflow-y-auto space-y-4 text-xs">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {m.sender === 'ai' && (
              <div className="w-6 h-6 rounded-md bg-indigo-950 border border-indigo-800 text-indigo-400 flex items-center justify-center shrink-0 mt-0.5">
                <Sparkles className="w-3 h-3 text-amber-300" />
              </div>
            )}
            
            <div className={`p-3 rounded-2xl max-w-[85%] leading-relaxed ${
              m.sender === 'user' 
                ? 'bg-indigo-600 text-text-primary font-medium rounded-tr-none' 
                : 'bg-surface-low text-text-secondary border border-slate-800 rounded-tl-none whitespace-pre-wrap'
            }`}>
              {m.text}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Prompt Chips */}
      <div className="p-3 border-t border-slate-800 bg-background/60 space-y-2">
        <div className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Suggested Questions:</div>
        <div className="flex flex-wrap gap-1.5">
          {quickPromptChips.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(chip)}
              className="text-[11px] bg-surface-low hover:bg-slate-800 text-text-secondary border border-slate-800 px-2.5 py-1 rounded-lg transition"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2 pt-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask AI anything about this lesson..."
            className="w-full bg-surface-low border border-slate-800 text-text-primary placeholder-slate-400 text-xs px-3 py-2 rounded-xl focus:outline-none focus:border-indigo-500"
          />
          <button
            type="submit"
            className="p-2 bg-indigo-600 hover:bg-indigo-500 text-text-primary rounded-xl shadow-glow-primary transition shrink-0"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>

    </div>
  );
};
