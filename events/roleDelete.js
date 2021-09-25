const { MessageEmbed } = require ('discord.js');
const { stripIndent } = require("common-tags");
const db = require ('quick.db');

module.exports = async (client, role) => {

    let clogs = db.get(`logs_${role.guild.id}`)
    if (!clogs) return;

    if (role.id === clogs.role) return;

    let toggle = clogs.toggle;
    if (!toggle || toggle == null || toggle == false) return;

    const audit = (await role.guild.fetchAuditLogs()).entries.first();
    if (audit.action === 'ROLE_DELETE') {
        if (audit.executor.id === '857782439647510548') return;
    }

    const roleDeleteinfo = stripIndent`
        Name      ::  ${role.name}
        Id        ::  ${role.id}
        Author    ::  ${audit.executor.id}
    `
    const roleCreate = new MessageEmbed()
        .setAuthor('role Delete', role.guild.iconURL())
        .setColor(role.guild.me.displayHexColor)
        .setDescription(stripIndent`\`\`\`prolog\n${roleDeleteinfo}\`\`\``)
        .setFooter(role.guild.name, client.user.displayAvatarURL())
        .setTimestamp()
    return role.guild.channels.cache.get(clogs.channel).send(roleCreate)   
}