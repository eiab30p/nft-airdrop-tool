const Connection = require("@metaplex/js");
const MetadataLib = require("@metaplex-foundation/mpl-token-metadata");

const connection = new Connection.Connection("devnet");
const MAX_NAME_LENGTH = 32;
const MAX_URI_LENGTH = 200;
const MAX_SYMBOL_LENGTH = 10;
const MAX_CREATOR_LEN = 32 + 1 + 1;

const candyMachineId = "9qwqfD8RPksKKhsYSrjWFL2nB5a5TP37KtCHQK7HWbo6";

async function fetchHashTable(hash) {
  const metadataAccounts = await MetadataLib.MetadataProgram.getProgramAccounts(
    connection,
    {
      filters: [
        {
          memcmp: {
            offset:
              1 +
              32 +
              32 +
              4 +
              MAX_NAME_LENGTH +
              4 +
              MAX_URI_LENGTH +
              4 +
              MAX_SYMBOL_LENGTH +
              2 +
              1 +
              4 +
              0 * MAX_CREATOR_LEN,
            bytes: hash,
          },
        },
      ],
    }
  );

  const mintHashes = [];

  for (let index = 0; index < metadataAccounts.length; index++) {
    const account = metadataAccounts[index];
    const accountInfo = await connection.getParsedAccountInfo(account.pubkey);
    const metadata = new MetadataLib.Metadata(
      hash.toString(),
      accountInfo.value
    );
    mintHashes.push(metadata.data.mint);
  }
  console.log(mintHashes);

  return mintHashes;
}

fetchHashTable(candyMachineId);
