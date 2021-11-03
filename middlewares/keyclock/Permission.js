const { KEYCLOCK_IP , REALM_NAME, CLIENT_ID , ID_OF_CLIENT} = require( "../../config/keyclockConstant");
const request = require("request") ;

/**
 * This is used to create permission in keyclock
 * @param {*} token 
 * @param {*} name 
 * @param {*} description 
 * @param {*} policies 
 * @param {*} resources 
 * @param {*} scopes 
 * @returns 
 */
module.exports.createPermission= (token, name, description, policies, resources, scopes) => {
    var options = {
        'method': 'POST',
        'url': KEYCLOCK_IP + "/admin/realms/" + REALM_NAME + "/clients/" + ID_OF_CLIENT + "/authz/resource-server/permission/scope",
        'headers': {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          description: description,
          name: name,
          decisionStrategy: "AFFIRMATIVE",
          logic: "POSITIVE",
          policies:policies,
          resources:resources,
          scopes:scopes,
          type: "scope",
        })
      
      };
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

/**
 * This is used to get all permissions from keyclock
 * @param {*} token 
 * @returns 
 */
module.exports.getAllPermission = (token) => {
  var options = {
      'method': 'GET',
      'url': KEYCLOCK_IP + "/admin/realms/" + REALM_NAME + "/clients/" + ID_OF_CLIENT + "/authz/resource-server/permission",
      'headers': {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    };
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

/**
 * this is used to delete a permission in keyclock
 * @param {*} token 
 * @param {*} permissionId 
 * @returns 
 */
module.exports.deletePermission = (token, permissionId) => {
    console.log(permissionId);
  var options = {
      'method': 'DELETE',
      'url':  KEYCLOCK_IP + "/admin/realms/" + REALM_NAME + "/clients/" + ID_OF_CLIENT + "/authz/resource-server/permission/" + permissionId,
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

/**
 * This is used to update a permission in keyclock
 * @param {*} token 
 * @param {*} permissionId 
 * @param {*} name 
 * @param {*} description 
 * @param {*} policies 
 * @param {*} resources 
 * @param {*} scopes 
 * @returns 
 */
module.exports.updatePermission = (token, permissionId, name, description, policies, resources, scopes) => {
    console.log(permissionId);
  var options = {
      'method': 'PUT',
      'url':  KEYCLOCK_IP + "/admin/realms/" + REALM_NAME + "/clients/" + ID_OF_CLIENT + "/authz/resource-server/permission/scope/" + permissionId,
      'headers': {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        id: permissionId,
        description: description,
        name: name,
        decisionStrategy: "AFFIRMATIVE",
        logic: "POSITIVE",
        policies:policies,
        resources:resources,
        type: "scope",
        scopes:scopes,
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