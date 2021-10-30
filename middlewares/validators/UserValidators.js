const { error } = require( "../../utils/errorMessages");

module.exports.checkValidityToCreateUser = async (user) => {

    if(!user.firstName){
        return error.FIRST_NAME_EMPTY;
    } else if (!user.lastName){
        return error.LAST_NAME_EMPTY;
    } else if (!user.username){
        return error.USERNAME_EMPTY;
    } else if (!user.password){
        return error.PASSWORD_EMPTY;
    } else if (!user.email){
        return error.EMAIL_EMPTY
    } else if (!user.mobile){
        return error.MOBILE_EMPTY
    } else if (!user.ccode){
        return error.CCODE_EMPTY
    } else if (!user.country){
        return error.COUNTRY_EMPTY
    } else {
        return true;
    }

};

module.exports.checkValidityToEditUser = (req, res) => {
    const { userKeyclockId, userMongoId, firstName, lastName, username, password, email, mobile, ccode , country } = req.body;
    if(!firstName)
    {
        res.send(error.FIRST_NAME_EMPTY);
    } else if (!lastName){
        res.send(error.LAST_NAME_EMPTY);
    } else if (!username){
        res.send(error.USERNAME_EMPTY);
    } else if (!password){
        res.send(error.PASSWORD_EMPTY);
    } else if (!email){
        res.send(error.EMAIL_EMPTY);
    } else if (!mobile){
        res.send(error.MOBILE_EMPTY);
    } else if (!ccode){
        res.send(error.CCODE_EMPTY);
    } else if (!country){
        res.send(error.COUNTRY_EMPTY);
    }else if (!userKeyclockId){
        res.send(error.KEYCLOCK_ID_EMPTY);
    }else if (!userMongoId){
        res.send(error.MONGO_ID_EMPTY);
    } else {
        return true;
    }
};



module.exports.checkValidityToEvalute = (req, res) => {
    const {  resources, userId, } = req.body;
    if(!resources)
    {
        res.send(error.RESOURCES_EMPTY);
    } else if (!userId){
        res.send(error.USERNAME_EMPTY);
    } else {
        return true;
    }
};
