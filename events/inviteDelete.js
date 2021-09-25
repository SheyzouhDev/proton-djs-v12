const { MessageEmbed } = require ('discord.js');
const db = require ('quick.db');

module.exports = async (client, message) => {

    if (message.partial) await message.fetch();

    let logs = db.get(`logs_${message.guild.id}`)
    if (!logs) return;

    if (message.channel.id === logs.channel) return;

    let toggle = logs.toggle;
    if (!toggle || toggle == null || toggle == false) return;

    let inviteDelete = new MessageEmbed()
        .setAuthor('Invite Deleted', message.guild.iconURL({dynamic: true}))
        .setColor('#ff0000')
        .setDescription(`Invite deleted : https://discord.gg/${message.code}`)
        .setFooter(message.guild.name, message.guild.iconURL())
        .setTimestamp()
    
    return message.guild.channels.cache.get(logs.channel).send(inviteDelete);

}