const {MessageEmbed} = require("discord.js"); 

const run = async (client, interaction, options) => {
    const user = interaction.options.getUser('target')

    const embed = new MessageEmbed()
        .setTitle(`${user.username}'s Avatar`)
        .setColor('BLUE')
        .setImage(user.displayAvatarURL({
            dynamic: true,
            size: 1024
        }))
        .setDescription(`[Png](${user.avatarURL({format: 'png' })}) | [Webp](${user.avatarURL({dynamic: true})}) | [Jpg](${user.avatarURL({format: 'jpg'})})`)

    await interaction.reply({
        embeds: [embed]
    });
}   

module.exports = {
    name: "avatar",
    description: "Shows users avatar",
    options: [
        {
            name: "target", 
            type: "USER",
            description: "select a user", 
            required: true,
        }
    ],run
}