const routes = require('express').Router();
const multer = require('multer');
const multerConfig = require('../config/multer');
const _post = require('../controllers/PostPhoto');
const _delete = require('../controllers/DeletePhoto');

routes.post('/:id_user',multerConfig.multer.single('avatar'), multerConfig.sendUploadToGCS, _post);
routes.delete('/:id_user/:id_post', _delete);

module.exports = routes;