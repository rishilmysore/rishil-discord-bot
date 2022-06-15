// Rishil Mysore
// Rishil's Bot
// 6/6/2022
const {Client, Intents, Collection} = require('discord.js'); // Discord Library
const fs = require('fs'); // File System
const { getSound } = require("./sounds");
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
        //"GUILDS", "GUILD_MESSAGES", "GUILD_PRESENCES", "GUILD_MEMBERS", "GUILD_MESSAGE_REACTIONS", "GUILD_VOICE_STATES"
        Intents.FLAGS.GUILDS
    ]
    // autorun: true
});

client.commands = new Collection();

const functions = fs.readdirSync("./src/functions").filter(file => file.endsWith(".js"));
const events = fs.readdirSync("./src/events").filter(file => file.endsWith(".js"));
const commands = fs.readdirSync("./src/commands");

// client.on('ready', () => {
//     console.log('Rishil Bot is online!');
//     client.voice.serverDeaf;
//     //player = createAudioPlayer();
// });

(async () => {
    for (file of functions) {
        require(`./functions/${file}`)(client);
    }
    client.handleEvents(events, "./src/events");
    client.handleCommands(commands, "./src/commands");
    //client.login(process.env.token);
})();
client.login('OTgzMDU4MTM5NTc2NDIyNDgw.GCrga-.M2dV11wX1qdNJsPibgr5Bvxzq2ES6d5pSaaSWI');

// class SB {
//     constructor(options) {
//     }

//     async play(channel, sound) {
//         let Sound = getSound(sound)
//         if(!Sound) throw new TypeError("Invalid Sound.")
//         let connection = getVoiceConnection(channel.guild.id)
        
//         if(!connection) {
//           connection = joinVoiceChannel({
//             channelId: channel.id,
//             guildId: channel.guild.id,
//             adapterCreator: channel.guild.voiceAdapterCreator,
//           })
//         }
        
//         let player = createAudioPlayer()
//         let res = createAudioResource(path.join(__dirname, `./src/${Sound.file}`))
        
//         player.play(res)
//         connection.subscribe(player)
        
//         player.on(AudioPlayerStatus.Idle, () => {
//           connection.destroy()
//         })
//       }
      
//       getAllSounds() {
//         let array = []
        
//         fs.readdirSync(path.join(__dirname, "./src")).forEach(dir => {
          
//           let files = fs.readdirSync(path.join(__dirname, `./src/${dir}/`)).filter(f => f.endsWith(".mp4") || f.endsWith(".mp3"))
          
//           array.push({
//             category: dir,
//             sounds: []
//           })
          
//           let Arr = array.find(c => c.category === dir)
          
//           files.forEach(file => {
//             Arr.sounds.push(file.split(".")[0])
//           })
//         })
        
//         return array;
//       }
// }
// module.exports = SB

// client.on('messageCreate', async message => {
//     if (!message.content.startsWith(prefix) || message.author.bot) {
//         return;
//     }
    
//     const args = message.content.slice(prefix.length).split(/ +/);
//     const command = args.shift().toLowerCase();

//     if (command == 'poo' || command == 'poop') {
//         message.channel.send('Poo! :D')
//     }
//     if (command == 'pee' || command == 'piss') {
//         message.channel.send('Piss! >:(')
//     }
//     if (command == 'help' || command == 'h' || command == 'commands') {
//         const helpEmbed = {
//             color: 0x800000,
//             // title: 'Rishil Bot Help Page',
//             // url: 'https://discord.js.org',
//             author: {
//                 name: 'Rishil Bot Help Page',
//                 icon_url: 'https://imgur.com/bggmmdq.png',
//             },
//             description: 'Here are the available commands that you can use:',
//             thumbnail: {
//                 url: 'https://imgur.com/bggmmdq.png',
//             },
//             fields: [
//                 {
//                     name: 'Help Commands',
//                     value: '**.poo**: Sussy command\n**.pee**: 2nd sussy command',
//                 },
//                 {
//                     name: '\u200b',
//                     value: '\u200b',
//                     inline: false,
//                 },
//             ],
//             timestamp: new Date(),
//             footer: {
//                 text: '© Rishil Mysore',
//                 icon_url: 'https://i.imgur.com/bggmmdq.png',
//             },
//         };
//         message.channel.send({ embeds: [helpEmbed] });
//     }
//     if (command == 'play') {
//         let soundboard = new SB;
//         var channel = message.member.voice.channel;
//         soundboard.play(channel, "shortaughh");
//     }
//     if (command == 'soundboard' || command == 'sb') {
//         const soundBoardEmbed = {
//             color: 0x800000,
//             author: {
//                 name: 'Soundboard',
//                 icon_url: 'https://imgur.com/bggmmdq.png',
//             },
//             description: '<:musical_note:984537363189497876> Click on one of the following buttons to play a sound! <:musical_note:984537363189497876>',
//             timestamp: new Date(),
//             footer: {
//                 text: '© Rishil Mysore',
//                 icon_url: 'https://i.imgur.com/bggmmdq.png',
//             },
//         };

//         // Sounds
//         // const sound1 = new disbut.MessageButton()
//         // .setStyle('blue')
//         // .setLabel('No')
//         // .setDisabled('2')

//         // const soundLine = new disbut.MessageActionRow()
//         // .addComponent(sound1)

//         // message.channel.send({ 
//         //     embed: soundBoardEmbed,
//         //     component: soundLine
//         // });

//         const aughButton = new Discord.MessageButton()
//             .setStyle("PRIMARY")
//             .setLabel("AUGHHHH")
//             .setCustomId("aughButton")

//         const hehehehaButton = new Discord.MessageButton()
//             .setStyle("PRIMARY")
//             .setLabel("HEHEHEHAW")
//             .setCustomId("hehehehaButton")

//         const row = new Discord.MessageActionRow()
//         .addComponents(
//             aughButton, hehehehaButton,
//         );
        
//         message.channel.send({
//             embeds:[soundBoardEmbed], 
//             components: [row]
//         });
//     }
// });

// client.on('messageCreate', async message => {
//     // let soundboard = new SB;
//     // var channel = message.member.voice.channel;
//     // if(button.id === 'aughButton') {
//     //     soundboard.play(channel, "shortaughh");
//     // }
//     // button.reply.defer(); // Completes the message
//     console.log(message.applicationId);
// })