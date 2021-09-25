const { MessageEmbed } = require("discord.js");

exports.run = async (client, message, args) => {

    if(!message.guild.member(message.author).hasPermission('SEND_MESSAGES')) return message.channel.send(`You can't use this command`);

    let user = message.mentions.members.first() || message.member;

    const avatar = new MessageEmbed()
        .setAuthor(`${user.user.username}'s Avatar`)
        .setColor(user.displayHexColor === "#000000" ? "#ffffff" : user.displayHexColor)
        .setImage(user.user.displayAvatarURL({ dynamic: true, size: 512 }))
    message.channel.send(avatar)
}

exports.help = {
    name: 'avatar',
    description: 'view user avatar',
    usage: 'avatar <user>',
    example: 'avatar sнεүzααα#0001'
};

exports.conf = {
    aliases: ['ua'],
    cooldown: 5
};