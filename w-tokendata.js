const { AptosClient, TokenClient } = require("aptos");
const basePath = process.cwd();
const fs = require("fs");

const client = new AptosClient('https://fullnode.mainnet.aptoslabs.com');
const tokenClient = new TokenClient(client);

const main = async () => {
    let data = []
    let getData = await tokenClient.getCollectionData('0xb34e78021537f6e010f077e8040f9f2fac8ea693a44a80aec77b34900b7c3f12', 'Aptos Apostles');

    for (let i = 0; i < Number(getData.supply); i++) {
        const tokenData = await tokenClient.getTokenData('0xb34e78021537f6e010f077e8040f9f2fac8ea693a44a80aec77b34900b7c3f12', 'Aptos Apostles', 'Jesus DAO' + ' #' + (i + 1).toString());
        console.log(getData.name + ' #' +(i + 1).toString() +' ✓');
        data.push(tokenData);
    }
    fs.writeFileSync(`${basePath}/build/${getData.name}.json`, JSON.stringify(data, null, 2));
};

main();