const { MessageEmbed } = require ('discord.js');
const moment = require ('moment');
const badges = require ('../../badges.json')

const flags = {
    DISCORD_EMPLOYEE: `${badges.discord_employee}`,
    DISCORD_PARTNER: `${badges.discord_partner}`,
    BUGHUNTER_LEVEL_1: `${badges.bughunter_level_1}`,
    BUGHUNTER_LEVEL_2: `${badges.bughunter_level_2}`,
    HYPESQUAD_EVENTS: `${badges.hypesquad_events}`,
    HOUSE_BRAVERY: `${badges.house_bravery}`,
    HOUSE_BRILLIANCE: `${badges.house_brilliance}`,
    HOUSE_BALANCE: `${badges.house_balance}`,
    EARLY_SUPPORTER: `${badges.early_supporter}`,
    VERIFIED_BOT: `${badges.verified_bot}`,
    VERIFIED_DEVELOPER: `${badges.verified_developer}`,
};

exports.run = async (client, message, args) => {

    if(!message.guild.member(message.author).hasPermission('SEND_MESSAGES')) return message.channel.send(`You can't use this command`);

    let user = message.mentions.members.first() || message.member;

    let stat = {
        online: "https://emoji.gg/assets/emoji/5886_online.gif",
        idle: "https://emoji.gg/assets/emoji/1656_idle.gif",
        dnd: "https://emoji.gg/assets/emoji/3359_dnd.gif",
        offline: "https://emoji.gg/assets/emoji/8500_offline.gif",
    };

    let userInfo = new MessageEmbed()
        .setThumbnail(user.user.displayAvatarURL({ dynamic: true }))

    let array = []
    if (user.user.presence.activities.length) {

        let data = user.user.presence.activities;

        for (let i = 0; i < data.length; i++) {
            let name = data[i].name || 'None'
            //let xname = data[i].details || 'None'
            let zname = data[i].state || 'None'

        array.push(`\`${name} : ${zname}\``)

        if (data[i].name === "Spotify") {
            userInfo.setThumbnail(`https://i.scdn.co/image/${data[i].assets.largeImage.replace("spotify:", "")}`)
        }

        userInfo.setDescription(array.join("\n"))
        }
    }

    if (user.nickname !== null) {
        userInfo.addField('Nickname :', user.nickname)
    }

    const userFlags = (await user.user.fetchFlags()).toArray();

        userInfo.setAuthor(`👤 ${user.user.tag} | 🆔 ${user.user.id}`, user.user.avatarURL())
        userInfo.setColor(user.displayHexColor === "#000000" ? "#ffffff" : user.displayHexColor)
        userInfo.addField('🔰 **Rôle** :', user.roles.cache.map(r => `${r}`).join(' | '))
        userInfo.addField('⏰ **Account Joined At** :', moment(user.user.joinedAt).format("ll"))
        userInfo.addField('⏰ **Account Created At** :', moment(user.user.createdAt).format("ll"))
        userInfo.addField('🏆 **Badges** :', userFlags.map(flag => flags[flag]).join('\n') || 'None')
        userInfo.setFooter(`Requested by ${message.author.tag} | ` + user.user.presence.status, stat[user.user.presence.status])
        userInfo.setTimestamp()
    
    message.channel.send(userInfo);
}

exports.help = {
    name: 'user',
    description: 'view user information',
    usage: 'user <user>',
    example: 'user sнεүzααα#0001'
};
  
exports.conf = {
    aliases: ['ui'],
    cooldown: 5
};