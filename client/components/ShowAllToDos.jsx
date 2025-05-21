import React from 'react'
import { useEffect, useState, useRef } from 'react'
export default function ShowAllToDos({AllTasks, setAllTasks}) {

const [editingTask, setEditingTask] = useState(null)
const [taskValueList, setTaskValueList] = useState({})
const [oldTask, setOldTask] = useState("")


const taskFieldRef = useRef(null)

useEffect(()=>{
    const inittaskValueLists = AllTasks.reduce((acc, task)=>{
        acc[task.id] = task.title
        return acc
    },{})
    setTaskValueList(inittaskValueLists)
},[AllTasks])

useEffect(()=>{
    if(editingTask !== null) taskFieldRef.current?.focus()
},[editingTask])

const deleteTask = async(taskId)=>{
    try {
        await fetch(`https://todo-app-prod-2004.up.railway.app/todo/${Number(taskId)}`,{
            method: "DELETE"
        })
        setAllTasks(prev=> prev.filter(task=> task.id !== taskId))
        
    } catch (err) {
        console.error(err.message);
    }
}

const handleEdit = (taskId)=>{
    setEditingTask(prev=>prev===taskId? null : taskId)
}

//recieve the id of task that is being edited
const editTask = async(taskId)=>{
    if (taskValueList[taskId] === "") return //return if task title is empty
    try {
        const body = {title : taskValueList[taskId]}
        const response = await fetch(`https://todo-app-prod-2004.up.railway.app/todo/${Number(taskId)}`,{
            method: "PUT",
            body: JSON.stringify(body),
            headers:{"Content-Type" : "application/json"} 
        })
        const jsonData = await response.json()
        setTaskValueList(prev=>({...prev,[jsonData.id]:jsonData.title}))
    } catch (err) {
        console.error(err.message)
    }
}


    return(
        <div className='flex justify-center mt-12 px-5'>
            {
            AllTasks.length !== 0 ? 
            <table className='w-[80%] text-center'>
                <thead>
                    <tr className='border-b-2 border-gray-300'>
                        <th className='py-2 ps-[10%] w-[60%] text-2xl text-left'>Title</th>
                        <th className='py-2'></th>  
                        <th className='py-2'></th>
                    </tr>
                </thead>
                <tbody>
                    {AllTasks.map(task=>(
                        <tr key={task.id}
                        className='border-b border-gray-500 py-3'>
                        <td className='py-2 w-80 text-left ps-[10%]'>
                            <textarea
                                className=' w-full focus:outline-none focus:ring rounded-lg focus:ring-blue-700 px-2'
                                value={taskValueList[task.id]}  
                                disabled={task.id !== editingTask}
                                //set the list of tasks to the text in textarea and trim it
                                onChange={e=>{
                                    setTaskValueList(prev=>({
                                    ...prev,
                                    [task.id]: e.target.value
                                    }))
                                }}
                                //when the user goes out of textarea, check if the text area is empty
                                onFocus={(e)=>{
                                    setOldTask(e.target.value)
                                }}
                                onBlur={() => { 
                                    if (!taskValueList[task.id].trim()) {
                                        // If empty then set the title in taskValueList to the original title it was assigned (task.title)
                                        setTaskValueList(prev => ({
                                        ...prev,
                                        [task.id]: oldTask
                                        }));
                                    }
                                    //if the textarea has text in it, proceed to edit the task
                                    editTask(task.id);

                                    setEditingTask(null);
                                    }}

                                readOnly={task.id !== editingTask}
                                onKeyDown={e=>{
                                    if(e.key == "Enter") e.target.blur()
                                }}
                                style={{overflow: 'hidden', resize: 'none',}}
                                placeholder="Edit your task"
                                ref={task.id === editingTask ? taskFieldRef : null}

                                />
                        </td>
                        <td className='py-2'>
                                <button className=''
                                style={{'--button-color':'green'}}
                                onClick={()=>handleEdit(task.id)}
                                >Edit</button>
                        </td>
                        <td className='py-2'>
                            <button className=''
                            style={{'--button-color':'darkred'}}
                            onClick={()=>deleteTask(task.id)}
                            >Delete</button>
                        </td>
                        
                    </tr>
                    ))}
                </tbody>
            </table>
            :
            <h2 className='font-light text-4xl'>Looks Empty! Add a task.</h2>
        }
        </div>
    )
}