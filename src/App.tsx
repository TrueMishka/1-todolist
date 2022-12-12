import React, {useState} from 'react';
import './App.css';
import {ToDoList} from "./ToDoList";

export type FilterType = 'All' | 'Active' | 'Completed';

const App = () => {

    const title = 'What to learn';

    let [tasks, setList] = useState([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false}
    ]);
    let [filter, setFilter] = useState<FilterType>('All');
    /*let filteredTasks = tasks;

    if (filter === 'Active') {
        filteredTasks = tasks.filter(t => !t.isDone);
    }else if (filter === 'Completed') {
        filteredTasks = tasks.filter(t => t.isDone);
    }else {
        filteredTasks = tasks;
    }

    const filterItemList = (value: FilterType) => {
        setFilter(value);
    }*/

    const removeItemList = (id: number) => {
        setList(tasks.filter(t => t.id !== id));
    }

    const checkItemList = (id: number) => {
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

    return (
        <div className="App">
            <ToDoList
                title={title}
                task={tasks}
                removeButton={removeItemList}
                checkItemList={checkItemList}
                filter={filter}
                setFilter={setFilter}
            />
        </div>
    );
}

export default App;
