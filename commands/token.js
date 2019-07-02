const discord = require("discord.js");
const request = require('request-promise')
const config = require('c:/bot/config.json')
//const blizzard = require('blizzard.js').initialize({
 //   key: BLIZZARD_CLIENT_ID,
 //   secret: BLIZZARD_CLIENT_SECRET,
 // });

module.exports.run = (bot, message, args,) => {
   return request.get(`https://eu.api.blizzard.com/data/wow/token/?namespace=dynamic-eu&locale=eu_rus&access_token=${(config.blizzToken)}`)
    .then (response => {
        console.log(response)

        let res = JSON.parse(response)
        console.log(res)
       
        var token = res
            var price = token.price
        let result = ""   
        result+=`**Цена на жетон:** ${price}\n`  
        return { message:result, files: []}
    })
}
module.exports.help = {
    name: "жетон"
}