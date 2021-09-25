const { MessageEmbed } = require('discord.js');
const superagent = require ('superagent');

exports.run = async (client, message, args) => {

    if (message.channel.nsfw === true) {
		superagent
			.get("https://nekobot.xyz/api/image")
			.query({ type: "ass" })
			.end((err, response, body) => {
				const ass = new MessageEmbed()
                    .setColor(message.guild.me.displayHexColor)
					.setImage(response.body.message)
                message.channel.send(ass);
			});
	} else {
		message.channel.send(new MessageEmbed()
            .setColor(message.guild.me.displayHexColor)
            .setDescription(`This channel is not NSFW`)
        );
	}
}

exports.help = {
    name: 'ass',
    description: 'see ass',
    usage: '-ass',
    example: '-ass'
};

exports.conf = {
    aliases: [],
    cooldown: 5
};