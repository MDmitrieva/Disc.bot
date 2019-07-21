//const Discord = require("discord.js");
//const client = new Discord.Client({disableEveryone: true});
 module.exports.run = async (bot, message, args) => {
   return message.channel.send({embed:{

          color: 3447003,
        //  author: {
       //     name: client.user.username,
       //     icon_url: client.user.avatarURL
       //   },
          title: `Привет! Я - Николаев и вот что я могу:`,
          description: `Русские серваки можно писать на русском, но названия из двух слов нужно писать слитно, например корольлич.\n Можно писать аббревиатуры: ВП, сд, ЧШ"\n если вы ищете инфо о персонаже с РФ, то сервер можно не вводить`,
          fields: [
            {name: `**!имя+ник+сервер **`,
            value: `Отображение инфо о персонаже. **Например:** !имя Фросильда СД`},
          {name: `**!ключ+ник+сервер **`,
           value: `Отображение инфо о РИО персонажа, его топовом м+ за сезон и закрывал ли он ключ на этом КД\n  **Например:** !ключ Новари черныйшрам`},
          {name: `**!жетон**`,
           value: `Цена на жетон в европейском регионе`},
          {name: `**!аффиксы**`,
           value: `Возвращает текущие аффиксы`}],
          timestamp: new Date(),
          footer: {
        //  icon_url: client.user.avatarURL,
          text: "© Marjam/Sighgor"
    }
  }})

}

module.exports.help = {
    name: "help!"
}


