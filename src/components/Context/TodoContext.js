import React, { createContext, useState } from "react";
import { collection, addDoc, getDocs, doc, deleteDoc, query, where, updateDoc } from "firebase/firestore";
import { db, auth } from "../FirebaseConfig/firebaseConfig";




const TodoContext = createContext();


function TodoappState(props) {

  // Firebase Collection
  const todoCollection = collection(db, 'todos')

  const todoInitial = [];

  const [todo, setTodo] = useState(todoInitial);

  // Get all documents of user
  async function getTodos() {
    try {
      const q = query(todoCollection, where("author", "==", auth.currentUser.uid))
      const allTodos = await getDocs(q)
      // console.log(allTodos.docs.map(doc => ({ ...doc.data(), id: doc.id })));
      const todoList = allTodos.docs.map(doc => ({ ...doc.data(), id: doc.id }))
      setTodo(todoList)
    } catch (e) {
      console.error("Error getting documents: ", e);
    }
  }

  // add New document
  async function addTodo(task, img) {
    try {
      const newTodo = await addDoc(todoCollection, {
        author: auth.currentUser.uid,
        email: auth.currentUser.email,
        task: task,
        img: img
      })

      setTodo(todo.concat({
        id: newTodo.id,
        author: auth.currentUser.displayName,
        email: auth.currentUser.email,
        task: task,
        img: img
      }))
    } catch (e) {
      console.error("Error adding document: ", e);
    }

  }


  // Delete document
  async function deleteTodo(id) {

    try {
      await deleteDoc(doc(db, "todos", id));
      const newTodos = todo.filter(elem => {
        return elem.id !== id;
      })
      setTodo(newTodos)
      showAlert("Task Deleted Successfully", "success")
    } catch (e) {
      console.error("Error deleting documents: ", e);
    }

  }

  // Edit/Update document
  async function editTodo(id, task, img) {

    try {
      const editedDoc = doc(todoCollection, id);

      await updateDoc(editedDoc, {
        task: task,
        img: img
      });

      const editedtodo = todo.map(elem => {
        if (elem.id === id) {
          return {
            ...elem,
            task: task,
            img: img
          }
        }
        return elem;
      })
      setTodo(editedtodo)
    } catch (e) {
      console.error("Error updating documents: ", e);
    }


  }

  // Alert Function to show alerts
  const [alert, setAlert] = useState(null);
  function showAlert(message, type) {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  }



  return (
    <TodoContext.Provider value={{ todo, addTodo, deleteTodo, editTodo, alert, showAlert, getTodos }}>
      {props.children}
    </TodoContext.Provider>
  );
}

export default TodoappState;
export { TodoContext }