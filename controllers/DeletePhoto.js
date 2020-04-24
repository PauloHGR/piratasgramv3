const Post = require('../models/UserPost');
const {Storage} = require('@google-cloud/storage');
const {Datastore} = require('@google-cloud/datastore');


module.exports = async(req, res) => {

    const id = req.params.id_post;
    const us = await Post.findOne({where:{id:id}});

    const storage = new Storage();
    storage.bucket('piratasgram-uploads').file(us.keyPost).delete();

    
    const datastore = new Datastore();
    const query = datastore.createQuery('post').filter('id_post','=',us.id);
    const [tasks] = await datastore.runQuery(query);
    for (const task of tasks){
        const taskKey = task[datastore.KEY];
        await datastore.delete(taskKey);
    }    
    
    Post.destroy({where: {id:id}})
    .then(function(){
        res.redirect('/user/'+`${req.params.id_user}`);
        return;
    })
    .catch(error => res.status(500).json({message:error}));
    
}