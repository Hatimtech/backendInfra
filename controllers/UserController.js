const Users = require('../models/User');
const Bank = require('../models/Bank');
const InfraConfigured = require('../models/InfraConfigured');
const {
    getToken,
    createUser,
    checkRoles,
    editusers,
} = require("../middlewares/keyClock") ;

const { ADMIN_USERNAME , ADMIN_PASSWORD , GROUPS , ROLES} = require("../config/keyclockConstant") ;


/**
 * This is used when we primarily setting up the project which help in creating first infra Admin.
 * @param {firstName,lastName, username, password, email, mobile, ccode , country } req
 * @param { status, message} res
 */
exports.infraSetup = async (req, res) => {
    //this is req params
    const {firstName,lastName, username, password, email, mobile, ccode , country } = req.body;
    //get token
    const tokenResponse = await getToken(ADMIN_USERNAME, ADMIN_PASSWORD);
    console.log(tokenResponse)

    if(JSON.parse(tokenResponse).error){
        res.status(200).json({
            status: 0,
            message: "Error getting token",
        });

    }else{
        const token =JSON.parse(tokenResponse).access_token;
        const createUserResponse = await createUser(token,firstName,lastName,username,password,email,GROUPS.INFRA_GROUP);
        if(createUserResponse.length !== 0 ){
            res.status(200).json({
                status: 0,
                message: "Error creating infra",
            });
        } else {
            let data = new Users();
            data.firstname = firstName;
            data.lastname = lastName;
            data.username = username;
            data.roles = roles;
            data.mobile = mobile;
            data.email = email;
            data.ccode = ccode;
            data.country = country;
            data.save((err) => {
                if (err) {
                    var message = err;
                    if (err.message) {
                        message = err.message;
                    }
                    res.status(200).json({
                        status: 0,
                        message: message,
                    });
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
    let data = new Users();
    let token = req.headers["x-access-token"] || req.headers["authorization"];
    if (!token) res.send({ code: 0, message: "Token Required" });
    if(token)
    {
      if (token.startsWith("Bearer ")) {
          // Remove Bearer from string
          console.log('In check infra1')     
          token = token.slice(7, token.length);
        }
    }
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
            data.firstname = firstName;
            data.lastname = lastName;
            data.username = username;
            data.roles = roles;
            data.mobile = mobile;
            data.email = email;
            data.ccode = ccode;
            data.country = country;
            data.save((err1) => {
                if (err1) {
                    var message1 = err1;
                    if (err1.message) { message1 = err1.message; }
                    res.send({status: 0,message: message1,});
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
    let token = req.headers["x-access-token"] || req.headers["authorization"];
    if (!token) res.send({ code: 0, message: "Token Required" });
    if(token)
    {
      if (token.startsWith("Bearer ")) {
          // Remove Bearer from string
          console.log('In check infra1')     
          token = token.slice(7, token.length);
        }
    }
    const {
        userId,
        isEnabled,
    } = req.body;
    
    let editParams = {
         enabled : isEnabled
    }
        
        const editUserResponse = await editusers(token,userId,editParams);
        console.log(editUserResponse);
        if(editUserResponse.length !== 0 ){
            res.send({ status: 0, message: "Users Cannot be edited."});
        }
        else {
                res.send({status: 1,message: `User ${isEnabled ? "enabled" : "disabled"} successfully`});
                

        }
    
};


exports.editUser = async (req, res) => {
    let token = req.headers["x-access-token"] || req.headers["authorization"];
    if (!token) res.send({ code: 0, message: "Token Required" });
    if(token)
    {
      if (token.startsWith("Bearer ")) {
          // Remove Bearer from string
          console.log('In check infra1')     
          token = token.slice(7, token.length);
        }
    }
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
        console.log(editUserResponse);
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

exports.createBank = async (req, res) => {
    let data = new Bank();
    let token = req.headers["x-access-token"] || req.headers["authorization"];
    if (!token) res.send({ code: 0, message: "Token Required" });
    if(token)
    {
      if (token.startsWith("Bearer ")) {
          // Remove Bearer from string
          console.log('In check infra1')     
          token = token.slice(7, token.length);
        }
    }
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
            data.save((err1) => {
                if (err1) {
                    var message1 = err1;
                    if (err1.message) { message1 = err1.message; }
                    res.send({status: 0,message: message1,});
                } else {
                    res.send({
                        status: 1,
                        message: "Bank Created successfully"
                    });
                }
            });

        }
    
};

exports.editBank = async (req, res) => {
    let token = req.headers["x-access-token"] || req.headers["authorization"];
    if (!token) res.send({ code: 0, message: "Token Required" });
    if(token)
    {
      if (token.startsWith("Bearer ")) {
          // Remove Bearer from string
          console.log('In check infra1')     
          token = token.slice(7, token.length);
        }
    }
    const {
        userId,
        userMongoId,
        name,
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
        console.log(editUserResponse);
        if(editUserResponse.length !== 0 ){
            res.send({ status: 0, message: "Bank Cannot be edited."});
        }
        else {
            Users.findOneAndUpdate(
                { _id: userMongoId },
                {
                    name : name,
                    address : address,
                    state : state,
                    zip : zip,
                    user_id : user_id,
                    contract : contract,
                    email : email,
                    country : country,
                    ccode : ccode,
                    mobile : mobile,
                    username : mobile,
                    logo : logo,
                },
                (err1, user) => {
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