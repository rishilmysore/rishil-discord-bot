const { getSound } = require("./sounds")
const fs = require("fs")
const { createAudioResource, getVoiceConnection, createAudioPlayer, joinVoiceChannel, AudioPlayerStatus } = require("@discordjs/voice")
const path = require("path")

class SoundBoard {
  constructor(options) {

  }

  async play(channel, sound) {
    
    let Sound = getSound(sound)
    
    if(!Sound) throw new TypeError("Invalid Sound.")
    
    let connection = getVoiceConnection(channel.guild.id) // Checks to see if there is an existing voice connection already
    
    if(!connection) { // If not, then create one
      connection = joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator,
      })
    }
    
    let player = createAudioPlayer()
    let res = createAudioResource(path.join(__dirname, `../sfxs/${Sound.file}`))
    player.play(res)
    connection.subscribe(player)
    
    // player.on(AudioPlayerStatus.Idle, () => {
    //   connection.destroy()
    // })
    player.on(channel.members.size === 1, () => { // Change to leave when no more members are on the voice channel
      connection.destroy()
    })
  }
  
  getAllSounds = async() => {
    let array = []
    
    fs.readdirSync(path.join(__dirname, "../sfxs")).forEach(dir => {
      
      let files = fs.readdirSync(path.join(__dirname, `../sfxs/${dir}/`)).filter(f => f.endsWith(".mp4") || f.endsWith(".mp3"))
      
      array.push({
        category: dir,
        sounds: []
      })
      
      let Arr = array.find(c => c.category === dir)
      
      files.forEach(file => {
        Arr.sounds.push(file.split(".")[0])
      })
    })
    
    return array;
  }
}

module.exports = SoundBoard