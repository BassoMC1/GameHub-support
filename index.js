const Discord = require('discord.js');
const Canves = require('canvas')
require("dotenv").config()




const client = new Discord.Client({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES",
        "GUILD_MEMBERS"
    ]
})

let bot = {
    client,
    prefix: "!!",
    owners: ["317730229760163855"]
}

client.commands =  new Discord.Collection()
client.events = new Discord.Collection()
client.slashcommands = new Discord.Collection()


client.loadEvents = (bot, reload) => require("./handlers/events")(bot, reload)
client.loadCommands = (bot, reload) => require("./handlers/commands")(bot, reload)
client.loadSlashCommands = (bot, reload) => require("./handlers/slashcommands")(bot, reload)


client.loadEvents(bot, false)
client.loadCommands(bot, false)
client.loadSlashCommands(bot, false)


client.on("interactionCreate", (interaction) =>{
    if (!interaction.isCommand()) return
    if (!interaction.inGuild()) return interaction.reply("This command can only be used in a server.")

    const slashcmd = client.slashcommands.get(interaction.commandName)

    if (!slashcmd) return interaction.reply("Invalid slash command")
    
    if (slashcmd.perms && !interaction.member.permissions.has(slashcmd.perms)) 
    return interaction.reply("You do not have permission for this command.")

    slashcmd.run(client, interaction)

})

module.exports = bot

const background = "https://cdn.discordapp.com/attachments/955533793362587698/958432986364280882/unknown.png"

const dim = {
    height: 675,
    width: 1200,
    margin: 50
}


const av = {
    size: 256,
    x: 480,
    y: 170
}

client.on("guildMemberAdd", async (member, guild) => {
    let username = member.user.username
    let discrim = member.user.discriminator
    let avatarURL = member.user.displayAvatarURL({format: "png", dynamic: false, size: av.size})

    const canvas = Canves.createCanvas(dim.width, dim.height)
    const ctx = canvas.getContext("2d")

    // draw in the background
    const backimg = await Canves.loadImage(background)
    ctx.drawImage(backimg, 0,0)

    // draw black tinted box
    ctx.fillStyle = "rgba(0,0,0,0.8)"
    ctx.fillRect(dim.margin, dim.margin, dim.width -2 * dim.margin, dim.height -2 * dim.margin)

    const avimg = await Canves.loadImage(avatarURL)
    ctx.save()

    ctx.beginPath()
    ctx.arc(av.x + av.size / 2, av.y + av.size / 2, av.size / 2, 0, Math.PI * 2, true)
    ctx.closePath()
    ctx.clip()

    ctx.drawImage(avimg, av.x, av.y)
    ctx.restore()

    // write in text
    ctx.fillStyle = "white"
    ctx.textAlign = "center"

    // draw in welcome
    ctx.font ="50px Arial"
    ctx.fillText("welcome", dim.width/2, dim.margin + 70)

    //draw
    ctx.font ="60px Arial"
    ctx.fillText(username + "#" + discrim, dim.width/2, dim.height -dim.margin - 125)

    // draw in to the server
    ctx.font ="40px Arial"
    text = `Member #${member.guild.memberCount}`
    ctx.fillText(text, dim.width / 2, dim.height -dim.margin - 50)

    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), "welcome.png")
    client.channels.cache.get('961188787088674847').send({
        content: `<@${member.id}> welcome to the server`,
        files: [attachment]
    })
})
    


client.login(process.env.TOKEN)