import React, { useContext, useState, useRef, useEffect } from 'react';
import { TodoContext } from './Context/TodoContext';
import { useNavigate } from "react-router-dom";
import Form from './Form';

function TodoList() {

  const navigate = useNavigate();

  // Importing all data and functions from 
  const context = useContext(TodoContext);

  const { todo, deleteTodo, editTodo, showAlert, getTodos } = context

  const ref = useRef(null);
  const refClose = useRef(null);

  const [eTodo, setEtodo] = useState({
    id: "",
    etask: "",
    eimg: "",
  });

  useEffect(() => {
    if (localStorage.getItem('token')) {
      getTodos();
    }
    else {
      navigate('/login')
    }
    // eslint-disable-next-line
  }, []);

  function updateTodo(currentTodo, index) {
    ref.current.click()
    setEtodo({
      id: index,
      etask: currentTodo.task,
      eimg: currentTodo.img
    })
  }

  function handleChange(e) {
    setEtodo({ ...eTodo, [e.target.name]: e.target.value })
  }

  function handleSubmit() {
    editTodo(eTodo.id, eTodo.etask, eTodo.eimg);
    refClose.current.click()
    showAlert("Task Updated Successfully", "success")
  }

  return (
    <>
      <Form />
      {todo.length === 0 && (<div className="showitem">
        <p className='showitemtext'>No task in Todo list</p>
      </div>)}

      {todo.map((elem) => {
        return (
          <div className='showitem' key={elem.id}>
            <img className='showitemimg' src={elem.img.length === 0 ? "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png" : elem.img} alt="react" />
            <div>
              <p className='showitemtext'>{elem.task}</p>
              <i className="fa-solid fa-trash-can fa-lg" onClick={() => deleteTodo(elem.id)}></i>
              <i className="fa-solid fa-pen-to-square fa-lg" onClick={() => updateTodo(elem, elem.id)}></i>
            </div>
          </div>
        )
      }
      )}

      {/* <!-- Button trigger modal --> */}
      <button ref={ref} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" hidden={true}>
        Edit Task
      </button>

      {/* <!-- Modal --> */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Todo</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body" style={{ backgroundColor: "slateblue" }}>
              <div className="add-item my-4">
                <input
                  type="text"
                  placeholder="✍️ Add Items...."
                  name="etask"
                  value={eTodo.etask}
                  onChange={handleChange}
                />

                <input
                  type="text"
                  placeholder="🖼️ Add Image url...."
                  name="eimg"
                  value={eTodo.eimg}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" style={{ backgroundColor: "slateblue" }} onClick={handleSubmit}>Update</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TodoList;






