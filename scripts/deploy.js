const hre = require("hardhat");

async function main() {
  console.log("开始部署合约...");

  // 部署工厂合约
  const FoodScanFactory = await hre.ethers.getContractFactory("FoodScanFactory");
  const factory = await FoodScanFactory.deploy();
  await factory.waitForDeployment();
  console.log("FoodScanFactory 已部署到:", await factory.getAddress());

  // 部署代币合约
  await factory.deployTokenContract();
  console.log("FoodScanToken 已部署");

  // 部署社区合约
  await factory.deployCommunityContract();
  console.log("FoodScanCommunity 已部署");

  // 获取所有合约地址
  const addresses = await factory.getContractAddresses();
  console.log("合约地址:");
  console.log("- Factory:", await factory.getAddress());
  console.log("- Token:", addresses[0]);
  console.log("- Community:", addresses[1]);

  // 验证合约
  if (network.name !== "hardhat" && network.name !== "localhost") {
    console.log("等待区块确认...");
    await factory.deployTransaction.wait(6);

    console.log("开始验证合约...");
    await hre.run("verify:verify", {
      address: await factory.getAddress(),
      constructorArguments: [],
    });
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
