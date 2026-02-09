const express=require("express");
const router=express.Router({mergeParams:true});  //we use mergeParams so that i reach to the child routes. if we not write then i stuck here /listings/:id/reviews and i can't move next routes /
const wrapAsync = require("../utils/wrapAsync.js");
const {validateReview,isLoggedIn,isReviewAuthor}=require("../middleware.js");

const reviewController=require("../controllers/reviews.js");

//reviews
//Post review routes
router.post("/",isLoggedIn,validateReview,wrapAsync(reviewController.createReview));


//delete review routes
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(reviewController.destroyReview));

module.exports=router;