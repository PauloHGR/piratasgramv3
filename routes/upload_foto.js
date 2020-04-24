const routes = require('express').Router();
const multer = require('multer');
const multerConfig = require('../config/multer');
const _post = require('../controllers/UpdatePhoto');

routes.post('/:id_user', multerConfig.multer.single('avatar'), multerConfig.sendUploadToGCS, _post);

module.exports = routes;