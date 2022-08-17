const hre = require("hardhat");
const {ethers, } = hre;
const {abi} = require("../artifacts/contracts/BuyMeACoffee.sol/BuyMeACoffee.json");
require("dotenv").config();

const CONTRACT_ADDRESS = process.env.DEPLOYED_ADDRESS;

async function getBalance(address){
    const balance = await ethers.provider.getBalance(address)
    return ethers.utils.formatEther(balance);
}

async function main() {

    // Get accounts
    const [owner, ] = await ethers.getSigners();
    // Get contract
    const BuyMeACoffee = await ethers.getContractAt("BuyMeACoffee", CONTRACT_ADDRESS);
    // Withdraw
    console.log(`Address ${owner.address} balance: `, await getBalance(owner.address));
    console.log("Withdrawing . . .");
    await BuyMeACoffee.connect(owner).withdraw();
    console.log(`Address ${owner.address} balance: `, await getBalance(owner.address));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
