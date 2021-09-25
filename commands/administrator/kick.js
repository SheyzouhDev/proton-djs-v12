const { MessageEmbed } = require ('discord.js');
const emoji = require ('../../emoji.json')

exports.run = async (client, message, args) => {

    if(!message.guild.member(message.author).hasPermission('KICK_MEMBERS')) return message.channel.send(`You can't use this command`);

    let user = message.mentions.members.first();
    if(!user) return message.channel.send(`Please, You must mention a user`)
    if(user.id == client.user.id) return message.channel.send(`I can't use this command`);

    let reason = args.join(' ').slice(22);
    if (!reason) return message.channel.send(`Please, You must mention a reason`)

    user.kick();

    message.delete();
    message.channel.send(new MessageEmbed()
        .setColor(message.guild.me.displayHexColor)
        .setDescription(`${user} has been kicked successfully ${emoji.check_mark}`)
    )
};

exports.help = {
    name: 'kick',
    description: 'kick user',
    usage: 'kick @user <reason>',
    example: 'kick @sнεүzααα#0962 no respect rules'
};
  
exports.conf = {
    aliases: [],
    cooldown: 1
};