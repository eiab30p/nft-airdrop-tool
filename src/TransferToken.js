const anchor = require("@project-serum/anchor");
const spltoken = require("@solana/spl-token");
const bs58 = require("bs58");

// [
//   "31bW9i7qwzwe3VfDJCB9E5eobU8HPu7TZJ82TAMNJyXW",
//   "EMRi1zZVnH3e2qUgMG91SD4ZyX2Dc7ENk7kjda8ZAbbB",
//   "9vctedDmUQz3ptvyESZJUVeR7FbSALtQrPPdraWL4RuQ",
//   "9oGtrTjurkVwYq2RkrNnMuk6btvvnG5i2K19byRYxzst",
//   "69ii1ncKAYdeRvyqTYYU5eVErDgr8oLFNZgW6anLCjWa",
//   "8uooCVWouEE5dnq4r1Vr5CDBVebbeSv1EaWQKz6vVXa9",
//   "CkzACnDKnAJG1DVZNuHtiqGmPJV4QA36QiUUcSsBYgjL",
//   "5eTn1cm528ErtqJLaPAeqG1VKQoMSwBVjkp4ModrnKje",
//   "6y9k9jFyLJp1895zpzUUEAyKFqs9tMUbhN4WcD4tnx5N",
//   "J1aFjLYQo8zezwuCpfkt51LCv776NqcedjAHN8naCcjX",
// ];
const privateKey = require("../../../../.config/solana/devnet-testingairdrop.json");

const throttledAddress = "https://api.mainnet-beta.solana.com";
const testNet =
  "https://muddy-icy-pine.solana-devnet.quiknode.pro/ea74485eceb04c8524ad3722b33ec35dcd9ec6b1/";
const mainNet =
  "https://cool-wild-cherry.solana-mainnet.quiknode.pro/086a636e72b445a617a4ddc91cc0c3f293d71e6a/";

// import { Token, TOKEN_PROGRAM_ID } from "@solana/spl-token";

async function transfer(tokenMintAddress, wallet, to, connection, amount) {
  const mintPublicKey = new anchor.web3.PublicKey(tokenMintAddress);
  const mintToken = new spltoken.Token(
    connection,
    mintPublicKey,
    spltoken.TOKEN_PROGRAM_ID,
    wallet.payer // the wallet owner will pay to transfer and to create recipients associated token account if it does not yet exist.
  );

  const fromTokenAccount = await mintToken.getOrCreateAssociatedAccountInfo(
    wallet.publicKey
  );

  const destPublicKey = new anchor.web3.PublicKey(to);

  // Get the derived address of the destination wallet which will hold the custom token
  const associatedDestinationTokenAddr =
    await spltoken.Token.getAssociatedTokenAddress(
      mintToken.associatedProgramId,
      mintToken.programId,
      mintPublicKey,
      destPublicKey
    );

  const receiverAccount = await connection.getAccountInfo(
    associatedDestinationTokenAddr
  );

  const instructions = [];

  if (receiverAccount === null) {
    instructions.push(
      spltoken.Token.createAssociatedTokenAccountInstruction(
        mintToken.associatedProgramId,
        mintToken.programId,
        mintPublicKey,
        associatedDestinationTokenAddr,
        destPublicKey,
        wallet.publicKey
      )
    );
  }

  instructions.push(
    spltoken.Token.createTransferInstruction(
      spltoken.TOKEN_PROGRAM_ID,
      fromTokenAccount.address,
      associatedDestinationTokenAddr,
      wallet.publicKey,
      [],
      amount
    )
  );

  const transaction = new anchor.web3.Transaction().add(...instructions);
  transaction.feePayer = wallet.publicKey;
  transaction.recentBlockhash = (
    await connection.getRecentBlockhash()
  ).blockhash;

  let signature = await anchor.web3.sendAndConfirmTransaction(
    connection,
    transaction,
    [wallet]
  );
  console.log("SIGNATURE", signature);
  console.log("SUCCESS");

  // const transactionSignature = await connection.sendRawTransaction(
  //   transaction.serialize(),
  //   { skipPreflight: true }
  // );

  // await connection.confirmTransaction(transactionSignature);
}

const fromWallet = new anchor.web3.PublicKey(
  "AWBxGE7fwS9pJxtepgN6sbKx8SdqHiNA6QfEDKAdGxc"
);
// console.log(fromWallet);
const toWallet = new anchor.web3.PublicKey(
  "Fa37hVX6oAsx1A3f1tu3bYKFXc8fKNszBbM6LeT7G8SN"
);
// console.log(toWallet);

const mintPublicKey = new anchor.web3.PublicKey(
  "31bW9i7qwzwe3VfDJCB9E5eobU8HPu7TZJ82TAMNJyXW"
);
const connection = new anchor.web3.Connection(
  anchor.web3.clusterApiUrl("devnet")
);

const formatedKey = anchor.web3.Keypair.fromSecretKey(
  new Uint8Array(privateKey)
);

transfer(
  "5eTn1cm528ErtqJLaPAeqG1VKQoMSwBVjkp4ModrnKje",
  formatedKey,
  "Fa37hVX6oAsx1A3f1tu3bYKFXc8fKNszBbM6LeT7G8SN",
  connection,
  1
);
