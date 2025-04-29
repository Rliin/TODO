import { useEffect, useState } from "react";

import Modal from "./AddTaskModal.jsx";
import TaskEntries from "./TaskEntries.jsx";
import Footer from "../Footer.jsx";
import "../styles/header.css";
import data from "../initialData.js";

export default function MainContent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [time, setTime] = useState(new Date());
  const [task, setTask] = useState(data);
    
  function handleSubmit(formData) {
    if (editingTask) {
      setTask((prevTasks) =>
        prevTasks.map((task) =>
          task.id === editingTask.id ? { ...task, ...formData } : task
        )
      );
      setEditingTask(null);
    } else {
      setTask((prevItems) => ({
        ...prevItems,
        new: [...prevItems.new, { ...formData, id: Date.now() }],
      }));
    }
    setIsModalOpen(false);
  }

  function handleDragEndFunction(newTodoData) {
    setTask(newTodoData);
  }

  function handleEdit(taskToEdit) {
    setEditingTask(taskToEdit);
    setIsModalOpen(true);
  }

  function handleDelete(taskToDelete) {
    setTask((prevTasks) =>
      prevTasks.filter((task) => task.id !== taskToDelete.id)
    );
  }

  function handleModalClose() {
    setIsModalOpen(false);
    setEditingTask(null);
  }

  return (
    <>
      <div>
        <div className="up-side">
          <header>
            <div className="hdr-left-section text-sm">
              <h1 className="">Todo App</h1>
            </div>
            <div className="hdr-right-section">
              <h2>{time.toLocaleDateString()}</h2>
              <h2>{time.toLocaleTimeString()}</h2>
            </div>
          </header>

          <div className="entry-panel">
            <input
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search for tasks"
              id="inputSearch"
            />

            <label htmlFor="taskTeamFilter"></label>
            <select
              id="taskTeamFilter"
              name="taskTeamFilter"
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            >
              <option value="All">All</option>
              <option value="🎨 Design">🎨 Design</option>
              <option value="💻 Software">💻 Software</option>
              <option value="🛠️ Test">🛠️ Test</option>
              <option value="📊 Research">📊 Research</option>
            </select>

            <button
              className="btn-addTask"
              onClick={() => {
                setEditingTask(null);
                setIsModalOpen(true);
              }}
            >
              Add Task
            </button>
          </div>
        </div>

        {isModalOpen && (
          <Modal
            onClose={handleModalClose}
            onSubmit={handleSubmit}
            initialData={editingTask}
          />
        )}

        <TaskEntries
          task={task}
          category={category}
          search={search}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          handleDragEndFunction={handleDragEndFunction}
        />
      </div>

      <Footer />
    </>
  );
}
