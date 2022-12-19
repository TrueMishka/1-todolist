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
                task={tasks}
                removeButton={removeItemList}
                checkItemList={checkItemList}
                filter={filter}
                setFilter={setFilter}
                deleteAllTask = {deleteAllTask}
                addTask = {addTask}
            />
        </div>
    );
}

export default App;