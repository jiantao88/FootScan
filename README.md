# FoodScan

FoodScan is a Web3-powered food safety analysis platform that leverages AI models to analyze food ingredient lists, providing comprehensive safety assessments and recommendations. We are committed to making food safety information more transparent, trustworthy, and putting data ownership back in users' hands.

[中文文档](./README.zh-CN.md)

## Core Features

- **AI Safety Analysis**: Upload ingredient lists for instant safety analysis and scoring
- **Risk Assessment**: Identify excessive additives, potential allergens, and other safety concerns
- **Improvement Suggestions**: Receive professional food safety improvement recommendations
- **Data Traceability**: Blockchain-based ingredient information storage ensures data authenticity and traceability
- **Community Building**: Token incentive mechanism encourages user participation in data verification and algorithm optimization

## Web3 Innovation

- **Decentralized Data Storage**: Utilizing blockchain technology to ensure data authenticity and traceability
- **User Incentive Mechanism**:
  - Token Rewards: Participate in data verification and error correction
  - NFT Certification: Special privileges and certification for quality contributors
- **Data Sovereignty**: Users have complete control over their personal data, ensuring privacy and security
- **Smart Contracts**: Automated contribution rewards distribution and community governance

## Tech Stack

- **Frontend**:
  - Next.js 13 - React Framework
  - TypeScript - Type Safety
  - Tailwind CSS - Responsive Design
  - RainbowKit - Web3 Wallet Integration
  
- **Blockchain**:
  - Thirdweb SDK - Web3 Functionality Integration
  - Solidity - Smart Contract Development
  
- **AI/Data**:
  - OpenAI API - Ingredient Analysis
  - IPFS - Decentralized Storage

## Quick Start

1. Clone the repository:
   ```bash
   git clone https://github.com/jiantao88/FootScan.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Fill in required API keys:
     - Thirdweb Client ID
     - OpenAI API Key (if using)

4. Start the development server:
   ```bash
   npm run dev
   ```

## Environment Variables

Create a `.env` file and add the following:

```
NEXT_PUBLIC_THIRDWEB_CLIENT_ID=your_client_id_here
OPENAI_API_KEY=your_openai_api_key_here
```

## License

MIT
