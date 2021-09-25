const { MessageEmbed } = require('discord.js');
const db = require ('quick.db');

exports.run = async (client, message, args) => {
   
    let wordlist = new MessageEmbed()
        .setAuthor(`Trusted list `)
        .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
        .setTimestamp()
        
    let database = db.get(`trustedusers_${message.guild.id}`)
    if(database && database.length) {
    let array =[]
        database.forEach(m => {
        array.push(`<@${m.user}>`)
    })     
        wordlist.setDescription(`${array.join("\n")}`)
    }

    return message.channel.send(wordlist);

}

exports.help = {
    name: 'trustedlist',
    description: 'view trusted list',
    usage: 'trustedlist',
    example: 'trustedlist'
};
  
exports.conf = {
    aliases: [],
    cooldown: 5
};