module.exports = {
    name: "ping",
    category: "info",
    premissions: [],
    devOnly: false,
    run: async ({client, message, args}) => {
        message.reply("Pong")
        
    }
}