const Web3 = require('web3');
const TruffleContract = require('@truffle/contract');
const CarbonCreditArtifact = require('./build/contracts/CarbonCredit.json');

const provider = new Web3.providers.HttpProvider('http://127.0.0.1:8545');
const web3 = new Web3(provider);

const CarbonCredit = TruffleContract(CarbonCreditArtifact);
CarbonCredit.setProvider(provider);

async function main() {
    const accounts = await web3.eth.getAccounts();
    const admin = accounts[0];
    const user1 = accounts[1];

    const instance = await CarbonCredit.new({ from: admin });

    await instance.issueCredits(user1, 100, { from: admin });
    const credits = await instance.getCredits(user1);
    
    console.log("Credits for user1:", credits.toString());
}

main().catch((error) => {
    console.error("Error interacting with contract:", error);
});
    