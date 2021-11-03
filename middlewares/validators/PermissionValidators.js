const { error } = require( "../../utils/errorMessages");

/**
 * This is used to check validity to create permission
 * @param {name, description,policies, resources} req 
 * @param {code,message} res 
 * @returns 
 */
module.exports.checkValidityToCreatePermissions = (req, res) => {
    const { name, description,policies, resources, } = req.body;
    if(!name)
    {
        res.send(error.NAME_EMPTY);
    } else if (!description){
        res.send(error.DESCRIPTION_EMPTY);
    } else if (!policies){
        res.send(error.POLICIES_EMPTY);
    } else if (!resources){
        res.send(error.RESOURCES_EMPTY);
    }else {
        return true;
    }

};

/**
 * This is used to ckeck validity to delete a permission
 * @param {permissionId} req 
 * @param {code,message} res 
 * @returns 
 */
module.exports.checkValidityToDeletePermissions = (req, res) => {
    const {permissionId } = req.body;
    if(!permissionId)
    {
        res.send(error.KEYCLOCK_ID_EMPTY);
    } else {
        return true;
    }
};

/**
 * This is used to check validity to update permission
 * @param {permissionId, name, description,policies, resources} req 
 * @param {code, message} res 
 * @returns 
 */
module.exports.checkValidityToUpdatePermissions = (req, res) => {
    const {permissionId, name, description,policies, resources } = req.body;
    if(!permissionId)
    {
        res.send(error.KEYCLOCK_ID_EMPTY);
    } else if (!name){
        res.send(error.NAME_EMPTY);
    } else if (!description){
        res.send(error.DESCRIPTION_EMPTY);
    } else if (!policies){
        res.send(error.POLICIES_EMPTY);
    }else if (!resources){
        res.send(error.RESOURCES_EMPTY);
    } 
     else {
        return true;
    }
};