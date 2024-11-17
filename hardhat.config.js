require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

module.exports = {
  solidity: "0.8.20",
  networks: {
    baseSepolia: {
      url: "https://sepolia.base.org/rpc",
      accounts: [`0x${process.env.PRIVATE_KEY}`],
    },
  },
};
