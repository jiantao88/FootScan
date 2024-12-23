require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const PRIVATE_KEY = process.env.PRIVATE_KEY || "0000000000000000000000000000000000000000000000000000000000000000";

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    // Mantle 测试网
    mantleTest: {
      url: "https://rpc.testnet.mantle.xyz",
      accounts: [PRIVATE_KEY],
      chainId: 5001,
    },
    // Mantle 主网
    mantle: {
      url: "https://rpc.mantle.xyz",
      accounts: [PRIVATE_KEY],
      chainId: 5000,
    },
    // 本地开发网络
    hardhat: {
      chainId: 31337,
    },
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
  etherscan: {
    apiKey: {
      mantleTest: process.env.MANTLE_API_KEY || "",
    },
    customChains: [
      {
        network: "mantleTest",
        chainId: 5001,
        urls: {
          apiURL: "https://explorer.testnet.mantle.xyz/api",
          browserURL: "https://explorer.testnet.mantle.xyz",
        },
      },
    ],
  },
};
