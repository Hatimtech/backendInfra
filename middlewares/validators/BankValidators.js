const { error } = require( "../../utils/errorMessages");

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

module.exports.checkValidityToCreateBank = (req, res) => {
    const {
        createrMongoId,
        createrKeyclockId,
        ccode ,
        country, 
        name,
        bcode,
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
    } else if (!bcode){
        res.send(error.BANK_CODE_EMPTY);
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
    } else if (!createrMongoId){
        res.send(error.MONGO_ID_EMPTY);
    } else if (!createrKeyclockId){
        res.send(error.KEYCLOCK_ID_EMPTY);
    } else {
        return true;
    }

};


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