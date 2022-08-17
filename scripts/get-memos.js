const hre = require("hardhat");
const { ethers, } = hre;
const { abi } = require("../artifacts/contracts/BuyMeACoffee.sol/BuyMeACoffee.json");
require("dotenv").config();

const CONTRACT_ADDRESS = process.env.DEPLOYED_ADDRESS;

async function getBalance(address) {
    const balance = await ethers.provider.getBalance(address)
    return ethers.utils.formatEther(balance);
}

async function main() {

    // Get accounts
    const [owner,] = await ethers.getSigners();
    // Get contract
    const BuyMeACoffee = await ethers.getContractAt("BuyMeACoffee", CONTRACT_ADDRESS);
    // Withdraw
    console.log(`List memos: `)
    console.log(await BuyMeACoffee.getMemos());
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
