import React, { useState, useEffect, useRef } from "react";
import { Search, Phone, Video, Info, Send, MoreVertical, CheckCheck, Smile, Paperclip } from 'lucide-react';

const INITIAL_CONVERSATIONS = [
  {
    id: 1,
    name: "Sarah (Recruiter @ Stripe)",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    lastMsg: "Are you available for a quick chat?",
    time: "2m ago",
    online: true,
    unread: 1,
    messages: [
      { id: 1, text: "Hi! We saw your experienced profile and loved your React work.", sender: "other", time: "10:30 AM" },
      { id: 2, text: "Are you available for a quick chat regarding a Senior position?", sender: "other", time: "10:31 AM" }
    ]
  },
  {
    id: 2,
    name: "DevClash Founders",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop",
    lastMsg: "Let's partner up.",
    time: "1h ago",
    online: false,
    unread: 0,
    messages: [
      { id: 1, text: "Hey Alex, we're building something cool. Let's partner up.", sender: "other", time: "9:15 AM" }
    ]
  }
];

const Messages = () => {
  const [conversations, setConversations] = useState(INITIAL_CONVERSATIONS);
  const [activeId, setActiveId] = useState(1);
  const [input, setInput] = useState("");
  const scrollRef = useRef(null);

  const activeChat = conversations.find(c => c.id === activeId);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [activeChat.messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMsg = {
      id: Date.now(),
      text: input,
      sender: "me",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setConversations(prev => prev.map(c => 
      c.id === activeId ? { ...c, messages: [...c.messages, newMsg], lastMsg: input, time: "Just now" } : c
    ));
    setInput("");

    // Mock Reply
    setTimeout(() => {
      const reply = {
        id: Date.now() + 1,
        text: "That sounds great! I'll check my calendar.",
        sender: "other",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setConversations(prev => prev.map(c => 
        c.id === activeId ? { ...c, messages: [...c.messages, reply], lastMsg: reply.text, time: "Just now" } : c
      ));
    }, 2000);
  };

  return (
    <div className="w-full flex flex-col h-[82vh] animate-fadeIn">
      <div className="bg-[var(--bg-card)] rounded-[32px] border border-[var(--border-card)] flex overflow-hidden shadow-[var(--card-shadow-elevated)] h-full">
        
        {/* Sidebar: Conversations List */}
        <div className="w-full md:w-[320px] border-r border-[var(--border-card)] flex flex-col bg-[var(--bg-subtle)]">
          <div className="p-6 border-b border-[var(--border-card)] space-y-4">
            <h2 className="text-[20px] font-black tracking-tight">Messages</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-card-muted)]" size={16} />
              <input 
                type="text" 
                placeholder="Search chats..." 
                className="w-full h-10 bg-[var(--bg-subtle-hover)] border-none rounded-xl pl-10 pr-4 text-[13px] outline-none focus:ring-2 ring-[var(--accent-purple)]/20 text-[var(--text-card-primary)] placeholder-[var(--text-card-muted)]"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {conversations.map(c => (
              <div 
                key={c.id}
                onClick={() => setActiveId(c.id)}
                className={`p-4 flex gap-4 cursor-pointer transition-all border-b border-[var(--border-subtle)] hover:bg-[var(--bg-subtle-hover)] ${activeId === c.id ? 'bg-[var(--bg-primary)] shadow-[var(--card-shadow)] scale-[1.02] z-10 mx-2 my-1 rounded-2xl border border-[var(--border-card)]' : ''}`}
              >
                <div className="relative flex-shrink-0">
                  <img src={c.avatar} alt="" className="w-12 h-12 rounded-2xl object-cover" />
                  {c.online && <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-0.5">
                    <h4 className="font-bold text-[14px] truncate tracking-tight">{c.name}</h4>
                    <span className="text-[10px] font-bold text-[var(--text-card-muted)]">{c.time}</span>
                  </div>
                  <p className={`text-[12px] truncate ${c.unread ? 'font-bold text-[var(--text-card-primary)]' : 'text-[var(--text-card-muted)] font-medium'}`}>{c.lastMsg}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="hidden md:flex flex-1 flex-col bg-[var(--bg-card)]">
          {/* Header */}
          <div className="h-20 border-b border-[var(--border-card)] px-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src={activeChat.avatar} alt="" className="w-10 h-10 rounded-xl" />
              <div>
                <h3 className="font-bold text-[15px] text-[var(--text-card-primary)]">{activeChat.name}</h3>
                <span className="text-[11px] text-green-500 font-bold">{activeChat.online ? 'Online' : 'Offline'}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2.5 rounded-xl hover:bg-[var(--bg-subtle-hover)] transition-colors text-[var(--text-card-secondary)] hover:text-[var(--text-card-primary)]"><Phone size={18} /></button>
              <button className="p-2.5 rounded-xl hover:bg-[var(--bg-subtle-hover)] transition-colors text-[var(--text-card-secondary)] hover:text-[var(--text-card-primary)]"><Video size={18} /></button>
              <button className="p-2.5 rounded-xl hover:bg-[var(--bg-subtle-hover)] transition-colors text-[var(--text-card-secondary)] hover:text-[var(--text-card-primary)]"><Info size={18} /></button>
            </div>
          </div>

          {/* Messages Feed */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 bg-[var(--bg-primary)]">
            {activeChat.messages.map(m => (
              <div key={m.id} className={`flex ${m.sender === 'me' ? 'justify-end' : 'justify-start'} animate-scaleUp`}>
                <div className={`max-w-[70%] p-4 rounded-2xl shadow-sm ${
                  m.sender === 'me' 
                    ? 'bg-gradient-to-br from-purple-600 to-blue-600 text-white rounded-tr-sm' 
                    : 'bg-[var(--bg-card)] border border-[var(--border-card)] text-[var(--text-card-primary)] rounded-tl-sm'
                }`}>
                  <p className="text-[14px] leading-relaxed font-medium">{m.text}</p>
                  <div className={`text-[10px] mt-2 flex items-center gap-1.5 ${m.sender === 'me' ? 'text-white/60' : 'text-[var(--text-card-muted)]'}`}>
                    {m.time} {m.sender === 'me' && <CheckCheck size={12} />}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-6 bg-[var(--bg-card)] border-t border-[var(--border-card)]">
            <form onSubmit={handleSend} className="flex items-center gap-3 bg-[var(--bg-subtle)] border border-[var(--border-subtle)] p-2 rounded-2xl focus-within:border-[var(--accent-purple)]/30 transition-all">
              <button type="button" className="p-2 text-[var(--text-card-secondary)] hover:text-[var(--text-card-primary)] transition-colors"><Smile size={20} /></button>
              <button type="button" className="p-2 text-[var(--text-card-secondary)] hover:text-[var(--text-card-primary)] transition-colors"><Paperclip size={20} /></button>
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..." 
                className="flex-1 bg-transparent border-none outline-none text-[14px] font-medium text-[var(--text-card-primary)]"
              />
              <button 
                type="submit" 
                disabled={!input.trim()}
                className="h-10 w-10 rounded-xl bg-purple-600 text-white flex items-center justify-center shadow-lg shadow-purple-500/20 hover:scale-[1.05] active:scale-[0.95] transition-all disabled:opacity-50"
              >
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
