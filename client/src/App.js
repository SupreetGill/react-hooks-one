import React ,{useEffect, useState}from 'react';
import List from './components/List/List';
import Alert from './components/Alert/Alert';
import './App.scss';


const getLocalStorage = () => {
  let initialList = localStorage.getItem('list');
  if(initialList){
   return JSON.parse(localStorage.getItem('list'))
  }
  else{
    return []
  }

}


function App() {
  const [name, setName] = useState('');
  const [list, setList] = useState(getLocalStorage());
  const [isEditing,setIsEditing] = useState(false);
  const [editId,setEditId] = useState(null);
  const [alert,setAlert] = useState({ 
    show: false, 
    msg:'', 
    type: ''});


  const showAlert = (show=false, type = "", msg = "") =>{
    return setAlert({show:show, type:type, msg:msg})
  }  

  const handleSubmit = (e) =>{
   e.preventDefault();
   if(!name){
     //display alert
     setAlert({show:true, msg: 'plz enter value' ,type : 'danger' })

   }
   else if(name && isEditing){
      setList(list.map(item=>{ if(item.id ===editId){
          return {...item, title :name}
        }
        return item
      }))
      setName('');
      setIsEditing('false');
      setEditId(null);
      showAlert(true,'success','Value Changed!!')
   }
   else{
     // show alert
     showAlert(true, 'success','item added to the list')
     const newItem = {
       id:new Date().getTime().toString(),
       title : name};
       setList([...list,newItem])
       setName('');
   }
  }


  const clearList = ()=>{
    showAlert(true,'danger','empty out the list');
    setList([]);
  }

 const removeItem =(id)=>{
  showAlert(true,'danger','removed item');
  setList(list.filter(item=> id!== item.id))
 }

const editItem = (id)=>{
  // showAlert(true,'success','edited item');
  const edited = list.find(item => id === item.id);
  setIsEditing(true);
  setEditId(id);
  setName(edited.title)
}

 useEffect(()=>{
   //overwrite old values with new values
     localStorage.setItem('list', JSON.stringify(list))
 },[list])



  return (
    <section className="section-center">
      <form className = 'grocery-form' onSubmit ={handleSubmit} >
        {alert.show &&
          <Alert 
          {...alert} 
          removeAlert = {showAlert}
          list = {list} />}
        <h2 className = 'bud' >Grocery bud</h2>

        <div className="form-control">
          <input type="text"
          className = 'grocery'
          placeholder = 'e.g. milk'
          value = {name}
          onChange = {(e)=> setName(e.target.value) }/>
          <button type ='submit' className = 'submit-btn' >
            {isEditing ? 'edit' : 'submit'}
          </button>
        </div>

      </form>
      {list.length > 0 &&(
          <div className="grocery-container">
            <List  items = {list} removeItem = {removeItem} edited = {editItem}/>
            <button 
              className = 'clear-btn'
              onClick = {clearList}>
                Clear Items
            </button>
          </div>
      )}
   
    </section>
  );
}

export default App;
