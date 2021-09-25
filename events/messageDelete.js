const { MessageEmbed } = require ('discord.js');
const { stripIndent } = require("common-tags");
const db = require ('quick.db');

module.exports = async (client, message) => {

    if (message.channel.type === "dm") return;
    if (message.partial) await message.fetch();

    await db.set(`snipe_${message.guild.id}.content`, message.content);
    await db.set(`snipe_${message.guild.id}.user`, message.author.id);
    await db.set(`snipe_${message.guild.id}.channel`, message.channel.id);

    setTimeout(function() {
        db.delete(`snipe_${message.guild.id}`);
    }, 60000);

    let clogs = db.get(`logs_${message.guild.id}`)
    if (!clogs) return;

    if (message.id === clogs.message) return;

    let toggle = clogs.toggle;
    if (!toggle || toggle == null || toggle == false) return;

    const audit = (await message.guild.fetchAuditLogs()).entries.first();
    if (audit.action === 'MESSAGE_DELETE') {
        if (audit.executor.id === '857782439647510548') return;
    }

    const messageDeleteInfo = stripIndent`
        Channel      ::  ${message.channel.name}
        Id           ::  ${message.channel.id}
        MessageID    ::  ${message.id}
        Author       ::  ${audit.executor.id}
    `

    const messageDelete = new MessageEmbed()
        .setAuthor(`Message Delete`)
        .setColor(message.guild.me.displayHexColor)
        .setDescription(stripIndent`\`\`\`prolog\n${messageDeleteInfo}\`\`\` \n**Message** :\n\`\`\`${message}\`\`\``)
        .setFooter(message.guild.name, message.guild.iconURL())
        .setTimestamp()
    return message.guild.channels.cache.get(clogs.channel).send(messageDelete)
}