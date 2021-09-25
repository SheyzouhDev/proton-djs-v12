const Discord = require ('discord.js');
const imposterDetector = [true, false];

exports.run = async (client, message, args) => {

    if (args[0]) {
        const username = args[0]
        var blames = await usernameResolver(message, username)
    }
    const impostor = Math.floor(Math.random() * imposterDetector.length)
    const embed = new Discord.MessageEmbed()
        .setTitle('Proton - Among us')
        .setColor('#8800FF')
        .setDescription(`
                .      　。　　　　•　    　ﾟ　　。
        　　.　　　.　　　  　　.　　　　　。　　   。　.
         　     .　　      。　        ඞ   。　    .     •
         .      ${blames ? blames : message.author} est ${impostor ? "" : "pas"} l'imposteur　 。　.
        　 　　。　　　　　　ﾟ　　　.　　　　　.
        ,　　　　.　 .　　       .
        `)
    message.channel.send(embed)
}

exports.help = {
    name: 'impostor',
    description: 'view if you impostor',
    usage: 'love <@user>',
    example: 'love @Proton'
};
  
exports.conf = {
    aliases: [],
    cooldown: 5
};