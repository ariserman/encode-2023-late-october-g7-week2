import { ethers } from "hardhat";
import { Ballot, Ballot__factory } from "../typechain-types";
import * as dotenv from "dotenv";

let ballotContract: Ballot;
let proposals: string[] = [];
dotenv.config()

async function main() {
    const wallet = ethers.Wallet.fromMnemonic(process.env.MNEMONIC ?? "");
    const provider = ethers.getDefaultProvider("goerli");
    const signer = wallet.connect(provider);
   
    const ballotFactory = new Ballot__factory(signer);
    ballotContract = ballotFactory.attach(process.env.CONTRACT_ADDRESS ?? "");
    console.log(`Contract address ${ballotContract.address}`)
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});