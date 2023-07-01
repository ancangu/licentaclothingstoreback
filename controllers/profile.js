import profileServices from "../services/profile.js"
import userServices from "../services/users.js"
const getDistricts = async (req,res,next) =>{
    try{
        let districtarray = await profileServices.getDistricts();
        res.status(200);
        res.send(districtarray);
    }catch(err){
        res.status(400).end();
        console.log(err)
    }

}

const getCities = async (req,res,next) =>{
    try{
        let districtid=req.params.districtid;
        let cityarray = await profileServices.getCities(parseInt(districtid));
        res.status(200);
        res.send(cityarray);
    }catch(err){
        res.status(400).end();
        console.log(err)
    }
}

const addUserProfile = async(req,res,next)=>{
    try{
        let token = req.headers['authorization'].slice(7);
        let foundUser = await userServices.getUserByToken(token);
        if(foundUser==null){
            res.status(400).end();
            return;
        }
        let foundUserProfile = await profileServices.getUserProfile(foundUser.userid);
        if(foundUserProfile){
            res.status(400).end();
            return;
        }
        await profileServices.addUserProfile(foundUser.userid);
        res.status(200).end();
    }
    catch(err){
        console.log(err);
    }
}

const updateUserProfile = async(req,res,next)=>{
    try{
        let token = req.headers['authorization'].slice(7);
        let foundUser = await userServices.getUserByToken(token);
        await profileServices.updateUserProfile(foundUser.userid,parseInt(req.body.districtid),parseInt(req.body.cityid),
            req.body.street,req.body.apartament,req.body.bloc,
            req.body.etaj,req.body.firstname,req.body.lastname);
        res.status(200).end();
    }
    catch(err){
        res.status(400).end();
        console.log(err);
    }
}

const getUserProfile = async(req,res,next) =>{
    try{
        let token = req.headers['authorization'].slice(7);
        let foundUser = await userServices.getUserByToken(token);
        console.log(foundUser);
        let foundProfile = await profileServices.getUserProfile(foundUser.userid);
        if(!foundProfile.districtid){
            res.status(400).end();
            return;
        }
        let district = await profileServices.getDistrictById(foundProfile.districtid);
        let city = await profileServices.getCityById(foundProfile.cityid);
        foundProfile.districtname = district;
        foundProfile.cityname=city;
        res.status(200);
        res.send(foundProfile);
    }catch(err){
        console.log(err);
    }
}

export default {getDistricts,getCities,addUserProfile,updateUserProfile,getUserProfile}