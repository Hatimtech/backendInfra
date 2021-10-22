const Users = require('../models/User');
const Bank = require('../models/Bank');
const InfraConfigured = require('../models/InfraConfigured');
const {
    getToken,
    getUser,
    createUser,
    checkRoles,
    editusers,
    deleteUser,
} = require("../middlewares/keyClock") ;
const { getTokenFromRequestHeader } = require("../middlewares/commonFunctions")

const { ADMIN_USERNAME , ADMIN_PASSWORD , GROUPS , ROLES} = require("../config/keyclockConstant") ;


/**
 * This is used when we primarily setting up the project which help in creating first infra Admin.
 * @param {firstName,lastName, username, password, email, mobile, ccode , country } req
 * @param { status, message} res
 */
exports.infraSetup = async (req, res) => {
    //this is req params
    const {firstName,lastName, username, password, email, mobile, ccode , country, roles } = req.body;
    //get token
    const tokenResponse = await getToken(ADMIN_USERNAME, ADMIN_PASSWORD);

    if(JSON.parse(tokenResponse).error){
        res.status(200).json({
            status: 0,
            message: "Error getting token",
        });

    }else{
        const token = JSON.parse(tokenResponse).access_token;
        const createUserResponse = await createUser(token,firstName,lastName,username,password,email,GROUPS.INFRA_GROUP);
        if(createUserResponse.length !== 0 ){
            res.status(200).json({
                status: 0,
                message: "Error creating infra",
            });
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
                        res.status(200).json({
                            status: 0,
                            message: "Error deleting infra in keyclock",
                        });
                    } else {
                        res.status(200).json({
                            status: 0,
                            message: message,
                        });
                    }
                } else {
                    let infra = new InfraConfigured()
                    infra.isConfigured = true
                    infra.save()
                    res.send({status: 1,message: "User Created successfully" , username: username});
                }
            });
        }
    }
};

/**
 * This is used for checking if there is an infra user in the system or not.
 * @param { } req
 * @param { status, message} res
 */
exports.checkInfraIsConfigured = async (req, res) => {

    try {
         await InfraConfigured.findOne().then(response=>{
             res.send({ status: (response.isConfigured) ? 1 : 0 , message: (response.isConfigured) ? "Infra admin is configured" : "infra admin is not configured" });
        });

    } catch (err) {
        res.send({ status: 0, message: err.message, err: JSON.stringify(err) });
    }

};


/**
 * Infr user register API
 * @param { token, name, email, country, ccode, mobile, username, password, roles,logo,} req
 * @param { status, message} res
 */

exports.registerInfraUser = async (req, res) => {
    let token = getTokenFromRequestHeader(req,res);
    const {
        firstName,
        lastName,
        email,
        country,
        ccode,
        mobile,
        username,
        password,
        roles,
        logo,
    } = req.body;
        const createUserResponse = await createUser(token,firstName,lastName,username,password,email,GROUPS.INFRA_GROUP);
        if(createUserResponse.length !== 0 ){
            res.send({ status: 0, message: "Error creating Users"});
        }
        else {
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
            data.save(async(err1) => {
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
                        message: "User Created successfully"
                    });
                }
            });

        }
    
};



/**
 * This is used for Login to anyuser.
 * @param {username, password } req
 * @param { status, message, token} res
 */
exports.login = async (req, res) => {
    const { username, password } = req.body;
    const tokenResponse = await getToken(username, password);

    if(JSON.parse(tokenResponse).hasOwnProperty('error')){
        res.send({ status: 0, message: "Error getting token" });
    }else{
        const token =JSON.parse(tokenResponse).access_token;
        if(!checkRoles(token, ROLES.INFRA_ADMIN_ROLE)) {
            res.send({ status: 0, message: "Unauthorized to login" });
        }else{
            res.send({ status: 1, message: "Authorized to login", token : token });


        }
    }

};


/**
 * This is used for getting Infra User list.
 * @param {token } req
 * @param { status, message, users} res
 */
exports.getInfraUsers = async (req, res) => {
        try {
            const InfrUsers = await Users.find();
            res.send({ status: 1, message: "User found", users : InfrUsers });
        }catch(err)
        {
            res.send({ status: 0, message: err });
        }
};



exports.enableOrDisableUser = async (req, res) => {
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
            res.send({ status: 0, message: "Users Cannot be edited."});
        }
        else {
                res.send({status: 1,message: `User ${isEnabled ? "enabled" : "disabled"} successfully`});
                

        }
    
};


exports.editUser = async (req, res) => {
    let token = getTokenFromRequestHeader(req,res);
    const {
        userId,
        userMongoId,
        firstName,
        lastName,
        username,
        email,
        country,
        ccode,
        mobile,
        password,
        logo,
    } = req.body;
    let editParams = {
        firstName : firstName,
        lastName: lastName,
        email: email,
        username: username,
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
            res.send({ status: 0, message: "Users Cannot be edited."});
        }
        else {
            Users.findOneAndUpdate(
                { _id: userMongoId },
                {
                    firstname: firstName,
                    lastname: lastName,
                    email: email,
                    country: country,
                    ccode: ccode,
                    mobile: mobile,
                    username: username
                },
                (err1, user) => {
                    if (err1) {
                        var message1 = err1;
                        if (err1.message) { message1 = err1.message; }
                        res.send({status: 0,message: message1,});
                    } else {
                        res.send({
                            status: 1,
                            message: "User Edited successfully"
                        });
                    }
                }
            );
                

        }
    
};
