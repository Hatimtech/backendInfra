const OPEN_KM_END_POINT_CREATE_FOLDER='rest/folder/create'
const OPEN_KM_END_POINT_UPLOAD_FILE='rest/document/createSimple'
const OPEN_KM_END_POINT_GET_FILE='rest/document/getContent?docId='
const SEPARATOR_DOUBLE_DOT=':'
const request = require("request") ;
const { error } = require( "../utils/errorMessages");
const fs = require('fs');
/**
 * Create folder on OpenKM
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.createFolder = async  (req, res) => {
    const {path} = req.body;

    if(path == undefined || path == null || path == ''){
       return  res.send(error.ERROR_CREATE_FOLDER_PATHNAME_EMPTY);
    }else{
        const options = {
            'method': 'POST',
            'url': process.env.OPENKM_URL_SERVICE_BASE + OPEN_KM_END_POINT_CREATE_FOLDER,
            'headers': {
                'Content-Type': 'application/json',
                'accept': 'application/json',
                "Authorization" : "Basic " + new Buffer(process.env.OPENKM_LOGIN+SEPARATOR_DOUBLE_DOT+process.env.OPENKM_PASSWORD).toString("base64")
            },
            body: JSON.stringify({
                "path": process.env.OPENKM_DOCPATH_BASE+path,
            }),
        }

        new Promise(()=>{
            request(options,  async function (err, response) {
                if (err) {
                  return res.send((err)) ;
                } else {
                   return res.send(response.body) ;
                }
            });
        });
    }

};

/**
 * Upload file in specific folder OpenKM
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.uploadFile = async (req, res) => {
    console.log(req.body)
    const {docPath, content} = req.body;
    if(docPath == undefined || docPath == null || docPath == ''){
        return  res.send(error.ERROR_CREATE_FILE_PATHNAME_EMPTY);
    }

    else{
        const options = {
            'method': 'POST',
            'url': process.env.OPENKM_URL_SERVICE_BASE + OPEN_KM_END_POINT_UPLOAD_FILE,
            formData: {
                data: {
                    value: JSON.stringify({
                        "docPath":docPath,
                    }),
                    options:{
                        contentType:'application/json'
                    }
                },
                files:{
                    value: content,
                    options: {
                        contentType: file.mimetype
                    }
                }
            },
            'headers': {
                "Authorization" : "Basic " + new Buffer(process.env.OPENKM_LOGIN+SEPARATOR_DOUBLE_DOT+process.env.OPENKM_PASSWORD).toString("base64")
            },
            body: JSON.stringify({
                "docPath" : process.env.OPENKM_DOCPATH_BASE+docPath,
                "content" : content
            }),
        }
        new Promise(()=>{
            request(options,  async function (err, response) {
                if (err) {
                    return res.send((err)) ;
                } else {
                    return res.send(response.body) ;
                }
            });
        });
    }
};

/**
 * Get File from OpenKM by UUID
 * @param req
 * @param res
 * @returns {Promise<void>}
 */

exports.getFile = async (req, res) => {
    const { docId } = req.query;
    if(docId == undefined || docId == null || docId == ''){
        return  res.send(error.ERROR_GET_FILE_DOCID_EMPTY);
    }
    else{
        const options = {
            'method': 'GET',
            'url': process.env.OPENKM_URL_SERVICE_BASE + OPEN_KM_END_POINT_GET_FILE + docId,
            'headers': {
                // 'Content-Type': 'application/json',
                'accept': 'application/octet-stream',
                "Authorization" : "Basic " + new Buffer(process.env.OPENKM_LOGIN+SEPARATOR_DOUBLE_DOT+process.env.OPENKM_PASSWORD).toString("base64")
            },
        }

        new Promise(()=>{
            request(options,  async function (err, response) {
                if (err) {
                  return res.send((err)) ;
                } else {
                   return res.send(response.body) ;
                }
            });
        });
    }

};

/**
 * update file in OpenKM (don't delete file in OpenKm just add new file and update uuid in database of backend)
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.updateFile = async (req, res) => {

};


