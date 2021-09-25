const Discord = require ('discord.js');

exports.run = async (client, message, args) => {

    const user = message.mentions.members.first();
    if (!user) return message.channel.send(`Please, You must mention a user`);

    let img = 'https://media.giphy.com/media/ZBQhoZC0nqknSviPqT/giphy.gif';

    let hugSend = new Discord.MessageEmbed()
        .setColor(message.guild.me.displayHexColor)
        .setDescription(`Oh ! <@${message.author.id}> just hugged <@${user.user.id}> ❤️`)
        .setImage(`${img}`)

    message.delete();
    message.channel.send(hugSend);
}

exports.help = {
    name: 'hug',
    description: 'hug another user',
    usage: 'hug <@user>',
    example: 'hug @Proton'
};
  
exports.conf = {
    aliases: [],
    cooldown: 5
};