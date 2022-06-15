const {SlashCommandBuilder} = require('@discordjs/builders');
const {MessageActionRow, MessageButton} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('sb')
    .setDescription('Soundboard for playing various sounds.'),
    async execute(interaction, client) {
        const soundBoardEmbed = {
            color: 0x800000,
            author: {
                name: 'Soundboard',
                icon_url: 'https://imgur.com/bggmmdq.png',
            },
            description: '<:musical_note:984537363189497876> Click on one of the following buttons to play a sound! <:musical_note:984537363189497876>',
            // timestamp: new Date(),
            // footer: {
            //     text: '© Rishil Mysore',
            //     icon_url: 'https://i.imgur.com/bggmmdq.png',
            // },
        };

        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('AUGH-button')
                    .setLabel('AUGHHHHH')
                    .setStyle('PRIMARY'),
                new MessageButton()
                    .setCustomId('HEHEHEHAW-button')
                    .setLabel('HEHEHEHAW')
                    .setStyle('PRIMARY'),
                new MessageButton()
                    .setCustomId('gigachad-button')
                    .setLabel('Gigachad')
                    .setStyle('PRIMARY'),
                new MessageButton()
                    .setCustomId('discordjoin-button')
                    .setLabel('Join')
                    .setStyle('PRIMARY'),
                new MessageButton()
                    .setCustomId('bong-button')
                    .setLabel('Bong')
                    .setStyle('PRIMARY'),
            );
            await interaction.reply({embeds: [soundBoardEmbed], components: [row]});
    },
};