import express from 'express';
import  {getUserByEmail,createUser} from '../db/users';
import { authentication, random } from 'helpers';

export const Register = async (req:express.Request,res:express.Response) =>{
    try{
        const {username,email,password} = req.body;
        if(!username || !email || !password) return res.status(400).send("All inputs is required");

        const userExists = await getUserByEmail(email);
        if(userExists) return res.status(400).send("User already exists");  

        const salt = random();
        const user = await createUser({
            username,
            email,
            authentication:{
                salt,
                password:authentication(salt,password)
            }
        });
        return res.status(200).json(user); // return the succes code and the user just created
    }
    catch(error)
    {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
}