import React ,{useState}from 'react';
import List from './components/List';
import Alert from './components/Alert';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [list, setList] = useState([]);
  const [isEditing,setIsEditing] = useState(false);
  const [editId,setEditId] = useState(null);
  const [alert,setAlert] = useState({});
  return (
    <div className="App">
      react hooks 
    </div>
  );
}

export default App;
