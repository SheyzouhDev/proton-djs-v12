const Discord = require ('discord.js');
const Proton = require ('./handler/Client.js');
const client = new Proton({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });

const db = require ('quick.db');
const map = new Map();
const emoji = require ('./emoji.json')

require ('./handler/Module.js')(client);
require ('./handler/Event.js')(client)
require ('dotenv').config();
client.on('warn', console.warn);
client.on('error', console.error);
client.login(process.env.TOKEN).catch(console.error);


client.on('roleCreate', async role => {

    const user = await role.guild.fetchAuditLogs({
        type: 'ROLE_CREATE'
    }).then(audit => audit.entries.first())

    const entry = user.executor
    let trustedusers = db.get(`trustedusers_${role.guild.id}`)
    if (trustedusers && trustedusers.find(find => find.user == entry.id)) {
        return;
    }

    let author = db.get(`executer_${role.guild.id}_${entry.id}_rolecreate`)
    let limite = db.get(`createrolelimite_${role.guild.id}`)
    if (limite === null) {
        return;
    }

    let clogs = db.get(`logsraid_${role.guild.id}`)
    if (author > limite) {

    db.delete(`executer_${role.guild.id}_${entry.id}`)
    role.guild.members.ban(entry.id)
    let logs = new Discord.MessageEmbed()
        .setColor(role.guild.me.displayHexColor)
        .setDescription(`<@${entry.id}> was trying to raid but failed miserabely ! [Breaking Roles Create Limits]`)
    return client.channels.cache.get(clogs).send(logs)
    }

    db.add(`executer_${role.guild.id}_${role.guild.id}_rolecreate`, 1)
    let warn = db.get(`executer_${role.guild.id}_${entry.id}_rolecreate`)
    let log = new Discord.MessageEmbed()
        .setColor(role.guild.me.displayHexColor)
        .setDescription(`<@${entry.id}> is creating roles... [${warn || 0}/${author || 0}]`)
    return client.channels.cache.get(clogs).send(log)

})

client.on('roleDelete', async role => {

    const user = await role.guild.fetchAuditLogs({
        type: 'ROLE_DELETE'
    }).then(audit => audit.entries.first())

    const entry = user.executor
    let trustedusers = db.get(`trustedusers_${role.guild.id}`)
    if (trustedusers && trustedusers.find(find => find.user == entry.id)) {
        return;
    }

    let author = db.get(`executer_${role.guild.id}_${entry.id}_roledelete`)
    let limite = db.get(`createrolelimite_${role.guild.id}`)
    if (limite === null) {
        return;
    }

    let clogs = db.get(`logsraid_${role.guild.id}`)
    if (author > limite) {

    db.delete(`executer_${role.guild.id}_${entry.id}`)
    role.guild.members.ban(entry.id)
    let logs = new Discord.MessageEmbed()
        .setColor(role.guild.me.displayHexColor)
        .setDescription(`<@${entry.id}> was trying to raid but failed miserabely ! [Breaking Roles Delete Limits]`)
    return client.channels.cache.get(clogs).send(logs)
    }

    db.add(`executer_${role.guild.id}_${entry.id}_roledelete`, 1)
    let warn = db.get(`executer_${role.guild.id}_${entry.id}_roledelete`)
    let log = new Discord.MessageEmbed()
        .setColor(role.guild.me.displayHexColor)
        .setDescription(`<@${entry.id}> is deleting roles... [${warn || 0}/${author || 0}]`)
    return client.channels.cache.get(clogs).send(log)
})

client.on('channelCreate', async channel => {

    const user = await channel.guild.fetchAuditLogs({
        type: 'CHANNEL_CREATE'
    }).then(audit => audit.entries.first())

    const entry = user.executor
    let trustedusers = db.get(`trustedusers_${channel.guild.id}`)
    if(trustedusers && trustedusers.find(find => find.user == entry.id)) {
        return;
    }

    let author = db.get(`executer_${channel.guild.id}_${entry.id}_channelcreate`)
    let limite = db.get(`createchannellimite_${channel.guild.id}`)
    if(limite === null) {
        return;
    }

    let clogs = db.get(`logsraid_${channel.guild.id}`)
    if (author > limite) {
        
    db.delete(`executer_${channel.guild.id}_${entry.id}`)
    channel.guild.members.ban(entry.id)
    let logs = new Discord.MessageEmbed()
    .setColor(channel.guild.me.displayHexColor)
        .setDescription(`<@${entry.id}> was trying to raid but failed miserabely ! [Breaking Channel Create Limit]`)
    return client.channels.cache.get(clogs).send(logs)
    }

    db.add(`executer_${channel.guild.id}_${entry.id}_channelcreate`, 1)
    let warn = db.get(`executer_${channel.guild.id}_${entry.id}_channelcreate`)
    let log = new Discord.MessageEmbed()
        .setColor(channel.guild.me.displayHexColor)
        .setDescription(`<@${entry.id}> is creating channel... [${warn || 0}/${author || 0}]`)
    return client.channels.cache.get(clogs).send(log)
})

client.on('channelDelete', async channel => {

    const user = await channel.guild.fetchAuditLogs({
        type: 'CHANNEL_DELETE'
    }).then(audit => audit.entries.first())

    const entry = user.executor
    let trustedusers = db.get(`trustedusers_${channel.guild.id}`)
    if(trustedusers && trustedusers.find(find => find.user == entry.id)) {
        return;
    }

    let author = db.get(`executer_${channel.guild.id}_${entry.id}_channeldelete`)
    let limite = db.get(`deletechannellimite_${channel.guild.id}`)
    if(limite === null) {
        return;
    }

    let clogs = db.get(`logsraid_${channel.guild.id}`)
    if (author > limite) {
        
    db.delete(`executer_${channel.guild.id}_${entry.id}`)
    channel.guild.members.ban(entry.id)
    let logs = new Discord.MessageEmbed()
        .setColor(channel.guild.me.displayHexColor)
        .setDescription(`<@${entry.id}> was trying to raid but failed miserabely ! [Breaking Channel Delete Limit]`)
    return client.channels.cache.get(clogs).send(logs)
    }

    db.add(`executer_${channel.guild.id}_${entry.id}_channeldelete`, 1)
    let warn = db.get(`executer_${channel.guild.id}_${entry.id}_channeldelete`)
    let log = new Discord.MessageEmbed()
        .setColor(channel.guild.me.displayHexColor)
        .setDescription(`<@${entry.id}> is deleting channel... [${warn || 0}/${author || 0}]`)
    return client.channels.cache.get(clogs).send(log)
})

client.on('guildMemberRemove', async member => {

    const entry1 = await member.guild.fetchAuditLogs()
    .then(audit => audit.entries.first())

    //if (audit.executor.id === '857782439647510548') return;

    if (entry1.action === 'MEMBER_KICK') {
        const entry2 = await member.guild.fetchAuditLogs({
            type: 'MEMBER_KICK'
        }).then(audit => audit.entries.first())

        const entry = entry2.executor;
        let trustedusers = db.get(`trustedusers_${member.guild.id}`)
        if(trustedusers && trustedusers.find(find => find.user == entry.id)) {
            return;
        }

        let author = db.get(`executer_${member.guild.id}_${entry.id}_kicklimit`)
        let limite = db.get(`userkicklimite_${member.guild.id}`)
        if(limite === null) {
            return;
        }

        let clogs = db.get(`logsraid_${member.guild.id}`)
        if (author > limite) {
        
        db.delete(`executer_${member.guild.id}_${entry.id}`)
        member.guild.members.ban(entry.id)
        let logs = new Discord.MessageEmbed()
            .setColor(channel.guild.me.displayHexColor)
            .setDescription(`<@${entry.id}> was trying to raid but failed miserabely ! [Breaking kicking Members Limit]`)
        return client.channels.cache.get(clogs).send(logs)
        }

    db.add(`executer_${member.guild.id}_${entry.id}_kicklimit`, 1)
    let warn = db.get(`executer_${member.guild.id}_${entry.id}_kicklimit`)
    let log = new Discord.MessageEmbed()
        .setColor(channel.guild.me.displayHexColor)
        .setDescription(`<@${entry.id}> is kicking channel... [${warn || 0}/${author || 0}]`)
    return client.channels.cache.get(clogs).send(log)
    }
})

client.on('guildMemberRemove', async member => {

    const entry1 = await member.guild.fetchAuditLogs()
    .then(audit => audit.entries.first())

    if (entry1.action === 'MEMBER_BAN_ADD') {
        const entry2 = await member.guild.fetchAuditLogs({
            type: 'MEMBER_BAN_ADD'
        }).then(audit => audit.entries.first())

        const entry = entry2.executor;
        let trustedusers = db.get(`trustedusers_${member.guild.id}`)
        if(trustedusers && trustedusers.find(find => find.user == entry.id)) {
            return;
        }

        let author = db.get(`executer_${member.guild.id}_${entry.id}_banlimit`)
        let limite = db.get(`userbanlimite_${member.guild.id}`)
        if(limite === null) {
            return;
        }

        let clogs = db.get(`logsraid_${member.guild.id}`)
        if (author > limite) {
        
        db.delete(`executer_${member.guild.id}_${entry.id}`)
        member.guild.members.ban(entry.id)
        let logs = new Discord.MessageEmbed()
            .setColor(channel.guild.me.displayHexColor)
            .setDescription(`<@${entry.id}> was trying to raid but failed miserabely ! [Breaking Banning Members Limit]`)
        return client.channels.cache.get(clogs).send(logs)
        }

    db.add(`executer_${member.guild.id}_${entry.id}_banlimit`, 1)
    let warn = db.get(`executer_${member.guild.id}_${entry.id}_banlimit`)
    let log = new Discord.MessageEmbed()
        .setColor(member.guild.me.displayHexColor)
        .setDescription(`<@${entry.id}> is banning member... [${warn || 0}/${author || 0}]`)
    return client.channels.cache.get(clogs).send(log)
    }
})

client.on('message', async (message, guild) => {

    if(map.has(message.author.id)) {
        const data = map.get(message.author.id)
        const { lastMessage, timer } = data;
        const diff = message.createdTimestamp - lastMessage.createdTimestamp;
        let msgs = data.msgs
        if(diff > 2000) {
            clearTimeout(timer);
            data.msgs = 1;
            data.lastMessage = message;
            data.timer = setTimeout(() => {
                map.delete(message.author.id);
            }, 5000)
            map.set(message.author.id, data)
        } else {

            const lvl = db.get(`antispam_${message.guild.id}.value`)
            ++msgs
            if(parseInt(msgs) === lvl) {
                const roleName = 'Muted';
                const role = message.guild.roles.cache.find(roles => roles.name.toLowerCase() == roleName.toLowerCase())
                if (!role) return message.channel.send(new Discord.MessageEmbed()
                    .setColor(message.guild.me.displayHexColor)
                    .setDescription(`Please, create or rename your mute role to **Muted** ${emoji.wrong}`)
                )
                message.member.roles.add(role)
                message.channel.send(new Discord.MessageEmbed()
                    .setColor(message.guild.me.displayHexColor)
                    .setDescription(`<@${message.author.id}> has been muted by **automod** successfully ${emoji.check_mark}`)
                )
                setTimeout(() => {
                    message.member.roles.remove(role)
                    message.channel.send(new Discord.MessageEmbed()
                        .setColor(message.guild.me.displayHexColor)
                        .setDescription(`<@${message.author.id}> has been unmuted successfully ${emoji.check_mark}`)
                    )
                }, 5000)
            } else {
                data.msgs = msgs;
                map.set(message.author.id, data)
            }
        } 
    } else {
        let remove = setTimeout(() => {
            map.delete(message.author.id)
        }, 5000)
        map.set(message.author.id, {
            msgs: 1,
            lastMessage: message,
            timer: remove
        })
    }
})
