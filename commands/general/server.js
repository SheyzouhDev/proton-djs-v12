const { MessageEmbed } = require("discord.js");
const presence = require ('../../presence.json')

exports.run = async (client , message, args) => {

    const guild = message.guild;
    const explicitContentFilter = {
        "DISABLED" : "Disable",
        "MEMBERS_WITHOUT_ROLES" : "Members without roles",
        "ALL_MEMBERS" : "All Members"
    }
 
    const verificationLevelFilter = {
        "NONE" : "None",
        "LOW" : "LOW",
        "MEDIUM" : "MEDIUM",
        "HIGH" : "HIGH",
        "VERY_HIGH" : "VERY_HIGH"
 
    }
    const regions = {
        'us-central': ':flag_us:  `US Central`',
        'us-east': ':flag_us:  `US East`',
        'us-south': ':flag_us:  `US South`',
        'us-west': ':flag_us:  `US West`',
        'europe': ':flag_eu:  `Europe`',
        'singapore': ':flag_sg:  `Singapore`',
        'japan': ':flag_jp:  `Japan`',
        'russia': ':flag_ru:  `Russia`',
        'hongkong': ':flag_hk:  `Hong Kong`',
        'brazil': ':flag_br:  `Brazil`',
        'sydney': ':flag_au:  `Sydney`',
        'southafrica': '`South Africa` :flag_za:'
    };

    let emojisTotal;
    if (message.guild.emojis.cache.size === 0) {
        emojisTotal = 'None';
    } else {
        emojisTotal = message.guild.emojis.cache.size;
    }

    const emojis = guild.emojis.cache.sort((a, b) => b.position - a.position).map(e => e.toString())
    const emojisize = guild.emojis.cache.size
    var emojiList = 0
    if(emojisize > 15) {
        emojiList = `>>> ${emojis.splice(0, 15).join(", ")} & **${emojisize - 15} autres**`
    } else {
        emojiList = `>>> ${emojis.join(", ")}`
    }

    const roles = guild.roles.cache.sort((a, b) => b.position - a.position).map(r => r.toString())
    const rolesize = guild.roles.cache.size
    var roleList = 0
    if(rolesize > 10) {
        roleList = `>>> ${roles.splice(0, 10).join(", ")} & **${rolesize - 10} autres**`
    } else {
        roleList = `>>> ${roles.join(", ")}`
    }
    
    const member = message.guild.members.cache
    const onlines = member.filter(u => u.presence.status === 'online').size
    const dnd = member.filter(u => u.presence.status === 'dnd').size
    const idle = member.filter(u => u.presence.status === 'idle').size
    const offline = member.filter(u => u.presence.status === 'offline').size
    
    function moment(time){
        const createdAt = new Date(time)
    
        return createdAt.toLocaleDateString()
    
    }
    
    const embed = new MessageEmbed()
    .setAuthor(guild.name, guild.iconURL())
    .setColor(message.guild.me.displayHexColor)
    .setThumbnail(guild.iconURL({size: 1024, dynamic: true}))
    .addField(`👑 Owner :`, `${guild.owner}`, true)
    .addField(`💻 ID :`, `\`${guild.id}\``, true)
    .addField(`🌎 Region :`, `${regions[guild.region]}`, true)
    .addField(`📆 Created At :`, `\`${moment(guild.createdTimestamp)}\``, true)
    .addField(`🔧 Verification :`, `${verificationLevelFilter[guild.verificationLevel]}`, true)
    .addField(`📛 Content filter :`, `${explicitContentFilter[guild.explicitContentFilter]}`, true)
    .addField(`📺 Channels (${message.guild.channels.cache.size})`, `\`Textuel(s)\` [»](https://discord.com) ${message.guild.channels.cache.filter(channel => channel.type === 'text').size}\n\`Vocaux\` [»](https://discord.com) ${message.guild.channels.cache.filter(channel => channel.type === 'voice').size}\n\`Catégories\` [»](https://discord.com) ${message.guild.channels.cache.filter(channel => channel.type === 'category').size}`, true)
    .addField(`😴 AFK Timeout :`, `\`Salon\` [»](https://discord.com) ${guild.afkChannel === null ? 'None' : guild.afkChannel}\n\`Temps\` [»](https://discord.com) **${guild.afkTimeout}**`, true)
    .addField(`🔰 Rôles :`, `${roleList}`)
    .addField(`🤣 Emojis (${emojisTotal})`, `${emojiList}`)
    .addField(`⭐ Nitro boost`, `\`Level\` [»](https://discord.com) **${message.guild.premiumTier}**\n\`Amount\` [»](https://discord.com) **${message.guild.premiumSubscriptionCount}**`)
    
    .addField(`👥 Members » ${message.guild.memberCount}
    `, `${presence.online} Online [»](https://discord.com) **${onlines}**
        ${presence.idle} Inactif [»](https://discord.com) **${idle}**
        ${presence.dnd} Ne pas déranger [»](https://discord.com) **${dnd}**
        ${presence.offline} Hors ligne [»](https://discord.com) **${offline}**
    ────────────
    **${message.guild.members.cache.filter(member => !member.user.bot).size}** Humans [»](https://discord.com) **${message.guild.members.cache.filter(member => member.user.bot).size}** Robots`)
    
    .setTimestamp()
    .setFooter(`Requested by ${message.author.username}`, message.author.avatarURL())
    
    message.channel.send(embed);

}

exports.help = {
    name: 'server',
    description: 'view server information',
    usage: 'server',
    example: 'server'
};
  
exports.conf = {
    aliases: ['serverinfo'],
    cooldown: 5
};