const mongoose = require("../bin/mongodb");
const bcrypt = require('bcrypt');
const errorMessage = require("../util/errorMessage")
const validators = require("../util/validators")
const usersSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,errorMessage.GENERAL.campo_obligatorio],
        trim:true
    },
    user:{
        type:String,
        unique:true,
        required:[true,errorMessage.GENERAL.campo_obligatorio],
        validate:{
            validator: async function(v){
                const document = await this.model("usersAdmin").findOne({user:v})
                console.log(document)
                if(document){
                    return false;
                }
                return true;
            },
            message:errorMessage.USERSADMIN.userExist
        }
    },
    password:{
        type:String,
        required:[true,errorMessage.GENERAL.campo_obligatorio],
        validate:{
            validator: async function(v){
                return validators.isGoodPassword(v);
            },
            message:errorMessage.USERSADMIN.passwordIncorrect
        }
    }
})
usersSchema.pre("save",function(next){
    this.password = bcrypt.hashSync(this.password,10);
    next();
})
usersSchema.statics.validateUser = async function(user,password){
    const users = await this.findOne({user:user});
    if(users){
        if(bcrypt.compareSync(password,users.password)){
            //User y password ok, generar token
            
            return {error:false,message:"usuario ok",users:users};
        }else{
            return {error:true,message:"password incorrecto"};
        }
    }else{
        return {error:true,message:"usuario incorrecto"};
    }
}
module.exports = mongoose.model("users",usersSchema);