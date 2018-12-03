const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
   return message.channel.send("Pong!")
}

module.exports.help = {
    name: "ping"
}