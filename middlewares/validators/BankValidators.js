const { error } = require( "../../utils/errorMessages");

/**
 * This checks the validity to assign a user to bank
 * @param { userMongoId bankMongoId} req 
 * @param { code, message } res 
 * @returns { Boolean }
 */
module.exports.checkValidityToAssignUserToBank = (req, res) => {
    const { userMongoId, bankMongoId } = req.body;
    if(!userMongoId)
    {
        res.send(error.MONGO_ID_EMPTY);
    } else if (!bankMongoId){
        res.send(error.MONGO_ID_EMPTY);
    } else {
        return true;
    }

};

/**
 * This checks the validity to create a bank
 * @param {ccode,country,name,bcode,address,state,contract,logo,zip,creater_mongo_id,creater_keyclock_id} bank 
 * @returns { code, message}
 */
module.exports.checkValidityToCreateBank = (bank) => {
    if(!bank.ccode)
    {
        return(error.CCODE_EMPTY);
    } else if (!bank.country){
        return(error.COUNTRY_EMPTY);
    } else if (!bank.name){
        return(error.NAME_EMPTY);
    } else if (!bank.bcode){
        return(error.BANK_CODE_EMPTY);
    } else if (!bank.address){
        return(error.ADDRESS_EMPTY);
    } else if (!bank.state){
        return(error.STATE_EMPTY);
    } else if (!bank.contract){
        return(error.CONTRACT_EMPTY);
    } else if (!bank.logo){
        return(error.LOGO_EMPTY);
    } else if (!bank.zip){
        return(error.ZIP_EMPTY);
    } else if (!bank.creater_mongo_id){
        return(error.MONGO_ID_EMPTY);
    } else if (!bank.creater_keyclock_id){
        return(error.KEYCLOCK_ID_EMPTY);
    } else {
        return true;
    }

};

/**
 * This checks the validity to Edit a bank
 * @param { bankMongoId, ccode, country, name, address, state, zip, contract, logo } req 
 * @param { code, message } res 
 * @returns 
 */
module.exports.checkValidityToEditBank = (req, res) => {
    const {
        bankMongoId,
        ccode ,
        country, 
        name,
        address,
        state,
        zip,
        contract,
        logo,
    } = req.body;
    if(!ccode)
    {
        res.send(error.CCODE_EMPTY);
    } else if (!country){
        res.send(error.COUNTRY_EMPTY);
    } else if (!name){
        res.send(error.NAME_EMPTY);
    } else if (!address){
        res.send(error.ADDRESS_EMPTY);
    } else if (!state){
        res.send(error.STATE_EMPTY);
    } else if (!contract){
        res.send(error.CONTRACT_EMPTY);
    } else if (!logo){
        res.send(error.LOGO_EMPTY);
    } else if (!zip){
        res.send(error.ZIP_EMPTY);
    } else if (!bankMongoId){
        res.send(error.MONGO_ID_EMPTY);
    } else {
        return true;
    }

};