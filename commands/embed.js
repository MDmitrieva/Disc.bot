const discord = require("discord.js");
const request = require('request-promise')
const RuNames = require('./RuNames.json')
const RaidNames = require('./RaidNames.json')

module.exports.run = (bot, message, parameters,) => {
    let character = parameters[0]; //тут мы ожидаем что юзер рилм вписал итд
    let realm = parameters[1];
    if(RuNames[realm] !== undefined) realm = RuNames[realm];
    if(realm == null) {realm = "howlingfjord"}
    let url = `https://raider.io/api/v1/characters/profile?region=eu&realm=${realm}&name=${encodeURI(character)}&fields=gear%2Craid_progression%2Cguild%2Craid_achievement_curve%3Auldir%3Acrucible-of-storms%3Abattle-of-dazaralor`;
    console.log(url)
    return request.get(`https://raider.io/api/v1/characters/profile?region=eu&realm=${realm}&name=${encodeURI(character)}&fields=gear%2Craid_progression%2Cguild%2Craid_achievement_curve%3Auldir%3Acrucible-of-storms%3Abattle-of-dazaralor`)
        .then (response => {
            let res = JSON.parse(response);
            console.log(response) 
            let character = res;
            console.log(res)
            let name = character.name;
            let thumb = character.thumbnail_url;
            let rp = character.raid_progression;
            let who = character.class;
            let spec = character.active_spec_name;
            let ap = character.achievement_points;
            let ilvl = character.gear.item_level_equipped;
            let max_ilvl = character.gear.item_level_total;
            let guild = character.guild == null ? "Без гильдии" : character.guild.name;
            let curve = character.raid_achievement_curve; 
        
    
            var embed =  {
                title: `**${name}** | **${RuNames[who]}**-**${RuNames[spec]}**`,
                color: 3447003,
                thumbnail: {
                    url: thumb},
                fields: [   
                    {name: `**Итем-лвл:**`, 
                    value: `${ilvl}/${max_ilvl}`+"\n",
                    inline: true},
                    {name: `**Гильдия:**`,
                    value: `${guild}`,
                    inline: true},
                    {name: `**Очки достижений:**`,
                    value: `${ap}`+"\n",
                    inline: false},
            
                  
                ]};   

                if (curve.length == 0)
                embed.fields.push({name: `Рейдовые достижения`, value:`Ни одной курвы в аддоне\n`,inline: true});
                else
                    curve.forEach(element => {
                        let aotc = element.raid;   
                      if (element.aotc != null && element.cutting_edge != null)
                      embed.fields.push({name: `**${RaidNames[aotc]}:**`, value:`герой св. времени + кромка\n`,inline: true});
                    else if (element.aotc != null)
                    embed.fields.push({name: `**${RaidNames[aotc]}:**`, value:`герой св. времени\n`,inline: true});
                    else if (element.cutting_edge != null)
                    embed.fields.push({name: `**${RaidNames[aotc]}:**`, value:`на кромке лезвия\n`,inline: true})},
                    )
                    for (var raid in rp)
           {          
                if(RuNames[raid] != null) {
                  
                   for (let raid_info in rp[raid]) {
                        if (RuNames[raid_info] != null)
                        embed.fields.push({name: `**${RuNames[raid]} прогресс:**\n`, value: `${RuNames[raid_info]}+ ${rp[raid][raid_info]} +"\n"`});
                   }
                   }}
                      
                        // embed.fields.push(RuNames[raid_info]+ rp[raid][raid_info] +"\n");
                    
           ///     });
                        message.channel.send({embed});
                    })
                }
                module.exports.help = {
                    name: "test"
                }
    
                // details.forEach(element => {
              //      embed.fields.push({name: element.name, value: element.description})

         //   }

         //   for (var raid in rp)
         //   {          
         //       if(RuNames[raid] != null) {
           //         result += `**${RuNames[raid]} прогресс:**\n`;
            //        for (let raid_info in rp[raid]) {
            //            if (RuNames[raid_info] != null)
            //                result+=RuNames[raid_info]+ rp[raid][raid_info] +"\n";
                    //}
               // }
          //  }
               

                //}]
    