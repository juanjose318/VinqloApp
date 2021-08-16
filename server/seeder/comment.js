var faker = require('faker');
var User = require('../models/user');
var Post = require('../models/post');
var Comment = require('../models/comment');

async function seedComment(){
    const users = await User.find();
    const posts = await Post.find();
    
    for(var i=0; i<200; i++){
        const n1 = Math.floor(Math.random() * 80);
        const n2 = Math.floor(Math.random() * 80);

        let comment = new Comment();
        comment.body = faker.lorem.text();
        comment.by = users[n1]._id;

        posts[n2].comments.push(comment._id);
        await posts[n2].save();

        await comment.save();
    }

    console.log('Comments Seeded')
}

module.exports = seedComment