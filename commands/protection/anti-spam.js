const { MessageEmbed } = require('discord.js');
const db = require ('quick.db');
const emoji = require ('../../emoji.json')

exports.run = async (client, message, args) => {

    if(!message.guild.member(message.author).hasPermission('MANAGE_MESSAGES')) return message.channel.send(`You can't use this command`);

    let toggling = ['low', 'medium', 'hight'];
    if (!toggling.includes(args[0])) return message.channel.send(`Please provide a valid option ! Either **low** or **medium** or **hight** it`);

    if (args[0] === 'low') {

        await db.set(`antispam_${message.guild.id}.value`, 4)

        message.channel.send(new MessageEmbed()
            .setColor(message.guild.me.displayHexColor)
            .setDescription(`**ANTI-SPAM** defined to low successfully ${emoji.check_mark}`)
        )
    }

    if (args[0] === 'medium') {

        await db.set(`antispam_${message.guild.id}.value`, 7)

        message.channel.send(new MessageEmbed()
            .setColor(message.guild.me.displayHexColor)
            .setDescription(`**ANTI-SPAM** defined to medium successfully ${emoji.check_mark}`)
        )
    }

    if (args[0] === 'hight') {

        await db.set(`antispam_${message.guild.id}.value`, 10)


        message.channel.send(new MessageEmbed()
            .setColor(message.guild.me.displayHexColor)
            .setDescription(`**ANTI-SPAM** defined to hight successfully ${emoji.check_mark}`)
        )
    }
}

exports.help = {
    name: 'anti-spam',
    description: 'setautorole',
    usage: 'setautorole <enable or disable> <roleid>',
    example: 'setautorole enable roleid \ndisable roleid'
};
  
exports.conf = {
    aliases: ['spam'],
    cooldown: 5
};