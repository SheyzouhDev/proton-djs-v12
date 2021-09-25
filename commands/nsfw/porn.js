const { MessageEmbed } = require('discord.js');
const superagent = require ('superagent');

exports.run = async (client, message, args) => {

    if (message.channel.nsfw === true) {
		superagent
			.get("https://nekobot.xyz/api/image")
			.query({ type: "pgif" })
			.end((err, response, body) => {
				const pgif = new MessageEmbed()
                    .setColor(message.guild.me.displayHexColor)
					.setImage(response.body.message)
                message.channel.send(pgif);
			});
	} else {
		message.channel.send(new MessageEmbed()
            .setColor(message.guild.me.displayHexColor)
            .setDescription(`This channel is not NSFW`)
        );
	}
}

exports.help = {
    name: 'porn',
    description: 'see porn gif',
    usage: '-porn',
    example: '-porn'
};

exports.conf = {
    aliases: [],
    cooldown: 5
};