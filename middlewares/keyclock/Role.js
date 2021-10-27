const { KEYCLOCK_IP , REALM_NAME , ID_OF_CLIENT} = require( "../../config/keyclockConstant");
const request = require("request") ;

// Create Roles
module.exports.createRole = (token, name) => {
    var options = {
        'method': 'POST',
        'url': KEYCLOCK_IP + "/admin/realms/"  + REALM_NAME + "/clients/" + ID_OF_CLIENT  + "/roles",
        'headers': {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          "name": name,
          "composite": false,
          "clientRole": true,
          "containerId": ID_OF_CLIENT
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
        'url': KEYCLOCK_IP + "/admin/realms/"  + REALM_NAME + "/clients/" + ID_OF_CLIENT  + "/roles?briefRepresentation=false",
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
        'url': KEYCLOCK_IP + "/admin/realms/"  + REALM_NAME + "/clients/" + ID_OF_CLIENT  + "/roles/" + name,
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
    console.log(name)
    var options = {
        'method': 'POST',
        'url': KEYCLOCK_IP + "/admin/realms/"  + REALM_NAME + "/users/" + userid + "/role-mappings/clients/" + ID_OF_CLIENT,
        'headers': {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          "id": "b0953eac-2cda-4090-9a2b-7e0da0496065",
          "name": name,
          "clientRole": true,
          "composite": false,
          "containerId": ID_OF_CLIENT
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