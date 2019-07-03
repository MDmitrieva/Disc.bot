const discord = require("discord.js");
const request = require('request-promise')
const config = require('c:/bot/config.json')
//const passport = require('c:/bot/passport.js')


module.exports.run = (bot, message, args,) => {
   return request.get(`https://eu.api.blizzard.com/data/wow/token/?namespace=dynamic-eu&locale='ru_RU'&access_token=${(passport.accessToken)}`)
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

//&access_token=${(config.blizzToken)}