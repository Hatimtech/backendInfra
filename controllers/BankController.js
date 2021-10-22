const Bank = require('../models/Bank');
const {
    getUser,
    createUser,
    editusers,
    deleteUser,
} = require("../middlewares/keyClock") ;
const { getTokenFromRequestHeader } = require("../middlewares/commonFunctions")

const {  GROUPS } = require("../config/keyclockConstant") ;



exports.createBank = async (req, res) => {
    let token = getTokenFromRequestHeader(req,res);
    const {
        name,
        bcode,
        address,
        state,
        zip,
        user_id,
        contract,
        email,
        country,
        ccode,
        mobile,
        password,
        logo,
    } = req.body;
        const createUserResponse = await createUser(token,name,"",mobile,password,email,GROUPS.BANK_GROUP);
        if(createUserResponse.length !== 0 ){
            res.send({ status: 0, message: "Error creating Bank"});
        }
        else {
            const getUserResponse = await getUser(token, mobile);
            const userKeyclockId = JSON.parse(getUserResponse)[0].id;
            let data = new Bank();
            data.keyclock_id = userKeyclockId;
            data.name = name,
            data.bcode = bcode,
            data.address = address,
            data.state = state,
            data.zip = zip,
            data.user_id = user_id,
            data.contract = contract,
            data.email = email,
            data.country = country,
            data.ccode = ccode,
            data.mobile = mobile,
            data.username = mobile,
            data.password = password,
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
                    res.send({
                        status: 1,
                        message: "Bank Created successfully"
                    });
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