
http://localhost:8080/auth/admin/realms/Ewallet/clients/cc6b0966-a696-4c19-811e-2ae115ee8cba/authz/resource-server/policy/role
const { KEYCLOCK_IP , REALM_NAME,CLIENT_ID , ROLES} = require( "../../config/keyclockConstant");
const request = require("request") ;


// Create Policy
module.exports.createPolicy = (token, name, displayName) => {
    var options = {
        'method': 'POST',
        'url': KEYCLOCK_IP + "/admin/realms/" + REALM_NAME + "/clients/cc6b0966-a696-4c19-811e-2ae115ee8cba" + CLIENT_ID + "/authz/resource-server/scope",
        'headers': {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
            "decisionStrategy": "UNANIMOUS",
            "description": "create bank policy",
            "logic": "POSITIVE",
            "name": name,
            "roles": [{id: "ea9dd82d-26ae-4e45-9d13-f38342b443c8"}],
            "type": "role"
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
