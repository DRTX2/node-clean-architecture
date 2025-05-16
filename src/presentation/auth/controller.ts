import { Request, Response } from "express";
import { RegisterUserDto } from "../../domain";

export class AuthController{
    // constructor(private readonly){

    // }
    
    registerUser=  (req:Request,res:Response):Response=>{
        const [error,registerUserDto]=RegisterUserDto.create(req.body);

        if (error) return res.status(400).json({ message: 'Invalid input', error });

        return res.json(registerUserDto);
    }

    loginUser= (req:Request,res:Response)=>{
        res.json("loginUser controller");
    }
}