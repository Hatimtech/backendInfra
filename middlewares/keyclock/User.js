const { KEYCLOCK_IP , REALM_NAME , ID_OF_CLIENT, USER_ATTRIBUTES} = require( "../../config/keyclockConstant");
const request = require("request") ;

/**
 * This is used to get a user from keyclock by username
 * @param {*} token 
 * @param {*} username 
 * @returns 
 */
module.exports.getUser = (token, username) => {
    var options = {
        'method': 'GET',
        'url': KEYCLOCK_IP + "/admin/realms/" + REALM_NAME +"/users/?username=" + username,
        'headers': {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      
      };
    return new Promise(function (resolve, reject) {
        request(options, async function (err, response) {
            if(err){
                reject(err);
            }else if(response.body.error){
                reject(response.body.error);
            } else {
                resolve(response.body);
            }
        });
    });
}

/**
 * This is used to get all users from keyclock
 * @param {*} token 
 * @returns 
 */
module.exports.getAllUser = (token) => {
    var options = {
        'method': 'GET',
        'url': KEYCLOCK_IP + "/admin/realms/" + REALM_NAME +"/users?briefRepresentation=false",
        'headers': {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      
      };
    return new Promise(function (resolve, reject) {
        request(options, async function (err, response) {
            if(err){
                reject(err);
            }else if(response.body.error){
                reject(response.body.error);
            } else {
                resolve(response.body);
            }
        });
    });
}

/**
 * This is used to delete a user by id in keyclock
 * @param {*} token 
 * @param {*} userid 
 * @returns 
 */
module.exports.deleteUser = (token, userid) => {
    var options = {
        'method': 'DELETE',
        'url': KEYCLOCK_IP + "/admin/realms/" + REALM_NAME +"/users/" + userid,
        'headers': {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      
      };
    return new Promise(function (resolve, reject) {
        request(options, async function (err, response) {
            if(err){
                reject(err);
            }else if(response.body.error){
                reject(response.body.error);
            } else {
                resolve(response.body);
            }
        });
    });
}

/**
 * This is used to create a user in keyclock
 * @param {*} token 
 * @param {username, firstName, lastName, email, mobile, country, ccode} userInfo 
 * @param {*} group 
 * @returns 
 */
module.exports.createUser = (token, userInfo, group) => {
    const options = {
        'method': 'POST',
        'url': KEYCLOCK_IP + "/admin/realms/" + REALM_NAME + "/users",
        'headers': {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          "createdTimestamp": 1588880747548,
          "username": userInfo.username,
          "enabled": true,
          "totp": false,
          "emailVerified": true,
          "firstName": userInfo.firstName,
          "lastName": userInfo.lastName,
          "email": userInfo.email,
          "disableableCredentialTypes": [],
          "requiredActions": [],
          "notBefore": 0,
          "access": {
            "manageGroupMembership": true,
            "view": true,
            "mapRoles": true,
            "impersonate": true,
            "manage": true
          },
          "credentials":[
                  {
                    "type":"password",
                      "value":userInfo.password,
                      "temporary":false
                  }
            ],
          "groups": [
                group
          ],
          "attributes": {
              "mobile":userInfo.mobile,
              "country": userInfo.country,
              "ccode": userInfo.ccode,
            }
        }),
    }
    return new Promise(function (resolve, reject) {
        request(options, async function (err, response) {
            if(err){
                console.log(err)
                reject(err);
            } else {
                console.log(response.body)
                resolve(response.body);
            }
        });
    });
}

/**
 * This is used to edit users in keyclock
 * @param {*} token 
 * @param {*} userId 
 * @param {firstName, lastName, email, credentials, attributes} editParams 
 * @returns 
 */
module.exports.editusers = (token , userId, editParams) => {
    var options = {
        'method': 'PUT',
        'url': KEYCLOCK_IP + "/admin/realms/" + REALM_NAME + "/users/" + userId,
        'headers': {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
            ...editParams
         }),
    }
    return new Promise(function (resolve, reject) {
        request(options, async function (err, response) {
            if(err){
                reject(err);
            } else {
                resolve(response.body);
            }
        });
    });
}

module.exports.getRolesFromToken = (token) => {
    var decodedToken = jwt_decode(token);
    console.log('I am here', decodedToken)

	return decodedToken.resource_access;
};


/**
 * This is used to evaluate a user access
 * @param {*} token 
 * @param {*} resources 
 * @param {*} roleIds 
 * @param {*} userId 
 * @returns 
 */
module.exports.evaluate = (token, resources,roleIds, userId) => {
    var options = {
        'method': 'POST',
        'url': KEYCLOCK_IP + "/admin/realms/"  + REALM_NAME + "/clients/" + ID_OF_CLIENT + "/authz/resource-server/policy/evaluate",        
        'headers': {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          "clientId": ID_OF_CLIENT,
          "userId": userId,
          "entitlements": false,
          "roleIds": roleIds,
          "resources":resources
        })
    }
    console.log(options.url)
    return new Promise(function (resolve, reject) {
        request(options, async function (err, response) {
            if(err){
                reject(err);
            } else {
                resolve(response.body);
            }
        });
    });
}
