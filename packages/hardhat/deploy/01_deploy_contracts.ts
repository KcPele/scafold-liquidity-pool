import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { ethers } from "hardhat";
import { Contract } from "ethers";

const tokens = (nToken: number) => {
  return ethers.parseUnits(nToken.toString(), "ether");
};
const deployScaffoldContract: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const _initialSupply = tokens(50000000000);
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;
  console.log(`Deployer ${deployer}`);
  const scaffold = await deploy("Scaffold", {
    from: deployer,
    args: [_initialSupply],
    log: true,
    autoMine: true,
  });
  console.log(`Scaffold: ${scaffold.address}`);

  // ICO Scaffold
  const _tokenPrice = tokens(0.001);
  const icoScaffold = await deploy("ICOScaffold", {
    from: deployer,
    args: [scaffold.address, _tokenPrice],
    log: true,
    autoMine: true,
  });
  console.log(`ICOScaffold: ${icoScaffold.address}`);
  const scaffoldContract = await hre.ethers.getContract<Contract>("Scaffold", deployer);
  console.log("👋 Initial greeting:", await scaffoldContract.transfer(icoScaffold.address, tokens(40000000000)));
  //Liquidity
  const liquidity = await deploy("Liquidity", {
    from: deployer,
    args: [],
    log: true,
    autoMine: true,
  });
  console.log(`Liquidity: ${liquidity.address}`);
};

export default deployScaffoldContract;

// Tags are useful if you have multiple deploy files and only want to run one of them.
// e.g. yarn deploy --tags ScaffoldContract
deployScaffoldContract.tags = ["ScaffoldContract"];
