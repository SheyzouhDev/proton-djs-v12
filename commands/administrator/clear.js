const { MessageEmbed } = require('discord.js');
const emoji = require ('../../emoji.json')

exports.run = async (client, message, args) => {

    //if(!message.guild.member(message.author).hasPermission('MANAGE_MESSAGES', 'ADMINISTRATOR')) return message.channel.send(`You can't use this command`);

    if(!args[0]) return message.channel.send(`Please, provide a number of messages to delete`)

    message.channel.bulkDelete(args[0]);

    const clear = new MessageEmbed()
        .setColor(message.guild.me.displayHexColor)
        .setDescription(`**${args[0]}** messages has been deleted ${emoji.check_mark}`)
    message.channel.send(clear);
    
}

exports.help = {
    name: 'clear',
    description: 'clear message',
    usage: 'clear <number message>',
    example: 'clear 1 to 100 message'
};
  
exports.conf = {
    aliases: [],
    cooldown: 5
};