const Discord = require ('discord.js');

exports.run = async (client, message, args) => {

    if(!message.guild.member(message.author).hasPermission('MANAGE_MESSAGES')) return message.channel.send(`You can't use this command`);

    let say = args.join(' ');
    message.channel.send(say);
    message.delete();

}

exports.help = {
    name: 'say',
    description: 'bot send you message',
    usage: 'say <message>',
    example: 'say Hello world !'
};
  
exports.conf = {
    aliases: [],
    cooldown: 5
};