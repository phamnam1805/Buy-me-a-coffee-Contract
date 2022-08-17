require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require("hardhat-contract-sizer");
require("hardhat-gas-reporter");
require("dotenv").config();

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const URL = process.env.RINKEBY_URL;

const networks = {
    hardhat: {
        mining: {
            mempool: {
                order: "fifo",
            },
        },
        chainId: 31337,
    },
    rinkeby: {
        url: URL,
        accounts: [PRIVATE_KEY]
    },
};

module.exports = {
    defaultNetwork: "hardhat",
    networks: networks,
    solidity: {
        compilers: [
            {
                version: "0.8.4",
                settings: {
                    metadata: { bytecodeHash: "none" },
                    optimizer: { enabled: true, runs: 200 },
                },
            }
        ],
        settings: {
            outputSelection: {
                "*": {
                    "*": ["storageLayout"],
                },
            },
        },
    },
    contractSizer: {
        alphaSort: true,
        disambiguatePaths: false,
        runOnCompile: true,
        strict: true,
    }
};
