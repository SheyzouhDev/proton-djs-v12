const { MessageEmbed } = require('discord.js');
const superagent = require ('superagent');

exports.run = async (client, message, args) => {

    if (message.channel.nsfw === true) {
		superagent
			.get("https://nekobot.xyz/api/image")
			.query({ type: "thigh" })
			.end((err, response, body) => {
				const thigh = new MessageEmbed()
                    .setColor(message.guild.me.displayHexColor)
					.setImage(response.body.message)
                message.channel.send(thigh);
			});
	} else {
		message.channel.send(new MessageEmbed()
            .setColor(message.guild.me.displayHexColor)
            .setDescription(`This channel is not NSFW`)
        );
	}
}

exports.help = {
    name: 'thigh',
    description: 'see porn thigh',
    usage: '-thigh',
    example: '-thigh'
};

exports.conf = {
    aliases: [],
    cooldown: 5
};