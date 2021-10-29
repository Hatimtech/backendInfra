const OPEN_KM_END_POINT_CREATE_FOLDER = 'rest/folder/create';
const OPEN_KM_END_POINT_UPLOAD_FILE = 'rest/document/createSimple';
const OPEN_KM_END_POINT_GET_FILE = 'rest/document/getContent?docId=';
const SEPARATOR_DOUBLE_DOT = ':';
const request = require("request");
const {error} = require("../utils/errorMessages");
const fs = require('fs');

/**
 * Create folder on OpenKM
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.createFolder = async (req, res) => {
    const {path} = req.body;

    if (path == undefined || path == null || path == '') {
        return res.send(error.ERROR_CREATE_FOLDER_PATHNAME_EMPTY);
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

        new Promise(() => {
            request(options, async function (err, response) {
                if (err) {
                    return res.send((err));
                } else {
                    return res.send(response.body);
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
    const {docPath} = req.fields
    const content = req.files
    if (docPath == undefined || docPath == null || docPath == '') {
        return res.send(error.ERROR_CREATE_FILE_PATHNAME_EMPTY);
    }
    else if (content == undefined || content == null || content == '') {
        return res.send(error.ERROR_CREATE_FILE_EMPTY);
    }

    else {
        const options = {
            method: 'POST',
            url: process.env.OPENKM_URL_SERVICE_BASE + OPEN_KM_END_POINT_UPLOAD_FILE,
            enctype:"multipart/form-data",
            headers: {
                Authorization: "Basic " +
                    new Buffer(process.env.OPENKM_LOGIN + SEPARATOR_DOUBLE_DOT + process.env.OPENKM_PASSWORD).toString("base64"),
                ContentType: "multipart/form-data",
                accept: 'application/json'
            },

            formData: {
                        'docPath': process.env.OPENKM_DOCPATH_BASE+docPath,
                        'content' : fs.createReadStream(content.content.path)
            }

        };
            request(options,  function (err, response) {
                if (err) {
                    return res.send(err);
                } else {
                    return res.send(response.body);
                }
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
    const {docId} = req.query;
    if (docId == undefined || docId == null || docId == '') {
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
                     const base64String = Buffer.from(response.body,"base64").toString("base64"); // if you want return a base64 string
                     return res.send(response.body); //send octet-stream buffer
                }
            });
        });
    }


};




