const { KEYCLOCK_IP , REALM_NAME,CLIENT_ID , ROLES , ID_OF_CLIENT} = require( "../config/keyclockConstant");
const request = require("request") ;
const jwt_decode = require("jwt-decode");


//Get Token
module.exports.getToken = (username, password) => {
    var options = {
        'method': 'POST',
        'url': KEYCLOCK_IP + "/realms/" + REALM_NAME + "/protocol/openid-connect/token",
        'headers': {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        form: {
            'client_id': CLIENT_ID,
            'client_secret': 'a37922ad-9d46-448d-9957-0e30db83b4d8',
            'username': username,
            'password': password,
            'grant_type': 'password'
        }
    };
    return new Promise(function (resolve, reject) {
        request(options, async function (err, response) {
            if(err){
                reject(err);
            }else if(response.body.error){
                reject(response.body.error);
            } else {
                resolve(response.body);
                // resolve(JSON.parse(response.body).access_token);
            }
        });
    });
}

//Password reset
module.exports.passwordReset = (token, userId, password) => {
    var options = {
        'method': 'PUT',
        'url': KEYCLOCK_IP + "/admin/realms/" + REALM_NAME +"/users/" + userId + "/reset-password",
        'headers': {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          "type": "password",
          "value": password,
          "temporary": false
        })
      
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

//Get user
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

//delete user
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

// Create Roles
module.exports.createRole = (token, name, attributes) => {
    var options = {
        'method': 'POST',
        'url': KEYCLOCK_IP + "/admin/realms/"  + REALM_NAME + "/roles",
        'headers': {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          "name": name,
          "composite": false,
          "clientRole": false,
          "attributes":attributes,
        })
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

// Edit Roles
module.exports.editRole = (token, name, attributes) => {
    var options = {
        'method': 'PUT',
        'url': KEYCLOCK_IP + "/admin/realms/"  + REALM_NAME + "/roles/" + name,
        'headers': {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          "name": name,
          "composite": false,
          "clientRole": false,
          "attributes": attributes,
        })
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

// Get Roles
module.exports.getAllRoles = (token) => {
    var options = {
        'method': 'GET',
        'url': KEYCLOCK_IP + "/admin/realms/"  + REALM_NAME + "/roles?briefRepresentation=false",
        'headers': {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
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

// Delete Roles
module.exports.deleteRole = (token, name) => {
    var options = {
        'method': 'DELETE',
        'url': KEYCLOCK_IP + "/admin/realms/"  + REALM_NAME + "/roles/" + name,
        'headers': {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
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

// Assign Role
module.exports.assignRole = (token, userid, name) => {
    var options = {
        'method': 'POST',
        'url': KEYCLOCK_IP + "/admin/realms/"  + REALM_NAME + "/users/" + userid + "/role-mappings/realm",
        'headers': {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          "name": name,
          "composite": false,
          "clientRole": false,
          "containerId": REALM_NAME
        })
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

//Check validity of token
module.exports.checkRoles = (token, roleToCheck) => {
    var decodedToken = jwt_decode(token);
	var roles = decodedToken.realm_access.roles;
	if(roles.indexOf(roleToCheck) == -1){
		return false;
	} else{ 
        return true;
    }
};

module.exports.checkInfraAdmin = (req, res, next) => {
 let token = req.headers["x-access-token"] || req.headers["authorization"];
  if (!token) res.send({ code: 0, message: "Token Required" });
 if(token)
{
    if (token.startsWith("Bearer ")) {
        // Remove Bearer from string
        token = token.slice(7, token.length);
      }
    var decodedToken = jwt_decode(token);
	var roles = decodedToken.realm_access.roles;
	if(roles.indexOf(ROLES.INFRA_ADMIN_ROLE) == -1){
		return false;
	} else{ 
        req.token = token;
        next();
    }
}
};

//Get username from token
module.exports.getUsername = (token) => {
    var decodedToken = jwt_decode(token);
	return decodedToken.preferred_username;
};

module.exports.getRolesFromToken = (token) => {
    var decodedToken = jwt_decode(token);
    console.log('I am here', decodedToken)

	return decodedToken.resource_access;
};



module.exports.evaluate = (token, clientId,resources,roleIds, userId) => {
    var options = {
        'method': 'POST',
        'url': KEYCLOCK_IP + "/admin/realms/"  + REALM_NAME + "/clients/" + ID_OF_CLIENT + "/authz/resource-server/policy/evaluate",        
        'headers': {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          "clientId": clientId,
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