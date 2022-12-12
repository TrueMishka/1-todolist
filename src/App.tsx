import React, {useState} from 'react';
import './App.css';
import {ToDoList} from "./ToDoList";

export type FilterType = 'All' | 'Active' | 'Completed' | 'FirstThree';

const App = () => {

    const title = 'What to learn';

    let [tasks, setList] = useState([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false},
        {id: 4, title: "qwd", isDone: false},
        {id: 5, title: "asd", isDone: true},
        {id: 6, title: "gdf", isDone: false},
        {id: 7, title: "asd", isDone: true},
        {id: 8, title: "xvd", isDone: false},
    ]);
    let [filter, setFilter] = useState<FilterType>('All');

    const removeItemList = (id: number) => {
        setList(tasks.filter(t => t.id !== id));
    }

    const deleteAllTask = () => {
        setList([]);
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
                deleteAllTask = {deleteAllTask}
            />
        </div>
    );
}

export default App;