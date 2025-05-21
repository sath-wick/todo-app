import React, { useState, useEffect, useRef } from 'react'
import { InsertTask } from '../components/InsertTask'
import ShowAllToDos from '../components/ShowAllToDos'
import './App.css'
function App() {
  const [NewTask,setNewTask] = useState("")
  const [AllTasks, setAllTasks] = useState([])

  const fetchTasks = async () => {
    try {
      console.log("Fetching tasks...");
      const response = await fetch("https://todo-app-prod-2004.up.railway.app/todo");
      const jsonData = await response.json();
      setAllTasks(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(()=>{
    fetchTasks()
  },[])
  console.log(AllTasks)

  return (
    <>
      <InsertTask updateAllTasks = {setAllTasks}/>
      <ShowAllToDos AllTasks = {AllTasks} setAllTasks = {setAllTasks}/>
    </>
  )
}

export default App
