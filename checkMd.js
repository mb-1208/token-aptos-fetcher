const { AptosClient, TokenClient } = require("aptos");
const basePath = process.cwd();
const fs = require("fs");

const client = new AptosClient('https://fullnode.mainnet.aptoslabs.com');
const tokenClient = new TokenClient(client);

const main = async () => {
    console.log('======== Data Collection ========');
    let getData = await tokenClient.getCollectionData('0xb34e78021537f6e010f077e8040f9f2fac8ea693a44a80aec77b34900b7c3f12', 'Aptos Apostles');
    console.log(getData);


    console.log('======== Data Token ========');
    const tokenData = await tokenClient.getTokenData('0xb34e78021537f6e010f077e8040f9f2fac8ea693a44a80aec77b34900b7c3f12', 'Aptos Apostles', 'Jesus DAO' + ' #1');
    console.log(tokenData);
};

main();