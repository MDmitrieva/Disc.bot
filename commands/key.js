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
            let bestSortedRuns = _.sortBy(best, 'score');
            var seasonBest = _.last(bestSortedRuns)

       let result = " "
       result+=`**${name}**\n`
       result+=`**RIO:** ${mps}\n`
    
        if(week.length == 0) {result+=`**Ключ на этом КД не пройден!**\n`}
        else 
        { 
                result+=`**Лучший ключ на неделе:** ${RuNames[weekBest.dungeon]} +${weekBest.mythic_level}\n`
                    if(weekBest.num_keystone_upgrades == 0) {result+=`Кто-то слоупок и не успел вовремя \n`}
                    else 
                    {
                        result+=`Ключ улучшен на + ${weekBest.num_keystone_upgrades}\n` 
                    }
            
        }
        if(best.length == 0) {result+=`**Да он(а) в этом сезоне никуда и не ходил(а)!**\n`}
        else{
            result+=`**Лучший ключ в сезоне** ${RuNames[seasonBest.dungeon]} +${seasonBest.mythic_level}\n`
            result+=`Ключ улучшен на + ${seasonBest.num_keystone_upgrades}\n` 
        }
        return { message:result, files: []}
    })
}
module.exports.help = {
    name: "ключ"
}