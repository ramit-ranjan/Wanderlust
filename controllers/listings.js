const Listing = require("../models/listing.js");

//this index func help to render all listings
module.exports.index=async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
};

module.exports.renderNewForm=(req, res) => {
    res.render("listings/new.ejs");
};

module.exports.showListing=async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate({path:"reviews",populate:{path:"author"},}).populate("owner");
    if(!listing){
        req.flash("error","Listing you requested for doesn't exist!");
        res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing });
};

module.exports.createListing=async (req, res, next) => {
    let url=req.file.path;
    let filename=req.file.filename;
 //here, middleware func for validate schema 
    const newListing = new Listing(req.body.listing);
    newListing.owner=req.user._id;  //passport bydefault user ka info req.user me store krta h toh waha se curr listing ke owner.username require kr lenge takki show.ejs me show ho ske nhi toh baar baar user ka id fetch krna padega or each listing me inert krna hoga
    newListing.image={url,filename};
    await newListing.save();
    req.flash("success","New Listing Created!");
    res.redirect("/listings");
};

module.exports.editFormListing=async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);

    if(!listing){
        req.flash("error","Listing you requested for doesn't exist!");
        res.redirect("/listings");
    }

    let originalImageUrl=listing.image.url;
    originalImageUrl=originalImageUrl.replace("/upload","/upload/h_150,w_250");
    res.render("listings/edit.ejs", { listing, originalImageUrl });
};

module.exports.updateListing=async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, {... req.body.listing});

    //here, this part is upload new file in edit form
    if(typeof req.file!=="undefined"){
        let url=req.file.path;
        let filename=req.file.filename;
        listing.image={url,filename};
        await listing.save();
    }

    req.flash("success","Listing Updated!");
    res.redirect(`/listings/${id}`);
};

module.exports.destroyListing=async (req, res) => {
    let { id } = req.params;
    let deleteListing= await Listing.findByIdAndDelete(id);
    console.log(deleteListing);
    req.flash("success","Listing deleted!");
    res.redirect("/listings");
};