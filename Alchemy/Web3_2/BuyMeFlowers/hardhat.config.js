// hardhat.config.js

require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require("dotenv").config()

const GOERLI_URL = process.env.GOERLI_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY; 

/** 
 * @type import('hardhat/config').HardhatUserConfig 
 */
module.exports = {
  defaultNetwork: "goerli",
  networks: {
    goerli: {
      url:"https://eth-goerli.g.alchemy.com/v2/Ay2JFOY42UEpaY-Rpxb7O5Rcf8ARCfJ2",
      accounts: ["8dee489eaa17f47b9a5d43a3f6ccc71829f5cd205d1069be81e91986fbc803f5"]
    }
  }
};
