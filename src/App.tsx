import { PlusCircle, TiktokLogo } from 'phosphor-react';
import { ButtonHTMLAttributes, useEffect, useState } from 'react';
import  styles from './App.module.css';
import { EmptyList } from './components/EmptyList/EmptyList';
import { Task } from './components/Task/Task';
import { v4 as uuidv4,} from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export interface ITask {
  id:string,
  content:string,
  isChecked:boolean
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title?: string
}

export function App({ title, ...rest }:ButtonProps) {

const [task, setTask] = useState("")
const [tasks, setTasks] = useState<ITask[]>([])
const tasksTotal = tasks.length
const taskChecked = tasks.filter(task => task.isChecked).reduce((total = 1, task) => {
  if(task.isChecked) {
    return total + 1;
  }
}, 0)


function handleCreateTask() {

  if(task === '' || task.indexOf(' ') >= 0){
    return toast.error("Digite uma tarefa!")
  }
  const newTask = {
    id:uuidv4(),
    content:task,
    isChecked:false,    
  }
  setTask("")
  ordenarChecked()
  setTasks([newTask, ...tasks])
}

function handleDeleteTask(id:string) {
  const taskListWithoutTaskDeleted = tasks.filter(task => task.id !== id)
  setTasks(taskListWithoutTaskDeleted)
}

function handleToggleIsChecked(id:string) {
  const taskFound =  tasks.find(task => task.id === id)
  if(taskFound){
    taskFound.isChecked = taskFound.isChecked === true ? false : true
  }
  ordenarChecked()
  setTasks(prev => [...prev])
}

function ordenarChecked() {
  setTasks(prev => prev.sort((a,b) => {
    if(a.isChecked === true) {
        return 1
    }
    if(a.isChecked === false) {
      return -1
    }
    return 0
  }))
}

    return(
      <div className={ styles.body }>

        <ToastContainer 
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
          theme="dark"
        />

        <header className={ styles.header }>
          <h1>To<span className={ styles.do }>Do</span></h1>
        </header>

          <section className={ styles.sectionCreate }>
            <input className={ styles.input }
            type="text"
            placeholder='Adicione uma nova tarefa'
            value={task}
            onChange={( event ) => setTask(event.target.value)}
            />
            <button 
            {...rest} 
            type="submit" 
            className={ styles.buttonCreate }
            onClick={handleCreateTask}>
              {title='Criar'}
              <PlusCircle />
            </button>
          </section>

        <main className={ styles.main }>

            <div className={ styles.taskStatus }>
              <div className={ styles.taskCriada }>
                <p>Tarefas criadas</p>
                <span className={ styles.taskContador }> { tasksTotal } </span>
              </div>

              <div className={ styles.taskConcluida }>
                <p>Concluídas</p>
                <span className={ styles.taskContador }>{ `${taskChecked} de ${tasksTotal} ` }</span>
              </div>
            </div>            

          <section>
            {tasks.length > 0?
              <div className={ styles.taskList }>
              {tasks.map(task => (
                <Task
                key={task.id}
                task={task}
                onDeleteTask={handleDeleteTask}
                onToggleIsChecked={handleToggleIsChecked}
                />
              ))}
              </div>
            :
              <EmptyList />
            }
            
          </section>
        </main>
      
      </div>
    )
}
  
