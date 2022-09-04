// basic imports
import React from 'react';
import "./assets/css/style.css"
import Styles from "./assets/css/style.css";
import useLocalStorage from 'use-local-storage'

// component imports
import { TextareaAutosize } from '@mui/material';


function App() {

  // checks browser default color scheme and used it
  const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [theme, setTheme] = useLocalStorage("theme", defaultDark ? "dark" : "light");
  // also saves which icon should be displayed based on theme used last
  const displayBtn = localStorage.getItem("icon");
  const [icon, setIcon] = useLocalStorage("icon", displayBtn ? "dark_mode" : "light_mode");

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




  return (
    
    <div className="myContainer">

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
      <div className="todo todo-new d-flex flex-nowrap ">

        <div className="checkbox">
          <span class="material-symbols-rounded circle">circle</span>
        </div>

        <div className="todo-input d-flex align-content-center justify-content-center">
          <TextareaAutosize className="textInput" 
            defaultValue={"Create a new todo..."}
            style={Styles.textInput}
          />
        </div>

        <div className="todo-delete d-flex align-content-center justify-content-center"><span className="material-symbols-sharp deleteIcon p-0 m-0">close</span></div>

      </div>

      {/* <div className="todo">


      </div> */}

      <br></br><br></br>
      <div className="tempBtn">

        <button onClick={switchTheme}>Switch to {theme=== "light" ? "dark" : "light"} theme</button>

      </div>

      </div>

      </div>

    </div>
    

  );
}

export default App;
