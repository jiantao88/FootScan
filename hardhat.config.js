require("@nomicfoundation/hardhat-toolbox");
require("@typechain/hardhat");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  networks: {
    arbitrumSepolia: {
      url: "https://sepolia-rollup.arbitrum.io/rpc",
      chainId: 421614,
      accounts: [process.env.PRIVATE_KEY]
    },
    arbitrumStylus: {
      url: "https://stylus-testnet.arbitrum.io/rpc",
      chainId: 23011913,
      accounts: [process.env.PRIVATE_KEY]
    }
  },
  typechain: {
    outDir: "src/types/contracts",
    target: "ethers-v6"
  },
  etherscan: {
    apiKey: {
      arbitrumSepolia: process.env.ARBISCAN_API_KEY,
      arbitrumStylus: process.env.ARBISCAN_API_KEY
    },
    customChains: [
      {
        network: "arbitrumStylus",
        chainId: 23011913,
        urls: {
          apiURL: "https://api-stylus-testnet.arbitrum.io/api",
          browserURL: "https://stylus-testnet-explorer.arbitrum.io"
        }
      }
    ]
  }
};
