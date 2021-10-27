const { KEYCLOCK_IP , REALM_NAME,CLIENT_ID , ID_OF_CLIENT} = require( "../../config/keyclockConstant");
const request = require("request") ;

// cc6b0966-a696-4c19-811e-2ae115ee8cba
// cc6b0966-a696-4c19-811e-2ae115ee8cba
// Create client
module.exports.createScope = (token, name, displayName) => {
    var options = {
        'method': 'POST',
        'url': KEYCLOCK_IP + "/admin/realms/" + REALM_NAME + "/clients/" + ID_OF_CLIENT + "/authz/resource-server/scope",
        'headers': {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          displayName: name,
          name: displayName,
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

