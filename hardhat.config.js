require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
const { ethers } = require("ethers");

module.exports = {
  networks: {
    polygon_mumbai: {
      url: process.env.INFURA_RPC_URL,
      accounts: {
        mnemonic: process.env.MNEMONIC
      }
    }
  },
  solidity: "0.8.19",
};
