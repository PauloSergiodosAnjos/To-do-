import { useState, useEffect } from "react"
import "./app.scss";
import verifyBtn from "./assets/verificar.png"
import editBtn from "./assets/editar (1).png"
import trashBtn from "./assets/lixeira.png"

export default function App() {

  const [task, setTask] = useState([])
  const [type, setType] = useState([])

  useEffect(()=> {
    fetchTask()
    fetchType()
  }, [])


  const fetchTask = async ()=> {
    try {
      const url = "http://localhost:3000/tasks"
      const response = await fetch(url)
      const dataTask = await response.json()
      setTask(dataTask)
    } catch (error) {
      <h2>Houve um erro ao buscar as tasks</h2>
    }
  }

  const fetchType = async ()=> {
    try {
      const url = "http://localhost:3000/types"
      const response = await fetch(url)
      const dataType = await response.json()
      setType(dataType)
    } catch (error) {
      <h2>Houve um erro ao buscar os tipos</h2>
    }
  }

  return(
    <>
      <div>
        {type.map((item, i)=>{
          return(
            <div key={i} className="card">
              <h2>{item.type}</h2>
              <hr />
                {task.map((item, i)=>{
                  return(
                      <ul className="list">
                        <li>{item.title}</li>
                        <div className="buttons">
                          <img src={verifyBtn} alt="verificar" />
                          <img src={editBtn} alt="editar" />
                          <img src={trashBtn} alt="apagar" />
                        </div>
                      </ul>
                  )
                })}
            </div>
          )
        })}
      </div>
    </>
  )
}