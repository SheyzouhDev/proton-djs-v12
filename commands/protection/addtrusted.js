const { MessageEmbed } = require("discord.js")
const db = require("quick.db")
const ms = require('ms');
const { truncate } = require("fs");

exports.run = async (client, message, args) => {

    if(message.author.id === message.guild.ownerID) {
    
    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!user) return message.channel.send(`Please, You must mention a user`)

        let trustedusers = db.get(`trustedusers_${message.guild.id}`)
            if(trustedusers && trustedusers.find(find => find.user == user.id)) {
        return message.channel.send(`This User It's Already on trusted list`)
        }

        let data = {
            user: user.id
        }

        db.push(`trustedusers_${message.guild.id}`, data)
        return message.channel.send(new MessageEmbed()
            .setColor(message.guild.me.displayHexColor)
            .setDescription(`**${message.author.tag} has added ${user} to the trusted list**`)
            .setFooter(`${message.guild.name}`, message.guild.iconURL())
            .setTimestamp()
        )
    }
}

exports.help = {
    name: 'addtrusted',
    description: 'add trusted people',
    usage: 'addtrusted <user>',
    example: 'addtrusted sнεүzααα#6446'
};
  
exports.conf = {
    aliases: [],
    cooldown: 5
};