const Discord = require ('discord.js');
const db = require ('quick.db');
const { stripIndent } = require('common-tags');
const emoji = require ('../../emoji.json');

exports.run = async (client, message, args) => {

    if(message.author.id === message.guild.ownerID) {

    let cmd = args[0];
    if (!cmd) {
        const settings = new Discord.MessageEmbed()
            .setAuthor(`Settings commands anti raid`, client.user.displayAvatarURL())
            .setColor(message.guild.me.displayHexColor)
            .setDescription(stripIndent`
                > config show
                > config setcreaterolelimit
                > config setdeleterolelimit
                > config setcreatechannellimit
                > config setdeletechannellimit
                > config setbanlimit
                > config setkicklimit
                > config setantiraidlogs
                > config clearuser
            `)
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
            .setTimestamp()
        return message.channel.send(settings)
    }

    if (cmd.toLowerCase() === 'show') {

        let createRoleLimite = db.get(`createrolelimite_${message.guild.id}`)
        if (createRoleLimite === null) createRoleLimite = `${emoji.wrong}`

        let deleteRoleLimite = db.get(`deleterolelimite_${message.guild.id}`)
        if (deleteRoleLimite === null) deleteRoleLimite = `${emoji.wrong}`

        let createChannelLimite = db.get(`createchannellimite_${message.guild.id}`)
        if (createChannelLimite === null) createChannelLimite = `${emoji.wrong}`

        let deleteChannelLimite = db.get(`deletechannellimite_${message.guild.id}`)
        if (deleteChannelLimite === null) deleteChannelLimite = `${emoji.wrong}`

        let userBanLimite = db.get(`userbanlimite_${message.guild.id}`)
        if (userBanLimite === null) userBanLimite = `${emoji.wrong}`

        let userKickLimite = db.get(`userkicklimite_${message.guild.id}`)
        if (userKickLimite === null) userKickLimite = `${emoji.wrong}`

        let logsChannel = db.get(`logsraid_${message.guild.id}`)
        if (logsChannel === null) logsChannel = `${emoji.wrong}`

        let show = new Discord.MessageEmbed()
            .setAuthor(`Settings Anti-Raid`, client.user.displayAvatarURL())
            .setColor(message.guild.me.displayHexColor)
            .addFields(

                {name: `Create Role Limite`, value: createRoleLimite, inline: true},
                {name: `Delete Role Limite`, value: deleteRoleLimite, inline: true},
                {name: `Create Channel Limite`, value: createChannelLimite, inline: true},
                {name: `Delete Channel Limite`, value: deleteChannelLimite, inline: true},
                {name: `User Ban Limite`, value: userBanLimite, inline: true},
                {name: `User Kick Limite`, value: userKickLimite, inline: true},
                {name: `Logs Channel Raid`, value: logsChannel, inline: true}

            )
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
            .setTimestamp()
        return message.channel.send(show)
    }
    
    if (cmd.toLowerCase() === 'setcreaterolelimit') {

        let createRole = args.slice(1).join(' ');
        if (!createRole) {
        const errCreateRoleLimite = new Discord.MessageEmbed()
            .setColor(message.guild.me.displayHexColor)
            .setDescription(`**Invalid usage** ! \`config setcreaterolelimit number\``)
        return message.channel.send(errCreateRoleLimite)
        }

        if(isNaN(createRole)) {
        const errCreateRoleLimite = new Discord.MessageEmbed()
            .setColor(message.guild.me.displayHexColor)
            .setDescription(`**Invalid usage** ! (Cannot be words only numbers) \`config setcreaterolelimit number\``)
        return message.channel.send(errCreateRoleLimite)
        }

        db.set(`createrolelimite_${message.guild.id}`, createRole)
        const createRoleLimite = new Discord.MessageEmbed()
            .setColor(message.guild.me.displayHexColor)
            .setDescription(`Done. Creation role limit has been set to ${createRole} ${emoji.check_mark}`)
        return message.channel.send(createRoleLimite)
    }

    if (cmd.toLowerCase() === 'setdeleterolelimit') {

        let deleteRole = args.slice(1).join(' ');
        if (!deleteRole) {
        const errDeleteRoleLimite = new Discord.MessageEmbed()
            .setColor(message.guild.me.displayHexColor)
            .setDescription(`**Invalid usage** ! \`config setdeleterolelimit number\``)
        return message.channel.send(errDeleteRoleLimite)  
        }

        if(isNaN(deleteRole)) {
        const errDeleteRoleLimite = new Discord.MessageEmbed()
            .setColor(message.guild.me.displayHexColor)
            .setDescription(`**Invalid usage** ! (Cannot be words only numbers) \`config setdeleterolelimit number\``)
        return message.channel.send(errDeleteRoleLimite)
        }

        db.set(`deleterolelimite_${message.guild.id}`, deleteRole)
        const setdeleteRoleLimite = new Discord.MessageEmbed()
            .setColor(message.guild.me.displayHexColor)
            .setDescription(`Done. Delete role limit has been set to ${deleteRole} ${emoji.check_mark}`)
        return message.channel.send(setdeleteRoleLimite)
    }

    if (cmd.toLowerCase() === 'setcreatechannellimit') {

        let createChannel = args.slice(1).join(' ');
        if (!createChannel) {
        const errCreateChannelLimit = new Discord.MessageEmbed()
            .setColor(message.guild.me.displayHexColor)
            .setDescription(`**Invalid usage** ! \`config setcreatechannellimit number\``)
        return message.channel.send(errCreateChannelLimit)
        }

        if(isNaN(createChannel)) {
        const errCreateChannelLimit = new Discord.MessageEmbed()
            .setColor(message.guild.me.displayHexColor)
            .setDescription(`**Invalid usage** ! (Cannot be words only numbers) \`config setcreatechannellimit number\``)
        return message.channel.send(errCreateChannelLimit)
        }

        db.set(`createchannellimite_${message.guild.id}`, createChannel)
        const createChannelLimite = new Discord.MessageEmbed()
            .setColor(message.guild.me.displayHexColor)
            .setDescription(`Done. Create channel limit has been set to ${createChannel} ${emoji.check_mark}`)
        return message.channel.send(createChannelLimite)
    }

    if (cmd.toLowerCase() === 'setdeletechannellimit') {

        let deleteChannel = args.slice(1).join(' ');
        if (!deleteChannel) {
            const errDeleteChannelLimit = new Discord.MessageEmbed()
            .setColor(message.guild.me.displayHexColor)
            .setDescription(`**Invalid usage** ! \`config setchanneldeletelimt number\``)
        return message.channel.send(errDeleteChannelLimit)
        }

        if(isNaN(deleteChannel)) {
        const errDeleteChannelLimit = new Discord.MessageEmbed()
            .setColor(message.guild.me.displayHexColor)
            .setDescription(`**Invalid usage** ! (Cannot be words only numbers) \`config setchanneldeletelimt number\``)
        return message.channel.send(errDeleteChannelLimit)
        }

        db.set(`deletechannellimite_${message.guild.id}`, deleteChannel)
        const deleteChannelLimit = new Discord.MessageEmbed()
            .setColor(message.guild.me.displayHexColor)
            .setDescription(`Done. Delete channel limit has been set to ${deleteChannel} ${emoji.check_mark}`)
        return message.channel.send(deleteChannelLimit)
    }

    if (cmd.toLowerCase() === 'setbanlimit') {

        let banLimite = args.slice(1).join(' ');
        if (!banLimite) {
        const errUserBanLimite = new Discord.MessageEmbed()
            .setColor(message.guild.me.displayHexColor)
            .setDescription(`**Invalid usage** ! \`config setbanlimit number\``)
        return message.channel.send(errUserBanLimite)
        }

        if(isNaN(banLimite)) {
        const errUserBanLimite = new Discord.MessageEmbed()
            .setColor(message.guild.me.displayHexColor)
            .setDescription(`**Invalid usage** ! (Cannot be words only numbers) \`config setbanlimit number\``)
        return message.channel.send(errUserBanLimite)
        }

        db.set(`userbanlimite_${message.guild.id}`, banLimite)
        const userbanLimite = new Discord.MessageEmbed()
            .setColor(message.guild.me.displayHexColor)
            .setDescription(`Done. User ban limit has been set to ${banLimite} ${emoji.check_mark}`)
        return message.channel.send(userbanLimite)
    }

    if (cmd.toLowerCase() === 'setkicklimit') {

        let kickLimite = args.slice(1).join(' ');
        if (!kickLimite) {
        const errUserKickLimite = new Discord.MessageEmbed()
            .setColor(message.guild.me.displayHexColor)
            .setDescription(`**Invalid usage** ! \`config setbanlimit number\``)
        return message.channel.send(errUserKickLimite)
        }

        if(isNaN(kickLimite)) {
        const errUserKickLimite = new Discord.MessageEmbed()
            .setColor(message.guild.me.displayHexColor)
            .setDescription(`**Invalid usage** ! (Cannot be words only numbers) \`config setbanlimit number\``)
        return message.channel.send(errUserKickLimite)
        }

        db.set(`userkicklimite_${message.guild.id}`, kickLimite)
        const userKickLimite = new Discord.MessageEmbed()
            .setColor(message.guild.me.displayHexColor)
            .setDescription(`Done. User ban limit has been set to ${kickLimite} ${emoji.check_mark}`)
        return message.channel.send(userKickLimite)
    }

    if (cmd.toLowerCase() === 'setantiraidlogs') {

        let logs = message.mentions.channels.first();
        if (!logs) {
        const errLogsAntiRaid = new Discord.MessageEmbed()
            .setColor(message.guild.me.displayHexColor)
            .setDescription(`Please, set the logs channel anti-raid logs \n\`config setantiraidlogs <#channelID>\``)
        return message.channel.send(errLogsAntiRaid)
        }

        logs.send(`**Anti-Raid logs Room**`)
        db.set(`logsraid_${message.guild.id}`, logs.id)
        let logsAntiRaid = new Discord.MessageEmbed()
            .setColor(message.guild.me.displayHexColor)
            .setDescription(`well done raid logs channel has been set to ${logs}`)
        return message.channel.send(logsAntiRaid)
        }
    }
}

exports.help = {
    name: 'config',
    description: 'config raid system',
    usage: 'config / config show',
    example: 'config / config show'
};
  
exports.conf = {
    aliases: [],
    cooldown: 5
};