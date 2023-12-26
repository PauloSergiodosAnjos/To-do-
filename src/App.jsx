import { useState, useEffect } from "react"
import "./app.scss";
import verifyBtn from "./assets/verificar.png"
import editBtn from "./assets/editar (1).png"
import trashBtn from "./assets/lixeira.png"
import Form from "./components/Form/Form";

export default function App() {

  const [tasksByType, setTasksByType] = useState({})
  const [taskType, setTaskType] = useState("")
  const [taskname, setTaskName] = useState("")

  useEffect(()=> {
    fetchTask()
  }, [])

  const handleTask = (ev)=> {
    setTaskType(ev.target.value)
  }

  const handleType = (ev)=> {
    setTaskName(ev.target.value)
  }

  const saveTask = (ev)=> {
    ev.preventDefault()
    console.log({taskname, taskType});
  }

  const fetchTask = async ()=> {
    try {
      const urlTask = "http://localhost:3000/tasks"
      const responseTask = await fetch(urlTask)
      const dataTask = await responseTask.json()

      const urltype = "http://localhost:3000/types"
      const responseType = await fetch(urltype)
      const dataType = await responseType.json()

      const tasksByType = {}

      dataType.forEach((type)=> {
        tasksByType[type.type] = dataTask.filter((task)=> {
          return task.typeId === type.id
        })
      })

      setTasksByType(tasksByType)

    } catch (error) {
      <h2>Houve um erro ao buscar as tasks</h2>
      console.error("Houve um erro ao buscar tasks e types", error);
    }
  }

  return(
    <>
      <div>
        <Form handleTask={handleTask} handleType={handleType} saveTask={saveTask}/>
        {Object.keys(tasksByType).map((type, i)=>{
          return(
            <div key={i} className="card">
              <h2>{type}</h2>
              <hr />
              <ul className="list">
                {tasksByType[type].map((task, j)=>{
                  return(
                        <li key={j}>
                          {task.title}
                            <div className="buttons">
                              <img src={verifyBtn} alt="verificar" />
                              <img src={editBtn} alt="editar" />
                              <img src={trashBtn} alt="apagar" />
                            </div>
                        </li>
                          )
                        })}
              </ul>
            </div>
          )
        })}
      </div>
    </>
  )
}

//a fazer: função CRUD e armazenamento local, depois cuida do front