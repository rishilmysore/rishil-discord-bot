const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
//const { token } = require('./config.json');
const fs = require('node:fs');

const clientId = '983058139576422480';
//const guildId = '408402594680012823'; 
// Remove this if you want it to be global: https://discordjs.guide/interactions/slash-commands.html#guild-commands
// https://discord.com/api/oauth2/authorize?client_id=983058139576422480&permissions=8&scope=applications.commands%20bot

module.exports = (client) => {
    client.handleCommands = async (commandFolders, path) => {
        client.commandArray = [];
        for (folder of commandFolders) {
            const commandFiles = fs.readdirSync(`${path}/${folder}`).filter(file => file.endsWith('.js'));
            for (const file of commandFiles) {
                const command = require(`../commands/${folder}/${file}`);
                // set a new item in the collection
                // with the key as the command name and the value as the exported module
                client.commands.set(command.data.name, command);
                client.commandArray.push(command.data.toJSON());
            }
        }

        const rest = new REST({ version: '9' }).setToken(process.env.token);

        (async () => {
            try {
                console.log('Started refreshing application (/) commands.');

                await rest.put(
                    Routes.applicationCommands(clientId),
                    { body: client.commandArray },
                );

                console.log('Successfully reloaded application (/) commands.');
            } 
            catch (error) {
                console.error(error);
            }
        })();
    }
}