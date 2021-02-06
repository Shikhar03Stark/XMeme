const express = require('express');
const router = express.Router();

//cerate DB Instance
const dbHandle = require('../database/dbHandle');
//Generate Post Model
const Post = dbHandle.model('Post', require('../Schema/Post'));

/**
 * Method : GET
 * Endpoint : /memes/
 * Description : Fetch latest 100 memes
 */
router.get('/', (req, res) => {
    //array of xmemes
    const limit = 100;
    //Get latest `limit` number of Posts
    Post.find({}).sort({"postedOn" : -1}).limit(limit).exec( (err, posts) => {
        if(err){
            //Internal Server error
            const result = {
                success : false,
                error : "Error Connecting to DB. Try Again Later",
                //flash
                flash : {
                    type : 'Danger',
                    message : '500',
                }
            }
            return res.status(500).json(result);
        }
        else{
            //No DB error
            if(posts){
                //posts found maybe zero
                //array of posts
                return res.status(200).json(posts);
            }
            else{
                //Internal Server error
                const result = {
                success : false,
                error : "Error Connecting to DB. Try Again Later",
                //flash
                flash : {
                    type : 'Danger',
                    message : '500',
                }
            }
            return res.status(200).json(result);
            }
        }
    })
});

/**
 * Method : POST
 * Endpoint : /memes/
 * Description : Post a Xmeme
 */
router.post('/', (req, res) => {
    const name = req.body.name ?? undefined,
    url = req.body.url ?? undefined,
    caption = req.body.caption ?? undefined;

    //error handling
    //check if fields are null
    if(typeof name === 'undefined' || typeof url === 'undefined' || typeof caption === 'undefined'){
        //all field are mandatory
        const result = {
            success : false,
            error : 'All Fields are Mandatory',
            //flash message
            flash : { 
                type : 'danger',
                message : 'Please fill out all * marked fields'
            },
            //return prefilled fields
            name,
            url,
            caption,
        }

        //client framing error 400
        return res.status(400).json(result);
    }
    //handle string length
    else if(caption.length > 50){
        //caption length must be less than 50 characters
        const result = {
            success : false,
            error : 'Caption length exceeded limit',
            //flash message
            flash : {
                type : 'warning',
                message : 'Caption length must be less than 50 characters',
            },
            //return prefilled fields
            name, 
            url,
            caption,
        }

        //client framing error 400
        return res.status(400).json(result);
    }
    //post after data validation
    else{
        //post xmeme
        let newPost = new Post();
        newPost.name = name;
        newPost.caption = caption;
        newPost.url = url;

        newPost.save().then(post => {
            //return id of new Post
            const result = {
                id: post.id,
            }

            res.status(200).json(result);
        }).catch(err => {
            //error occured while saving
            const result = {
                success : false,
                error : "Failed to post XMeme.",
                flash : {
                    type : 'danger',
                    message : 'Server Error Posting XMeme, please try again later',
                }
            }
            return res.status(500).json(result);
        })
    }

})

module.exports = router;