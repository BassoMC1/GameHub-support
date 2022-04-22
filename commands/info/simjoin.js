module.exports = {
    name: "simjoin",
    category: "info",
    premissions: ['ADMINISTRATOR'],
    run: async ({client, message, args, text}) => {
        client.emit('guildMemberAdd', message.member)
        
    },
}