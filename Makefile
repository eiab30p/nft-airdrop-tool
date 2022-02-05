METAPLEX_PATH ?= "../metaplex"
KEY ?= "/Users/whyuascii/.config/solana/devnet-testingairdrop.json"
RPC_HOST ?= "https://muddy-icy-pine.solana-devnet.quiknode.pro/ea74485eceb04c8524ad3722b33ec35dcd9ec6b1/"


upload:
	./metaplex-bash-scripts/0_upload_token.sh $(METAPLEX_PATH) $(KEY) $(RPC_HOST)
mint:
	./metaplex-bash-scripts/1_mint_token.sh $(METAPLEX_PATH) $(KEY) $(RPC_HOST) $(TOTAL)


verify:
	./metaplex-bash-scripts/2_verify_token.sh $(METAPLEX_PATH) $(KEY) $(RPC_HOST)
