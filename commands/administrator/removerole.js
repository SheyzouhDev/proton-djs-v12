const { MessageEmbed } = require("discord.js");

exports.run = async (client, message, args) => {

    if(!message.guild.member(message.author).hasPermission('MANAGE_ROLES', 'ADMINISTRATOR')) return message.channel.send(`You can't use this command`);

    let user = message.mentions.members.first();
    if (!user) return message.channel.send(`Please, You must mention a user`)

    let role = message.guild.roles.cache.find(role => role.name == args[0]) || message.guild.roles.cache.find(role => role.id == args[1]) || message.mentions.roles.first()
    if (!role) return message.channel.send(`Please, You must mention a role`)

    if (!user.roles.cache.get(role.id)) {
        return message.channel.send(`${user} does not have this role`)
    } else {
        await user.roles.remove(role.id)
        message.channel.send(new MessageEmbed()
            .setColor(message.guild.me.displayHexColor)
            .setDescription(`${role} was successfully removed from **${user}**`)
        )
    }
}

exports.help = {
    name: 'removerole',
    description: 'help',
    usage: 'help',
    example: 'help'
};
  
exports.conf = {
    aliases: [],
    cooldown: 5
};