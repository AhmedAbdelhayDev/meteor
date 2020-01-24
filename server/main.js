import { Meteor } from "meteor/meteor";
import Sites from "/imports/api/sites";
import Blobs from "/imports/api/blobs";

import { azureStorage, blobService, blobServiceClient } from "/imports/api/azureblob";

const path = require('path');
var fs = require('fs');
var formidable = require('formidable');
var multer = require("multer");

import {
    AZURE_CONTAINER_NAME,

    FILE_TYPE_LASER,
    FILE_TYPE_EXCEL,
    FILE_TYPE_WORD,
    FILE_TYPE_PDF,
    FILE_TYPE_TOWER,
    FILE_TYPE_AUTOCAD,
    FILE_TYPE_PHOTO,
    FILE_TYPE_VIDEO,
    FILE_TYPE_MESHGUN,
    FILE_TYPE_3DASSETS,
    FILE_TYPE_OTHERS,

    FILE_EXT_LASER,
    FILE_EXT_EXCEL,
    FILE_EXT_WORD,
    FILE_EXT_PDF,
    FILE_EXT_TOWER,
    FILE_EXT_AUTOCAD,
    FILE_EXT_PHOTO,
    FILE_EXT_VIDEO,
    FILE_EXT_MESHGUN,
    FILE_EXT_3DASSETS,

    GetFileTypeName
} from '/imports/constants/global'

Meteor.startup(() => {
    
});

function getFileType(filename) {

    let ext = path.extname(filename.toLowerCase());

    let filetype = FILE_TYPE_OTHERS;
    if (FILE_EXT_LASER.includes(ext)) {
        filetype = FILE_TYPE_LASER;
    }
    else if (FILE_EXT_EXCEL.includes(ext)) {
        filetype = FILE_TYPE_EXCEL;
    }
    else if (FILE_EXT_WORD.includes(ext)) {
        filetype = FILE_TYPE_WORD;
    }
    else if (FILE_EXT_PDF.includes(ext)) {
        filetype = FILE_TYPE_PDF;
    }
    else if (FILE_EXT_TOWER.includes(ext)) {
        filetype = FILE_TYPE_TOWER;
    }
    else if (FILE_EXT_AUTOCAD.includes(ext)) {
        filetype = FILE_TYPE_AUTOCAD;
    }
    else if (FILE_EXT_PHOTO.includes(ext)) {
        filetype = FILE_TYPE_PHOTO;
    }
    else if (FILE_EXT_VIDEO.includes(ext)) {
        filetype = FILE_TYPE_VIDEO;
    }
    else if (FILE_EXT_MESHGUN.includes(ext)) {
        filetype = FILE_TYPE_MESHGUN;
    }
    else if (FILE_EXT_3DASSETS.includes(ext)) {
        filetype = FILE_TYPE_3DASSETS;
    }

    return filetype;
}

function getRegContainerName(containerName) {
    let regName = containerName.toLowerCase();
    return regName;
}

function getRegFileName(filename) {
    let regFileName = filename;
    return regFileName;
}

async function uploadFiles(info) {
    let i = 1;
    for await (const container of blobServiceClient.listContainers()) {
        console.log(`Container ${i++}: ${container.name}`);
    }

    // Create a container
    const containerName = getRegContainerName(AZURE_CONTAINER_NAME);
    const containerClient = blobServiceClient.getContainerClient(containerName);

    try {
        const createContainerResponse = await containerClient.create();
        console.log(`Create container ${containerName} successfully`, createContainerResponse.requestId);
    } catch (error) {
        // console.log(`Create container ${containerName} failed. Maybe, Already created. `, error);
        console.log(`Create container ${containerName} failed. Maybe, Already created. `);
    }

    // Create a blob
    var userName = "User1";
    var userID = "user1";

    const date = new Date();
    const fileType = getFileType(info.filename);
    //console.log(fileType);
    const blobName = "TEST/" + info.region + "/" + info.siteid + "/" + fileType + "/" + date.getTime() + "-" + userName + "-" + getRegFileName(info.filename);
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    const uploadBlobResponse = await blockBlobClient.uploadFile(info.filepath);
    console.log(`Upload block blob ${blobName} successfully`, uploadBlobResponse.requestId);
    try {
        fs.unlinkSync(info.filepath)
        console.log("file removed");
    } catch (err) {
        console.error(err)
    }

    //download test
    // const blobDownloadResponse = await blockBlobClient.downloadToFile("C:\\test\\" + info.filename);    //OK
    // console.log("Downloaded blob content");

    // const downloadBlockBlobResponse = await blockBlobClient.download(0);    //downloadToFile
    // console.log(
    //     "Downloaded blob content",
    //     await streamToString(downloadBlockBlobResponse.readableStreamBody)
    // );

    //Save upload information in the database
    var addedFile = {
        region: info.region,
        site_id: info.siteid,
        file_name: info.filename,
        file_type: fileType,
        file_size: info.filesize,
        user_id: userID,
        user_name: userName,
        container_name: containerName,
        blob_name: blobName,
        uploaded_date: date,
        comments: ''
    }

    Blobs.insert(addedFile);

    // List blobs
    i = 1;
    for await (const blob of containerClient.listBlobsFlat()) {
        console.log(`Blob ${i++}: ${blob.name}`);
    }

    // // Delete container
    // await containerClient.delete();  
    // console.log("deleted container");

    return true;
}

var upload = multer({ dest: "uploads/" }).any();

WebApp.connectHandlers.use('/fileupload', (req, res, next) => {

    console.log("**********   POST fileupload ************\n");

    upload(req, res, function (err) {
        // console.log(req);
        var uploaded = true;
        const fromURL = req.headers.referer;

        var fields = req.fields;
        var file = req.files[0];

        if (err) {
            console.error('Error', err)
            res.writeHead(404);
            throw err
        }
        console.log('Fields', fields)
        // console.log('Files', files)
        // for (const file of Object.entries(files)) {
        //   console.log(file)
        // }

        try {
            uploaded = true;
            // oldpath : temporary folder to which file is saved to
            const oldpath = file.path;
            const arr = fromURL.split("/");
            const region = arr[arr.length - 4];
            const siteid = arr[arr.length - 1];

            const fileInfo = {
                region: region,
                siteid: siteid,
                filename: file.originalname,
                filesize: file.size,
                filetype: file.mimetype,
                uploadid: file.filename,
                filepath: file.path
            }

            //Upload to Azure Blob
            uploadFiles(fileInfo)
                .then(res => {
                    return res; //list of uploaded file uuid
                })
                .catch((err) => {
                    console.error("Error Upload Files:", err.message);
                    return { status: 'failed', message: err.message };
                    // throw new Meteor.Error('Uploading files failed.');
                });
        }
        catch (err) {
            console.error("Error formidable:", err.message);
            return { status: 'failed', message: err.message };
            // throw new Meteor.Error('Uploading files failed.');
        };
    })

    res.writeHead(200);
    res.end("success");
});

const getBlobTempPublicUrl = (blobName) => {
 
    const containerName = AZURE_CONTAINER_NAME;
    const startDate = new Date();
    const expiryDate = new Date(startDate);
    expiryDate.setMinutes(startDate.getMinutes() + 100);
    startDate.setMinutes(startDate.getMinutes() - 100);
    
    const sharedAccessPolicy = {
        AccessPolicy: {
            Permissions: azureStorage.BlobUtilities.SharedAccessPermissions.READ,
            Start: startDate,
            Expiry: expiryDate
        }
    };
    
    const token = blobService.generateSharedAccessSignature(containerName, blobName, sharedAccessPolicy);
    
    return blobService.getUrl(containerName, blobName, token);
}

Meteor.methods({
    'getSiteFileList'({site_id}) {
        try{
            //file list
            let files = [];
            let fileDic = {};

            const blobs = Blobs.find(
                {site_id: site_id},
                {
                    fields: {              
                        file_name: 1,
                        file_type: 1,
                        file_size: 1,
                        user_name: 1,
                        uploaded_date: 1,
                        blob_name: 1,
                        _id: 1
                    },
                    sort: {
                        file_type: 1
                    }
                }
            ).forEach( blob => 
                {
                    if( fileDic[blob.file_type] ) {
                        fileDic[blob.file_type].children.push(
                            {
                                id: blob._id,
                                text: blob.file_name,
                                isLeaf: true,
                                blobURL: getBlobTempPublicUrl(blob.blob_name)
                            }
                        );
                    }
                    else {
                        fileDic[blob.file_type] = {
                            id: blob.file_type,
                            text: GetFileTypeName(blob.file_type),
                            children: [
                                {
                                    id: blob._id,
                                    text: blob.file_name,
                                    isLeaf: true,
                                    blobURL: getBlobTempPublicUrl(blob.blob_name)
                                }
                            ]
                        }
                    }                
                }
            )            
           
            //convert dic to array
            for (var type in fileDic) {
                files.push(fileDic[type]);
            }

            return files;
            
        }catch(err) {
            throw new Meteor.Error('Failed.', err);
        }
    }
});