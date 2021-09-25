const { MessageEmbed } = require('discord.js');
const superagent = require ('superagent');

exports.run = async (client, message, args) => {

    if (message.channel.nsfw === true) {
		superagent
			.get("https://nekobot.xyz/api/image")
			.query({ type: "pussy" })
			.end((err, response, body) => {
				const pussy = new MessageEmbed()
                    .setColor(message.guild.me.displayHexColor)
					.setImage(response.body.message)
                message.channel.send(pussy);
			});
	} else {
		message.channel.send(new MessageEmbed()
            .setColor(message.guild.me.displayHexColor)
            .setDescription(`This channel is not NSFW`)
        );
	}
}

exports.help = {
    name: 'pussy',
    description: 'see pussy',
    usage: '-pussy',
    example: '-pussy'
};

exports.conf = {
    aliases: [],
    cooldown: 5
};