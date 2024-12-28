export default {
  common: {
    home: '首页',
    scan: '扫描',
    community: '社区',
    dashboard: '控制台',
    explore: '探索',
    profile: '个人资料',
    connect_wallet: '连接钱包',
    disconnect: '断开连接',
    upload: '上传',
    search: '搜索',
    about: '关于',
    dark_mode: '暗色模式',
    light_mode: '亮色模式',
    loading: '加载中...',
    success: '成功',
    error: '错误',
    confirm: '确认',
    cancel: '取消'
  },
  title: '食品扫描器',
  subtitle: '扫描食品获取详细信息',
  hero: {
    title: '食品安全',
    subtitle: '从配料表开始',
    description: '使用 AI + Web3 技术，智能分析食品配料表，确保食品安全。社区共建，让每一份食品都透明可信。',
    start_button: '开始分析'
  },
  features: {
    title: '为什么选择我们',
    subtitle: '智能分析，安全可靠',
    items: {
      ai_analysis: {
        title: '智能识别',
        description: '自动识别配料表图片，快速提取文字信息'
      },
      blockchain: {
        title: '安全分析',
        description: 'AI 分析配料成分，评估潜在风险'
      },
      community: {
        title: '社区共治',
        description: '用户参与评价，共同维护食品安全'
      },
      realtime: {
        title: '数据透明',
        description: '分析结果上链存证，确保数据可信'
      }
    }
  },
  analysis: {
    title: '热门分析',
    description: '发现社区最新分析的食品配料，获取安全评估报告',
    status: {
      safe: '安全',
      warning: '需注意',
      danger: '危险'
    },
    time: {
      hours_ago: '{{hours}}小时前'
    },
    verifications: '{{count}}次验证',
    view_details: '查看详情',
    view_more: '查看更多分析',
    cards: {
      card1: {
        title: '某品牌饼干',
        ingredients: '主要成分：面粉、糖、植物油...'
      },
      card2: {
        title: '某品牌饮料',
        ingredients: '主要成分：水、糖、果汁、防腐剂...'
      },
      card3: {
        title: '某品牌零食',
        ingredients: '主要成分：玉米、植物油、调味料...'
      }
    }
  },
  cta: {
    title: '加入我们，共建食品安全社区',
    start_button: '开始分析'
  },
  scan: {
    upload_title: '上传食品图片',
    upload_desc: '拖放图片到此处或点击浏览',
    analyzing: '正在分析...',
    results: {
      title: '分析结果',
      overview: '概览',
      detailed: '详细分析',
      community: '社区反馈',
      nutrition_score: '营养评分',
      nutrition_score_desc: '基于营养成分的综合评分',
      safety_index: '安全指数',
      safety_index_desc: '食品安全综合评估',
      community_rating: '社区评分',
      community_rating_desc: '基于社区用户的评价',
      main_findings: '主要发现',
      no_harmful_additives: '未发现有害添加剂',
      safe: '安全',
      safe_desc: '该食品安全性良好',
      warning: '需注意',
      warning_desc: '该食品含有需要注意的成分',
      danger: '危险',
      danger_desc: '该食品含有潜在危险成分'
    },
    card: {
      view_details: '查看详情',
      participate: '参与分析',
      verified: '已验证',
      pending: '待验证',
      verification_count: '{{count}}次验证',
      rating: '评分',
      likes: '点赞',
      analysis_time: '分析时间',
      tags: {
        // 食品类型
        carbonated: '碳酸饮料',
        snack: '零食',
        instant: '方便食品',
        dairy: '乳制品',
        meat: '肉类',
        tea: '茶饮料',
        
        // 成分特点
        sugar: '含糖',
        caffeine: '含咖啡因',
        fried: '油炸',
        high_sodium: '高钠',
        preservatives: '防腐剂',
        protein: '蛋白质',
        calcium: '钙质',
        additives: '添加剂',
        
        // 食品状态
        ready_to_eat: '即食',
        
        // 安全等级
        safe: '安全',
        warning: '警告',
        danger: '危险',
        
        // 其他标签
        verified: '已验证',
        popular: '热门',
        new: '最新',
        organic: '有机',
        vegetarian: '素食',
        vegan: '纯素',
        gluten_free: '无麸质',
        dairy_free: '无乳制品',
        nut_free: '无坚果'
      }
    }
  },
  community: {
    title: '社区',
    posts: '帖子',
    create_post: '发布帖子',
    comments: '评论',
    share: '分享',
    categories: {
      all: '全部',
      correction: '纠错与验证',
      education: '食品安全科普',
      recommendation: '产品推荐/避坑'
    },
    post: {
      create: {
        title: '创建新帖子',
        form: {
          title: '标题',
          title_placeholder: '请输入帖子标题',
          content: '内容',
          content_placeholder: '请输入帖子内容',
          category: '分类',
          is_correction: '这是一个纠错帖',
          submit: '发布',
          cancel: '取消'
        },
        success: '帖子创建成功！',
        error: '创建帖子失败，请重试',
        validation: '请填写完整的帖子内容'
      },
      meta: {
        likes: '点赞',
        comments: '评论',
        tags: '标签'
      },
      actions: {
        new_post: '发布新帖',
        view_details: '查看详情'
      }
    },
    filters: {
      title: '筛选',
      latest: '最新',
      popular: '最热',
      verified: '已验证'
    }
  },
  profile: {
    tabs: {
      info: '个人信息',
      history: '上传历史',
      contributions: '贡献记录',
      settings: '设置'
    },
    info: {
      title: '个人信息',
      wallet_address: '钱包地址',
      join_date: '加入时间',
      bio: '个人简介',
      edit: '编辑资料'
    },
    history: {
      title: '上传历史',
      no_uploads: '暂无上传记录',
      upload_time: '上传时间',
      analysis_result: '分析结果',
      view_details: '查看详情'
    },
    contributions: {
      title: '贡献记录',
      badges: {
        title: '徽章',
        no_badges: '暂无徽章'
      },
      votes: {
        title: '投票',
        upvotes: '赞同',
        downvotes: '反对'
      },
      tokens: {
        title: 'FST 代币',
        balance: '余额'
      },
      points: {
        title: '贡献点数',
        level: '等级'
      }
    },
    settings: {
      title: '设置',
      language: {
        title: '语言',
        chinese: '中文',
        english: 'English'
      },
      notifications: {
        title: '通知设置',
        analysis_complete: '分析完成通知',
        community_updates: '社区动态通知',
        token_rewards: '代币奖励通知'
      },
      privacy: {
        title: '隐私设置',
        public_profile: '公开个人资料',
        show_history: '显示上传历史',
        show_votes: '显示投票记录'
      },
      save: '保存设置',
      saved: '设置已保存'
    }
  },
  errors: {
    upload_failed: '上传失败',
    analysis_failed: '分析失败',
    please_try_again: '请稍后重试'
  },
  explore: {
    categories: {
      all: '全部',
      beverages: '饮料',
      snacks: '零食',
      instant_food: '方便食品',
      frozen_food: '速冻食品',
      dairy: '乳制品'
    },
    token: {
      title: '代币奖励',
      balance: '当前余额: {{amount}} FST',
      connect_wallet: '连接钱包以查看余额',
      claim: {
        button: '领取 100 代币',
        loading: '领取中...',
        claimed: '已领取',
        success: '成功领取 100 FST 代币！',
        error: '领取失败，请稍后重试',
        connect_first: '请先连接钱包'
      }
    },
    search: {
      placeholder: '搜索食品或用户...',
      no_results: '没有找到相关结果'
    },
    sort: {
      latest: '最新',
      popular: '最热',
      title: '排序方式'
    }
  },
  analyze: {
    not_found: '食品不存在',
    verified: '已验证',
    verifications: '({count})',
    ingredients: {
      title: '配料表',
      not_available: '暂无配料信息'
    },
    nutrition: {
      title: '营养成分',
      serving_size: '每份',
      calories: '热量',
      protein: '蛋白质',
      fat: '脂肪',
      carbs: '碳水化合物',
      sodium: '钠',
      not_available: '暂无营养成分信息'
    },
    analysis: {
      title: '分析结果',
      safety_score: '安全评分',
      risk_level: {
        title: '风险等级',
        low: '低风险',
        medium: '中等风险',
        high: '高风险'
      },
      warnings: {
        title: '警告提示',
        allergens: '过敏原',
        additives: '添加剂',
        none: '未发现风险'
      }
    },
    community: {
      title: '社区反馈',
      verified_count: '验证次数',
      comments: '评论',
      no_comments: '暂无评论'
    },
    actions: {
      verify: '验证',
      comment: '评论',
      share: '分享',
      report: '举报'
    }
  },
  upload: {
    title: '分析食品配料表',
    subtitle: '上传配料表图片或输入文字，获取 AI 分析报告',
    dropzone: {
      title: '拖放图片到这里',
      or: '或',
      browse: '浏览文件',
      hint: '支持 JPG、PNG 格式的图片'
    },
    text_input: {
      title: '或输入配料表文字',
      placeholder: '在此输入配料表文字...'
    },
    analysis: {
      start: '开始分析',
      processing: '正在分析...',
      success: '分析完成',
      error: '分析失败，请重试'
    }
  }
}
