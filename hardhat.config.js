
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  networks: {
    polygon_mumbai: {
      url: process.env.ALCHEMY_RPC_URL, // Use Infura or Alchemy
      accounts: [process.env.PRIVATE_KEY]
    }
  },
  solidity: "0.8.19",
};
