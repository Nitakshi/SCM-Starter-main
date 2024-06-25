// Import the Hardhat Runtime Environment
const hre = require("hardhat");

async function main() {
  // Get the contract to deploy
  const Assessment = await hre.ethers.getContractFactory("Assessment");
  
  // Deploy the contract with no initial parameters since Assessment has no init balance parameter
  const assessment = await Assessment.deploy();
  
  await assessment.deployed();

  // Log the address of the deployed contract
  console.log(`Assessment contract deployed to ${assessment.address}`);
}

// Execute the deployment script and handle any errors
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
