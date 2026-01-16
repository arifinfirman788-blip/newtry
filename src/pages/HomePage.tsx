import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Hotel, Map, ArrowRight, Search, Heart, Star, Calendar, Compass, ChevronLeft, Share2, Link2, Home, Users, Activity, Navigation } from 'lucide-react';
import { createPortal } from 'react-dom';
import { travelRoutes, services } from '../data/mockData';
import RecentItineraryCard from '../components/RecentItineraryCard';

type PortalWrapperProps = {
  children: React.ReactNode;
};

const PortalWrapper: React.FC<PortalWrapperProps> = ({ children }) => {
  const [portalEl, setPortalEl] = React.useState<HTMLElement | null>(null);

  React.useEffect(() => {
    setPortalEl(document.getElementById('phone-frame'));
  }, []);

  if (!portalEl) return <>{children}</>;
  return createPortal(children, portalEl);
};

const HomePage: React.FC = () => {
  const [selectedRoute, setSelectedRoute] = React.useState<any>(null);
  const [stack, setStack] = React.useState(travelRoutes);
  const aiMascotImg = React.useMemo(() => new URL('../../image/叉腰眨眼_1.png', import.meta.url).toString(), []);

  const navigateToH5 = (url: string) => {
    window.location.href = url;
  };

  const handleDragEnd = (event: any, info: any) => {
    if (selectedRoute) return; // 详情页禁用拖拽切换
    if (Math.abs(info.offset.x) > 100 || Math.abs(info.offset.y) > 100) {
      const newStack = [...stack];
      const topCard = newStack.shift();
      if (topCard) {
        newStack.push(topCard);
        setStack(newStack);
      }
    }
  };

  return (
    <>
      {/* 背景装饰元素 - 增强非对称感 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[80%] h-[40%] bg-blue-50/50 rounded-full blur-[100px]" />
        <div className="absolute bottom-[20%] right-[-5%] w-[60%] h-[30%] bg-purple-50/40 rounded-full blur-[80px]" />
      </div>

      {/* 首页内容 */}
      <nav className="relative z-10 flex justify-between items-center px-8 pt-12 pb-4">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-xl font-bold tracking-tight text-[#1A1D2E]">你好，旅行者</h1>
          <p className="text-[10px] text-gray-400 font-medium uppercase tracking-widest mt-0.5">寻找您的下一次灵感</p>
        </motion.div>
        <div className="w-12 h-12 rounded-2xl overflow-hidden shadow-sm ring-4 ring-white">
          <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200" className="w-full h-full object-cover" />
        </div>
      </nav>

      <section className="px-8 mt-10 relative z-10">
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-white rounded-[2.5rem] p-8 relative overflow-hidden group cursor-pointer shadow-xl shadow-blue-100/30 border border-white"
        >
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-gradient-to-br from-blue-100/40 to-purple-100/40 blur-3xl"
          />
          <div className="absolute inset-y-0 right-0 w-[52%] flex items-end justify-end pointer-events-none select-none z-0">
            <motion.img
              src={aiMascotImg}
              alt=""
              className="w-full h-[110%] object-contain object-right-bottom opacity-90 translate-x-10"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 0.9, x: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                <Sparkles className="text-blue-500" size={20} />
              </div>
              <span className="text-blue-400/60 text-[10px] tracking-[0.3em] uppercase font-bold">行程服务管家</span>
            </div>
            <h3 className="text-[#1A1D2E] text-2xl font-bold leading-tight">黄小西<br /><span className="text-gray-300 font-light">已就位</span></h3>
            <div className="mt-6 flex items-center justify-between">
              <p className="text-gray-400 text-[11px] max-w-[160px] leading-relaxed">定制独一无二的私人行程</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 金刚区 */}
      <section className="px-8 mt-10 relative z-10">
         <div className="grid grid-cols-4 grid-rows-2 gap-3 h-[240px]">
           {/* 大瓷片 - 精选景区 */}
           <motion.div 
             whileTap={{ scale: 0.98 }}
             onClick={() => navigateToH5(services[0].url)}
             className="col-span-2 row-span-2 rounded-[2.5rem] relative overflow-hidden shadow-lg cursor-pointer group"
           >
             <img src={services[0].img} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
             <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
             <div className="relative z-10 h-full flex flex-col justify-between p-6">
               <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center">
                 <Map className="text-white" size={20} />
               </div>
               <div>
                 <h4 className="text-white text-lg font-black tracking-tight whitespace-nowrap">{services[0].name}</h4>
                 <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest mt-1">探索黔山秀水</p>
               </div>
             </div>
           </motion.div>

           {/* 长瓷片 - 奢享酒店 */}
           <motion.div 
             whileTap={{ scale: 0.98 }}
             onClick={() => navigateToH5(services[1].url)}
             className="col-span-2 row-span-1 rounded-[2.5rem] relative overflow-hidden shadow-sm cursor-pointer group"
           >
             <img src={services[1].img} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
             <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors" />
             <div className="relative z-10 flex items-center gap-4 h-full px-6">
               <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center">
                 <Hotel className="text-white" size={20} />
               </div>
               <div>
                 <h4 className="text-white text-sm font-black whitespace-nowrap">{services[1].name}</h4>
                 <p className="text-white/60 text-[9px] font-bold uppercase tracking-wider whitespace-nowrap">民族精品民宿</p>
               </div>
             </div>
           </motion.div>

           {/* 小瓷片 1 - 地道餐饮 */}
           <motion.div 
             whileTap={{ scale: 0.98 }}
             onClick={() => navigateToH5(services[2].url)}
             className="col-span-1 row-span-1 rounded-[2.5rem] relative overflow-hidden shadow-sm cursor-pointer group"
           >
             <img src={services[2].img} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
             <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
             <div className="relative z-10 flex flex-col items-center justify-center h-full text-center p-2">
               <Sparkles className="text-white mb-1" size={18} />
               <h4 className="text-white text-[11px] font-black whitespace-nowrap">{services[2].name}</h4>
             </div>
           </motion.div>

           {/* 小瓷片 2 - 精彩活动 */}
           <motion.div 
             whileTap={{ scale: 0.98 }}
             onClick={() => navigateToH5(services[3].url)}
             className="col-span-1 row-span-1 rounded-[2.5rem] relative overflow-hidden shadow-sm cursor-pointer group"
           >
             <img src={services[3].img} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
             <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
             <div className="relative z-10 flex flex-col items-center justify-center h-full text-center p-2">
               <Compass className="text-white mb-1" size={18} />
               <h4 className="text-white text-[11px] font-black whitespace-nowrap">{services[3].name}</h4>
             </div>
           </motion.div>
         </div>
       </section>

      {/* 新增：最近行程卡片 */}
      <RecentItineraryCard />

      <section className="mt-12 relative z-10">
        <div className="px-8 flex justify-between items-end mb-8">
          <div>
            <h3 className="text-2xl font-black tracking-tight text-[#1A1D2E]">精选线路</h3>
            <div className="w-8 h-1 bg-blue-500 mt-2 rounded-full opacity-20" />
          </div>
          <span className="text-xs font-bold text-gray-300">滑动翻阅</span>
        </div>

        {/* 扑克牌堆叠容器 */}
        <div className="px-8 relative h-[480px] perspective-1000">
          <AnimatePresence>
            {!selectedRoute && stack.map((route, idx) => {
              const isTop = idx === 0;
              const rotation = idx * 4 - 2;
              const yOffset = idx * 12;
              const scale = 1 - idx * 0.05;

              return (
                <motion.div 
                  key={route.id}
                  layoutId={`card-container-${route.id}`}
                  onClick={() => isTop && setSelectedRoute(route)}
                  style={{ 
                    zIndex: stack.length - idx,
                    cursor: isTop ? 'pointer' : 'default'
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                    rotate: rotation,
                    y: yOffset,
                    scale: scale,
                    opacity: idx > 2 ? 0 : 1,
                  }}
                  exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
                  drag={isTop ? true : false}
                  dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                  onDragEnd={handleDragEnd}
                  whileDrag={{ scale: 1.05, cursor: 'grabbing' }}
                  className="absolute inset-x-8 top-0 origin-bottom"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <div className="relative h-[420px] rounded-[3.5rem] overflow-hidden shadow-2xl shadow-blue-900/10 border border-white/50 bg-white">
                    {/* 核心图片 */}
                    <motion.img 
                      layoutId={`card-image-${route.id}`}
                      src={route.img} 
                      className="absolute inset-0 w-full h-full object-cover pointer-events-none" 
                    />
                    
                    {/* 渐变遮罩 */}
                    <motion.div 
                      layoutId={`card-mask-${route.id}`}
                      className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80 pointer-events-none" 
                    />

                    {/* 顶部右侧：心形收藏图标 */}
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute top-6 right-6 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 text-white"
                    >
                      <Heart size={20} />
                    </motion.div>

                    {/* 底部信息区 */}
                    <div className="absolute bottom-8 left-8 right-8">
                      <div className="mb-2">
                        <motion.span layoutId={`card-loc-${route.id}`} className="block text-white/70 text-[10px] uppercase tracking-[0.2em] font-bold">{route.location}</motion.span>
                        <motion.h4 layoutId={`card-title-${route.id}`} className="text-white text-2xl font-black leading-tight mt-1">{route.title}</motion.h4>
                      </div>

                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-3 mb-6"
                      >
                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-black/30 backdrop-blur-md rounded-full border border-white/10">
                          <Star size={12} className="text-yellow-400 fill-yellow-400" />
                          <span className="text-white text-[11px] font-bold">{route.rating.toFixed(1)}</span>
                        </div>
                        <span className="text-white/50 text-[11px] font-medium">{route.reviews}</span>
                      </motion.div>

                      {/* 查看详情按钮 */}
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center justify-between bg-black/40 backdrop-blur-xl rounded-full p-2 pl-8 border border-white/10"
                      >
                        <span className="text-white text-sm font-bold tracking-wide">查看详情</span>
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-black shadow-lg">
                          <ArrowRight size={20} />
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </section>

      {/* 详情页展示层 */}
      <PortalWrapper>
        <AnimatePresence mode="wait">
          {selectedRoute && (
            <motion.div 
              layoutId={`card-container-${selectedRoute.id}`}
              className="absolute inset-0 z-[150] bg-white flex flex-col overflow-hidden pointer-events-auto"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
            {/* 顶部大图区域 */}
            <div className="relative h-[65%] w-full">
              <div className="absolute inset-0 overflow-hidden" style={{ clipPath: 'ellipse(120% 100% at 50% 0%)' }}>
                <motion.img 
                  layoutId={`card-image-${selectedRoute.id}`}
                  src={selectedRoute.img} 
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <motion.div 
                  layoutId={`card-mask-${selectedRoute.id}`}
                  className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80" 
                />
              </div>
              
              {/* 顶部控制栏 (左返回，右分享/链接) */}
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="absolute top-14 left-6 right-6 flex justify-between items-center z-20"
              >
                <button 
                  onClick={() => setSelectedRoute(null)}
                  className="w-12 h-12 bg-black/30 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/20 text-white shadow-lg active:scale-90 transition-transform"
                >
                  <ChevronLeft size={24} />
                </button>
                <div className="flex gap-3">
                  <button className="w-12 h-12 bg-black/30 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/20 text-white shadow-lg active:scale-90 transition-transform">
                    <Share2 size={20} />
                  </button>
                  <button className="w-12 h-12 bg-black/30 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/20 text-white shadow-lg active:scale-90 transition-transform">
                    <Link2 size={20} />
                  </button>
                </div>
              </motion.div>

              {/* 图片内叠加信息 (左下) - 向上微调位置防止与星形按钮重叠 */}
              <div className="absolute bottom-24 left-8 right-8 z-20 text-white">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-center gap-2 mb-3"
                >
                  <Calendar size={16} className="text-white/80" />
                  <span className="text-sm font-bold tracking-wide text-white/90">{selectedRoute.duration}</span>
                </motion.div>
                <motion.h2 
                  layoutId={`card-title-${selectedRoute.id}`} 
                  className="text-4xl font-black mb-5 leading-tight tracking-tight"
                >
                  {selectedRoute.title}
                </motion.h2>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-center gap-2"
                >
                  <span className="text-sm font-bold border-b-2 border-white/60 pb-1">{selectedRoute.reviews}</span>
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                    <ChevronLeft size={14} className="rotate-180" />
                  </div>
                </motion.div>
              </div>

              {/* 底部指示点 */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
                <div className="w-2 h-2 bg-white rounded-full" />
                <div className="w-2 h-2 bg-white/40 rounded-full" />
                <div className="w-2 h-2 bg-white/40 rounded-full" />
              </div>

              {/* 悬浮收藏按钮 (右下圆弧交界) */}
              <motion.button 
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 15, delay: 0.6 }}
                className="absolute bottom-[-32px] right-8 w-20 h-20 bg-[#1A1D2E] rounded-full flex items-center justify-center shadow-2xl z-30 border-4 border-white"
              >
                <Star size={32} className="text-white" />
              </motion.button>
            </div>

            {/* 内容区域 (底色微调) */}
            <div className="flex-grow bg-[#F8FAF9] relative z-10 px-8 pt-12 overflow-y-auto no-scrollbar pb-32">
              <div className="mb-8">
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="flex items-center gap-2 mb-2"
                >
                  <Navigation size={14} className="text-gray-400" />
                  <span className="text-[11px] font-black tracking-[0.2em] text-gray-400 uppercase">{selectedRoute.location}</span>
                </motion.div>
                <motion.h3 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="text-2xl font-black text-[#1A1D2E]"
                >
                  {selectedRoute.subtitle}
                </motion.h3>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  {selectedRoute.description}
                </p>
                <button className="text-blue-500 font-bold text-sm underline mb-8">了解更多</button>

                {/* 线路实时状态展示区 */}
                <div className="grid grid-cols-2 gap-4 mb-10">
                  <div className="bg-white p-5 rounded-3xl border border-gray-50 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                        <Activity size={16} />
                      </div>
                      <span className="text-[10px] text-gray-400">行程距离</span>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-xl font-black text-[#1A1D2E]">{selectedRoute.distance}</span>
                    </div>
                    <div className="mt-3 h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "80%" }}
                        transition={{ delay: 0.8, duration: 1 }}
                        className="h-full bg-blue-500 rounded-full"
                      />
                    </div>
                  </div>

                  <div className="bg-white p-5 rounded-3xl border border-gray-50 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center text-orange-500">
                        <Users size={16} />
                      </div>
                      <span className="text-[10px] text-gray-400">参考价格</span>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-xl font-black text-[#1A1D2E]">{selectedRoute.price}</span>
                      <span className="text-[10px] text-gray-400">起/人</span>
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                      <span className="text-[10px] text-orange-500 bg-orange-50 px-2 py-0.5 rounded-full font-bold">超高性价比</span>
                    </div>
                  </div>
                </div>

                {/* 包含景点 -> 可选套餐 */}
                <h4 className="text-lg font-bold text-[#1A1D2E] mb-4">可选套餐</h4>
                <div className="space-y-4">
                  {selectedRoute.tours?.map((tour: any) => (
                    <div key={tour.id} className="flex gap-4 p-4 bg-white rounded-3xl border border-gray-50 shadow-sm">
                      <img src={tour.img} className="w-20 h-20 rounded-2xl object-cover" />
                      <div className="flex-grow flex flex-col justify-between py-1">
                        <div>
                          <h5 className="font-bold text-[#1A1D2E]">{tour.title}</h5>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] text-gray-400">{tour.days}</span>
                            <span className="w-0.5 h-0.5 bg-gray-300 rounded-full" />
                            <span className="text-[10px] text-gray-400">{tour.reviews}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-blue-600 font-bold text-sm">{tour.price}</span>
                          <button className="w-8 h-8 bg-[#1A1D2E] rounded-full flex items-center justify-center text-white">
                            <ArrowRight size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
          )}
        </AnimatePresence>
      </PortalWrapper>
    </>
  );
};

export default HomePage;
