const mongoose = require("../bin/mongodb");

const categorySchema = new mongoose.Schema({
    name: {
        type:String,
        required:[true,"El campo name es obligatorio"],
        minlength:1,
        maxlength:100
    }
})

module.exports = mongoose.model("categories", categorySchema)