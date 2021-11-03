const { error } = require( "../../utils/errorMessages");

/**
 * This checks the validity to create user
 * @param { firstName, lastName, username, password, email, mobile, ccode, country} user 
 * @returns { code, message}
 */
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

/**
 * This checks the validity to eit user
 * @param { userKeyclockId, userMongoId, firstName, lastName, username, password, email, mobile, ccode , country } req 
 * @param { code, message } res 
 * @returns 
 */
module.exports.checkValidityToEditUser = (bodyParams, res) => {
    if(!bodyParams.firstName)
    {
        res.send(error.FIRST_NAME_EMPTY);
    } else if (!bodyParams.lastName){
        res.send(error.LAST_NAME_EMPTY);
    } else if (!bodyParams.username){
        res.send(error.USERNAME_EMPTY);
    } else if (!bodyParams.password){
        res.send(error.PASSWORD_EMPTY);
    } else if (!bodyParams.email){
        res.send(error.EMAIL_EMPTY);
    } else if (!bodyParams.mobile){
        res.send(error.MOBILE_EMPTY);
    } else if (!bodyParams.ccode){
        res.send(error.CCODE_EMPTY);
    } else if (!bodyParams.country){
        res.send(error.COUNTRY_EMPTY);
    }else if (!bodyParams.userKeyclockId){
        res.send(error.KEYCLOCK_ID_EMPTY);
    }else if (!bodyParams.userMongoId){
        res.send(error.MONGO_ID_EMPTY);
    } else {
        return true;
    }
};

/**
 * This checks the validity to evaluate user
 * @param { resources, userId } req 
 * @param { code, message } res 
 * @returns 
 */
module.exports.checkValidityToEvalute = (req, res) => {
    const {  resources, userId } = req.body;
    if(!resources)
    {
        res.send(error.RESOURCES_EMPTY);
    } else if (!userId){
        res.send(error.USERNAME_EMPTY);
    } else {
        return true;
    }
};
