const { MessageEmbed } = require("discord.js");

exports.run = async (client, message, args) => {

    if(!message.guild.member(message.author).hasPermission('MANAGE_ROLES', 'ADMINISTRATOR')) return message.channel.send(`You can't use this command`)

    let user = message.mentions.members.first();
    if (!user) return message.channel.send(`Please, You must mention a user`)

    let role = message.guild.roles.cache.find(role => role.name == args[0]) || message.guild.roles.cache.find(role => role.id == args[1]) || message.mentions.roles.first()
    if (!role) return message.channel.send(`Please, You must mention a role`)

    if (user.roles.cache.get(role.id)) {
        return message.channel.send(`this ${user} already has this role`)
    } else {
        await user.roles.add(role.id)
        message.channel.send(new MessageEmbed()
            .setColor(message.guild.me.displayHexColor)
            .setDescription(`${role} was successfully assigned to **${user}**`)
        )
    }
}

exports.help = {
    name: 'addrole',
    description: 'add role to user',
    usage: 'addrole <user> <role>',
    example: 'addrole sнεүzααα#0001 member'
};
  
exports.conf = {
    aliases: ['addr'],
    cooldown: 5
};