import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Headphones, 
  Sparkles, 
  Send, 
  X, 
  Minimize2, 
  RotateCcw, 
  Car, 
  ChevronRight, 
  PhoneCall, 
  ShieldCheck, 
  User, 
  Bot,
  ArrowRight,
  Compass
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { vehicleService } from '../../services/vehicleService';
import { matchConciergeQuery, type QuickAction } from './conciergeKnowledge';

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  vehicles?: any[];
  quickActions?: QuickAction[];
}

const DEFAULT_QUICK_ACTIONS: QuickAction[] = [
  { label: '🏎️ Recommend a Supercar', prompt: 'Recommend a high-performance sports car' },
  { label: '🚙 Executive SUV for Road Trip', prompt: 'What luxury SUVs do you have for a family trip?' },
  { label: '💰 Pricing & Deposit Policy', prompt: 'What are your security deposit and payment terms?' },
  { label: '🛡️ Roadside & Breakdown Support', prompt: 'What should I do if the vehicle has a technical breakdown?' },
  { label: '👨‍✈️ Chauffeur Service Details', prompt: 'How does the private chauffeur service work?' },
  { label: '📍 Pickup Locations & Delivery', prompt: 'Where can I pick up the vehicle or request delivery?' },
];

export const ConciergeChatbot: React.FC = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [fleet, setFleet] = useState<any[]>([]);
  const [hasUnread, setHasUnread] = useState(false);
  const [user, setUser] = useState<any>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize user & listen for external trigger event
  useEffect(() => {
    const userStr = localStorage.getItem('drivex_user');
    if (userStr) {
      try {
        const u = JSON.parse(userStr);
        setUser(u);
      } catch (e) {}
    }

    const handleOpenChat = (e: any) => {
      setIsOpen(true);
      setIsMinimized(false);
      setHasUnread(false);
      if (e.detail?.prompt) {
        setTimeout(() => {
          handleSendMessage(e.detail.prompt);
        }, 300);
      }
    };

    window.addEventListener('open-concierge-chat', handleOpenChat);
    return () => window.removeEventListener('open-concierge-chat', handleOpenChat);
  }, []);

  // Fetch fleet to provide real vehicle recommendations
  useEffect(() => {
    const fetchFleet = async () => {
      try {
        const res = await vehicleService.getVehicles({ limit: 15 });
        const list = res?.data || res || [];
        if (Array.isArray(list)) {
          setFleet(list);
        }
      } catch (err) {
        console.error('Failed to load fleet for Concierge Bot:', err);
      }
    };
    fetchFleet();
  }, []);

  const getInitialMessages = (): ChatMessage[] => {
    const name = user?.firstName ? ` ${user.firstName}` : '';
    return [
      {
        id: 'welcome-1',
        sender: 'bot',
        text: `### 🌟 Welcome to DriveX VIP Concierge\n\nGreetings${name}! I am your dedicated AI fleet advisor, available 24/7. Ask me anything about:\n\n• **Fleet Recommendations & Availability** (Sports, Sedans, SUVs, 12-Seater Vans)\n• **Transparent Pricing & Deposit Rules**\n• **Driver License & Age Requirements**\n• **Private Chauffeur Reservations**\n• **Airport Curbside VIP Handover & Hotel Delivery**\n• **24/7 Roadside Assistance & Emergency Support**\n\nHow may I assist you with your journey today?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        quickActions: DEFAULT_QUICK_ACTIONS.slice(0, 4)
      }
    ];
  };

  const [messages, setMessages] = useState<ChatMessage[]>(getInitialMessages);

  // Auto-scroll to bottom of conversation
  useEffect(() => {
    if (isOpen && !isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen, isMinimized]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 250);
    }
  }, [isOpen, isMinimized]);

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setIsTyping(true);

    // Realistic AI concierge typing delay
    setTimeout(() => {
      const response = matchConciergeQuery(text, fleet);
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: response.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        vehicles: response.vehicles,
        quickActions: response.quickActions
      };

      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);

      if (!isOpen) {
        setHasUnread(true);
      }
    }, 600 + Math.random() * 350);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleResetChat = () => {
    setMessages(getInitialMessages());
  };

  // Safe and rich inline Markdown renderer
  const renderFormattedContent = (content: string) => {
    const lines = content.split('\n');
    return (
      <div className="space-y-1.5">
        {lines.map((line, idx) => {
          const trimmed = line.trim();
          if (!trimmed) return <div key={idx} className="h-1" />;

          // Headings (### Title)
          if (trimmed.startsWith('### ')) {
            return (
              <h4 key={idx} className="font-black text-xs sm:text-sm tracking-wide text-[var(--accent)] uppercase mt-2 mb-1 flex items-center gap-1.5">
                {trimmed.replace(/^###\s*/, '')}
              </h4>
            );
          }

          // Bullet points
          if (trimmed.startsWith('• ') || trimmed.startsWith('- ')) {
            const bulletText = trimmed.substring(2);
            return (
              <div key={idx} className="flex items-start gap-2 pl-1 text-xs sm:text-[13px] leading-relaxed">
                <span className="text-[var(--accent)] font-bold shrink-0 mt-0.5">•</span>
                <span className="flex-1">{formatInlineText(bulletText)}</span>
              </div>
            );
          }

          // Numbered lists
          const numMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
          if (numMatch) {
            return (
              <div key={idx} className="flex items-start gap-2 pl-1 text-xs sm:text-[13px] leading-relaxed">
                <span className="text-[var(--accent)] font-mono font-bold shrink-0">{numMatch[1]}.</span>
                <span className="flex-1">{formatInlineText(numMatch[2])}</span>
              </div>
            );
          }

          return (
            <p key={idx} className="text-xs sm:text-[13px] leading-relaxed">
              {formatInlineText(trimmed)}
            </p>
          );
        })}
      </div>
    );
  };

  const formatInlineText = (str: string) => {
    const parts: React.ReactNode[] = [];
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    let lastIndex = 0;
    let match;
    let keyIdx = 0;

    while ((match = linkRegex.exec(str)) !== null) {
      if (match.index > lastIndex) {
        parts.push(processBoldText(str.substring(lastIndex, match.index), keyIdx++));
      }
      const href = match[2];
      const isExternal = href.startsWith('http');
      parts.push(
        <a
          key={keyIdx++}
          href={href}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          className="text-[var(--accent)] underline font-bold hover:text-white transition-colors cursor-pointer"
        >
          {match[1]}
        </a>
      );
      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < str.length) {
      parts.push(processBoldText(str.substring(lastIndex), keyIdx++));
    }

    return parts;
  };

  const processBoldText = (text: string, baseKey: number) => {
    const boldParts = text.split(/\*\*(.*?)\*\*/g);
    return (
      <React.Fragment key={baseKey}>
        {boldParts.map((part, i) =>
          i % 2 === 1 ? (
            <strong key={i} className="font-bold text-[var(--text)]">
              {part}
            </strong>
          ) : (
            part
          )
        )}
      </React.Fragment>
    );
  };

  return (
    <>
      {/* Floating Launcher Trigger Pill */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        <AnimatePresence>
          {!isOpen && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setIsOpen(true);
                setIsMinimized(false);
                setHasUnread(false);
              }}
              className="relative flex items-center gap-3 px-5 py-3.5 bg-gradient-to-r from-[var(--sidebar)] to-[var(--card)] hover:to-[var(--accent)]/10 text-[var(--text)] border border-[var(--accent)]/40 rounded-full shadow-[0_10px_35px_rgba(0,229,255,0.25)] backdrop-blur-xl group transition-all cursor-pointer"
            >
              {/* Glowing animated ping dot */}
              <div className="relative flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-[var(--accent)]/20 border border-[var(--accent)] text-[var(--accent)] flex items-center justify-center group-hover:bg-[var(--accent)] group-hover:text-[var(--text-inverse)] transition-colors">
                  <Headphones size={16} />
                </div>
                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[var(--sidebar)] animate-pulse" />
              </div>

              <div className="text-left hidden sm:block">
                <p className="text-xs font-black tracking-wider uppercase text-[var(--text)]">
                  VIP Concierge
                </p>
                <p className="text-[10px] text-[var(--accent)] font-semibold">
                  24/7 AI Assistance
                </p>
              </div>

              {hasUnread && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-[var(--sidebar)]" />
              )}
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Interactive Chat Window Modal / Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              height: isMinimized ? '72px' : '620px'
            }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-[calc(100vw-32px)] sm:w-[440px] bg-[var(--sidebar)] border border-[var(--accent)]/30 rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,229,255,0.3)] z-50 flex flex-col overflow-hidden backdrop-blur-2xl transition-all duration-300`}
          >
            {/* Header */}
            <div className="p-4 sm:p-5 bg-gradient-to-r from-[var(--sidebar)] via-[var(--card)] to-[var(--sidebar)] border-b border-[var(--border)] flex items-center justify-between shrink-0 relative">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent" />

              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-2xl bg-[var(--accent)]/20 border border-[var(--accent)]/40 text-[var(--accent)] flex items-center justify-center shadow-inner">
                    <Headphones size={20} />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[var(--sidebar)] animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-sm font-black text-[var(--text)] uppercase tracking-wider">
                      DriveX VIP Concierge
                    </h3>
                    <Sparkles size={13} className="text-[var(--accent)]" />
                  </div>
                  <p className="text-[11px] text-[var(--accent)] font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Always Online • Fleet AI
                  </p>
                </div>
              </div>

              {/* Window Controls */}
              <div className="flex items-center gap-1">
                <button
                  onClick={handleResetChat}
                  className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--card-hover)] transition-colors cursor-pointer"
                  title="Clear Conversation"
                >
                  <RotateCcw size={15} />
                </button>
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--card-hover)] transition-colors cursor-pointer"
                  title={isMinimized ? "Expand" : "Minimize"}
                >
                  <Minimize2 size={15} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                  title="Close"
                >
                  <X size={17} />
                </button>
              </div>
            </div>

            {/* Main Chat Body (Hidden when Minimized) */}
            {!isMinimized && (
              <>
                {/* Scrollable Messages Stream */}
                <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4 no-scrollbar bg-[var(--bg)]/50">
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {msg.sender === 'bot' && (
                        <div className="w-8 h-8 rounded-xl bg-[var(--accent)]/15 border border-[var(--accent)]/30 text-[var(--accent)] flex items-center justify-center shrink-0 mt-1">
                          <Bot size={16} />
                        </div>
                      )}

                      <div className={`max-w-[85%] space-y-3`}>
                        <div
                          className={`p-4 rounded-2xl ${
                            msg.sender === 'user'
                              ? 'bg-[var(--accent)] text-[var(--text-inverse)] font-medium rounded-tr-none shadow-md'
                              : 'bg-[var(--card)] text-[var(--text)] border border-[var(--border)] rounded-tl-none shadow-sm'
                          }`}
                        >
                          {msg.sender === 'bot' ? (
                            renderFormattedContent(msg.text)
                          ) : (
                            <p className="text-xs sm:text-[13px] leading-relaxed whitespace-pre-line font-medium">
                              {msg.text}
                            </p>
                          )}
                          <span
                            className={`block text-[10px] mt-2 font-mono ${
                              msg.sender === 'user' ? 'text-black/60 text-right' : 'text-[var(--text-muted)]'
                            }`}
                          >
                            {msg.timestamp}
                          </span>
                        </div>

                        {/* Embedded Vehicle Cards if Bot Recommended Cars */}
                        {msg.vehicles && msg.vehicles.length > 0 && (
                          <div className="space-y-2.5 pt-1">
                            {msg.vehicles.map((v) => {
                              const img = v.primary_image || v.image_url || v.imageUrl || 'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2070&auto=format&fit=crop';
                              const price = parseFloat(v.daily_price || v.pricePerDay || 0);

                              return (
                                <div
                                  key={v.id}
                                  className="bg-[var(--sidebar)] border border-[var(--border)] hover:border-[var(--accent)]/50 rounded-2xl p-3 flex items-center gap-3 shadow-md group transition-all"
                                >
                                  <div className="w-18 h-14 rounded-xl overflow-hidden bg-black shrink-0 border border-[var(--border)]">
                                    <img src={img} alt={v.model || v.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <span className="text-[9px] uppercase font-bold tracking-widest text-[var(--accent)]">
                                      {v.category_name || v.category || 'Luxury'}
                                    </span>
                                    <h4 className="text-xs font-bold text-[var(--text)] truncate">
                                      {v.brand} {v.model || v.name}
                                    </h4>
                                    <p className="text-xs font-bold text-[var(--accent)]">
                                      ${price.toFixed(2)} <span className="text-[10px] text-[var(--text-muted)] font-normal">/ day</span>
                                    </p>
                                  </div>
                                  <button
                                    onClick={() => {
                                      setIsOpen(false);
                                      navigate(`/dashboard/booking/${v.id}`);
                                    }}
                                    className="px-3 py-1.5 rounded-xl bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--text-inverse)] text-xs font-bold uppercase tracking-wider transition-colors shrink-0 shadow-sm cursor-pointer flex items-center gap-1"
                                  >
                                    Book <ArrowRight size={12} />
                                  </button>
                                </div>
                              );
                            })}
                          </div>
                        )}

                        {/* Quick Follow-up Action Chips */}
                        {msg.quickActions && msg.quickActions.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {msg.quickActions.map((action, i) => (
                              <button
                                key={i}
                                onClick={() => handleSendMessage(action.prompt)}
                                className="px-3 py-1.5 rounded-xl bg-[var(--card)] hover:bg-[var(--accent)] hover:text-[var(--text-inverse)] border border-[var(--border)] hover:border-[var(--accent)] text-[11px] font-semibold text-[var(--text)] transition-all cursor-pointer shadow-sm text-left"
                              >
                                {action.label}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      {msg.sender === 'user' && (
                        <div className="w-8 h-8 rounded-xl bg-[var(--card)] border border-[var(--border)] text-[var(--text)] flex items-center justify-center shrink-0 mt-1 font-bold text-xs">
                          {user?.firstName?.[0] || 'U'}
                        </div>
                      )}
                    </motion.div>
                  ))}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 p-3 bg-[var(--card)] border border-[var(--border)] rounded-2xl w-fit"
                    >
                      <Bot size={15} className="text-[var(--accent)]" />
                      <div className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-[var(--accent)] rounded-full animate-bounce [animation-delay:-0.3s]" />
                        <span className="w-1.5 h-1.5 bg-[var(--accent)] rounded-full animate-bounce [animation-delay:-0.15s]" />
                        <span className="w-1.5 h-1.5 bg-[var(--accent)] rounded-full animate-bounce" />
                      </div>
                      <span className="text-xs text-[var(--text-muted)] font-medium pl-1">
                        Concierge is researching...
                      </span>
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Topics Footer Bar */}
                <div className="px-4 py-2 border-t border-[var(--border)]/60 bg-[var(--sidebar)]/80 overflow-x-auto no-scrollbar flex items-center gap-2 shrink-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] shrink-0 flex items-center gap-1">
                    <Compass size={12} className="text-[var(--accent)]" /> Topics:
                  </span>
                  {DEFAULT_QUICK_ACTIONS.map((action, i) => (
                    <button
                      key={i}
                      onClick={() => handleSendMessage(action.prompt)}
                      className="px-2.5 py-1 rounded-lg text-[10px] font-semibold bg-[var(--card)] hover:bg-[var(--accent)] hover:text-[var(--text-inverse)] text-[var(--text-muted)] border border-[var(--border)] whitespace-nowrap transition-colors cursor-pointer"
                    >
                      {action.label}
                    </button>
                  ))}
                </div>

                {/* Input Field & Direct Emergency Hotline */}
                <div className="p-3.5 sm:p-4 bg-[var(--sidebar)] border-t border-[var(--border)] shrink-0 space-y-2">
                  <div className="flex items-center gap-2">
                    <input
                      ref={inputRef}
                      type="text"
                      placeholder="Ask Concierge anything about fleet, pricing..."
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="flex-1 bg-[var(--card)] border border-[var(--border)] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-[var(--text)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent)] transition-all shadow-inner"
                    />
                    <button
                      onClick={() => handleSendMessage()}
                      disabled={!inputValue.trim() || isTyping}
                      className="p-2.5 rounded-xl bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--text-inverse)] disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-md cursor-pointer shrink-0"
                      title="Send message"
                    >
                      <Send size={16} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-[var(--text-muted)] px-1">
                    <span className="flex items-center gap-1 text-[var(--accent)]">
                      <ShieldCheck size={11} /> 100% Encrypted & Confidential
                    </span>
                    <a href="tel:+94112345678" className="hover:text-[var(--text)] hover:underline flex items-center gap-1 font-mono">
                      <PhoneCall size={10} /> +94 11 234 5678
                    </a>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
