const hre = require("hardhat");
const {ethers, } = hre;

async function main() {

    // Get accounts
    const [owner, ] = await ethers.getSigners();
    // Get contract
    const BuyMeACoffee = await ethers.getContractFactory("BuyMeACoffee", owner);
    // Deploy contract
    const buyMeACoffee = await BuyMeACoffee.deploy();
    await buyMeACoffee.deployed();
    console.log("BuyMeACoffee deployed to: ",buyMeACoffee.address);


}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
