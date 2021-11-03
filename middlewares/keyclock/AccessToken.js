const { KEYCLOCK_IP , REALM_NAME, CLIENT_ID, CLIENT_SECRET} = require( "../../config/keyclockConstant");
const request = require("request") ;

/**
 * This is used to get access token from keyclock
 * @param {*} username 
 * @param {*} password 
 * @returns 
 */
module.exports.getToken =  (username, password) => {
    var options = {
        'method': 'POST',
        'url': KEYCLOCK_IP + "/realms/" + REALM_NAME + "/protocol/openid-connect/token",
        'headers': {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        form: {
            'client_id': CLIENT_ID,
            'client_secret': CLIENT_SECRET,
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
