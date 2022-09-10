// basic imports
import React from 'react';
import "./assets/css/style.css"
import Styles from "./assets/css/style.css";
import useLocalStorage from 'use-local-storage'
import { useState, useEffect } from 'react';

// component imports
import Todo from "./components/Todo";
import Filters from "./components/Filters";

// Database imports
import { getDb, addDb, putDb, deleteDb } from "./database/database";

// needs a conditional to not allow BLANK input from user

function App() {

  // All States
  // checks browser default color scheme and used it
  const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [theme, setTheme] = useLocalStorage("theme", defaultDark ? "dark" : "light");
  // also saves which icon should be displayed based on theme used last
  const displayBtn = localStorage.getItem("icon");
  const [icon, setIcon] = useLocalStorage("icon", displayBtn ? "dark_mode" : "light_mode");
  // state for new todo inputs
  const [todo, setTodo] = useState("");
  // state for database data
  const [allDb, setAllDb] = useState([]);
  // state for completed todos
  const [markedComplete, setMarkedComplete] = useState([]);
  // active database backup
  const [allDbBackup, setAllDbBackup] = useState([]);
  // state for database filtering
  const [dbFilter, setDbFilter] = useState("")
  
  // console.log("allDb", allDb);
  // console.log("allDbBackup", allDbBackup);
  // console.log("markedComplete", markedComplete);
  // console.log("dbFilter", dbFilter);



  // theme switch handler
  const switchTheme = () => {
    console.log("switch pressed");
    // if theme is light change it to dark, else if it's dark change it to light
    const newTheme = theme === "light" ? "dark" : "light";
    // set the icon state for which icon to display
    const newIcon = icon === "light_mode" ? "dark_mode" : "light_mode";
    setTheme(newTheme);
    setIcon(newIcon);
  }

  // sets the state of new todo input and captures it
  const handleChange = e => {
    setTodo(e.target.value)
  };

  // uploads todo to indexDB, reloads all DB data, and stores it in state
  const handleNewInput = e => {
    if (e.key === "Enter" && todo !== "") {
      addDb(todo);
      getDb().then((data) => {
        setAllDb(data);
      })
      setTodo("");
    }
  }
  
  // loads all DB data that is stored on page load to keep it up to date
  useEffect( () => {
    // console.log("useEffect running");
    setDbFilter("all");
    getDb().then((data) => {
      setAllDb(data);
      setAllDbBackup(data);
      setDbFilter("all")
      // console.log("data2", data);
    })
    // console.log("dbData2", dbData)
    return;
  }, [])

  // deletes todo when clickin gthe X and refreshed the state database data is stored in
  const handleDelete = (id) => {
    let toDelete = id;
    // console.log("toDelete", toDelete);
    deleteDb(id);
    getDb().then((data) => setAllDb(data));
  }

  // upon marking a todo complete, update related database info for item and completed state
  const handleCompleted = (item) => {
    let toUpdate = item;
    // let tempCompletedArr = markedComplete;
    // console.log("tempCompletedArr before push", tempCompletedArr);
    // console.log("item in update", toUpdate);
    if (toUpdate.checked === "circle") {
      toUpdate.checked = "check_circle";
      toUpdate.isComplete = true;
      // pushing whole item instead of item.id
      markedComplete.push(item);
      // markedComplete.push(item.id);
      // console.log("pushed to tempCompletedArr in IF...", tempCompletedArr);
    } else {
      toUpdate.checked = "circle";
      toUpdate.isComplete = false;
      let removeIdx = markedComplete.indexOf(item);
      // removing whole item instead of item.id
      // let removeIdx = markedComplete.indexOf(item.id);
      // console.log("starting to remove from arr...indexOf", removeIdx);
      markedComplete.splice(removeIdx, 1);
      // console.log("removing from array...", tempCompletedArr);
    };
    // console.log("updated item", toUpdate);
    // setMarkedComplete(tempCompletedArr);
    putDb(toUpdate, toUpdate.id);
    getDb().then((data) => {
      setAllDb(data);
      setAllDbBackup(data);
      // console.log("data2", data);
    })
 
  }

  const deleteCompleted = () => {
    if (markedComplete.length === 0) return;
    let deletion = [];
    markedComplete.forEach(item => {
      deletion.push(item.id);
      // console.log("deletion", deletion);
      deleteDb(item.id);
    })
    deletion.forEach(n => {
      let tempArr = markedComplete.filter(entry => entry.id !== n);
      // console.log("tempArr in", tempArr);
    })
    setMarkedComplete([]);
    getDb().then((data) => setAllDb(data));
  }

  // get all from database
  const getAll = () => {
    getDb().then((data) => {
      setAllDb(data)
      setAllDbBackup(allDb);
      setDbFilter("all");
    })
  }

  // get active (non complete) database 
  const getActive = () => {
    setAllDbBackup(allDb);
    // console.log("get active running");
    let tempArr = [];
    if (dbFilter === "active") return;
    if (dbFilter === "completed") {
      allDbBackup.forEach(item => {
        // console.log("in loop", item);
        if (item.isComplete === false) tempArr.push(item);
      })
      setDbFilter("active");
      setAllDb(tempArr);
      return;
    } else {
      allDb.forEach(item => {
        // console.log("in loop", item);
        if (item.isComplete === false) tempArr.push(item);
      })
      setDbFilter("active");
      // console.log("tempArr", tempArr);
      setAllDb(tempArr);
    }
  }

  // getAll isn't completing before for loop iterates. 


  const getCompleted = () => {
    if (allDbBackup < allDb)
    setAllDbBackup(allDb);
    if (dbFilter === "completed") return;
    if (allDb > markedComplete) setAllDbBackup(allDb);
    // console.log("get completed running");
    setDbFilter("completed");
    setAllDb(markedComplete);
  }
  
  

  return (
    
    <div className="myContainer" data-theme={theme}>

      <div className="hero" data-theme={theme}>
        {/* background-image */}
      </div>

    <div className="innerContainer">
      <div className="heading d-flex justify-content-between align-items-center">
        <h2>T O D O</h2>
        <span onClick={switchTheme} className="material-symbols-sharp modeIcon">{icon}</span>
      </div>

    {/* new todo container */}
    <div className="newTodoContainer shadow" data-theme={theme}>
      {/* new todo item */}
      <div className="todo todo-new d-flex flex-nowrap" data-theme={theme}>

        <div className="checkbox d-flex justify-content-center align-items-center">
          <span className="material-symbols-rounded circle">circle</span>
        </div>

        <div className="todo-input d-flex justify-content-center align-items-center">
          <input type="text" className="textInput" placeholder="Create a new todo..." data-theme={theme} onKeyDown={handleNewInput} onChange={handleChange} value={todo}></input>
        </div>

        {/* <div className="todo-delete d-flex justify-content-center align-items-center">
          <span className="material-symbols-sharp deleteIcon p-0 m-0">close</span>
        </div> */}

      </div>
      </div>
      {/* end new todo container */}

      {/* saved todo's */}
      <div className="todoContainer shadow-sm" data-theme={theme}>
        {/* repeat */}
  
            {allDb.map((item, i) => {
              // console.log("item in map", item,);
              return (
            <Todo item={item} 
              i={i} 
              theme={theme} 
              handleCompleted={handleCompleted} 
              handleDelete={handleDelete} 
              dbFilter={dbFilter} 
            />
            )})}
        

                {/* Turn into component */}
          <div className="statsContainer shadow">
            <div className="stats todo d-flex justify-content-between align-items-center"  data-theme={theme}>
              <span className="statsText"  data-theme={theme}>{allDb.length} items left</span>
              <span className="statsText" onClick={deleteCompleted}  data-theme={theme}>Clear Completed</span>
            </div>
          </div>

      </div>
      {/* end todo container */}

                {/* Turn into component */}
      {/* filters */}
      <div className="filterContainer shadow">

        <Filters 
          theme={theme} 
          getAll={getAll} 
          getActive={getActive} 
          getCompleted={getCompleted} 
          dbFilter={dbFilter}
        />

      </div>
      {/* end filters container */}
        
      <div className="footer d-flex justify-content-center align-items-center" data-theme={theme}>
        <h3 className="m-0">Drag and drop to reorder list</h3>
      </div>

      </div>

    </div>
    

  );
}

export default App;
