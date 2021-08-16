var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var mongoosastic = require('mongoosastic');
var mongoosePaginate = require('mongoose-paginate-v2');
var slug = require('slug');

var reportSchema = mongoose.Schema({
    slug:{
        type: String,
        unique: true
    },

    body:{
        type: String,
        required: true
    },

    type:{
        type: Number,
        required: true
    },

    post:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },

    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    community:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Community'
    },

    by:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    status:{
        type: Number,
        default: 1
    },

    time:{
        type: Date,
        default: Date.now
    }

});

reportSchema.pre('findOne', function(next){
    this.populate('post');
    this.populate('user');
    this.populate('community');
    this.populate('by');
    next();
});

reportSchema.pre('find', function(next){
    this.populate('post');
    this.populate('user');
    this.populate('community');
    this.populate('by');
    next();
});

reportSchema.plugin(uniqueValidator);
reportSchema.plugin(mongoosastic);
reportSchema.plugin(mongoosePaginate);

reportSchema.pre('validate', function(next){
    if(!this.slug)
      this.slugify()
    next()
})

reportSchema.methods.slugify = function(){
    this.slug = slug('re') + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36)
}

reportSchema.methods.toJSON = function(){
    return{
        slug: this.slug,
        body: this.body,
        post: this.post,
        user: this.user,
        community: this.community,
        by: this.by,
        time: this.time,
        status: this.status
    }
}

const Report = mongoose.model('Report', reportSchema);
module.exports = Report;