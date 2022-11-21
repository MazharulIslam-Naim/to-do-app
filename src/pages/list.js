import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { SlMagnifier } from 'react-icons/sl';

import Todo from "../components/todo";
import "./list.css";

export default function List() {
  const navigate  = useNavigate();
  const user = localStorage.getItem('RapptrLabsUser') ? JSON.parse(localStorage.getItem('RapptrLabsUser')).email : "" // Email of the current user.
  const [newToDoList, setNewToDoList] = useState([]); // List of new tasks to be added.
  const [todoList, setTodoList] = useState(() => {
      return user ? JSON.parse(localStorage.getItem(user)) : []
    }); // List of current tasks.
  const [searchTerm, setSearchTerm] = useState("") // Text inputed in the search input.

  // If the there is no local storage item called RapptrLabsUser or the user is not logged in then send them back to the loggin page.
  useEffect(() => {
    if (!(localStorage.getItem('RapptrLabsUser') && JSON.parse(localStorage.getItem('RapptrLabsUser')).logged_in)) {
      navigate("/")
    }
  });

  // Search the list of tasks for a match to the input. (Case insensitive)
  function searchToDoList(searchText) {
    const matches = JSON.parse(localStorage.getItem(user)).filter(taskObject => {
      return taskObject.task.toLowerCase().includes(searchText.toLowerCase())
    });
    setTodoList(matches);
  }

  // Add a new task from the list of new tasks into the list of current tasks.
  function addNewTask(newTask, newTaskIndex) {
    setNewToDoList(newToDoList.filter((task, index) => {
      return index !== newTaskIndex
    }));
    if (newTask.trim().length >= 1) {
      const allTasksList = JSON.parse(localStorage.getItem(user));
      let newTaskObject = {
        id: allTasksList.length >= 1 ?
            allTasksList[allTasksList.length - 1].id + 1
          : 0,
        task: newTask
      }
      setTodoList(todoList => [...todoList, newTaskObject])
      localStorage.setItem(
        user,
        JSON.stringify(allTasksList.concat([newTaskObject]))
      )
      searchToDoList(searchTerm)
    };
  }

  // Edit a current task.
  function editTask(editedTask, editTaskId) {
    setTodoList(todoList => todoList.map(taskObject => {
      if (taskObject.id === editTaskId) {
        return {id: editTaskId, task: editedTask}
      }
      return taskObject
    }));
    localStorage.setItem(
      user,
      JSON.stringify(JSON.parse(localStorage.getItem(user)).map(taskObject => {
        if (taskObject.id === editTaskId) {
          return {id: editTaskId, task: editedTask}
        }
        return taskObject
      }))
    );
  }

  // Delete a current task.
  function deleteTask(taskDeleteId) {
    setTodoList(todoList => todoList.filter(taskObject => {
      return taskObject.id !== taskDeleteId
    }));
    localStorage.setItem(
      user,
      JSON.stringify(JSON.parse(localStorage.getItem(user)).filter(taskObject => {
        return taskObject.id !== taskDeleteId
      }))
    )
  }

  return (
    <div className="listPage">
      <div className="header">
        <button
          className="logoutButton"
          onClick={() => {
            navigate("/")
            localStorage.setItem(
              'RapptrLabsUser',
              JSON.stringify({ email: JSON.parse(localStorage.getItem('RapptrLabsUser')).email, logged_in: false })
            )
          }}
        >
          Logout
        </button>
        <h1>My To-Do List</h1>
      </div>

      <div className="list">
        <div className="searchContainer">
          <SlMagnifier className="submitIcon"/>
          <input
            type="text"
            id="search"
            name="search"
            className="searchInput"
            placeholder="Search"
            onChange={event => {
              setSearchTerm(event.target.value);
              searchToDoList(event.target.value);
            }}
          />
          <button
            className="newButton"
            onClick={() => setNewToDoList(newToDoList => [...newToDoList, ""])}
          >
            New
          </button>
        </div>
        {newToDoList.map((newTask, index) => {
          return <Todo key={index} taskIndex={index} task={newTask} new={true} addNewTask={addNewTask} />
        })}

        {todoList.map((taskObject, index) => {
          return <Todo key={taskObject.id} taskIndex={taskObject.id} task={taskObject.task} new={false} editTask={editTask} deleteTask={deleteTask} />
        })}
      </div>
    </div>
  );
}
