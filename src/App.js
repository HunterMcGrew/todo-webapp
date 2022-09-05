// basic imports
import React from 'react';
import "./assets/css/style.css"
import Styles from "./assets/css/style.css";
import useLocalStorage from 'use-local-storage'
import { useState, useEffect } from 'react';

// component imports
import { TextareaAutosize } from '@mui/material';

// Database imports
import { getDb, putDb, deleteDb } from "./database/database";


function App() {

  // checks browser default color scheme and used it
  const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [theme, setTheme] = useLocalStorage("theme", defaultDark ? "dark" : "light");
  // also saves which icon should be displayed based on theme used last
  const displayBtn = localStorage.getItem("icon");
  const [icon, setIcon] = useLocalStorage("icon", displayBtn ? "dark_mode" : "light_mode");
  // state for new todo inputs
  const [todo, setTodo] = useState("");
  // state for database data
  const [fromDb, setFromDb] = useState([]);
 
  console.log("todo", todo);
  console.log("fromDb", fromDb);

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
    if (e.key === "Enter") {
      putDb(todo);
      getDb().then((data) => {
        setFromDb(data);
        // console.log("data1", data);
        // send data to function or have function getDb data...
        // let dbData = [];
        // fromDb.map((item) => {
        // dbData.push({ ...item, id: item.id, text: item.todo })
        // })
        // console.log("dbData1", dbData);
      })
      setTodo("");
    }
  }
  
  // loads all DB data that is stored on page load to keep it up to date
  useEffect( () => {
    getDb().then((data) => {
      setFromDb(data);
      console.log("data2", data);
    })
    // console.log("dbData2", dbData)
    return;
  }, [])

    
  // console.log("fromDb Inner", fromDb[2].todo, fromDb.id);


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
    <div className="newTodoContainer">
      {/* new todo item */}
      <div className="todo todo-new d-flex flex-nowrap" data-theme={theme}>

        <div className="checkbox d-flex justify-content-center align-items-center">
          <span className="material-symbols-rounded circle">circle</span>
        </div>

        <div className="todo-input d-flex justify-content-center align-items-center">
          <input type="text" className="textInput" placeholder="Create a new todo..." onKeyDown={handleNewInput} onChange={handleChange} value={todo}></input>
        </div>

        <div className="todo-delete d-flex justify-content-center align-items-center">
          <span className="material-symbols-sharp deleteIcon p-0 m-0">close</span>
        </div>

      </div>
      </div>
      {/* end new todo container */}

      {/* saved todo's */}
      <div className="todoContainer">
        {/* repeat */}
        {fromDb.map((item, i) => {
          console.log("item in map", item)
          return (

            <div className="todoInnerContainer">
          <div className="todo todo-new d-flex flex-nowrap" data-theme={theme} key={i}>

          <div className="checkbox d-flex justify-content-center align-items-center">
            <span className="material-symbols-rounded circle">circle</span>
          </div>

          <div className="todo-input d-flex justify-content-center align-items-center">
            <input type="text" className="textInput" placeholder="Create a new todo..." onKeyDown={handleNewInput} onChange={handleChange} value={item.todo}></input>
          </div>

          <div className="todo-delete d-flex justify-content-center align-items-center">
            <span className="material-symbols-sharp deleteIcon p-0 m-0">close</span>
          </div>

          </div>
          <hr className="todoHr"></hr>
          </div>

        )})}

          <div className="statsContainer">
            <div className="stats todo d-flex justify-content-between align-items-center">
              <span className="statsText">{fromDb.length} items left</span>
              <span className="statsText">Clear Completed</span>
            </div>
          </div>

      </div>
      {/* end todo container */}

      {/* filters */}
      <div className="filterContainer">

        <div className="filters d-flex justify-content-center align-items-center">
          <span className="filterText">All</span>
          <span className="filterText">Active</span>
          <span className="filterText">Completed</span>
        </div>

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
