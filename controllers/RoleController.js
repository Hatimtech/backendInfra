const Users = require('../models/User');
const Bank = require('../models/Bank');
const { error } = require( "../utils/errorMessages");
const InfraConfigured = require('../models/InfraConfigured');
const {
    getToken,
    createRole,
    getUser,
    createUser,
    checkRoles,
    editusers,
    deleteUser,
} = require("../middlewares/keyClock") ;
const {
    getTokenFromRequestHeader,
    checkValidityToCreateBank,
    checkValidityToCreateUser
} = require("../middlewares/commonFunctions")

const { ADMIN_USERNAME , ADMIN_PASSWORD , GROUPS , ROLES} = require("../config/keyclockConstant") ;

exports.createUserRoles = async (req, res) => {
    let token = getTokenFromRequestHeader(req,res);
    const {
        name,
        attributes,
     } = req.body;
 
         const createRoleResponse = await createRole(token,name,attributes);
         if(createRoleResponse.length !== 0 ){
             res.send({ code: 0, message: "Error creating Users"});
         }
         else {
             res.send({
                 code: 1,
                 message: "Role Created successfully"
             });
         }
        
};

