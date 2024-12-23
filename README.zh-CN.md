# FoodScan

FoodScan 是一个基于 Web3 技术的食品安全分析平台，通过 AI 模型分析食品配料表，为用户提供全面的食品安全评估和建议。我们致力于让食品安全信息更加透明、可信，并赋予用户数据所有权。

## 核心功能

- **AI 安全分析**：上传食品配料表，获取即时的安全性分析和评分
- **风险评估**：识别过量添加剂、潜在致敏成分等安全隐患
- **改进建议**：提供专业的食品安全改进建议
- **数据追溯**：基于区块链的配料信息存储，确保数据可信且可追溯
- **社区共建**：通过代币激励机制，鼓励用户参与数据审核和算法优化

## Web3 创新点

- **去中心化数据存储**：利用区块链技术确保数据的真实性和可追溯性
- **用户激励机制**：
  - 代币奖励：参与数据审核和纠错
  - NFT 认证：优质贡献者可获得特殊权限和认证
- **数据主权**：用户完全掌控个人数据，确保隐私安全
- **智能合约**：自动化的贡献奖励分发和社区治理

## 技术栈

- **前端**：
  - Next.js 13 - React 框架
  - TypeScript - 类型安全
  - Tailwind CSS - 响应式设计
  - RainbowKit - Web3 钱包集成
  
- **区块链**：
  - Thirdweb SDK - Web3 功能集成
  - Solidity - 智能合约开发
  
- **AI/数据**：
  - OpenAI API - 配料分析
  - IPFS - 去中心化存储

## 快速开始

1. 克隆仓库：
   ```bash
   git clone https://github.com/jiantao88/FootScan.git
   ```

2. 安装依赖：
   ```bash
   npm install
   ```

3. 配置环境变量：
   - 复制 `.env.example` 到 `.env`
   - 填入必要的 API keys：
     - Thirdweb Client ID
     - OpenAI API Key（如果使用）

4. 启动开发服务器：
   ```bash
   npm run dev
   ```

## 环境变量

创建 `.env` 文件并添加以下配置：

```
NEXT_PUBLIC_THIRDWEB_CLIENT_ID=your_client_id_here
OPENAI_API_KEY=your_openai_api_key_here
```

## 许可证

MIT
