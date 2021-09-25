const { MessageEmbed } = require('discord.js');
const db = require ('quick.db');
const emoji = require ('../../emoji.json');

exports.run = async (client, message, args) => {

    if(!message.guild.member(message.author).hasPermission('MANAGE_GUILD')) return message.channel.send(`You can't use this command`);

    let toggling = ['enable', 'disable'];
    if (!toggling.includes(args[0])) return message.channel.send(new MessageEmbed()
        .setColor(message.guild.me.displayHexColor)
        .setDescription(`Please, provide a valid option ! Either **Enable** or **Disable** it ${emoji.wrong}`)
    );

    if (args[0] === 'enable') {
        let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1]);
        if (!channel) return message.channel.send(new MessageEmbed()
            .setColor(message.guild.me.displayHexColor)
            .setDescription(`Please, provide the channel that you want to make it as an logs ${emoji.wrong}`)
        );

        await db.set(`logs_${message.guild.id}.toggle`, true);
        await db.set(`logs_${message.guild.id}.channel`, channel.id);
        return message.channel.send(new MessageEmbed()
            .setColor(message.guild.me.displayHexColor)    
            .setDescription(`logs has been enabled successfully <#${channel.id}> ${emoji.check_mark}`)
        )
    }

    if (args[0] === 'disable') {
        let toggle = db.get(`logs_${message.guild.id}.toggle`);
        if (!toggle || toggle == false) return message.channel.send(new MessageEmbed()
            .setColor(message.guild.me.displayHexColor)
            .setDescription(`I guess, the logs has already been disabled before`)
        );

        await db.set(`logs_${message.guild.id}.toggle`, false);
        await db.delete(`logs_${message.guild.id}.channel`);
        return message.channel.send(new MessageEmbed()
            .setColor(message.guild.me.displayHexColor)
            .setDescription(`logs has been disabled successfully ${emoji.check_mark}`)
        )
    }
}

exports.help = {
    name: 'set-logs',
    description: 'server log information',
    usage: 'set-logs <categoryID>',
    example: 'set-logs <#844341117080436807>'
};
  
exports.conf = {
    aliases: ['slogs'],
    cooldown: 5
};