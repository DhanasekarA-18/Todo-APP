import React, { useState,useRef} from "react";
function TodoApp() {
  const [task, setTask] = useState("");
  const [tasklist, setTasklist] = useState([]);
  const [evalue, setEvale] = useState("");

  const handleChange = (e) => {
    setTask(e.target.value);
  };

  const AddTask = () => {
    if (btnc) {
      const element = tasklist.findIndex((element) => element.value === evalue);
      const newTaskList = [...tasklist];
      newTaskList[element] = {
        ...newTaskList[element],
        value: task,
      };
      setTasklist(newTaskList);
      setBtnc(false);
    } else if (task !== "") {
      const taskDetails = {
        id: Math.floor(Math.random() * 1000),
        value: task,
        isComplete: false,
        isEdited: false,
        date:"",
      };
      setTasklist([...tasklist, taskDetails]);
    }
  };

  const deleteTask = (e, id) => {
    e.preventDefault();
    setTasklist(tasklist.filter((t) => t.id !== id));
  };
  const formsub = (e) => {
    e.preventDefault();
    e.target.reset();
  };

  const taskCompleted = (e, id) => {
    e.preventDefault();
    const element = tasklist.findIndex((element) => element.id === id);
    const newTaskList = [...tasklist];
    newTaskList[element] = {
      ...newTaskList[element],
      isComplete: true,
    };
    setTasklist(newTaskList);
  };

  const [btnc, setBtnc] = useState(false);
  const btnChange = (id) => {
    const editItem = tasklist.find((i) => i.id === id);
    const newTaskList = [...tasklist];
    newTaskList[editItem] = {
      ...newTaskList[editItem],
      isEdited: true,
    };
    setTasklist(newTaskList);
    setBtnc(true);
    setEvale(editItem.value);
    return editItem.value;
  };
  const a=useRef();
  const editTask = (e, id) => {
    e.preventDefault();
    const et = btnChange(id);
    a.current.value = et;
     
  };

  const Reset = (e) => {
    e.preventDefault();
    setTasklist([]);
  };
  return (
    <div className="app">
      <h1 id="head">TODO LIST APP</h1>
      <br />
      <form onSubmit={formsub}>
        <input
          type="text"
          name="text"
          placeholder="Enter the Task"
          onChange={(e) => handleChange(e)}
          autoFocus
          id="inp"
          ref={a}
        />
        <button onClick={AddTask}  id="b3" className={btnc?"btn btn-success":"btn btn-primary"}>
          {btnc ? "UPDATE" : "ADD Task"}
        </button>
        <br />
        <br />
        {tasklist.length === 0 ? (
          <h1 id="red">No Items</h1>
        ) : (
          <h1 id="green">Items In the List</h1>
        )}
        {tasklist !== [] ? (
          <ol>
            {tasklist.map((t) => (
              <li key={t.id} className={t.isComplete ? "cross" : "list"}>
                {t.value}

                {!t.isComplete ? (
                  <button
                    onClick={(e) => deleteTask(e, t.id)}
                    id="b1"
                    class="btn btn-danger"
                  >
                    Delete
                  </button>
                ) : (
                  " "
                )}
                <span class="sp">&nbsp;</span>
                {!t.isComplete ? (
                  <button
                    onClick={(e) => taskCompleted(e, t.id)}
                    id="b2"
                    class="btn btn-success"
                  >
                    Completed
                  </button>
                ) : (
                  " "
                )}

                <span class="sp">&nbsp;</span>
                {!t.isComplete ? (
                  <button
                    onClick={(e) => editTask(e, t.id)}
                    id="b4"
                    class="btn btn-warning"
                  >
                    Edit
                  </button>
                ) : (
                  " "
                )}
                <span class="sp">&nbsp;</span>
              </li>
            ))}
          </ol>
        ) : null}

        <br />
        {tasklist.length !== 0 ? (
          <button onClick={Reset} class="btn btn-danger">
            Reset All Task
          </button>
        ) : (
          " "
        )}
      </form>
    </div>
  );
}

export default TodoApp;
