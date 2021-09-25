const Discord = require ('discord.js');

exports.run = async (client, message, args) => {

    if (!client.settings.owners.includes(message.author.id)) return message.channel.send(`You can't use this command`);

    const rgx = /^(?:<@!?)?(\d+)>?$/;
    const guildId = args[0];

    if (!rgx.test(guildId))
        return message.channel.send(`Please, provide a valid server ID`);

    const guild = message.client.guilds.cache.get(guildId);
    if (!guild) return message.channel.send(`Unable to find server, please check the provided ID`);

    guild.leave();

    const leave = new Discord.MessageEmbed()
        .setAuthor(`Leave Guild (${guild.id})`, client.user.avatarURL())
        .setColor(message.guild.me.displayHexColor)
        .setDescription(`**${client.user.username}** have successfully left **${guild.name}**`)
        .setFooter(`Requested by ${message.author.username}`, message.author.avatarURL({ dynamic: true }))
        .setTimestamp();
    message.channel.send(leave);

    message.delete();

};

exports.help = {
    name: 'sleave',
    description: 'force leave guild',
    usage: 'leave guildID',
    example: '-leave 825702578968592384'
};
  
exports.conf = {
    aliases: [],
    cooldown: 60
};