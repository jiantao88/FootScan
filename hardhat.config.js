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
    mantle: {
      url: `https://rpc.testnet.mantle.xyz`,
      accounts: [process.env.PRIVATE_KEY]
    }
  },
  typechain: {
    outDir: "src/types/contracts",
    target: "ethers-v6"
  }
};
