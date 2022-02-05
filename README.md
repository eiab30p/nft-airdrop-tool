# Solana NFT AirDrop

This tool is used to take your NFTs and airdrop it to your current users. This is more of an orchestrator for metaplex/candymachine

## Before Running: Setting Up Metaplex

Before running the airdrop we will need to do some installs and ensure metaplex/candymachine is ready for us. Ensure you have `git clone` [metaplex repository](https://github.com/metaplex-foundation/metaplex) repository. Ensure it is the same level as this project.

Once cloned ensure you have `node`, `yarn`, `ts-node`, and `solana` on your machine.

Now we are going to install the needed packages for metaplex run `yarn install --cmd ../metaplex/js` this goes outside of this project and run the package.json located in metaplex.

### Creating Wallet and set config

We will need to create a wallet for the candyMachine and this will be our "seller" funds will not go here but just a place to hold nfts to be minted by our main wallet. **Recommendation:** Replace <collectionName> with actual collection to better organize all keys generated. Also place it in a known location.

#### devnet

    `solana-keygen new --outfile ~/.config/solana/<collectionName>-devnet.json`
    `solana config set --url https://api.devnet.solana.com`

#### mainnet-beta

    `solana-keygen new --outfile ~/.config/solana/<collectionName>-mainnet-beta.json`
    `solana config set --url https://api.mainnet-beta.solana.com`

    **Note:** If you have a node place it here else just use the api.

Now we will need to add funds to these wallets. These funds will be used later on.
#### devnet

    `solana airdrop 2`

#### mainnet-beta

   Manually send funds to wallet address. Address can be found by running
   `solana address`


### MetaPlex Config

We will need to add a config.json file for metaplex. This is so we know were funds will need to go once purchasing a mint. The file will look like below. Since this is a airdrop we only want to pay transaction fees.

NOTE: store for devnet is arweave but mainnet it is arweave-sol

```
{
  "price": 0.0,
  "number": <number>,
  "gatekeeper": null,
  "solTreasuryAccount": <Insert WA of the candy machine>,
  "splTokenAccount": null,
  "splToken": null,
  "goLiveDate": <enter date ex: "25 Dec 2021 00:00:00 GMT">,
  "endSettings": null,
  "whitelistMintSettings": null,
  "hiddenSettings": null,
  "storage": "arweave",
  "ipfsInfuraProjectId": null,
  "ipfsInfuraSecret": null,
  "awsS3Bucket": null,
  "noRetainAuthority": false,
  "noMutable": false
}
```
Once this information is settled in the root of your metaplex directory you will save this json in a file called `config.json`.




At this point we will stop here. for the config and the create-assets we will need to know the actual number to do this. we will run our take snapshot command to get our list of users and a count. to do this run `npm run take snapshot` at the end we will see the total number of owners printed in the console.

Last Test TIme:
Start: 30/1/2022 @ 16:23:47 - End: 30/1/2022 @ 16:32:0


### MetaPlex Preparing assets

Now we need to prepare the assets. If you doing a collection of different assets look at the art generation tool in my repo. If you doing a one of xx collection then we will run a command to create our assets. In the folder called create-assets drop your 0.png and and 0.json file. Then run `npm run create-assets -n 100` this will take your 0.png and 0.json and make copies to create x collections. Use the create snapshot count to see how many nfts you'll need t make.

Once that is done copy these files and place them in the asset folder in metaplex directory.







**Notes:**
[Node](https://nodejs.org/en/download/)
[Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable)
[ts-node](https://www.npmjs.com/package/ts-node#installation)
[solana](https://docs.solana.com/cli/install-solana-cli-tools)








Before running make sure metaplex is the same level as this repository. Ensure you do the yarn install, yarn start blah blah steps to run metaplex



TODO:
Config.js for all env variables
clean up scripts
Write down metaplex steps in readme

Test Wallet: Fa37hVX6oAsx1A3f1tu3bYKFXc8fKNszBbM6LeT7G8SN
