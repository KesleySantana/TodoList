import styles from './EmptyList.module.css'

import { Clipboard} from "phosphor-react";


export function EmptyList() {
    return(        

            <main className={ styles.empty }>
                <Clipboard 
                size={60}
                color={'#333333'}
                weight="bold"
                />

                <span>
                     <p> Você ainda não tem tarefas cadastradas</p>
                     <p> Crie tarefas e organize seus itens a fazer</p>  
                </span>
            </main>

    )
}