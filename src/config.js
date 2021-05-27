const readline = require('readline-sync');
const fs = require('fs');

console.log('Starting configuration\n\n');
try {
	var prefix = readline.question('Enter prefix: ');
	var token = readline.question('Enter Token: ');
} catch(err) {
	throw new Error(`Error getting user input: ${err}`);
}

var config_obj = {
	configed: true,
	prefix: prefix,
	token: token
};

var configuration = JSON.stringify(config_obj, null, '\t');
console.log(`\nconfiguration: \n${configuration}`);

fs.writeFileSync(`${__dirname}/../config.json`, configuration, (err) => {
	if (err) {
		throw new Error(`Error writing configuration file: ${err}`);
	} else {
		console.log('Configured');
		console.log('Falling back to main script: index.js');
	}
});