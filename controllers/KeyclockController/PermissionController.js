const {
    createPermission,
    getAllPermission,
    updatePermission,
    deletePermission,
} = require("../../middlewares/keyclock/Permission") ;
const { error } = require( "../../utils/errorMessages");
const { getTokenFromRequestHeader } = require("../../middlewares/commonFunctions")

exports.createPermissions = async (req, res) => {
    let token = getTokenFromRequestHeader(req,res);
    const {
        name,
        description,
        policies,
        resources,
    } = req.body;
    const createPermissionResponse = await createPermission(token,name, description, policies,resources);
    if(JSON.parse(createPermissionResponse).error){
        res.status(200).json(error.PERMISSION_CREATE);
    }else{
        res.send({code: 1,message: "Permission created successfully" });
    }      
};

exports.getAllPermission = async (req, res) => {
    let token = getTokenFromRequestHeader(req,res);
        const getPermissionResponse = await getAllPermission(token);
        console.log(getPermissionResponse);
        if(JSON.parse(getPermissionResponse).error){
            res.status(200).json(error.GET_ALL_PERMISSION);
        } else {
            const permissions = JSON.parse(getPermissionResponse)
            res.send({
                code: 1,
                permissions: permissions,
            });
        }
};

exports.deletePermissions = async (req, res) => {
    const { permissionId } = req.body;
    let token = getTokenFromRequestHeader(req,res);
        const deletePermissionResponse = await deletePermission(token, permissionId);
        console.log(deletePermissionResponse);
        if(deletePermissionResponse.length !== 0 ){
            res.status(200).json(error.PERMISSION_DELETE);
        } else {
            res.send({
                code: 1,
                message: "Permission Deleted successfully"
            });
        }
};

exports.updatePermissions = async (req, res) => {
    const {
        permissionId,
        name,
        description,
        policies,
        resources
    } = req.body;
    let token = getTokenFromRequestHeader(req,res);
        const updatePermissionResponse = await updatePermission(token, permissionId, name, description, policies,resources);
        console.log(updatePermissionResponse);
        if(updatePermissionResponse.length !== 0 ){
            res.status(200).json(error.PERMISSION_UPDATE);
        } else {
            res.send({
                code: 1,
                message: "Permission Updated successfully"
            });
        }
};