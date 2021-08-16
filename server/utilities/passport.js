const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

const localStrategy = new LocalStrategy({usernameField: 'email', passwordField: 'password'}, (email, password, done) => {      
  User.findOne({email: email}, (err, user) => {
        if(err) return done(err)
        if(!user){
            return done(null, false, {message: 'Invalid Email and Password Address'})
        }
        if(!user.comparePassword(password)){
            return done(null, false, {message: 'Invalid Email and Password Address'})
        }
        if(user.status ===  0){
            return done(null, false, { message: 'Invalid Email and Password Address' });
        }
        return done(null, user);
    })
    }
)

module.exports = localStrategy