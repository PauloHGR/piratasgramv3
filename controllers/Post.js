const User = require('../models/User');
const {Storage} = require('@google-cloud/storage');

module.exports = async(req, res) => {

    const nome = req.body.nome;
    const email = req.body.email;
    const apelido = req.body.apelido;
    const senha = req.body.senha;
    const avatar = req.file.cloudStoragePublicUrl;
    const key = req.file.cloudStorageObject;

    const check = await User.findOne({where:{apelido:apelido}});

    if (check != null){
        const storage = new Storage();
        storage.bucket('piratasgram-uploads').file(key).delete();
        return res.render('Cadastro', {msg:'Apelido já cadastrado'});
    } else {
        const user = await User.create({nome, email, apelido, senha, avatar, key});
        res.redirect('/user/'+`${user.id}`); return;
        
    }
};