import './App.css';
import Header from './components/Header';
import Posts from './components/Posts';
import Form from './components/Form';

function App() {
  return (
    <div className="App">
     <Header/>
     <div className="App-body">
       <Posts />
       <Form />
     </div>
    </div>
  );
}

export default App;
