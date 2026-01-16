import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, Navigation, X, ArrowRight } from 'lucide-react';
import { scenicSpots } from '../data/mockData';

import { useNavigate } from 'react-router-dom';

const InspirationPage: React.FC = () => {
  const navigate = useNavigate();
  // 抽签桶状态
  const [isShaking, setIsShaking] = React.useState(false);
  const [drawResult, setDrawResult] = React.useState<any>(null);
  const [showStick, setShowStick] = React.useState(false);

  const handleDraw = () => {
    if (isShaking) return;
    setIsShaking(true);
    setDrawResult(null);
    setShowStick(false);

    // 3秒后展示结果
    setTimeout(() => {
      setIsShaking(false);
      setShowStick(true);
      const randomSpot = scenicSpots[Math.floor(Math.random() * scenicSpots.length)];

      // 签位弹出后再展示卡片
      setTimeout(() => {
        setDrawResult(randomSpot);
      }, 800);
    }, 3000);
  };

  return (
    <div className="min-h-full flex flex-col px-8 pt-20 overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl font-black text-[#1A1D2E] mb-2">黔游灵感</h2>
        <p className="text-gray-400 text-sm italic">摇动抽签桶，开启您的贵州惊喜之旅</p>
      </motion.div>

      {/* 抽签桶区域 */}
      <div className="flex-grow flex flex-col items-center justify-center relative perspective-[1000px]">
        <div className="relative w-56 h-72 mb-12 flex items-center justify-center">
          {/* 背景装饰光晕 */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-orange-100/30 rounded-full blur-3xl -z-10" />
          
          {/* 抽出的签位 */}
          <AnimatePresence>
            {showStick && (
              <motion.div
                initial={{ y: 0, opacity: 0, translateZ: -20 }}
                animate={{ y: -160, opacity: 1, translateZ: 0 }}
                exit={{ y: 0, opacity: 0 }}
                className="absolute top-0 left-1/2 -translate-x-1/2 w-5 h-48 bg-gradient-to-b from-orange-100 to-orange-200 rounded-t-xl shadow-lg border border-orange-300 z-20 flex flex-col items-center py-4"
              >
                <div className="w-1.5 h-24 bg-red-500/80 rounded-full mb-3 shadow-inner" />
                <span className="text-[10px] font-black text-red-600 [writing-mode:vertical-rl] tracking-[4px]">上等签</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 3D 抽签桶主体 */}
          <motion.div 
            animate={isShaking ? { 
              rotateX: [0, -15, 15, -15, 15, 0],
              rotateY: [0, 10, -10, 10, -10, 0],
              y: [0, -10, 10, -10, 10, 0],
              scale: [1, 1.05, 1]
            } : {
              rotateX: 10,
              rotateY: 0
            }}
            transition={{ duration: 0.25, repeat: isShaking ? Infinity : 0 }}
            style={{ transformStyle: 'preserve-3d' }}
            className="relative w-44 h-56 group"
          >
            {/* 桶顶开口阴影 */}
            <div className="absolute -top-4 left-0 right-0 h-8 bg-black/20 rounded-[50%] blur-sm -z-10" />
            
            {/* 桶身前部 */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500 via-orange-600 to-red-800 rounded-b-[3rem] rounded-t-[1rem] shadow-[inset_-10px_-10px_30px_rgba(0,0,0,0.3),inset_10px_10px_30px_rgba(255,255,255,0.2)] border-x-2 border-orange-400 z-30 flex flex-col items-center pt-10">
              {/* 桶身装饰金环 */}
              <div className="absolute top-12 left-0 right-0 h-1.5 bg-gradient-to-r from-yellow-600 via-yellow-300 to-yellow-600 shadow-sm" />
              <div className="absolute bottom-16 left-0 right-0 h-1 bg-gradient-to-r from-yellow-700 via-yellow-400 to-yellow-700 opacity-50" />
              
              <div className="mt-4 text-center">
                <div className="w-12 h-12 border-2 border-yellow-400/50 rounded-full flex items-center justify-center mb-2 mx-auto">
                  <span className="text-yellow-400 font-black text-xl">黔</span>
                </div>
                <div className="text-white font-black tracking-[8px] text-lg ml-2">灵感桶</div>
                <div className="text-[8px] text-yellow-500/60 font-bold mt-1 tracking-widest uppercase">Guizhou Spirit</div>
              </div>
            </div>

            {/* 桶内竹签束 - 3D 层级感 */}
            <div className="absolute -top-16 left-4 right-4 h-32 z-10 flex gap-1 justify-center items-end overflow-hidden" style={{ transform: 'translateZ(-10px)' }}>
              {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                <motion.div
                  key={i}
                  animate={isShaking ? { 
                    y: [0, -25, 0],
                    rotateZ: [0, i % 2 === 0 ? 5 : -5, 0]
                  } : {}}
                  transition={{ 
                    duration: 0.15, 
                    delay: i * 0.03, 
                    repeat: isShaking ? Infinity : 0 
                  }}
                  className="w-2.5 h-40 bg-gradient-to-b from-orange-100 to-orange-300 rounded-t-lg border-x border-orange-300/50 shadow-sm shrink-0"
                />
              ))}
            </div>

            {/* 桶后部阴影 (增强3D深度) */}
            <div className="absolute inset-2 bg-black/40 rounded-b-[3rem] rounded-t-[1rem] blur-xl -z-20 translate-y-4" />
          </motion.div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleDraw}
          disabled={isShaking}
          className="h-16 px-16 bg-gradient-to-br from-red-600 to-red-800 text-white rounded-2xl font-black tracking-widest uppercase shadow-[0_10px_30px_rgba(220,38,38,0.3)] flex items-center gap-4 disabled:opacity-50 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
          {isShaking ? (
            <span className="flex items-center gap-2">
              <RefreshCw className="animate-spin" size={20} />
              诚心祈愿中...
            </span>
          ) : (
            <>
              <span>摇动灵感</span>
              <Navigation size={20} className="text-yellow-400 rotate-45" />
            </>
          )}
        </motion.button>
      </div>

      {/* 抽签结果弹出层 */}
      <AnimatePresence>
        {drawResult && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-8 bg-black/40 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.8, y: 100, rotate: -5 }}
              animate={{ scale: 1, y: 0, rotate: 0 }}
              className="bg-white w-full max-w-sm rounded-[3rem] overflow-hidden shadow-2xl relative"
            >
              <button 
                onClick={() => setDrawResult(null)}
                className="absolute top-6 right-6 w-10 h-10 bg-black/5 backdrop-blur-md rounded-full flex items-center justify-center z-10 text-gray-800"
              >
                <X size={20} />
              </button>
              
              <div className="h-56 relative">
                <img src={drawResult.img} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-8">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 bg-orange-500 text-white text-[10px] font-bold rounded">灵感签</span>
                    <span className="text-white/60 text-[10px] uppercase tracking-widest font-bold">{drawResult.location}</span>
                  </div>
                  <h4 className="text-white text-2xl font-black">{drawResult.name}</h4>
                </div>
              </div>
              
              <div className="p-8">
                <div className="flex gap-2 mb-4">
                  {drawResult.tags.map((tag: string) => (
                    <span key={tag} className="px-3 py-1 bg-orange-50 text-orange-600 text-[10px] font-bold rounded-full uppercase tracking-wider">{tag}</span>
                  ))}
                </div>
                <p className="text-gray-400 text-sm leading-relaxed mb-8">{drawResult.description}</p>
                <button 
                  onClick={() => {
                    setDrawResult(null);
                    navigate('/');
                  }}
                  className="w-full h-14 bg-orange-500 text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-orange-100"
                >
                  即刻出发 <ArrowRight size={18} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InspirationPage;
