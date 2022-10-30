const { AptosClient, TokenClient } = require("aptos");
const basePath = process.cwd();
const fs = require("fs");

const client = new AptosClient('https://fullnode.mainnet.aptoslabs.com');
const tokenClient = new TokenClient(client);

const main = async () => {
    let data = []
    let getData = await tokenClient.getCollectionData('0xc0e3fbf8ae61056d66ce624d71ccf1888f879355cc4e364ef117249b5e3160a8', 'Aptomingos');
    console.log(getData);

    for (let i = 0; i < Number(getData.supply); i++) {
        const tokenData = await tokenClient.getTokenData('0xc0e3fbf8ae61056d66ce624d71ccf1888f879355cc4e364ef117249b5e3160a8', 'Aptomingos', 'Aptomingo' + ' #' + (i + 1).toString());
        data.push(tokenData);
    }
    console.log(data);
    fs.writeFileSync(`${basePath}/build/Aptomingos.json`, JSON.stringify(data, null, 2));
};

main();
