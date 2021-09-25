const { MessageEmbed } = require("discord.js");
const { stripIndent } = require("common-tags");
const db = require ('quick.db');

module.exports = async (client, channel) => {

    let clogs = db.get(`logs_${channel.guild.id}`)
    if (!clogs) return;

    if (channel.id === clogs.channel) return;

    let toggle = clogs.toggle;
    if (!toggle || toggle == null || toggle == false) return;

    const audit = (await channel.guild.fetchAuditLogs()).entries.first();
    if (audit.action === 'CHANNEL_DELETE') {
        if (audit.executor.id === '857782439647510548') return;
    }

    const channelDeleteInfo = stripIndent`
        Name      ::  ${channel.name}
        Type      ::  ${channel.type}
        Id        ::  ${channel.id}
        Author    ::  ${audit.executor.id}
    `
    const ChannelDelete = new MessageEmbed()
        .setAuthor('Channel Delete', client.user.displayAvatarURL())
        .setColor(channel.guild.me.displayHexColor)
        .setDescription(stripIndent`\`\`\`prolog\n${channelDeleteInfo}\`\`\``)
        .setFooter(channel.guild.name, channel.guild.iconURL())
        .setTimestamp()
    return channel.guild.channels.cache.get(clogs.channel).send(ChannelDelete)
    
}