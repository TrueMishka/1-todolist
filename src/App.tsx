import React, {useState} from 'react';
import './App.css';
import {ToDoList} from "./ToDoList";
import {v1} from "uuid";

export type FilterType = 'All' | 'Active' | 'Completed' | 'FirstThree';

const App = () => {

    const title = 'What to learn';

    let [tasks, setList] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "qwd", isDone: false},
        {id: v1(), title: "asd", isDone: true},
        {id: v1(), title: "gdf", isDone: false},
        {id: v1(), title: "asd", isDone: true},
        {id: v1(), title: "xvd", isDone: false},
    ]);
    let [filter, setFilter] = useState<FilterType>('All');

    const filteredTasksInit = () => {

        switch (filter) {
            case "Completed":
                return tasks.filter(t => t.isDone);
            case "Active":
                return tasks.filter(t => !t.isDone);
            case "FirstThree":
                return tasks.filter((t, index) => index < 3);
            default:
                return tasks;
        }
    }
    let filteredTasks = filteredTasksInit();

    const removeItemList = (id: string) => {
        setList(tasks.filter(t => t.id !== id));
    }
    const deleteAllTask = () => {
        setList([]);
    }
    const checkItemList = (id: string, checked: boolean) => {
        setList(tasks.map(t => t.id === id ? {...t, isDone: checked} : t));
    }
    const addTask = (taskTitle: string) => {
        const newTask = {id: v1(), title: taskTitle, isDone: false};
        const newTasks = [newTask, ...tasks];
        setList(newTasks);
    }

    return (
        <div className="App">
            <ToDoList
                title={title}
                task={filteredTasks}
                removeButton={removeItemList}
                checkItemList={checkItemList}
                setFilter={setFilter}
                deleteAllTask={deleteAllTask}
                addTask={addTask}
                filter={filter}
            />
        </div>
    );
}

export default App;