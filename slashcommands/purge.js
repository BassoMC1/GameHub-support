

const run = async (client, interaction) => {
    if(!interaction.member.permissions.has('MANAGE_MESSAGES')) return interaction.reply({content: "You don't have `MANAGE_MESSAGES` permissions"}) 

    if(!interaction.guild.me.permissions.has('MANAGE_MESSAGES')) return interaction.reply({content: "i don't have `MANAGE_MESSAGES` permissions"})
    
    let amount = interaction.options.getInteger('amount')

    if(isNaN(amount)){
        return interaction.reply({content: "**Please specify a valid amount between 1 - 100!**", ephemeral: true })
    }
    if(parseInt(amount) > 100) {
        return interaction.reply({content: "** I can only delete 100 message once!**", ephemeral: true })
    }else{
        try{
        let { size } = await interaction.channel.bulkDelete(amount)
        await interaction.reply({content: `Deleted ${size} messages`, ephemeral: true })
        } catch(e){
            console.log(e)
            interaction.reply( {content: `I cannot delete messages that is older than 14 days!`, ephemeral: true })
        }
    }
    

}
    
module.exports = {
    name: "purge",
    description: "Purge en amount of message",
    perm: "MANAGE_MESSAGES",
    options: [
        {
            name: "amount",
            description: "Amount of message to delete",
            type: "INTEGER",
            required: true

        }
    ],run
}