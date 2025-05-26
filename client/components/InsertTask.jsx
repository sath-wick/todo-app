import React from "react";
import { useState, useEffect } from "react";

export function InsertTask({updateAllTasks}){
    const [task, setTask] = useState("")
    const insertTask  = async(e)=>{
        if (!task.trim()) return
        e.preventDefault()
        try {
            const body = { title : task}
            const response  = await fetch('https://todo-app-prod-2004.up.railway.app/todo',{
                method: "POST",
                body: JSON.stringify(body),
                headers: { "Content-Type" : "application/json"}
    
        })
            const jsonData = await response.json()
    
            console.log("data sent!")
            updateAllTasks(prev=> [...prev,jsonData])
            setTask("")
        } catch (err) {
            console.error(err.message);
            
        }
  }
  
    return(
        <div className="flex flex-col gap-5">
            <h1 className="text-center mt-5 font-bold">To-Do App</h1>
            <form className="flex justify-center gap-4"
            onSubmit={insertTask}>
                <input
                type="text"
                style={{
                    "--accent-color" : "grey"
                }}

                onChange={e => {
                    setTask(e.target.value)
                }}
                value={task}
                maxLength={100}
                placeholder="Enter a task"
/>

                <button type="submit" value={"Add"} className="!text-sm"
                style={{'--button-color':'blue'}}
                >Add</button>
            </form>
        </div>
    )
}