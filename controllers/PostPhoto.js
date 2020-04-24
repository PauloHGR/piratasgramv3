const Post = require('../models/UserPost');
const {Datastore} = require('@google-cloud/datastore');

module.exports = async(req, res) => {

    const userId = req.params.id_user;
    const urlPost = req.file.cloudStoragePublicUrl;
    const keyPost = req.file.cloudStorageObject;
    const like = 0;
    const deslike = 0;

    const post = await Post.create({userId, urlPost, keyPost, like, deslike});
    const datastore = new Datastore();
    const taskKey = datastore.key('post');
    const entity = {
        key: taskKey,
        data: [
            {
                name: 'like',
                value: 0
            },
            {
                name: 'deslike',
                value: 0
            },
            {
                name: 'id_post',
                value: post.id
            },
        ],
    };
    try {
        datastore.save(entity); 
    } catch (err) {
        console.error('ERROR:', err);
    }
    res.redirect('/user/'+`${userId}`);
    return;
}