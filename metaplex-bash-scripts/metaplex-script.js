const util = require("util");
const exec = util.promisify(require("child_process").exec);
const fs = require("fs");

const metaplexPath = "../../metaplex";

// need to run bash script with ChildProcess
