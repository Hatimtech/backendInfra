const Users = require('../models/User');
const Bank = require('../models/Bank');
const { editusers } = require("../middlewares/keyclock/User") ;
const {
    checkValidityToCreateBank,
    checkValidityToEditBank,
    checkValidityToAssignUserToBank,
} = require("../middlewares/validators/BankValidators")
const { getTokenFromRequestHeader } = require("../middlewares/commonFunctions")

/**
 * This is used to create a new bank
 * @param {requestParamsBank} req 
 * @param {code,message} res 
 */
exports.createBank = async (req, res) => {
    let bank =  new Bank(req.body)
    const response =  await checkValidityToCreateBank(bank)
    if (response === true ){
        bank.save(async (err1) => {
            if (err1) {
                var message1 = err1;
                if (err1.message) { message1 = err1.message; }
                    res.send({status: 0,message: message1,});
                } else {
                    res.send({code: 1,message: "Bank Created successfully"});
                }
        });
    } else {
        res.send(response)
    }
        
};

/**
 * this is used to get all banks
 * @param {*} req 
 * @param { code, message} res 
 */
exports.getAllBank = async (req, res) => {
    try {
        const banks = await Bank.find();
        res.send({ code: 1, banks : banks });
    }catch(err)
    {
        res.send({ code: 0, message: err });
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

/**
 * 
 * @param { bankMongoId,ccode ,country, name, address, state, zip, contract, logo} req 
 * @param { code, message} res 
 */
exports.editBank = async (req, res) => {
    const {
        bankMongoId,
        ccode ,
        country, 
        name,
        address,
        state,
        zip,
        contract,
        logo,
    } = req.body;
   
    if (checkValidityToEditBank(req,res)){
        Bank.findOneAndUpdate(
            { _id: bankMongoId },
            {
                name : name,
                address : address,
                state : state,
                zip : zip,
                contract : contract,
                country : country,
                ccode : ccode,
                logo : logo,
                modified_at: Date.now(),
            },
            (err1, bank) => {
                if (err1) {
                    var message1 = err1;
                    if (err1.message) { message1 = err1.message; }
                    res.send({code: 0,message: message1,});
                } else {
                    res.send({
                        code: 1,
                        message: "Bank Edited successfully"
                    });
                }
            }
        );
    }
};

/**
 * This is used to assign a user to the bank
 * @param { userMongoId, bankMongoId} req 
 * @param { code, message} res 
 */
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
                        res.send({code: 0,message: message1,});
                    } else {
                        res.send({
                            code: 1,
                            message: "User Assigned successfully"
                        });
                    }
                }
            );
    } 
};