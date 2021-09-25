const { MessageEmbed } = require ('discord.js');

exports.run = async (client, message, args) => {

    if(!message.guild.member(message.author).hasPermission('SEND_MESSAGES')) return message.channel.send(`You can't use this command`);

    const avatar = new MessageEmbed()
        .setAuthor(`${message.guild.name}'s Avatar`)
        .setImage(message.guild.iconURL({ dynamic: true, size: 512 }))
    message.channel.send(avatar)
}

exports.help = {
    name: 'server-avatar',
    description: 'view user avatar',
    usage: 'avatar <user>',
    example: 'avatar sнεүzααα#0001'
};

exports.conf = {
    aliases: ['sa'],
    cooldown: 5
};