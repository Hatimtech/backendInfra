const { error } = require( "../../utils/errorMessages");

/**
 * This checks the validity to create resource
 * @param {name, displayName, scopes} req 
 * @param {code, message} res 
 * @returns 
 */
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

/**
 * This checks the validity to delete a resource
 * @param {resourceId} req 
 * @param {code, message} res 
 * @returns 
 */
module.exports.checkValidityToDeleteResource = (req, res) => {
    const {resourceId } = req.body;
    if(!resourceId)
    {
        res.send(error.KEYCLOCK_ID_EMPTY);
    } else {
        return true;
    }
};

/**
 * This checks the validity to update a resource
 * @param { resourceId, name, displayName, scopes} req 
 * @param {code, message} res 
 * @returns 
 */
module.exports.checkValidityToUpdateResource = (req, res) => {
    const {resourceId, name, displayName, scopes } = req.body;
    if(!resourceId)
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