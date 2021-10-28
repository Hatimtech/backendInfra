
const { KEYCLOCK_IP , REALM_NAME, CLIENT_ID , ID_OF_CLIENT} = require( "../../config/keyclockConstant");
const request = require("request") ;

//create policy
module.exports.createPolicy = (token, name, description, roles) => {
    var options = {
        'method': 'POST',
        'url': KEYCLOCK_IP + "/admin/realms/" + REALM_NAME + "/clients/" + ID_OF_CLIENT + "/authz/resource-server/policy/role",
        'headers': {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          description: description,
          name: name,
          decisionStrategy: "UNANIMOUS",
          logic: "POSITIVE",
          roles:roles,
          type: "role",
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

//get policies
module.exports.getAllPolicy = (token) => {
  var options = {
      'method': 'GET',
      'url': KEYCLOCK_IP + "/admin/realms/" + REALM_NAME + "/clients/" + ID_OF_CLIENT + "/authz/resource-server/policy",
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

// Delete Policy
module.exports.deletePolicy = (token, policyId) => {
    console.log(policyId);
  var options = {
      'method': 'DELETE',
      'url':  KEYCLOCK_IP + "/admin/realms/" + REALM_NAME + "/clients/" + ID_OF_CLIENT + "/authz/resource-server/policy/" + policyId,
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

// Update Policy
module.exports.updatepolicy = (token, policyId, name, description, roles) => {
    console.log(policyId);
  var options = {
      'method': 'PUT',
      'url':  KEYCLOCK_IP + "/admin/realms/" + REALM_NAME + "/clients/" + ID_OF_CLIENT + "/authz/resource-server/policy/role/" + policyId,
      'headers': {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        id: policyId,
        description: description,
        decisionStrategy: "UNANIMOUS",
        logic: "POSITIVE",
        name: name,
        roles:roles,
        type: "role",
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