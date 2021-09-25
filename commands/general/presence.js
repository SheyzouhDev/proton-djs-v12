const { MessageEmbed } = require("discord.js");
const { stripIndent } = require("common-tags");
const presence = require ('../../presence.json');

exports.run = async (client, message, args) => {

    if(!message.guild.member(message.author).hasPermission('SEND_MESSAGES')) return message.channel.send(`You can't use this command`);

    const members = message.guild.members.cache.array();
    const online = members.filter((m) => m.presence.status === 'online').length;
    const offline =  members.filter((m) => m.presence.status === 'offline').length;
    const dnd =  members.filter((m) => m.presence.status === 'dnd').length;
    const afk =  members.filter((m) => m.presence.status === 'idle').length;

    const status = new MessageEmbed()
        .setAuthor(` ${message.guild.name} | ${message.guild.members.cache.size} presence status`, message.guild.iconURL())
        .setColor(message.guild.me.displayHexColor)
        .setDescription(stripIndent`
        ${presence.online} **Online** : \`${online}\` members
        ${presence.dnd} **Dnd** : \`${dnd}\` members
        ${presence.idle} **Idle**  :\`${afk}\` members
        ${presence.offline} **Offline**  :\`${offline}\` members
        `)
        .setFooter(`Requested by ${message.author.username}`, message.author.avatarURL({ dynamic: true }))
        .setTimestamp()
    message.channel.send(status)

}

exports.help = {
    name: 'presence',
    description: 'members status',
    usage: 'members',
    example: 'members'
};

exports.conf = {
    aliases: ['gp'],
    cooldown: 5
};