const express = require('express');


//const fs = require('fs')
const { Client, Collection, Intents } = require('discord.js');
const { discord_token } = require('./config.json');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.on("message", (data) => {
	if(data.content.includes('hello world') && data.author.username != client.user.username){
		console.log(`${data.author.username}: (${data.content}) in the ${data.channel.name} channel.`);
		const channel = data.channel; //in order to respond in the same channel
		channel.send("Hello, World!");
	}
	if(data.content.includes('1v1') && (data.author.username != client.user.username)){
		console.log(data.author.username + " " + client.user.username);
		var one_day = 1000 * 60 * 60 * 24; // one day in ms
		var today = new Date(); // new date
		var the_day_he_quit = new Date(today.getFullYear(),07,17); // formatting the day he punked out
		var days_since = Math.round((today.getTime() - the_day_he_quit.getTime()) / one_day); // doin the math to get the correct # of days
		var final_days_since = days_since.toFixed(0); // remove trailing 0s
		data.reply(`It has been ${final_days_since} days since ${MARTIN_G} ran away from a 1v1 with ${ZACH_M}. Just thought you should know.`) // reply to the thing that triggered this event
	}
});

client.once("message", (data) => {
	
});

client.login(discord_token);

