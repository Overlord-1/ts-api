import express from 'express';
import  {getUserByEmail,createUser} from '../db/users';
import { authentication, random } from '../helpers';




export const Login = async(req:express.Request,res:express.Response)=>{
    try{
        const {email,password} = req.body;

        if(!email || !password) return res.status(403).send("All inputs are required");
        const user = await getUserByEmail(email).select('+authentication.salt +authentication.password');
        if(!user) return res.status(403).send("User not found");

        const expectedHash = authentication(user.authentication.salt,password);
        if(expectedHash !== user.authentication.password) return res.status(403).send("Invalid password");

        const salt = random();
        user.authentication.sessionToken = authentication(salt,user._id.toString());
        await user.save();
        res.cookie('RUCHIR-auth',user.authentication.sessionToken,{domain:'localhost',path:'/'});
        return res.status(200).json(user);
    }
    catch(error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
}

export const Register = async (req:express.Request,res:express.Response) =>{
    try{
        const {username,email,password} = req.body;
        if(!username || !email || !password) return res.status(403).send("All inputs are required");

        const userExists = await getUserByEmail(email);
        if(userExists) return res.status(403).send("User already exists");  

        const salt = random();
        const user = await createUser({
            username,
            email,
            authentication:{
                salt,
                password:authentication(salt,password)
            }
        });
        return res.status(200).json(user); // return the success code and the user just created
    }
    catch(error)
    {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
}