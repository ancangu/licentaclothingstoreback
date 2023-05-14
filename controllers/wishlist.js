import wishlistServices from '../services/wishlist.js'
import userServices from '../services/users.js'


const addArticleToWishlist = async(req,res,next)=>{
    try{
        let userid = req.body.userid;
        let articleid = req.body.articleid;
        let checkIfArticleIsInWishlist = await wishlistServices.checkIfArticleIsInWishlist(parseInt(articleid),parseInt(userid))
        if(checkIfArticleIsInWishlist)
            return res.status(400).end();
        await wishlistServices.addArticleToWishlist(parseInt(articleid),parseInt(userid));
        return res.status(200).end();
    }catch(err){
        console.log(err);
        return res.status(400).end();
    }
}

const getAllItemsFromWishlist = async(req,res,next)=>{
    try{
        let token = req.headers['authorization'].slice(7);
        let userProfile = await userServices.getUserByToken(token);
        let articleArray=await wishlistServices.getAllItemsFromWishlist(parseInt(userProfile.userid));
        res.status(200);
        res.json(articleArray);
    }catch(err){
        console.log(err);
    }
}

const removeArticleFromWishlist = async(req,res,next)=>{
    try{
        let articleid = req.params.articleid;
        let token = req.headers['authorization'].slice(7);
        let userProfile = await userServices.getUserByToken(token);
        await wishlistServices.removeArticleFromWishlist(parseInt(articleid),parseInt(userProfile.userid));
        return res.status(200).end();
    }
    catch(err){
        res.status(400).end();
        console.log(err);
    }
}


export default{addArticleToWishlist,getAllItemsFromWishlist,removeArticleFromWishlist}