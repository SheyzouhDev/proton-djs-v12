const Discord = require ('discord.js');
const db = require ('quick.db');

exports.run = async (client, message, args) => {

    if (!client.settings.owners.includes(message.author.id)) return message.channel.send(`You can't use this command`);

    let toggling = ['add', 'remove'];
    if (!toggling.includes(args[0])) return message.channel.send(`Please provide a valid option ! Either **add** or **remove** it`);

    if (args[0] === 'add') {
        let guildId = args[1]
        if (!guildId) return message.channel.send(`Please, You must provid a valid server ID`)

        await db.set(`blacklist_${guildId}.toggle`, true);
        await db.set(`blacklist_${guildId}.guild`, guildId);
        
        const guild = message.client.guilds.cache.get(guildId);
        if (!guild) return
        guild.leave();

        return message.channel.send(`<@${guildId}> was successfully blacklisted from ${client.user.id}`)
    }

    if (args[0] === 'remove') {

        let guildId = args[1]
        if (!guildId) return message.channel.send(`Please, You must provid a valid server ID`)

        let toggle = db.get(`blacklist_${guildId}.toggle`)
        if (!toggle || toggle == false) return message.channel.send(`<@${guildId}> was already removed from the blacklist`);

        await db.set(`blacklist_${guildId}.toggle`, false);
        await db.delete(`blacklist_${guildId}.guild`);
        return message.channel.send(`<@${guildId}> was successfully removed from the blacklist`)
    }
}

exports.help = {
    name: 'blacklist',
    description: 'set blacklist guild',
    usage: 'blacklist <add or remove> <#guildID>',
    example: 'blacklist add 815600570203242506 \nremove 815600570203242506'
};

exports.conf = {
    aliases: [],
    cooldown: 5
};