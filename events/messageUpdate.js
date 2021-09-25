const { MessageEmbed } = require ('discord.js');
const { stripIndent } = require("common-tags");
const db = require ('quick.db');

module.exports = async (client, oldMessage, newMessage) => {

    if (newMessage.channel.type === "dm") return;

    let clogs = db.get(`logs_${oldMessage.guild.id}`)
    if (!clogs) return;

    if (oldMessage.id === clogs.oldMessage) return;

    let toggle = clogs.toggle;
    if (!toggle || toggle == null || toggle == false) return;

    const audit = (await oldMessage.guild.fetchAuditLogs()).entries.first();
    if (audit.action === 'MESSAGE_UPDATE') {
        if (audit.executor.id === '857782439647510548') return;
    }
    
    const messageUpdateInfo = stripIndent`
        Channel      ::  ${oldMessage.channel.name}
        MessageID    ::  ${oldMessage.id}
        Author       ::  ${audit.executor.id}
    `
    const messageUpdate = new MessageEmbed()
        .setAuthor('Message Update', client.user.displayAvatarURL())
        .setColor(oldMessage.guild.me.displayHexColor)
        .setDescription(stripIndent`\`\`\`prolog\n${messageUpdateInfo}\`\`\`\n**Old Message**\`\`\`${oldMessage}\`\`\`\n**New Message**\`\`\`${newMessage}\`\`\``)
        .setFooter(oldMessage.guild.name, oldMessage.guild.iconURL())
        .setTimestamp()
    return oldMessage.guild.channels.cache.get(clogs.channel).send(messageUpdate)
}