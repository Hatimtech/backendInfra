const { KEYCLOCK_IP , REALM_NAME,CLIENT_ID , ROLES , ID_OF_CLIENT} = require( "../config/keyclockConstant");
const request = require("request") ;
const jwt_decode = require("jwt-decode");


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
