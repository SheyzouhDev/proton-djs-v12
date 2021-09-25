const { MessageEmbed } = require('discord.js');
const superagent = require ('superagent');

exports.run = async (client, message, args) => {

    if (message.channel.nsfw === true) {
		superagent
			.get("https://nekobot.xyz/api/image")
			.query({ type: "boobs" })
			.end((err, response, body) => {
				const anal = new MessageEmbed()
                    .setColor(message.guild.me.displayHexColor)
					.setImage(response.body.message)
                message.channel.send(anal);
			});
	} else {
		message.channel.send(new MessageEmbed()
            .setColor(message.guild.me.displayHexColor)
            .setDescription(`This channel is not NSFW`)
        );
	}
}

exports.help = {
    name: 'boobs',
    description: 'see anal',
    usage: '-anal',
    example: '-anal'
};

exports.conf = {
    aliases: [],
    cooldown: 5
};