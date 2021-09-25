const Discord = require ('discord.js');
const db = require ('quick.db');

exports.run = async (client, message, args) => {

    if(!message.guild.member(message.author).hasPermission('MESSAGE_MESSAGES', 'ADMINISTRATOR')) return message.channel.send(`You can't use this command`);

    let user = message.mentions.members.first();
    if (!user) return message.channel.send(`Please, You must mention a user`);

    let reason = args.join(' ').slice(22)
    if (!reason) return message.channel.send(`Please, mention a reason to warning`);

    user.send(`You have been warned in **${message.guild.name}** by **${message.author.tag}** \nReason -> ${reason}`)

    let amount = '1';
    await db.add(`warns_${message.guild.id}_${user.id}`, amount);

    let warnings = await db.fetch(`warns_${message.guild.id}_${user.id}`);
    if (warnings === null) warnings = '0';
}

exports.help = {
    name: 'warn',
    description: 'warn user',
    usage: 'warn <user> <reason>',
    example: 'warn @sнεүzααα#0962 no respect rules'
};
  
exports.conf = {
    aliases: [],
    cooldown: 5
};