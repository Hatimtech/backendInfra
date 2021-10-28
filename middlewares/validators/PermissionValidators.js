const { error } = require( "../../utils/errorMessages");

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

module.exports.checkValidityToDeletePermissions = (req, res) => {
    const {permissionId } = req.body;
    if(!permissionId)
    {
        res.send(error.KEYCLOCK_ID_EMPTY);
    } else {
        return true;
    }
};

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