module.exports = {
    name: "ready",
    run: async (bot) => {
        console.log("Loged in as " + bot.client.user.tag)
    }
}