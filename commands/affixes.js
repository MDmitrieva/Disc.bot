const discord = require("discord.js");
const request = require('request-promise')


module.exports.run = (bot, message, args,) => {
   return request.get("https://raider.io/api/v1/mythic-plus/affixes?region=eu&locale=ru")
    .then (response => {
        console.log(response)

        let res = JSON.parse(response)
        console.log(res)
     
        let details = res.affix_details
    
        let result = ""
        details.forEach(element => {
        result+=`**${element.name}**\n`
        result+=element.description+"\n"
        result+="\n"
            
        });
        return { message:result, files: []}
    })
}


module.exports.help = {
    name: "аффиксы"
}