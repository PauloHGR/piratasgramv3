const User = require('../models/User');
const Post = require('../models/UserPost');
const {Sequelize} = require('sequelize');
const {Datastore} = require('@google-cloud/datastore');


module.exports = async(req, res) => {

    const apelido = req.body.apelido;
    const Op = Sequelize.Op;

    const user = await User.findOne({where:{[Op.or]: [{ apelido:apelido },{ nome:apelido }]}});
    console.log(user.id);
    if(user != null){
        const datastore = new Datastore();
        const query = datastore.createQuery('post').order('id_post');
        const [tasks] = await datastore.runQuery(query);

        Post.findAll({where:{userId:user.id}})
        .then(posts => res.render('Busca',{user:user, posts:posts, tasks:tasks}))
        .catch(error => res.json({error:'Falha no Banco de Dados, recarregue a pagina e tente novamente'}));
    } else {
        return res.send('usuario não encontrado');
        //return res.redirect('/user/'+`${req.body.id_user}`);
    }
    
    
}