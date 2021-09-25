const { MessageEmbed } = require ('discord.js');
const { stripIndent } = require('common-tags');
const db = require ('quick.db');

module.exports = async (client, message) => {

    if (message.partial) await message.fetch();

    let logs = db.get(`logs_${message.guild.id}`);
    if (!logs) return;

    if (message.channel.id === logs.channel) return;

    let toggle = logs.toggle;
    if (!toggle || toggle == null || toggle == false) return;

    const inviter = client.users.cache.get(message.inviter.id);

    const inviteCreateInfo = stripIndent`
        Channel     ::  ${message.channel.name}
        MaxAge      ::  ${message.maxAge}
        MaxUses     ::  ${message.maxUses}
        Author      ::  ${inviter.id}
    `

    let inviteCreate = new MessageEmbed()
        .setAuthor('Invite Created', message.guild.iconURL({ dynamic: true}))
        .setColor('#1bec28')
        .setDescription(stripIndent`\`\`\`prolog\n${inviteCreateInfo}\`\`\`\n**Invite link :**\`\`\`https://discord.gg/${message.code}\`\`\``)
        .setFooter(`created by ${inviter.tag}`)
        .setFooter(message.guild.name, message.guild.iconURL())
        .setTimestamp()
    return message.guild.channels.cache.get(logs.channel).send(inviteCreate)
}