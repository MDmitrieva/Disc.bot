const discord = require("discord.js");
const request = require('request-promise')


module.exports.run = (bot, message, args,) => {
   return request.get("https://raider.io/api/v1/mythic-plus/affixes?region=eu&locale=ru")
    .then (response => {
        console.log(response)
        let res = JSON.parse(response)
        console.log(res)
        let details = res.affix_details
        let embed = {
            title: "**Аффиксы на текущее КД:**",
            color: 3447003,
            thumbnail:{
                "url": "https://cdn.shopify.com/s/files/1/1061/1924/products/Smiling_Devil_Emoji_large.png?v=1480481056"},
            author: {
                "name": "Николаев",
                "icon_url": "https://cdn.discordapp.com/app-icons/503896289721974785/93df0c03d3c3b4a2c1882a78a57eb67c.png"
            },
            fields: []

        };
        details.forEach(element => {
            embed.fields.push({name: element.name, value: element.description})
            
        });
        return { message, files: [embed]}
    })
}


module.exports.help = {
    name: "test"
}