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

    console.log(req.body);

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
    //if defined by empty string
    else if(name.length === 0 || url.length === 0 || caption.length === 0){
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

        const checkDuplicateElseCreate = async () => {
            let count = await Post.find({'name':name, 'caption':caption, 'url':url}).countDocuments((err, count) => {
                console.log(`count : ${count}`);
                if(err){
                    //DB Error
                    const result = {
                    success : false,
                    error : "Internal Server Error",
                    flash : {
                        type : 'danger',
                        message : 'Failed to connect to database',
                    }
                }
                return res.status(500).json(result);
                }
                else{
                    return count;
                }
            })

            //check if duplicate exists
            count = parseInt(count);
            if(count > 0){
                //duplicate entry
                console.log("Inside duplicate");
                const result = {
                    success : false,
                    error : 'Duplicate Entry',
                    flash : {
                        type : 'danger',
                        message : 'Duplicate Meme Entry'
                    }
                }
    
                return res.status(409).json(result);
            }
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
                        success : true,
                        //flash
                        flash : {
                            type : 'success',
                            message : 'Meme posted successfully'
                        }
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
        }
        
        checkDuplicateElseCreate();
    }

})

/**
 * Method : GET
 * Route : /memes/:id
 * Description : Get POST information with :id
 */
router.get('/:id', (req, res) => {
    const memeId = req.params.id;

    //find in DB
    Post.findOne({'id':memeId}, (err, post) => {
        if(err){
            //Internal Server Error
            const result = {
                success : false,
                error : "Internal Server Error.",
                flash : {
                    type : 'danger',
                    message : 'Error Connecting to Database',
                }
            }
            return res.status(500).json(result);
        }
        else{
            if(post){
                //post found
                let result = post.toObject();
                result.success = true;
                result.flash = {
                    type : 'success',
                    message : 'XMeme found',
                }
                console.log(result, post);
                return res.status(200).json(result);
            }
            else{
                const result = {
                    success: false,
                    error : `XMeme not found with id ${memeId}`,
                    flash :{
                        type : 'danger',
                        message : 'Could not find XMeme'
                    }
                }

                return res.status(200).json(result);

            }
        }
    })
});

/**
 * Method : PATCH
 * route : /memes/:id
 * Description : Updates the POST with :id
 */
router.patch('/:id', (req, res) => {
    const memeId = req.params.id;
    const caption = req.body.caption ?? undefined;
    const url = req.body.url ?? undefined;

    if(caption.length === 0 || url.length === 0){
        const result = {
            success : false,
            error : 'Fields can not be empty',
            flash : {
                type : 'danger',
                message : 'Fields can not be empty after edit',
            }
        }

        return res.status(400).json(result);
    }

    //find post with ID, if found then update
    Post.findOne({'id':memeId}, (err, post) => {
        if(err){
            //DB error
            //Internal Server Error
            const result = {
                success : false,
                error : "Internal Server Error.",
                flash : {
                    type : 'danger',
                    message : 'Error Connecting to Database',
                }
            }
            return res.status(500).json(result);
        }
        else{
            if(post){
                //POST exists
                Post.updateOne({'id':memeId}, {'caption':caption, 'url':url, 'lastEdit':Date.now()}, (err, response) => {
                    if(err){
                        //DB Error
                        //Internal Server Error
                        const result = {
                            success : false,
                            error : "Internal Server Error.",
                            flash : {
                                type : 'danger',
                                message : 'Error Connecting to Database',
                            }
                        }
                        return res.status(500).json(result);
                    }
                    else{
                        if(post){
                            //return updated post
                            let aux = post.toObject();
                            aux.success = true;
                            aux.flash = {
                                type : 'success',
                                message : 'Post Updated Successfully',
                            }

                            return res.status(200).json(aux);
                        }
                        else{
                            //Not Found
                            //Post doesn't exist
                            const result = {
                                success : false,
                                error : `XMeme doesn't exist with id ${memeId}`,
                                flash : {
                                    type : 'danger',
                                    message : 'XMeme does not exist',
                                }
                            }

                            return res.status(400).json(result);
                        }
                    }
                })

            }
            else{
                //Post doesn't exist
                const result = {
                    success : false,
                    error : `XMeme doesn't exist with id ${memeId}`,
                    flash : {
                        type : 'danger',
                        message : 'XMeme does not exist',
                    }
                }

                return res.status(400).json(result);
            }
        }
    })
})

/**
 * Method : PATCH
 * route : /memes/upvote/:id
 * Description : +1 votes of Meme
 */
router.patch('/upvote/:id', (req, res) => {
    const memeId = req.params.id;
    //update Meme with :id, upvote++
    Post.updateOne({'id':memeId}, {$inc : {
        'upvotes' : 1
    }}, (err, result) => {
        if(err){
            //DB Error
            //Internal Server Error
            const result = {
                success : false,
                error : "Internal Server Error.",
                flash : {
                    type : 'danger',
                    message : 'Error Connecting to Database',
                }
            }
            return res.status(500).json(result);

        }
        else{
            //return status 200. Updated
            return res.sendStatus(200);
        }
    })
})

/**
 * Method : Patch
 * route : /memes/downvote/:id
 * Description : -1 votes of Meme
 */
router.patch('/downvote/:id', (req, res) => {
    const memeId = req.params.id;
    //update Meme with :id, upvote++
    Post.updateOne({'id':memeId}, {$inc : {
        'upvotes' : -1
    }}, (err, result) => {
        if(err){
            //DB Error
            //Internal Server Error
            const result = {
                success : false,
                error : "Internal Server Error.",
                flash : {
                    type : 'danger',
                    message : 'Error Connecting to Database',
                }
            }
            return res.status(500).json(result);

        }
        else{
            //return status 200. Updated
            return res.sendStatus(200);
        }
    })
})


module.exports = router;