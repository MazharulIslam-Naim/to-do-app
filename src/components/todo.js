import React, { useState } from 'react';
import { HiPencil } from 'react-icons/hi';
import { BsTrashFill } from 'react-icons/bs';

import "./todo.css";

export default function Todo(props) {
  const [newEditTask, setNewEditTask] = useState(props.task); // Task that is new to be add or a current task to be edited.
  const [edit, setEdit] = useState(props.new ? true : false); // Should the new/edit input appear.

  // Saving an edited task.
  function onClickEdit() {
    setEdit(false);
    if (newEditTask.trim().length >= 1) {
      props.editTask(newEditTask, props.taskIndex);
      return
    }
    props.deleteTask(props.taskIndex)
  }

  return (
    <div>
      {edit ?
        <div className="newEditInputContainer">
          <input
            type="text"
            id="task"
            name="task"
            maxLength="25"
            placeholder="Must be at least 1 character"
            className="newEditInput"
            value={newEditTask}
            onChange={event => setNewEditTask(event.target.value)}
          />
          <button
            className="saveButton"
            onClick={() => {
              props.new ?
                props.addNewTask(newEditTask, props.taskIndex)
              :
                onClickEdit()
            }}
          >
            Save
          </button>
        </div>
      :
        <div className="task">
          <p>{props.task}</p>
          <div className="iconButtonsContainer">
            <button className="iconButtons" onClick={() => setEdit(true)}>
              <HiPencil />
            </button>
            <button className="iconButtons" onClick={() => props.deleteTask(props.taskIndex)}>
              <BsTrashFill />
            </button>
          </div>
        </div>
      }

    </div>
  );
}
