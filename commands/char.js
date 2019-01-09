const discord = require("discord.js");
const request = require('request-promise')
const RuNames = require('./RuNames.json')
const actualRaids = {
    uldir: "Ульдир"
}    
module.exports.run = (bot, message, parameters,) => {
    let character = parameters[0]; //тут мы ожидаем что юзер рилм вписал итд
    let realm = parameters[1];
    if(RuNames[realm] !== undefined) realm = RuNames[realm]
    if(realm == null) {realm = "howlingfjord"}
    let url = `https://raider.io/api/v1/characters/profile?region=eu&realm=${realm}&name=${encodeURI(character)}&fields=gear%2Craid_progression%2Cguild`;
    console.log(url)
   return request.get(`https://raider.io/api/v1/characters/profile?region=eu&realm=${realm}&name=${encodeURI(character)}&fields=gear%2Craid_progression%2Cguild`)
    .then (response => {
         console.log(response) 
        let res = JSON.parse(response)
        console.log(res)
        var character = res
            var name = character.name
            var thumb = character.thumbnail_url
            var rp = character.raid_progression
            var uldir = rp.uldir
            var who = character.class
            var spec = character.active_spec_name
            var ap = character.achievement_points
            var ilvl = character.gear.item_level_equipped
            var max_ilvl = character.gear.item_level_total
            var guild = character.guild.name

       let result = " "
       result+=`**${name}**\n`
        result+=`**Класс:** ${RuNames[who]}`+"\n"
        result+=`**Спек:** ${RuNames[spec]}`+"\n"
        result+=`**Илвл:** ${ilvl}/${max_ilvl}`+"\n"
        result+=`**Гильдия:** ${guild}`+"\n"
        result+=`**Очки достижений:** ${ap}`+"\n"
    for (let raid in rp)   
     {
        if(actualRaids[raid] != null) {
            result+=`**${actualRaids[raid]} прогресс:**\n`
            for (let raid_info in uldir) {
                if(RuNames[raid_info] != null)
                result+=RuNames[raid_info]+ uldir[raid_info]+"\n" 
            }
        }
    } 
        return { message:result, files: [thumb]}
    })
}
module.exports.help = {
    name: "имя"
}