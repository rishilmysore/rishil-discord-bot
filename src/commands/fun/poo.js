const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('poo')
        .setDescription('POOOOOOOOOOOO'),
    async execute(interaction) {
        await interaction.reply('Poo! :D')
    }
}