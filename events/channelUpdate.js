const { MessageEmbed } = require("discord.js");
const { stripIndent } = require("common-tags");
const db = require ('quick.db');

module.exports = async (client, oldChannel, newChannel) => {

    let clogs = db.get(`logs_${oldChannel.guild.id}`)
    if (!clogs) return;

    if (oldChannel.id === clogs.oldChannel) return;

    let toggle = clogs.toggle;
    if (!toggle || toggle == null || toggle == false) return;

    const audit = (await oldChannel.guild.fetchAuditLogs()).entries.first();
    if (audit.action === 'CHANNEL_UPDATE') {
        if (audit.executor.id === '857782439647510548') return;
    }

    if (oldChannel.name !== newChannel.name) {

    const channelUpdateInfo = stripIndent`
        Old Name    ::  ${oldChannel.name}
        New Name    ::  ${newChannel.name}
        Type        ::  ${oldChannel.type}
        Id          ::  ${oldChannel.id}
        Author      ::  ${audit.executor.id}
    `
    const channelUpdate = new MessageEmbed()
        .setAuthor('Channel Update', client.user.displayAvatarURL())
        .setColor(oldChannel.guild.me.displayHexColor)
        .setDescription(stripIndent`\`\`\`prolog\n${channelUpdateInfo}\`\`\``)
        .setFooter(oldChannel.guild.name, oldChannel.guild.iconURL())
        .setTimestamp()
    return oldChannel.guild.channels.cache.get(clogs.channel).send(channelUpdate)

    }

    if (oldChannel.topic !== newChannel.topic) {

        const audit = (await oldChannel.guild.fetchAuditLogs()).entries.first();
        if (audit.action === 'CHANNEL_UPDATE') {
            if (audit.executor.id === '592655766750756865', '789922408353103943', '838116529752768573') return;
        }

        const channelTopicInfo = stripIndent`
            Old Topic    ::  ${oldChannel.topic}
            New Topic    ::  ${newChannel.topic}
            Type         ::  ${oldChannel.type}
            Id           ::  ${oldChannel.id}
            Author       ::  ${audit.executor.id}
        `

        const channelTopic = new Discord.MessageEmbed()
            .setAuthor(`Channel Update Topic`)
            .setColor(oldChannel.guild.me.displayHexColor)
            .setDescription(stripIndent`\`\`\`prolog\n${channelTopicInfo}\`\`\``)
            .setFooter(oldChannel.guild.name, oldChannel.guild.iconURL())
            .setTimestamp()
        return oldChannel.guild.channels.cache.get(clogs.channel).send(channelTopic)
    }
}