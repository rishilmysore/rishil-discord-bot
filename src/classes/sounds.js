const fs = require("fs")
const path = require("path")
module.exports = {
  getSound(sound) {
    let array = []
    
    fs.readdirSync(path.join(__dirname, "../sfxs/")).forEach(dir =>
    {
      let files = fs.readdirSync(path.join(__dirname, `../sfxs/${dir}/`)).filter(f => f.endsWith(".mp4") || f.endsWith(".mp3"))
      
      files.forEach(file => {
        array.push({
          name: file.split(".")[0],
          file: `${dir}/${file}`
        })
      })
    })
    
    let Sound = array.find(c => c.name === sound)
    return (Sound ? Sound : false)
  }
}