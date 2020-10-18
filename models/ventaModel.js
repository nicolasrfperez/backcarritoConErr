const mongoose = require("../bin/mongodb");
const ventaSchema = new mongoose.Schema({

    products:{
        type:mongoose.Schema.ObjectId,
        ref:"products"
    },
    cant_comp:  {
    type: Number,
        require: true,
    },
})
module.exports = mongoose.model("venta", ventaSchema)