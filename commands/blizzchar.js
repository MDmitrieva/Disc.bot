const discord = require("discord.js");
const request = require('request-promise')
const RuNames = require('./RuNames.json')
const config = require('../config.json')


module.exports.run = (bot, message, parameters,) => {
    let character = parameters[0]; //тут мы ожидаем что юзер рилм вписал итд
    let realm = parameters[1];
    if(RuNames[realm] !== undefined) realm = RuNames[realm]
    if(realm == null) {realm = "howling-fjord"}
    let url = `https://eu.api.blizzard.com/data/wow/character/${realm}/${encodeURI(character)}/?locale=ru_RU&access_token=${(config.BLIZZARD_API_ACCESS_TOKEN)}`;
    console.log(url)
   return request.get(`https://eu.api.blizzard.com/data/wow/character/${realm}/${encodeURI(character)}/?locale=ru_RU&access_token=${(config.BLIZZARD_API_ACCESS_TOKEN)}`)
    .then (response => {
        console.log(response) 
      //  let res = JSON.parse(response)
       // console.log(res)
      //  var character = res
      //      var name = character.name
      //      var thumb = character.thumbnail_url
      //      var rp = character.raid_progression
       //     var who = character.class
       //     var spec = character.active_spec_name
        //    var ap = character.achievement_points
        //    var ilvl = character.gear.item_level_equipped
        //    var max_ilvl = character.gear.item_level_total
         //   var guild = character.guild.name
      

       let result = " "
       result+=`**${name}**\n`
        result+=`**Класс:** ${RuNames[who]}`+"\n"
        result+=`**Спек:** ${RuNames[spec]}`+"\n"
        result+=`**Илвл:** ${ilvl}/${max_ilvl}`+"\n"
        result+=`**Гильдия:** ${guild}`+"\n"
        result+=`**Очки достижений:** ${ap}`+"\n"

        for (var raid in rp)   
     {
         
        if(RuNames[raid] != null) {
            result+=`**${RuNames[raid]} прогресс:**\n`
            for (let raid_info in rp[raid]) {
             
                if(RuNames[raid_info] != null)
                result+=RuNames[raid_info]+ rp[raid][raid_info] +"\n" 
            }
        }
    } 

        return { files: [thumb], message:result}
    })
}
module.exports.help = {
    name: "имя1"
}