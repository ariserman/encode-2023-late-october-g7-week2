import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { ethers } from 'hardhat';
import { Ballot } from '../typechain-types/Ballot';
import { Ballot__factory } from '../typechain-types/factories/Ballot__factory';
import * as dotenv from 'dotenv';
dotenv.config();


async function main() {
    const provider = ethers.getDefaultProvider("goerli");
    const seed = process.env.MNEMONIC;
    const wallet = ethers.Wallet.fromMnemonic(seed ?? "");
    const signer = wallet.connect(provider);
    const balanceBN = await signer.getBalance();

    const args = process.argv;
    const params = args.slice(2);
    const contractAddress = params[0];

    const ballotContractFactory = new Ballot__factory(signer);
    const ballotContract = ballotContractFactory.connect(signer).attach(contractAddress) as Ballot;

    const winnerName = ethers.utils.parseBytes32String(await ballotContract.winnerName());

    console.log(
        `The winning proposal is ${winnerName}`
    );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});