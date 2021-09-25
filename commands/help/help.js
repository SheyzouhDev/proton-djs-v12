const { MessageEmbed } = require("discord.js");

exports.run = async (client, message, args) => {

    let cmd = args[0];

    if (!cmd) {
        const help = new MessageEmbed()
            .setAuthor(`Proton commands`, message.guild.iconURL())
            .setColor(message.guild.me.displayHexColor)
            .setDescription(`**Thank you for using Proton**`)
            .addField(`🛡️ **> Administrator**`, `\`addrole\` \`removerole\` \`roleinfo\` \`blacklist-user\` \`ban\` \`bans\` \`unban\` \`kick\` \`mute\` \`unmute\` \`clear\` \`move\` \`nickanme\` \`nuke\` \`say\` \`snipe\` \`warn\` \`warnings\` \`trustedlist\``)
            .addField(`🎯 **> Fun**`, `\`cat\` \`hug\` \`love\` \`kiss\` \`impostor\``)
            .addField(`🔞 **> NSFW**`, `\`anal\` \`ass\` \`boobs\` \`porn\` \`pussy\` \`thigh\``)
            .addField(`🌐 **> General**`, `\`user\` \`avatar\` \`badge\` \`ping\` \`presence\` \`report\` \`server\` \`suggest\` \`server-avatar\` \`emoji-list\``)
            .addField(`🔒 **> Protection**`, `\`config\` \`addtrusted\` \`removetrusted\` \`anti-join\` \`anti-spam\``)
            .addField(`⚙️ **> Setup**`, `\`set-welcome\` \`set-logs\` \`set-autorole\` \`set-ticket\` \`set-voicecreate\` \`set-report\` \`set-suggest\``)
            .addField(`🎫 **> Ticket**`, `\`ticket-close\` \`ticket\``)
            .addField(`🔗 **> More...**`, `** Default prefix** : \`-\` \n[Support](https://discord.gg/y4vnSkNGzC) - [Invite Me](https://discord.com/oauth2/authorize?client_id=857782439647510548&scope=bot&permissions=8589934591)`)
            .setFooter(`Requested by ${message.author.tag}`, client.user.avatarURL())
            .setTimestamp()
        return message.channel.send(help)
    }

    if (cmd.toLowerCase() === 'user') {

        const user = new MessageEmbed()
            .setAuthor(`Command user information`, client.user.avatarURL())
            .setColor(message.guild.me.displayHexColor)
            .setDescription(`**Command** : -user <@mention> \n**Aliases** : -ui \n**Permission** : \`None\``)
            .setFooter(`Requested by ${message.author.tag}`, message.author.avatarURL({ dynamic: true}))
            .setTimestamp()
        return message.channel.send(user)
    }

    if (cmd.toLowerCase() === 'avatar') {

        const avatar = new MessageEmbed()
            .setAuthor(`Command avatar information`, client.user.avatarURL())
            .setColor(message.guild.me.displayHexColor)
            .setDescription(`**Command** : -avatar <@mention> \n**Aliases** : -ua \n**Permission** : \`None\``)
            .setFooter(`Requested by ${message.author.tag}`, message.author.avatarURL({ dynamic: true}))
            .setTimestamp()
        return message.channel.send(avatar)
    }

    if (cmd.toLowerCase() === 'badge') {

        const badge = new MessageEmbed()
            .setAuthor(`Command badge information`, client.user.avatarURL())
            .setColor(message.guild.me.displayHexColor)
            .setDescription(`**Command** : -badge <@mention> \n**Aliases** : \`None\` \n**Permission** : \`None\``)
            .setFooter(`Requested by ${message.author.tag}`, message.author.avatarURL({ dynamic: true}))
            .setTimestamp()
        return message.channel.send(badge)
    }

    //category protection
    if (cmd.toLowerCase() === 'addtrusted') {

        const addtrusted = new MessageEmbed()
            .setAuthor(`Command addtrusted information`, client.user.avatarURL())
            .setColor(message.guild.me.displayHexColor)
            .setDescription(`**Command** : -addtrusted <userID> \n**Aliases** : \`None\` \n**Permission** : \`OWNER\``)
            .setFooter(`Requested by ${message.author.tag}`, message.author.avatarURL({ dynamic: true}))
            .setTimestamp()
        return message.channel.send(addtrusted)
    }

    if (cmd.toLowerCase() === 'removetrusted') {

        const removetrusted = new MessageEmbed()
            .setAuthor(`Command removetrusted information`, client.user.avatarURL())
            .setColor(message.guild.me.displayHexColor)
            .setDescription(`**Command** : -removetrusted <userID> \n**Aliases** : -lockserver \n**Permission** : \`OWNER\``)
            .setFooter(`Requested by ${message.author.tag}`, message.author.avatarURL({ dynamic: true}))
            .setTimestamp()
        return message.channel.send(removetrusted)
    }

    if (cmd.toLowerCase() === 'anti-join') {

        const antijoin = new MessageEmbed()
            .setAuthor(`Command anti-join information`, client.user.avatarURL())
            .setColor(message.guild.me.displayHexColor)
            .setDescription(`**Command** : -anti-join on/off \n**Aliases** : \`None\` \n**Permission** : \`MANAGE_GUILD\``)
            .setFooter(`Requested by ${message.author.tag}`, message.author.avatarURL({ dynamic: true}))
            .setTimestamp()
        return message.channel.send(antijoin)
    }

    if (cmd.toLowerCase() === 'anti-spam') {

        const antispam = new MessageEmbed()
            .setAuthor(`Command anti-spam information`, client.user.avatarURL())
            .setColor(message.guild.me.displayHexColor)
            .setDescription(`**Command** : -anti-spam low/medium/hight \n**Aliases** : -spam \n**Permission** : \`MANAGE_MESSAGES\``)
            .setFooter(`Requested by ${message.author.tag}`, message.author.avatarURL({ dynamic: true}))
            .setTimestamp()
        return message.channel.send(antispam)
    }

    //category setup
    if (cmd.toLowerCase() === 'set-autorole') {

        const autorole = new MessageEmbed()
            .setAuthor(`Command autorole information`, client.user.avatarURL())
            .setColor(message.guild.me.displayHexColor)
            .setDescription(`**Command** : -set-autorole enable/disable <#roleID> \n**Aliases** : -sautorole \n**Permission** : \`MANAGE_GUILD\``)
            .setFooter(`Requested by ${message.author.tag}`, message.author.avatarURL({ dynamic: true}))
            .setTimestamp()
        return message.channel.send(autorole)
    }

    if (cmd.toLowerCase() === 'set-logs') {

        const logs = new MessageEmbed()
            .setAuthor(`Command logs information`, client.user.avatarURL())
            .setColor(message.guild.me.displayHexColor)
            .setDescription(`**Command** : -set-logs enable/disable <#channelID> \n**Aliases** : -slogs \n**Permission** : \`MANAGE_GUILD\``)
            .setFooter(`Requested by ${message.author.tag}`, message.author.avatarURL({ dynamic: true}))
            .setTimestamp()
        return message.channel.send(logs)
    }

    if (cmd.toLowerCase() === 'set-voicecreate') {

        const voicecreate = new MessageEmbed()
            .setAuthor(`Command set-voicecreate information`, client.user.avatarURL())
            .setColor(message.guild.me.displayHexColor)
            .setDescription(`**Command** : -set-voicecreate enable/disable <#channelID> \n**Aliases** : -svoicecreate \n**Permission** : \`MANAGE_CHANNELS\``)
            .setFooter(`Requested by ${message.author.tag}`, message.author.avatarURL({ dynamic: true}))
            .setTimestamp()
        return message.channel.send(voicecreate)
    }

    if (cmd.toLowerCase() === 'set-report') {

        const report = new MessageEmbed()
            .setAuthor(`Command logs information`, client.user.avatarURL())
            .setColor(message.guild.me.displayHexColor)
            .setDescription(`**Command** : -set-report enable/disable <#channelID> \n**Aliases** : -sreport \n**Permission** : \`MANAGE_GUILD\``)
            .setFooter(`Requested by ${message.author.tag}`, message.author.avatarURL({ dynamic: true}))
            .setTimestamp()
        return message.channel.send(report)
    }

    if (cmd.toLowerCase() === 'set-suggest') {

        const suggest = new MessageEmbed()
            .setAuthor(`Command logs information`, client.user.avatarURL())
            .setColor(message.guild.me.displayHexColor)
            .setDescription(`**Command** : -set-suggest enable/disable <#channelID> \n**Aliases** : -ssuggest \n**Permission** : \`MANAGE_GUILD\``)
            .setFooter(`Requested by ${message.author.tag}`, message.author.avatarURL({ dynamic: true}))
            .setTimestamp()
        return message.channel.send(suggest)
    }

    if (cmd.toLowerCase() === 'set-ticket') {

        const ticket = new MessageEmbed()
            .setAuthor(`Command logs information`, client.user.avatarURL())
            .setColor(message.guild.me.displayHexColor)
            .setDescription(`**Command** : -set-ticket enable/disable <#categoryID> \n**Aliases** : -ssuggest \n**Permission** : \`MANAGE_GUILD\``)
            .setFooter(`Requested by ${message.author.tag}`, message.author.avatarURL({ dynamic: true}))
            .setTimestamp()
        return message.channel.send(ticket)
    }

    if (cmd.toLowerCase() === 'set-welcome') {

        const welcome = new MessageEmbed()
            .setAuthor(`Command logs information`, client.user.avatarURL())
            .setColor(message.guild.me.displayHexColor)
            .setDescription(`**Command** : -set-welcome enable/disable <#channelID> \n**Aliases** : -swelcome \n**Permission** : \`MANAGE_GUILD\``)
            .setFooter(`Requested by ${message.author.tag}`, message.author.avatarURL({ dynamic: true}))
            .setTimestamp()
        return message.channel.send(welcome)
    }

    //category administrator
    if (cmd.toLowerCase() === 'addrole') {

        const addrole = new MessageEmbed()
            .setAuthor(`Command addrole information`, client.user.avatarURL())
            .setColor(message.guild.me.displayHexColor)
            .setDescription(`**Command** : -addrole <user> <role> \n**Aliases** : \`None\` \n**Permission** : \`MANAGE_ROLES\``)
            .setFooter(`Requested by ${message.author.tag}`, message.author.avatarURL({ dynamic: true}))
            .setTimestamp()
        return message.channel.send(addrole)
    }

    if (cmd.toLowerCase() === 'removerole') {

        const removerole = new MessageEmbed()
            .setAuthor(`Command removerole information`, client.user.avatarURL())
            .setColor(message.guild.me.displayHexColor)
            .setDescription(`**Command** : -removerole <user> <role> \n**Aliases** : \`None\` \n**Permission** : \`MANAGE_ROLES\``)
            .setFooter(`Requested by ${message.author.tag}`, message.author.avatarURL({ dynamic: true}))
            .setTimestamp()
        return message.channel.send(removerole)
    }

    if (cmd.toLowerCase() === 'roleinfo') {

        const roleinfo = new MessageEmbed()
            .setAuthor(`Command removerole information`, client.user.avatarURL())
            .setColor(message.guild.me.displayHexColor)
            .setDescription(`**Command** : -roleinfo <role> \n**Aliases** : -ri \n**Permission** : \`MANAGE_ROLES\``)
            .setFooter(`Requested by ${message.author.tag}`, message.author.avatarURL({ dynamic: true}))
            .setTimestamp()
        return message.channel.send(roleinfo)
    }

    if (cmd.toLowerCase() === 'blacklist-user') {

        const blacklistuser = new MessageEmbed()
            .setAuthor(`Command blacklist-user information`, client.user.avatarURL())
            .setColor(message.guild.me.displayHexColor)
            .setDescription(`**Command** : -blacklist-user [add/remove] <user> \n**Aliases** : -buser \n**Permission** : \`ADMINISTRATOR\``)
            .setFooter(`Requested by ${message.author.tag}`, message.author.avatarURL({ dynamic: true}))
            .setTimestamp()
        return message.channel.send(blacklistuser)
    }

    if (cmd.toLowerCase() === 'ban') {

        const ban = new MessageEmbed()
            .setAuthor(`Command ban information`, client.user.avatarURL())
            .setColor(message.guild.me.displayHexColor)
            .setDescription(`**Command** : -ban <user> <reason> \n**Aliases** : \`None\` \n**Permission** : \`BAN_MEMBERS\``)
            .setFooter(`Requested by ${message.author.tag}`, message.author.avatarURL({ dynamic: true}))
            .setTimestamp()
        return message.channel.send(ban)
    }

    if (cmd.toLowerCase() === 'bans') {

        const bans = new MessageEmbed()
            .setAuthor(`Command ban information`, client.user.avatarURL())
            .setColor(message.guild.me.displayHexColor)
            .setDescription(`**Command** : -bans \n**Aliases** : \`None\` \n**Permission** : \`ADMINISTRATOR\``)
            .setFooter(`Requested by ${message.author.tag}`, message.author.avatarURL({ dynamic: true}))
            .setTimestamp()
        return message.channel.send(bans)
    }

    if (cmd.toLowerCase() === 'unban') {

        const unban = new MessageEmbed()
            .setAuthor(`Command unban information`, client.user.avatarURL())
            .setColor(message.guild.me.displayHexColor)
            .setDescription(`**Command** : -unban <userID> \n**Aliases** : \`None\` \n**Permission** : \`BAN_MEMBERS\``)
            .setFooter(`Requested by ${message.author.tag}`, message.author.avatarURL({ dynamic: true}))
            .setTimestamp()
        return message.channel.send(unban)
    }

    if (cmd.toLowerCase() === 'kick') {

        const kick = new MessageEmbed()
            .setAuthor(`Command kick information`, client.user.avatarURL())
            .setColor(message.guild.me.displayHexColor)
            .setDescription(`**Command** : -kick <user> <reason> \n**Aliases** : \`None\` \n**Permission** : \`KICK_MEMBERS\``)
            .setFooter(`Requested by ${message.author.tag}`, message.author.avatarURL({ dynamic: true}))
            .setTimestamp()
        return message.channel.send(kick)
    }

    if (cmd.toLowerCase() === 'mute') {

        const mute = new MessageEmbed()
            .setAuthor(`Command mute information`, client.user.avatarURL())
            .setColor(message.guild.me.displayHexColor)
            .setDescription(`**Command** : -mute <user> <reason> \n**Aliases** : \`None\` \n**Permission** : \`MUTE_MEMBERS\` \`MANAGE_ROLES\``)
            .setFooter(`Requested by ${message.author.tag}`, message.author.avatarURL({ dynamic: true}))
            .setTimestamp()
        return message.channel.send(mute)
    }

    if (cmd.toLowerCase() === 'unmute') {

        const unmute = new MessageEmbed()
            .setAuthor(`Command unmute information`, client.user.avatarURL())
            .setColor(message.guild.me.displayHexColor)
            .setDescription(`**Command** : -unmute <user> \n**Aliases** : \`None\` \n**Permission** : \`MUTE_MEMBERS\` \`MANAGE_ROLES\``)
            .setFooter(`Requested by ${message.author.tag}`, message.author.avatarURL({ dynamic: true}))
            .setTimestamp()
        return message.channel.send(unmute)
    }

    if (cmd.toLowerCase() === 'clear') {

        const clear = new MessageEmbed()
            .setAuthor(`Command clear information`, client.user.avatarURL())
            .setColor(message.guild.me.displayHexColor)
            .setDescription(`**Command** : -clear <message> \n**Aliases** : \`None\` \n**Permission** : \`MANAGE_MESSAGES\``)
            .setFooter(`Requested by ${message.author.tag}`, message.author.avatarURL({ dynamic: true}))
            .setTimestamp()
        return message.channel.send(clear)
    }

    if (cmd.toLowerCase() === 'move') {

        const move = new MessageEmbed()
            .setAuthor(`Command move information`, client.user.avatarURL())
            .setColor(message.guild.me.displayHexColor)
            .setDescription(`**Command** : -move <user> <Vocal ChannelID> \n**Aliases** : \`None\` \n**Permission** : \`MOVE_MEMBERS\``)
            .setFooter(`Requested by ${message.author.tag}`, message.author.avatarURL({ dynamic: true}))
            .setTimestamp()
        return message.channel.send(move)
    }

    if (cmd.toLowerCase() === 'nickname') {

        const nickname = new MessageEmbed()
            .setAuthor(`Command nickname information`, client.user.avatarURL())
            .setColor(message.guild.me.displayHexColor)
            .setDescription(`**Command** : -nickname <user> <nick> \n**Aliases** : -nick \n**Permission** : \`MANAGE_NICKNAMES\``)
            .setFooter(`Requested by ${message.author.tag}`, message.author.avatarURL({ dynamic: true}))
            .setTimestamp()
        return message.channel.send(nickname)
    }

    if (cmd.toLowerCase() === 'nuke') {

        const nuke = new MessageEmbed()
            .setAuthor(`Command nuke information`, client.user.avatarURL())
            .setColor(message.guild.me.displayHexColor)
            .setDescription(`**Command** : -nuke \n**Aliases** : \`None\` \n**Permission** : \`MANAGE_CHANNELS\``)
            .setFooter(`Requested by ${message.author.tag}`, message.author.avatarURL({ dynamic: true}))
            .setTimestamp()
        return message.channel.send(nuke)
    }

    if (cmd.toLowerCase() === 'say') {

        const say = new MessageEmbed()
            .setAuthor(`Command say information`, client.user.avatarURL())
            .setColor(message.guild.me.displayHexColor)
            .setDescription(`**Command** : -say <message> \n**Aliases** : \`None\` \n**Permission** : \`MANAGE_MESSAGES\``)
            .setFooter(`Requested by ${message.author.tag}`, message.author.avatarURL({ dynamic: true}))
            .setTimestamp()
        return message.channel.send(say)
    }

    if (cmd.toLowerCase() === 'snipe') {

        const snipe = new MessageEmbed()
            .setAuthor(`Command snipe information`, client.user.avatarURL())
            .setColor(message.guild.me.displayHexColor)
            .setDescription(`**Command** : -snipe \n**Aliases** : \`None\` \n**Permission** : \`MANAGE_MESSAGES\``)
            .setFooter(`Requested by ${message.author.tag}`, message.author.avatarURL({ dynamic: true}))
            .setTimestamp()
        return message.channel.send(snipe)
    }

    if (cmd.toLowerCase() === 'warn') {

        const warn = new MessageEmbed()
            .setAuthor(`Command warn information`, client.user.avatarURL())
            .setColor(message.guild.me.displayHexColor)
            .setDescription(`**Command** : -warn <user> <reason> \n**Aliases** : \`None\` \n**Permission** : \`MANAGE_MESSAGES\``)
            .setFooter(`Requested by ${message.author.tag}`, message.author.avatarURL({ dynamic: true}))
            .setTimestamp()
        return message.channel.send(warn)
    }

    if (cmd.toLowerCase() === 'warnings') {

        const warnings = new MessageEmbed()
            .setAuthor(`Command warnings information`, client.user.avatarURL())
            .setColor(message.guild.me.displayHexColor)
            .setDescription(`**Command** : -warnings <user> \n**Aliases** : \`None\` \n**Permission** : \`MANAGE_MESSAGES\``)
            .setFooter(`Requested by ${message.author.tag}`, message.author.avatarURL({ dynamic: true}))
            .setTimestamp()
        return message.channel.send(warnings)
    }

    //category ticket
    if (cmd.toLowerCase() === 'ticket') {

        const ticket = new MessageEmbed()
            .setAuthor(`Command ticket information`, client.user.avatarURL())
            .setColor(message.guild.me.displayHexColor)
            .setDescription(`**Command** : -ticket \n**Aliases** : \`None\` \n**Permission** : \`None\``)
            .setFooter(`Requested by ${message.author.tag}`, message.author.avatarURL({ dynamic: true}))
            .setTimestamp()
        return message.channel.send(ticket)
    }

    if (cmd.toLowerCase() === 'ticket-close') {

        const cticket = new MessageEmbed()
            .setAuthor(`Command ticket information`, client.user.avatarURL())
            .setColor(message.guild.me.displayHexColor)
            .setDescription(`**Command** : -ticket-close \n**Aliases** : -cticket \n**Permission** : \`None\``)
            .setFooter(`Requested by ${message.author.tag}`, message.author.avatarURL({ dynamic: true}))
            .setTimestamp()
        return message.channel.send(cticket)
    }
}

exports.help = {
    name: 'help',
    description: 'all info help',
    usage: '-help user',
    example: '-help user'
};
  
exports.conf = {
    aliases: ['h'],
    cooldown: 5
};