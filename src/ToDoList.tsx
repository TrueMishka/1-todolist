import React, {KeyboardEvent, useRef} from "react";
import {FilterType} from "./App";
import {Button} from "./components/Button";
import {useAutoAnimate} from "@formkit/auto-animate/react";

type ToDoListPropsType = {
    title: string
    task: TaskType[]
    removeButton: (id: string) => void
    checkItemList: (id: string) => void
    setFilter: (filter: FilterType) => void
    deleteAllTask: () => void
    addTask: (taskTitle: string) => void
    children?: React.ReactNode
}

type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
}
export const ToDoList:React.FC<ToDoListPropsType> = ({children, ...props}) => {

    let onChangeRef = useRef<HTMLInputElement>(null);
    const [listRef] = useAutoAnimate<HTMLUListElement>();

    const filterItemList = (filter: FilterType) => {
        props.setFilter(filter);
    }

    const onClickDeleteAllTask = () => {
        props.deleteAllTask();
    }
    const onClickAddTaskHandler = () => {
        if (onChangeRef.current && onChangeRef.current.value.trim() !== '') {
            props.addTask(onChangeRef.current.value)
            onChangeRef.current.value = '';
        }
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
                <input ref={onChangeRef} onKeyDown={onKeyPressInputValueHandler}/>
                <Button name={'add'} callBack={onClickAddTaskHandler}/>
            </div>
            <ul ref={listRef}>
                {props.task.map((el, index) => {
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
            {children}
        </div>
    );
}