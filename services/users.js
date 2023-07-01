import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getUserByToken = async(token) =>{
    const user = await prisma.users.findFirst({
        where:{
            token
        }
    })
    return user;
}

const getUserByEmail = async(email) =>{
    const user = await prisma.users.findFirst({
        where:{
            email
        }
    })
    return user;
}

const updatePassword = async(email,password)=>{
    const user = await prisma.users.update({
        data:{
            password:password
        },
        where:{
            email
        }
    })
    return user;
}
const addUser = async(email,password)=>{
    const user = await prisma.users.create({
        data:{
            email,password
        }
    })
    return user;
}

const updateUserToken = async(email,token)=>{
    const user = await prisma.users.update({
        data:{
            token
        },
        where:{
            email
        }
    })
    return user;
}


export default {getUserByEmail,addUser,updateUserToken,getUserByToken,updatePassword}