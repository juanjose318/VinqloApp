var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var mongoosastic = require('mongoosastic');
var mongoosePaginate = require('mongoose-paginate-v2');
var slug = require('slug');

var commentSchema = mongoose.Schema({
    slug:{
        type: String,
        unique: true
    },

    body:{
        type: String,
        required: true
    },

    by:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    time:{
        type: Date,
        default: Date.now
    }

});

commentSchema.pre('findOne', function (next) {
    this.populate('by');
    this.populate('tag');
    next();
});

commentSchema.pre('find', function (next) {
    this.populate('by');
    this.populate('tag');
    next();
});


commentSchema.plugin(uniqueValidator);
commentSchema.plugin(mongoosastic);
commentSchema.plugin(mongoosePaginate);

commentSchema.pre('validate', function(next){
    if(!this.slug)
      this.slugify()
    next()
})

commentSchema.methods.slugify = function(){
    this.slug = slug('co') + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36)
}

commentSchema.methods.toJSON = function(){
    return{
        slug: this.slug,
        body: this.body,
        by: {
            firstName: this.by.firstName,
            lastName: this.by.lastName,
            email: this.by.email,
            image: this.by.image
        },
        time: this.time
    }
}

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;