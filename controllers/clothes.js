import clothesServices from '../services/clothes.js'

const getFirstArticles = async (req,res,next) => {
    try{
        let firstClothes = await clothesServices.getFirstArticles();
        res.status(200);
        res.send(firstClothes);
    }
    catch(err){
        res.status(400);
        console.log(err);
    }
}

const getArticlesByFilter=async(req,res,next) =>{
    try{
        let categoryid = req.params.categoryid;
        let sex = req.params.sex;
        let articleArray;
        console.log(sex);
        console.log(categoryid);
        if(categoryid=="null")
            categoryid=null;
        //sex exista mereu cu valoarea 1,2,3.
        //cand NU exista categoryid:
        if(!categoryid){
           //cand sex este 3, luam toate articolele
            if(sex == 3)
                articleArray = await clothesServices.getFirstArticles();
            else
                articleArray = await clothesServices.getArticlesBySex(sex);
        }
        //cand exista categoryid:
        if(categoryid){
            if(sex==3)
            articleArray=await clothesServices.getArticlesByCategory(parseInt(categoryid))
            else
            articleArray=await clothesServices.getArticlesByFilter(parseInt(categoryid),sex)
        }
        if(articleArray){
            res.status(200);
            res.json(articleArray);
        }
        else{
            res.status(400);
        }
    }
    catch(err){
        res.status(400);
        console.log(err);
    }
}

const getArticleById = async(req,res,next)=>{
    try{
        let articleid = req.params.articleid;
        let foundArticle = await clothesServices.getArticleById(parseInt(articleid));
        res.status(200);
        res.json(foundArticle);
    }
    catch(err){
        res.status(400);
        console.log(err);
    }
}

const getAvailableSizes = async(req,res,next)=>{
    try{
        let articleid=req.params.articleid;
        let foundSizes = await clothesServices.getAvailableSizes(parseInt(articleid));
        res.status(200);
        res.json(foundSizes);
    }catch(err){
        res.status(400).end();
        console.log(err);
    }
}


export default {getFirstArticles,getArticlesByFilter,getArticleById,getAvailableSizes}