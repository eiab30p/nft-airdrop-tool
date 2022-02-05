METAPLEX_PATH=${1:-"../metaplex"}
KEYPAIR=$2
RPC_HOST=${3:-"https://api.devnet.solana.com/"}

OUTFILE_DIR="./metaplex-bash-scripts/outputfiles"

mkdir -p ${OUTFILE_DIR}

OUTFILE_FULL=${OUTFILE_DIR}/detailed.log
OUTFILE_MINTS=${OUTFILE_DIR}/mints.log


echo ""

echo "ts-node ${METAPLEX_PATH}/js/packages/cli/src/candy-machine-v2-cli.ts verify_upload \
 -e devnet \
 -k ${KEYPAIR} \
 -c example \
 --rpc-url ${RPC_HOST}"

echo ""

ts-node ${METAPLEX_PATH}/js/packages/cli/src/candy-machine-v2-cli.ts verify_upload \
 -e devnet \
 -k ${KEYPAIR} \
 -c example \
 --rpc-url ${RPC_HOST} \
    | tee -a ${OUTFILE_FULL}


echo ""
echo "All done. Mint ids stored to ${OUTFILE_MINTS}"