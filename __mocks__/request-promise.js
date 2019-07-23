const affixesApiResponse = require('./responses/affixes-api-response.json');

module.exports = {
    get: url => {
        return new Promise((resolve, reject) => {
            switch (url) {
                case "https://raider.io/api/v1/mythic-plus/affixes?region=eu&locale=ru":
                    process.nextTick(resolve(JSON.stringify(affixesApiResponse)));
                    break;
                default:
                    break;
            }
        });
    }
}