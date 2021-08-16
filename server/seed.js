require('dotenv').config();
const mongoose = require('mongoose');
const MONGODB_URI = require('./config').MONGODB_URI;

let con = mongoose.connect(MONGODB_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).catch(err => {
  console.log(err);
  process.exit(1);
})
  .then(() => {
    console.log("connected to db in development environment");
    init()
  });

const campus = require('./seeder/campus');
const info = require('./seeder/info');
const user = require('./seeder/user');
const category = require('./seeder/category');
const community = require('./seeder/community');
const post = require('./seeder/post');
const report = require('./seeder/report');
const comment = require('./seeder/comment');

async function init() {
  
    console.log("dropping DB");
    await mongoose.connection.db.dropDatabase();
    
    await campus();
    await info();
    await user();
    await category();
    await community();
    await post();
    await report();
    await comment();
    exit();

}
 
function exit() {
  console.log('exiting')
  process.exit(1)
}