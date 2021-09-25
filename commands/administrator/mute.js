const { MessageEmbed } = require("discord.js");
const emoji = require ('../../emoji.json')

exports.run = async (client, message, args) => {

    if(!message.guild.member(message.author).hasPermission('MUTE_MEMBERS', 'MANAGE_ROLES')) return message.channel.send(`You can't use this command`);

    let user = message.mentions.members.first() ||message.guild.members.cache.get(args[0]);
    if(!user) return message.channel.send(`Please, You must mention a user`)
    if(user.id == client.user.id) return message.channel.send(`I can't use this command`);

    let reason = args.join(' ').slice(22);
    if (!reason) return message.channel.send(`Please, You must mention a reason`);

    let muteRole = client.guilds.cache.get(message.guild.id).roles.cache.find(role => role.name === 'Muted');
    if (!muteRole) {
        try {
            muteRole = await message.guild.roles.create({ data: {
                name:"Muted",
                color: "#000000",
                permissions:[]
            }})

            message.guild.channels.cache.forEach(async (channel, id) => {
                await channel.createOverwrite(muteRole, {
                    SEND_MESSAGES: false,
                    MANAGE_MESSAGES: false,
                    READ_MESSAGES: false,
                    ADD_REACTIONS: false,
                    CONNECT: false
                })
            })

        } catch(e) {
            console.log(e.stack);
        }
    }

    user.roles.add(muteRole)
    message.channel.send(new MessageEmbed()
        .setColor(message.guild.me.displayHexColor)
        .setDescription(`${user} has been muted by <@${message.author.id}> ${emoji.check_mark}`)
    )
}

exports.help = {
    name: 'mute',
    description: 'mute user',
    usage: 'mute <user> <reason>',
    example: '-mute sнεүzααα#0001 insulte'
};

exports.conf = {
    aliases: [],
    cooldown: 5
};