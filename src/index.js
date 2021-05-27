console.log('Initialising...');
const Discord = require('discord.js');
const fs = require('fs');
client = new Discord.Client();

if (!(require(`${__dirname}/../config.json`).configed)) {
	console.log('Not configured, starting configuration script: config.js');
	require(`${__dirname}/config.js`);
	return console.log('Configured, please restart');
}

const {
	configed,
	prefix,
	token
} = require(`${__dirname}/../config.json`);


client.once('ready', () => {
	console.log('Started');
});
client.login(token);

client.on('message', (message) => {
	if (!(message.content.startsWith(prefix))) return; //The messsage isn't a command
	let command = message.content.trim().slice(1);
	if (command === 'serverinfo') {
		message.channel.send(new Discord.MessageEmbed()
			.setColor('#FD5200')
			.setTitle('Server Info')
			.addFields(
				{
					name: 'Server name', value: message.guild.name
				},
				{
					name: 'Server Creation Date', value: message.guild.createdAt.toString()
				},
				{
					name: 'Number of members', value: message.guild.memberCount
				},
				{
					name: 'Server Owner', value: message.guild.owner.toString()
				},
				{
					name: 'Server Region', value: message.guild.region[0].toUpperCase() + message.guild.region.slice(1)
				}
			)
		);
	} else if (command === 'name') {
		message.channel.send(new Discord.MessageEmbed()
			.setColor('#FD5200')
			.addFields(
				{
					name: 'Server name', value: message.guild.name
				}
			)
		);
	} else if (command === 'creationdate') {
		message.channel.send(new Discord.MessageEmbed()
			.setColor('#FD5200')
			.addFields(
				{
					name: 'Server Creation Date', value: message.guild.createdAt.toString()
				}
			)
		);
	} else if (command === 'membercount') {
		message.channel.send(new Discord.MessageEmbed()
			.setColor('#FD5200')
			.addFields(
				{
					name: 'Number of members', value: message.guild.memberCount
				}
			)
		);
	} else if (command === 'owner') {
		message.channel.send(new Discord.MessageEmbed()
			.setColor('#FD5200')
			.addFields(
				{
					name: 'Server Owner', value: message.guild.owner.toString()
				}
			)
		);
	} else if (command === 'region') {
		message.channel.send(new Discord.MessageEmbed()
			.setColor('#FD5200')
			.addFields(
				{
					name: 'Server Region', value: message.guild.region[0].toUpperCase() + message.guild.region.slice(1)
				}
			)
		);
	} else if (command === 'help') {
		message.channel.send(new Discord.MessageEmbed()
			.setColor('#FD5200')
			.setTitle('Help')
			.addFields(
				{
					name: `${prefix}serverinfo`, value: 'Displays all information about the server'
				},
				{
					name: `${prefix}name`, value: 'Displays name of server'
				},
				{
					name: `${prefix}creationdate`, value: 'Display server creation date'
				},
				{
					name: `${prefix}membercount`, value: 'Displays number of members'
				},
				{
					name: `${prefix}owner`, value: 'Owner of the server'
				},
				{
					name: `${prefix}region`, value: 'Display server region'
				},
				{
					name: `${prefix}help`, value: 'Displays this help section'
				}
			)
		);
	}

});