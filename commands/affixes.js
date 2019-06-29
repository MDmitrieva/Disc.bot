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
                "url": "https://s.tcdn.co/4dd/300/4dd300fd-0a89-3f3d-ac53-8ec93976495e/5.png"},
            fields: [],
        };
        details.forEach(element => {
            embed.fields.push({name: element.name, value: element.description})
             });
        message.channel.send({embed});
    })
}
module.exports.help = {
    name: "аффиксы"
}