import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API = `${import.meta.env.VITE_API_URL}/tasks`;

function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState('');

  const fetchTasks = async () => {
    const res = await axios.get(API);
    const {tasks} =res.data;
    setTasks(tasks);
  };

  const addTask = async () => {
    if (!text) return;
    await axios.post(API, { text });
    setText('');
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="container">
  <h1>📝 To-Do List (DevOps DB)</h1>
  <div>
    <input
      value={text}
      onChange={(e) => setText(e.target.value)}
      placeholder="Enter a new task..."
    />
    <button onClick={addTask}>Add Task</button>
  </div>

  <ul>
    {tasks.map((task) => (
      <li key={task._id}>
        {task.text}
        <button onClick={() => deleteTask(task._id)}>❌</button>
      </li>
    ))}
  </ul>
</div>

  );
}

export default App;
