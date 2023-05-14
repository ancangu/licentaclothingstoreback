import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getDistricts = async () => {
    const districts = await prisma.districts.findMany({
    })
    return districts;
}

const getDistrictById = async(districtid) =>{
    const district = await prisma.districts.findFirst({
        where:{
            districtid
        }
    })
    return district.districtname;
}
const getCityById = async(cityid) =>{
    const city = await prisma.city.findFirst({
        where:{
            cityid
        }
    })
    return city.cityname;
}




const getCities = async (districtid) => {
    const city = await prisma.city.findMany({
        where:{
            districtid
        }
    })
    return city;
}

const addUserProfile = async(userid) =>{
    const initialUserProfile = await prisma.userinfo.create({
        data:{
            userid
        }
    })
    return initialUserProfile
}

const getUserProfile = async(userid)=>{
    const userProfile = await prisma.userinfo.findFirst({
        where:{
            userid
        }
    })
    return userProfile;
}
const updateUserProfile = async(userid,districtid,cityid,street,apartament,bloc,etaj,firstname,lastname) =>{
    const userProfile = await prisma.userinfo.update({
        data:{
            districtid,
            cityid,
            street,
            apartament,
            bloc,
            etaj,
            firstname,
            lastname
        },
        where:{
            userid
        }
    })
    return userProfile;
}

export default {getDistricts,getCities,addUserProfile,getUserProfile,updateUserProfile,getDistrictById,getCityById}