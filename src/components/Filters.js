import { useRef } from "react";

const Filters = props => {

    // console.log("filters props", props);

    const all = useRef(null);
    const active = useRef(null);
    const completed = useRef(null);

    const allFunc = () => {
        if (props.dbFilter === "completed") {
            let classArr = completed.current.classList;
            classArr.remove("activeFilter")
        }
        if (props.dbFilter === "active") {
            let classArr = active.current.classList;
            classArr.remove("activeFilter")
        }
        props.getAll();
        let classArr = all.current.classList;
        classArr.add("activeFilter");
        // if (classArr > 1) {
        //     return;
        // } else {
        //     classArr.add("activeFilter");
        // }
    }

    const activeFunc = () => {
        if (props.dbFilter === "completed") {
            let classArr = completed.current.classList;
            classArr.remove("activeFilter")
        }
        if (props.dbFilter === "all") {
            let classArr = all.current.classList;
            classArr.remove("activeFilter")
        }
        props.getActive();
        let classArr = active.current.classList;
        if(classArr > 1) {
            return;
        } else {
            classArr.add("activeFilter");
        }
    }

    const completedFunc = () => {
        if (props.dbFilter === "all") {
            let classArr = all.current.classList;
            classArr.remove("activeFilter")
        }
        if (props.dbFilter === "active") {
            let classArr = active.current.classList;
            classArr.remove("activeFilter")
        }
        props.getCompleted();
        let classArr = completed.current.classList;
        if (classArr > 1) {
            return;
        } else {
            classArr.add("activeFilter");
        }
    }

    return (

        <div className="filters d-flex justify-content-center align-items-center">
          <span className="filterText activeFilter" ref={all} data-theme={props.theme} onClick={allFunc}>All</span>
          <span className="filterText" ref={active} data-theme={props.theme} onClick={activeFunc}>Active</span>
          <span className="filterText" ref={completed} data-theme={props.theme} onClick={completedFunc}>Completed</span>
        </div>

    )
}

export default Filters;
