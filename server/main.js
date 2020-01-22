import { Meteor } from "meteor/meteor";
import Links from "/imports/api/links";
import Sites from "/imports/api/sites";
import Blobs from "/imports/api/blobs";

import blobServiceClient from "/imports/api/azureblob";

const path = require('path');
var fs = require('fs');
var formidable = require('formidable');

import {
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
    FILE_EXT_3DASSETS
} from '/imports/constants/global'

function insertLink(title, url) {
    Links.insert({ title, url, createdAt: new Date() });
}

Meteor.startup(() => {
    
    // If the Links collection is empty, add some data.
    if (Links.find().count() === 0) {
        insertLink(
            "Do the Tutorial",
            "https://www.meteor.com/tutorials/react/creating-an-app"
        );

        insertLink("Follow the Guide", "http://guide.meteor.com");

        insertLink("Read the Docs", "https://docs.meteor.com");

        insertLink("Discussions", "https://forums.meteor.com");
    }
});

function getFileType(filename) {
    
    let ext = path.extname(filename);

    let filetype = FILE_TYPE_OTHERS;
    if( FILE_EXT_LASER.includes(ext) ) {
        filetype = FILE_TYPE_LASER;
    }
    else if( FILE_EXT_EXCEL.includes(ext) ) {
        filetype = FILE_TYPE_EXCEL;
    }
    else if( FILE_EXT_WORD.includes(ext) ) {
        filetype = FILE_TYPE_WORD;
    }
    else if( FILE_EXT_PDF.includes(ext) ) {
        filetype = FILE_TYPE_PDF;
    }
    else if( FILE_EXT_TOWER.includes(ext) ) {
        filetype = FILE_TYPE_TOWER;
    }
    else if( FILE_EXT_AUTOCAD.includes(ext) ) {
        filetype = FILE_TYPE_AUTOCAD;
    }
    else if( FILE_EXT_PHOTO.includes(ext) ) {
        filetype = FILE_TYPE_PHOTO;
    }
    else if( FILE_EXT_VIDEO.includes(ext) ) {
        filetype = FILE_TYPE_VIDEO;
    }
    else if( FILE_EXT_MESHGUN.includes(ext) ) {
        filetype = FILE_TYPE_MESHGUN;
    }
    else if( FILE_EXT_3DASSETS.includes(ext) ) {
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
/*
async function uploadFiles(files, info) {
    let i = 1;
    for await (const container of blobServiceClient.listContainers()) {
      console.log(`Container ${i++}: ${container.name}`);
    }
  
    // Create a container
    const containerName = getRegContainerName(info.region + "-" + info.site_id);
    const containerClient = blobServiceClient.getContainerClient(containerName);
  
    try{
        const createContainerResponse = await containerClient.create();
        console.log(`Create container ${containerName} successfully`, createContainerResponse.requestId);
    }catch(error) {
        // console.log(`Create container ${containerName} failed. Maybe, Already created. `, error);
        console.log(`Create container ${containerName} failed. Maybe, Already created. `);
    }
    
    var uploadedfiles = [];

    // Create a blob
    var userName = "Nastia";
    var userID = "Nastia";
    for await( const file of files ) {
        const content = file.dataURL;
        const date = new Date();
        const fileType = getFileType(file.upload.filename);
        //console.log(fileType);
        const blobName = fileType + "/" + date.getTime() + "-" + userName + "-" + getRegFileName(file.upload.filename);
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);
        const uploadBlobResponse = await blockBlobClient.upload(content, Buffer.byteLength(content));
        console.log(`Upload block blob ${blobName} successfully`, uploadBlobResponse.requestId);
        uploadedfiles.push(file.upload.uuid);

        //download test
        // blockBlobClient.downloadToFile("C:\\test\\" + file.upload.filename);
        // const downloadBlockBlobResponse = await blockBlobClient.download(0);    //downloadToFile
        // console.log(
        //     "Downloaded blob content",
        //     await streamToString(downloadBlockBlobResponse.readableStreamBody)
        // );

        //Save upload information in the database
        var addedFile = {
            region: info.region,
            site_id: info.site_id,
            file_name: file.upload.filename,
            file_type: fileType,
            file_size: file.upload.total,
            user_id: userID,
            user_name: userName,
            container_name: containerName,
            blobl_name: blobName,
            uploaded_date: date,
            comments: ''
        }

        Blobs.insert(addedFile);
    }
    
    // List blobs
    i = 1;
    for await (const blob of containerClient.listBlobsFlat()) {
        console.log(`Blob ${i++}: ${blob.name}`);
    }
  
    // // Delete container
    // await containerClient.delete();  
    // console.log("deleted container");

    return uploadedfiles;
}

// A helper method used to read a Node.js readable stream into string
async function streamToString(readableStream) {
    return new Promise((resolve, reject) => {
      const chunks = [];
      readableStream.on("data", (data) => {
        chunks.push(data.toString());
      });
      readableStream.on("end", () => {
        resolve(chunks.join(""));
      });
      readableStream.on("error", reject);
    });
  }

Meteor.methods({
    'fileupload': function(files, info) {
        console.log("=====  received file ======\n");
        // console.log(files);
        //console.log("================================ \n");
        // throw new Meteor.Error('Uploading files failed.');

        uploadFiles(files, info)
        .then(res => {
            return res; //list of uploaded file uuid
        })
        .catch((err) => {
            console.error("Error Upload Files:", err.message);            
            return {status: 'failed', message: err.message};
            // throw new Meteor.Error('Uploading files failed.');
            
        });
    }
});
*/

async function uploadFiles(info) {
    let i = 1;
    for await (const container of blobServiceClient.listContainers()) {
      console.log(`Container ${i++}: ${container.name}`);
    }
  
    // Create a container
    const containerName = getRegContainerName(info.region + "-" + info.siteid);
    const containerClient = blobServiceClient.getContainerClient(containerName);
  
    try{
        const createContainerResponse = await containerClient.create();
        console.log(`Create container ${containerName} successfully`, createContainerResponse.requestId);
    }catch(error) {
        // console.log(`Create container ${containerName} failed. Maybe, Already created. `, error);
        console.log(`Create container ${containerName} failed. Maybe, Already created. `);
    }
    
    // Create a blob
    var userName = "Nastia";
    var userID = "Nastia";
    
    const date = new Date();
    const fileType = getFileType(info.filename);
    //console.log(fileType);
    const blobName = fileType + "/" + date.getTime() + "-" + userName + "-" + getRegFileName(info.filename);
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    const uploadBlobResponse = await blockBlobClient.uploadFile(info.filepath);
    console.log(`Upload block blob ${blobName} successfully`, uploadBlobResponse.requestId);

    //download test
    // blockBlobClient.downloadToFile("C:\\test\\" + file.upload.filename);
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
        blobl_name: blobName,
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

WebApp.connectHandlers.use('/fileupload', (req, res, next) => {

    console.log("**********   POST fileupload ************\n");

    // console.log(req);
    var uploaded = true;
    const fromURL = req.headers.referer;

    new formidable.IncomingForm().parse(req, (err, fields, files) => {
        if (err) {
          console.error('Error', err)
          throw err
        }
        console.log('Fields', fields)
        // console.log('Files', files)
        // for (const file of Object.entries(files)) {
        //   console.log(file)
        // }

        uploaded = true;
        // oldpath : temporary folder to which file is saved to
        const oldpath = files.file.path;
        const arr = fromURL.split("/");
        const region = arr[arr.length - 4];
        const siteid = arr[arr.length -1];

        const fileInfo = {
            region: region,
            siteid: siteid,
            filename: files.file.name,
            filesize: files.file.size,
            filetype: files.file.type,
            uploadid: path.basename(files.file.path),
            filepath: files.file.path
        }

        //Upload to Azure Blob
        uploadFiles(fileInfo)
        .then(res => {
            return res; //list of uploaded file uuid
        })
        .catch((err) => {
            console.error("Error Upload Files:", err.message);            
            return {status: 'failed', message: err.message};
            // throw new Meteor.Error('Uploading files failed.');
        });        

        // var newpath = upload_path + files.filetoupload.name;
        // // copy the file to a new location

        // fs.rename(oldpath, newpath, function (err) {
        //     if (err) throw err;
        //     // you may respond with another html page
        //     res.write('File uploaded and moved!');
        //     res.end();
        // });

      })

    if( uploaded  ) {
        res.writeHead(200);
        res.end("Upload Success");    
    }
    else {
        res.writeHead(404);
        res.end("Upload Failed");
    }

    // var filename = path.basename(req.params.filename);
    // var filename = "test.png";
    // filename = path.resolve(__dirname, filename);
    // var dst = fs.createWriteStream(filename);
    // req.pipe(dst);
    // dst.on('drain', function() {
    //     console.log('drain', new Date());
    //     req.resume();
    // });
    // req.on('end', function () {
    //     // res.send(200);
    // });

    // res.writeHead(200);
    // res.end(`Hello world from: ${Meteor.release}`);

    console.log("**********   POST fileupload END ************\n");
});