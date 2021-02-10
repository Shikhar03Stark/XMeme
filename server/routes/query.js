const express = require('express');
const router = express.Router();
//Generate DB Instance and Post Model
const dbHandle = require('../database/dbHandle');
const Post = dbHandle.model('Post', require('../Schema/Post'));
Post.createIndexes();
/**
 * Method : GET
 * route : /query/?search=:term
 * Description : Search Database for text based index
 */
router.get('/', (req, res) => {
    let searchTerm = req.query.search;
    let limit = req.query.limit ?? 100;
    limit = parseInt(limit);
    searchTerm = searchTerm.toString().toLowerCase();
    Post.find({$text: {$search : searchTerm, $caseSensitive:false}}).limit(limit).exec((err, posts) => {
        console.log(limit);
        if(err){
            //DB Error
            const result = {
                success : false,
                error : "Database error",
                flash : {
                    type : 'danger',
                    message : 'Error Connecting to database, Try again later'
                }
            }

            return res.status(500).json(result);
        }
        else{
            //send array of posts
            return res.status(200).json(posts);
        }
    })
});

module.exports = router;
