import "./form.scss"

export default function Form({saveTask, handleType, handleTask}) {

    return(
        <>
        <form className="form-div">
            <h1>TO-DO</h1>
            <div className="task">
                <label htmlFor="taskType">Tipo</label>
                <input 
                type="text" 
                id="taskType"
                onChange={(ev)=> handleType(ev)}
                />
                <label htmlFor="taskTitle">Tarefa</label>
                <input 
                type="text" 
                id="taskTitle"
                onChange={(ev)=> handleTask(ev)}
                />
                <button onClick={saveTask}>Salvar</button>
            </div>
        </form>
        </>
    )
}