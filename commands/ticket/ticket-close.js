exports.run = async (client, message, args) => {

    if(!message.guild.member(message.author).hasPermission('MANAGE_CHANNELS')) return message.channel.send(`You can't use this command`);

    if (message.channel.name.startsWith('ticket-')) {
        message.channel.send(`Deleting ticket in 10 seconds...`);
        setTimeout(() => {
            message.channel.delete();
        }, 10000)
    } else {
        message.channel.send(`HopHopHop, You can't use this command here`)
    }
}

exports.help = {
    name: 'ticket-close',
    description: 'ticket-close',
    usage: 'ticket-close',
    example: 'ticket-close'
};
  
exports.conf = {
    aliases: ['cticket'],
    cooldown: 5
};