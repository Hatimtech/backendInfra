const {
    createResource,
    getAllResource,
    deleteResource,
    updateResource,
} = require("../../middlewares/keyclock/Resource") ;
const { error } = require( "../../utils/errorMessages");
const { getTokenFromRequestHeader } = require("../../middlewares/commonFunctions");
const {
    checkValidityToCreateResource,
    checkValidityToDeleteResource,
    checkValidityToUpdateResource,
} = require("../../middlewares/validators/ResourceValidators")

/**
 * 
 * @param { name, displayName, scopes, uris } req 
 * @param { code, message } res 
 */
exports.createResources = async (req, res) => {
    let token = getTokenFromRequestHeader(req,res);
    const {
        name,
        displayName,
        scopes,
        uris,
    } = req.body;
    if(checkValidityToCreateResource(req,res)){
        const createResourseResponse = await createResource(token,name,displayName, scopes, uris);
        if(JSON.parse(createResourseResponse).error){
            res.status(200).json(error.ROLE_CREATE);
        }else{
            res.send({code: 1,message: "Resource created successfully" });
        }
    }     
};

/**
 * 
 * @param {*} req 
 * @param { code, resources} res 
 */
exports.getAllResources = async (req, res) => {
    let token = getTokenFromRequestHeader(req,res);
        const getResourceResponse = await getAllResource(token);
        console.log(getResourceResponse);
        if(JSON.parse(getResourceResponse).error){
            res.status(200).json(error.GET_ALL_RESOURCE);
        } else {
            const resources = JSON.parse(getResourceResponse)
            res.send({
                code: 1,
                resources: resources,
            });
        }
};

/**
 * 
 * @param { resourceId } req 
 * @param { code, message} res 
 */
exports.deleteResources = async (req, res) => {
    const { resourceId } = req.body;
    let token = getTokenFromRequestHeader(req,res);
    if(checkValidityToDeleteResource(req,res)){
        const deleteResourceResponse = await deleteResource(token, resourceId);
        console.log(deleteResourceResponse);
        if(deleteResourceResponse.length !== 0 ){
            res.status(200).json(error.RESOURCE_DELETE);
        } else {
            res.send({
                code: 1,
                message: "Resource Deleted successfully"
            });
        }
    }
};

/**
 * 
 * @param { resourceId, name, displayName, scopes, uris} req 
 * @param { code, message} res 
 */

exports.updateResources = async (req, res) => {
    const {
        resourceId,
        name,
        displayName,
        scopes,
        uris,
    } = req.body;
    let token = getTokenFromRequestHeader(req,res);
    if(checkValidityToUpdateResource(req,res)){
        const updateResourceResponse = await updateResource(token, resourceId, name, displayName, scopes,uris);
        console.log(updateResourceResponse);
        if(updateResourceResponse.length !== 0 ){
            res.status(200).json(error.RESOURCE_UPDATE);
        } else {
            res.send({
                code: 1,
                message: "Resource Updated successfully"
            });
        }
    }
};
