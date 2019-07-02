const discord = require("discord.js");
const request = require('request-promise')
const RuNames = require('./RuNames.json')
const underscore = require("underscore");
const _ = require("underscore");
   
module.exports.run = (bot, message, parameters,) => {
    let character = parameters[0]; //тут мы ожидаем что юзер рилм вписал итд
    let realm = parameters[1];
        if(RuNames[realm] !== undefined) realm = RuNames[realm]
        if(realm == null) {realm = "howlingfjord"}
    let url = `https://raider.io/api/v1/characters/profile?region=eu&realm=${realm}&name=${encodeURI(character)}&fields=mythic_plus_scores%2Cmythic_plus_highest_level_runs%2Cmythic_plus_weekly_highest_level_runs`;
    console.log(url)
   return request.get(`https://raider.io/api/v1/characters/profile?region=eu&realm=${realm}&name=${encodeURI(character)}&fields=mythic_plus_scores%2Cmythic_plus_highest_level_runs%2Cmythic_plus_weekly_highest_level_runs`)
    .then (response => {
         console.log(response) 
        let res = JSON.parse(response)
        console.log(res)
        var key = res
            var name = key.name
            var mps = key.mythic_plus_scores.all
            var week = key.mythic_plus_weekly_highest_level_runs
            var best = key.mythic_plus_highest_level_runs
            let sortedRuns = _.sortBy(week, 'score');
            var weekBest = _.last(sortedRuns)
            console.log(sortedRuns)
            let bestSortedRuns = _.sortBy(best, 'score');
            var seasonBest = _.last(bestSortedRuns)
            var profile = key.profile_url
            var photo = key.thumbnail_url;
            var weekUp = weekBest? (weekBest.num_keystone_upgrades == 0) ? `Кто-то слоупок и не успел вовремя \n` : `Ключ улучшен на + ${weekBest.num_keystone_upgrades}\n` : null
            var topWeek =  weekBest ? `${RuNames[weekBest.dungeon]} +${weekBest.mythic_level}\n ${weekUp}\n` :`Ключ на этом КД не пройден!\n`   
            var topSeason = seasonBest ? `${RuNames[seasonBest.dungeon]} +${seasonBest.mythic_level}\n Ключ улучшен на +${seasonBest.num_keystone_upgrades}\n` :`Ни одного ключа в сезоне. Ленивая жопа!\n`  
                     
       let embed =  {
           title: `**${name}**`,
           color: 3447003,
           thumbnail: {
               url: photo},
           fields: [
               {name: `**RIO: ${mps}**`, 
               value: profile},
               {name: `**Лучший ключ на неделе:**`,
               value: topWeek,
               inline: true},
               {name: `**Лучший ключ в сезоне:**`, 
               value: topSeason,
               inline: true}]
};     
        message.channel.send({embed});
    })
}
module.exports.help = {
    name: "ключ"
}