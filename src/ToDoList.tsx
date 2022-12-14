import React, {ChangeEvent, KeyboardEvent, useRef, useState} from "react";
import {FilterType} from "./App";
import {Button} from "./components/Button";
import {useAutoAnimate} from "@formkit/auto-animate/react";

type ToDoListPropsType = {
    title: string
    task: TaskType[]
    removeButton: (id: string) => void
    checkItemList: (id: string, checked: boolean) => void
    setFilter: (filter: FilterType) => void
    deleteAllTask: () => void
    addTask: (taskTitle: string) => void
    filter: FilterType
    children?: React.ReactNode
}

type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
}
export const ToDoList: React.FC<ToDoListPropsType> = ({children, ...props}) => {

    let onChangeRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState<string | null>(null);
    const [listRef] = useAutoAnimate<HTMLUListElement>()

    const filterItemList = (filter: FilterType) => {
        props.setFilter(filter);
    }
    const onClickDeleteAllTask = () => {
        props.deleteAllTask();
    }
    const onClickAddTaskHandler = () => {
        if (onChangeRef.current) {
            if (onChangeRef.current.value.trim() !== '') {
                props.addTask(onChangeRef.current.value.trim());
                onChangeRef.current.value = '';
            } else {
                setError('Ошибка ввода!')
                onChangeRef.current.value = '';
            }
        }
    }
    const onKeyPressInputValueHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (event.key === 'Enter') {
            onClickAddTaskHandler();
        }
    }
    const onChangeCheckHandler = (id: string, checkValue: boolean) => {
        /*console.log(event.currentTarget.checked)*/
        props.checkItemList(id, checkValue);
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    className={error ? 'error' : ''}
                    ref={onChangeRef}
                    onKeyDown={onKeyPressInputValueHandler}/>
                <Button name={'add'} callBack={onClickAddTaskHandler}/>
                {error && <div className={'error-message'}>{error}</div>}
            </div>
            <ul ref={listRef}>
                {props.task.map((el, index) => {
                    const onClickRemoveHandler = () => {
                        props.removeButton(el.id);
                    }
                    return (
                        <li key={index} className={el.isDone ? 'is-done' : ''}>
                            <Button name={'x'} callBack={onClickRemoveHandler}/>
                            <input
                                type="checkbox"
                                checked={el.isDone}
                                onChange={(event) => onChangeCheckHandler(el.id, event.currentTarget.checked)}/>
                            <span>{el.title}</span>
                        </li>
                    );
                })}
            </ul>
            <div>
                <Button name={'DELETE ALL TASK'} callBack={onClickDeleteAllTask}/>
            </div>
            <div>
                <Button className={props.filter === 'All' ? 'active-filter' : ''}
                        name={'All'}
                        callBack={() => filterItemList('All')}/>
                <Button className={props.filter === 'Active' ? 'active-filter' : ''}
                        name={'Active'}
                        callBack={() => filterItemList('Active')}/>
                <Button className={props.filter === 'Completed' ? 'active-filter' : ''}
                        name={'Completed'}
                        callBack={() => filterItemList('Completed')}/>
                <Button className={props.filter === 'FirstThree' ? 'active-filter' : ''}
                        name={'First three'}
                        callBack={() => filterItemList('FirstThree')}/>
            </div>
            {children}
        </div>
    );
}