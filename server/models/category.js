var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var mongoosastic = require('mongoosastic');
var mongoosePaginate = require('mongoose-paginate-v2');
var slug = require('slug');

var categorySchema = mongoose.Schema({
    slug:{
        type: String,
        unique: true
    },

    name:{
        type: String,
        required: true
    },

    icon:{
        type: String,
    }

});


categorySchema.plugin(uniqueValidator);
categorySchema.plugin(mongoosastic);
categorySchema.plugin(mongoosePaginate);

categorySchema.pre('validate', function(next){
    if(!this.slug)
      this.slugify()
    next()
})

categorySchema.methods.slugify = function(){
    this.slug = slug('cat') + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36)
}

categorySchema.methods.toJSON = function(){
    return{
        slug: this.slug,
        name: this.name,
        icon: this.icon
    }
}

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;