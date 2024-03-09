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
 .setAssetsLargeImage('https://cdn.discordapp.com/attachments/1038784017203470408/1210956243368288296/34.gif?ex=65fee6e2&is=65ec71e2&hm=ce4d2680634c515b625b2b760832154e7248d8c88aa1a378bff163116f7b29b3&') //You can put links in tenor or discord and etc.
    .setAssetsLargeText('owner') //Text when you hover the Large image
    .setAssetsSmallImage('https://cdn.discordapp.com/emojis/967776024811147295.gif?size=96&quality=lossless') //You can put links in tenor or discord and etc.
    .setAssetsSmallText('???') //Text when you hover the Small image
    .addButton('law', 'https://discord.com/')
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
