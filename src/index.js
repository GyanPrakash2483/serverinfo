console.log('Initialising...');
const Discord = require('discord.js');
const fs = require('fs');
const embed_color = '#FD5200';
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

// We define a channel as a TextChannel, VoiceChannel, NewsChannel and StoreChannel,
// but discord.js also defines it as a CategoryChannel, which is not really a channel,
// so we delete all the CategoryChannel s.
function numberOfChannels(guild)
{
	let channels = guild.channels.cache;
	let size = channels.size;
	channels.forEach(channel =>
	{
		if (channel.type === 'category')
			size--;
	})

	return size;
}


client.on('ready', () => {
	console.log('Bot started as ' + client.user.username);
});

client.on('message', (message) => {
	if (!(message.content.startsWith(prefix))) return; // The messsage isn't a command

	let command = message.content.trim().slice(1);
	if (command === 'serverinfo') {

		message.channel.send(new Discord.MessageEmbed()
			.setColor(embed_color)
			.setTitle('Server Info')
			.addFields(
				{
					name: 'Server name',
					value: message.guild.name
				},
				{
					name: 'Server Creation Date',
					value: message.guild.createdAt.toString()
				},
				{
					name: 'Number of members',
					value: message.guild.memberCount
				},
				{
					name: 'Server Owner',
					value: message.guild.owner.toString()
				},
				{
					name: 'Server Region',
					value: message.guild.region[0].toUpperCase() + message.guild.region.slice(1)
				},
				{
					name: 'Number of channels',
					value: numberOfChannels(message.guild)
				}
			)
		);
	} else if (command === 'name') {
		message.channel.send(new Discord.MessageEmbed()
			.setColor(embed_color)
			.addFields(
				{
					name: 'Server name', value: message.guild.name
				}
			)
		);
	} else if (command === 'creationdate') {
		message.channel.send(new Discord.MessageEmbed()
			.setColor(embed_color)
			.addFields(
				{
					name: 'Server Creation Date', value: message.guild.createdAt.toString()
				}
			)
		);
	} else if (command === 'membercount') {
		message.channel.send(new Discord.MessageEmbed()
			.setColor(embed_color)
			.addFields(
				{
					name: 'Number of members', value: message.guild.memberCount
				}
			)
		);
	} else if (command === 'owner') {
		message.channel.send(new Discord.MessageEmbed()
			.setColor(embed_color)
			.addFields(
				{
					name: 'Server Owner', value: message.guild.owner.toString()
				}
			)
		);
	} else if (command === 'region') {
		message.channel.send(new Discord.MessageEmbed()
			.setColor(embed_color)
			.addFields(
				{
					name: 'Server Region', value: message.guild.region[0].toUpperCase() + message.guild.region.slice(1)
				}
			)
		);
	} else if (command === 'channelcount')
	{
		message.channel.send(new Discord.MessageEmbed()
			.setColor(embed_color)
			.addFields(
				{
					name: 'Number of channels',
					value: numberOfChannels(message.guild)
				}
			)
		)
	} else if (command === 'help') {
		message.channel.send(new Discord.MessageEmbed()
			.setColor(embed_color)
			.setTitle('Help')
			.addFields(
				{
					name: `${prefix}serverinfo`, value: 'Displays all the information about the server'
				},
				{
					name: `${prefix}name`, value: 'Displays the name of the server'
				},
				{
					name: `${prefix}creationdate`, value: 'Displays the server\'s creation date'
				},
				{
					name: `${prefix}membercount`, value: 'Displays the number of members in the server'
				},
				{
					name: `${prefix}owner`, value: 'Displays the owner of the server'
				},
				{
					name: `${prefix}region`, value: 'Displays server\'s region'
				},
				{
					name: `${prefix}channelcount`, value: 'Displays the number of channels in the server'
				},
				{
					name: `${prefix}help`, value: 'Displays this help section'
				}
			)
		);
	}

});


client.login(token);