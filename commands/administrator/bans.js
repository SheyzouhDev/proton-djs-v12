const { MessageEmbed } = require("discord.js");

exports.run = async (client, message, args) => {

    if (!message.guild.member(message.author).hasPermission('ADMINISTRATOR')) return message.channel.send(`You can't use this command`);

    message.guild.fetchBans().then(bans => {
        message.channel.send(new MessageEmbed()
            .setColor(message.guild.me.displayHexColor)
            .setDescription(`there is a total of ${bans.size} ban`)
        )
    })
}

exports.help = {
    name: 'bans',
    description: 'see ban number',
    usage: 'bans',
    example: 'bans'
};

exports.conf = {
    aliases: [],
    cooldown: 5
};