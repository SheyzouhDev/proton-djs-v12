const { MessageEmbed } = require("discord.js");
const db = require ('quick.db');
const emoji = require ('../../emoji.json')

exports.run = async (client, message, args) => {

    if(!message.guild.member(message.author).hasPermission('SEND_MESSAGES')) return message.channel.send(`You can't use this command`);

    const suggestChannel = db.get(`suggest_${message.guild.id}.channel`);
    if (!suggestChannel) return message.channel.send('Please wait, the channel for send suggest is not defined done \`-set-suggest enable <#channelID>\`');

    let suggestRequest = args.join(" ");
    if (!suggestRequest) return message.channel.send(`Please, You must provide a suggestion`)

    let suggest = new MessageEmbed()
        .setAuthor(`${message.author.tag}`, message.author.avatarURL({ dynamic: true }))
        .setColor(message.guild.me.displayHexColor)
        .setDescription(` \n\n**Suggestion ** \n\nDescription : ${suggestRequest}`)
        .setFooter(client.user.username, client.user.displayAvatarURL())
        .setTimestamp()
    client.channels.cache.get(suggestChannel).send(suggest).then(async m => {
        m.react(`${emoji.check_mark}`)
        m.react(`${emoji.wrong}`)
    })

    setTimeout(() => {
        message.delete()
    }, 5000)
}

exports.help = {
    name: 'suggest',
    description: 'declare suggestion',
    usage: 'suggest suggestion',
    example: 'suggest suggestion'
};
  
exports.conf = {
    aliases: [],
    cooldown: 5
};