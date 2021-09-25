const { MessageEmbed } = require('discord.js');
const db = require ('quick.db');
const emoji = require ('../emoji.json')

module.exports = async (client, member) => {

    if (db.get(`antijoin_${member.guild.id}.toggle`)) {
        member.send(new MessageEmbed()
            .setColor('#ff0000')
            .setDescription(`${emoji.lock} This server is already locked, Please try again later`)
            .setFooter(member.guild.name, member.guild.iconURL())
            .setTimestamp()
        )
        member.kick();
    }

    if (db.get(`buser_${member.guild.id}.toggle`)) {
        member.send(new MessageEmbed()
            .setColor('#ff0000')
            .setDescription(`You are blacklisted from this server \nContact ${member.guild.owner}`)
            .setFooter(member.guild.name, member.guild.iconURL())
            .setTimestamp()
        )
        member.kick();
    }

    let welcome = db.get(`welcome_${member.guild.id}.channel`);
    if (welcome === null) return;
    client.channels.cache.get(welcome).send(`Bienvenue, <@${member.id}> sur le serveur **${member.guild.name}** 🎉 nous vous souhaitons le meilleur`);

    let role = db.get(`autorole_${member.guild.id}.role`)
    if (role === null) return;
    member.roles.add(role)
}