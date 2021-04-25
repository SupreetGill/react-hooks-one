import React from 'react';
import {FaEdit, FaTrash} from 'react-icons/fa'; 

function List({items,removeItem, edited}) {
    return (
        <div className = 'list'>
           {items.map((item)=>{
               const {id, title} = item;
               return <article className ='item' key = {id} >
                        <p className="title">{title}</p>
                        <div className="div-container">
                            <button onClick = {()=> edited(id)}type ='submit' className = 'edit-btn' >
                                <FaEdit/>
                            </button>
                            <button onClick = {()=> removeItem(id)} type ='submit' className = 'delete-btn' >
                                <FaTrash/>
                            </button>
                        </div>
                     </article>
           })}
        </div>
    );
}

export default List;