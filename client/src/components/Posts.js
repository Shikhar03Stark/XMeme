import React, {useState, useEffect} from 'react'
import './Posts.css';
import Post from './Post';
import serverUrl from '../serverUrl/serverUrl'
const Posts = (props) => {
    //newPost undefined if no new post by user
    const [newPost, setNewPost] = useState(props.postId);
    const [posts, setPosts] = useState([]);
    const [fetched, setFetched] = useState(false);
    const [queried, setQueried] = useState(props.query);

    useEffect(() => {
        //prepare array if not fetched
        if(props.query.length === 0){
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
        if(props.query.length > 0){
            const options = {
                method : "GET",
                headers : {
                    'Content-Type':'application/json',
                },
            }
            fetch(`${serverUrl}/query/?search=${props.query}&limit=100`, options)
            .then(response => response.json())
            .then(data => {
                setPosts(data);
            })
        }

        if(props.postId !== undefined){
            //POST was successfull, fetch MEME details
            let post;
            fetch(`${serverUrl}/memes/${props.postId}`)
            .then(response => response.json())
            .then(data => {
                post = data;
                let auxPosts = posts;
                props.setPostId(undefined);
                setPosts([post].concat(auxPosts));
            });
        }
    }, [queried, fetched, props.query, props.postId]);
    return (
        <div className="Posts-container">
            {posts.map((post, index) => {
               return <Post post={post} key={post.id} />
            })}
        </div>
    )
}

export default Posts;