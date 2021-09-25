const { MessageEmbed } = require('discord.js');
const db = require ('quick.db');
const emoji = require ('../../emoji.json')

exports.run = async (client, message, args) => {

    if (!message.guild.member(message.author).hasPermission('ADMINISTRATOR')) return message.channel.send(`You can't use this command`);

    let toggling = ['add', 'remove'];
    if (!toggling.includes(args[0])) return message.channel.send(`Please, Provide a valid option ! Either **add** or **remove** it`)

    if (args[0] === 'add') {
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[1])
        
        await db.set(`buser_${message.guild.id}.toggle`, true);
        await db.set(`buser_${user.id}.id`, user.id);

        user.kick();
        return message.channel.send(new MessageEmbed()
            .setColor(message.guild.me.displayHexColor)
            .setDescription(`${user} has been blacklisted successfully ${emoji.check_mark}`)
        )
    }

    if (args[0] === 'remove') {
        const user = await client.users.fetch(args[1]);

        let toggle = db.get(`buser_${message.guild.id}.toggle`, false);
        if (!toggle || toggle == false) return message.channel.send(new MessageEmbed()
            .setColor(message.guild.me.displayHexColor)
            .setDescription(`This user is already remove from the blacklist ${emoji.wrong}`)
        )

        await db.set(`buser_${message.guild.id}.toggle`, false);
        await db.delete(`buser_${user.id}.id`, user.id);
        return message.channel.send(new MessageEmbed()
            .setColor(message.guild.me.displayHexColor)
            .setDescription(`${user} has been remove from the blacklisted successfully ${emoji.check_mark}`)
        )
    }
}

exports.help = {
    name: 'blacklist-user',
    description: 'blacklist-user from guild',
    usage: 'blacklist-user <userID> <reason>',
    example: 'blacklist-user sнεүzααα#0001 RAID'
};
  
exports.conf = {
    aliases: ['buser'],
    cooldown: 1
};