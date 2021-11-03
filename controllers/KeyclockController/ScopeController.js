const {
    createScope,
    getAllScopes,
    deleteScope,
    updateScope,
} = require("../../middlewares/keyclock/Scope") ;
const { error } = require( "../../utils/errorMessages");
const { getTokenFromRequestHeader } = require("../../middlewares/commonFunctions");

const {
    checkValidityToCreateScope,
    checkValidityToDeleteScope,
    checkValidityToUpdateScope,
} = require("../../middlewares/validators/ScopeValidators")

/**
 * This is used to create a scope
 * @param { name, displayName } req 
 * @param { code, message } res 
 */
exports.createScope = async (req, res) => {
    let token = getTokenFromRequestHeader(req,res);
    const {
        name,
        displayName,
    } = req.body;
    if(checkValidityToCreateScope(req,res)){
        const createScopeResponse = await createScope(token,name,displayName);
        if(JSON.parse(createScopeResponse).error){
            res.status(200).json(error.SCOPE_CREATE);
        }else{
            res.send({code: 1,message: "Scope created successfully" });
        }
    }    
};

/**
 * This is used to get all scopes
 * @param {*} req 
 * @param { code, scopes } res 
 */
exports.getAllScopes = async (req, res) => {
    let token = getTokenFromRequestHeader(req,res);
        const getScopeResponse = await getAllScopes(token);
        console.log(getScopeResponse);
        if(JSON.parse(getScopeResponse).error){
            res.status(200).json(error.GET_ALL_SCOPE);
        } else {
            const scopes = JSON.parse(getScopeResponse)
            res.send({
                code: 1,
                scopes: scopes,
            });
        }
};

/**
 * This is used to delete a scope
 * @param { scopeId } req 
 * @param { code, message } res 
 */
exports.deleteScopes = async (req, res) => {
    const { scopeId } = req.body;
    let token = getTokenFromRequestHeader(req,res);
    if(checkValidityToDeleteScope(req,res)){
        const deleteScopeResponse = await deleteScope(token, scopeId);
        console.log(deleteScopeResponse);
        if(deleteScopeResponse.length !== 0 ){
            res.status(200).json(error.SCOPE_DELETE);
        } else {
            res.send({
                code: 1,
                message: "Scope Deleted successfully"
            });
        }
    }
};

/**
 * This is used to update a scope
 * @param { scopeId, name, displayName } req 
 * @param { code, message } res 
 */
exports.updateScopes = async (req, res) => {
    const { scopeId, name, displayName} = req.body;
    let token = getTokenFromRequestHeader(req,res);
    if(checkValidityToUpdateScope(req,res)){
        const updateScopeResponse = await updateScope(token, scopeId, name, displayName);
        console.log(updateScopeResponse);
        if(updateScopeResponse.length !== 0 ){
            res.status(200).json(error.SCOPE_UPDATE);
        } else {
            res.send({
                code: 1,
                message: "Scope Updated successfully"
            });
        }
    }
};
