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

    const args = process.argv;
    const params = args.slice(2);
    const targetAccount= params[0];

    const tx = await ballotContract.vote(0);
    const receipt = await tx.wait();
    console.log(receipt);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
