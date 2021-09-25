const { MessageEmbed } = require("discord.js")
const db = require("quick.db")
const ms = require('ms');
const { truncate } = require("fs");

exports.run = async (client, message, args) => {

    if(message.author.id === message.guild.ownerID) {
    
    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!user) return message.channel.send(`Please, You must mention a user`)

    let database = db.get(`trustedusers_${message.guild.id}`)
    if(database) {
    let data = database.find(x => x.user === user.id)
    let unabletofind = new MessageEmbed()
    .setColor(message.guild.me.displayHexColor)
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .setDescription(`**unable to find that user on database!**`)
        .setFooter(`${message.guild.name}`, message.guild.iconURL())
        .setTimestamp()
          
    if(!data) return message.channel.send(unabletofind)
          
    let value = database.indexOf(data)
    delete database[value]
          
    var filter = database.filter(x => {
        return x != null && x != ''
    })
          
    db.set(`trustedusers_${message.guild.id}`, filter)

    return message.channel.send(new MessageEmbed()
        .setColor(message.guild.me.displayHexColor)
        .setDescription(`**${message.author.tag} has removed ${user} from the trusted list**`)
        .setFooter(`${message.guild.name}`, message.guild.iconURL())
        .setTimestamp()
    )
        
    } else {          
        message.channel.send(`that user not on trusted list`)
    }}
}

exports.help = {
    name: 'removetrusted',
    description: 'remove trusted people',
    usage: 'addtrusted <user>',
    example: 'addtrusted sнεүzααα#6446'
};
  
exports.conf = {
    aliases: [],
    cooldown: 5
};