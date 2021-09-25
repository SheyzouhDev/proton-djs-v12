const db = require ('quick.db');

exports.run = async (client, message, args) => {

    if(!message.guild.member(message.author).hasPermission('SEND_MESSAGES')) return message.channel.send(`You can't use this command`);

    const ticket = db.get(`ticket_${message.guild.id}.toggle`);
    if (!ticket) return message.channel.send('Please wait, the category for create ticket is not defined done \`-setup-ticket enable <#categoryID>\`');

    const channel = message.guild.channels.cache.find(c => c.name === 'ticket-'+message.author.id);
    if (channel) return message.channel.send(`You already have a ticket open : <#${channel.id}>`);
    message.guild.channels.create('ticket-'+message.author.id, {
        type: 'text',
        parent: db.get(`ticket_${message.guild.id}.channel`),
        permissionOverwrites: [
            {
                id: message.guild.id,
                deny: ['VIEW_CHANNEL']
            },
            {
                id: message.author.id,
                allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES']
            }
        ]
    }).then(async channel => {
        channel.send(`<@${message.author.id}> welcome to your ticket`);
    })

    setTimeout(() => {
        message.delete()
    }, 5000)
}

exports.help = {
    name: 'ticket',
    description: 'create ticket',
    usage: 'ticket',
    example: '-ticket'
};
  
exports.conf = {
    aliases: [],
    cooldown: 300
};