#!/bin/bash


ARAGON_IPFS_GATEWAY=https://ipfs.io/ipfs \
ARAGON_DEFAULT_ETH_NODE=wss://rpc.v4.testnet.pulsechain.com \
ARAGON_WALLETCONNECT_RPC_URL=https://rpc.v4.testnet.pulsechain.com \
ARAGON_APP_LOCATOR=ipfs \
ARAGON_ETH_NETWORK_TYPE=pulsechain \
ARAGON_ENS_REGISTRY_ADDRESS=0x214DCdEF239b4C5AB4cd2d5185d7964170E95251 \
TAG=pulsechain ./build.sh

