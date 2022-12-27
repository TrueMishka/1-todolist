import React, {ChangeEvent, KeyboardEvent, useRef, useState} from "react";
import {FilterType} from "./App";
import {Button} from "./components/Button";

type ToDoListPropsType = {
    title: string
    task: TaskType[]
    removeButton: (id: string) => void
    checkItemList: (id: string, checked: boolean) => void
    setFilter: (filter: FilterType) => void
    deleteAllTask: () => void
    addTask: (taskTitle: string) => void
    filter: FilterType
}

type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
}
export const ToDoList = (props: ToDoListPropsType) => {

    const filterItemList = (filter: FilterType) => {
        props.setFilter(filter);
    }

    const [InputValue, setInputValue] = useState<string>('');
    const [error, setError] = useState<string | null>(null);


    const onClickDeleteAllTask = () => {
        props.deleteAllTask();
    }
    const onClickAddTaskHandler = () => {
        if (!(InputValue.trim() === '')) {
            props.addTask(InputValue.trim());
            setInputValue('');
        } else {
            setError('Ошибка ввода!')
            setInputValue('');
        }
    }
    const onChangeInputValueHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.currentTarget.value);
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
                    value={InputValue}
                    onChange={onChangeInputValueHandler}
                    onKeyDown={onKeyPressInputValueHandler}/>
                <Button name={'add'} callBack={onClickAddTaskHandler}/>
                {error && <div className={'error-message'}>{error}</div>}
            </div>
            <ul>
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
                <Button className={props.filter === 'All' ? 'active-filter' : ''} name={'All'} callBack={() => filterItemList('All')}/>
                <Button className={props.filter === 'Active' ? 'active-filter' : ''} name={'Active'} callBack={() => filterItemList('Active')}/>
                <Button className={props.filter === 'Completed' ? 'active-filter' : ''} name={'Completed'} callBack={() => filterItemList('Completed')}/>
                <Button className={props.filter === 'FirstThree' ? 'active-filter' : ''} name={'First three'} callBack={() => filterItemList('FirstThree')}/>
            </div>
        </div>
    );
}