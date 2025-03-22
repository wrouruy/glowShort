const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
const token = 'XXXXXXXXXXXXXXXXX';
const bot = new TelegramBot(token, { polling: true });

async function shortenUrl(longUrl) {
    const accessToken = "a4b655f0bc95961b7971838375aa2d6508520f8c";
    const response = await axios.post(
        "https://api-ssl.bitly.com/v4/shorten",
        { long_url: longUrl },
        {
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            }
        }
    );
    
    return response.data.link;
}

bot.on('message', (msg) => {
    const text = msg.text
    if(text === '/start'){
        bot.sendMessage(msg.chat.id, `Hello, ${msg.chat.first_name}👋`);
    } else {
        if(!text.startsWith('http://') && !text.startsWith('https://')){
            bot.sendMessage(msg.chat.id, 'This is not a URL');
            return;
        }
        shortenUrl(text)
            .then(data => {
                bot.sendMessage(msg.chat.id, 'Your shortner bitly URL:\n' + data);
            })
    }
})
