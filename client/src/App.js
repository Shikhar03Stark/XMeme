import React, {useState, useEffect} from 'react';
import './App.css';
import Header from './components/Header';
import Posts from './components/Posts';
import Form from './components/Form';

function App() {
  const [postId, setPostId] = useState(undefined);
  const [query, setQuery] = useState('');
  return (
    <div className="App">
     <Header query={query} setQuery={setQuery} />
     <div className="App-body">
       <Posts postId={postId} setPostId={setPostId} setQuery={setQuery} query={query}/>
       <Form setPostId={setPostId}/>
     </div>
    </div>
  );
}

export default App;
