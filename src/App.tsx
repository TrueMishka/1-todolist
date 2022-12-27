import React, {useState} from 'react';
import './App.css';
import {ToDoList} from "./ToDoList";
import {v1} from "uuid";

// Hi guys!
// 1. Let's try an alternative way. Instead of useState we can try useRef in Todolist.tsx:
// <input
//     //value={title}
//     // onChange={ onChangeHandler }
//     ref={onChangeRef}
//     onKeyPress={onKeyPressHandler}
// />
// let onChangeRef = useRef<HTMLInputElement>(null)
// Inside of  const addTask = () => {} use onChangeRef.current.value

// 2. Let's try children and F.C:
// We will use double 'tag' <Todolist></Todolist>
// <Todolist title="What to learn"
//           tasks={tasksForTodolist}
//           removeTask={removeTask}
//           changeFilter={changeFilter}
//           addTask={addTask} >
//     <div>
//         <div>Many intresting information</div>
//      </div>
// </Todolist>
//Inside of Todolist.tsx
// Type out changes in PropsType: children?:React.ReactNode
// export const Todolist:React.FC<PropsType>=({children, ...props}) =>{
//     return(
//         <div>
//             <div>...</div>
//             {children}
//         </div>
//      )
// }

// 3. Let's append some animation in our project:
//yarn add  @formkit/auto-animate -D
// we use -D, because the best practice is to add new extensions to the object inside the package.json
// "devDependencies": {
//     "@formkit/auto-animate": "^1.0.0-beta.3"
//   }
// const [listRef] = useAutoAnimate<HTMLUListElement>() in Todolist.tsx
// <ul ref={listRef}>
//Look how smoothly the tasks are added!
//P.S. Do you understand why a new task append in all Todolists?
// [because we only have one state for all our todolists, but we'll talk about that on Tuesday.]

export type FilterType = 'All' | 'Active' | 'Completed' | 'FirstThree';

const App = () => {

    const title = 'What to learn';

    let [tasks, setList] = useState([
        {id: v1(), title: "HTML", isDone: true},
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "Redax", isDone: false},
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
            >
                <div>
                    <div>Many intresting information</div>
                </div>
            </ToDoList>
        </div>
    );
}

export default App;