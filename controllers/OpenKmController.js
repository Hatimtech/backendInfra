const OPEN_KM_END_POINT_CREATE_FOLDER = 'rest/folder/create';
const OPEN_KM_END_POINT_UPLOAD_FILE = 'rest/document/createSimple';
const OPEN_KM_END_POINT_GET_FILE = 'rest/document/getContent?docId=';
const SEPARATOR_DOUBLE_DOT = ':';
const request = require("request");
const {error} = require("../utils/errorMessages");

/**
 * Create folder on OpenKM
 * @param path
 * @returns {Promise<void>}
 */
module.exports.createFolder = async (path) => {

    if (!path) {
        return error.ERROR_CREATE_FOLDER_PATHNAME_EMPTY;
    } else {
        const options = {
            'method': 'POST',
            'url': process.env.OPENKM_URL_SERVICE_BASE + OPEN_KM_END_POINT_CREATE_FOLDER,
            'headers': {
                'Content-Type': 'application/json',
                'accept': 'application/json',
                "Authorization": "Basic " + new Buffer(process.env.OPENKM_LOGIN + SEPARATOR_DOUBLE_DOT + process.env.OPENKM_PASSWORD).toString("base64")
            },
            body: JSON.stringify({
                "path": process.env.OPENKM_DOCPATH_BASE + path,
            }),
        };


        return new Promise(function (resolve, reject) {
            request(options, async function (err, response) {
                if (err) {
                    reject(err);
                } else if (response.body.error) {
                    reject(response.body.error);
                } else {
                    resolve(response.body);
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
module.exports.uploadFile = async (docPath, fileNameAndExtension, base64String) => {
    if (!docPath) {
        return error.ERROR_CREATE_FILE_PATHNAME_EMPTY;
    } else if (!fileNameAndExtension) {
        return error.ERROR_FILE_NAME_EXTENSION_EMPTY;
    } else if (!base64String) {
        return error.ERROR_CREATE_FILE_EMPTY;
    }

    let content = new Buffer.from(base64String, 'base64');

    const options = {
        method: 'POST',
        url: process.env.OPENKM_URL_SERVICE_BASE + OPEN_KM_END_POINT_UPLOAD_FILE,
        enctype: "multipart/form-data",
        headers: {
            Authorization: "Basic " +
                new Buffer(process.env.OPENKM_LOGIN + SEPARATOR_DOUBLE_DOT + process.env.OPENKM_PASSWORD).toString("base64"),
            ContentType: "multipart/form-data",
            accept: 'application/json'
        },

        formData: {
            'docPath': process.env.OPENKM_DOCPATH_BASE + docPath + "/" + fileNameAndExtension,
            'content': content
        }

    };
    return new Promise(function (resolve, reject) {
        request(options, async function (err, response) {
            if (err) {
                reject(err);
            } else if (response.body.error) {
                reject(response.body.error);
            } else {
                resolve(response.body);
            }
        });
    });

};

/**
 * Get File from OpenKM by UUID
 * @param req
 * @param res
 * @returns {Promise<void>}
 */

module.exports.getFile = async (req, res) => {
    const {docId} = req.query;
    if (docId) {
        return res.send(error.ERROR_GET_FILE_DOCID_EMPTY);
    } else {
        const options = {
            'method': 'GET',
            encoding: null, // https://stackoverflow.com/a/44519836/5479760
            'url': process.env.OPENKM_URL_SERVICE_BASE + OPEN_KM_END_POINT_GET_FILE + docId,
            'headers': {
                "Authorization": "Basic " + new Buffer(process.env.OPENKM_LOGIN + SEPARATOR_DOUBLE_DOT + process.env.OPENKM_PASSWORD).toString("base64")
            },
        };

        new Promise(() => {
            request(options, async function (err, response) {
                if (err) {
                    return res.send((err));
                } else {
                    const base64String = Buffer.from(response.body, "base64").toString("base64"); // if you want return a base64 string
                    return res.send(response.body); //send octet-stream buffer
                }
            });
        });
    }


};




