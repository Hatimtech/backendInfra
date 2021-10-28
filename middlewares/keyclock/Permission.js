const { KEYCLOCK_IP , REALM_NAME, CLIENT_ID , ID_OF_CLIENT} = require( "../../config/keyclockConstant");
const request = require("request") ;

//create policy
module.exports.createPermission= (token, name, description, policies, resources) => {
    var options = {
        'method': 'POST',
        'url': KEYCLOCK_IP + "/admin/realms/" + REALM_NAME + "/clients/" + ID_OF_CLIENT + "/authz/resource-server/permission/resource",
        'headers': {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          description: description,
          name: name,
          decisionStrategy: "UNANIMOUS",
          logic: "POSITIVE",
          policies:policies,
          resources:resources,
          type: "resource",
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

//get Permission
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

// Delete deletePermission
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

// Update Permission
module.exports.updatePermission = (token, permissionId, name, description, policies, resources) => {
    console.log(permissionId);
  var options = {
      'method': 'PUT',
      'url':  KEYCLOCK_IP + "/admin/realms/" + REALM_NAME + "/clients/" + ID_OF_CLIENT + "/authz/resource-server/permission/resource/" + permissionId,
      'headers': {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        id: permissionId,
        description: description,
        name: name,
        decisionStrategy: "UNANIMOUS",
        logic: "POSITIVE",
        policies:policies,
        resources:resources,
        type: "resource",
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