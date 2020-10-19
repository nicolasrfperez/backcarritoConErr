const usersModel = require("../models/usersAdminModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
module.exports = {
/*    
    create: async function (req, res, next) {
        console.log(req.body);
        try {
            const user = new usersModel({
                name: req.body.name,
                email:req.body.email,
                password:req.body.password
            })
            const usr = await user.save();
            res.json(usr)
        } catch (e) {
            next(e)
        }
    },
    login: async function (req, res, next) {
        try {
            const user = await usersModel.findOne({email:req.body.email})
            if(user){
                if(bcrypt.compareSync(req.body.password,user.password)){
                    const token = jwt.sign({userId:user._id},req.app.get("secretKey"));
                    res.json({token:token})
                }else{
                    res.json({error:"El password es incorrecto"})
                }
            }else{
                res.json({error:"el email no esta registrador"})
            }
        } catch (e) {
            next(e)
        }
    }
}
*/

getAll: async (req, res, next) => {
    try{
        console.log(req.body.tokenData)

        let queryFind={};
        if(req.query.buscar){
            queryFind={name:{$regex:".*"+req.query.buscar+".*",$options:"i"}} //buscar por nombre similar al like
        }
        console.log(queryFind)
        const productos = await productsModel.paginate(queryFind,{
            
            //sort:{[req.query.sort]:req.query.sortOrder},
            sort:{name:1},
            populate:"category",
            limit:req.query.limit || 1,
            page:req.query.page || 1 //numero de pagina
        });
        res.status(200).json(productos);
    }catch(e){
        next(e)
    }
    
},
getById: async function (req, res, next) {
    try{
        console.log(req.params.id);
        const producto = await productsModel.findById(req.params.id).select("name price");
        if(!producto){
            res.status(200).json({msg:"no existe el producto"})
            return; //Siempre despues de un res un return
        }
        res.status(200).json(producto);
    }catch(e){
        next(e)
    }
    
},
create: async function (req, res, next) {
    console.log(req.body);
    try{
        const categoria = await categoryModel.findBydIdAndValidate(req.body.category);
        if(categoria.error){
            res.json(categoria);
            return;
        }
        const product = new productsModel({
            name: req.body.name,
            sku: req.body.sku,
            description: req.body.description,
            price: req.body.price,
            quantity: req.body.quantity,
            category: categoria._id,
            tags:req.body.tags
        })
        console.log(req.body.tags)
        const document = await  product.save();
       
        res.status(201).json(document);
    }catch(e){
        console.log(e)
        //e.status=204;
        next(e);
    }
    
},
update: async function (req, res, next) {
    try{
        console.log(req.params.id, req.body);
        const producto = await productsModel.update({ _id: req.params.id }, req.body, { multi: false })
        res.status(200).json(producto);
    }catch(e){
        next(e)
    }
    
},
delete: async function (req, res, next) {
    try{
        console.log(req.params.id);
        const data = await productsModel.deleteOne({ _id: req.params.id });
        res.status(200).json(data);
    }catch(e){
        next(e)
    }
    
}
}