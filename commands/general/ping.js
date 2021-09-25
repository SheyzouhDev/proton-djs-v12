module.exports.run = async (client, message ,args) => {

    if(!message.guild.member(message.author).hasPermission('SEND_MESSAGES')) return message.channel.send(`You can't use this command`);

    let ping = Date.now();
    await message.channel.send(`Ping en cours ...`).then(async(m) => await m.edit(`Ping : ${Date.now() - ping} ms`));
};

exports.help = {
    name: 'ping',
    description: 'view latency Proton',
    usage: 'ping',
    example: 'ping'
};

exports.conf = {
    aliases: [],
    cooldown: 5
};