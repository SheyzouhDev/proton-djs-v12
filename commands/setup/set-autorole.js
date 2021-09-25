const { MessageEmbed } = require('discord.js');
const db = require ('quick.db');
const emoji = require ('../../emoji.json');

exports.run = async (client, message, args) => {

    if(!message.guild.member(message.author).hasPermission('MANAGE_GUILD')) return message.channel.send(`You can't use this command`);

    let toggling = ['enable', 'disable'];
    if (!toggling.includes(args[0])) return message.channel.send(new MessageEmbed()
        .setColor(message.guild.me.displayHexColor)
        .setDescription(`Please, provide a valid option ! Either **Enable** or **Disable** it ${emoji.wrong}`)
    );

    if (args[0] === 'enable') {
        let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]);
        if (!role) return message.channel.send(new MessageEmbed()
            .setColor(message.guild.me.displayHexColor)
            .setDescription(`Please, provide a role to be given on arrival ${emoji.wrong}`)
        );

        await db.set(`autorole_${message.guild.id}.toggle`, true);
        await db.set(`autorole_${message.guild.id}.role`, role.id);
        return message.channel.send(new MessageEmbed()
            .setColor(message.guild.me.displayHexColor)
            .setDescription(`autorole enabled successfully ${emoji.check_mark}`)
        );
    }

    if (args[0] === 'disable') {
        let toggle = db.get(`autorole_${message.guild.id}.toggle`)
        if (!toggle || toggle == false) return message.channel.send(new MessageEmbed()
            .setColor(message.guild.me.displayHexColor)
            .setDescription(`I guess, the auto role has already been disable before`)
        );

        await db.set(`autorole_${message.guild.id}.toggle`, false);
        await db.delete(`autorole_${message.guild.id}.role`);
        return message.channel.send(new MessageEmbed()
            .setColor(message.guild.me.displayHexColor)
            .setDescription(`Autorole disabled successfully ${emoji.check_mark}`)
        )
    }
}

exports.help = {
    name: 'set-autorole',
    description: 'setautorole',
    usage: 'setautorole <enable or disable> <roleid>',
    example: 'setautorole enable roleid \ndisable roleid'
};
  
exports.conf = {
    aliases: ['sautorole'],
    cooldown: 5
};