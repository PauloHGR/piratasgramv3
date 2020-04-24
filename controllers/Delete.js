const User = require('../models/User');
const Post = require('../models/UserPost');
const {Storage} = require('@google-cloud/storage');
const {Datastore} = require('@google-cloud/datastore');


module.exports = async(req, res) => {
   
    const id = req.params.id;
    
    const us = await User.findOne({where:{id:id}});
    const posts = await Post.findAll({where:{userId:id}});

    const storage = new Storage();

    if(posts!=''){
        posts.forEach(async function(content){
            storage.bucket('piratasgram-uploads').file(content.keyPost).delete();
            const datastore = new Datastore();
            const query = datastore.createQuery('post').filter('id_post','=',content.id);
            const [tasks] = await datastore.runQuery(query);
            for (const task of tasks){
                const taskKey = task[datastore.KEY];
                await datastore.delete(taskKey);
            }    
        });
    }

    storage.bucket('piratasgram-uploads').file(us.key).delete();

    User.destroy({where: {id:id}})
    .then(function(){
        res.redirect('/'); return;
    })
    .catch(error => res.status(500).json({message:error}));
    
};