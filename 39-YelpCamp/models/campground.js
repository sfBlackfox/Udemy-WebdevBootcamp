const mongoose = require('mongoose');
const Review = require('./review');
const Schema = mongoose.Schema; 

const CampgroundSchema = new Schema({
   title: String, 
   images: [{ url: String,
            filename: String }],
   price: Number, 
   description: String, 
   location: String,
   author:{
      type: Schema.Types.ObjectId,
      ref: 'User',
      username: String
   }, 
   reviews: [
      {
         type: Schema.Types.ObjectId,
         ref: 'Review'
      }
   ]
});

CampgroundSchema.post('findOneAndDelete', async function (doc) {
   console.log(`Deleted the following element: \n ${doc}`); 
   if(doc){
      await Review.remove({ 
         _id: {
            $in: doc.reviews
         } 
      })
   }
});

module.exports = mongoose.model('Campground', CampgroundSchema); 