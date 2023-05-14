import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getFirstArticles = async () => {
    const articleArray = await prisma.articles.findMany({
        orderBy:{
            releasedate:'desc',
        }
    })
    return articleArray;        
}

const getArticlesByFilter = async (categoryid,sex) => { 
    const articleArray = await prisma.articles.findMany({
        where:{
            categoryid,
            sex
        },
    })
    return articleArray;
}

const getArticleById = async (articleid) => {
    const foundArticle = await prisma.articles.findFirst({
        where:{
            articleid
        }
    })
    return foundArticle;
}

const getAvailableSizes = async(articleid) =>{
    const AvailableSizes = await prisma.articlesxstock.findMany({
        select:{
            size:true
        },
        where:{
            articleid,
            remainingqtty:{
                gt:'1'
            }
        }
    })
    return AvailableSizes
}

const getArticlesBySex = async(sex) =>{
    const articles = await prisma.articles.findMany({
        where:{
            sex
        }
    })
    return articles;
}
const getArticlesByCategory = async(categoryid)=>{
    const articles = await prisma.articles.findMany({
        where:{
            categoryid
        }
    })
    return articles;
}

export default {getArticlesByCategory,getArticlesBySex,getFirstArticles,getArticlesByFilter,getArticleById,getAvailableSizes}