import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QrCode, Share2, ChevronRight, Map, Hotel, Mountain, Sparkles, Navigation, Utensils, Phone, CreditCard, FileText, ShieldCheck, Settings, ClipboardCheck } from 'lucide-react';

type OrderCategory = {
  id: string;
  label: string;
  icon: React.ElementType;
  count: number;
  color: string;
};

type DocItem = {
  id: string;
  label: string;
  maskedValue: string;
  icon: React.ElementType;
};

type MenuItem = {
  id: string;
  label: string;
  icon: React.ElementType;
  hint?: string;
  onClick?: () => void;
};

const ProfilePage: React.FC = () => {
  const [toast, setToast] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 1800);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const profile = React.useMemo(() => {
    return {
      name: '黄小西',
      title: '行程服务管家',
      id: 'HX-2026-0001',
      slogan: '懂路线 · 懂服务 · 更懂你',
      avatar: new URL('../../image/叉腰眨眼_1.png', import.meta.url).toString()
    };
  }, []);

  const orders: OrderCategory[] = [
    { id: 'route', label: '线路', icon: Map, count: 2, color: 'bg-blue-50 text-blue-600 border-blue-100' },
    { id: 'spot', label: '景区', icon: Mountain, count: 3, color: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
    { id: 'hotel', label: '酒店', icon: Hotel, count: 1, color: 'bg-purple-50 text-purple-600 border-purple-100' },
    { id: 'event', label: '活动', icon: Sparkles, count: 1, color: 'bg-pink-50 text-pink-600 border-pink-100' },
    { id: 'transport', label: '出行', icon: Navigation, count: 2, color: 'bg-amber-50 text-amber-700 border-amber-100' },
    { id: 'food', label: '餐饮', icon: Utensils, count: 1, color: 'bg-orange-50 text-orange-600 border-orange-100' }
  ];

  const documents: DocItem[] = [
    { id: 'idcard', label: '身份证', maskedValue: '52**************18', icon: CreditCard },
    { id: 'passport', label: '护照', maskedValue: 'E*********6', icon: ClipboardCheck }
  ];

  const rules: MenuItem[] = [
    { id: 'agreement', label: '用户协议', icon: FileText },
    { id: 'privacy', label: '隐私政策', icon: ShieldCheck },
    { id: 'refund', label: '退改规则', icon: FileText },
    { id: 'invoice', label: '发票规则', icon: FileText }
  ];

  const settings: MenuItem[] = [
    { id: 'account', label: '账号与安全', icon: ShieldCheck },
    { id: 'common', label: '通用设置', icon: Settings },
    { id: 'about', label: '关于我们', icon: FileText }
  ];

  const shareCard = async () => {
    const text = `${profile.title}\n${profile.name}\nID: ${profile.id}\n${profile.slogan}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: `${profile.name} · ${profile.title}`, text });
        return;
      }
    } catch (_) {
    }

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        setToast('已复制名片信息');
        return;
      }
    } catch (_) {
    }

    setToast('当前环境不支持分享/复制');
  };

  return (
    <div className="min-h-full bg-[#FAFAFB] pb-32">
      <div className="px-8 pt-12 pb-6 flex items-center justify-between sticky top-0 bg-[#FAFAFB]/80 backdrop-blur-md z-20">
        <h1 className="text-2xl font-bold text-[#1A1D2E]">个人中心</h1>
      </div>

      <div className="px-8 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-[2.5rem] bg-white border border-gray-100 shadow-lg"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50" />
          <div className="relative p-7">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-14 h-14 rounded-2xl overflow-hidden bg-white shadow-sm border border-gray-100 flex-shrink-0">
                  <img src={profile.avatar} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] font-bold tracking-[0.25em] text-blue-400/70 uppercase truncate">{profile.title}</div>
                  <div className="text-xl font-black text-[#1A1D2E] truncate">{profile.name}</div>
                  <div className="text-xs text-gray-400 font-medium truncate">{profile.id}</div>
                </div>
              </div>
              <button
                onClick={shareCard}
                className="h-11 px-4 rounded-2xl bg-black text-white font-bold text-xs flex items-center gap-2 shadow-sm active:scale-95 transition-transform"
              >
                <Share2 size={16} />
                分享名片
              </button>
            </div>

            <div className="mt-6 flex items-end justify-between gap-4">
              <div className="min-w-0">
                <div className="text-sm font-bold text-gray-700 truncate">{profile.slogan}</div>
                <div className="mt-2 flex gap-2 flex-wrap">
                  {['行程提醒', '一键导航', '咨询助手'].map((t) => (
                    <span key={t} className="px-3 py-1 rounded-full bg-white/70 backdrop-blur text-[10px] font-bold text-gray-600 border border-gray-100">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-white/70 backdrop-blur border border-gray-100 flex items-center justify-center text-gray-600 flex-shrink-0">
                <QrCode size={22} />
              </div>
            </div>
          </div>
        </motion.div>

        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-xl font-black tracking-tight text-[#1A1D2E]">我的订单</h2>
            <div className="w-8 h-1 bg-blue-500 mt-2 rounded-full opacity-20" />
          </div>
          <button className="text-xs font-bold text-gray-300 flex items-center gap-1">
            全部订单 <ChevronRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {orders.map((item, idx) => (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * idx }}
              className={`rounded-[2rem] border ${item.color} bg-white p-5 text-left shadow-sm active:scale-95 transition-transform`}
              onClick={() => setToast(`${item.label}订单：功能占位`)}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.color.split(' ')[0]}`}>
                  <item.icon size={20} className={item.color.split(' ')[1]} />
                </div>
                <div className="text-xs font-black text-gray-800">{item.count}</div>
              </div>
              <div className="text-xs font-bold text-gray-700">{item.label}</div>
            </motion.button>
          ))}
        </div>

        <div>
          <div className="flex items-end justify-between mb-5">
            <div>
              <h2 className="text-xl font-black tracking-tight text-[#1A1D2E]">常用证件</h2>
              <div className="w-8 h-1 bg-blue-500 mt-2 rounded-full opacity-20" />
            </div>
            <button className="text-xs font-bold text-gray-300 flex items-center gap-1">
              管理 <ChevronRight size={14} />
            </button>
          </div>

          <div className="space-y-4">
            {documents.map((doc) => (
              <div key={doc.id} className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-5 flex items-center justify-between">
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-11 h-11 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-700">
                    <doc.icon size={18} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-bold text-gray-800">{doc.label}</div>
                    <div className="text-xs text-gray-400 font-medium truncate">{doc.maskedValue}</div>
                  </div>
                </div>
                <ChevronRight size={18} className="text-gray-300" />
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-end justify-between mb-5">
            <div>
              <h2 className="text-xl font-black tracking-tight text-[#1A1D2E]">协议规则</h2>
              <div className="w-8 h-1 bg-blue-500 mt-2 rounded-full opacity-20" />
            </div>
          </div>
          <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
            {rules.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => setToast(`${item.label}：功能占位`)}
                className={`w-full flex items-center justify-between px-6 py-5 ${idx === rules.length - 1 ? '' : 'border-b border-gray-50'}`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-700">
                    <item.icon size={18} />
                  </div>
                  <span className="text-sm font-bold text-gray-800">{item.label}</span>
                </div>
                <ChevronRight size={18} className="text-gray-300" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-end justify-between mb-5">
            <div>
              <h2 className="text-xl font-black tracking-tight text-[#1A1D2E]">客服</h2>
              <div className="w-8 h-1 bg-blue-500 mt-2 rounded-full opacity-20" />
            </div>
          </div>
          <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-6 flex items-center justify-between">
            <div className="flex items-center gap-4 min-w-0">
              <div className="w-11 h-11 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                <Phone size={18} />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-bold text-gray-800">客服电话</div>
                <div className="text-xs text-gray-400 font-medium">400-800-1234</div>
              </div>
            </div>
            <a
              href="tel:4008001234"
              className="h-11 px-5 rounded-2xl bg-blue-600 text-white font-bold text-xs flex items-center gap-2 shadow-sm active:scale-95 transition-transform"
            >
              呼叫
            </a>
          </div>
        </div>

        <div>
          <div className="flex items-end justify-between mb-5">
            <div>
              <h2 className="text-xl font-black tracking-tight text-[#1A1D2E]">设置</h2>
              <div className="w-8 h-1 bg-blue-500 mt-2 rounded-full opacity-20" />
            </div>
          </div>
          <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
            {settings.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => setToast(`${item.label}：功能占位`)}
                className={`w-full flex items-center justify-between px-6 py-5 ${idx === settings.length - 1 ? '' : 'border-b border-gray-50'}`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-700">
                    <item.icon size={18} />
                  </div>
                  <span className="text-sm font-bold text-gray-800">{item.label}</span>
                </div>
                <ChevronRight size={18} className="text-gray-300" />
              </button>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 18 }}
            className="absolute left-1/2 -translate-x-1/2 bottom-28 z-[200] px-5 py-3 rounded-2xl bg-black/90 text-white text-xs font-bold shadow-lg"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfilePage;

