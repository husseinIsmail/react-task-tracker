
import AddTask from './AddTask';
import Tasks from './Tasks';

const Home = ({showAddTaskForm, tasks, addTask, deleteTask, toggleReminder}) => {
    return (
        <>
            {showAddTaskForm && <AddTask onAdd={addTask} />}
            { tasks.length > 0 ? (
                <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
            ) : (
                'No Tasks to Show'
            )}
        </>
    )
}

export default Home;