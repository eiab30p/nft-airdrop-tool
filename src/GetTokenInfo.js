// This file gets the current owners for each token.
// Change HTTP to use quick node URL

const axios = require("axios");
const fs = require("fs");

const NFTToken = require("./tokenAddress.json");
const throttledAddress = "https://api.mainnet-beta.solana.com";
const testNet = "";
const mainNet =
  "https://cool-wild-cherry.solana-mainnet.quiknode.pro/086a636e72b445a617a4ddc91cc0c3f293d71e6a/";

const marketWallet = [
  "F4ghBzHFNgJxV4wEQDchU5i7n4XWWMBSaq7CuswGiVsr",
  "GUfCR9mK6azb9vcpsxgXyj7XRPAKJd4KMHTTVvtncGgp",
  "3D49QorJyNaL4rcpiynbuS3pRH4Y7EXEM6v6ZGaqfFGK",
  "4pUQS4Jo2dsfWzt3VgHXy3H6RYnEDd11oWPiaM2rdAPw",
];

const requestFunction = async (tokenAddress) => {
  return axios
    .post(mainNet, {
      jsonrpc: "2.0",
      id: 1,
      method: "getProgramAccounts",
      params: [
        "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
        {
          encoding: "jsonParsed",
          filters: [
            {
              dataSize: 165,
            },
            {
              memcmp: {
                offset: 0,
                bytes: tokenAddress,
              },
            },
          ],
        },
      ],
    })
    .then((res) => {
      let owner = res.data.result[0].account.data.parsed.info.owner;

      if (!marketWallet.includes(owner)) {
        return owner;
      }
    })
    .catch((error) => {
      console.error("error");
    });
};

module.exports = {
  requestFunction,
};
