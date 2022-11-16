import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { SlMagnifier } from 'react-icons/sl';

import Todo from "../components/todo";
import "./list.css";

export default function List() {
  const navigate  = useNavigate();
  const [newToDoList, setNewToDoList] = useState([]); // List of new tasks to be added.
  const [todoList, setTodoList] = useState(() => {
        return localStorage.getItem('toDoList') ? JSON.parse(localStorage.getItem('toDoList')) : []
    }); // List of current tasks.

  // Search the list of tasks for a match to the input. (Case insensitive)
  function searchToDoList(event) {
    const matches = JSON.parse(localStorage.getItem('toDoList')).filter(task => {
      if (task.toLowerCase().includes(event.target.value.toLowerCase())) {
        return true;
      }
    });
    setTodoList(matches);
  }

  // Add a new task from the list of new tasks into the list of current tasks.
  function addNewTask(newTask, newTaskIndex) {
    setNewToDoList(newToDoList.filter((task, index) => {
      return index !== newTaskIndex
    }));
    if (newTask.trim().length >= 1) {
      setTodoList(todoList => [...todoList, newTask])
      if (localStorage.getItem('toDoList')) {
        localStorage.setItem(
          'toDoList',
          JSON.stringify(JSON.parse(localStorage.getItem('toDoList')).concat(newTask))
        )
      } else {
        localStorage.setItem(
          'toDoList',
          JSON.stringify([newTask])
        )
      }
    };
  }

  // Edit a current task.
  function editTask(editedTask, editTaskIndex) {
    setTodoList(todoList => todoList.map((task, index) => {
      if (index === editTaskIndex) {
        return editedTask
      }
      return task
    }))
    localStorage.setItem(
      'toDoList',
      JSON.stringify(JSON.parse(localStorage.getItem('toDoList')).map((task, index) => {
        if (index === editTaskIndex) {
          return editedTask
        }
        return task
      }))
    )
  }

  // Delete a current task.
  function deleteTask(taskDeleteIndex) {
    setTodoList(todoList.filter((task, index) => {
      return index !== taskDeleteIndex
    }));
    localStorage.setItem(
      'toDoList',
      JSON.stringify(JSON.parse(localStorage.getItem('toDoList')).filter((task, index) => {
        return index !== taskDeleteIndex
      }))
    )
  }

  return (
    <div className="listPage">
      <div className="header">
        <button
          className="logoutButton"
          onClick={() => navigate("/")}
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
            onChange={event => searchToDoList(event)}
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

        {todoList.map((task, index) => {
          return <Todo key={index} taskIndex={index} task={task} new={false} editTask={editTask} deleteTask={deleteTask} />
        })}
      </div>
    </div>
  );
}
