const { MessageEmbed } = require("discord.js");
const emoji = require ('../../emoji.json')

exports.run = async (client, message, args) => {

    if(!message.guild.member(message.author).hasPermission('MUTE_MEMBERS', 'MANAGE_ROLES')) return message.channel.send(`You can't use this command`);

    let user = message.mentions.members.first() ||message.guild.members.cache.get(args[0]);
    if(!user) return message.channel.send(`Please, You must mention a user`)
    if(user.id == client.user.id) return message.channel.send(`I can't use this command`);

    let muteRole = client.guilds.cache.get(message.guild.id).roles.cache.find(role => role.name === 'Muted');

    user.roles.remove(muteRole)
    message.channel.send(new MessageEmbed()
        .setColor(message.guild.me.displayHexColor)
        .setDescription(`${user} has been unmuted by <@${message.author.id}>  ${emoji.check_mark}`)
    )
}

exports.help = {
    name: 'unmute',
    description: 'unmute user',
    usage: 'unmute <user> <reason>',
    example: '-unmute sнεүzααα#0001 insulte'
};

exports.conf = {
    aliases: [],
    cooldown: 5
};