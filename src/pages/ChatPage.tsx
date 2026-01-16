import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft, Send, Sparkles, Hotel, User, Bot, Briefcase } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  sender: 'user' | 'agent' | 'system';
  agentType?: 'general' | 'hotel'; // 'general' for Huang Xiaoxi, 'hotel' for Hotel Agent
  text?: string;
  card?: React.ReactNode;
  timestamp: number;
}

interface ServiceCardProps {
  title: string;
  description: string;
  action: string;
  onAction: () => void;
  icon?: React.ReactNode;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, action, onAction, icon }) => (
  <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 my-2 max-w-[85%]">
    <div className="flex items-start gap-3 mb-3">
      <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500 flex-shrink-0">
        {icon || <Briefcase size={20} />}
      </div>
      <div>
        <h4 className="font-bold text-gray-800 text-sm">{title}</h4>
        <p className="text-xs text-gray-500 mt-1 leading-relaxed">{description}</p>
      </div>
    </div>
    <button 
      onClick={onAction}
      className="w-full h-9 bg-blue-500 text-white rounded-lg text-xs font-bold active:scale-95 transition-transform"
    >
      {action}
    </button>
  </div>
);

const ChatPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const context = location.state as { 
    nodeId?: string; 
    nodeTitle?: string; 
    nodeType?: string;
    itineraryId?: number; 
  } | null;

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [currentAgent, setCurrentAgent] = useState<'general' | 'hotel'>('general');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Initial greeting
  useEffect(() => {
    const initialMsg: Message = {
      id: 'init-1',
      sender: 'agent',
      agentType: 'general',
      text: `你好！我是你的智能行程助手黄小西 👋\n检测到你正在进行“${context?.nodeTitle || '行程'}”${context?.nodeType === 'hotel' ? '的入住' : ''}，有什么可以帮你的吗？`,
      timestamp: Date.now()
    };
    setMessages([initialMsg]);
  }, []);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: input,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response logic
    setTimeout(() => {
      processResponse(input);
    }, 1500);
  };

  const processResponse = (userInput: string) => {
    const lowerInput = userInput.toLowerCase();
    
    // Switch to Hotel Agent logic
    if (
      (lowerInput.includes('人工') || 
      lowerInput.includes('服务') || 
      lowerInput.includes('预订') || 
      lowerInput.includes('房型') ||
      lowerInput.includes('早餐')) && 
      context?.nodeType === 'hotel' &&
      currentAgent === 'general'
    ) {
      // 1. System switch message
      const switchMsg: Message = {
        id: Date.now().toString(),
        sender: 'system',
        text: '正在为您转接酒店专属管家...',
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, switchMsg]);
      setCurrentAgent('hotel');

      setTimeout(() => {
        // 2. Hotel Agent greeting
        const agentMsg: Message = {
          id: (Date.now() + 1).toString(),
          sender: 'agent',
          agentType: 'hotel',
          text: '您好，我是安顺黄果树柏联酒店的专属管家。很高兴为您服务！查询到您预订的是豪华大床房，请问有什么具体需求？',
          timestamp: Date.now()
        };
        
        // 3. Service Card (if relevant)
        let cardMsg: Message | null = null;
        if (lowerInput.includes('早餐')) {
           cardMsg = {
             id: (Date.now() + 2).toString(),
             sender: 'agent',
             agentType: 'hotel',
             card: <ServiceCard 
               title="酒店早餐服务" 
               description="提供中西式自助早餐，包含贵州特色米粉、现磨咖啡等。用餐时间：07:00 - 10:30。"
               action="预订送餐服务"
               onAction={() => alert('已为您跳转至送餐预订页面')}
               icon={<Utensils size={20} />}
             />,
             timestamp: Date.now()
           };
        } else if (lowerInput.includes('房型') || lowerInput.includes('升级')) {
            cardMsg = {
              id: (Date.now() + 2).toString(),
              sender: 'agent',
              agentType: 'hotel',
              card: <ServiceCard 
                title="房型升级礼遇" 
                description="现有少量行政套房可供升级，包含行政酒廊权益及延迟退房服务。仅需 +¥500/晚。"
                action="查看房型详情"
                onAction={() => alert('已为您展示房型详情')}
                icon={<Hotel size={20} />}
              />,
              timestamp: Date.now()
            };
        }

        setMessages(prev => cardMsg ? [...prev, agentMsg, cardMsg] : [...prev, agentMsg]);
        setIsTyping(false);
      }, 1500);
      return;
    }

    // Default General Agent logic
    let responseText = '';
    if (lowerInput.includes('天气')) {
      responseText = '安顺今天天气晴朗，气温 18-26℃，非常适合游览黄果树瀑布。建议穿着舒适的运动鞋和透气衣物。';
    } else if (lowerInput.includes('交通') || lowerInput.includes('怎么去')) {
      responseText = '从安顺西站前往酒店约需 45 分钟车程。您可以选择打车（约 ¥80）或乘坐景区直通车。需要帮您叫车吗？';
    } else {
      responseText = '我已收到您的问题。作为您的智能行程助手，我可以为您提供天气查询、交通指南或景点介绍等服务。对于具体的酒店服务，您可以尝试询问“客房服务”或“联系人工”。';
    }

    const responseMsg: Message = {
      id: Date.now().toString(),
      sender: 'agent',
      agentType: currentAgent,
      text: responseText,
      timestamp: Date.now()
    };
    
    setMessages(prev => [...prev, responseMsg]);
    setIsTyping(false);
  };

  // Helper icons
  const Utensils = ({ size }: { size: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg>
  );

  return (
    <div className="flex flex-col h-full bg-[#FAFAFB]">
      {/* Header */}
      <div className="px-6 pt-12 pb-4 bg-white shadow-sm z-20 flex items-center gap-3">
        <button 
          onClick={() => navigate(-1)}
          className="w-8 h-8 flex items-center justify-center text-gray-600 active:scale-90 transition-transform"
        >
          <ChevronLeft size={24} />
        </button>
        <div className="flex-grow">
          <h1 className="text-lg font-bold text-[#1A1D2E] flex items-center gap-2">
            {currentAgent === 'general' ? '黄小西智能助手' : '酒店专属管家'}
            {currentAgent === 'general' ? (
              <span className="bg-blue-100 text-blue-600 text-[10px] px-1.5 py-0.5 rounded font-bold">AI</span>
            ) : (
              <span className="bg-orange-100 text-orange-600 text-[10px] px-1.5 py-0.5 rounded font-bold">HOTEL</span>
            )}
          </h1>
          <p className="text-xs text-gray-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            在线中
          </p>
        </div>
        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
           {currentAgent === 'general' ? <Sparkles size={16} className="text-blue-500" /> : <Hotel size={16} className="text-orange-500" />}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id}>
             {msg.sender === 'system' ? (
               <div className="flex justify-center my-4">
                 <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full">{msg.text}</span>
               </div>
             ) : (
               <div className={`flex gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                 {/* Avatar */}
                 <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${
                   msg.sender === 'user' ? 'bg-gray-200' : 
                   msg.agentType === 'hotel' ? 'bg-orange-100' : 'bg-blue-100'
                 }`}>
                   {msg.sender === 'user' ? <User size={16} className="text-gray-500" /> : 
                    msg.agentType === 'hotel' ? <Hotel size={16} className="text-orange-500" /> : 
                    <Bot size={16} className="text-blue-500" />
                   }
                 </div>

                 {/* Message Bubble */}
                 <div className="max-w-[80%] space-y-2">
                   {msg.text && (
                     <div className={`p-3 rounded-2xl text-sm leading-relaxed ${
                       msg.sender === 'user' 
                         ? 'bg-blue-500 text-white rounded-tr-sm' 
                         : 'bg-white text-gray-700 shadow-sm border border-gray-100 rounded-tl-sm'
                     }`}>
                       {msg.text}
                     </div>
                   )}
                   {msg.card}
                 </div>
               </div>
             )}
          </div>
        ))}
        
        {isTyping && (
          <div className="flex gap-3">
             <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
               {currentAgent === 'general' ? <Bot size={16} className="text-gray-400" /> : <Hotel size={16} className="text-gray-400" />}
             </div>
             <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm border border-gray-100">
               <div className="flex gap-1">
                 <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                 <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                 <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
               </div>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-gray-100 z-20 pb-8">
        <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full border border-gray-100 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-100 transition-all">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={currentAgent === 'general' ? "问问黄小西..." : "联系酒店管家..."}
            className="flex-grow bg-transparent text-sm text-gray-800 placeholder-gray-400 outline-none h-8"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim()}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
              input.trim() ? 'bg-blue-500 text-white shadow-md scale-100' : 'bg-gray-200 text-gray-400 scale-90'
            }`}
          >
            <Send size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
