const { MessageEmbed } = require('discord.js');
const db = require ('quick.db');
const emoji = require ('../../emoji.json')

exports.run = async (client, message, args) => {

    if(!message.guild.member(message.author).hasPermission('MANAGE_CHANNELS')) return message.channel.send(`You can't use this command`);

    let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
    if (!channel) return message.channel.send(new MessageEmbed()
        .setColor(message.guild.me.displayHexColor)
        .setDescription(`Please, provide the channel ${emoji.wrong}`)
    );
    
    await db.set(`joinCreate_${message.guild.id}.channel`, channel.id);
    return message.channel.send(new MessageEmbed()
        .setColor(message.guild.me.displayHexColor)
        .setDescription(`Voice channel defined <#${channel.id}> ${emoji.check_mark}`)
    )
}

exports.help = {
    name: 'set-voicecreate',
    description: 'server log information',
    usage: 'set-logs <categoryID>',
    example: 'set-logs <#844341117080436807>'
};

exports.conf = {
    aliases: ['svoicecreate'],
    cooldown: 5
};