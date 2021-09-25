const badges = require ('../../badges.json')

const flags = {
    DISCORD_EMPLOYEE: `${badges.discord_employee} \`Discord Employee\``,
    DISCORD_PARTNER: `${badges.discord_partner} \`Partnered Server Owner\``,
    BUGHUNTER_LEVEL_1: `${badges.bughunter_level_1} \`Bug Hunter (Level 1)\``,
    BUGHUNTER_LEVEL_2: `${badges.bughunter_level_2} \`Bug Hunter (Level 2)\``,
    HYPESQUAD_EVENTS: `${badges.hypesquad_events} \`HypeSquad Events\``,
    HOUSE_BRAVERY: `${badges.house_bravery} \`House of Bravery\``,
    HOUSE_BRILLIANCE: `${badges.house_brilliance} \`House of Brilliance\``,
    HOUSE_BALANCE: `${badges.house_balance} \`House of Balance\``,
    EARLY_SUPPORTER: `${badges.early_supporter} \`Early Supporter\``,
    VERIFIED_BOT: `${badges.verified_bot} \`Verified Bot\``,
    VERIFIED_DEVELOPER: `${badges.verified_developer} \`Early Verified Bot Developer\``,
};

exports.run = async (client, message, args) => {

    if(!message.guild.member(message.author).hasPermission('SEND_MESSAGES')) return message.channel.send(`You can't use this command`);

    let user = message.mentions.members.first() || message.member;

    const userFlags = (await user.user.fetchFlags()).toArray();

    message.channel.send(`🏆 Badges of ${user} \n\n` + userFlags.map(flag => flags[flag]).join('\n'))

}

exports.help = {
    name: 'badge',
    description: 'view badges information',
    usage: 'badges <user>',
    example: 'badges @sнεүzααα#0001'
};
  
exports.conf = {
    aliases: [],
    cooldown: 5
};