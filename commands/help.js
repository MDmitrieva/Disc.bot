const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
   return message.channel.send(`Привет! Вот что я могу:
   **!имя+ник+сервер (англ.)** - Возвращает инфо о персонаже - если вы ищете инфо о персонаже с РФ, то сервер можно не вводить,
   **!ключ+ник+сервер (англ.)** - Возвращает инфо о РИО персонажа, его топовом м+ за сезон и закрывал ли он ключ на этом КД,
   **!жетон** *(в разработке)* - Возввращает цену на жетон в европейском регионе,
   **!аффиксы** - Возвращает текущие аффиксы`)
}

module.exports.help = {
    name: "help!"
}

    

