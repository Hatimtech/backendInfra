const { KEYCLOCK_IP , REALM_NAME, CLIENT_ID , ID_OF_CLIENT} = require( "../../config/keyclockConstant");
const request = require("request") ;

/**
 * This is used to create a resource in keyclock
 * @param {*} token 
 * @param {*} name 
 * @param {*} displayName 
 * @param {*} scopes 
 * @param {*} uris 
 * @returns 
 */
module.exports.createResource = (token, name, displayName, scopes, uris) => {
    var options = {
        'method': 'POST',
        'url': KEYCLOCK_IP + "/admin/realms/" + REALM_NAME + "/clients/" + ID_OF_CLIENT + "/authz/resource-server/resource",
        'headers': {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          displayName: displayName,
          name: name,
          scopes:scopes,
          uris: uris,
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
 * This is used to get all resources from keyclock
 * @param {*} token 
 * @returns 
 */
module.exports.getAllResource = (token) => {
  var options = {
      'method': 'GET',
      'url': KEYCLOCK_IP + "/admin/realms/" + REALM_NAME + "/clients/" + ID_OF_CLIENT + "/authz/resource-server/resource",
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
 * This is used to delete a resource from keyclock
 * @param {*} token 
 * @param {*} resourceId 
 * @returns 
 */
module.exports.deleteResource = (token, resourceId) => {
    console.log(resourceId);
  var options = {
      'method': 'DELETE',
      'url':  KEYCLOCK_IP + "/admin/realms/" + REALM_NAME + "/clients/" + ID_OF_CLIENT + "/authz/resource-server/resource/" + resourceId,
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
 * This is used to update a resource in key clock
 * @param {*} token 
 * @param {*} resourceId 
 * @param {*} name 
 * @param {*} displayName 
 * @param {*} scopes 
 * @param {*} uris 
 * @returns 
 */
module.exports.updateResource = (token, resourceId, name, displayName, scopes, uris) => {
    console.log(resourceId);
  var options = {
      'method': 'PUT',
      'url':  KEYCLOCK_IP + "/admin/realms/" + REALM_NAME + "/clients/" + ID_OF_CLIENT + "/authz/resource-server/resource/" + resourceId,
      'headers': {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        displayName: displayName,
        name: name,
        scopes:scopes,
        uris: uris,
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