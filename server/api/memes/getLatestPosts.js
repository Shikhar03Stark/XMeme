
/**
 * Description : Get latest `limit` number of posts
 */
const getLatestPosts = (model, limit) => {
    model.find({}).sort({"postedOn" : -1}).limit(limit).exec( (err, posts) => {
        console.log(`in function`);
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
            return result;
        }
        else{
            //No DB error
            if(posts){
                //posts found maybe zero
                //array of posts
                return posts;
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
            return result;
            }
        }
    })
}

module.exports = getLatestPosts;