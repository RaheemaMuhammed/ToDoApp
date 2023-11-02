import React from 'react'
import '../ToDoModal/ToDoModal.css'
import './DeleteModal.css'
import { axiosInstance } from '../../api/instance'
const DeleteModal = ({id,refresh, setRefresh,setDeleteModal}) => {
    const handleDelete=async(e)=>{
        console.log('skdks');
        e.preventDefault()
        try {
            const response=await axiosInstance.delete('',{params:{id:id}})
            console.log(id);
            console.log(response);
            if(response.data.status===200){
                console.log(response);
                setRefresh(!refresh)
                setDeleteModal(false)
            }
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <div className="overlay">

    <div className='modal'>
                <button className='close-button' onClick={()=>{setDeleteModal(false)}}>X</button>
            <form className="todo-form" onSubmit={handleDelete}>
                <h4 className='confirm'>Are you sure you want to delete this task?</h4>
                <button type='submit'>Delete</button>
            </form>
    </div>
                </div>
  )
}

export default DeleteModal