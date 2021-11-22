import Header from "./components/Header";
import { useState, useEffect } from "react";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from "./components/About";
import Home from "./components/Home";

function App() {

    const [tasks, setTasks] = useState([]);
    const [showAddTaskForm, setAddTaskForm] = useState(false);

    useEffect(() => {
        const getTasks = async () => {
            const tasksFromServer = await fetchTasks();
            setTasks(tasksFromServer);
        }

        getTasks();
    }, []);

    const fetchTasks = async () => {
        const res = await fetch('http://localhost:5000/tasks');
        const tasksFromServer = await res.json();
        return tasksFromServer;
    }

    const fetchTask = async (id) => {
        const res = await fetch(`http://localhost:5000/tasks/${id}`);
        const taskFromServer = await res.json();
        return taskFromServer;
    }

    const onAddClick = () => {
        setAddTaskForm(!showAddTaskForm);
    };

    const addTask = async (task) => {
        const res = await fetch('http://localhost:5000/tasks', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(task)
        });

        const data = await res.json();
        setTasks([...tasks, data]);
    };

    const deleteTask = async (id) => {
        await fetch(`http://localhost:5000/tasks/${id}`, {
            method: 'DELETE'
        });

        setTasks(tasks.filter((task) => task.id !== id));
    };

    const toggleReminder = async (id) => {
        const taskToToggle = await fetchTask(id);
        const updatedTaks = { ...taskToToggle, reminder: !taskToToggle.reminder };

        const res = await fetch(`http://localhost:5000/tasks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(updatedTaks)
        });

        const data = await res.json();
        setTasks(tasks.map((task) => task.id === id ? { ...task, reminder: data.reminder } : task));
    }

    return (
        <div className="container">
            <Router>
                <Header onAddClick={onAddClick} showAddTaskForm={showAddTaskForm} />
                <Routes>
                    <Route path='/' exact element={
                        <Home
                            showAddTaskForm={showAddTaskForm}
                            tasks={tasks}
                            addTaks={addTask}
                            deleteTask={deleteTask}
                            toggleReminder={toggleReminder} />
                    } />
                    <Route path='/About' element={<About />} />
                </Routes>
                <Footer />
            </Router>
        </div>
    );
}

export default App;
