import { Meteor } from "meteor/meteor";
import Links from "/imports/api/links";
import Sites from "/imports/api/sites";
import Blobs from "/imports/api/blobs";

import blobServiceClient from "/imports/api/azureblob";

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

function getMediaType(filename) {
    return "others";
}

function getRegContainerName(containerName) {
    let regName = containerName.toLowerCase();
    return regName;
}

function getRegFileName(filename) {
        let regFileName = filename;
    return regFileName;
}

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
        const blobName = getMediaType(file.upload.filename) + "/" + date.getTime() + "-" + userName + "-" + getRegFileName(file.upload.filename);
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);
        const uploadBlobResponse = await blockBlobClient.upload(content, Buffer.byteLength(content));
        console.log(`Upload block blob ${blobName} successfully`, uploadBlobResponse.requestId);
        uploadedfiles.push(file.upload.uuid);

        //Save upload information in the database
        var addedFile = {
            region: info.region,
            site_id: info.site_id,
            file_name: file.upload.filename,
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

    // const downloadBlockBlobResponse = await blockBlobClient.download(0);
    // console.log(
    //   "Downloaded blob content",
    //   await streamToString(downloadBlockBlobResponse.readableStreamBody)
    // );
  
    // // Delete container
    // await containerClient.delete();
  
    // console.log("deleted container");

    return uploadedfiles;
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
            throw new Meteor.Error('Uploading files failed.');
            //return {status: 'failed', message: err.message};
        });
    }
});

// WebApp.connectHandlers.use('/fileupload', (req, res, next) => {

//     console.log("**********   POST fileupload ************\n");

//     console.log(req);

//     res.writeHead(200);
//     res.end(`Hello world from: ${Meteor.release}`);

//     console.log("**********   POST fileupload END ************\n");
// });