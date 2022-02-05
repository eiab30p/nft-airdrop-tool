METAPLEX_PATH=${1:-"../metaplex"}
KEYPAIR=$2
RPC_HOST=${3:-"https://api.devnet.solana.com/"}

OUTFILE_DIR="./metaplex-bash-scripts/outputfiles"

mkdir -p ${OUTFILE_DIR}

OUTFILE_FULL=${OUTFILE_DIR}/detailed.log
OUTFILE_MINTS=${OUTFILE_DIR}/mints.log


echo ""

echo "ts-node ${METAPLEX_PATH}/js/packages/cli/src/candy-machine-v2-cli.ts upload \
 -e devnet \
 -k ${KEYPAIR} \
 -cp ./metaplex-bash-scripts/config.json \
 -c example \
 --rpc-url ${RPC_HOST} \
 ./metaplex-bash-scripts/assets"

echo ""

ts-node ${METAPLEX_PATH}/js/packages/cli/src/candy-machine-v2-cli.ts upload \
 -e devnet \
 -k ${KEYPAIR} \
 -cp ./metaplex-bash-scripts/config.json \
 -c example \
 --rpc-url ${RPC_HOST} \
 ./metaplex-bash-scripts/assets\
    | tee -a ${OUTFILE_FULL}



echo ""
echo "All done. Mint ids stored to ${OUTFILE_MINTS}"