const { MessageEmbed } = require("discord.js");

exports.run = async (client, message, args) => {

    if(!message.guild.member(message.author).hasPermission('MANAGE_NICKNAMES')) return message.channel.send(`You can't use this command`);

    let user = message.mentions.users.first() || message.member;
    if (!user) return message.channel.send(`Please, You must mention a user`);

    let nick = args.slice(1).join(' ');
    if (!nick) return message.channel.send(`Please, you need to input de nickname`);

    let member = message.guild.members.cache.get(user.id);

    await member.setNickname(nick);
    message.channel.send(new MessageEmbed()
        .setColor(message.guild.me.displayHexColor)
        .setDescription(`Successfully changed **${user.tag}** nickname to **${nick}**`)
    )
}

exports.help = {
    name: 'nickname',
    description: 'set a user nickname',
    usage: 'nickname <@user> <nickname>',
    example: 'nickname @sнεүzααα#0962 SheyShey'
};
  
exports.conf = {
    aliases: ['nick'],
    cooldown: 5
};