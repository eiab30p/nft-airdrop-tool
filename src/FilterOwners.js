filterOwners = (owners) => {
  let filteredOwnersList = [];

  for (let o in owners) {
    const indexFound = filteredOwnersList.findIndex(
      (el) => el.owner === owners[o]
    );
    if (indexFound >= 0) {
      filteredOwnersList[indexFound].count =
        filteredOwnersList[indexFound].count + 1;
    } else {
      filteredOwnersList.push({
        owner: owners[o],
        count: 1,
      });
    }
  }
  return filteredOwnersList;
};

module.exports = {
  filterOwners,
};
