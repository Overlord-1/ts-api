import express from 'express';
import { Register } from '../controllers/authentication';

export default (router:express.Router) =>{
    router.post('/auth/register',Register);
}