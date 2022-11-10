const { AptosClient, TokenClient } = require("aptos");
const axios = require("axios");
const basePath = process.cwd();
const axiosRetry = require('axios-retry');
const fs = require("fs");

axiosRetry(axios, { retries: 5 });

let failJson = require('./build/fail/fail-Apetos Apes.json');
const client = new AptosClient('https://fullnode.mainnet.aptoslabs.com');
const tokenClient = new TokenClient(client);
const main = async () => {
    console.log(failJson.length);
    let data = []
    let dataFail = []
    let getData = await tokenClient.getCollectionData('0xb116e5baf9412b2e9229a419a4fd5be795a1abf9855af7d1e1b1786979e2c922', 'Apetos Apes');
    for (let i = 0; i < failJson.length; i++) {
        try {
            const tokenData = await tokenClient.getTokenData('0xb116e5baf9412b2e9229a419a4fd5be795a1abf9855af7d1e1b1786979e2c922', 'Apetos Apes', 'Apetos Ape' + " #" + failJson[i].toString());
            let tokenUri = tokenData.uri.replace("ipfs://", "https://ipfs.io/ipfs/");
            await axios.get(tokenUri).then((result) => {
                console.log(result.data.name + ' ✓');
                data.push(result.data);
            }).catch((err) => {
                console.log('retry');
                dataFail.push(i + 1);
            });
        } catch (err) {
            console.log('#' + (i + 1) + ' not found');
            fs.writeFileSync(`${basePath}/refetch/backup/backup-${getData.name}.json`, JSON.stringify(data, null, 2));
        }
    }
    console.log('finish');
    fs.writeFileSync(`${basePath}/refetch/${getData.name}.json`, JSON.stringify(data, null, 2));
    fs.writeFileSync(`${basePath}/build/fail/fail-${getData.name}.json`, JSON.stringify(dataFail, null, 2));
};

main();