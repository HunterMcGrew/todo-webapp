import React, { useState } from "react";


const TodoInput = (props) => {
// console.log("props in todoInput", props);
    // state for new todo inputs
    const [todo, setTodo] = useState("");

    // sets the state of new todo input and captures it
    const handleChange = e => {
        setTodo(e.target.value)
    };

  // uploads todo to indexDB, reloads all DB data, and stores it in state
  const handleNewInput = e => {
    if (e.key === "Enter" && todo !== "") {
      props.addDb(todo);
    //   getDb().then((data) => {
    //     setAllDb(data);
    //     setAllDbBackup(data);
    //   })
      setTodo("");
      props.setTest("update");
    //   should this getDb??? Where else would be better to put it?
    }
  }

    return (

        <div className="newTodoContainer shadow" data-theme={props.theme}>
      {/* new todo item */}
      <div className="todo todo-new d-flex flex-nowrap" data-theme={props.theme}>

        <div className="todo-input todo-input-new d-flex justify-content-center align-items-center">
          <input type="text" className="textInput" placeholder="Add new todo..." data-theme={props.theme} onKeyDown={handleNewInput} onChange={handleChange} value={todo}></input>
        </div>

      </div>
      </div>

    )
}

export default TodoInput;