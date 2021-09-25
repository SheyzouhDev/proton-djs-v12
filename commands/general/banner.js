const { MessageEmbed } = require("discord.js");

exports.run = async (client, message, args) => {

    async function getUserBannerUrl(userId) {
        const user = await client.api.users(userId).get();
        return user.banner ? `https://cdn.discordapp.com/banners/${userId}/${user.banner}?size=512` : null;
    }
    
        let mentionedUser = message.mentions.users.first() || client.users.resolve(args[0]) || message.author;
     
        const bannerUrl = await getUserBannerUrl(mentionedUser.id, { size: 4096 });
        if(!bannerUrl && mentionedUser === message.author) return message.channel.send(`Tu ne possède pas de bannière !`)
        if(!bannerUrl && mentionedUser !== message.author) return message.channel.send(`**${mentionedUser.username}#${mentionedUser.discriminator}** ne possède pas de bannière !`)
    
        let bannerembed = new MessageEmbed()
      .setImage(bannerUrl)
      .setTimestamp()
      .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
      .setDescription([`Bannière de **${mentionedUser.username}#${mentionedUser.discriminator}**
      `+`L'Image ne s'affiche pas ? [Clique Ici](` + bannerUrl + `)`]);
    
      message.channel.send(bannerembed)
}

exports.help = {
    name: 'banner',
    description: 'see banner',
    usage: '-banner @user',
    example: '-banner sнεүzααα#0001'
};

exports.conf = {
    aliases: [],
    cooldown: 5
};