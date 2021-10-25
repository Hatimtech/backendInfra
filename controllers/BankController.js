const Users = require('../models/User');
const Bank = require('../models/Bank');
const { error } = require( "../utils/errorMessages");
const InfraConfigured = require('../models/InfraConfigured');
const {
    getToken,
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



exports.createBank = async (req, res) => {
    let token = getTokenFromRequestHeader(req,res);
    const {
        firstName,
        lastName,
        username,
        password,
        email,
        mobile,
        ccode ,
        country, 
        roles,
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
                const deleteUserResponse = await deleteUser(token, userKeyclockId);
                if(deleteUserResponse.length !== 0 ){
                    res.status(200).json({
                        status: 0,
                        message: "Error deleting infra in keyclock",
                    });
                } else {
                    res.send({status: 0,message: message1,});
                }
            } else {
                if (checkValidityToCreateUser(req,res)){
                    const createUserResponse = await createUser(token,firstName,lastName,username,password,email,GROUPS.BANK_GROUP);
                    if(createUserResponse.length !== 0 ){
                        res.status(200).json(error.USER_CREATE);
                    } else {
                        const getUserResponse = await getUser(token, username);
                        const userKeyclockId = JSON.parse(getUserResponse)[0].id;
                        let data = new Users();
                        data.keyclock_id = userKeyclockId;
                        data.firstname = firstName;
                        data.lastname = lastName;
                        data.username = username;
                        data.roles = roles;
                        data.mobile = mobile;
                        data.email = email;
                        data.ccode = ccode;
                        data.country = country;
                        data.save(async (err) => {
                        if (err) {
                            var message = err;
                            if (err.message) {
                                message = err.message;
                            }
                            const deleteUserResponse = await deleteUser(token, userKeyclockId);
                            if(deleteUserResponse.length !== 0 ){
                                res.status(200).json(error.USER_DELETE);
                            } else {
                                res.status(200).json({
                                    code: 0,
                                    message: message,
                                });
                            }
                        } else {
                            res.send({code: 1,message: "Bank Created successfully"});
                        }
                });
                    }
                }
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