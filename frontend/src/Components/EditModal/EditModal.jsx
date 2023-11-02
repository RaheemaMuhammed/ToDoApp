import {useState} from 'react'
import { axiosInstance } from '../../api/instance'
import '../ToDoModal/ToDoModal.css'
const EditModal = ({todo,id,refresh,setRefresh,setEditModal}) => {
    const [data,setData]=useState({
        title: todo.title,
        description: todo.description,
        due_date: todo.due_date,
        completion_status:todo.completion_status,
        id:todo.id
    })
    const handleOnChange =(e)=>{
        const {name,value} =e.target
        setData({...data,[name]:value})

    }
    const handleToDoEdit=async(e)=>{
        e.preventDefault()
        try {
            const response=await axiosInstance.patch('',data)
            console.log(response,'edityoo');
            if(response.data.status===200){
                setRefresh(!refresh)
                setEditModal(false)
            }
            
        } catch (error) {
            console.log(error);
        }

    }
  return (
    <div className="overlay">

    <div className='modal'>
                <button className='close-button' onClick={()=>{setEditModal(false)}}>X</button>
            <form className="todo-form" onSubmit={handleToDoEdit}>
                <input 
                type='text'
                placeholder='Title'
                name='title'
                value={data.title}
                onChange={handleOnChange}
                />
                <input
                type='textarea'
                placeholder='Description'
                name='description'
                value={data.description}
                onChange={handleOnChange}/>
                <input
                type='date'
                placeholder='Due Date'
                name='due_date'
                value={data.due_date}
                onChange={handleOnChange}
                pattern="\d{4}-\d{2}-\d{2}" />
                <button type='submit'>Submit</button>
            </form>
    </div>
                </div>  )
}

export default EditModal