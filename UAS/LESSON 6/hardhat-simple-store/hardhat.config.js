require("@nomiclabs/hardhat-waffle");
require("dotenv");
require("@nomiclabs/hardhat-etherscan");
require("./tasks/block-number")
require("hardhat-gas-reporter")

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
const ETHERSCAN_API_KEY =process.env.ETHERSCAN_API_KEY
const COINMARKET = process.env.COINMARKET_API_KEY
module.exports = {
  solidity: "0.8.8",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545/",
      chainId: 31337,
    }
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY
  },
  gasReporter: {
    enabled: true,
    outputFile: "gasReport.txt",
    noColors: true,
    currency: "USD",
    coinmarketcap: COINMARKET
  }
};
