
export default (req, res) => {
    res.statusCode = 200
    let memeList = ['https://i.imgur.com/0zbr4x1.jpeg', 'https://i.imgur.com/8BgAFWD.jpg', 'https://i.imgur.com/Lpgh4ef.png' ];
    let chosenMeme = Math.floor(Math.random() * 3);  
    res.json({ image: memeList[chosenMeme] })
  }