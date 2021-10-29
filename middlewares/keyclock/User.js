const { KEYCLOCK_IP , REALM_NAME , ID_OF_CLIENT} = require( "../../config/keyclockConstant");
const request = require("request") ;

//Get user by username
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

//Get all user 
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

//delete user by id
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

// Create users
module.exports.createUser = (token, firstName,lastName,username, password, email, group) => {
    var options = {
        'method': 'POST',
        'url': KEYCLOCK_IP + "/admin/realms/" + REALM_NAME + "/users",
        'headers': {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          "createdTimestamp": 1588880747548,
          "username": username,
          "enabled": true,
          "totp": false,
          "emailVerified": true,
          "firstName": firstName,
          "lastName": lastName,
          "email": email,
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
                      "value":password,
                      "temporary":false
                  }
            ],
          "groups": [
                group
          ]
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

// edit user
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