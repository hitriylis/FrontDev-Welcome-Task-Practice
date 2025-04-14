import React, { useState, FormEvent } from "react";
import ThemeToggle from "./ThemeToggle";
import "./Todo.scss";

interface Task {
  id: number;
  text: string;
  completed: boolean;
  date: string; // Новое поле для даты
}

const Todo: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]); // Добавлен список задач

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim() === "") return; // Игнорируем пустой ввод

    // Создание новой задачи
    const newTask: Task = {
      id: Date.now(),
      text: inputValue.trim(),
      completed: false,
      date: new Date().toLocaleDateString(), // Добавляем текущую дату
    };

    // Добавление новой задачи в массив
    setTasks((prevTasks) => [...prevTasks, newTask]);

    setInputValue("");
  };

  // Переключение статуса выполнения задачи (чекбокс)
  const toggleTaskCompletion = (id: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Удаление задачи (доступно только для завершённых)
  const deleteTask = (id: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  return (
    <div className='todo-container'>
      <div className='todo-header'>
        <h1>Список задач</h1>
        <ThemeToggle />
      </div>

      <form className='input-section' onSubmit={handleSubmit}>
        <input
          type='text'
          className='task-input'
          placeholder='Введите новую задачу'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type='submit' className='add-button'>
          Добавить
        </button>
      </form>

      <div className='tasks-list'>
        {/* Отображение списка задач */}
        {tasks.map((task) => (
          <div key={task.id} className='task-item'>
            <label className='task-label'>
              {/* Чекбокс для переключения статуса выполнено/не выполнено */}
              <input
                type='checkbox'
                checked={task.completed}
                onChange={() => toggleTaskCompletion(task.id)}
              />
              {/* Текст задачи с зачёркиванием, если выполнена */}
              <span className={task.completed ? "completed" : ""}>
                {task.text}
              </span>
              <span className="task-date">Добавлена: {task.date}</span> {/* Отображаем дату задачи */}
            </label>

            {/* Кнопка удаления, доступна только если задача выполнена */}
            <button
              className='delete-button'
              onClick={() => deleteTask(task.id)}
              disabled={!task.completed} // Заблокирована, если задача не завершена
              title={
                task.completed
                  ? "Удалить задачу"
                  : "Задачу можно удалить только после завершения"
              }
            >
              Удалить
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Todo;
