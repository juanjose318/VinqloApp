var faker = require('faker');
var User = require('../models/user');
var Campus = require('../models/campus');

async function seedUser(){

    const campuses = await Campus.find();
    
    for(var i=0;i<100;i++){

        const n1 = Math.floor(Math.random() * 3);
        const n2 = Math.floor(Math.random() * 1);

        let user = new User();
        user.firstName = faker.name.firstName();
        user.lastName = faker.name.lastName();
        user.email = faker.internet.email();
        await user.setPassword('abc123');
        user.bio = faker.lorem.sentence(); 
        user.campus = campuses[n1]._id;
        user.degree = campuses[n1].degrees[n2]._id;
        user.verified = true;
        user.image = faker.image.avatar();

        await user.save();
    }

    console.log('Users Seeded')
}

module.exports = seedUser;