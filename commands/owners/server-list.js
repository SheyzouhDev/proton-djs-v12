const Discord = require ('discord.js');

exports.run = async (client, message, args) => {

    if (!client.settings.owners.includes(message.author.id)) return message.channel.send(`You can't use this command`);

    let i0 = 0;
	let i1 = 10;
	let page = 1;

	let description = 
        `Total server : ${client.guilds.cache.size} \n\n ` + client.guilds.cache.sort((a,b) => b.memberCount-a.memberCount).map((r) => r).map((r, i) => `**${i + 1}** - ${r.name} | \`${r.id}\` | ${r.memberCount} `).slice(0, 10).join("\n");

		const embed = new Discord.MessageEmbed()
			.setAuthor('Server list', client.user.displayAvatarURL({ size: 512, dynamic: true, format: 'png' }))
			.setColor(message.guild.me.displayHexColor)
            .setDescription(description)
			.setFooter(client.user.username, client.user.displayAvatarURL())
            .setTimestamp()
			.setTitle(`${page}/${Math.ceil(client.guilds.cache.size/10)}`)

		const msg = await message.channel.send(embed);
        
		await msg.react("⬅");
		await msg.react("➡");
		await msg.react("❌");

		const collector = msg.createReactionCollector((reaction, user) => user.id === message.author.id);

		collector.on("collect", async(reaction) => {

		if(reaction._emoji.name === "⬅") {

			i0 = i0-10;
			i1 = i1-10;
			page = page-1;

			if(i0 < 0){
				return msg.delete();
			}
			if(!i0 || !i1){
				return msg.delete();
			}
                
			description = `${client.guilds.cache.size}\n\n`+
			client.guilds.cache.sort((a,b) => b.memberCount-a.memberCount).map((r) => r)
				.map((r, i) => `**${i + 1}** - ${r.name} | ${r.memberCount} `)
				.slice(i0, i1)
				.join("\n");

			embed.setTitle(`${page}/${Math.round(client.guilds.cache.size/10)}`)
				.setDescription(description);
            
			msg.edit(embed);
            
		}

			if(reaction._emoji.name === "➡"){

			i0 = i0+10;
			i1 = i1+10;
			page = page+1;

			if(i1 > client.guilds.cache.size + 10){
				return msg.delete();
			}
			if(!i0 || !i1){
				return msg.delete();
			}

			description = `${client.guilds.cache.size}\n\n`+
			client.guilds.cache.sort((a,b) => b.memberCount-a.memberCount).map((r) => r)
				.map((r, i) => `**${i + 1}** - ${r.name} | ${r.memberCount} `)
				.slice(i0, i1)
				.join("\n");

			embed.setTitle(`${page}/${Math.round(client.guilds.cache.size/10)}`)
				.setDescription(description);

			msg.edit(embed);

		}

		if(reaction._emoji.name === "❌"){
			return msg.delete(); 
		}

		await reaction.users.remove(message.author.id);

	});
}

exports.help = {
    name: 'server-list',
    description: 'set blacklist guild',
    usage: 'blacklist <add or remove> <#guildID>',
    example: 'blacklist add 815600570203242506 \nremove 815600570203242506'
};

exports.conf = {
    aliases: ['slist'],
    cooldown: 5
};