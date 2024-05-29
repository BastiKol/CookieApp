export {};
/* 
import React, { useState } from "react";
import CatImage from "./images/20240424_110424.jpg";

interface Task {
  id: number;
  title: string;
  isDone: boolean;
  morningFood: string;
  eveningFood: string;
  morningAmount: number | string;
  eveningAmount: number | string;
}

const App: React.FC = () => {
  const placeholderMorningAmount = "Morgens Menge in Gramm:";
  const placeholderEveningAmount = "Abends Menge in Gramm:";

  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Montag",
      isDone: false,
      morningFood: "",
      eveningFood: "",
      morningAmount: 0,
      eveningAmount: 0,
    },
    {
      id: 2,
      title: "Dienstag",
      isDone: false,
      morningFood: "",
      eveningFood: "",
      morningAmount: 0,
      eveningAmount: 0,
    },
    {
      id: 3,
      title: "Mittwoch",
      isDone: false,
      morningFood: "",
      eveningFood: "",
      morningAmount: 0,
      eveningAmount: 0,
    },
    {
      id: 4,
      title: "Donnerstag",
      isDone: false,
      morningFood: "",
      eveningFood: "",
      morningAmount: 0,
      eveningAmount: 0,
    },
    {
      id: 5,
      title: "Freitag",
      isDone: false,
      morningFood: "",
      eveningFood: "",
      morningAmount: 0,
      eveningAmount: 0,
    },
    {
      id: 6,
      title: "Samstag",
      isDone: false,
      morningFood: "",
      eveningFood: "",
      morningAmount: 0,
      eveningAmount: 0,
    },
    {
      id: 7,
      title: "Sonntag",
      isDone: false,
      morningFood: "",
      eveningFood: "",
      morningAmount: 0,
      eveningAmount: 0,
    },
  ]);

  const [totalMorningFoodAmount, setTotalMorningFoodAmount] =
    useState<number>(0);
  const [totalEveningFoodAmount, setTotalEveningFoodAmount] =
    useState<number>(0);

  const handleTaskUpdate = (
    id: number,
    updateType:
      | "checkbox"
      | "morningInput"
      | "eveningInput"
      | "eveningFood"
      | "morningFood"
      | "save",
    newValue?: any
  ) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          switch (updateType) {
            case "checkbox":
              return { ...task, isDone: !task.isDone };
            case "morningInput":
              return { ...task, morningFood: newValue };
            case "eveningInput":
              return { ...task, eveningFood: newValue };
            case "morningFood":
              if (newValue !== undefined) {
                return { ...task, morningAmount: parseInt(newValue) };
              }
              return task;
            case "eveningFood":
              if (newValue !== undefined) {
                return { ...task, eveningAmount: parseInt(newValue) };
              }
              return task;
            case "save":
              if (!task.isDone) {
                handleTaskUpdate(id, "checkbox");
              }
              return task;
            default:
              return task;
          }
        }
        return task;
      })
    );
  };
  const handleSaveButtonClick = (id: number) => {
    const taskToUpdate = tasks.find((task) => task.id === id);
    if (taskToUpdate && !taskToUpdate.isDone) {
      const updatedTasks = tasks.map((task) =>
        task.id === id ? { ...task, isDone: true } : task
      );
      setTasks(updatedTasks);

      const morningAmount =
        typeof taskToUpdate.morningAmount === "string"
          ? 0
          : taskToUpdate.morningAmount;
      const eveningAmount =
        typeof taskToUpdate.eveningAmount === "string"
          ? 0
          : taskToUpdate.eveningAmount;

      setTotalMorningFoodAmount((prevAmount) => prevAmount + morningAmount);
      setTotalEveningFoodAmount((prevAmount) => prevAmount + eveningAmount);
    }
  };

  const handleDeleteButtonClick = (id: number) => {
    const taskToUpdate = tasks.find((task) => task.id === id);
    if (taskToUpdate) {
      const updatedTasks = tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              isDone: false,
              morningFood: "",
              eveningFood: "",
              morningAmount: 0,
              eveningAmount: 0,
            }
          : task
      );
      setTasks(updatedTasks);

      const morningAmount =
        typeof taskToUpdate.morningAmount === "string"
          ? 0
          : taskToUpdate.morningAmount;
      const eveningAmount =
        typeof taskToUpdate.eveningAmount === "string"
          ? 0
          : taskToUpdate.eveningAmount;

      setTotalMorningFoodAmount((prevAmount) =>
        prevAmount - morningAmount < 0 ? 0 : prevAmount - morningAmount
      );
      setTotalEveningFoodAmount((prevAmount) =>
        prevAmount - eveningAmount < 0 ? 0 : prevAmount - eveningAmount
      );
    }
  };
  return (
    <div
      style={{
        backgroundImage: `url(${CatImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
      }}
    >
      <h1
        className="
          underline-offset-1
          font-extrabold
          pb-8
          text-center
          text-5xl
          hover:text-6xl
          text-white
          "
      >
        Wöchentliches Futter:
      </h1>
      <ul
        className="
          font-extrabold
          text-center
          text-2xl
          text-white"
      >
        {tasks.map((task) => (
          <li
            className="text-center font-extrabold pb-8 hover:text-3xl"
            key={task.id}
          >
            <input
              type="checkbox"
              checked={task.isDone}
              onChange={() => handleTaskUpdate(task.id, "checkbox")}
            />

            <span className={task.isDone ? "text-green-800" : ""}>
              {task.title}
            </span>
            <div className="items-center flex flex-col">
              <input
                className="
                  text-center
                  ml-6
                  w-64
                  border-2
                  border-black
                  hover:border-green-800
                  border-dashed
                  text-sm
                  text-gray-950
                  italic"
                type="text"
                value={task.morningFood}
                placeholder="Morgenfutter eintragen:"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleTaskUpdate(task.id, "morningInput", e.target.value)
                }
              />
              <input
                className="
                  text-center
                  ml-6
                  w-64
                  border-2
                  border-black
                  hover:border-green-800
                  border-dashed
                  text-sm
                  text-gray-950
                  italic"
                type="number"
                value={task.morningAmount === 0 ? "" : task.morningAmount}
                placeholder={
                  task.morningAmount === 0 ? placeholderMorningAmount : ""
                }
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleTaskUpdate(
                    task.id,
                    "morningFood",
                    parseInt(e.target.value)
                  )
                }
              />
            </div>
            <div className="items-center flex flex-col">
              <div className="items-center flex flex-col">
                <input
                  className="
                  text-center
                  ml-6
                  w-64
                  border-2
                  border-black
                  hover:border-green-800
                  border-dashed
                  text-sm
                  text-gray-950
                  italic"
                  type="text"
                  value={task.eveningFood}
                  placeholder="Abendfutter eintragen:"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleTaskUpdate(task.id, "eveningInput", e.target.value)
                  }
                />
                <input
                  className="
                text-center
                  ml-6
                  w-64
                  border-2
                  border-black
                  hover:border-green-800
                  border-dashed
                  text-sm
                  text-gray-950
                  italic"
                  type="number"
                  value={task.eveningAmount === 0 ? "" : task.eveningAmount}
                  placeholder={
                    task.eveningAmount === 0 ? placeholderEveningAmount : ""
                  }
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleTaskUpdate(
                      task.id,
                      "eveningFood",
                      parseInt(e.target.value)
                    )
                  }
                />
              </div>

              <button
                className="
                  mt-1
                  px-2
                  py-1
                  bg-blue-500
                  text-white
                  font-bold
                  rounded
                  hover:bg-blue-700
                  focus:outline-none
                  focus:shadow-outline
                  shadow-xl
                  text-sm
                "
                onClick={() => handleSaveButtonClick(task.id)}
              >
                Speichern
              </button>
              <button
                className="
                      mt-1
                      px-2
                      py-1
                      bg-red-500
                      text-white
                      font-bold
                      rounded
                      hover:bg-red-700
                      focus:outline-none
                      focus:shadow-outline
                      shadow-xl
                      text-sm
                    "
                onClick={() => handleDeleteButtonClick(task.id)}
              >
                Löschen
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="text-center text-2xl font-bold mt-4">
        <div className="bg-white p-4">
          Diese Woche Morgens: {totalMorningFoodAmount} g
        </div>
      </div>
      <div className="text-center text-2xl font-bold mt-2">
        <div
          className="
                      bg-white p-4"
        >
          Diese Woche Abends: {totalEveningFoodAmount} g
        </div>
      </div>
    </div>
  );
};

export default App; */
