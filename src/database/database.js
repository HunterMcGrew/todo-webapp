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
export const putDb = async (todo) => {

    try {
    const todoDb = await openDB("todoHLM", 1);
    const tx = todoDb.transaction("todoHLM", "readwrite");
    const store = tx.objectStore("todoHLM");
    const request = store.put({ "todo": todo });
    const result = await request;

    console.log("putDB must be working...");

    return result;
    } catch (err) {
        if (err) throw err;
    }
};

// delete from database
export const deleteDb = async (event) => {

    const todoDb = await openDB("todoHLM", 1);
    const tx = todoDb.transaction("todoHLM", "readwrite");
    const store = tx.objectStore("todoHLM");
    const reqeust = store.delete({ "todo": "todo" });
    const result = await reqeust;

    console.log("deleteDB must be working...");

    return result;
};

initDb();