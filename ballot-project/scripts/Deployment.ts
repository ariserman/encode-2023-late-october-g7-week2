import { ethers } from "hardhat";
import { Ballot, Ballot__factory } from "../typechain-types";
import * as dotenv from "dotenv"; 
dotenv.config();

function convertStringArrayToBytes32(array: string[]) {
  const bytes32Array = [];
  for (let index = 0; index < array.length; index++) {
    bytes32Array.push(ethers.utils.formatBytes32String(array[index]));
  }
  return bytes32Array;
}

async function main() {
    const provider = ethers.getDefaultProvider("goerli");
    // const lastBlock = await provider.getBlock("latest");
    //console.log({ lastBlock });

    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "");
    // const wallet = ethers.Wallet.fromMnemonic(process.env.MNEMONIC ?? "");
    const signer = wallet.connect(provider);
    const balanceBN = await signer.getBalance();
    console.log(`Connected to the account of address ${signer.address}`);
    console.log(`The balance of this account is ${balanceBN.toString()} Wei`);
  
    const args = process.argv;
    const proposals = args.slice(2);
    if (proposals.length <= 0) throw new Error("Not enough parameters");

    console.log("Deploying Ballot contract");
    console.log("Proposals: ");
    proposals.forEach((element, index) => {
        console.log(`Proposal N. ${index + 1}: ${element}`);
    });
    let ballotContract: Ballot;
    const ballotFactory = new Ballot__factory(signer);
    ballotContract = await ballotFactory.deploy(
        convertStringArrayToBytes32(proposals)
    ) as Ballot;
    await ballotContract.deployed();

    console.log(`The ballot contract was deployed at the address ${ballotContract.address} `)
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});