import React from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Home, Compass, Calendar, User } from 'lucide-react';
import { motion } from 'framer-motion';
import HomePage from './pages/HomePage';
import SchedulePage from './pages/SchedulePage';
import InspirationPage from './pages/InspirationPage';
import ChatPage from './pages/ChatPage';
import ProfilePage from './pages/ProfilePage';

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  // Hide nav on chat page
  if (currentPath === '/chat') return null;

  const navItems = [
    { id: 'home', icon: Home, label: '首页', path: '/' },
    { id: 'inspiration', icon: Compass, label: '灵感', path: '/inspiration' },
    { id: 'schedule', icon: Calendar, label: '行程', path: '/schedule' },
    { id: 'profile', icon: User, label: '我的', path: '/profile' },
  ];

  return (
    <div className="absolute bottom-8 left-8 right-8 h-20 bg-white rounded-[2.5rem] shadow-[0_20px_40px_rgba(0,0,0,0.1)] flex justify-between items-center px-6 z-[100]">
      {navItems.map((item) => {
        const active = currentPath === item.path;
        
        return (
          <motion.button
            key={item.id}
            onClick={() => navigate(item.path)}
            whileTap={{ scale: 0.9 }}
            className="relative flex flex-col items-center justify-center gap-1.5 w-14"
          >
            <div className="relative flex items-center justify-center w-12 h-10">
              {active && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 bg-black rounded-full"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />
              )}
              <item.icon 
                size={22} 
                className={`relative z-10 transition-colors duration-300 ${active ? 'text-white' : 'text-gray-400'}`} 
              />
            </div>
            <motion.span 
              className={`text-[10px] font-bold ${active ? 'text-black' : 'text-gray-400'}`}
              animate={{ y: active ? 0 : 0 }}
            >
              {item.label}
            </motion.span>
          </motion.button>
        )
      })}
    </div>
  );
};

function AppContent() {
  const location = useLocation();
  const isFullScreenPage = location.pathname === '/chat';

  return (
    <div className="min-h-screen bg-[#F0F2F5] flex items-center justify-center p-4 md:p-10 font-sans">

      {/* 手机外壳框架 */}
      <div id="phone-frame" className="relative w-[390px] h-[844px] bg-white rounded-[4rem] shadow-[0_0_0_12px_#1A1D2E,0_0_0_15px_#2D3142,0_40px_100px_rgba(0,0,0,0.2)] overflow-hidden border-[8px] border-[#1A1D2E] flex flex-col">
        
        {/* 顶部状态栏区域 (刘海) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-8 bg-[#1A1D2E] rounded-b-[2rem] z-[110] flex items-center justify-center">
          <div className="w-12 h-1 bg-white/10 rounded-full" />
        </div>

        {/* 内部滚动内容区 */}
        <div 
          className={`flex-grow overflow-y-auto no-scrollbar bg-[#FAFAFB] relative ${isFullScreenPage ? '' : 'pb-32'}`}
        >
           <Routes>
             <Route path="/" element={<HomePage />} />
             <Route path="/inspiration" element={<InspirationPage />} />
             <Route path="/schedule" element={<SchedulePage />} />
             <Route path="/chat" element={<ChatPage />} />
             {/* Placeholders for other routes */}
             <Route path="/assistant" element={<div className="p-8 pt-20">AI Assistant Coming Soon</div>} />
             <Route path="/profile" element={<ProfilePage />} />
           </Routes>
        </div>

        <BottomNav />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
