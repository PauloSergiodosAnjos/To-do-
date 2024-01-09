import { useState, useEffect } from "react"
import "./app.scss";
import verifyBtn from "./assets/verificar.png"
import editBtn from "./assets/editar (1).png"
import trashBtn from "./assets/lixeira.png"
import Form from "./components/Form/Form";

export default function App() {

  const [tasksByType, setTasksByType] = useState({})
  const [taskData, setTaskData] = useState([])
  const [typeData, setTypeData] = useState([])
  const [taskType, setTaskType] = useState("")
  const [taskName, setTaskName] = useState("")

  useEffect(()=> {
    fetchTask()
  }, [taskData, typeData])

  const handleTask = (ev)=> {
    setTaskName(ev.target.value)
  }

  const handleType = (ev)=> {
    setTaskType(ev.target.value)
  }

  const saveTask = async (ev)=> {
    ev.preventDefault()
    const existingType = typeData.find((type) => type.type === taskType);
      if (existingType) {
        const infoTask = {
          title: taskName, typeId: existingType.id
        }
        try {
          const responseTask = await fetch("http://localhost:3000/tasks", {
            method: "POST",
            headers: {
              "content-type": "application/json"
            },
            body: JSON.stringify(infoTask)
          })

          const savedTask = await responseTask.json()
          setTaskData([...taskData, savedTask])
        } catch (error) {
          console.log("Houve um erro ao salvar a task em um tipo ja existente");
        }
      }
      if (!existingType) {
        const infoType = {type: taskType}

        try {
          const responseType = await fetch("http://localhost:3000/types", {
          method: "POST",
          headers: {
              "content-type": "application/json"
          },
          body: JSON.stringify(infoType)
        })

        const savedType = await responseType.json()

          setTypeData([...typeData, savedType])

          const infoTask = {
            title: taskName, typeId: savedType.id
          }

          try {
            const responseTask = await fetch("http://localhost:3000/tasks", {
            method: "POST",
            headers: {
              "content-type": "application/json"
            },
            body: JSON.stringify(infoTask)
          })
          const savedTask = await responseTask.json()

          const isTaskExist = taskData.some((task)=> task.title === infoTask.title) 
          if (!isTaskExist) {
            setTaskData([...taskData, savedTask])
          } else {
            alert("Tarefa ja criada")
          }

          } catch (error) {
            console.log("Ocorreu um erro ao salvar a task a um tipo recem criado");
          }

        } catch (error) {
          console.log("Ocorreu um erro ao salvar a task a um tipo novo");
        }
    }
}

  const fetchTask = async ()=> {
    try {
      const urlTask = "http://localhost:3000/tasks"
      const responseTask = await fetch(urlTask)
      const dataTask = await responseTask.json()
      //verificacao se o valor do dataTask for diferente do taskData, ele chama a funcao setTaskData e armazena a dataTask na variavel, caso for igual, nao faz nada, evitando chamadas desnecessarias, pois o react considera uma mudanca de estado chamar a funcao setTaskData ou setTypeData, assim acionando o useEffect infinitamente e nao quando ha de fato uma mudanca 
      if (JSON.stringify(dataTask) !== JSON.stringify(taskData)) {
        setTaskData(dataTask)
      }

      const urltype = "http://localhost:3000/types"
      const responseType = await fetch(urltype)
      const dataType = await responseType.json()
      if (JSON.stringify(dataType) !== JSON.stringify(typeData)) {
        setTypeData(dataType)
      }

      const tasksByType = {}

      //funcao para criar uma chave no meu objeto {tasksByType} com o nome do tipo que esta sendo iterado no momento, e a chave vai ter o valor do resultado do filter do dataTask. Caso a condicao de o task.typeId === type.id seja true, ira retornar o objeto que esta sendo iterado no momento atual, virando o valor da chave. Caso retorne false, segue para a outra task
      typeData.forEach((type)=> {
        tasksByType[type.type] = taskData.filter((task)=> {
          return task.typeId === type.id
        })
        //fazer logica para criar novas tarefas com type.id pra cada uma e os typeId das tasks baterem
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
        {/*Object.keys() retorna um array com os nomes das propriedades do objeto*/}
        {Object.keys(tasksByType).map((type, i)=>{
          return(
            <div key={i} className="card">
              <h2>{type}</h2>
              <hr />
              <ul className="list">
                {/* acessa o array de tasks das propriedades do objeto*/}
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