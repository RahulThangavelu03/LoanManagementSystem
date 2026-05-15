import { Request, Response } from "express";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import Users from "../models/Users";

export const register = async (req:Request,res:Response)=>{

try{


const{name,email,password} = req.body

const exsistingUser= await Users.findOne({email})



if(exsistingUser){


     return res.status(400).json({message:"User Already Exsists"})
}




    const hashedPassword =
      await bcrypt.hash(password, 10);

    const user = await Users.create({
      name,
      email,
      password: hashedPassword
    });

    res.status(201).json({
      message: "User registered successfully",
      user
    });

}



catch(error)
{

console.log(error);

    res.status(500).json({
      message: "Server Error"
    });
  }
};

export const login = async (
  req: Request,
  res: Response
) => {

  try {

    const {
      email,
      password
    } = req.body;


console.log(email,"email")
console.log(password,"passworddddd")


    const user =
      await Users.findOne({ email });

    if (!user) {

      return res.status(400).json({
        message: "Invalid credentials"
      });
    }

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {

      return res.status(400).json({
        message: "Invalid credentials"
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role
      },

      process.env.JWT_SECRET!,

      {
        expiresIn: "7d"
      }
    );

    res.status(200).json({
      token,
      user
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });
  }
};

