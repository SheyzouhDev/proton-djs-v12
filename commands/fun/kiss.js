const Discord = require ('discord.js');

exports.run = async (client, message, args) => {

    const user = message.mentions.members.first();
    if (!user) return message.channel.send(`Please, You must mention a user`);

    let img = 'https://media.giphy.com/media/5bdhq6YF0szPaCEk9Y/giphy.gif';

    let kissSend = new Discord.MessageEmbed()
        .setColor(message.guild.me.displayHexColor)
        .setDescription(`Oh <@${message.author.id}> just kissed <@${user.user.id}> 💋`)
        .setImage(`${img}`)

    message.delete();
    message.channel.send(kissSend);

}

exports.help = {
    name: 'kiss',
    description: 'kiss another user',
    usage: 'kiss <@user>',
    example: 'kiss @Proton'
};
  
exports.conf = {
    aliases: [],
    cooldown: 5
};