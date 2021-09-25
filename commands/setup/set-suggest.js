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
            .setDescription(`Please, provide the channel that you want to set the suggest ${emoji.wrong}`)
        );

        await db.set(`suggest_${message.guild.id}.toggle`, true);
        await db.set(`suggest_${message.guild.id}.channel`, channel.id);
        return message.channel.send(new MessageEmbed()
            .setColor(message.guild.me.displayHexColor)
            .setDescription(`The suggest channel has been set successfully <#${channel.id}> ${emoji.check_mark}`)
        )
    }

    if (args[0] === 'disable') {
        let toggle = db.get(`suggest_${message.guild.id}.toggle`);
        if (!toggle || toggle == false) return message.channel.send(new MessageEmbed()
            .setColor(message.guild.me.displayHexColor)
            .setDescription(`I guess, the report channel has been already disabled before`)
        );

        await db.set(`suggest_${message.guild.id}.toggle`, false);
        await db.delete(`suggest_${message.guild.id}.channel`);
        return message.channel.send(new MessageEmbed()
            .setColor(message.guild.me.displayHexColor)
            .setDescription(`The suggest channel has been disabled successfully ${emoji.check_mark}`)
        )
    }
}

exports.help = {
    name: 'set-suggest',
    description: 'declare suggestion',
    usage: 'suggest suggestion',
    example: 'suggest suggestion'
};
  
exports.conf = {
    aliases: ['ssuggest'],
    cooldown: 5
};