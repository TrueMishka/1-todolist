import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterType} from "./App";
import {Button} from "./components/Button";

type ToDoListPropsType = {
    title: string
    task: TaskType[]
    removeButton: (id: string) => void
    checkItemList: (id: string) => void
    filter: FilterType
    setFilter: (filter: FilterType) => void
    deleteAllTask: () => void
    addTask: (taskTitle: string) => void
}

type TaskType = {
    id: string;
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

    const filterItemList = (filter: FilterType) => {
        props.setFilter(filter);
    }

    const [InputValue, setInputValue] = useState('');

    const onClickDeleteAllTask = () => {
        props.deleteAllTask();
    }
    const onClickAddTaskHandler = () => {
        props.addTask(InputValue);
        setInputValue('');
    }
    const onChangeInputValueHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.currentTarget.value);
    }
    const onKeyPressInputValueHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onClickAddTaskHandler();
        }
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={InputValue} onChange={onChangeInputValueHandler} onKeyDown={onKeyPressInputValueHandler}/>
                <Button name={'add'} callBack={onClickAddTaskHandler}/>
            </div>
            <ul>
                {filteredTasks.map((el, index) => {
                    const onClickCheckHandler = () => {
                        props.checkItemList(el.id);
                    }
                    const onClickRemoveHandler = () => {
                        props.removeButton(el.id);
                    }
                    return (
                        <li key={index}>
                            <Button name={'x'} callBack={onClickRemoveHandler}/>
                            <input onClick={onClickCheckHandler} type="checkbox" checked={el.isDone}/>
                            <span>{el.title}</span>
                        </li>
                    );
                })}
            </ul>
            <div>
                <Button name={'DELETE ALL TASK'} callBack={onClickDeleteAllTask}/>
            </div>
            <div>
                <Button name={'All'} callBack={() => filterItemList('All')}/>
                <Button name={'Active'} callBack={() => filterItemList('Active')}/>
                <Button name={'Completed'} callBack={() => filterItemList('Completed')}/>
                <Button name={'First three'} callBack={() => filterItemList('FirstThree')}/>
            </div>
        </div>
    );
}