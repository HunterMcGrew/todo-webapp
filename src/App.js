// basic imports
import React from 'react';
import "./assets/css/style.css"
import useLocalStorage from 'use-local-storage'
import { useState, useEffect } from 'react';

// component imports
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import Todo from "./components/Todo";
import Stats from "./components/Stats";
import Filters from "./components/Filters";

// Database imports
import { getDb, addDb, putDb, deleteDb } from "./database/database";


function App() {

  // All States
  // checks browser default color scheme and used it
  const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [theme, setTheme] = useLocalStorage("theme", defaultDark ? "dark" : "light");
  // also saves which icon should be displayed based on theme used last
  const displayBtn = localStorage.getItem("icon");
  const [icon, setIcon] = useLocalStorage("icon", displayBtn ? "dark_mode" : "light_mode");
  // state for new todo inputs
  // const [todo, setTodo] = useState("");
  // state for database data
  // const [allDb, setAllDb] = useState([]);
  // // state for active
  // const [activeDb, setActiveDb] = useState([]);
  // // state for completed todos
  // const [markedComplete, setMarkedComplete] = useState([]);
  // // active database backup
  // const [allDbBackup, setAllDbBackup] = useState([]);
  // // state for database filtering
  // const [dbFilter, setDbFilter] = useState()
  // // Drag state
  // const [dragId, setDragId] = useState();
  
  // console.log("allDb", allDb);
  // console.log("allDbBackup", allDbBackup);
  // console.log("markedComplete", markedComplete);
  // console.log("dbFilter", dbFilter);

  const [test, setTest] = useState(null);




  // theme switch handler
  const switchTheme = () => {
    // console.log("switch pressed");
    // if theme is light change it to dark, else if it's dark change it to light
    const newTheme = theme === "light" ? "dark" : "light";
    // set the icon state for which icon to display
    const newIcon = icon === "light_mode" ? "dark_mode" : "light_mode";
    setTheme(newTheme);
    setIcon(newIcon);
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
      <TodoInput 
        theme={theme}
        addDb={addDb}
        setTest={setTest}
      />
    {/* end new todo container */}


      <TodoList 
        theme={theme}
        addDb={addDb}
        test={test}
        setTest={setTest}
      />
      {/* saved todo's
      <div className="todoContainer shadow-sm" data-theme={theme}>
        {/* repeat 
  
            {allDb.map((item, i) => {
              // console.log("item in map", item,);
              return (
            <Todo item={item} 
              i={i} 
              theme={theme} 
              handleCompleted={handleCompleted} 
              handleDelete={handleDelete} 
              dbFilter={dbFilter} 
              handleDrag={handleDrag}
              handleDrop={handleDrop}
            />
            )})}
        

          <div className="statsContainer shadow">

            <Stats 
              theme={theme}
              allDb={allDb}
              deleteCompleted={deleteCompleted}
            />

          </div>

      </div>
      {/* end todo container 

      {/* filters 
      <div className="filterContainer shadow">

        <Filters 
          theme={theme} 
          getAll={getAll} 
          getActive={getActive} 
          getCompleted={getCompleted} 
          dbFilter={dbFilter}
        />

      </div> */}
      {/* end filters container */}
        
      <div className="footer d-flex justify-content-center align-items-center" data-theme={theme}>
        <h6 className="m-0 dragTxt" dark-theme={theme}>Drag and drop to reorder list</h6>
      </div>

      </div>

    </div>
    

  );
}

export default App;
