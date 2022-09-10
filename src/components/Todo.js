import { useEffect, useRef } from "react";

const Todo = (props) => {
    // console.log("props in todo", props);

    const checked = useRef(null);
    const inputChecked = useRef(null);

    const completedFunc = () => {
      props.handleCompleted(props.item);
      let spanClassArr = checked.current.classList;
      let inputCheckedArr = inputChecked.current.classList;
      if (spanClassArr[1] === "circle") {
        spanClassArr.remove("circle");
        spanClassArr.add("checked");
        inputCheckedArr.remove("textInput");
        inputCheckedArr.add("textInputChecked");
      } else {
        spanClassArr.remove("checked");
        spanClassArr.add("circle");
        inputCheckedArr.remove("textInputChecked");
        inputCheckedArr.add("textInput");
      }

    }


      return (

        <div className="todoInnerContainer">
      <div className="todo todo-new d-flex flex-nowrap" data-theme={props.theme} key={props.i}>

      <div className="checkbox d-flex justify-content-center align-items-center">
        <span className={`material-symbols-rounded ${props.item.checked}`} ref={checked} data-theme={props.theme} onClick={completedFunc} >{props.item.checked}</span>
      </div>

      <div className="todo-input d-flex justify-content-center align-items-center">
        <input type="text" readOnly="readonly" ref={inputChecked} className="mapped-input textInput" data-theme={props.theme} placeholder="Create a new todo..." value={props.item.todo}></input>
      </div>

      <div className="todo-delete d-flex justify-content-center align-items-center">
        <span className="material-symbols-sharp deleteIcon p-0 m-0" data-theme={props.theme} onClick={() => props.handleDelete(props.item.id)}>close</span>
      </div>

      </div>
      <hr className="todoHr"></hr>
      </div>

    )

}

export default Todo;