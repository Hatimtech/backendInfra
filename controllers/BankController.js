const Users = require('../models/User');
const Bank = require('../models/Bank');
const { error } = require( "../utils/errorMessages");
const InfraConfigured = require('../models/InfraConfigured');
const {
    getToken,
    getUser,
    createUser,
    createRole,
    checkRoles,
    editusers,
    deleteUser,
} = require("../middlewares/keyClock") ;
const {
    getTokenFromRequestHeader,
    checkValidityToCreateBank,
    checkValidityToCreateUser,
    checkValidityToAssignUserToBank
} = require("../middlewares/commonFunctions")

const { ADMIN_USERNAME , ADMIN_PASSWORD , GROUPS , ROLES} = require("../config/keyclockConstant") ;



exports.createBank = async (req, res) => {
    const {
        ccode ,
        country, 
        name,
        bcode,
        address,
        state,
        zip,
        contract,
        logo,
    } = req.body;

    if (checkValidityToCreateBank(req,res)){
        let data = new Bank();
        data.name = name,
        data.bcode = bcode,
        data.address = address,
        data.state = state,
        data.zip = zip,
        data.contract = contract,
        data.country = country,
        data.ccode = ccode,
        data.logo = logo,
        data.save(async (err1) => {
            if (err1) {
                var message1 = err1;
                if (err1.message) { message1 = err1.message; }
                    res.send({status: 0,message: message1,});
                } else {
                    res.send({code: 1,message: "Bank Created successfully"});
                }
        });
    }
        
};


exports.enableOrDisableBank = async (req, res) => {
    let token = getTokenFromRequestHeader(req,res);
    const {
        userId,
        isEnabled,
    } = req.body;
    
    let editParams = {
         enabled : isEnabled
    }
        const editUserResponse = await editusers(token,userId,editParams);
        if(editUserResponse.length !== 0 ){
            res.send({ status: 0, message: "Bank Cannot be edited."});
        }
        else {
                res.send({status: 1,message: `Bank ${isEnabled ? "enabled" : "disabled"} successfully`});
                

        }
};


exports.editBank = async (req, res) => {
    let token = getTokenFromRequestHeader(req,res);
    const {
        userId,
        userMongoId,
        name,
        address,
        state,
        zip,
        contract,
        email,
        country,
        ccode,
        mobile,
        password,
        logo,
    } = req.body;
    let editParams = {
        firstName : name,
        lastName: '',
        email: email,
        username: mobile,
        credentials:[
            {
              "type":"password",
                "value":password,
                "temporary":false
            }
      ],
    }
     
        const editUserResponse = await editusers(token,userId,editParams);
        if(editUserResponse.length !== 0 ){
            res.send({ status: 0, message: "Bank Cannot be edited."});
        }
        else {
            Bank.findOneAndUpdate(
                { _id: userMongoId },
                {
                    name : name,
                    address : address,
                    state : state,
                    zip : zip,
                    contract : contract,
                    email : email,
                    country : country,
                    ccode : ccode,
                    mobile : mobile,
                    username : mobile,
                    logo : logo,
                },
                (err1, bank) => {
                    if (err1) {
                        var message1 = err1;
                        if (err1.message) { message1 = err1.message; }
                        res.send({status: 0,message: message1,});
                    } else {
                        res.send({
                            status: 1,
                            message: "Bank Edited successfully"
                        });
                    }
                }
            );
                

        }
    
};


exports.assignUserToBank= async (req, res) => {
    const {
        userMongoId,
        bankMongoId,
    } = req.body;
    if (checkValidityToAssignUserToBank(req,res)){
            Users.findByIdAndUpdate(
                userMongoId,
                {
                    user_type : {
                        bank_mongo_id: bankMongoId,
                    },
                },
                (err1) => {
                    if (err1) {
                        var message1 = err1;
                        if (err1.message) { message1 = err1.message; }
                        res.send({status: 0,message: message1,});
                    } else {
                        res.send({
                            status: 1,
                            message: "User Assigned successfully"
                        });
                    }
                }
            );
    } 
};