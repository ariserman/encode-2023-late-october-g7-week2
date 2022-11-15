import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { ethers } from 'hardhat';
import { Ballot } from '../typechain-types/Ballot';
import { Ballot__factory } from '../typechain-types/factories/Ballot__factory';
import * as dotenv from 'dotenv';
dotenv.config();


async function main() {
    const provider = ethers.getDefaultProvider("goerli");
    const seed = process.env.MNEMONIC;
    //const wallet = ethers.Wallet.fromMnemonic(seed ?? "");
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "");
    const signer = wallet.connect(provider);

    const args = process.argv;
    const params = args.slice(2);
    const contractAddress = params[0];

    const ballotContractFactory = new Ballot__factory(signer);
    const ballotContract = ballotContractFactory.connect(signer).attach(contractAddress) as Ballot;

    const winningProposal  = await ballotContract.winningProposal();

    console.log(
        `The winning proposal is in in position ${winningProposal}`
    );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});