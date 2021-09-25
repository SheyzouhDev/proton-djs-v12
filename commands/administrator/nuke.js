const Discord = require ('discord.js');

exports.run = async (client, message, args) => {

    if (!message.guild.member(message.author).hasPermission('MANAGE_CHANNELS')) return message.channel.send(`You can't use this command`);

    let nuke = new Discord.MessageEmbed()
      .setColor(message.guild.me.displayHexColor)
      .setDescription(`Channel clone successfully by **<@${message.author.id}>**`)
      
    message.channel.clone().then(msg => msg.send(nuke))
    message.channel.send(`Deleting channel in 10 seconds... wait`);
    setTimeout(() => {
        message.channel.delete();
    }, 10000)
}

exports.help = {
    name: 'nuke',
    description: 'delete channel and clone',
    usage: 'nuke',
    example: 'nuke'
};
  
exports.conf = {
    aliases: ['clone'],
    cooldown: 5
};