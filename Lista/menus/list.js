import {log, select, isCancel} from "@clack/prompts"
import chalk from "chalk"; // importando o chalk para poder formatar o texto


// importanto de outro documento

import { taskManeger } from '../maneger/tasks.js';
import { mainMenu } from './main.js';
import { updateTaskMenu } from "./update.js";

//.

export async function listTasksMenu(){
    if(taskManeger.tasks.size < 1) { // se o numero de tasks for menos do que 1, ou seja, 0
        log.warn("Nenhuma tarefa disponível"); 
        setTimeout(() => mainMenu(), 1000);
        return;
    }
    const selected  = await select ({
        message: "Selecione uma tarefa",
        options: [
                ...taskManeger.toArray().map(({name , status}) => ({ 
                    label: `${taskManeger.colorStatus(status)} ${chalk.white.underline(name)}`,
                    value: name
                    })),// Para afzer um espalhamento de um array, usando o metodo to array e depois vai mapear todos os items para um novo obj

                    {label: "Menu principal", value: "main"}
        ]
    })
    if(isCancel(selected) || selected === "main") {
        mainMenu();      // para verificar se o prompt foi cancelado ou se o user escoljeu voltar para o menu pricipal
        return;
    }

    //criar função de atualizar tarefa
    // arquivo update.js
    updateTaskMenu(selected)  // só vai ser executado se o if não acontecer
}
