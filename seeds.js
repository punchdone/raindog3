const faker = require('faker');
const Project = require('./models/project');

async function seedProjects() {
	await Project.remove({});
	for(const i of new Array(40)) {
		const project = {
			title: faker.lorem.word(),
			description: faker.lorem.text(),
			coordinates: [-122.0842499, 37.4224764],
			author: {
		    	'_id': '5d92414846b06e14a24f28d0',
				'username':'pooper'
		  }
		}
		await Project.create(project);
	}
	console.log('40 new projects created');
}

module.exports = seedProjects;