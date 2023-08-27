import User from '../models/user.js';
import z from 'zod'

import { generateRefreshJWT, generateAccessJWT } from '../helpers/generateJWT.js';

/**
 * 
 * Endpoint to add a user
 * 
 * @returns the new User
 */
const addUser = async (req, res) => {
    const result = validateUser(req.body)
    if(result.error){
        return res.status(400).json({Error: result.error.message})
    }

    try {
        const newUser = new User(req.body);
        const userSave = await newUser.save();

        res.status(200).json({User: userSave});
    } catch (err) {
        return res.status(400).json({message: err.message});
    }
}

/**
 * 
 * Endpoint to update a user
 * 
 * @returns the User after update 
 */
const updateUser = async (req, res) => {
    const result = validateUser(req.body);
    if(result.error){
        return res.status(400).json({Error: result.error.message})
    }

    const {id} = req.params
    const userExist = await User.findById({_id: id});

    if(!userExist){
        return res.status(401).json({error: 'The user does not exist'})
    } 

    try {
        
        userExist.email = req.body.email != undefined ? req.body.email : userExist.email;
        userExist.password = req.body.password != undefined ? req.body.password : userExist.password;

        const updateUser = await userExist.save();

        return res.status(200).json({
            message: 'The user was successfully updated',
            User: updateUser
        })

    } catch (err) {
        console.log(err.message);
    }

}

/**
 * 
 * Endpoint to delete a user
 * 
 * @returns json wiht the answer
 */
const deleteUser = async (req, res) => {

    const {id} = req.params
    const userExist = await User.findById(id);

    if(!userExist){
        return res.status(401).json({error: 'The user does not exist'})
    } 

    try {

        await userExist.deleteOne();
        return res.status(200).json({message: 'The user was successfully deleted'})
        
    } catch (err) {
        console.log(err.message);
    }

}

/**
 * 
 * Endpoint to authenticate a user
 * 
 * @returns the User
 */
const authenticateUser = async (req, res) => {
    const result = validateUser(req.body)
    if(result.error){
        return res.status(400).json({Error: result.error.message})
    }
    
    const {email, password} = req.body
    const userExist = await User.findOne({email});

    if(!userExist){
        return res.status(401).json({error: 'The user does not exist'})
    } 

    if(await userExist.authenticatePass(password)){

        const refreshToken = generateRefreshJWT(email);
        userExist.refreshToken = refreshToken;

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });

        res.json({
            userExist,
            accessToken: generateAccessJWT(email)
        });
        console.log('Welcome to My-Blog');


    }else{
        const error = new Error('El password es incorrecto');
        res.status(403).json({msg : error.message});
    }
}

/**
 * 
 * Endpoint to logout a user
 * 
 * @returns the User
 */
const logout = async (req, res) => {
    
    res.clearCookie('refreshToken');
    res.json({message: 'The user is logout'});

}

const userSchema = z.object({
    email: z.string().email('This is not a valid email.'),
    password: z.string().min(2)
})

function validateUser (object){
    return userSchema.safeParse(object);
}

export {
    addUser,
    authenticateUser,
    updateUser,
    deleteUser,
    logout
}