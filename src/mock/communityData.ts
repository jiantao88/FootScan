export interface Post {
  id: string;
  title: string;
  content: string;
  author: {
    address: string;
    name: string;
    avatar: string;
  };
  createdAt: string;
  likes: number;
  comments: Comment[];
  tags: string[];
  imageUrl?: string;
  ipfsHash?: string;
}

export interface Comment {
  id: string;
  content: string;
  author: {
    address: string;
    name: string;
    avatar: string;
  };
  createdAt: string;
  likes: number;
}

export const mockPosts: Post[] = [
  {
    id: '1',
    title: '发现一家超赞的健康食品店！',
    content: `今天在城市中心发现了一家新开的健康食品店，他们所有的产品都经过严格的食品安全认证。

特别推荐他们的有机蔬菜和水果，每件产品都可以通过区块链追溯源头。我用我们的 FoodScan App 扫描了几个商品，安全指数都非常高！

以下是一些值得推荐的商品：
1. 有机西兰花 - 来自本地农场
2. 无农药草莓 - 口感超赞
3. 纯天然蜂蜜 - 可追溯到具体的养蜂场

大家有兴趣的可以去看看，地址在：xx路xx号`,
    author: {
      address: '0x1234...5678',
      name: '健康生活家',
      avatar: '/images/food-1.jpg'
    },
    createdAt: '2024-12-23T08:00:00.000Z',
    likes: 156,
    comments: [
      {
        id: 'c1',
        content: '谢谢分享！我也去买了些水果，确实很新鲜！',
        author: {
          address: '0x9876...4321',
          name: '美食达人',
          avatar: '/images/food-2.jpg'
        },
        createdAt: '2024-12-23T09:15:00.000Z',
        likes: 23
      }
    ],
    tags: ['健康食品', '有机', '食品安全', '本地农产品'],
    imageUrl: '/images/food-1.jpg'
  },
  {
    id: '2',
    title: '警惕！发现某超市销售过期食品',
    content: `今天使用 FoodScan App 在某连锁超市发现了一批临期食品被更改了生产日期！

我已经通过 App 上传了证据并获得了社区的验证。这些食品主要是一些进口零食和饮料。

提醒大家：
1. 购买食品时一定要仔细检查生产日期
2. 最好使用 FoodScan App 扫描验证
3. 发现问题及时举报

相关部门已经介入调查，我会持续关注并更新进展。`,
    author: {
      address: '0x5678...9012',
      name: '食安卫士',
      avatar: '/images/food-3.jpg'
    },
    createdAt: '2024-12-22T15:30:00.000Z',
    likes: 892,
    comments: [
      {
        id: 'c2',
        content: '感谢曝光！我正好经常去这家超市，以后会更注意。',
        author: {
          address: '0x3456...7890',
          name: '明智消费者',
          avatar: '/images/food-2.jpg'
        },
        createdAt: '2024-12-22T16:00:00.000Z',
        likes: 45
      },
      {
        id: 'c3',
        content: '已经向市场监管部门举报了，他们说会立即调查。',
        author: {
          address: '0x7890...1234',
          name: '正义之声',
          avatar: '/images/food-1.jpg'
        },
        createdAt: '2024-12-22T16:30:00.000Z',
        likes: 67
      }
    ],
    tags: ['食品安全', '消费维权', '社区监督', '曝光台'],
    imageUrl: '/images/food-2.jpg'
  },
  {
    id: '3',
    title: '如何识别优质大米？分享一些实用技巧',
    content: `作为一名从事了10年大米质量检测的工作者，今天给大家分享一些识别优质大米的技巧：

1. 外观检查：
   - 颜色均匀，有自然光泽
   - 米粒完整，无破损
   - 无虫蛀和发霉现象

2. 气味测试：
   - 优质大米有淡淡的米香
   - 无异味和霉味

3. 用 FoodScan 扫描：
   - 农药残留指数应低于0.5
   - 重金属含量在安全范围内
   - 可追溯种植环境

4. 煮饭测试：
   - 米粒膨胀均匀
   - 口感软糯有弹性
   - 放置后不容易变硬

希望这些信息对大家有帮助！如果有任何问题，欢迎在评论区讨论。`,
    author: {
      address: '0x2468...1357',
      name: '粮食专家',
      avatar: '/images/food-1.jpg'
    },
    createdAt: '2024-12-21T10:00:00.000Z',
    likes: 445,
    comments: [
      {
        id: 'c4',
        content: '非常专业的分享！请问不同品种的大米应该如何挑选呢？',
        author: {
          address: '0x1357...2468',
          name: '好奇宝宝',
          avatar: '/images/food-3.jpg'
        },
        createdAt: '2024-12-21T10:30:00.000Z',
        likes: 28
      },
      {
        id: 'c5',
        content: '用 FoodScan 扫描真的很方便，昨天我就用它选了一袋大米，蒸出来的饭特别香！',
        author: {
          address: '0x8642...9753',
          name: '科技控',
          avatar: '/images/food-2.jpg'
        },
        createdAt: '2024-12-21T11:00:00.000Z',
        likes: 35
      }
    ],
    tags: ['大米', '食品安全', '经验分享', '生活技巧'],
    imageUrl: '/images/food-3.jpg'
  }
];

export const getPost = (id: string): Post | undefined => {
  return mockPosts.find(post => post.id === id);
};

export const getRecommendedPosts = (currentPostId: string): Post[] => {
  return mockPosts
    .filter(post => post.id !== currentPostId)
    .sort(() => Math.random() - 0.5)
    .slice(0, 2);
};
