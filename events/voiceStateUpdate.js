const { Collection } = require('discord.js');
const voiceCollection = new Collection();
const db = require ('quick.db');

module.exports = async (client, oldState, newState) => {

    const user = await client.users.fetch(newState.id);
    const member = newState.guild.member(user);
    const joinCreate = db.get(`joinCreate_${newState.guild.id}.channel`)

    if (!oldState.channel && newState.channel.id === joinCreate) {
        const channel = await newState.guild.channels.create(user.username + `'s Channel`, {
            type: 'voice',
            parent: newState.channel.parent
        })
        member.voice.setChannel(channel)
        voiceCollection.set(user.id, channel.id)
    } else if (!newState.channel) {
        if (oldState.channelID === voiceCollection.get(newState.id)) 
        return oldState.channel.delete();
    }
}