import React, {useState, useEffect} from 'react'
import './Posts.css';
import Post from './Post';
const Posts = (props) => {
    //newPost undefined if no new post by user
    const [newPost, setNewPost] = useState(props.postId);
    const [posts, setPosts] = useState([]);
    const [fetched, setFetched] = useState(false);

    useEffect(() => {
        //prepare array if not fetched
        if(!fetched){
            const serverUrl = "http://localhost:8081";
            const options = {
                method : "GET",
                headers : {
                    'Content-Type':'application/json',
                },
            }
            fetch(`${serverUrl}/memes`, options)
            .then(response => response.json())
            .then(data => {
                setPosts(data);
                setFetched(true);
            })
        }

        if(props.postId !== undefined){
            //POST was successfull, fetch MEME details
            let post;
            const serverUrl = "http://localhost:8081";
            fetch(`${serverUrl}/memes/${props.postId}`)
            .then(response => response.json())
            .then(data => {
                post = data;
                let auxPosts = posts;
                props.setPostId(undefined);
                setPosts([post].concat(auxPosts));
            });
        }
    });
    return (
        <div className="Posts-container">
            {posts.map((post, index) => {
               return <Post post={post} key={post.id} />
            })}
        </div>
    )
}

export default Posts;