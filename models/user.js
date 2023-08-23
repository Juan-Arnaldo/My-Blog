import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const userSchema = mongoose.Schema({

    email : {
        type: String,
        trim: true,
        require: true
    },
    password : {
        type: String,
        require: true
    },

})

userSchema.pre('save', async function(next) {
    if(!this.isModified('password')){
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

userSchema.methods.authenticatePass = async function(passForm){
    return await bcrypt.compare(passForm, this.password);
}

const user = mongoose.model('user', userSchema);

export default user;