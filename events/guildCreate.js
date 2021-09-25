const { MessageEmbed } = require ('discord.js');
const db = require ('quick.db');

module.exports = async (client, guild) => {

    //Proton Total Server
    let guildCount = client.guilds.cache.get('857962169974652929');
    let servers = client.guilds.cache.size
    let serverCountChannel = guildCount.channels.cache.get('865384029591175168');
    serverCountChannel.setName('🌎 Server : ' + servers);

    if (db.get(`blacklist_${guild.id}.toggle`)) {
        guild.leave();
    }

    let ProtonChannel = '857969598694817813';

    const join = new MessageEmbed()
        .setAuthor(`✅ Proton has joined a new server`, guild.iconURL())
        .setColor('#1bec28')
        .addFields(
            { name: '📋**Server Name** :', value: `${guild.name}`, inline: true},
            { name: '👑**Owner** :', value: `${guild.owner}`, inline: true},
            { name: '👤**Members** :', value: `${guild.memberCount}`, inline: true}
        )
    client.channels.cache.get(ProtonChannel).send(join)

}