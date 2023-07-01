import Cryptr from "cryptr";
import userServices from "../services/users.js"
import TokenGenerator from "uuid-token-generator";
import nodemailer from "nodemailer";
const cryptr = new Cryptr(process.env.crypttoken);
const tokgen = new TokenGenerator();

const createUser = async(req,res,next)=>{
    try{
        let foundUser = await userServices.getUserByEmail(req.body.email);
        if(foundUser==null){
            await userServices.addUser(req.body.email,cryptr.encrypt(req.body.password));
            
            res.status(200).end();
        }
        else{
            res.status(400);
            res.send(foundUser);
        }
    }
    catch(err){
        console.log(err);
    }
}


const updatePassword = async(req,res,next)=>{
    try{
        let foundUser = await userServices.getUserByEmail(req.body.email);
        let password = req.body.password;
        await userServices.updatePassword(foundUser.email,cryptr.encrypt(password));
        res.status(200).end();
    }
    catch(err){
        res.status(400).end();
        console.log(err);
    }
}


const sendEmailWithCode = async(req,res,next)=>{
    try{
        let to = req.params.to;
        let code = req.params.code;
        console.log(code);
        let foundUser = await userServices.getUserByEmail(req.params.to);
        console.log(foundUser);
        if(foundUser==null){
            res.status(400).end();
            return;
        }
        var transporter = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                user: 'EuphoriaClothingSite@gmail.com',
                pass: 'rvucaohbwhozpvfd'
              }
            });

            var mailOptions = {
              from: 'EuphoriaClothingSite@gmail.com',
              to: to,
              subject: 'Password reset',
              text: `Hello there! \n Your password reset code is: ${code}`
            };

            transporter.sendMail(mailOptions, function(error, info){
              if (error) {
                console.log(error);
              } else {
                console.log('Email sent: ' + info.response);
              }
            });
            res.status(200).end();

    }catch(err){
        res.status(400).end();
        console.log(err);
    }
    
}



const getUser = async(req,res,next)=>{
    try{
        let foundUser = await userServices.getUserByEmail(req.body.email);
        if(foundUser!=null){
            if(req.body.password==cryptr.decrypt(foundUser.password)){
                let temptoken = tokgen.generate();
                await userServices.updateUserToken(req.body.email,temptoken);
                res.status(200);
                res.send(temptoken);
            }
            else{
                res.status(400).end();
            }
        }
        else{
            res.status(400).end();
        }
        
    }catch(err){
        console.log(err);
    }
}

const sendEmail = async(req,res,next)=>{
    try{
        let totalvalue = req.params.totalvalue;
        let to = req.params.to;
              var transporter = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                user: 'EuphoriaClothingSite@gmail.com',
                pass: 'rvucaohbwhozpvfd'
              }
            });

            var mailOptions = {
              from: 'EuphoriaClothingSite@gmail.com',
              to: to,
              subject: 'Order confirmation',
              text: `Hello there! \n We have received your order with the total value of \$${totalvalue} \n Thank you for your order!. \n \n \n -Euphoria Clothing Site`
            };

            transporter.sendMail(mailOptions, function(error, info){
              if (error) {
                console.log(error);
              } else {
                console.log('Email sent: ' + info.response);
              }
            });
            res.status(200).end();
    }catch(err){
        console.log(err);
    }
}

const getUserId = async(req,res,next)=>{
    try{
        let token = req.headers['authorization'].slice(7);
        let user = await userServices.getUserByToken(token);
        console.log(user);
        if(user)
            res.status(200).json(user);
        else
            res.status(400).end();
    }catch(err){
        console.log(err);
    }
}

export default {createUser,getUser,sendEmail,getUserId,updatePassword,sendEmailWithCode}