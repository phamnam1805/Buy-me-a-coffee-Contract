// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const {ethers, } = hre;

// Get ETH balance of a given address
async function getBalance(address){
    const balance = await ethers.provider.getBalance(address)
    return ethers.utils.formatEther(balance);
}

// Log ETH balance for a list of addresses
async function printBalances(addresses){
    for (const address of addresses){
        console.log(`Address ${address} balance: `, await getBalance(address));
    }
}

// Log the memos stored on-chain from coffee purchases
async function printMemos(memos){
    for (const memo of memos){
        const timestamp = memo.timestamp;
        const tipperAddress = memo.from;
        const tipper = memo.name;
        const message = memo.message;
        console.log(`At ${timestamp}, ${tipper} (${tipperAddress} said: "${message}"`);
    }
}


async function main() {

    // Get accounts
    const [owner, tipper1, tipper2, tipper3] = await ethers.getSigners();
    // Get contract
    const BuyMeACoffee = await ethers.getContractFactory("BuyMeACoffee", owner);
    const buyMeACoffee = await BuyMeACoffee.deploy();
    await buyMeACoffee.deployed();
    console.log("BuyMeACoffee deployed to: ",buyMeACoffee.address);

    // Check balance before buy coffee
    const addresses = [buyMeACoffee.address, owner.address, tipper1.address, tipper2.address, tipper3.address];
    console.log("== Start ==");
    await printBalances(addresses);
    
    // Buy for the owner a few coffee
    await buyMeACoffee.connect(tipper1).buyCoffee("Tipper 1", "Happy happy", {value: ethers.utils.parseEther('10')});
    await buyMeACoffee.connect(tipper2).buyCoffee("Tipper 2", "Wish you the best!", {value: ethers.utils.parseEther('10')});
    await buyMeACoffee.connect(tipper3).buyCoffee("Tipper 3", "Congratulation!", {value: ethers.utils.parseEther('10')});
    // Check balance after buy coffee
    console.log("== After buy coffee ==");
    await printBalances(addresses);

    // Withdraw funds
    await buyMeACoffee.withdraw();

    // Check balance after withdraw
    console.log("== After withdraw ==");
    await printBalances(addresses);

    // Get all memos
    let memos = await buyMeACoffee.getMemos();

    // Log all memos
    console.log("== Memos ==");
    await printMemos(memos);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
