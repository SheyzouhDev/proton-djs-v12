const Discord = require ('discord.js');
const db = require ('quick.db');

exports.run = async (client, message, args) => {

    if(!message.guild.member(message.author).hasPermission('MESSAGE_MESSAGES')) return message.channel.send(`You can't use this command`);

    let user = message.mentions.members.first();

    let warnings = await db.fetch(`warns_${message.guild.id}_${user.id}`);
    if (warnings === null) warnings = '0';

    message.channel.send(`${user} currently has **${warnings}** warning(s)`);
}

exports.help = {
    name: 'warnings',
    description: 'view user warnings',
    usage: 'warnings <user>',
    example: 'warnings sнεүzααα#0962'
};
  
exports.conf = {
    aliases: [],
    cooldown: 5
};