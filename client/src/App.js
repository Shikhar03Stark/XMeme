import React, {useState, useEffect} from 'react';
import './App.css';
import Header from './components/Header';
import Posts from './components/Posts';
import Form from './components/Form';

function App() {
  const [postId, setPostId] = useState(undefined);

  return (
    <div className="App">
     <Header/>
     <div className="App-body">
       <Posts postId={postId} setPostId={setPostId}/>
       <Form setPostId={setPostId}/>
     </div>
    </div>
  );
}

export default App;
