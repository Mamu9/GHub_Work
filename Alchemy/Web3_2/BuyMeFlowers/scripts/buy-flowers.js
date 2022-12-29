

const hre = require("hardhat");
//const hrew = require("@nomiclabs/hardhat-waffle");

// Returns the Eth balance of a given address. 
async function getBalance(address) {
  const balanceBigInt = await hre.waffle.provider.getBalance(address);
  console.log("--------post get balance-------");
  return hre.ethers.utils.formatEther(balanceBigInt);
}

// Logs the Ether balance for a list of addresses
async function printBalances(addresses) {
  let idx = 0;
  console.log("--------1111-------");
  for (const address of addresses) {
    console.log("--------inside for-------");
    console.log('Address ${idx} Balance ::: ', await getBalance(address));
  }
}

// Logs the memos stored on-chain from flowers purchases.
async function printMemos(memos) {
  for (const memo of memos) {
    const timestamp = memo.timestamp;
    const tipper = memo.name;
    const tipperAddress = memo.from;
    const message = memo.message;
    console.log('At ${timestamp}, ${tipper} (${tipperAddress}) said: "${message}"');
  }
}

async function main() {
// Get example accounts.
const [owner, tipper, tipper2, tipper3] = await hre.ethers.getSigners();

// Get the contract to deploy.
const BuyMeFlowers = await hre.ethers.getContractFactory("BuyMeFlowers");
const buyMeFlowers = await BuyMeFlowers.deploy();
await buyMeFlowers.deployed();
console.log("BuyMeFlowers deployed to ", buyMeFlowers.address);

// Deploy the contract
const addresses = [owner.address, tipper.address, buyMeFlowers.address];
console.log("--------start-------");
await printBalances(addresses);

// Check balances before the flower/s purchase
const tip = {value: hre.ethers.utils.parseEther("1")};
await buyMeFlowers.connect(tipper).buyFlower("Caroline", "You are the best!", tip);
await buyMeFlowers.connect(tipper2).buyFlower("Angela", "Great!", tip);
await buyMeFlowers.connect(tipper3).buyFlower("Billie", "Love you !", tip);

// Buy the owner flower/s
console.log("--------bought flowers-------");
await printBalances(addresses);

// Check the balances after the flower/s purchase

// withdraw funds

// Check balances after withdraw

// Read all the memos left for the owner



}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
  console.error(error);
  process.exit(1);
});
