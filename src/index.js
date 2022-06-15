// Rishil Mysore
// Rishil's Bot
// 6/6/2022
const {Client, Intents, Collection} = require('discord.js'); // Discord Library
const fs = require('fs'); // File System
const { joinVoiceChannel, getVoiceConnection, createAudioPlayer, createAudioResource, entersState, VoiceConnectionStatus, NoSubscriberBehavior, StreamType, AudioPlayerStatus } = require("@discordjs/voice");
const path = require("path");
const prefix = '.';
require('dotenv').config();

const client = new Client({ 
    allowedMentions: {
        parse: [`users`, `roles`],
        repliedUser: true,
    },

    intents: [
        "GUILDS", "GUILD_MESSAGES", "GUILD_PRESENCES", "GUILD_MEMBERS", "GUILD_MESSAGE_REACTIONS", "GUILD_VOICE_STATES"
        //Intents.FLAGS.GUILDS
    ]
    // autorun: true
});

client.commands = new Collection();

const functions = fs.readdirSync("./src/functions").filter(file => file.endsWith(".js"));
const events = fs.readdirSync("./src/events").filter(file => file.endsWith(".js"));
const commands = fs.readdirSync("./src/commands");

(async () => {
    for (file of functions) {
        require(`./functions/${file}`)(client);
    }
    client.handleEvents(events, "./src/events");
    client.handleCommands(commands, "./src/commands");
    client.login(process.env.token);
})();