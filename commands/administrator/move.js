const { MessageEmbed } = require("discord.js");
const emoji = require ('../../emoji.json');

exports.run = async (client, message, args) => {

    if(!message.guild.member(message.author).hasPermission('MOVE_MEMBERS')) return message.channel.send(`You can't use this command`);

    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase());
    if(!member) return message.channel.send("Unable to find the mentioned user in this guild.")

    let channel = message.mentions.channels.first() || bot.guilds.cache.get(message.guild.id).channels.cache.get(args[1]) || message.guild.channels.cache.find(c => c.name.toLowerCase() === args.slice(1).join(' ').toLocaleLowerCase());
    if (!channel.type === "voice") return message.channel.send("Unable to locate the voice channel. Make sure to mention a voice channel not a text channel!") 

    try {
        member.voice.setChannel(channel);
        message.channel.send(new MessageEmbed()
            .setColor(message.guild.me.displayHexColor)
            .setDescription(`${member} move to ${channel} successfull ${emoji.check_mark}`)
        )
    } catch(error) {
        message.channel.send("Oops! An unknown error occured. Please try again later.")
    }
}

exports.help = {
    name: 'move',
    description: 'move user vocal channel',
    usage: 'moove <@user> <#channel>',
    example: 'move @sнεүzααα#0001 🔊・Vocal #1'
};
  
exports.conf = {
    aliases: [],
    cooldown: 5
};