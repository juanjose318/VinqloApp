var faker = require('faker');
var User = require('../models/user');
var Post = require('../models/post');
var Community = require('../models/community');
var Report = require('../models/report');

async function seedReport(){
    const users = await User.find();
    const posts = await Post.find();
    const communities = await Community.find();

    for(var i=0; i<3; i++){
        const n1 = Math.floor(Math.random() * 80);
        const n2 = Math.floor(Math.random() * 9);
        const n3 = Math.floor(Math.random() * 80);

        let report = new Report();
        report.body = faker.lorem.text();
        report.type = 0;
        report.post = posts[n1]._id;
        report.by = users[n3]._id;
        await report.save();

        let report2 = new Report();
        report2.body = faker.lorem.text();
        report2.type = 1;
        report2.user = users[n1]._id;
        report2.by = users[n3]._id;
        await report2.save();

        let report3 = new Report();
        report3.body = faker.lorem.text();
        report3.type = 2;
        report3.community = communities[n2]._id;
        report3.by = users[n3]._id;
        await report3.save();
    }

    console.log('Reports Seeded')
}

module.exports = seedReport;