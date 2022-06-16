const wait = require('node:timers/promises').setTimeout;
const SoundBoard = require('../classes/sb.js');
const { createAudioResource, getVoiceConnection, createAudioPlayer, joinVoiceChannel, AudioPlayerStatus } = require("@discordjs/voice")

module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        if (interaction.isCommand()) { // Valid Commands
            if (!interaction.isCommand()) return;
            
            const command = client.commands.get(interaction.commandName);
            if (!command) return;

            try {
                await command.execute(interaction, client);
            }
            catch (error) {
                console.error(error);
                await interaction.reply({
                    content: 'Uh oh, there was an error trying to execute this command.',
                    ephemeral: true // only to you
                });
            }
        }
        else if (interaction.isButton()) { // Button Pressing
            if (interaction.customId.includes('-button')) {
                // console.log(interaction.member.voice.channel);
                let channel = interaction.member.voice.channel;
                let sb = new SoundBoard
                if (!channel) {
                    await interaction.reply({ephemeral: true, content: 'Bro, join the voice channel instead of being a creep...'}) 
                }
                else {
                    if (interaction.customId.includes('AUGH')) {
                        await interaction.reply({content: 'Playing: AUGHHHHHH'});
                        await sb.play(channel, "shortaughh");
                    }
                    else if (interaction.customId.includes('HEHEHEHAW')) {
                        await interaction.reply({content: 'Playing: HEHEHEHAW'});
                        await sb.play(channel, "heheheha");
                    }
                    else if (interaction.customId.includes('gigachad')) {
                        await interaction.reply({content: 'Playing: Gigachad'});
                        await sb.play(channel, "gigachad");
                    }
                    else if (interaction.customId.includes('discordjoin')) {
                        await interaction.reply({content: 'Playing: Join'});
                        await sb.play(channel, "discord-sounds");                        
                    }
                    else if (interaction.customId.includes('bong')) {
                        await interaction.reply({content: 'Playing: Bong'});
                        await sb.play(channel, "taco-bell-bong-sfx");
                    }
                    //await wait(500);
                    await interaction.deleteReply();
                }
            }
        }
    }
}