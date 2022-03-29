require("@nomiclabs/hardhat-waffle");

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

module.exports = {
  solidity: "0.8.4",
  paths: {
    artifacts: "./src/artifacts",
  },
  networks: {
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/e008e2a8432049789e7a85d1155932b4`,
      accounts: {
        mnemonic:
          "spring retire until can turn choice ankle close lamp holiday outdoor wise",
        initialIndex: 0,
        path: "m/44'/60'/0'/0",
      },
    },
  },
};
