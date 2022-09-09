

const Todo = (props) => {
    console.log("props in todo", props);

    if (!props.item && props.dbFilter === "completed" ) {
      return;
    } else {
      return (

        <div className="todoInnerContainer">
      <div className="todo todo-new d-flex flex-nowrap" data-theme={props.theme} key={props.i}>

      <div className="checkbox d-flex justify-content-center align-items-center">
        <span className="material-symbols-rounded circle" onClick={() => props.handleCompleted(props.item)} >{props.item.checked}</span>
      </div>

      <div className="todo-input d-flex justify-content-center align-items-center">
        <input type="text" readOnly="readonly" className="textInput mapped-input" data-theme={props.theme} placeholder="Create a new todo..." value={props.item.todo}></input>
      </div>

      <div className="todo-delete d-flex justify-content-center align-items-center">
        <span className="material-symbols-sharp deleteIcon p-0 m-0" onClick={() => props.handleDelete(props.item.id)}>close</span>
      </div>

      </div>
      <hr className="todoHr"></hr>
      </div>

    )

    }

}

export default Todo;