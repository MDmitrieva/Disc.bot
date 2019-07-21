
const discord = require("discord.js");
const request = require('request-promise')
const config = require('../config.json')

module.exports.run = (bot, message, args,) => {
   return request.get(`https://eu.api.blizzard.com/data/wow/token/?namespace=dynamic-eu&locale='ru_RU'&access_token=${(config.BLIZZARD_API_ACCESS_TOKEN)}`)
    .then (response => {
        console.log(response)
        let res = JSON.parse(response)
        var GoldResult = String(res.price);
        console.log(GoldResult)
        // Remove Copper/Silver
        // TODO: Fix for if the gold price drops below or above 6 figures.
        GoldOnly = GoldResult.slice(0,-4);
        
        // Make number readable
        GFirst = GoldOnly.slice(0,-3);
        GLast = GoldOnly.slice(3);
        
        // Stick Together
        GFinal = GFirst + "," + GLast + " голд";

        var embed = {
            "color": 15570176,
            "thumbnail": {
                "url": "https://wowtokenprices.com/assets/wowtoken-compressed.png"
            },
            "fields": [
                {
                    "name": `Цена на жетон в Европейском регионе`,
                    "value": GFinal
                }
            ]
        };
        
    // Send message
    message.channel.send({ embed });
    }).catch(console.error);
}   

module.exports.help = {
    name: "жетон"}
