const Post = require('../models/UserPost');
const {Datastore} = require('@google-cloud/datastore');

module.exports = async(req, res) => {

    var id = req.params.id_post;

    const datastore = new Datastore();
    const transaction = datastore.transaction();
    const query = datastore.createQuery('post').filter('id_post','=', parseInt(id,10));
    const [tasks] = await datastore.runQuery(query);
    for (const task of tasks){
        const taskKey = task[datastore.KEY];
        await transaction.run();
        task.like += 1;
        transaction.save({
            key: taskKey,
            data: task,
          });
        await transaction.commit();
    }    
    return res.redirect('/user/'+`${req.params.id_user}`);
}