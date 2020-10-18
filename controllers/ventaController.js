const usersModel = require("../models/usersAdminModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
module.exports = {
    
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