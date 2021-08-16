var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var mongoosastic = require('mongoosastic');
var mongoosePaginate = require('mongoose-paginate-v2');
var slug = require('slug');

var notificationSchema = mongoose.Schema({

    slug:{
        type: String,
        unique: true,
        required: true,
    },
    
    title: String,
    type: {
        type: Number,
        // 1 user
        // 2 post
        // 3 comment
        enum: [1, 2, 3],
        required: true

    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    },
    sentTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    isRead: {
        type: Boolean,
        default: false,
    },

    data: {},

    time:{
        type: Date,
        default: Date.now
    }

});

notificationSchema.pre('findOne', function (next) {
    this.populate('user');
    this.populate('sentTo');
    next();
});

notificationSchema.pre('find', function (next) {
    this.populate('user');
    this.populate('sentTo');
    next();
});


notificationSchema.plugin(uniqueValidator);
notificationSchema.plugin(mongoosastic);
notificationSchema.plugin(mongoosePaginate);

notificationSchema.pre('validate', function(next){
    if(!this.slug)
      this.slugify()
    next()
})

notificationSchema.methods.slugify = function(){
    this.slug = slug('not') + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36)
}

notificationSchema.methods.toJSON = function(){
    return{
        slug: this.slug,
        title: this.title,
        type: this.type,
        user: {
            firstName: this.user.firstName,
            lastName: this.user.lastName,
            email: this.user.email,
            image: this.user.image
        },
        sentTo: {
            firstName: this.sentTo.firstName,
            lastName: this.sentTo.lastName,
            email: this.sentTo.email
        },
        data: this.data,
        isRead: this.isRead,
        time: this.time
    }
}

const Notification = mongoose.model('Notification', notificationSchema);
module.exports = Notification;