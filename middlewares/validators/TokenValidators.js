const jwt_decode = require("jwt-decode");

//Check validity of token
module.exports.checkRoles = (token, roleToCheck) => {
    var decodedToken = jwt_decode(token);
	var roles = decodedToken.realm_access.roles;
	if(roles.indexOf(roleToCheck) == -1){
		return false;
	} else{ 
        return true;
    }
};