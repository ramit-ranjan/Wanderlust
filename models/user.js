const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email: {
        type: String,
        required: true, // Fix: Changed 'require' to 'required'
    },
});

// FIX: If the import is an object, use .default; otherwise use the import itself
const plugin = (typeof passportLocalMongoose === 'function') 
               ? passportLocalMongoose 
               : passportLocalMongoose.default;

userSchema.plugin(plugin);

module.exports = mongoose.model("User", userSchema);