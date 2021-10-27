const { error } = require( "../utils/errorMessages");

module.exports.getTokenFromRequestHeader = (req, res) => {
    let token = req.headers["x-access-token"] || req.headers["authorization"];
    if(token)
    {
        if (token.startsWith("Bearer ")) {
          // Remove Bearer from string  
          token = token.slice(7, token.length);
        }
        return token;
    }else{
        res.send({ code: 0, message: "Token Required" });
    }

};



