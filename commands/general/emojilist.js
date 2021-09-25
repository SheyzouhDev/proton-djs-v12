const { MessageEmbed } = require("discord.js");

exports.run = async (client, message, args) => {

    let Emojis = "";
    let EmojisAnimated = "";
    let EmojiCount = 0;
    let Animated = 0;
    let OverallEmojis = 0;

    function Emoji(id) {
        return client.emojis.cache.get(id).toString();
    }
    message.guild.emojis.cache.forEach((emoji) => {
        OverallEmojis++;
        if (emoji.animated) {
            Animated++;
            EmojisAnimated += Emoji(emoji.id);
        } else {
            EmojiCount++;
            Emojis += Emoji(emoji.id);
        }
    });
    
    let emoji = new MessageEmbed()
        .setAuthor(`Emojs in ${message.guild.name} | Emojs [${OverallEmojis}]`, message.guild.iconURL())
        .setColor(message.guild.me.displayHexColor)
        .setDescription(`**Animated [${Animated}]** : \n${EmojisAnimated} \n\n**Standard [${EmojiCount}]** : \n${Emojis}`)
        .setFooter(`Requested by ${message.author.tag}`, message.author.avatarURL({ dynamic: true}))
        .setTimestamp()
    message.channel.send(emoji)

}

exports.help = {
    name: 'emoji-list',
    description: 'members status',
    usage: 'members',
    example: 'members'
};

exports.conf = {
    aliases: ['allemoji'],
    cooldown: 5
};