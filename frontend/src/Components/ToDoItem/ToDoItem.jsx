import React, { useState } from 'react'
import './ToDoItem.css'
import { axiosInstance } from '../../api/instance'
import EditModal from '../EditModal/EditModal'
import DeleteModal from '../DeleteModal/DeleteModal'
const ToDoItem = ({todo,refresh,setRefresh}) => {
  const[editModal,setEditModal]=useState(false)
  const [deleteModal,setDeleteModal]=useState(false)
  const [id,setId]=useState('')
    const isComplete=todo.completion_status=='Completed'? true : false

    const handleToDoStatus= async()=>{
      const completion_status=todo.completion_status=='Completed'?"Pending":'Completed'
      try {
        const response=await axiosInstance.patch('',{id:todo.id,completion_status:completion_status})
        if(response.data.status===200){
          setRefresh(!refresh)
        }
      } catch (error) {
        window.alert('something went wrong')
      }


    }
  return (
    <div className='item'>
      {editModal?<EditModal todo={todo} id={id} refresh={refresh} setRefresh={setRefresh} setEditModal={setEditModal} />:''}
      {deleteModal?<DeleteModal id={id} refresh={refresh} setRefresh={setRefresh} setDeleteModal={setDeleteModal} />:''}
        <div className='task'>
       <div className='checkbox_container'>

        <label className="main"> 
        <input className='checkbox' type="checkbox"  
         checked={isComplete}
        onChange={handleToDoStatus}/> 
        <span className="status"></span> 
        </label>
       </div>
        <div className='singleTask' style={isComplete ? { textDecoration: 'line-through',color:'#FFC3A1' } : { textDecoration: 'none' }}>

        <h2 className='title' >{todo.title}</h2>

        <p>{todo.description}</p>
        <h5>{todo.due_date}</h5>
        </div>
        </div>
        <div className='interact'>
            <button onClick={()=>{setDeleteModal(!deleteModal);setId(todo.id)}}>Delete</button>
            <button onClick={()=>{setEditModal(!editModal);setId(todo.id)}}>Edit</button>
           
            
        </div>

     </div>
  )
}

export default ToDoItem