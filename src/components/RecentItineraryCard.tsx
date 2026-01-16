import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, ChevronRight, MapPin, Clock, Plane, Hotel, Mountain, Utensils, Ticket, Navigation, MessageSquareText, Phone, QrCode, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { itineraries, ItineraryActivity } from '../data/mockData';

const RecentItineraryCard: React.FC = () => {
  const navigate = useNavigate();
  
  // Find current trip
  const recentItinerary = itineraries.find(i => i.status === 'ongoing' || i.status === 'upcoming');
  
  // Find current active node (ongoing > pending)
  const activeNode = recentItinerary?.activities.find(a => a.status === 'ongoing') 
    || recentItinerary?.activities.find(a => a.status === 'pending');

  if (!recentItinerary || !activeNode) return null;

  const getActivityIcon = (type: ItineraryActivity['type']) => {
    switch (type) {
      case 'transport': return <Plane size={20} className="text-white" />;
      case 'hotel': return <Hotel size={20} className="text-white" />;
      case 'scenic': return <Mountain size={20} className="text-white" />;
      case 'food': return <Utensils size={20} className="text-white" />;
      default: return <Ticket size={20} className="text-white" />;
    }
  };

  const handleNavigation = (e: React.MouseEvent) => {
    e.stopPropagation();
    const query = encodeURIComponent(activeNode.location || activeNode.title);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  const handleConsult = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate('/chat', { 
      state: { 
        nodeId: activeNode.id, 
        nodeTitle: activeNode.title, 
        nodeType: activeNode.type,
        itineraryId: recentItinerary.id
      } 
    });
  };

  const handleSecondaryAction = (e: React.MouseEvent) => {
    e.stopPropagation();
    let message = '';
    switch (activeNode.type) {
      case 'hotel': message = '正在为您联系酒店前台...'; break;
      case 'transport': message = '正在加载电子登机牌/车票...'; break;
      case 'food': message = '正在为您查看菜单...'; break;
      case 'scenic': message = `正在为您生成关于“${activeNode.title}”的智能导览...`; break;
      default: message = '正在处理...';
    }
    alert(message);
  };

  const renderSecondaryButton = () => {
    let icon = <MessageSquareText size={18} />;
    let text = 'AI 导览';
    let colorClass = 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100';

    switch (activeNode.type) {
      case 'hotel':
        icon = <Phone size={18} />;
        text = '联系前台';
        colorClass = 'bg-orange-50 text-orange-600 hover:bg-orange-100';
        break;
      case 'transport':
        icon = <QrCode size={18} />;
        text = '电子票';
        colorClass = 'bg-blue-50 text-blue-600 hover:bg-blue-100';
        break;
      case 'food':
        icon = <Utensils size={18} />;
        text = '查看菜单';
        colorClass = 'bg-yellow-50 text-yellow-600 hover:bg-yellow-100';
        break;
      case 'scenic':
        // Default is AI Guide
        break;
      default:
        break;
    }

    return (
      <button 
        onClick={handleSecondaryAction}
        className={`flex items-center justify-center gap-2 h-11 rounded-xl font-bold text-sm transition-colors active:scale-95 ${colorClass}`}
      >
        {icon}
        <span>{text}</span>
      </button>
    );
  };

  return (
    <section className="px-8 mt-8 relative z-10">
      <motion.div
        whileTap={{ scale: 0.98 }}
        onClick={() => navigate('/schedule', { state: { featureId: 'home_recent_schedule' } })}
        className="bg-white rounded-[2.5rem] relative overflow-hidden shadow-xl shadow-blue-900/5 border border-gray-100 cursor-pointer group"
      >
        {/* Hero Image Section */}
        {activeNode.img && (
          <div className="h-40 relative">
            <img 
              src={activeNode.img} 
              alt={activeNode.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            
            {/* Overlay Header */}
            <div className="absolute top-5 left-6 right-6 flex justify-between items-start">
               <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-md backdrop-blur-md bg-white/20 border border-white/30 text-white`}>
                  {getActivityIcon(activeNode.type)}
               </div>
               <div className="flex items-center text-white/90 text-xs font-medium bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 max-w-[60%]">
                  <span className="truncate">{recentItinerary.title}</span>
                  <ChevronRight size={14} className="ml-1 opacity-70 flex-shrink-0" />
               </div>
            </div>

            {/* Overlay Title */}
            <div className="absolute bottom-4 left-6 right-6">
               <div className="flex items-center gap-2 mb-1">
                 <span className="inline-block w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                 <span className="text-xs font-bold text-green-400 uppercase tracking-wider">
                   {activeNode.status === 'ongoing' ? '进行中' : '即将开始'}
                 </span>
               </div>
               <h3 className="text-2xl font-bold text-white leading-tight shadow-sm truncate">{activeNode.title}</h3>
            </div>
          </div>
        )}

        {/* Content Section */}
        <div className="p-6 pt-5">
          <div className="flex justify-between items-end mb-5">
            <div className="flex-grow min-w-0 mr-4">
               <div className="text-3xl font-bold text-[#1A1D2E] mb-1 font-mono tracking-tight">{activeNode.time}</div>
               <div className="flex items-center text-gray-500 text-xs font-medium overflow-hidden">
                 <Calendar size={12} className="mr-1 flex-shrink-0" />
                 <span className="whitespace-nowrap">{recentItinerary.date.split(' - ')[0]}</span>
                 <span className="mx-2 text-gray-300">|</span>
                 <MapPin size={12} className="mr-1 flex-shrink-0" />
                 <span className="truncate">{activeNode.location?.split(' ')[0]}</span>
               </div>
            </div>
            {activeNode.meta?.number && (
              <div className="text-right bg-gray-50 px-3 py-2 rounded-xl flex-shrink-0">
                <div className="text-[10px] text-gray-400 font-bold mb-0.5 uppercase tracking-wider">
                  {activeNode.type === 'transport' ? '班次' : activeNode.type === 'hotel' ? '房型' : '编号'}
                </div>
                <div className="text-base font-bold text-[#1A1D2E] truncate max-w-[100px]">{activeNode.meta.number}</div>
              </div>
            )}
          </div>

          {/* Service Actions */}
          <div className="grid grid-cols-3 gap-2">
            <button 
              onClick={handleNavigation}
              className="flex flex-col items-center justify-center gap-1 h-14 rounded-xl bg-blue-50 text-blue-600 font-bold text-xs hover:bg-blue-100 transition-colors active:scale-95"
            >
              <Navigation size={20} />
              <span>一键导航</span>
            </button>
            <button 
              onClick={handleConsult}
              className="flex flex-col items-center justify-center gap-1 h-14 rounded-xl bg-purple-50 text-purple-600 font-bold text-xs hover:bg-purple-100 transition-colors active:scale-95"
            >
              <Sparkles size={20} />
              <span>咨询助手</span>
            </button>
            <div className="h-14">
              {React.cloneElement(renderSecondaryButton(), { 
                className: `flex flex-col items-center justify-center gap-1 w-full h-full rounded-xl font-bold text-xs transition-colors active:scale-95 ${
                   activeNode.type === 'hotel' ? 'bg-orange-50 text-orange-600 hover:bg-orange-100' :
                   activeNode.type === 'transport' ? 'bg-blue-50 text-blue-600 hover:bg-blue-100' :
                   activeNode.type === 'food' ? 'bg-yellow-50 text-yellow-600 hover:bg-yellow-100' :
                   'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'
                }`
              })}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default RecentItineraryCard;
