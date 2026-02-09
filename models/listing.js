const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review=require("./review.js");

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
   url:String,
   filename:String,
  },
  price: Number,
  location: String,
  country: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner:{
    type:Schema.Types.ObjectId,
    ref:"User",
  },
});



//this part means, when i delete listing then review also delete automatically
listingSchema.post("findOneAndDelete",async(listing)=>{
await Review.deleteMany({_id:{$in:Listing.reviews}});
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;