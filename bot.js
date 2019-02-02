const Discord = require('discord.js');
const config = require('./config.json')
const bot = new Discord.Client({disableEveryone: true});
const fs = require("fs");
const RuNames = require('./commands/RuNames.json')
bot.commands = new Discord.Collection();


fs.readdir("./commands/", (err, files) => {
    if (err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0){
        console.log("No commands can be found, bro")
        return;
    }

    jsfile.forEach((f, i) => {
        let props = require(`./commands/${f}`)
        console.log(`${f} loaded!`)
        bot.commands.set(props.help.name, props);
    })
})


bot.on("ready", async () => {
    console.log(`${bot.user.username} is online`)
    bot.user.setActivity("Порно", {type: "WATCHING"});
});

bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    let prefix = config.prefix
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0]; //первый элемент в массиве всегда будет название команды
    let args = messageArray.slice(1); // после него идут параметры команды, мы достаем их тут [param1, param2, ....] и передаем в команду 
    let commandfile = bot.commands.get(cmd.slice(prefix.length));
   commandfile.run(bot, message, args)
   .then (display => message.channel.send(display.message, {files:display.files}))
   

})

bot.login(config.token);
bot.on('error', console.error);





