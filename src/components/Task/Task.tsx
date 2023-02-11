import { Trash } from 'phosphor-react';
import { ITask } from '../../App';
import styles from './Task.module.css';


interface TaskProps {
    task:ITask,
    onDeleteTask(id:string):void
    onToggleIsChecked(id:string):void
}

export function Task({ task, onDeleteTask , onToggleIsChecked  }:TaskProps) {
    const styleP = task.isChecked? styles.pTrue : styles.pFalse 

    function handleDeleteTask() {
        onDeleteTask(task.id)
    }

   function handleToggleIsChecked() {
        onToggleIsChecked(task.id)

    }

    return(
        <div className={ styles.task }>
            <div className={ styles.taskWrapper }>
                <input 
                    type="checkbox"
                    className={styles.circle}
                    defaultChecked={task.isChecked}
                    onClick={()=> handleToggleIsChecked()}
                />
                <p className={styleP} >
                    {task.content}
                </p>
            </div>
                <button
                onClick={() => handleDeleteTask()}
                className={styles.trash}>
                <Trash
                size={ 24 }
                />
            </button>          
        </div>
    )
}