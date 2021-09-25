const { MessageEmbed } = require("discord.js");
const { stripIndent } = require('common-tags');
const db = require ('quick.db')

exports.run = async (client, message, args) => {

    if(!message.guild.member(message.author).hasPermission('SEND_MESSAGES')) return message.channel.send(`You can't use this command`);

    let user = message.mentions.members.first();
    if (!user) return message.channel.send(`Please, You must mention a user`)

    if (user.hasPermission('ADMINISTRATOR', 'MANAGE_GUILD') || user.user.bot)
    return message.channel.send(`Can't report that user`)

    let reason = args.join(' ').slice(22);
    if (!reason) return message.channel.send(`Please, You must provide a reason`)

    const channel = db.get(`report_${message.guild.id}.channel`)
    if (!channel) return message.channel.send(`Please, setup de report channel \`-set-report enable <channelID>\``)

    const report = new MessageEmbed()
        .setAuthor(message.guild.name, message.guild.iconURL())
        .setColor(message.guild.me.displayHexColor)
        .setDescription(stripIndent `**Member** : ${user} (${user.user.id})
        **- Reported by** : <@${message.author.id}>
        **- Reported in** : <#${message.channel.id}>
        **- reason** : ${reason}`)
        .setFooter(client.user.username, client.user.displayAvatarURL())
        .setTimestamp()

    message.guild.channels.cache.get(channel).send(report)

    setTimeout(() => {
        message.delete()
    }, 5000)
}

exports.help = {
    name: 'report',
    description: 'report a user',
    usage: 'report <user> <reason>',
    example: 'report sнεүzααα#0001 no respect rules'
};

exports.conf = {
    aliases: ['ruser'],
    cooldown: 5
};