import React, { useState } from 'react'
import './ToDoModal.css'
import { axiosInstance } from '../../api/instance'
const ToModal = ( {setIsModalOpen,refresh,setRefresh}) => {
    const [data,setData]=useState({
        title: '',
        description: '',
        due_date: '',
        completion_status:'Pending'
    })
    const handleToDoAdd= async(e)=>{
        e.preventDefault()
        try {
            console.log(data);
            const response = await axiosInstance.post('',data)
            if(response.data.status===201){
                setIsModalOpen(false)
                setRefresh(!refresh)
            }
        } catch (error) {
            console.log(error);
            
        }

    }
    const handleOnChange =(e)=>{
        const {name,value} =e.target
        setData({...data,[name]:value})

    }

  return (
    <div className="overlay">

    <div className='modal'>
                <button className='close-button' onClick={()=>{setIsModalOpen(false)}}>X</button>
            <form className="todo-form" onSubmit={handleToDoAdd}>
                <input 
                type='text'
                placeholder='Title'
                name='title'
                value={data.title}
                onChange={handleOnChange}
                required
                />
                <input
                type='textarea'
                placeholder='Description'
                name='description'
                value={data.description}
                onChange={handleOnChange}
                required/>
                <input
                type='date'
                placeholder='Due Date'
                name='due_date'
                value={data.due_date}
                onChange={handleOnChange}
                pattern="\d{4}-\d{2}-\d{2}"
                required />
                <button type='submit'>Add</button>
            </form>
    </div>
                </div>
  )
}

export default ToModal