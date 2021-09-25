const Discord = require ('discord.js');

exports.run = async (client, message, args) => {

    const user = message.mentions.members.first();
    if (!user) return message.channel.send(`Please, You must mention a user`);

    let img = 'https://zupimages.net/up/19/10/y5t7.jpg';

    let hugSend = new Discord.MessageEmbed()
    .setColor(message.guild.me.displayHexColor)
        .setDescription(`<@${message.author.id}> just declared his love for <@${user.user.id}> ❤️`)
        .setImage(`${img}`)

    message.delete();
    message.channel.send(hugSend);
}

exports.help = {
    name: 'love',
    description: 'declared his love for a user',
    usage: 'love <@user>',
    example: 'love @Proton'
};
  
exports.conf = {
    aliases: [],
    cooldown: 5
};