const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pee')
        .setDescription('PEEEEEEEEEEEEE'),
    async execute(interaction) {
        await interaction.reply('Piss! >:(')
    }
}