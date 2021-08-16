var mongoose = require('mongoose');
var slug = require('slug');
var campusSchema = mongoose.Schema({
    slug:{
        type: String,
        unique: true
    },

    name:{
        type: String,
        required: true
    },

    degrees:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Degree',}]

});

const prePopulate = function () {
    this.populate('degrees');
}
campusSchema.pre('find', prePopulate);
campusSchema.pre('findOne', prePopulate);
campusSchema.pre('findById',prePopulate);

campusSchema.pre('validate', function(next){
    if(!this.slug)
      this.slugify()
    next()
})

campusSchema.methods.slugify = function(){
    this.slug = slug('ca') + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36)
}

campusSchema.methods.getMembers = async function(){
    return await mongoose.model('User').find({'campus':this._id})
}

campusSchema.methods.toJSON = function(){
    return {
        id: this._id,
        slug: this.slug,
        name: this.name,
        degrees: this.degrees,
        members: this.members
    }
}


const Campus = mongoose.model('Campus', campusSchema);
module.exports = Campus;