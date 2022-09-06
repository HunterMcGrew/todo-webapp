import { openDB } from "idb";

const initDb = async () => {
    const db = await openDB("todoHLM", 1, {
        upgrade(db) {
            if (db.objectStoreNames.contains("todoHLM")) {
                console.log("todoHLM database already exists");
                return;
            }
            const store = db.createObjectStore("todoHLM", { keyPath: "id", autoIncrement: true });
            store.createIndex("todo", "todo");
            console.log("todoHLM database created");
        }
    });
    
};

// get all from todoHLM Database
export const getDb = async () => {

    const todoDb = await openDB("todoHLM", 1);
    const tx = todoDb.transaction("todoHLM", "readwrite");
    const store = tx.objectStore("todoHLM");
    const request = store.getAll();
    const result = await request;

    console.log("getDb route working!");

    return result;
};

// add new or updated existing item in database
export const addDb = async (todo) => {

    const todoDb = await openDB("todoHLM", 1);
    const tx = todoDb.transaction("todoHLM", "readwrite");
    const store = tx.objectStore("todoHLM");
    const request = store.put({ "todo": todo, "isComplete": false, "checked": "circle" });
    const result = await request;

    console.log("putDB must be working...");

    return result;

};

// updates item in Database (ex: if it's completed or not)
export const putDb = async (todo, id) => {

    const todoDb = await openDB("todoHLM", 1);
    const tx = todoDb.transaction("todoHLM", "readwrite");
    const store = tx.objectStore("todoHLM");
    const update = await store.get(id);
    console.log("update", update);
    store.onsucess = () => {
        const data = update.result;
        console.log("data", data);
    }
    const request = store.put(todo);
    const result = await request;

    console.log("putDB must be working...");

    return result;

};

// delete single entry from database
export const deleteDb = async (id) => {
    console.log("todo in delete", id);
    const todoDb = await openDB("todoHLM", 1);
    const tx = todoDb.transaction("todoHLM", "readwrite");
    const store = tx.objectStore("todoHLM");
    // const reqeust = store.delete({ "todo": todo });
    const request = store.delete(id);
    const result = await request;

    console.log("deleteDB must be working...");

    return result;
};

// get single entry from DB by ID
export const getSingle = async (id) => {
    const todoDb = await openDB("todoHLM", 1);
    const tx = todoDb.transaction("todoHLM", "readwrite");
    const store = tx.objectStore("todoHLM");
    const request = store.get(id);
    const result = await request;

    console.log("getComplted...");
    console.log("results...", result)
    
    return result;
}

initDb();