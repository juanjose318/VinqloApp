const faker = require('faker')
var Community = require('../models/community');
var User = require('../models/user');
var Campus = require('../models/campus');
var Category = require('../models/category');
async function seedCommunity(){
    const users = await User.find();
    const campuses = await Campus.find();
    const categories = await Category.find();
    
    for(var i=0; i<5; i++){
        const n = Math.floor(Math.random()*50);
        
        for(var j=0; j<5; j++){

            let community = new Community();
            community.name = faker.company.companyName();
            community.by = users[n]._id;

            users[n].communities.push(community._id);
            await users[n].save();

            community.campus = campuses[i]._id;
            community.degree = campuses[i].degrees[0]._id;
            community.category = categories[i]._id;
            await community.save();

            let community2 = new Community();
            community2.name = faker.company.companyName();
            community2.by = users[n]._id;

            users[n].communities.push(community2._id);
            await users[n].save();

            community2.campus = campuses[i]._id;
            community2.degree = campuses[i].degrees[1]._id;
            community2.category = categories[i]._id;
            await community.save();

        }
        
    }

    console.log('Communities Seeded!')
}

module.exports = seedCommunity