

exports.createUserRoles = async (req, res) => {
  
    const {
        name,
        description,
     } = req.body;

    const createPermission = await  (token,name,attributes);
         if(createPermission.length !== 0 ){
             res.send(error.PERMISSION_CREATE);
         }
         else {
             res.send({
                 code: 1,
                 message: "Permission Created successfully"
             });
         }
} 