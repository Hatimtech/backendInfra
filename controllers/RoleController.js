const Users = require('../models/User');
const Bank = require('../models/Bank');
const { error } = require( "../utils/errorMessages");
const InfraConfigured = require('../models/InfraConfigured');
const {
    getToken,
    createRole,
    getAllRoles,
    deleteRole,
    editRole,
    assignRole,
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
             res.send(error.ROLE_CREATE);
         }
         else {
             res.send({
                 code: 1,
                 message: "Role Created successfully"
             });
         }
        
};

exports.editeRoles = async (req, res) => {
    let token = getTokenFromRequestHeader(req,res);
    const {
        name,
        attributes,
     } = req.body;
 
         const editRoleResponse = await editRole(token,name,attributes);
         if(editRoleResponse.length !== 0 ){
             res.send(error.ROLE_EDIT);
         }
         else {
             res.send({
                 code: 1,
                 message: "Role Edited successfully"
             });
         }
        
};

exports.getAllRoles = async (req, res) => {
    let token = getTokenFromRequestHeader(req,res);
        const getRoleResponse = await getAllRoles(token);
        if(JSON.parse(getRoleResponse).error){
            res.status(200).json(error.GET_ALL_ROLE);
        } else {
            const roles = JSON.parse(getRoleResponse)
            res.send({
                code: 1,
                roles: roles,
            });
        }
};

exports.deleteRole = async (req, res) => {
    const { name } = req.body;
    let token = getTokenFromRequestHeader(req,res);
        const deleteRoleResponse = await deleteRole(token, name);
        console.log(deleteRoleResponse);
        if(deleteRoleResponse.length !== 0 ){
            res.status(200).json(error.ROLE_DELETE);
        } else {
            res.send({
                code: 1,
                message: "Role Deleted successfully"
            });
        }
};

exports.assignRole = async (req, res) => {
    const { name, userKeyclockId } = req.body;
    let token = getTokenFromRequestHeader(req,res);
        const assignRoleResponse = await assignRole(token, userKeyclockId, name);
        console.log(assignRoleResponse);
        if(assignRoleResponse.length !== 0 ){
            res.status(200).json(error.ROLE_ASSIGN);
        } else {
            res.send({
                code: 1,
                message: "Role Assigned successfully"
            });
        }
};
