const { MessageEmbed } = require('discord.js');
const emoji = require ('../../emoji.json')

exports.run = async (client, message, args) => {

    if(!message.guild.member(message.author).hasPermission('BAN_MEMBERS')) return message.channel.send(`You can't use this command`);

    if(client.id == client.user.id) return message.channel.send(`I can't use this command`);
    if(!message.guild.me.hasPermission('ADMINISTRATOR')) return message.channel.send(`I don't have permission`)

    let userID = args[0]
        message.guild.fetchBans().then(bans=> {
        if(bans.size == 0) return message.channel.send(new MessageEmbed()
            .setColor(message.guild.me.displayHexColor)
            .setDescription(`<@${userID}> has been already unban ${emoji.check_mark}`)
        )
        let bUser = bans.find(b => b.user.id == userID)
        if(!bUser) return message
        message.guild.members.unban(bUser.user)
    })

    message.delete();
    message.channel.send(new MessageEmbed()
        .setColor(message.guild.me.displayHexColor)
        .setDescription(`<@${userID}> has been unban successfully ${emoji.check_mark}`)
    )
};

exports.help = {
    name: 'unban',
    description: 'unban userID',
    usage: 'unban <user>',
    example: 'unban sнεүzααα#0962'
};
  
exports.conf = {
    aliases: [],
    cooldown: 1
};