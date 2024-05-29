import React, { useState } from "react";

interface Task {
  id: number;
  title: string;
  isDone: boolean;
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "Montag", isDone: false },
    { id: 2, title: "Dienstag", isDone: false },
    { id: 3, title: "Mittwoch", isDone: false },
    { id: 4, title: "Donnerstag", isDone: false },
    { id: 5, title: "Freitag", isDone: false },
    { id: 6, title: "Samstag", isDone: false },
    { id: 7, title: "Sonntag", isDone: false },
  ]);

  const [newTaskTitle, setNewTaskTitle] = useState<string>("");

  const handleCheckboxClick = (id: number) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return { ...task, isDone: !task.isDone };
        }
        return task;
      })
    );
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(event.target.value);
  };

  const handleAddTask = () => {
    setTasks([
      ...tasks,
      { id: tasks.length + 1, title: newTaskTitle, isDone: false },
    ]);
    setNewTaskTitle("");
  };

  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div>
      <h1>Wöchentliches Futter:</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.isDone}
              onClick={() => handleCheckboxClick(task.id)}
            />
            <span
              style={{ textDecoration: task.isDone ? "line-through" : "none" }}
            >
              {task.title}
            </span>
            <button onClick={() => handleDeleteTask(task.id)}>Löschen</button>
          </li>
        ))}
      </ul>
      <div>
        <input type="text" value={newTaskTitle} onChange={handleInputChange} />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
    </div>
  );
};
/* function ListGroup() {
  const items = [
    "Montag",
    "Dienstag",
    "Mittwoch",
    "Donnerstag",
    "Freitag",
    "Samstag",
    "Sonntag",
  ];

  return (
    <>
      <h1 className="text-center text-3xl hover:text-4xl ">
        Wöchentliches Futter:
      </h1>
      <ul className="text-center list-decimal text-xl text-orange-600">
        {items.map((item, index) => (
          <li
            key={index}
            className="hover:text-blue-500 hover:text-2xl hover:italic"
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
 */
