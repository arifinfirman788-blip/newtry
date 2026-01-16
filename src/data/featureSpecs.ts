export interface UISpecs {
  colors?: { name: string; value: string }[];
  typography?: { name: string; size: string; weight: string }[];
  spacing?: { name: string; value: string }[];
  borderRadius?: { name: string; value: string }[];
  shadows?: { name: string; value: string }[];
}

export interface FeatureSpec {
  id: string;
  title: string;
  description: string;
  interactionLogic: string;
  fields?: {
    name: string;
    type: string;
    description: string;
  }[];
  uiSpecs?: UISpecs;
  subFeatures?: FeatureSpec[];
}

export const initialFeatures: FeatureSpec[] = [
  {
    id: 'home',
    title: '首页',
    description: '应用的主要入口，展示核心功能和推荐内容。',
    interactionLogic: '顶部展示问候语和头像。中间为金刚区导航。底部展示精选线路卡片，支持左右滑动切换。',
    uiSpecs: {
      colors: [
        { name: 'Background', value: '#FAFAFB' },
        { name: 'Text Primary', value: '#1A1D2E' }
      ]
    },
    subFeatures: [
      {
        id: 'home_header',
        title: '顶部问候区',
        description: '展示用户头像与个性化问候语',
        interactionLogic: '静态展示，头像点击可跳转个人中心（预留）。',
        uiSpecs: {
          typography: [
            { name: 'Greeting', size: '26px', weight: '700' },
            { name: 'Subtitle', size: '14px', weight: '400' }
          ],
          colors: [
            { name: 'Text Main', value: '#1A1D2E' },
            { name: 'Text Sub', value: '#9CA3AF' }
          ]
        }
      },
      {
        id: 'home_ai_agent',
        title: 'AI 旅行管家卡片',
        description: '核心功能入口，展示 AI 形象与引导文案。',
        interactionLogic: '点击卡片任意区域（或右下角按钮）进入 AI 对话界面。图片位于右侧固定区域。',
        uiSpecs: {
          colors: [
            { name: 'Card Bg', value: '#FFFFFF' },
            { name: 'Accent Blue', value: '#3B82F6' }
          ],
          borderRadius: [{ name: 'Card', value: '40px' }],
          shadows: [{ name: 'Card Shadow', value: '0 20px 40px rgba(59,130,246,0.1)' }]
        }
      },
      {
        id: 'home_king_kong',
        title: '金刚区 (功能导航)',
        description: '核心服务快捷入口（机票、酒店、火车票等）。',
        interactionLogic: '横向滚动或网格布局。点击图标跳转对应垂直业务线首页。',
        uiSpecs: {
          colors: [
            { name: 'Icon Bg', value: '#F3F4F6' },
            { name: 'Label', value: '#4B5563' }
          ],
          borderRadius: [{ name: 'Icon Box', value: '16px' }]
        }
      },
      {
        id: 'home_featured_routes',
        title: '精选线路',
        description: '展示平台推荐的优质旅行线路。',
        interactionLogic: '水平滚动查看更多。点击卡片进入线路详情页。',
        uiSpecs: {
          colors: [
            { name: 'Tag Bg', value: 'rgba(255,255,255,0.9)' },
            { name: 'Price', value: '#FFFFFF' }
          ],
          borderRadius: [{ name: 'Image', value: '32px' }],
          typography: [{ name: 'Route Title', size: '18px', weight: '700' }]
        },
        fields: [
          { name: 'title', type: 'string', description: '线路标题' },
          { name: 'price', type: 'number', description: '起步价' },
          { name: 'rating', type: 'number', description: '评分 (0-5)' },
          { name: 'image', type: 'url', description: '封面图路径' }
        ]
      },
      {
        id: 'home_recent_schedule',
        title: '首页行程卡片',
        description: '首页展示的当前进行中或即将开始的行程卡片，方便用户快速查看和操作。',
        interactionLogic: '点击卡片任意区域跳转至行程详情页。包含三个快捷服务按钮，点击触发对应操作（导航、咨询、业务操作）。',
        uiSpecs: {
          colors: [
            { name: 'Card Bg', value: '#FFFFFF' },
            { name: 'Nav Button Text', value: '#2563EB' },
            { name: 'Nav Button Bg', value: '#EFF6FF' },
            { name: 'AI Button Text', value: '#9333EA' },
            { name: 'AI Button Bg', value: '#FAF5FF' }
          ],
          borderRadius: [{ name: 'Card', value: '40px' }, { name: 'Action Button', value: '12px' }],
          shadows: [{ name: 'Card', value: '0 20px 25px -5px rgba(30, 58, 138, 0.05)' }],
          typography: [
            { name: 'Time', size: '30px', weight: '700' },
            { name: 'Activity Title', size: '24px', weight: '700' }
          ]
        },
        fields: [
          { name: 'activityNode', type: 'object', description: '当前展示的行程节点数据' },
          { name: 'status', type: 'enum', description: "'ongoing' | 'upcoming'" }
        ],
        subFeatures: [
          {
            id: 'home_schedule_nav_btn',
            title: '一键导航按钮',
            description: '快速调起地图导航至当前节点位置。',
            interactionLogic: '点击打开系统地图或 Google Maps，自动填入目的地。',
            uiSpecs: { colors: [{ name: 'Icon', value: '#2563EB' }] }
          },
          {
            id: 'home_schedule_ai_btn',
            title: '咨询助手按钮',
            description: '针对当前行程节点快速发起 AI 咨询。',
            interactionLogic: '点击跳转 Chat 页，并自动携带当前节点上下文（如“我想了解下这个景点的排队情况”）。',
            uiSpecs: { colors: [{ name: 'Icon', value: '#9333EA' }] }
          },
          {
            id: 'home_schedule_action_btn',
            title: '业务操作按钮 (动态)',
            description: '根据节点类型动态变化的快捷操作按钮。',
            interactionLogic: '酒店 -> 联系前台；交通 -> 查看电子票；餐饮 -> 查看菜单；景点 -> AI 导览。',
            uiSpecs: {
              colors: [
                { name: 'Hotel (Orange)', value: '#EA580C' },
                { name: 'Transport (Blue)', value: '#2563EB' },
                { name: 'Food (Yellow)', value: '#CA8A04' }
              ]
            }
          }
        ]
      }
    ]
  },
  {
    id: 'schedule',
    title: '行程页',
    description: '展示用户的行程安排列表。',
    interactionLogic: '按时间倒序排列。区分“进行中”、“即将开始”、“已完成”状态。点击卡片进入详情。',
    uiSpecs: {
      colors: [{ name: 'Bg', value: '#FAFAFB' }]
    },
    subFeatures: [
      {
        id: 'schedule_card',
        title: '行程卡片',
        description: '展示单次行程的关键信息（标题、时间、状态、封面图）。',
        interactionLogic: '点击卡片整体跳转至行程详情页。状态标签根据行程时间自动计算（进行中/未开始/已结束）。',
        uiSpecs: {
          colors: [
            { name: 'Card Bg', value: '#FFFFFF' },
            { name: 'Status Tag (Ongoing)', value: '#3B82F6' },
            { name: 'Status Tag (Upcoming)', value: '#10B981' },
            { name: 'Status Tag (Completed)', value: '#9CA3AF' }
          ],
          borderRadius: [{ name: 'Card', value: '24px' }],
          shadows: [{ name: 'Card', value: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }],
          typography: [
            { name: 'Title', size: '18px', weight: '700' },
            { name: 'Date', size: '14px', weight: '400' }
          ]
        },
        fields: [
          { name: 'id', type: 'string', description: '行程唯一标识' },
          { name: 'title', type: 'string', description: '行程标题' },
          { name: 'date', type: 'string', description: '行程日期范围' },
          { name: 'status', type: 'enum', description: "'ongoing' | 'upcoming' | 'completed'" },
          { name: 'image', type: 'url', description: '封面图片地址' }
        ]
      }
    ]
  },
  {
    id: 'chat',
    title: 'AI 咨询',
    description: '智能客服对话界面。',
    interactionLogic: '支持多轮对话。根据上下文推荐服务卡片（酒店、门票等）。支持转人工。',
    uiSpecs: {
      colors: [{ name: 'Bubble User', value: '#3B82F6' }, { name: 'Bubble AI', value: '#FFFFFF' }]
    }
  },
  {
    id: 'profile',
    title: '个人中心',
    description: '用户个人信息管理与服务入口聚合页。',
    interactionLogic: '顶部展示个人信息卡片。下方按业务模块分组展示功能入口（订单、证件、协议、客服、设置）。',
    uiSpecs: {
      colors: [{ name: 'Page Bg', value: '#F3F4F6' }],
      spacing: [{ name: 'Section Gap', value: '16px' }]
    },
    subFeatures: [
      {
        id: 'profile_user_card',
        title: '用户信息卡片 (智能名片)',
        description: '展示用户头像、昵称、身份标签及会员信息。支持分享名片。',
        interactionLogic: '点击头像可查看大图或更换头像。点击分享按钮调起系统分享或复制链接。',
        uiSpecs: {
          colors: [
            { name: 'Card Bg', value: '#FFFFFF' },
            { name: 'Name Text', value: '#111827' },
            { name: 'Tag Bg', value: '#EFF6FF' },
            { name: 'Tag Text', value: '#3B82F6' }
          ],
          borderRadius: [{ name: 'Avatar', value: '50%' }, { name: 'Card', value: '24px' }],
          typography: [
            { name: 'Nickname', size: '20px', weight: '700' },
            { name: 'ID', size: '12px', weight: '400' }
          ]
        },
        fields: [
          { name: 'avatar', type: 'url', description: '用户头像地址' },
          { name: 'nickname', type: 'string', description: '用户昵称' },
          { name: 'userId', type: 'string', description: '用户唯一 ID' },
          { name: 'tags', type: 'string[]', description: '用户标签列表' }
        ]
      },
      {
        id: 'profile_orders',
        title: '我的订单',
        description: '各类业务订单的统一入口（线路、景区、酒店、活动、出行、餐饮）。',
        interactionLogic: '点击具体分类图标跳转至对应类型的订单列表页。',
        uiSpecs: {
          colors: [
            { name: 'Icon Bg', value: '#F9FAFB' },
            { name: 'Label Text', value: '#4B5563' }
          ],
          borderRadius: [{ name: 'Icon Box', value: '12px' }],
          typography: [{ name: 'Label', size: '12px', weight: '500' }]
        }
      },
      {
        id: 'profile_documents',
        title: '常用证件',
        description: '管理出行所需的身份证、护照等证件信息。',
        interactionLogic: '列表展示已添加证件（脱敏显示）。支持新增、编辑、删除证件。',
        uiSpecs: {
          colors: [{ name: 'Card Bg', value: '#FFFFFF' }],
          typography: [{ name: 'Doc Name', size: '16px', weight: '500' }]
        },
        fields: [
          { name: 'type', type: 'enum', description: "'ID_CARD' | 'PASSPORT'" },
          { name: 'name', type: 'string', description: '证件持有人姓名' },
          { name: 'number', type: 'string', description: '证件号码（加密存储）' }
        ]
      },
      {
        id: 'profile_agreements',
        title: '协议规则',
        description: '展示平台相关法律条款与规则（用户协议、隐私协议、退改规则、发票规则）。',
        interactionLogic: '点击列表项跳转至对应的富文本详情页。',
        uiSpecs: {
          colors: [{ name: 'Text', value: '#374151' }],
          typography: [{ name: 'Item Title', size: '14px', weight: '400' }]
        }
      },
      {
        id: 'profile_service',
        title: '客服支持',
        description: '提供客服电话展示与一键拨打功能。',
        interactionLogic: '点击电话图标或号码区域直接调起系统拨号盘。',
        uiSpecs: {
          colors: [
            { name: 'Button Bg', value: '#EFF6FF' },
            { name: 'Button Text', value: '#3B82F6' }
          ]
        }
      },
      {
        id: 'profile_settings',
        title: '设置',
        description: '应用通用设置入口（账号安全、通用设置、关于我们）。',
        interactionLogic: '点击跳转至设置详情页。',
        uiSpecs: {
          colors: [{ name: 'Text', value: '#374151' }]
        }
      }
    ]
  }
];
