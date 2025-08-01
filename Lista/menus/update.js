import { taskManeger } from '../maneger/tasks.js';
import {log} from "@clack/prompts";
import chalk from "chalk"; 

export async function  updateTaskMenu(taskName){ // essa função recebe com argumento o nome das tasks
    const task = taskManeger.tasks.get(taskName); // acessa o map "tasks" e pega a task com o nome que foi passado como argumento

    const formatedDate = new Date(task.createdAt).toLocaleString(); // para ter a data formatada e poder ser exibida
    const status = taskManeger.colorStatus(task.status);

    log.info([
        `Tarefa: ${task.name}`,
        `Status: ${status}`,
        `Criada em: ${chalk.bgGrey(formatedDate)}`
    ].join("\n")) // join para exibir os intens do array com uma quebra de linha
}