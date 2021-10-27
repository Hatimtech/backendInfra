const { KEYCLOCK_IP , REALM_NAME, CLIENT_ID } = require( "../../config/keyclockConstant");
const request = require("request") ;

//Get token by username and password
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