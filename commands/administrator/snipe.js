const Discord = require ('discord.js');
const db = require ('quick.db');
const { stripIndent } = require ('common-tags');

exports.run = async (client, message, args) => {

    if(!message.guild.member(message.author).hasPermission('MANAGE_MESSAGES')) return message.channel.send(`You can't use this command`);

    let data = db.get(`snipe_${message.guild.id}`);
    if (!data) return message.channel.send(`I don't see any stored deleted message here`)

    let content = data.content,
        channel = data.channel,
        user = data.user;

    const snipedInfo = stripIndent`
        Message     ::  ${content}
        User        ::  ${user}
        Channel     ::  ${channel}
    `

    const snipe = new Discord.MessageEmbed()
        .setAuthor(`Sniped message`, message.guild.iconURL())
        .setColor(message.guild.me.displayHexColor)
        .setDescription(stripIndent`\`\`\`prolog\n${snipedInfo}\`\`\``)
        .setFooter(`Requested by ${message.author.tag}`, message.author.avatarURL())
        .setTimestamp()
    message.channel.send(snipe)

}

exports.help = {
    name: 'snipe',
    description: 'show the last deleted message',
    usage: 'snipe',
    example: 'snipe'
};
  
exports.conf = {
    aliases: [],
    cooldown: 5
};