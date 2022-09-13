import React, { useState, useEffect } from "react";

// Database imports
import { getDb, addDb, putDb, deleteDb } from "../database/database";

// Component Imports
import Todo from "./Todo";
import Stats from "./Stats";
import Filters from "./Filters";

const TodoList = props => {

    // console.log("todoList Props", props);
    let theme = props.theme;
    // state for database data
    const [allDb, setAllDb] = useState([]);
    // state for active
    const [activeDb, setActiveDb] = useState([]);
    // state for completed todos
    const [markedComplete, setMarkedComplete] = useState([]);
    // active database backup
    const [allDbBackup, setAllDbBackup] = useState([]);
    // state for database filtering
    const [dbFilter, setDbFilter] = useState(null)
    // Drag state
    const [dragId, setDragId] = useState();

    


    const handleDbStates = async () => {
        try {
        // get db data
        // console.log("starting promise");
        const data = await getDb();
        // console.log("data", data);
        // console.log("is this waiting?");
        // console.log("dbFilter in states", dbFilter);
        // store a backup ** this may not be necessary anymore with code changes being done
        setAllDbBackup(data);
        // set states for active and markedcomplete
        let tempArr = [];
        let tempArr2 = [];
        data.forEach(item => 
            item.isComplete ? tempArr.push(item) : tempArr2.push(item));
        // markedComplete wont set with empty tempArr...
        // and for loops wont pop the last item.
        // this is my work around
        if (tempArr.length === 0) {
            // console.log("it's empty");
            // console.log("markedcomplete", markedComplete);
            markedComplete.forEach(item => markedComplete.pop());
            markedComplete.pop(); 
        } else {
          setMarkedComplete(tempArr);
        }
        // console.log("tempArr2 before set", tempArr2);
        setActiveDb(tempArr2);
        // console.log("activeDb in states", activeDb);
        // this is changing the activeDb state, but in the if statements
        // below when setting allDb to activeDb it isn't the updated data.
        // same thing happens for markedCompleted 

        // console.log("activeDb after set", activeDb);
        // console.log("activeDb, markedComplete", activeDb, markedComplete);
        // console.log("tempArr, tempArr2", tempArr, tempArr2);
        // console.log("activeDb in handle", activeDb);
        // console.log("markedComplete in handle", markedComplete);
        // check to see which filter is being used
    
        if (dbFilter === "active") {
            // console.log("dbFilter in states active", dbFilter);
            // setAllDb(activeDb);
            setAllDb(tempArr2);
            setDbFilter("active");
        } else if (dbFilter === "completed") {
            // console.log("dbFilter in states complete", dbFilter);
            // console.log("marked compelte should be empty", markedComplete);
            setAllDb(tempArr);
            // console.log("allDb after else if completed", allDb);
            setDbFilter("completed");
        } else {
            setAllDb(data);
            setDbFilter("all");
        }
    
        } catch (err) {
        if (err) throw err;
        }
    }
      
      // loads all DB data that is stored on page load to keep it up to date
      useEffect( () => {
        // console.log("useEffect running");

        if (dbFilter === null) {
            setDbFilter("all");
            getDb().then((data) => setAllDb(data));
        }
        if (dbFilter === "active") handleDbStates();
        if (dbFilter === "complete") handleDbStates();

      }, [])

      if (props.test !== null){
        props.setTest(null);
        handleDbStates();
    }
    
      // deletes todo when clickin gthe X and refreshed the state database data is stored in
      const handleDelete = async (id) => {
        let toDelete = id;
        // console.log("toDelete", toDelete);
        let deleted = await deleteDb(id);
        let result = deleted;
        // console.log("result in delete", result);
        handleDbStates();
        // getDb().then((data) => setAllDb(data));
      }
    
      // upon marking a todo complete, update related database info for item and completed state
      const handleCompleted = async (item) => {
        let toUpdate = item;
        // let tempCompletedArr = markedComplete;
        // console.log("item in update", toUpdate);
        if (toUpdate.checked === "circle") {
          toUpdate.checked = "done";
          toUpdate.checked2 = "textInputChecked"
          toUpdate.isComplete = true;
          // pushing whole item instead of item.id
          markedComplete.push(item);
          // markedComplete.push(item.id);
          // console.log("pushed to tempCompletedArr in IF...", tempCompletedArr);
        } else {
          toUpdate.checked = "circle";
          toUpdate.checked2 = "textInput";
          toUpdate.isComplete = false;
          let removeIdx = markedComplete.indexOf(item);
          // removing whole item instead of item.id
          // let removeIdx = markedComplete.indexOf(item.id);
          // console.log("starting to remove from arr...indexOf", removeIdx);
          markedComplete.splice(removeIdx, 1);
          // console.log("removing from array...", markedComplete);
        };
        // console.log("updated item", toUpdate);
        // setMarkedComplete(tempCompletedArr);
        let beUpdated = await putDb(toUpdate, toUpdate.id);
        let result = beUpdated;
        // console.log("result in clear completed", result);
        handleDbStates();
     
      }
    
      const deleteCompleted = async () => {
        if (markedComplete.length === 0) return;
        let deletion = [];
        markedComplete.forEach(item => {
          deletion.push(item.id);
          // console.log("deletion", deletion);
          deleteDb(item.id);
        })
        console.log("deletion", deletion);
        // deletion.forEach(n => {
        //   let tempArr = markedComplete.filter(entry => entry.id !== n);
        //   console.log("deletion loop", markedComplete);
        // })
        // console.log("dbFilter in deleteCompleted appjs", dbFilter);
        handleDbStates();
        // setMarkedComplete([]);
        // getDb().then((data) => setAllDb(data));
      }
    
      // get all from database
      const getAll = () => {
        getDb().then((data) => setAllDb(data));
          setAllDbBackup(allDb);
          setDbFilter("all");
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
    
    
      const getCompleted = () => {
        if (allDbBackup < allDb)
        setAllDbBackup(allDb);
        if (dbFilter === "completed") return;
        // if (allDb > markedComplete) setAllDbBackup(allDb);
        // console.log("get completed running");
        if (dbFilter !== "completed") setDbFilter("completed");
        setAllDb(markedComplete);
      }
    
      // Drag functions
    
      const handleDbSwap = (item, item2) => {
        // console.log("item in swap func", item);
        // console.log("item2 in swap func", item2);
    
        // store item.id in temp var
        let itemId = item.id;
        let item2id = item2.id;
        // change item2.id to random # since they are unique and cant have 2 of the same
        item2.id = item2.id + 50;
        // console.log("50", item2);
        putDb(item2, item2.id).then(item.id = item2id)
        .then(putDb(item, item.id))
        .then(item2.id = itemId)
        .then(putDb(item2, item2.id))
        .then(getDb((data) => setAllDb(data)))
        .then(setAllDbBackup(allDb))
        .then(forceStateUpdate())
        .catch((err) => {
          if (err) throw err;
        })
     
      }
    
      const forceStateUpdate = () => {
        let tempAllDb = allDb.slice();
        // console.log("tempAllDb", tempAllDb);
        setAllDb(tempAllDb);
      }
    
      const handleDrag = e => {
        // get the index of item being dragged
        // console.log("drag", e.currentTarget.getAttribute("idx"));
        let idx = e.currentTarget.getAttribute("idx");
        setDragId(idx)
        // console.log("dragId", dragId);
      }
    
    //   console.log("allDb", allDb);
    
      const handleDrop = e => {
        // swap the item being dragged at it's index with the item it's dropping ontos index
        // console.log("drop");
        // let dragItem = allDb[dragId];
        // console.log("dragItem", dragItem);
        let idx2 = e.currentTarget.getAttribute("idx");
        // console.log("idx2", idx2);
        // let dropItem = allDb[e.currentTarget.getAttribute("idx")];
        // console.log("dropItem", dropItem);
    
        // console.log("swapping");
        // console.log("allDb before", allDb);
        let temp1 = allDb[dragId];
        // console.log("temp", temp1);
        let temp2 = allDb[idx2];
        allDb[dragId] = allDb[idx2];
    
        allDb[idx2] = temp1;
    
        // console.log("allDb after", allDb);
        
        handleDbSwap(temp1, temp2);

    }

    return (
    <div>
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
            handleDrag={handleDrag}
            handleDrop={handleDrop}
          />
          )})}
      

              {/* Turn into component */}
        <div className="statsContainer shadow">

          <Stats 
            theme={theme}
            allDb={allDb}
            deleteCompleted={deleteCompleted}
          />

        </div>

    </div>
    {/* end todo container */}

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

    </div>

    )

}

export default TodoList;