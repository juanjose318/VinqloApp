var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var mongoosastic = require('mongoosastic');
var mongoosePaginate = require('mongoose-paginate-v2');
var bcrypt = require('bcrypt');
var jsonwebtoken = require('jsonwebtoken');

var userSchema = mongoose.Schema({
    firstName:{
        type: String,
        required: true,
    },
    
    lastName:{
        type: String,
        required: true,
    },

    email:{
        type: String,
        unique: true,
        required: true,
    },

    password:{
        type: String,
        required: true
    },

    bio:{
        type: String,
    },
    
    campus:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Campus',
        required: true
    },

    degree:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Degree',
        required: true,
    },

    communities:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Community'
    },
    
    saved:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Post'
    },

    liked:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Post'
    },

    role:{
        type: Number,
        enum:[1, 2, 3],
        default: 3
    }, // 1- Super Admin, 2- Admin, 3- User

    verified:{
        type: Boolean,
        default: false
    }, 

    otp:{
        type: String,
    }, 

    otpExpiry: {
        type: Date
    },

    status:{
        type: Number,
        default: 1,
    },

    strikes: {
        type: Number,
        default: 0
    },
    
    image:{
        type: String,
        default: null,
    },

    socialLinks:{

        instagram: {
            type: String
        },

        facebook: {
            type: String
        },

        twitter: {
            type: String
        },
        tiktok: {
            type: String
        },
        phone:{
            type: String
        }

    }


});

const preFind = function () {
    //this.populate('saved');
    this.populate('campus');
    this.populate('degree');
    //this.populate('liked');
}
userSchema.pre('findOne', preFind);
userSchema.pre('find', preFind);
userSchema.pre('findById', preFind);

userSchema.plugin(uniqueValidator);
userSchema.plugin(mongoosastic);
userSchema.plugin(mongoosePaginate);

userSchema.methods.setPassword =  function(pass){
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(pass, salt);
    this.password = hash
}

userSchema.methods.comparePassword = function(pass){
    return bcrypt.compareSync(pass, this.password)
}

userSchema.methods.generateToken = function(){
    this.token = jsonwebtoken.sign({user: this.email}, 'shhhhh', {
        expiresIn: '1d'
    })
}

userSchema.methods.isJoined = function(id){
    return this.communities.indexOf(id) !== -1
}

userSchema.methods.isLiked = function(id){
    return this.liked.indexOf(id) !== -1
}

userSchema.methods.isSaved = function(id){
    return this.saved.indexOf(id) !== -1
}

userSchema.methods.toAuthJSON = function(){
    this.generateToken()
    return{
        token: this.token,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        bio: this.bio,
        campus: {
            slug: this.campus.slug,
            name: this.campus.name
        },
        degree: this.degree,
        saved: this.saved,
        liked: this.liked,
        communities: this.communities, 
        role: this.role,
        otp: this.otp,
        verified: this.verified,
        image: this.image,
        status: this.status,
        socialLinks: this.socialLinks
    }
}

userSchema.methods.toJSON = function(){
    return{
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        bio: this.bio,
        campus: {
            slug: this.campus.slug,
            name: this.campus.name
        },
        degree: this.degree,
        communities: this.communities, 
        role: this.role,
        status: this.status,
        strikes: this.strikes,
        image: this.image,
        socialLinks: this.socialLinks
    }
}

const User = mongoose.model('User', userSchema);
module.exports = User;