import './App.css'
import { useEffect, useState } from 'react'
import {axiosInstance} from './api/instance'
import ToDoItem from './Components/ToDoItem/ToDoItem'
import ToModal from './Components/ToDoModal/ToModal'
function App() {
  
  const [todos,setTodos] =useState([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refresh,setRefresh]=useState(false)

  useEffect(() => {
    try {
      const fetchToDos =async ()=>{
        const response=await axiosInstance.get()
        setTodos(response.data.payload)
      }
      fetchToDos()
    } catch (error) {
      console.log(error);
      
    }
    
  }, [refresh])
 
  return (
    <div className='body'>
      <header>
        <h1 className='heading'>ToDo App</h1>
          </header>
        {isModalOpen ? <ToModal setIsModalOpen={setIsModalOpen} refresh={refresh} setRefresh={setRefresh} /> : ''}
          
        <div className='todos'>
        <button className='addTask' onClick={()=>setIsModalOpen(!isModalOpen)}>Add Task</button>
        {todos.length===0?<h3 className='nothing'>Nothing to show!!</h3>
          :<>
      
          {todos.map((todo,index)=>(
            <ToDoItem key={index} todo={todo} refresh={refresh} setRefresh={setRefresh}/>
            ))}
            </>
          }
        </div>
        

    </div>
  )
}

export default App
