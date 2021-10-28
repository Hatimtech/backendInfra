const { error } = require( "../../utils/errorMessages");

module.exports.checkValidityToCreateResource = (req, res) => {
    const { name, displayName, scopes } = req.body;
    if(!name)
    {
        res.send(error.NAME_EMPTY);
    } else if (!displayName){
        res.send(error.DISPLAY_NAME_EMPTY);
    } else if (!scopes){
        res.send(error.SCOPE_EMPTY);
    } else {
        return true;
    }

};

module.exports.checkValidityToDeleteResource = (req, res) => {
    const {resourceId } = req.body;
    if(!resourceId)
    {
        res.send(error.KEYCLOCK_ID_EMPTY);
    } else {
        return true;
    }
};

module.exports.checkValidityToUpdateResource = (req, res) => {
    const {resourceId, name, displayName, scopes } = req.body;
    if(!scopeId)
    {
        res.send(error.KEYCLOCK_ID_EMPTY);
    } else if (!displayName){
        res.send(error.DISPLAY_NAME_EMPTY);
    } else if (!name){
        res.send(error.NAME_EMPTY);
    } else if (!resourceId){
        res.send(error.KEYCLOCK_ID_EMPTY);
    } else if (!scopes){
        res.send(error.SCOPE_EMPTY);
    } else {
        return true;
    }
};