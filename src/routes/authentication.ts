import express from 'express';
import { Login, Register } from '../controllers/authentication';

export default (router:express.Router) =>{
    router.post('/auth/register',Register);
    router.post('/auth/login',Login);
}