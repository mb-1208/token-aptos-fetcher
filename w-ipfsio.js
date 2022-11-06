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
    let dataFail = []
    let getData = await tokenClient.getCollectionData('0xb116e5baf9412b2e9229a419a4fd5be795a1abf9855af7d1e1b1786979e2c922', 'Apetos Apes');
    for (let i = 0; i < Number(getData.supply); i++) {
        try {
            const tokenData = await tokenClient.getTokenData('0xb116e5baf9412b2e9229a419a4fd5be795a1abf9855af7d1e1b1786979e2c922', 'Apetos Apes', 'Apetos Ape' + " #" + (i + 1).toString());
            let tokenUri = tokenData.uri.replace("ipfs://", "https://ipfs.io/ipfs/");
            await axios.get(tokenUri).then((result) => {
                console.log(result.data.name + ' ✓');
                data.push(result.data);
            }).catch((err) => {
                console.log('retry');
                dataFail.push(i);
            });
        } catch (err) {
            console.log('#' + (i + 1) + ' not found');
            fs.writeFileSync(`${basePath}/build/backup2-${getData.name}.json`, JSON.stringify(data, null, 2));
        }
    }
    console.log('finish');
    fs.writeFileSync(`${basePath}/build/${getData.name}.json`, JSON.stringify(data, null, 2));
    fs.writeFileSync(`${basePath}/build/fail-${getData.name}.json`, JSON.stringify(dataFail, null, 2));
};

main();
