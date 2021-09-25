const MessageEmbed = require ('discord.js')
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
        let channel = message.mentions.channels.first();
        if (!channel) return message.channel.send(new MessageEmbed()
            .setColor(message.guild.me.displayHexColor)
            .setDescription(`Please, provide the category that you want to set the support ticket ${emoji.wrong}`)
        );

        await db.set(`ticket_${message.guild.id}.toggle`, true);
        await db.set(`ticket_${message.guild.id}.channel`, channel.id);
        return message.channel.send(new MessageEmbed()
            .setColor(message.guild.me.displayHexColor)
            .setDescription(`The support ticket has been enable successfully <#${channel.id}> ${emoji.check_mark}`)
        );
    }

    if (args[0] === 'disable') {
        let toggle = db.get(`ticket_${message.guild.id}.toggle`);
        if (!toggle || toggle == false) return message.channel.send(new MessageEmbed()
            .setColor(message.guild.me.displayHexColor)
            .setDescription(`I guess, the support ticket has been already disabled before`)
        );

        await db.set(`ticket_${message.guild.id}.toggle`, false);
        await db.delete(`ticket_${message.guild.id}.channel`);
        return message.channel.send(new MessageEmbed()
            .setColor(message.guild.me.displayHexColor)
            .setDescription(`The support ticket has been disabled successfully ${emoji.check_mark}`)
        );
    }
}

exports.help = {
    name: 'set-ticket',
    description: 'bot responses to command inside the channel',
    usage: 'setup-ticket <channel parent>',
    example: 'setup-ticket <#parent.id>'
};
  
exports.conf = {
    aliases: ['sticket'],
    cooldown: 5
};