const User = require('../models/User');
const Post = require('../models/UserPost');
const {Datastore} = require('@google-cloud/datastore');

/*
class Get {
    constructor() { }
    getAll(req, res) {
        res.send('rota ok');
    }
}
*/

module.exports = async(req, res) => {

    const id = req.params.id;

    const posts = await Post.findAll({where:{userId:id}});

    const user = await User.findOne({where:{id:id}});

    const datastore = new Datastore();
    const query = datastore.createQuery('post').order('id_post');
    const [tasks] = await datastore.runQuery(query);

    res.render('Home', {user:user, posts:posts, tasks:tasks})
    return;
    
    /*
   User.findAll({})
   .then(users => res.json(users))
   .catch(error => res.json({error:error}))
    */
};