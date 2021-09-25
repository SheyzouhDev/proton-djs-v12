const { MessageEmbed } = require('discord.js');
const superagent = require ('superagent');

exports.run = async (client, message, args) => {

    let msg = await message.channel.send(`Generating cat`);
    let {body} = await superagent.get(`http://aws.random.cat/meow`);

    if(!{body}) return message.channel.send(`Try again later`)

    let cat = new MessageEmbed()
        .setColor(message.guild.me.displayHexColor)
        .setImage(body.file)

    message.delete();
    msg.delete();
    message.channel.send(cat);

}

exports.help = {
    name: 'cat',
    description: 'help',
    usage: 'help',
    example: 'help'
};
  
exports.conf = {
    aliases: [],
    cooldown: 5
};