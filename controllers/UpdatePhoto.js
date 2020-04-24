const User = require('../models/User');
const {Storage} = require('@google-cloud/storage');


module.exports = async(req, res) => {

    //const {nome, email, apelido, senha} = req.body;

    const id = req.params.id_user;
    const us = await User.findOne({where:{id:id}});

    const storage = new Storage();
    storage.bucket('piratasgram-uploads').file(us.key).delete();

    const avatar = req.file.cloudStoragePublicUrl;
    const key = req.file.cloudStorageObject;

    User.update({avatar, key}, {where: {id:id}})
    .then(function(){
        res.redirect('/user/'+`${id}`);
        return;
    })
    .catch(error => res.status(500).json({error:error}));
};