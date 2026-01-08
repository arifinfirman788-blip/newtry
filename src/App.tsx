import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Hotel, Plane, Map, Car, ArrowRight, Search, Heart, Navigation, Star, Calendar, Compass, RefreshCw, X, ChevronLeft, Share2, Link2, Home, Users, Activity, Ticket, CreditCard } from 'lucide-react';

// 模拟线路商品数据
const travelRoutes = [
  {
    id: 1,
    title: '黄果树大瀑布',
    subtitle: '亚洲第一大瀑布的震撼',
    location: '贵州 · 安顺',
    flag: '🇨🇳',
    price: '¥2,800',
    rating: 5.0,
    reviews: '2.5k 条评价',
    description: '黄果树瀑布是亚洲最大的瀑布，以其宏大的规模和壮丽的景色闻名于世。在这里，您可以近距离感受水汽氤氲的震撼，探索水帘洞的神秘。',
    tags: ['自然奇观', '避暑胜地'],
    img: 'https://images.unsplash.com/photo-1520113412646-04fc68c0bc21?auto=format&fit=crop&q=80&w=1000',
    color: 'bg-blue-500',
    tours: [
      { id: 101, title: '瀑布奇缘', days: '2 天', price: '¥599 起/人', rating: 4.9, reviews: '156 条评价', img: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=400' },
      { id: 102, title: '龙宫探秘', days: '1 天', price: '¥320 起/人', rating: 4.7, reviews: '82 条评价', img: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=400' }
    ]
  },
  {
    id: 2,
    title: '荔波小七孔',
    subtitle: '地球腰带上的绿宝石',
    location: '贵州 · 黔南',
    flag: '🇨🇳',
    price: '¥3,200',
    rating: 4.9,
    reviews: '1.8k 条评价',
    description: '荔波小七孔以其清澈见底的湖水、错落有致的瀑布和古朴的小七孔桥而著称。漫步其中，仿佛置身于现实版的绿野仙踪。',
    tags: ['绿野仙踪', '极致山水'],
    img: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&q=80&w=1000',
    color: 'bg-green-500',
    tours: [
      { id: 201, title: '绿宝石探索之旅', days: '3 天', price: '¥899 起/人', rating: 4.8, reviews: '230 条评价', img: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&q=80&w=400' }
    ]
  },
  {
    id: 3,
    title: '西江千户苗寨',
    subtitle: '千户苗寨的万家灯火',
    location: '贵州 · 黔东南',
    flag: '🇨🇳',
    price: '¥1,980',
    rating: 4.8,
    reviews: '3.1k 条评价',
    description: '西江千户苗寨是全世界最大的苗族聚居村寨。夜晚时分，万家灯火齐明，宛如星河坠入凡间，是体验苗族文化的绝佳之地。',
    tags: ['民俗文化', '璀璨夜景'],
    img: 'https://images.unsplash.com/photo-1523731407965-2430cd12f5e4?auto=format&fit=crop&q=80&w=1000',
    color: 'bg-orange-500',
    tours: []
  }
];

interface Service {
  name: string;
  icon: React.ElementType;
  url: string;
  img: string;
}

const services: Service[] = [
  { 
    name: '精选景区', 
    icon: Map, 
    url: 'https://m.ctrip.com/html5/tour/',
    img: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=800' 
  },
  { 
    name: '奢享酒店', 
    icon: Hotel, 
    url: 'https://m.ctrip.com/html5/hotel/',
    img: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=800'
  },
  { 
    name: '地道餐饮', 
    icon: Sparkles, 
    url: 'https://m.ctrip.com/html5/restaurant/',
    img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800'
  },
  { 
    name: '精彩活动', 
    icon: Compass, 
    url: 'https://m.ctrip.com/html5/event/',
    img: 'https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?auto=format&fit=crop&q=80&w=800'
  },
];

// 模拟景区灵感数据
const scenicSpots = [
  {
    id: 1,
    name: '梵净山',
    location: '贵州 · 铜仁',
    description: '天空之城，现实版的“阿凡达”哈利路亚山原型参考地。',
    img: 'https://images.unsplash.com/photo-1564393025012-282286cab178?auto=format&fit=crop&q=80&w=800',
    tags: ['世界遗产', '天空之城']
  },
  {
    id: 2,
    name: '万峰林',
    location: '贵州 · 兴义',
    description: '“天下山峰何其多，唯有此处峰成林”，徐霞客笔下的绝美画卷。',
    img: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&q=80&w=800',
    tags: ['喀斯特', '户外天堂']
  },
  {
    id: 3,
    name: '赤水丹霞',
    location: '贵州 · 遵义',
    description: '如火一般的丹霞地貌，配合壮丽的大瀑布，震撼人心。',
    img: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=800',
    tags: ['红色丹霞', '壮丽景观']
  }
];

function App() {
  const [activeTab, setActiveTab] = React.useState('home'); // 'home' or 'inspiration'
  const [selectedRoute, setSelectedRoute] = React.useState<any>(null);
  const [stack, setStack] = React.useState(travelRoutes);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

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

  // 监听路由选择，自动回顶
  React.useEffect(() => {
    if (selectedRoute && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo(0, 0);
    }
  }, [selectedRoute]);

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

  const navigateToH5 = (url: string) => {
    window.location.href = url;
  };

  return (
    <div className="min-h-screen bg-[#F0F2F5] flex items-center justify-center p-4 md:p-10 font-sans">
      {/* 手机外壳框架 */}
      <div className="relative w-[390px] h-[844px] bg-white rounded-[4rem] shadow-[0_0_0_12px_#1A1D2E,0_0_0_15px_#2D3142,0_40px_100px_rgba(0,0,0,0.2)] overflow-hidden border-[8px] border-[#1A1D2E] flex flex-col">
        
        {/* 顶部状态栏区域 (刘海) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-8 bg-[#1A1D2E] rounded-b-[2rem] z-[110] flex items-center justify-center">
          <div className="w-12 h-1 bg-white/10 rounded-full" />
        </div>

        {/* 内部滚动内容区 */}
        <div 
          ref={scrollContainerRef}
          className="flex-grow overflow-y-auto no-scrollbar bg-[#FAFAFB] relative pb-32"
        >
          
          {activeTab === 'home' ? (
            <>
              {/* 背景装饰元素 - 增强非对称感 */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[80%] h-[40%] bg-blue-50/50 rounded-full blur-[100px]" />
                <div className="absolute bottom-[20%] right-[-5%] w-[60%] h-[30%] bg-purple-50/40 rounded-full blur-[80px]" />
              </div>

              {/* 首页内容 (保持原样) */}
              <nav className="relative z-10 flex justify-between items-center px-8 pt-12 pb-4">
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                  <h1 className="text-xl font-bold tracking-tight text-[#1A1D2E]">你好，旅行者</h1>
                  <p className="text-[10px] text-gray-400 font-medium uppercase tracking-widest mt-0.5">寻找您的下一次灵感</p>
                </motion.div>
                <div className="w-12 h-12 rounded-2xl overflow-hidden shadow-sm ring-4 ring-white">
                  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200" className="w-full h-full object-cover" />
                </div>
              </nav>

              <div className="px-8 mt-6 relative z-10">
                <div className="flex gap-3">
                  <div className="flex-grow h-14 bg-white rounded-2xl flex items-center px-5 gap-3 shadow-sm border border-gray-50">
                    <Search size={18} className="text-gray-300" />
                    <input type="text" placeholder="搜索目的地..." className="bg-transparent border-none outline-none text-sm w-full placeholder:text-gray-300" />
                  </div>
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-gray-50 text-gray-400">
                    <Calendar size={20} />
                  </div>
                </div>
              </div>

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
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                        <Sparkles className="text-blue-500" size={20} />
                      </div>
                      <span className="text-blue-400/60 text-[10px] tracking-[0.3em] uppercase font-bold">AI 私人管家</span>
                    </div>
                    <h3 className="text-[#1A1D2E] text-2xl font-bold leading-tight">AI 旅行管家<br /><span className="text-gray-300 font-light">已为您就绪</span></h3>
                    <div className="mt-6 flex items-center justify-between">
                      <p className="text-gray-400 text-[11px] max-w-[160px] leading-relaxed">定制独一无二的私人行程</p>
                      <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white">
                        <ArrowRight size={20} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </section>

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
                              className="absolute inset-0 w-full h-full object-cover" 
                            />
                            
                            {/* 渐变遮罩 */}
                            <motion.div 
                              layoutId={`card-mask-${route.id}`}
                              className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80" 
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
              <AnimatePresence>
                {selectedRoute && (
                  <motion.div 
                    layoutId={`card-container-${selectedRoute.id}`}
                    className="absolute inset-0 z-[150] bg-white flex flex-col overflow-hidden"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    {/* 顶部大图区域 (根据附件设计) */}
                    <div className="relative h-[55%] w-full">
                      <div className="absolute inset-0 overflow-hidden" style={{ clipPath: 'ellipse(100% 100% at 50% 0%)' }}>
                        <motion.img 
                          layoutId={`card-image-${selectedRoute.id}`}
                          src={selectedRoute.img} 
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
                      </div>
                      
                      {/* 顶部控制栏 (左返回，右分享/链接) */}
                      <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="absolute top-12 left-6 right-6 flex justify-between items-center z-20"
                      >
                        <button 
                          onClick={() => setSelectedRoute(null)}
                          className="w-12 h-12 bg-black/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 text-white"
                        >
                          <ChevronLeft size={24} />
                        </button>
                        <div className="flex gap-3">
                          <button className="w-12 h-12 bg-black/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 text-white">
                            <Share2 size={20} />
                          </button>
                          <button className="w-12 h-12 bg-black/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 text-white">
                            <Link2 size={20} />
                          </button>
                        </div>
                      </motion.div>

                      {/* 图片内叠加信息 (左下) */}
                      <div className="absolute bottom-16 left-8 right-8 z-20 text-white">
                        <motion.div 
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 }}
                          className="flex items-center gap-2 mb-3"
                        >
                          <Home size={16} />
                          <span className="text-sm font-bold tracking-wide">34m² 空间</span>
                        </motion.div>
                        <motion.h2 
                          layoutId={`card-title-${selectedRoute.id}`} 
                          className="text-4xl font-black mb-4 leading-tight"
                        >
                          {selectedRoute.title}
                        </motion.h2>
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.5 }}
                          className="flex items-center gap-2"
                        >
                          <span className="text-sm font-bold border-b border-white pb-0.5">{selectedRoute.reviews}</span>
                          <ChevronLeft size={14} className="rotate-180" />
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

                        {/* 景区实时状态展示区 */}
                        <div className="grid grid-cols-2 gap-4 mb-10">
                          <div className="bg-white p-5 rounded-3xl border border-gray-50 shadow-sm">
                            <div className="flex items-center gap-3 mb-4">
                              <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-green-500">
                                <Activity size={20} />
                              </div>
                              <div>
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">景区舒适度</p>
                                <p className="text-sm font-black text-green-600">极佳</p>
                              </div>
                            </div>
                            <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: '85%' }}
                                transition={{ duration: 1, delay: 0.8 }}
                                className="h-full bg-green-500 rounded-full" 
                              />
                            </div>
                          </div>
                          <div className="bg-white p-5 rounded-3xl border border-gray-50 shadow-sm">
                            <div className="flex items-center gap-3 mb-4">
                              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-500">
                                <Users size={20} />
                              </div>
                              <div>
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">实时人流量</p>
                                <p className="text-sm font-black text-blue-600">适中</p>
                              </div>
                            </div>
                            <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: '45%' }}
                                transition={{ duration: 1, delay: 1 }}
                                className="h-full bg-blue-500 rounded-full" 
                              />
                            </div>
                          </div>
                        </div>

                        {/* 票型及订购区 */}
                        <div className="mb-10">
                          <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-black text-[#1A1D2E]">票务预订</h3>
                            <span className="text-xs font-bold text-gray-300">今日可用</span>
                          </div>
                          <div className="space-y-6">
                            {[
                              { type: '成人标准票', price: '¥180', desc: '含景区大门票 + 观光车', rating: '4.9', img: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=600' },
                              { type: '优待票 (学生/老人)', price: '¥90', desc: '需持有效证件入园', rating: '4.8', img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=600' },
                              { type: 'VIP 全能套票', price: '¥398', desc: '含快速通道 + 专业讲解', rating: '5.0', img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=600' }
                            ].map((ticket, i) => (
                              <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.1 + i * 0.1 }}
                                key={ticket.type}
                                className="relative h-44 w-full rounded-[2rem] overflow-hidden shadow-xl group cursor-pointer"
                              >
                                {/* 背景图片 */}
                                <img src={ticket.img} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                                
                                {/* 票根样式切口 (左侧) */}
                                <div className="absolute left-[-12px] top-1/2 -translate-y-1/2 w-6 h-6 bg-[#F8FAF9] rounded-full z-20 shadow-[inset_-2px_0_5px_rgba(0,0,0,0.1)]" />
                                <div className="absolute left-4 top-4 bottom-4 w-[1px] border-l border-dashed border-white/30 z-20" />

                                {/* 左上角评分 */}
                                <div className="absolute top-4 left-8 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm z-20">
                                  <span className="text-[10px] font-black text-gray-800">{ticket.rating}</span>
                                  <Star size={10} className="text-yellow-400 fill-yellow-400" />
                                </div>

                                {/* 底部文字信息 */}
                                <div className="absolute bottom-5 left-8 right-24 z-20 flex items-end justify-between">
                                  <div className="flex-grow">
                                    <h4 className="text-white text-lg font-black tracking-tight mb-1">{ticket.type}</h4>
                                    <div className="flex items-center gap-2">
                                      <p className="text-white/80 text-lg font-black">{ticket.price}</p>
                                      <span className="text-white/40 text-[10px] font-medium">/ 人</span>
                                    </div>
                                    <p className="text-white/50 text-[9px] mt-1 font-medium tracking-wide line-clamp-1">{ticket.desc}</p>
                                  </div>
                                </div>

                                {/* 右下角订购按钮缺口区 (参考图布局) */}
                                <div className="absolute bottom-0 right-0 bg-[#F8FAF9] pl-4 pt-4 rounded-tl-[2.5rem] z-20">
                                  <button className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-black rounded-2xl shadow-[0_8px_20px_rgba(37,99,235,0.3)] transition-all active:scale-95 whitespace-nowrap">
                                    立即订购
                                  </button>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        {/* Upcoming Tours */}
                        <div className="mb-6 flex justify-between items-center">
                          <h3 className="text-xl font-black text-[#1A1D2E]">精选体验</h3>
                          <span className="text-xs font-bold text-gray-300 underline">查看全部</span>
                        </div>

                        <div className="flex gap-4 overflow-x-auto no-scrollbar -mx-2 px-2">
                          {selectedRoute.tours.map((tour: any) => (
                            <div key={tour.id} className="shrink-0 w-64 bg-white rounded-[2.5rem] overflow-hidden border border-gray-50 shadow-sm mb-4">
                              <div className="h-40 relative">
                                <img src={tour.img} className="w-full h-full object-cover" />
                                <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/30">
                                  <Heart size={16} />
                                </div>
                              </div>
                              <div className="p-5">
                                <h4 className="font-bold text-[#1A1D2E] mb-1">{tour.title}</h4>
                                <p className="text-[10px] text-gray-400 mb-4">{tour.days} • {tour.price}</p>
                                <div className="flex justify-between items-center">
                                  <div className="flex items-center gap-1.5">
                                    <Star size={12} className="text-yellow-400 fill-yellow-400" />
                                    <span className="text-xs font-bold">{tour.rating}</span>
                                    <span className="text-[10px] text-gray-300">{tour.reviews}</span>
                                  </div>
                                  <div className="w-10 h-10 bg-[#1A1D2E] text-white rounded-full flex items-center justify-center">
                                    <ArrowRight size={18} />
                                  </div>
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
            </>
          ) : (
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
                            setActiveTab('home');
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
          )}
        </div>

        {/* 底部导航栏 */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-white/80 backdrop-blur-2xl border-t border-gray-100/50 flex items-center justify-around px-6 pb-4 z-[120]">
          <button 
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center gap-1.5 transition-all ${activeTab === 'home' ? 'text-blue-500 scale-110' : 'text-gray-300 hover:text-gray-400'}`}
          >
            <div className={`p-2 rounded-xl transition-colors ${activeTab === 'home' ? 'bg-blue-50' : 'bg-transparent'}`}>
              <Navigation size={24} />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-tighter">发现</span>
          </button>
          <button 
            onClick={() => setActiveTab('inspiration')}
            className={`flex flex-col items-center gap-1.5 transition-all ${activeTab === 'inspiration' ? 'text-blue-500 scale-110' : 'text-gray-300 hover:text-gray-400'}`}
          >
            <div className={`p-2 rounded-xl transition-colors ${activeTab === 'inspiration' ? 'bg-blue-50' : 'bg-transparent'}`}>
              <Compass size={24} />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-tighter">灵感</span>
          </button>
          <button className="flex flex-col items-center gap-1.5 text-gray-300 hover:text-gray-400">
            <div className="p-2 rounded-xl bg-transparent">
              <Calendar size={24} />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-tighter">日程</span>
          </button>
          <div className="flex flex-col items-center gap-1.5">
            <div className="w-10 h-10 rounded-2xl border-2 border-gray-100 p-0.5">
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200" className="w-full h-full object-cover rounded-xl" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-tighter text-gray-300">我的</span>
          </div>
        </div>

        {/* Home Indicator */}
        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-[#1A1D2E]/10 rounded-full z-[120]" />
      </div>
    </div>
  );
}

export default App;
