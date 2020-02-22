    const config = require('./config.helper');
const AWS = require('aws-sdk/index');
const randToken = require('rand-token');
const path = require('path');
const check = require('check-types');

AWS.config.update({
    accessKeyId: config.aws.s3.accessKeyId,
    secretAccessKey: config.aws.s3.secretAccessKey
});

let s3 = new AWS.S3({
    params: {Bucket: config.aws.s3.bucketName}
});

async function addImage(file, fileName) {
    await addFile(file, fileName, config.aws.s3.dir.images);
}

async function addFile(file, fileName, dir) {
    if (!config.general.fullMode) return;

    let params = {
        Key: dir + "/" + fileName,
        Body: file.data
    };

    await s3.upload(params).promise();
}

async function deleteImage(fileName) {
    await deleteFile(fileName, config.aws.s3.dir.images);
}

async function deleteFile(fileName, dir) {
    if (!config.general.fullMode) return;

    let path = '';
    if (dir) path = dir + "/";
    path += fileName;
    let params = {Key: path};
    await s3.deleteObject(params).promise();
}

function getImagePath(imageName) {
    if (imageName) {
        const s3UrlImage = config.aws.s3.s3UrlImage + '/';
        return imageName ? (s3UrlImage + imageName) : '';
    } else {
        return '';
    }
}

function getRandomNameFile(fileName) {
    if (fileName === undefined) {
        fileName = '';
    }
    return (new Date().getTime()) + randToken.uid(5).toUpperCase() + path.extname(fileName);
}

function isUrl(image) {
    if(check.string(image)) {
        return image.includes('https://');
    } else {
        return false;
    }
}

function replaceUrl(url) {
   return url.replace(config.aws.s3.s3UrlImage + '/', '');
}

module.exports = {
    addImage,
    deleteImage,
    getImagePath,
    getRandomNameFile,
    isUrl,
    replaceUrl
};
