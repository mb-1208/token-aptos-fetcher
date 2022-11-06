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
    let getData = await tokenClient.getCollectionData('0xb116e5baf9412b2e9229a419a4fd5be795a1abf9855af7d1e1b1786979e2c922', 'Apetos Apes');
    try {
        const tokenData = await tokenClient.getTokenData('0xb116e5baf9412b2e9229a419a4fd5be795a1abf9855af7d1e1b1786979e2c922', 'Apetos Apes', 'Apetos Ape' + " #" + "5");
        let tokenUri = tokenData.uri.replace("ipfs://", "https://ipfs.io/ipfs/");
        await axios.get(tokenUri).then((result) => {
            console.log(result.data.name + ' ✓');
            data.push(result.data);
        }).catch((err) => {
            console.log('retry');
        });
    } catch (err) {
        console.log('#' + (i + 1) + ' not found');
    }
    console.log('finish');
    fs.writeFileSync(`${basePath}/build/${getData.name}2.json`, JSON.stringify(data, null, 2));
};

main();