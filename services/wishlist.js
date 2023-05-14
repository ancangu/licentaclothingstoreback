import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


const addArticleToWishlist = async (articleid,userid) => {
    const result = await prisma.wishlistarticles.create({
        data:{
            articleid,
            userid
        }
    })
    return result;
}

const checkIfArticleIsInWishlist = async(articleid,userid) => {
    const result = await prisma.wishlistarticles.findFirst({
        where:{
            articleid,
            userid
        }
    })
    return result;
}

const removeArticleFromWishlist = async(articleid,userid) =>{
    const result = await prisma.wishlistarticles.delete({
        where:{
            articleid_userid:{
                articleid:articleid,
                userid:userid
            }
        }
    })
    return result;
}

const getAllItemsFromWishlist = async(userid)=>{
    const wishlistArray = await prisma.wishlistarticles.findMany({
        where:{
            userid
        },
        include:{
            articles:true
        }
    })
    return wishlistArray;
}

export default {addArticleToWishlist,checkIfArticleIsInWishlist,removeArticleFromWishlist,getAllItemsFromWishlist}