const { error } = require( "../../utils/errorMessages");

module.exports.checkValidityToCreateScope = (req, res) => {
    const {name, displayName } = req.body;
    if(!name)
    {
        res.send(error.NAME_EMPTY);
    } else if (!displayName){
        res.send(error.DISPLAY_NAME_EMPTY);
    } else {
        return true;
    }

};

module.exports.checkValidityToDeleteScope = (req, res) => {
    const {scopeId } = req.body;
    if(!scopeId)
    {
        res.send(error.KEYCLOCK_ID_EMPTY);
    } else {
        return true;
    }
};

module.exports.checkValidityToUpdateScope = (req, res) => {
    const {scopeId, name, displayName } = req.body;
    if(!scopeId)
    {
        res.send(error.KEYCLOCK_ID_EMPTY);
    } else if (!displayName){
        res.send(error.DISPLAY_NAME_EMPTY);
    } else if (!name){
        res.send(error.NAME_EMPTY);
    } else {
        return true;
    }
};