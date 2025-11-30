/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import AddTodo from "./modals/AddTodo";
import EditTodo from "./modals/EditTodo";
import DeleteTodo from "./modals/DeleteTodo";

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

export default function TodoApp() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filterStatus, setFilterStatus] = useState("all");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const [addTitle, setAddTitle] = useState("");
  const [addDescription, setAddDescription] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/todos");
      const data = await res.json();

      const mapped: Task[] = data.slice(0, 50).map((item: any) => ({
        id: item.id,
        title: item.title,
        description: "Task from API",
        completed: item.completed,
      }));

      setTasks(mapped);
    };

    fetchTasks();
  }, []);

  const filteredTasks = tasks.filter((t) => {
    if (filterStatus === "completed") return t.completed;
    if (filterStatus === "incomplete") return !t.completed;
    return true;
  });

  const totalPages = Math.ceil(filteredTasks.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = filteredTasks.slice(indexOfFirst, indexOfLast);

  const handleAddTask = () => {
    const newTask: Task = {
      id: Math.floor(Math.random() * 999999),
      title: addTitle,
      description: addDescription,
      completed: false,
    };

    setTasks((prev) => [newTask, ...prev]);

    setAddTitle("");
    setAddDescription("");
    setIsAddOpen(false);
    setCurrentPage(1);
  };

  const handleEditTask = () => {
    if (!selectedTask) return;

    const updated = tasks.map((t) =>
      t.id === selectedTask.id
        ? { ...t, title: editTitle, description: editDescription }
        : t
    );

    setTasks(updated);
    setIsEditOpen(false);
  };

  const handleDeleteTask = () => {
    if (!selectedTask) return;

    const updated = tasks.filter((t) => t.id !== selectedTask.id);

    setTasks(updated);
    setSelectedTask(null);
    setIsDeleteOpen(false);
  };

  return (
    <div className="todo-container">
      <h1 className="todo-title">Todo List</h1>

      <div className="flex justify-between gap-6">
        <select
          className="border p-2 rounded text-sm"
          value={filterStatus}
          onChange={(e) => {
            setFilterStatus(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="all">All Tasks</option>
          <option value="completed">Completed</option>
          <option value="incomplete">Incomplete</option>
        </select>

        <button
          className="btn-primary flex-none!"
          onClick={() => setIsAddOpen(true)}
        >
          + Add Task
        </button>
      </div>

      <div className="mt-3"></div>

      <table className="todo-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>

        <tbody>
          {currentItems.map((task) => (
            <tr key={task.id}>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{task.completed ? "Completed" : "Incomplete"}</td>
              <td>
                <div className="actions">
                  <button
                    className="btn-edit"
                    onClick={() => {
                      setSelectedTask(task);
                      setEditTitle(task.title);
                      setEditDescription(task.description);
                      setIsEditOpen(true);
                    }}
                  >
                    Edit
                  </button>

                  <button
                    className="btn-danger"
                    onClick={() => {
                      setSelectedTask(task);
                      setIsDeleteOpen(true);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination flex gap-2 mt-4">
        <button
          className="px-3 py-1 border rounded disabled:opacity-50"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            className={`px-3 py-1 border rounded ${
              currentPage === page ? "active" : ""
            }`}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        ))}

        <button
          className="px-3 py-1 border rounded disabled:opacity-50"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
        >
          Next
        </button>
      </div>

      <AddTodo
        id="add-modal"
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        title={addTitle}
        description={addDescription}
        onTitle={(e) => setAddTitle(e.target.value)}
        onDescription={(e) => setAddDescription(e.target.value)}
        onSubmit={handleAddTask}
      />

      <EditTodo
        id="edit-modal"
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        title={editTitle}
        description={editDescription}
        onTitle={(e) => setEditTitle(e.target.value)}
        onDescription={(e) => setEditDescription(e.target.value)}
        onSubmit={handleEditTask}
      />

      <DeleteTodo
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onDelete={handleDeleteTask}
      />
    </div>
  );
}
