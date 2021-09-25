const { MessageEmbed } = require ('discord.js');
const { stripIndent } = require("common-tags");
const db = require ('quick.db');

module.exports = async (client, oldRole, newRole) => {

    let clogs = db.get(`logs_${oldRole.guild.id}`)
    if (!clogs) return;

    if (oldRole.id === clogs.oldRole) return;

    let toggle = clogs.toggle;
    if (!toggle || toggle == null || toggle == false) return;

    const audit = (await oldRole.guild.fetchAuditLogs()).entries.first();
    if (audit.action === 'ROLE_UPDATE') {
        if (audit.executor.id === '857782439647510548') return;
    }

    if (oldRole.name !== newRole.name) {

    const roleUpdateInfo = stripIndent`
        Old Name    ::  ${oldRole.name}
        New Name    ::  ${newRole.name}
        ID          ::  ${oldRole.id}
        Author      ::  ${audit.executor.id}
    `
    const roleUpdate = new MessageEmbed()
        .setAuthor('Role Update', oldRole.guild.iconURL())
        .setColor(oldRole.guild.me.displayHexColor)
        .setDescription(stripIndent`\`\`\`prolog\n${roleUpdateInfo}\`\`\``)
        .setFooter(oldRole.guild.name, client.user.displayAvatarURL())
        .setTimestamp()
    return oldRole.guild.channels.cache.get(clogs.channel).send(roleUpdate)

    }

    if (oldRole.hexColor !== newRole.hexColor) {

        if (oldRole.hexColor === "#000000") {
            var oldColor = "default";
          } else {
            var oldColor = oldRole.hexColor;
          }
          if (newRole.hexColor === "#000000") {
            var newColor = "default";
          } else {
            var newColor = newRole.hexColor;
          }

        const audit = (await oldRole.guild.fetchAuditLogs()).entries.first();
        if (audit.action === 'ROLE_UPDATE') {
            if (audit.executor.id === '592655766750756865', '789922408353103943', '838116529752768573') return;
        }

        const RoleUpdateColorInfo = stripIndent`
            Role Name   ::  ${oldRole.name}
            Old Color   ::  ${oldColor}
            New Color   ::  ${newColor}
            Role ID     ::  ${oldRole.id}
            Author      ::  ${userID}
        `
        
        const RoleUpdateColor = new Discord.MessageEmbed()
            .setAuthor(`Role Update Color`)
            .setColor(oldRole.guild.me.displayHexColor)
            .setDescription(stripIndent`\`\`\`prolog\n${RoleUpdateColorInfo}\`\`\``)
            .setFooter(oldRole.guild.name, oldRole.guild.iconURL())
            .setTimestamp()
        return oldRole.guild.channels.cache.get(clogs.channel).send(RoleUpdateColor)
    }
}