var faker = require('faker');
var User = require('../models/user');
var Community = require('../models/community');
var Post = require('../models/post');

async function seedPost(){
    const users = await User.find();
    const communities = await Community.find();

    for(var i=0; i<100; i++){
        const n1 = Math.floor(Math.random() * 99);
        const n2 = Math.floor(Math.random() * 8)
        

        let post = new Post();
        post.title = faker.name.title();
        post.body = faker.lorem.text();
        post.by = users[n1]._id;
        post.tags.push(faker.lorem.word());
        post.tags.push(faker.lorem.word());
        post.tags.push(faker.lorem.word());
        post.image = faker.image.image();
        post.community = communities[n2]._id;

        await post.save();
    }

    console.log('Posts Seeded')
}

module.exports = seedPost;