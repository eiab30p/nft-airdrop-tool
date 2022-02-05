const fs = require("fs");
const baseNFTConfig = require("../create-assets/0.json");
const path = "./create-assets";

const args = process.argv.slice(2);

if (parseInt(args[0]) < 1) {
  console.log("Please Enter a Value greater than 0");
} else {
  for (let i = 1; i < parseInt(args[0]); i++) {
    baseNFTConfig.name = `Collection ${i}/${parseInt(args[0]) - 1}`;
    baseNFTConfig.image = `${i}.png`;
    baseNFTConfig.properties.files[0].uri = `${i}.png`;

    fs.writeFileSync(
      `./create-assets/${i}.json`,
      JSON.stringify(baseNFTConfig)
    );

    fs.copyFile(`${path}/0.png`, `${path}/${i}.png`, (err) => {
      if (err) {
        console.log("Error Found:", err);
      }
    });
  }
}
