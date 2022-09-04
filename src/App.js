// basic imports
import React from 'react';
import "./assets/css/style.css"
import Styles from "./assets/css/style.css";
import useLocalStorage from 'use-local-storage'
import { useState } from 'react';

// component imports
import { TextareaAutosize } from '@mui/material';

// Database imports
import { initDb, getDb, putDb, deleteDb } from "./database/database";


function App() {

  // checks browser default color scheme and used it
  const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [theme, setTheme] = useLocalStorage("theme", defaultDark ? "dark" : "light");
  // also saves which icon should be displayed based on theme used last
  const displayBtn = localStorage.getItem("icon");
  const [icon, setIcon] = useLocalStorage("icon", displayBtn ? "dark_mode" : "light_mode");
  // state for new todo inputs
  const [todo, setTodo] = useState("");

 

  console.log("todo", todo);

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

  // 
  const handleChange = e => {
    setTodo(e.target.value)
  };

  const handleNewInput = event => {
    console.log("user pressed: ", event.key);
    if (event.key === "Enter") {
      putDb(todo);
      getDb();
    }
  }

  // database stuff

  getDb().then((data) => console.log("data", data));




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

    <div className="todoContainer">
      {/* new todo item */}
      <div className="todo todo-new d-flex flex-nowrap" data-theme={theme}>

        <div className="checkbox d-flex justify-content-center align-items-center">
          <span className="material-symbols-rounded circle">circle</span>
        </div>

        <div className="todo-input d-flex justify-content-center align-items-center">
          <input type="text" className="textInput" placeholder="Create a new todo..." onKeyDown={handleNewInput} onChange={handleChange} value={todo}></input>
          {/* <TextareaAutosize className="textInput" 
            placeholder={"Create a new todo..."}
            style={Styles.textInput}
          /> */}
        </div>

        <div className="todo-delete d-flex justify-content-center align-items-center">
          <span className="material-symbols-sharp deleteIcon p-0 m-0">close</span>
        </div>

      </div>


      </div>

      </div>

    </div>
    

  );
}

export default App;
