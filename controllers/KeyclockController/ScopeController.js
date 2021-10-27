const {
    createScope,
} = require("../../middlewares/keyclock/Scope") ;
const { error } = require( "../../utils/errorMessages");
const { getTokenFromRequestHeader } = require("../../middlewares/commonFunctions")

exports.createScope = async (req, res) => {
    let token = getTokenFromRequestHeader(req,res);
    const {
        name,
        displayName,
    } = req.body;
    const createScopeResponse = await createScope(token,name,displayName);
    if(JSON.parse(createScopeResponse).error){
        res.status(200).json(error.SCOPE_CREATE);
    }else{
        res.send({code: 1,message: "Scope created successfully" });
    }      
};