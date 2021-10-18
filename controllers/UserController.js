const User = require('../models/User');
const InfraConfigured = require('../models/InfraConfigured');
const jwt = require('jsonwebtoken');
const {
    getToken,
    createUser,
    checkRoles,
} = require("../middlewares/keyClock") ;

const { ADMIN_USERNAME , ADMIN_PASSWORD , groups , roles} = require("../config/keyclockConstant") ;


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
    if(tokenResponse.error){
        res.status(200).json({
            status: 0,
            message: "Error getting token",
        });

    }else{
        const token =JSON.parse(tokenResponse).access_token;
        const createUserResponse = await createUser(token,firstName,lastName,username,password,email,groups.INFRA_GROUP);
        if(createUserResponse){
            res.status(200).json({
                status: 0,
                message: "Error creating infra",
            });
        } else {
            let data = new User();
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
                    res.send({status: 1,message: "User Created successfully" , username: username , password: password});
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
    const {
        token,
        name,
        email,
        country,
        ccode,
        mobile,
        username,
        password,
        roles,
        logo,
    } = req.body;
    if(!checkRoles(token, roles.INFRA_ADMIN_ROLE)) {
        res.send({ status: 0, message: "Unauthorized to login", });
    }else{
        const createUserResponse = await createUser(token,mobile,password,email,groups.BANK_GROUP);
        if(!createUserResponse){
            res.send({ status: 0, message: "Error creating Users"});
        }
        else {
            data.country = country;
            data.ccode = ccode;
            data.name = name;
            data.email = email;
            data.mobile = mobile;
            data.username = username;
            data.password = password;
            data.roles = roles;
            data.save((err1) => {
                if (err1) {
                    var message1 = err1;
                    if (err1.message) { message1 = err1.message; }
                    res.send({status: 0,message: message1,});
                } else {
                    // let content =
                    // 	"<p>Your have been added as Infra in E-Wallet application</p><p<p>&nbsp;</p<p>Login URL: <a href='http://" +
                    // 	config.mainIP +
                    // 	"/'>http://" +
                    // 	config.mainIP +
                    // 	"/</a></p><p><p>Your username: " +
                    // 	username +
                    // 	"</p><p>Your password: " +
                    // 	password +
                    // 	"</p>";
                    // sendMail(content, "Infra Account Created", email);

                    res.send({status: 0,message: "User Created successfully" , username: username , password: password});
                }
            });

        }
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
        if(!checkRoles(token, roles.INFRA_ADMIN_ROLE)) {
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
    const { token } = req.body;
    var username = getUsername(token);
    if(!checkRoles(token, roles.INFRA_ADMIN_ROLE)) {
        res.send({ status: 0, message: "Unauthorized to login",});
    }else{
        try {
            const InfrUsers = await Users.find();
            res.send({ status: 1, message: "User found", users : InfrUsers });

        }catch(err)
        {
            res.send({ status: 0, message: err, users : InfrUsers });

        }

    }
};
