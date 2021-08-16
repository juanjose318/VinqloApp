var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var mongoosastic = require('mongoosastic');
var mongoosePaginate = require('mongoose-paginate-v2');
var slug = require('slug');

var communitySchema = mongoose.Schema({
    slug:{
        type: String,
        unique: true
    },

    name:{
        type: String,
        required: true
    },
    campus:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Campus',
        required: true
    },
    degree:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Degree',
        required: true
    },
    by:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    membersCount: {
        type: Number,
        default: 1
    },
    status:{
        type: Number,
        default: 1
    }

});

communitySchema.pre('findOne', function(next) {
    this.populate('by');
    this.populate('category');
    next();
});

communitySchema.pre('find', function(next) {
    this.populate('by');
    this.populate('category');
    next();
});

communitySchema.plugin(uniqueValidator);
communitySchema.plugin(mongoosastic);
communitySchema.plugin(mongoosePaginate);

communitySchema.pre('validate', function(next){
    if(!this.slug)
      this.slugify()
    next()
})

communitySchema.methods.slugify = function(){
    this.slug = slug('com') + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36)
}



communitySchema.methods.toJSON = function(){
    return{
        slug: this.slug,
        name: this.name,
        by: {
            firstName: this.by.firstName,
            lastName: this.by.lastName,
            email: this.by.email,
            image: this.by.image,
            strikes: this.by.strikes
        },
        category: this.category,
        membersCount: this.membersCount,
        status: this.status
    }
}

communitySchema.methods.toJSONFor = function(user){
    return{
        slug: this.slug,
        name: this.name,
        by: {
            firstName: this.by.firstName,
            lastName: this.by.lastName,
            email: this.by.email,
            image: this.by.image
        },
        category: this.category,
        membersCount: this.membersCount,
        members: this.members,
        isJoined: user.isJoined(this._id),
        status: this.status
    }
}



const Community = mongoose.model('Community', communitySchema);
module.exports = Community;