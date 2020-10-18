const categoriesModel = require("../models/categoriesModel");

module.exports = {
    getAll: async(req, res, next) =>{
        console.log(req.query)
        try{
            const producto = await categoriesModel.find();
            res.json(producto);
        }catch (e){
            next(e)
        }
    },
    getById: async (req, res, next) => {
        console.log(req.params.id);
        try {
            const producto = await categoriesModel.findById(req.params.id)
            res.json(producto)
        } catch (e) {
            next(e)
        }
    },
    create: function(req, res, next){
        console.log(req.body);
        try {    
            const producto = new categoriesModel({
                name: req.body.name,
            })
            producto.save();
            res.json(producto);
        }catch(e){
            next (e)
        }
    },
    delete: async function (req, res, next) {
        try{
            let producto = await categoriesModel.deleteOne({ _id: req.params.id })
            res.json(producto)
        } catch (e) {
            next(e)
        }
    }
}

