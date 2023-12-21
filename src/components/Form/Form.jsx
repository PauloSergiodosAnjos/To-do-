import "./form.scss"

export default function Form() {
    return(
        <>
        <form className="form-div">
            <h1>TO-DO</h1>
            <div className="task">
                <input type="text" id="taskTitle"/>
                <button>Salvar</button>
            </div>
        </form>
        </>
    )
}