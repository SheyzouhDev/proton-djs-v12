module.exports = async client => {
    
    console.log(`[${client.user.tag}] connected with successfully ✅`)

    let activities = [`-help`, `🌎 ${client.guilds.cache.size} servers`, `👤 ${client.users.cache.size} members`], i = 0;

    setInterval(() => {
        client.user.setActivity(`${activities[i++ % activities.length]}`, { type: 'WATCHING' })
    }, 5000)
}