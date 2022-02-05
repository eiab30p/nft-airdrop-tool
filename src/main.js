const fs = require("fs");

const GetTokenInfo = require("./GetTokenInfo");
const FilterOwners = require("./FilterOwners");

const NFTToken = require("./tokenAddress.json");

const owners = [];

const main = async () => {
  console.log("Getting Owners of " + NFTToken.length + "tokens");

  let currentDate = new Date();

  let dateTime =
    "Start: " +
    currentDate.getDate() +
    "/" +
    (currentDate.getMonth() + 1) +
    "/" +
    currentDate.getFullYear() +
    " @ " +
    currentDate.getHours() +
    ":" +
    currentDate.getMinutes() +
    ":" +
    currentDate.getSeconds();
  console.log(dateTime);

  for (let token in NFTToken) {
    let tokenOwner = await GetTokenInfo.requestFunction(NFTToken[token]);
    if (typeof tokenOwner !== "undefined") {
    //   console.log(tokenOwner);
      owners.push(tokenOwner);
    }
  }

  currentDate = new Date();
  let endTime =
    "End: " +
    currentDate.getDate() +
    "/" +
    (currentDate.getMonth() + 1) +
    "/" +
    currentDate.getFullYear() +
    " @ " +
    currentDate.getHours() +
    ":" +
    currentDate.getMinutes() +
    ":" +
    currentDate.getSeconds();

  console.log(endTime);

  fs.writeFileSync(`./owners.json`, JSON.stringify(owners));

  // Filter Owners to not have duplicates and a count. {owner:xxxxxxx,count:xxxxxxxx}
  let filteredOwnerArray = FilterOwners.filterOwners(owners);
  fs.writeFileSync(`./filteredOwners.json`, JSON.stringify(filteredOwnerArray));
  console.log("Total # of Owners: " + filteredOwnerArray.length);
};

main();
