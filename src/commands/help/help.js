const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('A list of available commands.'),
    async execute(interaction) {
        const helpEmbed = {
            color: 0x800000,
            // title: 'Rishil Bot Help Page',
            // url: 'https://discord.js.org',
            author: {
                name: 'Rishil Bot Help Page',
                icon_url: 'https://imgur.com/bggmmdq.png',
            },
            description: 'Here are the available commands that you can use:',
            thumbnail: {
                url: 'https://imgur.com/bggmmdq.png',
            },
            fields: [
                {
                    name: '-----------------------------------------------------------------',
                    value: '**.poo**: Sussy command\n**.pee**: 2nd sussy command',
                },
                {
                    name: '\u200b',
                    value: '\u200b',
                    inline: false,
                },
            ],
            timestamp: new Date(),
            footer: {
                text: '© Rishil Mysore',
                icon_url: 'https://i.imgur.com/bggmmdq.png',
            },
        };
        await interaction.reply({embeds: [helpEmbed]});
    }
}