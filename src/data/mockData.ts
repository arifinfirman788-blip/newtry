import { Map, Hotel, Sparkles, Compass } from 'lucide-react';

export const travelRoutes = [
  {
    id: 1,
    title: '贵州全境 · 瀑布与苗寨深度5日游',
    subtitle: '一次打卡黄果树、西江苗寨、荔波小七孔',
    location: '贵阳 · 安顺 · 荔波 · 凯里',
    flag: '🇨🇳',
    price: '¥2,800',
    rating: 5.0,
    reviews: '2.5k 条评价',
    description: '这是一条专为初次造访贵州的旅行者设计的经典线路。从壮阔的黄果树瀑布到温婉的荔波小七孔，再到风情万种的西江千户苗寨，5天时间，带您领略贵州最精华的山水与人文。全程入住高品质酒店，享受地道美食。',
    tags: ['自然奇观', '避暑胜地'],
    img: 'https://images.unsplash.com/photo-1520113412646-04fc68c0bc21?auto=format&fit=crop&q=80&w=1000',
    color: 'bg-blue-500',
    duration: '5天4晚',
    distance: '全程约800km',
    tours: [
      { id: 101, title: '瀑布奇缘', days: '2 天', price: '¥599 起/人', rating: 4.9, reviews: '156 条评价', img: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=400' },
      { id: 102, title: '龙宫探秘', days: '1 天', price: '¥320 起/人', rating: 4.7, reviews: '82 条评价', img: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=400' }
    ]
  },
  {
    id: 2,
    title: '荔波小七孔 · 绿野仙踪3日轻奢游',
    subtitle: '住进山水间，尽享地球腰带上的绿宝石',
    location: '贵阳 · 荔波',
    flag: '🇨🇳',
    price: '¥3,200',
    rating: 4.9,
    reviews: '1.8k 条评价',
    description: '逃离城市喧嚣，深入荔波小七孔的碧水青山之中。这条线路主打“慢旅行”与“轻奢享受”，安排入住景区内的高端民宿，让您有充裕的时间漫步古桥，划船湖上，感受现实版绿野仙踪的治愈力量。',
    tags: ['绿野仙踪', '极致山水'],
    img: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&q=80&w=1000',
    color: 'bg-green-500',
    duration: '3天2晚',
    distance: '全程约500km',
    tours: [
      { id: 201, title: '绿宝石探索之旅', days: '3 天', price: '¥899 起/人', rating: 4.8, reviews: '230 条评价', img: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&q=80&w=400' }
    ]
  },
  {
    id: 3,
    title: '西江千户苗寨 · 沉浸式民俗体验4日游',
    subtitle: '深入苗疆腹地，体验非遗蜡染与长桌宴',
    location: '贵阳 · 凯里 · 西江',
    flag: '🇨🇳',
    price: '¥1,980',
    rating: 4.8,
    reviews: '3.1k 条评价',
    description: '这不仅是一次旅行，更是一次文化寻根之旅。深入西江千户苗寨，穿上盛装体验苗族服饰，亲手制作非遗蜡染，品尝长桌宴的高山流水。夜晚看万家灯火，清晨听苗岭飞歌，沉浸式感受苗族文化的独特魅力。',
    tags: ['民俗文化', '璀璨夜景'],
    img: 'https://images.unsplash.com/photo-1523731407965-2430cd12f5e4?auto=format&fit=crop&q=80&w=1000',
    color: 'bg-orange-500',
    duration: '4天3晚',
    distance: '全程约400km',
    tours: []
  }
];

export interface Service {
  name: string;
  icon: React.ElementType;
  url: string;
  img: string;
}

export const services: Service[] = [
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

export const scenicSpots = [
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

export interface ItineraryActivity {
  id: string;
  time: string;
  title: string;
  description?: string;
  type: 'transport' | 'hotel' | 'scenic' | 'food' | 'other';
  status: 'pending' | 'ongoing' | 'completed';
  location?: string;
  img?: string;
  meta?: {
    transportType?: string;
    number?: string;
    seat?: string;
    gate?: string;
    terminal?: string;
    checkIn?: string;
  };
}

export interface Itinerary {
  id: number;
  title: string;
  destination: string;
  date: string;
  status: 'upcoming' | 'completed' | 'ongoing';
  img: string;
  activities: ItineraryActivity[];
}

export const itineraries: Itinerary[] = [
  {
    id: 1,
    title: '贵州山水深度游',
    destination: '贵阳 · 安顺 · 荔波',
    date: '2024.05.01 - 05.05',
    status: 'ongoing',
    img: 'https://images.unsplash.com/photo-1520113412646-04fc68c0bc21?auto=format&fit=crop&q=80&w=1000',
    activities: [
      {
        id: 'a1',
        time: '09:30',
        title: '前往黄果树瀑布',
        type: 'transport',
        status: 'completed',
        location: '贵阳北站 - 安顺西站',
        img: 'https://images.unsplash.com/photo-1555529733-0e670560f7e1?auto=format&fit=crop&q=80&w=1000',
        meta: {
          transportType: '高铁',
          number: 'G2334',
          seat: '04车 12A',
          gate: '15B'
        }
      },
      {
        id: 'a2',
        time: '14:00',
        title: '入住观瀑酒店',
        type: 'hotel',
        status: 'ongoing',
        location: '安顺黄果树柏联酒店',
        img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1000',
        meta: {
          checkIn: '14:00',
          number: '豪华大床房'
        }
      },
      {
        id: 'a3',
        time: '15:30',
        title: '黄果树大瀑布景区',
        type: 'scenic',
        status: 'pending',
        location: '贵州省安顺市',
        img: 'https://images.unsplash.com/photo-1520113412646-04fc68c0bc21?auto=format&fit=crop&q=80&w=1000',
        description: '游览亚洲第一大瀑布，打卡水帘洞'
      }
    ]
  },
  {
    id: 2,
    title: '黔东南民俗体验',
    destination: '凯里 · 镇远',
    date: '2024.02.10 - 02.14',
    status: 'completed',
    img: 'https://images.unsplash.com/photo-1523731407965-2430cd12f5e4?auto=format&fit=crop&q=80&w=1000',
    activities: [
      {
        id: 'b1',
        time: '10:00',
        title: '体验苗族蜡染',
        type: 'other',
        status: 'completed',
        location: '西江千户苗寨'
      },
      {
        id: 'b2',
        time: '18:00',
        title: '品尝酸汤鱼',
        type: 'food',
        status: 'completed',
        location: '老凯里酸汤鱼'
      }
    ]
  }
];
