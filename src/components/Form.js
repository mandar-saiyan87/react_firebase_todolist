import React, { useState, useContext } from 'react';
import { TodoContext } from './Context/TodoContext';
import Logout from './Logout';

function Form() {

  const context = useContext(TodoContext);

  const { addTodo, showAlert } = context;

  const [newTask, setNewtask] = useState(
    {
      task: "",
      img: ""
    }
  )

  function handleChange(e) {
    setNewtask({ ...newTask, [e.target.name]: e.target.value })
  }

  function handleSubmit() {

    if (newTask.task.length === 0) {
      showAlert('Task should not be blank', 'danger')
    }
    else {
      addTodo(newTask.task, newTask.img);
      setNewtask({
        task: "",
        img: ""
      })
      showAlert("Task Added Successfully", "success")
    }


  }

  return (
    <>
      <Logout />
      <div className="notetitle">
        <h1>To-Do List</h1>
      </div>
      <div className="add-item my-4">
        <input
          type="text"
          placeholder="✍️ Add Task...."
          name="task"
          value={newTask.task}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="🖼️ Add Image url...."
          name="img"
          value={newTask.img}
          onChange={handleChange}
        />

        <button type="submit" className='submitbtn' onClick={handleSubmit}>Add To List</button>
      </div>


    </>

  );
}

export default Form;

