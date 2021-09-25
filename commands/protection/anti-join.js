const { MessageEmbed } = require('discord.js');
const db = require ('quick.db');
const emoji = require ('../../emoji.json')

exports.run = async (client, message, args) => {

    if(!message.guild.member(message.author).hasPermission('MANAGE_GUILD')) return message.channel.send(`You can't use this command`);

    let toggling = ['on', 'off'];
    if (!toggling.includes(args[0])) return message.channel.send(`Please, provide a valid option ! Either **on** or **off** it`);

    const enable = new MessageEmbed()
        .setColor(message.guild.me.displayHexColor)
        .setDescription(`${emoji.lock} the server was closed for security by ${message.author.tag}`)
        .setFooter(`${message.guild.name}`, message.guild.iconURL())
        .setTimestamp()

    if (args[0] === 'on') {
        await db.set(`antijoin_${message.guild.id}.toggle`, true);
        return message.channel.send(enable)
    }

    const disable = new MessageEmbed()
        .setColor(message.guild.me.displayHexColor)
        .setDescription(`${emoji.unlock} the server was opened by ${message.author.tag}`)
        .setFooter(`${message.guild.name}`, message.guild.iconURL())
        .setTimestamp()

    if (args[0] === 'off') {
        let toggle = db.get(`antijoin_${message.guild.id}.toggle`);
        if (!toggle || toggle == false) return message.channel.send(`I guess, the anti-join been disabled before`);

        await db.set(`antijoin_${message.guild.id}.toggle`, false);
        return message.channel.send(disable);
    }
}

exports.help = {
    name: 'anti-join',
    description: 'lock server',
    usage: 'lock',
    example: '&lock'
};
  
exports.conf = {
    aliases: ['lockserver'],
    cooldown: 5
};