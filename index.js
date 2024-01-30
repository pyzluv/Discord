const Discord = require('discord.js-selfbot-v13');
const client = new Discord.Client({
  readyStatus: false,
  checkUpdate: false
});

const keepAlive = require('./server.js');
keepAlive();

function formatTime() { //Credits to himika#0001 and never#0001
  const date = new Date();
  const options = {
    timeZone: 'Europe/Berlin', //https://www.zeitverschiebung.net/en/ and find your city and enter here
    hour12: true,
    hour: 'numeric',
    minute: 'numeric'
  };
  return new Intl.DateTimeFormat('en-US', options).format(date);
}

client.on('ready', async () => {
  console.clear();
  console.log(`${client.user.tag} - rich presence started!`);

  const r = new Discord.RichPresence()
    .setApplicationId('1111630976557264936')
    .setType('STREAMING')
    .setURL('https://www.twitch.tv/developer') //Must be a youtube video link 
    .setState('decay')
    .setName('for 2.867 viewers')
    .setDetails(`for 2.867 viewers [${formatTime()}]`)
    .setStartTimestamp(Date.now())
 .setAssetsLargeImage('https://media.discordapp.net/attachments/1038784017203470408/1139827258077483098/74A6B09B-8BA0-4CF5-9861-E5DCB24D0C61.gif?ex=656ae0db&is=65586bdb&hm=e72109ca3c196e96ae23645554f3e65f257459f6a5c4e8aca7310f3c0702ae49&=&width=449&height=243') //You can put links in tenor or discord and etc.
    .setAssetsLargeText('owner') //Text when you hover the Large image
    .setAssetsSmallImage('https://cdn.discordapp.com/attachments/1038784017203470408/1142604358966595674/IMG_2358.gif') //You can put links in tenor or discord and etc.
    .setAssetsSmallText('???') //Text when you hover the Small image
    .addButton('law', 'https://open.spotify.com/playlist/6Sp4mJ1YZomb4GvMxHiRhs?si=rRo158CPRBSK79y_S_ndhg')
    .addButton('selfish', 'https://e-z.bio/selfish');

  client.user.setActivity(r);
  client.user.setPresence({ status: "dnd" }); //dnd, online, idle, offline

  let prevTime = null;
  setInterval(() => {
    const newTime = formatTime();
    if (newTime !== prevTime) {
      const newDetails = `for 2.867 viewers [${newTime}]`;
      r.setDetails(newDetails);
      client.user.setActivity(r);
      prevTime = newTime;
    }
  }, 1000); // Update every second
});

const mySecret = process.env['TOKEN'];
client.login(mySecret);
