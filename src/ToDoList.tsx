import React, {useState} from "react";
import {FilterType} from "./App";

type ToDoListPropsType = {
    title: string
    task: TaskType[]
    removeButton: (id: number) => void
    checkItemList: (id: number) => void
    filter: FilterType
    setFilter: (filter: FilterType) => void
    deleteAllTask: () => void
}

type TaskType = {
    id: number;
    title: string;
    isDone: boolean;
}
export const ToDoList = (props: ToDoListPropsType) => {

    let filteredTasks = props.task;

    if (props.filter === 'Active') {
        filteredTasks = props.task.filter(t => !t.isDone);
    } else if (props.filter === 'Completed') {
        filteredTasks = props.task.filter(t => t.isDone);
    }else if (props.filter === 'FirstThree') {
        filteredTasks = props.task.filter((t, index) => index < 3)
    } else {
        filteredTasks = props.task;
    }

    const filterItemList = (value: FilterType) => {
        props.setFilter(value);
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {filteredTasks.map((el, index) => {
                    return (
                        <li key={index}>
                            <button onClick={() => {
                                props.removeButton(el.id)
                            }}>x
                            </button>
                            <input onClick={() => {
                                props.checkItemList(el.id)
                            }} type="checkbox" checked={el.isDone}/>
                            <span>{el.title}</span>
                        </li>
                    );
                })}
            </ul>
            <div>
                <button onClick={props.deleteAllTask}>DELETE ALL TASK</button>
            </div>
            <div>
                <button onClick={() => {
                    filterItemList("All")
                }}>All
                </button>
                <button onClick={() => {
                    filterItemList("Active")
                }}>Active
                </button>
                <button onClick={() => {
                    filterItemList("Completed")
                }}>Completed
                </button>
                <button onClick={() => {
                    filterItemList("FirstThree")
                }}>First three
                </button>
            </div>
        </div>
    );
}