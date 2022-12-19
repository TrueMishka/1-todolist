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

    let filteredTasks = tasks;

    if (filter === 'Active') {
        filteredTasks = tasks.filter(t => !t.isDone);
    } else if (filter === 'Completed') {
        filteredTasks = tasks.filter(t => t.isDone);
    }else if (filter === 'FirstThree') {
        filteredTasks = tasks.filter((t, index) => index < 3)
    } else {
        filteredTasks = tasks;
    }

    const removeItemList = (id: string) => {
        setList(tasks.filter(t => t.id !== id));
    }
    const deleteAllTask = () => {
        setList([]);
    }
    const checkItemList = (id: string) => {
        const changedItemList = tasks.map(t=>{
            if (t.id === id) {
                if(t.isDone) {
                    return {...t, isDone: false}
                }else {
                    return {...t, isDone: true}
                }
            }
            return t
        })

        setList(changedItemList)
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
                deleteAllTask = {deleteAllTask}
                addTask = {addTask}
            />
        </div>
    );
}

export default App;