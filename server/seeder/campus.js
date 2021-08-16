var faker = require('faker');
var Campus = require('../models/campus');
var Degree = require('../models/degree');

async function seedCampus(){
    for(var i=0; i<5; i++){
        let campus = new Campus();
        campus.name = faker.company.companyName();

        let d = new Degree();
        d.name = faker.company.companyName()
        await d.save();

        let d1 = new Degree();
        d1.name = faker.company.companyName()
        await d1.save();        

        campus.degrees = [d, d1];
        await campus.save();
    }

    console.log('Campuses Seeded')
}

module.exports = seedCampus;