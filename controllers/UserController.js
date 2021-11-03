const User = require('../models/User');
const InfraConfigured = require('../models/InfraConfigured');
const { error } = require( "../utils/errorMessages");
const { getToken } = require("../middlewares/keyclock/AccessToken")
const request = require("request");
const {
    checkValidityToEditUser,
    checkValidityToCreateUser,
    checkValidityToEvalute
} = require("../middlewares/validators/UserValidators")
const { assignRole} = require("../middlewares/keyclock/Role") ;
const {
    getUser,
    createUser,
    editusers,
    deleteUser,
    getAllUser,
    getRolesFromToken,
    evaluate,
} = require("../middlewares/keyclock/User") ;
const {
    getTokenFromRequestHeader,
 } = require("../middlewares/commonFunctions")

const { ADMIN_USERNAME , ADMIN_PASSWORD , GROUPS , ROLES} = require("../config/keyclockConstant") ;
const {createFolder,uploadFile,getFile} = require("../controllers/OpenKmController")



/**
 * This is used when we primarily setting up the project which help in creating first infra Admin.
 * @param {requestParamsUser }
 * @param { code, message }
 */
exports.registerInfraAdmin = async (req, res)=> {
     let user =  new User(req.fields)
       const response =  await checkValidityToCreateUser(user)
        if (response === true ) {
            //get token
            const tokenResponse = await getToken(ADMIN_USERNAME, ADMIN_PASSWORD);
            if (JSON.parse(tokenResponse).error) {
                res.status(200).json(error.TOKEN_CREATE);
            } else {
                const token = JSON.parse(tokenResponse).access_token;
                const createUserResponse = await createUser(token, user, GROUPS.INFRA_GROUP);
                if (createUserResponse.length !== 0) {
                    res.status(200).json(error.USER_CREATE);
                } else {
                    const getUserResponse = await  getUser(token, user.username);
                    user.keyclock_id = JSON.parse(getUserResponse)[0].id;
                    user.save(async (err) => {
                        if (err) {
                            let message = err;
                            if (err.message) {
                                message = err.message;
                            }
                            const deleteUserResponse = await deleteUser(token,  user.keyclock_id);
                            if (deleteUserResponse.length !== 0) {
                                res.status(200).json(error.USER_DELETE);
                            } else {
                                res.status(200).json({
                                    code: 0,
                                    message: message,
                                });
                            }
                        } else {

                            // if (user.photoUserBase64){
                            //     //Create Folder
                            //     const responseCreateFolder =   await createFolder(user.username)

                            //     if(responseCreateFolder != null && responseCreateFolder!=''){
                            //         //upload  photo
                            //         const responseupload  =    await  uploadFile(user.username,user.photoNameExtension,user.photoUserBase64)

                            //         // Update uuidPhoto
                            //         user.uuidPhoto = JSON.parse(responseupload).uuid
                            //        await User.updateOne({'username':user.username}, {$set: {'uuidPhoto':user.uuidPhoto}})
                            //     }
                            // }

                            let infra = new InfraConfigured()
                            infra.isConfigured = true
                           await infra.save()
                            res.send({code: 1, message: "User Created successfully", username: user.username});
                        }
                    })
                }
            }

        }
        else {
            return res.send(response)
        }
};

/**
 * This is used for checking if there is an infra user in the system or not.
 * @param { }
 * @param { code, message}
 */
exports.checkInfraIsConfigured = async (req, res) => {

    try {
         await InfraConfigured.findOne().then(response=>{
             if(response){
                 res.send({ code:  1 , message: "Infra admin is configured" });
             }else {
                 res.send({ code:  0 , message: "Infra admin is not configured" });
             }
        });

    } catch (err) {
        res.send({ code: 0, message: err.message, err: JSON.stringify(err) });
    }

};

/**
 * Infr user register API
 * @param { token, name, email, country, ccode, mobile, username, password, logo,}
 * @param { code, message}
 */

exports.registerInfraUser = async (req, res) => {
    let user =  new User(req.body);
    let token = getTokenFromRequestHeader(req,res);
    const response =  await checkValidityToCreateUser(user);
    if (response === true ){
        const createUserResponse = await createUser(token, user, GROUPS.INFRA_GROUP);
        if(createUserResponse.length !== 0 ){
            res.send({ code: 0, message: "Error creating User"});
        }
        else {
            const getUserResponse = await getUser(token, user.username);
            const userKeyclockId = JSON.parse(getUserResponse)[0].id;
            user.keyclock_id = userKeyclockId;
            user.save(async(err1) => {
                if (err1) {
                    var message1 = err1;
                    if (err1.message) { message1 = err1.message; }
                    const deleteUserResponse = await deleteUser(token, userKeyclockId);
                    if(deleteUserResponse.length !== 0 ){
                        res.status(200).json({
                            code: 0,
                            message: "Error deleting user in keyclock",
                        });
                    } else {
                        res.send({code: 0,message: message1,});
                    }
                } else {
                    const assignRoleResponse = await assignRole(token, userKeyclockId, req.body.roles);
                    if(assignRoleResponse.length !== 0 ){
                        res.status(200).json(error.ROLE_ASSIGN);
                    } else {
                        res.send({
                            code: 1,
                            message: "User Created"
                        });
                    }
                }
            });
        }
    } else {
        return res.send(response)
    }
};
 
/**
 * This is used for Login to anyuser.
 * @param {username, password }
 * @param { code, message, token, user}
 */
exports.login = async (req, res) => {
    const { username, password } = req.body;
    const tokenResponse = await getToken(username, password);

    if(JSON.parse(tokenResponse).hasOwnProperty('error')){
        res.send({ code: 0, message: JSON.parse(tokenResponse).error });
    }else{
        const token = JSON.parse(tokenResponse).access_token;
        const getUserResponse = await  getUser(token, username);
        const user = JSON.parse(getUserResponse)
        res.send({ code: 1, message: "Authorized to login", token : token, user: user }); 
    }

};

/**
 * This is used for getting users from mongoDb
 * @param { code, message, users} res
 */
exports.getInfraUsers = async (req, res) => {
        try {
            const InfrUsers = await User.find();
            res.send({ code: 1, message: "User found", users : InfrUsers });
        }catch(err)
        {
            res.send({ code: 0, message: err });
        }
};

exports.getRoleFromToken = async (req, res) => {

    try {

        let token = getTokenFromRequestHeader(req,res);
        const getUserResponse =  getRolesFromToken(token);

        res.send({ code: 1, message: "User found", roles : getUserResponse });
    }catch(err)
    {
        res.send({ code: 0, message: err });
    }
};

/**
 * This is used for getting users from keyclock
 * @param { code, message, users} res
 */
exports.getAllUsers = async (req, res) => {
    let token = getTokenFromRequestHeader(req,res);
    const getUserResponse = await getAllUser(token);
        if(JSON.parse(getUserResponse).error){
            res.status(200).json(error.GET_ALL_USER);
        } else {
            const users = JSON.parse(getUserResponse)
            res.send({
                code: 1,
                users: users,
            });
        }
};

/**
 * This is used to enable or disable users in keyclock
 * @param { userId, isEnabled,} req 
 * @param { code, message} res 
 */
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
            res.send({ code: 0, message: "User Cannot be edited."});
        }
        else {
            res.send({code: 1,message: `User ${isEnabled ? "enabled" : "disabled"} successfully`});
        }
    
};

/**
 * This is used to edit user
 * @param { userKeyclockId, userMongoId, firstName, lastName, username, email, country, ccode, mobile, password, logo } req 
 * @param { code, message } res 
 */
exports.editUser = async (req, res) => {
    let token = getTokenFromRequestHeader(req,res);
    const {
        userKeyclockId,
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
        "attributes": {
            "mobile":mobile,
            "country": country,
            "ccode": ccode,
        }
    }
    if (checkValidityToEditUser(req,res)){
        const editUserResponse = await editusers(token,userKeyclockId,editParams);
        if(editUserResponse.length !== 0 ){
            res.send(error.USER_EDIT);
        }
        else {
            User.findOneAndUpdate(
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
                        res.send({code: 0,message: message1,});
                    } else {
                        res.send({
                            code: 1,
                            message: "User Edited successfully"
                        });
                    }
                }
            );
                

        }
    }
};

/**
 * This is user to evaluate user access in keyclock
 * @param { resources, roleIds, userId,} req 
 * @param { code, evaluate } res 
 */
exports.evaluate = async (req, res) => {
    let token = getTokenFromRequestHeader(req,res);
    const {
        resources,
        roleIds,
        userId,
    } = req.body;
   
    if (checkValidityToEvalute(req,res)){
        const evaluteResponse = await evaluate(token,resources,roleIds, userId );
        const evaluation = JSON.parse(evaluteResponse)
        if(JSON.parse(evaluteResponse).error){
            res.send({ code: 0, users: JSON.parse(evaluteResponse).error });
        } else {
            res.send({ code: 1, evaluate: evaluation.status,
            });
        }
    }
};
