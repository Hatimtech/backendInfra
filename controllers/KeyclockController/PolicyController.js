const {
    createPolicy,
    getAllPolicy,
    deletePolicy,
    updatePolicy,
} = require("../../middlewares/keyclock/Policy") ;
const { error } = require( "../../utils/errorMessages");
const { getTokenFromRequestHeader } = require("../../middlewares/commonFunctions")
const {
    checkValidityToCreatePolicies,
    checkValidityToDeletePolicies,
    checkValidityToUpdatePolicies,
} = require("../../middlewares/validators/PoliciesValidators")
exports.createPolicies = async (req, res) => {
    let token = getTokenFromRequestHeader(req,res);
    const {
        name,
        description,
        roles,
    } = req.body;
    if(checkValidityToCreatePolicies(req,res)){

    const createPolicyResponse = await createPolicy(token,name, description, roles);
    if(JSON.parse(createPolicyResponse).error){
        res.status(200).json(error.POLICY_CREATE);
    }else{
        res.send({code: 1,message: "Policy created successfully" });
    }    
}  
};

exports.getAllPolicies = async (req, res) => {
    let token = getTokenFromRequestHeader(req,res);
        const getPolicyResponse = await getAllPolicy(token);
        console.log(getPolicyResponse);
        if(JSON.parse(getPolicyResponse).error){
            res.status(200).json(error.GET_ALL_POLICY);
        } else {
            const policies = JSON.parse(getPolicyResponse)
            res.send({
                code: 1,
                policies: policies,
            });
        }
};

exports.deletePolicies = async (req, res) => {
    const { policyId } = req.body;
    if(checkValidityToDeletePolicies(req,res)){

    
    let token = getTokenFromRequestHeader(req,res);
        const deletePolicyResponse = await deletePolicy(token, policyId);
        console.log(deletePolicyResponse);
        if(deletePolicyResponse.length !== 0 ){
            res.status(200).json(error.POLICY_DELETE);
        } else {
            res.send({
                code: 1,
                message: "Policy Deleted successfully"
            });
        }}
};

exports.updatePolicies = async (req, res) => {
    const {
        policyId,
        name,
        description,
        roles,
    } = req.body;
    
    if(checkValidityToUpdatePolicies(req,res)){
    let token = getTokenFromRequestHeader(req,res);
        const updatePolicyResponse = await updatePolicy(token, policyId, name, description, roles);
        console.log(updatePolicyResponse);
        if(updatePolicyResponse.length !== 0 ){
            res.status(200).json(error.POLICY_UPDATE);
        } else {
            res.send({
                code: 1,
                message: "Policy Updated successfully"
            });
        }}
};