import React, { useState } from 'react';
import { Sparkles, Send, X, Loader2 } from 'lucide-react';
import { AiEngine } from '../services/aiEngine';

interface AiCopilotPanelProps {
  isOpen: boolean;
  onClose: () => void;
  skillName: string;
  lessonTitle?: string;
  activeStage?: string;
}

export const AiCopilotPanel: React.FC<AiCopilotPanelProps> = ({
  isOpen,
  onClose,
  skillName,
  lessonTitle = 'Learn',
  activeStage = 'LEARN'
}) => {
  const [messages, setMessages] = useState<{ sender: 'ai' | 'user'; text: string }[]>([
    {
      sender: 'ai',
      text: `✦ **AI COPILOT** initialized for **${skillName}**.\nI am tracking your current lesson: *${lessonTitle}* (${activeStage}). Ask me anything!`
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  if (!isOpen) return null;

  const handleSend = (promptText?: string) => {
    const text = promptText || input;
    if (!text.trim() || isTyping) return;

    const newMsgs = [...messages, { sender: 'user' as const, text: text }];
    setMessages(newMsgs);
    if (!promptText) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = AiEngine.askAssistant(skillName, text, lessonTitle);
      setMessages([...newMsgs, { sender: 'ai', text: response }]);
      setIsTyping(false);
    }, 450);
  };

  const quickPrompts = [
    'Explain simply',
    'Show an example',
    'Give me a hint',
    'Why is this wrong?',
    'Quiz me',
    'Give me a harder challenge'
  ];

  return (
    <aside 
      className="w-full lg:w-[360px] glass-panel border-l border-surface-border shadow-2xl flex flex-col justify-between h-[600px] lg:h-auto rounded-2xl lg:rounded-none overflow-hidden font-sans"
      aria-label="Contextual AI Copilot"
    >
      
      {/* Header */}
      <div className="p-3.5 bg-surface-low border-b border-surface-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-gradient-to-tr from-indigo-600 to-cyan-400 text-text-primary flex items-center justify-center shadow-glow-primary">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-xs text-text-primary">✦ AI COPILOT</span>
              <span className="bg-surface-low text-primary text-[9px] font-mono px-1.5 rounded">Contextual</span>
            </div>
            <p className="text-[10px] text-text-muted truncate max-w-[190px] font-mono">
              {skillName} • {activeStage}
            </p>
          </div>
        </div>

        <button 
          onClick={onClose} 
          className="p-1 rounded-md text-text-muted hover:text-text-primary hover:bg-surface-high transition"
          aria-label="Close AI copilot"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Messages */}
      <div className="p-3.5 flex-1 overflow-y-auto space-y-3 font-mono text-xs">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.sender === 'ai' && (
              <div className="w-5 h-5 rounded bg-surface-low border border-primary/40 text-primary flex items-center justify-center shrink-0 mt-0.5">
                <Sparkles className="w-3 h-3 text-amber-300" />
              </div>
            )}
            <div
              className={`p-2.5 rounded-xl max-w-[88%] leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-primary-brand text-text-primary font-sans rounded-tr-none text-xs'
                  : 'bg-surface-low text-text-secondary border border-surface-border rounded-tl-none whitespace-pre-wrap text-[11px]'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-2 justify-start items-center text-text-muted text-xs">
            <div className="w-5 h-5 rounded bg-surface-low border border-primary/40 text-primary flex items-center justify-center shrink-0">
              <Loader2 className="w-3 h-3 animate-spin text-primary" />
            </div>
            <span className="font-mono text-[11px]">Thinking...</span>
          </div>
        )}
      </div>

      {/* Contextual Quick Prompts */}
      <div className="p-3 bg-surface-low/80 border-t border-surface-border space-y-2">
        <div className="label-mono">Suggested Prompts:</div>
        <div className="flex flex-wrap gap-1">
          {quickPrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(p)}
              disabled={isTyping}
              className="text-[10px] font-mono bg-surface-card hover:bg-surface-high text-text-secondary border border-surface-border px-2 py-0.5 rounded transition hover:border-primary/50 disabled:opacity-50"
            >
              {p}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-1.5 pt-1"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Copilot about this lesson..."
            className="w-full bg-surface-card border border-surface-border text-text-primary placeholder-text-muted text-xs px-2.5 py-1.5 rounded-lg focus:outline-none focus:border-primary"
          />
          <button
            type="submit"
            disabled={isTyping || !input.trim()}
            className="p-1.5 bg-primary-brand hover:bg-primary-brand disabled:opacity-40 text-text-primary rounded-lg transition shrink-0"
            aria-label="Send message"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>

    </aside>
  );
};
