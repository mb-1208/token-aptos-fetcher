const { AptosClient, TokenClient } = require("aptos");
const axios = require("axios");
const basePath = process.cwd();
const axiosRetry = require('axios-retry');
const fs = require("fs");

axiosRetry(axios, { retries: 5 });

const client = new AptosClient('https://fullnode.mainnet.aptoslabs.com');
const tokenClient = new TokenClient(client);
const main = async () => {
    let data = []
    let getData = await tokenClient.getCollectionData('0xc0e3fbf8ae61056d66ce624d71ccf1888f879355cc4e364ef117249b5e3160a8', 'Aptomingos');
    for (let i = 0; i < Number(getData.supply); i++) {
        const tokenData = await tokenClient.getTokenData('0xc0e3fbf8ae61056d66ce624d71ccf1888f879355cc4e364ef117249b5e3160a8', 'Aptomingos', 'Aptomingo' + " #" + (i + 1).toString());
        let tokenUri = tokenData.uri.replace("ipfs://", "https://ipfs.io/ipfs/");
        await axios.get(tokenUri).then((result) => {
            console.log(result.data.name + ' ✓');
            data.push(result.data);
        }).catch((err) => {
            console.log('retry');
            fs.writeFileSync(`${basePath}/build/backup-${getData.name}.json`, JSON.stringify(data, null, 2));
        });
    }
    console.log('finish');
    fs.writeFileSync(`${basePath}/build/${getData.name}.json`, JSON.stringify(data, null, 2));
};

main();
