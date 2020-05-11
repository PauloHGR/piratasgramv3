const Multer = require('multer');
const crypto = require('crypto');
const {Storage} = require('@google-cloud/storage');
const {format} = require('util');



const multer = Multer({
    storage: Multer.memoryStorage()
})

function sendUploadToGCS (req, res, next){
    
    const storage = new Storage({
        projectId: 'estudos-cloud-274013'
    });
    
    const bucket = storage.bucket('piratasgram-uploads');
    const hash = crypto.randomBytes(16);
    const gcsname = format(`${hash.toString("hex")}-${req.file.originalname}`);

    const blob = bucket.file(gcsname);
    const blobStream = blob.createWriteStream({
        metadata: {
          contentType: req.file.mimetype
        },
        resumable: false
    });

    blobStream.on('error', err => {
        console.log(err);
        return res.redirect('/user');
    });
    
    blobStream.on('finish', () => {
        // The public URL can be used to directly access the file via HTTP.
        req.file.cloudStorageObject = gcsname;
        req.file.cloudStoragePublicUrl = getPublicUrl(bucket.name,blob.name);
        console.log('Foto enviada com sucesso');
        next();
    });
    
    blobStream.end(req.file.buffer); 
}

function getPublicUrl (bucket, filename) {
    return `https://storage.googleapis.com/${bucket}/${filename}`;
}

module.exports = {sendUploadToGCS, multer};

/*
storage: multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})
    
    storage: multerS3({
        s3: new aws.S3(),
        bucket:'BUCKET_S3',
        contentType: multerS3.AUTO_CONTENT_TYPE, //Para não realizar o download da imagem e sim apenas abrir ela
        acl: 'public-read',
        key: (req, file, cb) => {

            crypto.randomBytes(16, (err, hash) => {
                if(err){cb(err)}
                fileName = `${req.params.id_user}/${hash.toString("hex")}-${file.originalname}`;
                cb(null, fileName);
            })
        }

    })
    */