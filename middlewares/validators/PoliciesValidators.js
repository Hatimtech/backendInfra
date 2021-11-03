const { error } = require( "../../utils/errorMessages");

/**
 * This checks the validity to create a policy
 * @param {name, description,roles} req 
 * @param {code, message} res 
 * @returns 
 */
module.exports.checkValidityToCreatePolicies = (req, res) => {
    const { name, description,roles } = req.body;
    if(!name)
    {
        res.send(error.NAME_EMPTY);
    } else if (!description){
        res.send(error.DESCRIPTION_EMPTY);
    } else if (!roles){
        res.send(error.ROLE_EMPTY);
    } else {
        return true;
    }

};

/**
 * This checks the validity to delete a policy
 * @param {policyId} req 
 * @param {code,message} res 
 * @returns 
 */
module.exports.checkValidityToDeletePolicies = (req, res) => {
    const {policyId } = req.body;
    if(!policyId)
    {
        res.send(error.KEYCLOCK_ID_EMPTY);
    } else {
        return true;
    }
};

/**
 * This checks the validity to update policy
 * @param {policyId, name, description,roles} req 
 * @param {code, message} res 
 * @returns 
 */
module.exports.checkValidityToUpdatePolicies = (req, res) => {
    const {policyId, name, description,roles } = req.body;
    if(!policyId)
    {
        res.send(error.KEYCLOCK_ID_EMPTY);
    } else if (!displayName){
        res.send(error.DISPLAY_NAME_EMPTY);
    } else if (!name){
        res.send(error.NAME_EMPTY);
    } else if (!description){
        res.send(error.DESCRIPTION_EMPTY);
    } else if (!roles){
        res.send(error.ROLE_EMPTY);
    } else {
        return true;
    }
};