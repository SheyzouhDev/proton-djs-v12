const { MessageEmbed } = require ('discord.js');

module.exports = async (client, guild) => {

    //Proton Total Server
    let guildCount = client.guilds.cache.get('857962169974652929');
    let servers = client.guilds.cache.size
    let serverCountChannel = guildCount.channels.cache.get('865384029591175168');
    serverCountChannel.setName('🌎 Server : ' + servers);

    let ProtonChannel = '857969598694817813';

    const leave = new MessageEmbed()
        .setAuthor(`❌ Proton has leave a server`, guild.iconURL())
        .setColor('#ff0000')
        .addFields(
            { name: '📋**Server Name** :', value: `${guild.name}`, inline: true},
            { name: '👑**Owner** :', value: `${guild.owner}`, inline: true},
            { name: '👤**Members** :', value: `${guild.memberCount}`, inline: true}
        )
    client.channels.cache.get(ProtonChannel).send(leave)
}